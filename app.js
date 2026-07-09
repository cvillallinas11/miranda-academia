/* =========================================================
   Stable Stars - La Academia de Miranda
   Motor de la app (estado, puntaje, vistas, mini-juegos)
   ========================================================= */

let STORAGE_KEY = "miranda_stable_academy_v1"; // se ajusta por usuario al iniciar sesión (ver startMirandaApp)
const CATS = ["mate", "leng", "cien", "soc"];
const CAT_LABEL = { mate: "Matemáticas", leng: "Lenguaje", cien: "Ciencias Naturales", soc: "Ciencias Sociales" };

let CURRENT_USER = null; // {email, name} — se establece al iniciar sesión (auth.js)

/* ---------- Estado ---------- */
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ignore corrupt state */ }
  return { horseName: null, completedDays: {} };
}
function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  syncProgressToServer(state);
}
function syncProgressToServer(state) {
  const token = window.mirandaAuthToken;
  if (!token) return;
  fetch("/api/progress", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
    body: JSON.stringify({ state }),
  }).catch(() => { /* sin conexión: el progreso queda a salvo en localStorage igual */ });
}
async function fetchServerProgressOrLocal() {
  const token = window.mirandaAuthToken;
  if (token) {
    try {
      const res = await fetch("/api/progress", { headers: { Authorization: "Bearer " + token } });
      if (res.ok) {
        const data = await res.json();
        if (data.ok && data.state) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data.state));
          return data.state;
        }
      }
    } catch (e) { /* sin conexión: seguimos con lo que haya en localStorage */ }
  }
  return loadState();
}
let STATE = null;

/* Llamado por auth.js una vez que hay una sesión válida (rol niño) */
function mountChildTabbar() {
  const tabbar = document.getElementById("tabbar");
  if (!tabbar) return;
  tabbar.innerHTML = `
    <button class="navbtn active" data-nav="home">
      <span class="navicon">🏠</span><span class="navlabel">Inicio</span>
    </button>
    <button class="navbtn" data-nav="calendar">
      <span class="navicon">📅</span><span class="navlabel">Calendario</span>
    </button>
    <button class="navbtn" data-nav="tasks">
      <span class="navicon">✅</span><span class="navlabel">Tareas</span>
    </button>
    <button class="navbtn" data-nav="achievements">
      <span class="navicon">🏆</span><span class="navlabel">Logros</span>
    </button>
    <button class="navbtn" data-nav="horse">
      <span class="navicon">🐎</span><span class="navlabel">Mi Caballo</span>
    </button>
  `;
  // Sin onclick inline (permite una Content-Security-Policy estricta en producción)
  tabbar.querySelectorAll("[data-nav]").forEach((btn) => {
    btn.addEventListener("click", () => { window.location.hash = btn.dataset.nav; });
  });
}

async function startMirandaApp(user) {
  CURRENT_USER = user;
  STORAGE_KEY = "miranda_stable_academy_v1::" + user.email;
  mountChildTabbar();
  STATE = await fetchServerProgressOrLocal();
  render();
}
window.startMirandaApp = startMirandaApp;

/* Llamado por auth.js al cerrar sesión: evita que un hashchange en curso
   vuelva a dibujar la app con los datos de la sesión anterior. */
window.mirandaResetSession = function mirandaResetSession() {
  STATE = null;
  CURRENT_USER = null;
};

/* ---------- Utilidades ---------- */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function speak(text, lang) {
  if (!("speechSynthesis" in window)) return false;
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = 0.85;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
    return true;
  } catch (e) { return false; }
}

/* Bolsa global de significados en español, para armar distractores en escucha */
const ALL_ES_WORDS = [];
DAYS.forEach((d) => {
  d.englishVocab.forEach((v) => ALL_ES_WORDS.push(v.es));
  d.frenchVocab.forEach((v) => ALL_ES_WORDS.push(v.es));
});

function buildListeningQuestions(vocabList, lang) {
  const items = vocabList.slice(0, 3);
  return items.map((v) => {
    const pool = ALL_ES_WORDS.filter((es) => es !== v.es);
    const distractors = shuffle(pool).slice(0, 2);
    const options = shuffle([v.es, ...distractors]);
    return { word: v.w, lang, correct: v.es, options };
  });
}

/* ---------- Cálculos derivados ----------
   Todas aceptan un "state" opcional (por defecto el STATE global del niño
   que tiene la sesión activa) para que el panel de padres/admin pueda
   reutilizarlas pasando el progreso de otro usuario en modo solo lectura. */
