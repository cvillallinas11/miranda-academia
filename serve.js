/* =========================================================
   Stable Stars - Servidor local
   Sirve los archivos estáticos y expone la API de:
   - autenticación por email + contraseña
   - administración de usuarios (super admin)
   - panel de padres (progreso de sus hijos)
   - persistencia del progreso del juego
   ========================================================= */

const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// __dirname puede no ser el directorio de trabajo actual (ej. si el proceso
// se lanza desde la carpeta padre), así que apuntamos el .env explícitamente.
require("dotenv").config({ path: path.join(__dirname, ".env") });

const PORT = process.env.PORT || 5183;
const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const SESSIONS_FILE = path.join(DATA_DIR, "sessions.json");
const PROGRESS_FILE = path.join(DATA_DIR, "progress.json");
const TASKS_FILE = path.join(DATA_DIR, "tasks.json");
const AUDIT_FILE = path.join(DATA_DIR, "audit.log");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
};

const ROLES = ["admin", "parent", "child"];
const MIN_PASSWORD_LENGTH = 8;
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 días
const LOGIN_MAX_ATTEMPTS = 5;
const LOGIN_LOCK_MS = 15 * 60 * 1000; // 15 minutos
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 120; // por IP, por minuto, sobre /api/*

// Detrás de nginx en producción, la app SOLO debe escuchar en 127.0.0.1 y
// nginx es la única puerta de entrada pública — así el X-Forwarded-For que
// nginx agrega es confiable y no se puede falsificar desde fuera. Ver DEPLOYMENT.md.
const TRUST_PROXY = process.env.TRUST_PROXY === "1";

/* ---------- Persistencia sencilla en disco ---------- */
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}
function readJson(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, "utf8")); } catch (e) { return fallback; }
}
function writeJson(file, data) {
  ensureDataDir();
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

let users = readJson(USERS_FILE, []);          // [{email, name, role, parentEmail, passwordHash, passwordSalt, createdAt}]
let sessions = readJson(SESSIONS_FILE, {});     // { token: {email, role, name, createdAt} }
let progressStore = readJson(PROGRESS_FILE, {}); // { email: <state> }
let tasksStore = readJson(TASKS_FILE, {});      // { childEmail: { tasks: [{id,title,emoji,active,createdAt}], completions: { "YYYY-MM-DD": [taskId,...] } } }

function saveUsers() { writeJson(USERS_FILE, users); }
function saveSessions() { writeJson(SESSIONS_FILE, sessions); }
function saveProgress() { writeJson(PROGRESS_FILE, progressStore); }
function saveTasks() { writeJson(TASKS_FILE, tasksStore); }
function getChildTaskData(email) {
  if (!tasksStore[email]) tasksStore[email] = { tasks: [], completions: {} };
  return tasksStore[email];
}
function todayISO() { return new Date().toISOString().slice(0, 10); }
function last7Days() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}
function buildTasksResponse(email) {
  const data = getChildTaskData(email);
  const activeTasks = data.tasks.filter((t) => t.active);
  const today = todayISO();
  const completedToday = data.completions[today] || [];
  const week = last7Days().map((date) => ({
    date,
    done: (data.completions[date] || []).length,
    total: activeTasks.length,
  }));
  return { tasks: data.tasks, today, completedToday, week };
}

function findUser(email) { return users.find((u) => u.email === email); }
function publicUser(u) {
  if (!u) return null;
  return { email: u.email, name: u.name, role: u.role, parentEmail: u.parentEmail || null, createdAt: u.createdAt };
}

