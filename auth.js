/* =========================================================
   Stable Stars - Autenticación por correo + contraseña
   y enrutado según el rol de la cuenta (admin / padre / niño)
   ========================================================= */

const AUTH_KEY = "miranda_auth_v1"; // { token, email, name, role }

const authView = document.getElementById("view");
const topbarStats = document.querySelector(".hero-stats");
const tabbar = document.getElementById("tabbar");

function getSavedAuth() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) { return null; }
}
function saveAuth(data) { localStorage.setItem(AUTH_KEY, JSON.stringify(data)); }
function clearAuth() { localStorage.removeItem(AUTH_KEY); }

function setChromeVisible(visible) {
  if (topbarStats) topbarStats.style.visibility = visible ? "visible" : "hidden";
  if (tabbar) tabbar.style.display = visible ? "flex" : "none";
}

async function apiLogin(email, password) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.error || "No se pudo iniciar sesión.");
  return data;
}
async function apiMe(token) {
  const res = await fetch("/api/auth/me", { headers: { Authorization: "Bearer " + token } });
  if (!res.ok) return null;
  const data = await res.json().catch(() => null);
  return data && data.ok ? data.user : null;
}
async function apiLogout(token) {
  try { await fetch("/api/auth/logout", { method: "POST", headers: { Authorization: "Bearer " + token } }); }
  catch (e) { /* si falla igual limpiamos localmente */ }
}

window.mirandaLogout = async function mirandaLogout() {
  const auth = getSavedAuth();
  if (auth && auth.token) await apiLogout(auth.token);
  clearAuth();
  // Recarga completa: evita que listeners de la sesión anterior (niño/admin/padre)
  // queden colgados escuchando cambios de hash y pisen la pantalla de login.
  window.location.href = window.location.pathname;
};

/* ---------- Pantalla de login (correo + contraseña) ---------- */
function renderLogin() {
  setChromeVisible(false);
  if (tabbar) tabbar.innerHTML = "";
  authView.innerHTML = `
    <div class="card hero-card">
      <div class="hero-horse">🐴</div>
      <h2>Stable Stars</h2>
      <p class="muted">Ingresa con el correo y la contraseña que te dio tu adulto.</p>
      <input id="emailInput" class="ios-input" type="email" placeholder="tu@correo.com" autocomplete="username" />
      <input id="passwordInput" class="ios-input" type="password" placeholder="Contraseña" autocomplete="current-password" style="margin-top:8px;" />
      <div id="authError" class="feedback" style="color:#C22A20;"></div>
      <button class="btn btn-primary big" id="loginBtn">Entrar 🔑</button>
      <p class="muted small">¿No tienes cuenta? Pídele a tu adulto que la cree desde el panel de administración.</p>
    </div>
  `;
  const emailInput = authView.querySelector("#emailInput");
  const passwordInput = authView.querySelector("#passwordInput");
  const errorBox = authView.querySelector("#authError");
  const loginBtn = authView.querySelector("#loginBtn");
  emailInput.focus();

  async function submit() {
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    errorBox.textContent = "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { errorBox.textContent = "Escribe un correo válido."; return; }
    if (!password) { errorBox.textContent = "Escribe tu contraseña."; return; }
    loginBtn.disabled = true;
    loginBtn.textContent = "Entrando...";
    try {
      const data = await apiLogin(email, password);
      saveAuth({ token: data.token, email: data.user.email, name: data.user.name, role: data.user.role });
      window.location.hash = "";
      bootAuth(); // ya no hace falta recargar: arrancamos directo en el rol correcto
    } catch (e) {
      errorBox.textContent = e.message;
      loginBtn.disabled = false;
      loginBtn.textContent = "Entrar 🔑";
    }
  }
  loginBtn.addEventListener("click", submit);
  passwordInput.addEventListener("keydown", (e) => { if (e.key === "Enter") submit(); });
}

/* ---------- Arranque: decide qué "app" mostrar según el rol ---------- */
async function bootAuth() {
  const auth = getSavedAuth();
  if (!auth || !auth.token) { renderLogin(); return; }

  const user = await apiMe(auth.token);
  if (!user) { clearAuth(); renderLogin(); return; }

  window.mirandaAuthToken = auth.token;
  setChromeVisible(true);

  if (user.role === "child") {
    window.startMirandaApp(user);
  } else if (user.role === "parent") {
    window.startParentPortal(user);
  } else if (user.role === "admin") {
    window.startAdminPortal(user);
  } else {
    clearAuth();
    renderLogin();
  }
}

window.addEventListener("DOMContentLoaded", bootAuth);