function dayMaxScore(day) {
  // Warm-up: hasta 20 puntos
  // Materia: 10 preguntas × 10 puntos = 100 puntos
  // English: 4 listening × 5 puntos = 20 puntos
  // Français: 4 listening × 5 puntos = 20 puntos
  // Challenge: 20 puntos
  // Journal: 10 puntos
  // Total: ~190 puntos (2 horas de contenido)
  return 20 + day.subjectQuestions.length * 10 + 4 * 5 + 4 * 5 + 20 + 10;
}
function totalHerraduras(state = STATE) {
  return Object.values(state.completedDays).reduce((s, d) => s + d.score, 0);
}
function levelInfo(state = STATE) {
  const total = totalHerraduras(state);
  const levels = [
    { min: 0, name: "Potrillo", emoji: "🐴" },
    { min: 200, name: "Potro en Entrenamiento", emoji: "🐴✨" },
    { min: 600, name: "Caballo de Escuela", emoji: "🐎" },
    { min: 1100, name: "Jinete Avanzado", emoji: "🏇" },
    { min: 1700, name: "Campeón(a) de Verano", emoji: "👑🐎" },
  ];
  let idx = 0;
  for (let i = 0; i < levels.length; i++) if (total >= levels[i].min) idx = i;
  const next = levels[idx + 1];
  return { level: idx + 1, name: levels[idx].name, emoji: levels[idx].emoji, total, next };
}
function catTotals() {
  const totals = { mate: 0, leng: 0, cien: 0, soc: 0 };
  DAYS.forEach((d) => d.subjectQuestions.forEach((q) => totals[q.cat]++));
  const en = DAYS.length * 3;
  const fr = DAYS.length * 3;
  return { ...totals, en, fr };
}
function catProgress(state = STATE) {
  const totals = { mate: 0, leng: 0, cien: 0, soc: 0, en: 0, fr: 0 };
  Object.values(state.completedDays).forEach((rec) => {
    CATS.forEach((c) => (totals[c] += rec.catCorrect[c] || 0));
    totals.en += rec.enCorrect || 0;
    totals.fr += rec.frCorrect || 0;
  });
  return totals;
}
function badgeStatus(state = STATE) {
  const totals = catTotals();
  const progress = catProgress(state);
  return BADGES.map((b) => {
    const total = totals[b.cat];
    const threshold = Math.max(1, Math.ceil(total * 0.7));
    const current = Math.min(progress[b.cat], total);
    return { ...b, current, threshold, total, unlocked: current >= threshold };
  });
}
function weekRibbon(weekIdx, state = STATE) {
  const [start, end] = WEEKS[weekIdx].range;
  let sumPct = 0, count = 0;
  for (let i = start; i <= end; i++) {
    const rec = state.completedDays[i];
    if (rec) { sumPct += (rec.score / rec.maxScore) * 100; count++; }
  }
  if (count === 0) return null;
  const avg = sumPct / count;
  const complete = count === (end - start + 1);
  if (!complete) return { label: "En progreso", cls: "ribbon-progress" };
  if (avg >= 85) return { label: "🥇 Oro", cls: "ribbon-gold" };
  if (avg >= 65) return { label: "🥈 Plata", cls: "ribbon-silver" };
  if (avg >= 40) return { label: "🥉 Bronce", cls: "ribbon-bronze" };
  return { label: "Participación", cls: "ribbon-part" };
}
function isUnlocked(idx, state = STATE) {
  if (idx === 0) return true;
  return !!state.completedDays[idx - 1] || !!state.completedDays[idx];
}
function nextIncompleteDay(state = STATE) {
  for (let i = 0; i < DAYS.length; i++) {
    if (!state.completedDays[i]) return i;
  }
  return DAYS.length - 1;
}

/* ---------- Render raíz ---------- */
const view = document.getElementById("view");
const heroHerraduras = document.getElementById("heroHerraduras");
const heroLevel = document.getElementById("heroLevel");

function refreshHero() {
  const lvl = levelInfo();
  heroHerraduras.textContent = `🧲 ${totalHerraduras()}`;
  heroLevel.textContent = `${lvl.emoji} ${lvl.name}`;
}

function setActiveNav(name) {
  document.querySelectorAll(".navbtn").forEach((b) => b.classList.toggle("active", b.dataset.nav === name));
}

function go(route) {
  window.location.hash = route;
}
window.addEventListener("hashchange", render);
// El arranque inicial lo dispara auth.js llamando a startMirandaApp() tras validar la sesión.

function renderOnboarding() {
  view.innerHTML = `
    <div class="card hero-card">
      <div class="hero-horse">🐴</div>
      <h2>¡Bienvenida al rancho, Miranda!</h2>
      <p class="muted">Antes de empezar, ¿qué nombre le pondrás a tu caballo?</p>
      <input id="horseNameInput" class="ios-input" type="text" placeholder="Ej: Luna" maxlength="20" />
      <button class="btn btn-primary big" id="horseNameBtn">¡Listo! 🐎</button>
    </div>
  `;
  const input = view.querySelector("#horseNameInput");
  input.focus();
  function confirmName() {
    const name = input.value.trim() || "Luna";
    STATE.horseName = name;
    saveState(STATE);
    render();
  }
  view.querySelector("#horseNameBtn").addEventListener("click", confirmName);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") confirmName(); });
}