/* ---------- Contraseñas ---------- */
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return { salt, hash };
}
function verifyPassword(password, salt, hash) {
  const candidate = crypto.scryptSync(password, salt, 64).toString("hex");
  const a = Buffer.from(candidate, "hex");
  const b = Buffer.from(hash, "hex");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
function generatePassword() {
  // 12 caracteres alfanuméricos con buena entropía (crypto, no Math.random).
  return crypto.randomBytes(9).toString("base64url").slice(0, 12);
}

/* ---------- Auditoría ---------- */
function auditLog(event, details, req) {
  ensureDataDir();
  const line = JSON.stringify({
    ts: new Date().toISOString(),
    event,
    ip: req ? getClientIp(req) : null,
    ...details,
  });
  try { fs.appendFileSync(AUDIT_FILE, line + "\n"); } catch (e) { console.error("No se pudo escribir el log de auditoría:", e); }
}

/* ---------- IP del cliente (respeta X-Forwarded-For solo si TRUST_PROXY=1) ---------- */
function getClientIp(req) {
  if (TRUST_PROXY) {
    const fwd = req.headers["x-forwarded-for"];
    if (fwd) return fwd.split(",")[0].trim();
  }
  return req.socket.remoteAddress || "desconocida";
}

/* ---------- Límite general de solicitudes por IP (mitiga fuerza bruta / DoS básico) ---------- */
const requestCounters = new Map(); // ip -> { count, windowStart }
function isRateLimited(ip) {
  const now = Date.now();
  const entry = requestCounters.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    requestCounters.set(ip, { count: 1, windowStart: now });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

/* ---------- Bloqueo por intentos fallidos de login (por correo, sin importar la IP) ---------- */
const failedLogins = new Map(); // email -> { count, lockedUntil }
function isLoginLocked(email) {
  const entry = failedLogins.get(email);
  return !!(entry && entry.lockedUntil && entry.lockedUntil > Date.now());
}
function registerFailedLogin(email) {
  const entry = failedLogins.get(email) || { count: 0, lockedUntil: 0 };
  entry.count++;
  if (entry.count >= LOGIN_MAX_ATTEMPTS) {
    entry.lockedUntil = Date.now() + LOGIN_LOCK_MS;
    entry.count = 0;
  }
  failedLogins.set(email, entry);
}
function clearFailedLogins(email) { failedLogins.delete(email); }

/* ---------- Bootstrap del super admin (desde .env) ---------- */
function bootstrapAdmin() {
  const email = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "";
  if (!email || !password) {
    console.log("⚠️  ADMIN_EMAIL / ADMIN_PASSWORD no configurados en .env: no habrá super admin hasta que los definas.");
    return;
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    console.log(`⚠️  ADMIN_PASSWORD tiene menos de ${MIN_PASSWORD_LENGTH} caracteres. Cámbiala en .env antes de desplegar a producción.`);
  }
  const { salt, hash } = hashPassword(password);
  const existing = findUser(email);
  if (existing) {
    existing.role = "admin";
    existing.passwordHash = hash;
    existing.passwordSalt = salt;
    existing.name = existing.name || "Admin";
  } else {
    users.push({ email, name: "Admin", role: "admin", parentEmail: null, passwordHash: hash, passwordSalt: salt, createdAt: new Date().toISOString() });
  }
  saveUsers();
  console.log(`✅ Super admin listo: ${email} (la contraseña se toma de .env en cada arranque)`);
}
bootstrapAdmin();

/* ---------- Envío de correo (Gmail SMTP) ---------- */
let transporter = null;
function getTransporter() {
  if (transporter) return transporter;
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return null;
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  return transporter;
}
async function sendWelcomeEmail(toEmail, name, password, isReset) {
  const t = getTransporter();
  const subject = isReset ? "🐴 Tu nueva contraseña de Stable Stars" : "🐴 ¡Bienvenido(a) a Stable Stars!";
  if (!t) {
    console.log(`\n[AVISO] SMTP no configurado. ${isReset ? "Nueva contraseña" : "Contraseña"} para ${toEmail}: ${password}\n`);
    return { sent: false };
  }
  await t.sendMail({
    from: `"Stable Stars 🐴" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject,
    text: `Hola ${name || ""}!\n\nTu correo: ${toEmail}\nTu contraseña: ${password}\n\nStable Stars - La Academia de Miranda`,
    html: `
      <div style="font-family: -apple-system, Segoe UI, sans-serif; max-width:420px; margin:0 auto; padding:24px; background:#F2F2F7; border-radius:20px;">
        <div style="font-size:32px; text-align:center;">🐴</div>
        <h2 style="text-align:center; color:#1C1C1E;">¡Hola${name ? " " + name : ""}!</h2>
        <p style="text-align:center; color:#6E6E73;">${isReset ? "Tu contraseña fue actualizada." : "Ya tienes una cuenta en"} <strong>Stable Stars</strong>:</p>
        <p style="text-align:center; color:#1C1C1E;">Correo: <strong>${toEmail}</strong></p>
        <div style="text-align:center; font-size:28px; font-weight:800; letter-spacing:2px; color:#FF6B4A; margin:20px 0;">${password}</div>
        <p style="text-align:center; color:#AEAEB2; font-size:13px;">Puedes cambiarla más tarde pidiéndole a tu adulto que la reinicie.</p>
      </div>`,
  });
  return { sent: true };
}

/* ---------- Utilidades HTTP ---------- */
function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => { body += chunk; if (body.length > 1e6) req.destroy(); });
    req.on("end", () => {
      if (!body) return resolve({});
      try { resolve(JSON.parse(body)); } catch (e) { reject(e); }
    });
    req.on("error", reject);
  });
}
// Cabeceras de seguridad tipo "helmet" aplicadas a toda respuesta (JSON y estáticos).
// Nota: script-src es estricto ('self', sin 'unsafe-inline') porque la app no usa
// atributos onclick="" ni <script> inline — ver tarea de limpieza en app.js/portal.js.
const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "geolocation=(), camera=(), microphone=(), payment=()",
  "Strict-Transport-Security": "max-age=15552000; includeSubDomains",
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "connect-src 'self'",
    "base-uri 'none'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join("; "),
};
function sendJson(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, { ...SECURITY_HEADERS, "Content-Type": "application/json; charset=utf-8", "Content-Length": Buffer.byteLength(body) });
  res.end(body);
}
function getBearerToken(req) {
  const h = req.headers["authorization"] || "";
  const m = h.match(/^Bearer (.+)$/);
  return m ? m[1] : null;
}
function getSession(req) {
  const token = getBearerToken(req);
  const raw = token && sessions[token];
  if (!raw) return null;
  if (raw.expiresAt && raw.expiresAt < Date.now()) {
    delete sessions[token];
    saveSessions();
    return null;
  }
  return { token, ...raw };
}
function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ---------- Auth ---------- */
async function handleLogin(req, res) {
  let body;
  try { body = await readBody(req); } catch (e) { return sendJson(res, 400, { ok: false, error: "JSON inválido" }); }
  const email = (body.email || "").toString().trim().toLowerCase();
  const password = (body.password || "").toString();

  if (isLoginLocked(email)) {
    auditLog("login_blocked", { email }, req);
    return sendJson(res, 429, { ok: false, error: "Demasiados intentos fallidos. Intenta de nuevo en unos minutos." });
  }

  const user = findUser(email);
  if (!user || !verifyPassword(password, user.passwordSalt, user.passwordHash)) {
    registerFailedLogin(email);
    auditLog("login_failed", { email }, req);
    return sendJson(res, 401, { ok: false, error: "Correo o contraseña incorrectos." });
  }
  clearFailedLogins(email);
  const token = crypto.randomBytes(32).toString("hex");
  sessions[token] = {
    email: user.email, role: user.role, name: user.name,
    createdAt: new Date().toISOString(), expiresAt: Date.now() + SESSION_TTL_MS,
  };
  saveSessions();
  auditLog("login_success", { email: user.email, role: user.role }, req);
  sendJson(res, 200, { ok: true, token, user: publicUser(user) });
}
function handleMe(req, res) {
  const session = getSession(req);
  if (!session) return sendJson(res, 401, { ok: false, error: "Sesión inválida" });
  const user = findUser(session.email);
  if (!user) return sendJson(res, 401, { ok: false, error: "Usuario ya no existe" });
  sendJson(res, 200, { ok: true, user: publicUser(user) });
}
function handleLogout(req, res) {
  const token = getBearerToken(req);
  if (token && sessions[token]) {
    auditLog("logout", { email: sessions[token].email }, req);
    delete sessions[token];
    saveSessions();
  }
  sendJson(res, 200, { ok: true });
}

/* ---------- Progreso del juego (cualquier usuario autenticado, sobre sí mismo) ---------- */
function handleGetOwnProgress(req, res) {
  const session = getSession(req);
  if (!session) return sendJson(res, 401, { ok: false, error: "Sesión inválida" });
  sendJson(res, 200, { ok: true, state: progressStore[session.email] || null });
}
async function handleSaveOwnProgress(req, res) {
  const session = getSession(req);
  if (!session) return sendJson(res, 401, { ok: false, error: "Sesión inválida" });
  let body;
  try { body = await readBody(req); } catch (e) { return sendJson(res, 400, { ok: false, error: "JSON inválido" }); }
  if (!body.state || typeof body.state !== "object") return sendJson(res, 400, { ok: false, error: "Falta el estado" });
  progressStore[session.email] = body.state;
  saveProgress();
  sendJson(res, 200, { ok: true });
}

/* ---------- Tareas diarias del niño (sobre sí mismo) ---------- */
function handleGetOwnTasks(req, res) {
  const session = getSession(req);
  if (!session) return sendJson(res, 401, { ok: false, error: "Sesión inválida" });
  sendJson(res, 200, { ok: true, ...buildTasksResponse(session.email) });
}
function handleToggleOwnTask(req, res, taskId) {
  const session = getSession(req);
  if (!session) return sendJson(res, 401, { ok: false, error: "Sesión inválida" });
  const data = getChildTaskData(session.email);
  const task = data.tasks.find((t) => t.id === taskId);
  if (!task || !task.active) return sendJson(res, 404, { ok: false, error: "Tarea no encontrada" });
  const today = todayISO();
  if (!data.completions[today]) data.completions[today] = [];
  const idx = data.completions[today].indexOf(taskId);
  if (idx === -1) data.completions[today].push(taskId);
  else data.completions[today].splice(idx, 1);
  saveTasks();
  sendJson(res, 200, { ok: true, ...buildTasksResponse(session.email) });
}

/* ---------- Gestión de tareas (admin, o el padre/madre vinculado al niño) ---------- */
function requireCanManageTasks(req, res, childEmail) {
  const session = getSession(req);
  if (!session) { sendJson(res, 401, { ok: false, error: "Sesión inválida" }); return null; }
  if (session.role === "admin") return session;
  if (session.role === "parent") {
    const child = findUser(childEmail);
    if (child && child.role === "child" && child.parentEmail === session.email) return session;
  }
  sendJson(res, 403, { ok: false, error: "No tienes permiso para gestionar las tareas de este niño." });
  return null;
}
function handleManageListTasks(req, res, email) {
  if (!requireCanManageTasks(req, res, email)) return;
  if (!findUser(email)) return sendJson(res, 404, { ok: false, error: "Usuario no encontrado" });
  sendJson(res, 200, { ok: true, ...buildTasksResponse(email) });
}
async function handleManageCreateTask(req, res, email) {
  const actor = requireCanManageTasks(req, res, email);
  if (!actor) return;
  if (!findUser(email)) return sendJson(res, 404, { ok: false, error: "Usuario no encontrado" });
  let body;
  try { body = await readBody(req); } catch (e) { return sendJson(res, 400, { ok: false, error: "JSON inválido" }); }
  const title = (body.title || "").toString().trim().slice(0, 60);
  const emoji = (body.emoji || "📌").toString().trim().slice(0, 4) || "📌";
  const dayIndex = Number(body.dayIndex) || 0; // Día asignado (0-22), por defecto día actual
  if (!title) return sendJson(res, 400, { ok: false, error: "Falta el título de la tarea" });
  if (dayIndex < 0 || dayIndex > 22) return sendJson(res, 400, { ok: false, error: "Día inválido (0-22)" });
  const data = getChildTaskData(email);
  if (data.tasks.filter((t) => t.active).length >= 20) {
    return sendJson(res, 400, { ok: false, error: "Ya hay 20 tareas activas, elimina alguna antes de agregar más." });
  }
  const task = { id: crypto.randomBytes(6).toString("hex"), title, emoji, active: true, dayIndex, createdAt: new Date().toISOString() };
  data.tasks.push(task);
  saveTasks();
  auditLog("task_created", { actor: actor.email, target: email, taskId: task.id, title, dayIndex }, req);
  sendJson(res, 200, { ok: true, ...buildTasksResponse(email) });
}
async function handleManageUpdateTask(req, res, email, taskId) {
  const actor = requireCanManageTasks(req, res, email);
  if (!actor) return;
  const data = getChildTaskData(email);
  const task = data.tasks.find((t) => t.id === taskId);
  if (!task) return sendJson(res, 404, { ok: false, error: "Tarea no encontrada" });
  let body;
  try { body = await readBody(req); } catch (e) { return sendJson(res, 400, { ok: false, error: "JSON inválido" }); }
  if (typeof body.title === "string" && body.title.trim()) task.title = body.title.trim().slice(0, 60);
  if (typeof body.emoji === "string" && body.emoji.trim()) task.emoji = body.emoji.trim().slice(0, 4);
  if (typeof body.active === "boolean") task.active = body.active;
  saveTasks();
  auditLog("task_updated", { actor: actor.email, target: email, taskId }, req);
  sendJson(res, 200, { ok: true, ...buildTasksResponse(email) });
}
function handleManageDeleteTask(req, res, email, taskId) {
  const actor = requireCanManageTasks(req, res, email);
  if (!actor) return;
  const data = getChildTaskData(email);
  const idx = data.tasks.findIndex((t) => t.id === taskId);
  if (idx === -1) return sendJson(res, 404, { ok: false, error: "Tarea no encontrada" });
  data.tasks.splice(idx, 1);
  Object.values(data.completions).forEach((list) => {
    const i = list.indexOf(taskId);
    if (i !== -1) list.splice(i, 1);
  });
  saveTasks();
  auditLog("task_deleted", { actor: actor.email, target: email, taskId }, req);
  sendJson(res, 200, { ok: true, ...buildTasksResponse(email) });
}

/* ---------- Panel de administración (solo role=admin) ---------- */
function requireAdmin(req, res) {
  const session = getSession(req);
  if (!session) { sendJson(res, 401, { ok: false, error: "Sesión inválida" }); return null; }
  if (session.role !== "admin") { sendJson(res, 403, { ok: false, error: "Solo el super admin puede hacer esto." }); return null; }
  return session;
}
function handleAdminListUsers(req, res) {
  if (!requireAdmin(req, res)) return;
  sendJson(res, 200, { ok: true, users: users.map(publicUser) });
}
async function handleAdminCreateUser(req, res) {
  const admin = requireAdmin(req, res);
  if (!admin) return;
  let body;
  try { body = await readBody(req); } catch (e) { return sendJson(res, 400, { ok: false, error: "JSON inválido" }); }
  const name = (body.name || "").toString().trim().slice(0, 40);
  const email = (body.email || "").toString().trim().toLowerCase();
  const role = ROLES.includes(body.role) ? body.role : "child";
  const parentEmail = role === "child" && body.parentEmail ? String(body.parentEmail).trim().toLowerCase() : null;
  let password = (body.password || "").toString().trim();

  if (!name) return sendJson(res, 400, { ok: false, error: "Falta el nombre" });
  if (!isValidEmail(email)) return sendJson(res, 400, { ok: false, error: "Correo inválido" });
  if (findUser(email)) return sendJson(res, 409, { ok: false, error: "Ya existe un usuario con ese correo." });
  if (parentEmail) {
    const parent = findUser(parentEmail);
    if (!parent || parent.role !== "parent") return sendJson(res, 400, { ok: false, error: "El correo del padre/madre indicado no existe o no tiene rol 'padre'." });
  }
  const autoGenerated = !password;
  if (autoGenerated) password = generatePassword();
  if (password.length < MIN_PASSWORD_LENGTH) return sendJson(res, 400, { ok: false, error: `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.` });

  const { salt, hash } = hashPassword(password);
  users.push({ email, name, role, parentEmail, passwordHash: hash, passwordSalt: salt, createdAt: new Date().toISOString() });
  saveUsers();
  auditLog("user_created", { actor: admin.email, target: email, role }, req);

  let emailResult = { sent: false };
  try { emailResult = await sendWelcomeEmail(email, name, password, false); } catch (e) { console.error("Error enviando correo de bienvenida:", e); }

  sendJson(res, 200, { ok: true, user: publicUser(findUser(email)), tempPassword: emailResult.sent ? undefined : password });
}
async function handleAdminUpdateUser(req, res, email) {
  const admin = requireAdmin(req, res);
  if (!admin) return;
  const user = findUser(email);
  if (!user) return sendJson(res, 404, { ok: false, error: "Usuario no encontrado" });
  let body;
  try { body = await readBody(req); } catch (e) { return sendJson(res, 400, { ok: false, error: "JSON inválido" }); }

  if (typeof body.name === "string" && body.name.trim()) user.name = body.name.trim().slice(0, 40);
  if (ROLES.includes(body.role)) user.role = body.role;
  if (user.role === "child") {
    if (body.parentEmail === null || body.parentEmail === "") user.parentEmail = null;
    else if (typeof body.parentEmail === "string") {
      const parent = findUser(body.parentEmail.trim().toLowerCase());
      if (!parent || parent.role !== "parent") return sendJson(res, 400, { ok: false, error: "El correo del padre/madre indicado no existe o no tiene rol 'padre'." });
      user.parentEmail = parent.email;
    }
  } else {
    user.parentEmail = null;
  }
  saveUsers();
  auditLog("user_updated", { actor: admin.email, target: email }, req);
  sendJson(res, 200, { ok: true, user: publicUser(user) });
}
async function handleAdminResetPassword(req, res, email) {
  const admin = requireAdmin(req, res);
  if (!admin) return;
  const user = findUser(email);
  if (!user) return sendJson(res, 404, { ok: false, error: "Usuario no encontrado" });
  let body;
  try { body = await readBody(req); } catch (e) { body = {}; }
  let password = (body.password || "").toString().trim();
  const autoGenerated = !password;
  if (autoGenerated) password = generatePassword();
  if (password.length < MIN_PASSWORD_LENGTH) return sendJson(res, 400, { ok: false, error: `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.` });

  const { salt, hash } = hashPassword(password);
  user.passwordHash = hash;
  user.passwordSalt = salt;
  saveUsers();
  clearFailedLogins(user.email);
  auditLog("password_reset", { actor: admin.email, target: email }, req);

  let emailResult = { sent: false };
  try { emailResult = await sendWelcomeEmail(user.email, user.name, password, true); } catch (e) { console.error("Error enviando correo de reinicio:", e); }

  sendJson(res, 200, { ok: true, tempPassword: emailResult.sent ? undefined : password });
}
function handleAdminDeleteUser(req, res, email) {
  const admin = requireAdmin(req, res);
  if (!admin) return;
  const idx = users.findIndex((u) => u.email === email);
  if (idx === -1) return sendJson(res, 404, { ok: false, error: "Usuario no encontrado" });
  if (users[idx].role === "admin") return sendJson(res, 400, { ok: false, error: "No puedes borrar al super admin." });
  users.splice(idx, 1);
  saveUsers();
  delete progressStore[email];
  saveProgress();
  delete tasksStore[email];
  saveTasks();
  Object.keys(sessions).forEach((t) => { if (sessions[t].email === email) delete sessions[t]; });
  saveSessions();
  auditLog("user_deleted", { actor: admin.email, target: email }, req);
  sendJson(res, 200, { ok: true });
}
function handleAdminGetProgress(req, res, email) {
  if (!requireAdmin(req, res)) return;
  if (!findUser(email)) return sendJson(res, 404, { ok: false, error: "Usuario no encontrado" });
  sendJson(res, 200, { ok: true, state: progressStore[email] || null });
}

/* ---------- Panel de padres (solo role=parent) ---------- */
function requireParent(req, res) {
  const session = getSession(req);
  if (!session) { sendJson(res, 401, { ok: false, error: "Sesión inválida" }); return null; }
  if (session.role !== "parent") { sendJson(res, 403, { ok: false, error: "Solo un padre/madre puede hacer esto." }); return null; }
  return session;
}
function handleParentChildren(req, res) {
  const session = requireParent(req, res);
  if (!session) return;
  const children = users.filter((u) => u.role === "child" && u.parentEmail === session.email).map(publicUser);
  sendJson(res, 200, { ok: true, children });
}
function handleParentProgress(req, res, email) {
  const session = requireParent(req, res);
  if (!session) return;
  const child = findUser(email);
  if (!child || child.role !== "child" || child.parentEmail !== session.email) {
    return sendJson(res, 403, { ok: false, error: "Ese niño no está vinculado a tu cuenta." });
  }
  sendJson(res, 200, { ok: true, state: progressStore[email] || null, child: publicUser(child) });
}

/* ---------- Archivos estáticos ----------
   IMPORTANTE: se sirve por LISTA BLANCA, no por acceso libre al disco.
   Antes, cualquiera podía pedir /serve.js, /.env o /data/users.json y el
   servidor los entregaba tal cual (¡contraseñas hasheadas y secretos
   expuestos!). Ahora solo estos archivos exactos son accesibles por HTTP. */
const PUBLIC_FILES = new Set(["/", "/index.html", "/style.css", "/data.js", "/app.js", "/auth.js", "/portal.js"]);
function serveStatic(req, res) {
  const urlPath = req.url.split("?")[0];
  const routed = urlPath === "/" ? "/index.html" : urlPath;
  if (!PUBLIC_FILES.has(routed)) {
    res.writeHead(404, SECURITY_HEADERS);
    return res.end("Not found");
  }
  const filePath = path.join(ROOT, routed);
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404, SECURITY_HEADERS); return res.end("Not found"); }
    const ext = path.extname(filePath);
    res.writeHead(200, { ...SECURITY_HEADERS, "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(data);
  });
}

/* ---------- Servidor ---------- */
const server = http.createServer((req, res) => {
  const url = req.url.split("?")[0];
  const method = req.method;

  if (url.startsWith("/api/") && isRateLimited(getClientIp(req))) {
    return sendJson(res, 429, { ok: false, error: "Demasiadas solicitudes. Intenta de nuevo en un momento." });
  }

  if (method === "POST" && url === "/api/auth/login") return handleLogin(req, res);
  if (method === "POST" && url === "/api/auth/logout") return handleLogout(req, res);
  if (method === "GET" && url === "/api/auth/me") return handleMe(req, res);

  if (method === "GET" && url === "/api/progress") return handleGetOwnProgress(req, res);
  if (method === "POST" && url === "/api/progress") return handleSaveOwnProgress(req, res);

  if (method === "GET" && url === "/api/tasks") return handleGetOwnTasks(req, res);
  let mt;
  if (method === "POST" && (mt = url.match(/^\/api\/tasks\/([^/]+)\/toggle$/))) return handleToggleOwnTask(req, res, decodeURIComponent(mt[1]));
  if (method === "GET" && (mt = url.match(/^\/api\/tasks\/manage\/([^/]+)$/))) return handleManageListTasks(req, res, decodeURIComponent(mt[1]));
  if (method === "POST" && (mt = url.match(/^\/api\/tasks\/manage\/([^/]+)$/))) return handleManageCreateTask(req, res, decodeURIComponent(mt[1]));
  if (method === "PUT" && (mt = url.match(/^\/api\/tasks\/manage\/([^/]+)\/([^/]+)$/))) return handleManageUpdateTask(req, res, decodeURIComponent(mt[1]), decodeURIComponent(mt[2]));
  if (method === "DELETE" && (mt = url.match(/^\/api\/tasks\/manage\/([^/]+)\/([^/]+)$/))) return handleManageDeleteTask(req, res, decodeURIComponent(mt[1]), decodeURIComponent(mt[2]));

  if (method === "GET" && url === "/api/admin/users") return handleAdminListUsers(req, res);
  if (method === "POST" && url === "/api/admin/users") return handleAdminCreateUser(req, res);
  let m;
  if (method === "PUT" && (m = url.match(/^\/api\/admin\/users\/([^/]+)$/))) return handleAdminUpdateUser(req, res, decodeURIComponent(m[1]));
  if (method === "DELETE" && (m = url.match(/^\/api\/admin\/users\/([^/]+)$/))) return handleAdminDeleteUser(req, res, decodeURIComponent(m[1]));
  if (method === "POST" && (m = url.match(/^\/api\/admin\/users\/([^/]+)\/reset-password$/))) return handleAdminResetPassword(req, res, decodeURIComponent(m[1]));
  if (method === "GET" && (m = url.match(/^\/api\/admin\/progress\/([^/]+)$/))) return handleAdminGetProgress(req, res, decodeURIComponent(m[1]));

  if (method === "GET" && url === "/api/parent/children") return handleParentChildren(req, res);
  if (method === "GET" && (m = url.match(/^\/api\/parent\/progress\/([^/]+)$/))) return handleParentProgress(req, res, decodeURIComponent(m[1]));

  serveStatic(req, res);
});

/* Limpieza periódica en memoria: sesiones vencidas y contadores viejos de
   rate-limit / intentos fallidos, para que el proceso no crezca sin límite
   en un servidor que corre semanas sin reiniciarse. */
setInterval(() => {
  const now = Date.now();
  let changed = false;
  Object.keys(sessions).forEach((t) => {
    if (sessions[t].expiresAt && sessions[t].expiresAt < now) { delete sessions[t]; changed = true; }
  });
  if (changed) saveSessions();
  requestCounters.forEach((v, k) => { if (now - v.windowStart > RATE_LIMIT_WINDOW_MS * 2) requestCounters.delete(k); });
  failedLogins.forEach((v, k) => { if (v.lockedUntil && v.lockedUntil < now && v.count === 0) failedLogins.delete(k); });
}, 60 * 60 * 1000); // cada hora

// En producción (detrás de nginx) usa HOST=127.0.0.1 en el .env para que el
// puerto de Node NO quede expuesto directamente a internet — solo nginx le
// habla, por el socket local. En desarrollo se deja en todas las interfaces.
const HOST = process.env.HOST || "0.0.0.0";
server.listen(PORT, HOST, () => {
  console.log(`Stable Stars corriendo en http://${HOST}:${PORT}`);
  if (!TRUST_PROXY && HOST === "127.0.0.1") {
    console.log("⚠️  HOST=127.0.0.1 pero TRUST_PROXY no está en '1': el rate-limit usará siempre la IP de nginx, no la del visitante real. Revisa DEPLOYMENT.md.");
  }
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log("⚠️  SMTP no configurado: copia .env.example a .env y completa SMTP_USER / SMTP_PASS.");
    console.log("    Mientras tanto, las contraseñas nuevas se imprimirán aquí en la consola.");
  }
});