function render() {
  if (!STATE) return; // aún no hay sesión iniciada
  refreshHero();
  if (!STATE.horseName) { renderOnboarding(); return; }
  const hash = window.location.hash.replace("#", "") || "home";
  if (hash.startsWith("day-")) {
    const idx = parseInt(hash.split("-")[1], 10);
    setActiveNav("calendar");
    renderDaySession(idx);
    return;
  }
  setActiveNav(hash);
  if (hash === "calendar") renderCalendar();
  else if (hash === "tasks") renderTasks();
  else if (hash === "achievements") renderAchievements();
  else if (hash === "horse") renderHorse();
  else renderHome();
}

/* ---------- HOME ---------- */
function renderHome() {
  const lvl = levelInfo();
  const completedCount = Object.keys(STATE.completedDays).length;
  const nextIdx = nextIncompleteDay();
  const nextDay = DAYS[nextIdx];
  view.innerHTML = `
    <h2 class="page-title">Inicio</h2>
    <section class="card hero-card">
      <div class="hero-horse">${lvl.emoji}</div>
      <h2>¡Hola, jinete de ${STATE.horseName}!</h2>
      <p class="muted">Estás en el rancho "Stable Stars". Nivel actual: <strong>${lvl.name}</strong></p>
      <div class="progress-bar big"><div class="progress-fill" style="width:${Math.round((completedCount / DAYS.length) * 100)}%"></div></div>
      <p class="muted">${completedCount} / ${DAYS.length} jornadas completadas</p>
      <button class="btn btn-primary big" id="continueBtn">🐴 Continuar entrenamiento: ${nextDay.title}</button>
    </section>
    <section class="grid3">
      <button class="card tile" data-go="calendar">📅<br>Calendario de julio</button>
      <button class="card tile" data-go="achievements">🏆<br>Mis Logros</button>
      <button class="card tile" data-go="horse">🐎<br>Mi Caballo</button>
    </section>
    <section class="card">
      <h3>El Rancho</h3>
      <div class="ranch-map">
        <div class="ranch-building">🏠<span>Granero de Matemáticas</span></div>
        <div class="ranch-building">📖<span>Biblioteca del Rancho</span></div>
        <div class="ranch-building">🩺<span>Veterinaria (Ciencias)</span></div>
        <div class="ranch-building">🗺️<span>Oficina de Rutas (Sociales)</span></div>
        <div class="ranch-building">🏇<span>English Riding Ring</span></div>
        <div class="ranch-building">🎪<span>Piste Française</span></div>
      </div>
    </section>
  `;
  view.querySelector("#continueBtn").addEventListener("click", () => go(`day-${nextIdx}`));
  view.querySelectorAll("[data-go]").forEach((b) => b.addEventListener("click", () => go(b.dataset.go)));
}

/* ---------- CALENDARIO ---------- */
function renderCalendar() {
  let html = `<h2 class="page-title">📅 Calendario de julio 2026</h2>`;
  WEEKS.forEach((week, wIdx) => {
    const ribbon = weekRibbon(wIdx);
    html += `<h3 class="week-title">${week.title} ${ribbon ? `<span class="ribbon ${ribbon.cls}">${ribbon.label}</span>` : ""}</h3><div class="day-grid">`;
    for (let i = week.range[0]; i <= week.range[1]; i++) {
      const day = DAYS[i];
      const rec = STATE.completedDays[i];
      const unlocked = isUnlocked(i);
      const stars = rec ? starsFor(rec.score, rec.maxScore) : 0;
      html += `
        <div class="daycard ${unlocked ? "" : "locked"} ${day.isShowDay ? "showday" : ""}" data-idx="${i}">
          <div class="daycard-date">${day.date}</div>
          <div class="daycard-title">${day.title}</div>
          <div class="daycard-subject">${day.subjectLabel}</div>
          ${unlocked
            ? rec
              ? `<div class="stars">${"⭐".repeat(stars)}${"☆".repeat(3 - stars)}</div><div class="muted small">${rec.score}/${rec.maxScore} 🧲</div><button class="btn small">Repasar</button>`
              : `<button class="btn btn-primary small">Jugar</button>`
            : `<div class="lockmsg">🔒 Completa el día anterior</div>`
          }
        </div>`;
    }
    html += `</div>`;
  });
  view.innerHTML = html;
  view.querySelectorAll(".daycard:not(.locked)").forEach((el) => {
    el.addEventListener("click", () => go(`day-${el.dataset.idx}`));
  });
}
function starsFor(score, max) {
  const pct = (score / max) * 100;
  if (pct >= 85) return 3;
  if (pct >= 60) return 2;
  if (pct > 0) return 1;
  return 0;
}

/* ---------- TAREAS DIARIAS (asignadas por el padre/madre) ---------- */
const WEEKDAY_LETTERS = ["D", "L", "M", "X", "J", "V", "S"]; // getUTCDay(): 0=domingo
function weekdayLetter(dateISO) {
  return WEEKDAY_LETTERS[new Date(dateISO + "T00:00:00Z").getUTCDay()];
}
async function tasksApiFetch(path, opts = {}) {
  const token = window.mirandaAuthToken;
  const res = await fetch(path, {
    ...opts,
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + token, ...(opts.headers || {}) },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.ok === false) throw new Error(data.error || "Error de red");
  return data;
}
async function renderTasks() {
  view.innerHTML = `<h2 class="page-title">✅ Mis Tareas</h2><p class="muted">Cargando...</p>`;
  let data;
  try {
    data = await tasksApiFetch("/api/tasks");
  } catch (e) {
    view.innerHTML = `<h2 class="page-title">✅ Mis Tareas</h2><div class="card"><p class="feedback" style="color:#C22A20;">${e.message}</p></div>`;
    return;
  }
  view.innerHTML = buildTasksHTML(data, true);
  wireTaskToggles(data);
}
function buildTasksHTML(data, interactive) {
  const todayIdx = SESSION ? SESSION.idx : 0;
  const activeTasks = data.tasks.filter((t) => t.active && (t.dayIndex === todayIdx || t.dayIndex === undefined));
  const doneCount = data.completedToday ? data.completedToday.length : 0;
  // Si una tarea se completó hoy y luego el padre la pausó, "total" (solo
  // activas) podría quedar menor que "hechas" -- lo ajustamos solo para
  // mostrar, sin tocar los datos reales.
  const total = Math.max(activeTasks.length, doneCount);
  const pct = total ? Math.round((doneCount / total) * 100) : 0;

  let html = `<h2 class="page-title">✅ Mis Tareas</h2>`;
  html += `
    <div class="card hero-card">
      <div class="hero-horse">${total && doneCount === total ? "🎉" : "📋"}</div>
      <h3>${doneCount} / ${total} tareas de hoy</h3>
      <div class="progress-bar big"><div class="progress-fill" style="width:${pct}%"></div></div>
      ${total === 0 ? `<p class="muted small">Tu papá o mamá todavía no te ha asignado tareas.</p>` : ""}
    </div>`;

  if (activeTasks.length) {
    html += `<div class="ios-list">`;
    activeTasks.forEach((t) => {
      const done = data.completedToday.includes(t.id);
      html += `
        <button class="ios-row task-row ${done ? "task-done" : ""}" ${interactive ? `data-task-id="${t.id}"` : "disabled"}>
          <span>${t.emoji} ${t.title}</span>
          <span class="task-check">${done ? "✅" : "☐"}</span>
        </button>`;
    });
    html += `</div>`;
  }

  html += `<div class="ios-section-label">Esta semana</div><div class="week-strip">`;
  data.week.forEach((d) => {
    const donePct = d.total ? Math.min(100, Math.round((d.done / d.total) * 100)) : 0;
    const full = d.total > 0 && d.done >= d.total;
    html += `
      <div class="week-day ${full ? "week-day-full" : ""}">
        <div class="week-day-letter">${weekdayLetter(d.date)}</div>
        <div class="week-day-bar"><div class="week-day-fill" style="height:${donePct}%"></div></div>
        <div class="week-day-count">${d.done}/${d.total}</div>
      </div>`;
  });
  html += `</div>`;
  return html;
}
function wireTaskToggles(data) {
  view.querySelectorAll("[data-task-id]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      btn.disabled = true;
      try {
        const updated = await tasksApiFetch("/api/tasks/" + encodeURIComponent(btn.dataset.taskId) + "/toggle", { method: "POST" });
        view.innerHTML = buildTasksHTML(updated, true);
        wireTaskToggles(updated);
      } catch (e) {
        btn.disabled = false;
        window.alert(e.message);
      }
    });
  });
}

/* ---------- LOGROS ---------- */
function renderAchievements() {
  const badges = badgeStatus();
  let html = `<h2 class="page-title">🏆 Mis Logros</h2><div class="grid3">`;
  badges.forEach((b) => {
    const pct = Math.min(100, Math.round((b.current / b.threshold) * 100));
    html += `
      <div class="card badge ${b.unlocked ? "unlocked" : ""}">
        <div class="badge-emoji">${b.emoji}</div>
        <div class="badge-name">${b.name}</div>
        <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
        <div class="muted small">${b.current} / ${b.threshold} correctas</div>
        ${b.unlocked ? '<div class="unlocked-tag">¡Desbloqueada!</div>' : ""}
      </div>`;
  });
  html += `</div><h3 class="page-title">Listones semanales</h3><div class="grid3">`;
  WEEKS.forEach((w, i) => {
    const r = weekRibbon(i);
    html += `<div class="card ribboncard"><div class="ribbon-big">${r ? r.label : "🔓 Sin empezar"}</div><div class="muted small">${w.title}</div></div>`;
  });
  html += `</div>`;
  const finalRec = STATE.completedDays[DAYS.length - 1];
  html += `<div class="card final-badge ${finalRec ? "unlocked" : ""}">
    <div class="badge-emoji">👑🐎</div>
    <div class="badge-name">Campeona del Gran Concurso de Verano</div>
    <div class="muted small">${finalRec ? "¡Conseguido el 31 de julio!" : "Se desbloquea al terminar el 31 de julio"}</div>
  </div>`;
  view.innerHTML = html;
}

/* ---------- MI CABALLO ---------- */
function renderHorse() {
  const lvl = levelInfo();
  const safePct = Math.min(100, Math.round((lvl.total / (lvl.next ? lvl.next.min : lvl.total || 1)) * 100));
  view.innerHTML = `
    <h2 class="page-title">🐎 Mi Caballo: ${STATE.horseName}</h2>
    <div class="card horse-card">
      <div class="hero-horse big">${lvl.emoji}</div>
      <h3>${lvl.name}</h3>
      <p class="muted">Herraduras totales: <strong>🧲 ${lvl.total}</strong></p>
      ${lvl.next
        ? `<div class="progress-bar"><div class="progress-fill" style="width:${safePct}%"></div></div><p class="muted small">${lvl.next.min - lvl.total} 🧲 para llegar a "${lvl.next.name}"</p>`
        : `<p class="muted">¡Nivel máximo alcanzado! 🎉</p>`}
    </div>
    <div class="ios-section-label">Cuenta</div>
    <div class="ios-list">
      <div class="ios-row ios-row-static">
        <span>Sesión iniciada como</span>
        <span class="muted small">${CURRENT_USER ? CURRENT_USER.email : "—"}</span>
      </div>
      <button class="ios-row" id="logoutBtn">
        <span>Cerrar sesión</span>
        <span class="ios-chevron">›</span>
      </button>
    </div>
    <div class="ios-section-label">Ajustes</div>
    <div class="ios-list">
      <button class="ios-row ios-row-danger" id="resetBtn">
        <span>Reiniciar progreso (para papás)</span>
        <span class="ios-chevron">›</span>
      </button>
    </div>
  `;
  view.querySelector("#resetBtn").addEventListener("click", resetProgress);
  view.querySelector("#logoutBtn").addEventListener("click", () => window.mirandaLogout());
}

/* ---------- SESIÓN DIARIA ---------- */
let SESSION = null;

function renderDaySession(idx) {
  if (!isUnlocked(idx)) { go("calendar"); return; }
  const day = DAYS[idx];
  SESSION = {
    idx, day,
    step: 0,
    score: 0,
    maxScore: dayMaxScore(day),
    catCorrect: { mate: 0, leng: 0, cien: 0, soc: 0 },
    enCorrect: 0, frCorrect: 0,
    journalText: STATE.completedDays[idx] ? STATE.completedDays[idx].journal || "" : "",
  };
  renderStep();
}

function sessionProgressBar() {
  const steps = ["Calentamiento", "Inicio", "Materia", "English", "Français", "Desafío", "Diario", "Resumen"];
  return `<div class="steps">${steps.map((s, i) => `<span class="step ${i === SESSION.step ? "on" : ""} ${i < SESSION.step ? "done" : ""}">${s}</span>`).join("")}</div>`;
}

function renderStep() {
  const day = SESSION.day;
  switch (SESSION.step) {
    case 0: return renderWarmupStep(day);
    case 1: return renderIntroStep(day);
    case 2: return renderQuizStep(day);
    case 3: return renderLangStep(day, "en");
    case 4: return renderLangStep(day, "fr");
    case 5: return renderChallengeStep(day);
    case 6: return renderJournalStep(day);
    case 7: return renderSummaryStep(day);
  }
}
function nextStep() { SESSION.step++; renderStep(); }

function renderWarmupStep(day) {
  const prevIdx = SESSION.idx - 1;
  const prevDay = prevIdx >= 0 ? DAYS[prevIdx] : null;

  if (!prevDay) {
    view.innerHTML = `
      ${sessionProgressBar()}
      <div class="card session-card">
        <div class="session-tag">🔥 Calentamiento</div>
        <h3>Bienvenida a la Academia de Miranda</h3>
        <p>Hoy es tu primer día. Vamos a empezar con una introducción rápida sobre el rancho y los caballos.</p>
        <div class="warmup-facts">
          <div class="fact">🐴 <strong>Los caballos</strong> pueden alcanzar velocidades de hasta 88 km/h</div>
          <div class="fact">🏇 <strong>Los jinetes</strong> aprenden técnicas que toman años de práctica</div>
          <div class="fact">💪 <strong>El entrenamiento</strong> requiere dedicación y paciencia</div>
        </div>
        <button class="btn btn-primary big" id="continueBtn">Continuar 🐴</button>
      </div>
    `;
    view.querySelector("#continueBtn").addEventListener("click", nextStep);
    return;
  }

  const prevVocabEn = prevDay.englishVocab.slice(0, 4);
  const matchingPairs = prevVocabEn.map(v => ({ en: v.w, es: v.es }));
  const shuffledEs = shuffle([...matchingPairs.map(p => p.es)]);
  let matchedPairs = 0;
  let selectedLeft = null;

  function drawMatching() {
    const maxMatches = matchingPairs.length;
    view.innerHTML = `
      ${sessionProgressBar()}
      <div class="card session-card">
        <div class="session-tag">🔥 Calentamiento · Repaso del vocabulario anterior</div>
        <h3>Empareja las palabras (${matchedPairs}/${maxMatches} correctas)</h3>
        <p class="muted small">Haz click en una palabra en inglés y luego en su traducción</p>
        <div class="matching-container">
          <div class="matching-left">
            ${matchingPairs.map((v, i) => `
              <div class="match-item ${v.matched ? 'matched' : ''}" data-pair="${i}">
                <span class="match-label">${v.en}</span>
              </div>
            `).join("")}
          </div>
          <div class="matching-right">
            ${shuffledEs.map((es, i) => {
              const pairIdx = matchingPairs.findIndex(p => p.es === es);
              return `<div class="match-item ${matchingPairs[pairIdx].matched ? 'matched' : ''}" data-pair="${pairIdx}">
                <span class="match-label">${es}</span>
              </div>`;
            }).join("")}
          </div>
        </div>
        <button class="btn btn-primary" id="matchDoneBtn" ${matchedPairs === maxMatches ? "" : "disabled"}>Siguiente 🐎</button>
      </div>
    `;

    view.querySelectorAll(".match-item").forEach(item => {
      if (item.classList.contains("matched")) {
        item.style.opacity = "0.5";
        return;
      }
      item.addEventListener("click", function() {
        const pairIdx = Number(this.dataset.pair);

        if (matchingPairs[pairIdx].matched) return;

        if (!selectedLeft) {
          selectedLeft = { el: this, idx: pairIdx };
          this.classList.add("selected");
        } else {
          if (selectedLeft.idx === pairIdx) {
            matchingPairs[pairIdx].matched = true;
            matchedPairs++;
            selectedLeft.el.classList.add("matched");
            this.classList.add("matched");
            selectedLeft.el.classList.remove("selected");
            selectedLeft = null;

            if (matchedPairs === maxMatches) {
              view.querySelector("#matchDoneBtn").disabled = false;
            }
            drawMatching();
          } else {
            selectedLeft.el.classList.remove("selected");
            selectedLeft = null;
          }
        }
      });
    });

    view.querySelector("#matchDoneBtn").addEventListener("click", () => {
      SESSION.score += Math.min(matchedPairs * 5, 20);
      nextStep();
    });
  }

  drawMatching();
}

function renderIntroStep(day) {
  view.innerHTML = `
    ${sessionProgressBar()}
    <div class="card session-card">
      <div class="session-tag">${day.isShowDay ? "🏆 Día de Concurso" : "📘 " + day.subjectLabel}</div>
      <h2>${day.title}</h2>
      <p class="muted">${day.date}</p>
      <p class="intro-text">${day.intro}</p>
      <button class="btn btn-primary big" id="startBtn">Empezar jornada 🐴</button>
    </div>
  `;
  view.querySelector("#startBtn").addEventListener("click", nextStep);
}

function renderQuizStep(day) {
  renderQuizQuestions(day.subjectQuestions, "Materia del día: " + day.subjectLabel, (correctCount, perQuestion) => {
    SESSION.score += correctCount * 10;
    perQuestion.forEach((ok, i) => { if (ok) SESSION.catCorrect[day.subjectQuestions[i].cat]++; });
    nextStep();
  });
}

function renderQuizQuestions(questions, heading, onDone) {
  let current = 0;
  let correctCount = 0;
  const perQuestion = [];

  function draw() {
    const q = questions[current];
    view.innerHTML = `
      ${sessionProgressBar()}
      <div class="card session-card">
        <div class="session-tag">${heading} (${current + 1}/${questions.length})</div>
        <h3>${q.text}</h3>
        <div class="options" id="opts">
          ${q.options.map((o) => `<button class="opt-btn" data-o="${encodeURIComponent(o)}">${o}</button>`).join("")}
        </div>
        <div id="feedback" class="feedback"></div>
        <button class="btn btn-primary" id="nextQBtn" style="display:none">Siguiente</button>
      </div>
    `;
    const optButtons = view.querySelectorAll(".opt-btn");
    optButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        optButtons.forEach((b) => (b.disabled = true));
        const chosen = decodeURIComponent(btn.dataset.o);
        const ok = chosen === q.answer;
        perQuestion.push(ok);
        if (ok) { correctCount++; btn.classList.add("correct"); }
        else {
          btn.classList.add("wrong");
          optButtons.forEach((b) => { if (decodeURIComponent(b.dataset.o) === q.answer) b.classList.add("correct"); });
        }
        view.querySelector("#feedback").textContent = ok ? "¡Muy bien! 🧲 +10" : "Casi. La respuesta correcta está en verde.";
        view.querySelector("#nextQBtn").style.display = "inline-block";
      }, { once: true });
    });
    view.querySelector("#nextQBtn").addEventListener("click", () => {
      current++;
      if (current < questions.length) draw();
      else onDone(correctCount, perQuestion);
    });
  }
  draw();
}

function renderLangStep(day, lang) {
  const isEn = lang === "en";
  const vocab = isEn ? day.englishVocab : day.frenchVocab;
  const dialogue = isEn ? day.englishDialogue : day.frenchDialogue;
  const speakLang = isEn ? "en-US" : "fr-FR";
  const flagLabel = isEn ? "🏇 English Riding Ring" : "🎪 Piste Française";

  view.innerHTML = `
    ${sessionProgressBar()}
    <div class="card session-card">
      <div class="session-tag">${flagLabel}</div>
      <h3>Vocabulario del establo</h3>
      <div class="vocab-grid">
        ${vocab.map((v) => `
          <div class="vocab-card">
            <div class="vocab-emoji">${v.e || "🐴"}</div>
            <div class="vocab-word">${v.w}</div>
            <div class="vocab-es muted">${v.es}</div>
            <button class="btn tiny speak-btn" data-w="${encodeURIComponent(v.w)}">🔊</button>
          </div>`).join("")}
      </div>
      <h3>Diálogo</h3>
      <div class="dialogue">
        ${dialogue.map((l, i) => `
          <div class="bubble ${i % 2 === 0 ? "bubble-a" : "bubble-b"}">
            <div>${l.t}</div>
            <div class="muted small">${l.es}</div>
            <button class="btn tiny speak-btn" data-w="${encodeURIComponent(l.t)}">🔊</button>
          </div>`).join("")}
      </div>
      <button class="btn btn-primary big" id="listenQuizBtn">Ir al ejercicio de escucha 🎧</button>
    </div>
  `;
  view.querySelectorAll(".speak-btn").forEach((btn) => {
    btn.addEventListener("click", () => speak(decodeURIComponent(btn.dataset.w), speakLang));
  });
  view.querySelector("#listenQuizBtn").addEventListener("click", () => renderListeningQuiz(day, lang));
}

function renderListeningQuiz(day, lang) {
  const isEn = lang === "en";
  const vocab = isEn ? day.englishVocab : day.frenchVocab;
  const speakLang = isEn ? "en-US" : "fr-FR";
  const flagLabel = isEn ? "🏇 English Riding Ring" : "🎪 Piste Française";
  const questions = buildListeningQuestions(vocab, lang);
  let current = 0, correctCount = 0;

  function draw() {
    const item = questions[current];
    view.innerHTML = `
      ${sessionProgressBar()}
      <div class="card session-card">
        <div class="session-tag">${flagLabel} · Escucha y elige (${current + 1}/${questions.length})</div>
        <button class="btn big" id="playBtn">🔊 Escuchar palabra</button>
        <p class="muted small">¿Qué significa lo que escuchaste?</p>
        <div class="options">
          ${item.options.map((o) => `<button class="opt-btn" data-o="${encodeURIComponent(o)}">${o}</button>`).join("")}
        </div>
        <div id="feedback" class="feedback"></div>
        <button class="btn btn-primary" id="nextQBtn" style="display:none">Siguiente</button>
      </div>
    `;
    view.querySelector("#playBtn").addEventListener("click", () => speak(item.word, speakLang));
    speak(item.word, speakLang);
    const optButtons = view.querySelectorAll(".opt-btn");
    optButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        optButtons.forEach((b) => (b.disabled = true));
        const chosen = decodeURIComponent(btn.dataset.o);
        const ok = chosen === item.correct;
        if (ok) { correctCount++; btn.classList.add("correct"); }
        else {
          btn.classList.add("wrong");
          optButtons.forEach((b) => { if (decodeURIComponent(b.dataset.o) === item.correct) b.classList.add("correct"); });
        }
        view.querySelector("#feedback").textContent = ok ? "¡Excelente oído! 🧲 +5" : "La palabra era: " + item.word + " → " + item.correct;
        view.querySelector("#nextQBtn").style.display = "inline-block";
      }, { once: true });
    });
    view.querySelector("#nextQBtn").addEventListener("click", () => {
      current++;
      if (current < questions.length) draw();
      else {
        SESSION.score += correctCount * 5;
        if (isEn) SESSION.enCorrect += correctCount; else SESSION.frCorrect += correctCount;
        nextStep();
      }
    });
  }
  draw();
}

function renderChallengeStep(day) {
  const rawCombined = [
    ...day.englishVocab.map((v) => ({ w: v.w, es: v.es })),
    ...day.frenchVocab.map((v) => ({ w: v.w, es: v.es })),
  ];
  // Evita significados en español repetidos (ambiguos al emparejar visualmente)
  const seenEs = new Set();
  const combined = [];
  for (const item of rawCombined) {
    if (seenEs.has(item.es)) continue;
    seenEs.add(item.es);
    combined.push(item);
    if (combined.length === 6) break;
  }
  const left = shuffle(combined.map((c, i) => ({ ...c, id: i })));
  const right = shuffle(combined.map((c, i) => ({ ...c, id: i })));
  let selectedLeft = null;
  let matched = 0;
  let attempts = 0;

  view.innerHTML = `
    ${sessionProgressBar()}
    <div class="card session-card">
      <div class="session-tag">🎯 Desafío del Establo</div>
      <h3>Empareja cada palabra con su significado</h3>
      <div class="match-grid">
        <div class="match-col" id="colLeft">
          ${left.map((c) => `<button class="match-btn" data-id="${c.id}" data-side="l">${c.w}</button>`).join("")}
        </div>
        <div class="match-col" id="colRight">
          ${right.map((c) => `<button class="match-btn" data-id="${c.id}" data-side="r">${c.es}</button>`).join("")}
        </div>
      </div>
      <p class="muted small" id="matchStatus">Emparejadas: 0 / ${combined.length}</p>
    </div>
  `;
  function checkDone() {
    if (matched === combined.length) {
      const bonus = Math.max(5, 20 - Math.max(0, attempts - combined.length) * 2);
      SESSION.score += bonus;
      setTimeout(() => {
        view.querySelector(".session-card").insertAdjacentHTML("beforeend", `<button class="btn btn-primary big" id="challengeDoneBtn">¡Listo! Continuar (🧲 +${bonus})</button>`);
        view.querySelector("#challengeDoneBtn").addEventListener("click", nextStep);
      }, 300);
    }
  }
  view.querySelectorAll(".match-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("matched")) return;
      if (btn.dataset.side === "l") {
        view.querySelectorAll('[data-side="l"]').forEach((b) => b.classList.remove("selected"));
        selectedLeft = btn;
        btn.classList.add("selected");
      } else if (selectedLeft) {
        attempts++;
        if (selectedLeft.dataset.id === btn.dataset.id) {
          selectedLeft.classList.add("matched");
          btn.classList.add("matched");
          selectedLeft.disabled = true;
          btn.disabled = true;
          matched++;
          view.querySelector("#matchStatus").textContent = `Emparejadas: ${matched} / ${combined.length}`;
          selectedLeft = null;
          checkDone();
        } else {
          btn.classList.add("shake");
          selectedLeft.classList.add("shake");
          setTimeout(() => {
            btn.classList.remove("shake");
            if (selectedLeft) selectedLeft.classList.remove("shake", "selected");
            selectedLeft = null;
          }, 400);
        }
      }
    });
  });
}

function renderJournalStep(day) {
  view.innerHTML = `
    ${sessionProgressBar()}
    <div class="card session-card">
      <div class="session-tag">📔 Diario de Miranda</div>
      <h3>${day.journalPrompt}</h3>
      <textarea id="journalArea" rows="6" placeholder="Escribe aquí...">${SESSION.journalText}</textarea>
      <button class="btn btn-primary big" id="journalDoneBtn">Guardar y continuar</button>
    </div>
  `;
  view.querySelector("#journalDoneBtn").addEventListener("click", () => {
    const text = view.querySelector("#journalArea").value;
    SESSION.journalText = text;
    if (text.trim().length >= 10) SESSION.score += 10;
    nextStep();
  });
}

function renderSummaryStep(day) {
  const rec = {
    score: SESSION.score,
    maxScore: SESSION.maxScore,
    catCorrect: SESSION.catCorrect,
    enCorrect: SESSION.enCorrect,
    frCorrect: SESSION.frCorrect,
    journal: SESSION.journalText,
    date: new Date().toISOString(),
  };
  STATE.completedDays[SESSION.idx] = rec;
  saveState(STATE);
  refreshHero();

  const stars = starsFor(rec.score, rec.maxScore);
  const badgesBefore = STATE._badgesSnapshot || [];
  const badgesNow = badgeStatus().filter((b) => b.unlocked).map((b) => b.id);
  const newlyUnlocked = badgesNow.filter((id) => !badgesBefore.includes(id));
  STATE._badgesSnapshot = badgesNow;

  view.innerHTML = `
    ${sessionProgressBar()}
    <div class="card session-card center">
      <div class="hero-horse">🎉</div>
      <h2>¡Jornada completada!</h2>
      <p class="stars big">${"⭐".repeat(stars)}${"☆".repeat(3 - stars)}</p>
      <p class="score-big">🧲 ${rec.score} / ${rec.maxScore} herraduras</p>
      ${newlyUnlocked.length ? `<p class="unlocked-tag">¡Nueva insignia desbloqueada! ${newlyUnlocked.map((id) => BADGES.find((b) => b.id === id).emoji).join(" ")}</p>` : ""}
      ${day.isFinal ? `<div class="final-celebration">🏆👑🎉<br><strong>¡${STATE.horseName} y Miranda son Campeonas del Gran Concurso de Verano!</strong></div>` : ""}
      <button class="btn btn-primary big" id="backHomeBtn">Volver al Rancho</button>
      <button class="btn" id="backCalBtn">Ver Calendario</button>
    </div>
  `;
  view.querySelector("#backHomeBtn").addEventListener("click", () => go("home"));
  view.querySelector("#backCalBtn").addEventListener("click", () => go("calendar"));
}

/* ---------- Reset (para papás) ---------- */
function resetProgress() {
  if (window.confirm("¿Seguro que quieres borrar todo el progreso? Esta acción no se puede deshacer.")) {
    localStorage.removeItem(STORAGE_KEY);
    STATE = loadState();
    saveState(STATE); // también borra el respaldo guardado en el servidor
    window.location.hash = "";
    render();
  }
}
