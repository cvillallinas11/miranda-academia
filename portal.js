/* =========================================================
   Stable Stars - Panel de administración y panel de padres
   (reutiliza los cálculos de progreso definidos en app.js)
   ========================================================= */

const portalView = document.getElementById("view");
const ROLE_LABEL = { admin: "🛡️ Admin", parent: "👪 Padre/Madre", child: "🐴 Niño/a" };

/* ---------- Helper de red ---------- */
async function apiFetch(path, opts = {}) {
  const token = window.mirandaAuthToken;
  const res = await fetch(path, {
    ...opts,
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + token, ...(opts.headers || {}) },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.ok === false) throw new Error(data.error || "Error de red");
  return data;
}

/* ---------- Vista de progreso reutilizable (admin y padre) ---------- */
function renderProgressBlock(state, childName) {
  if (!state) {
    return `<div class="card"><p class="muted">${childName} todavía no ha empezado a jugar. En cuanto complete su primera jornada, el progreso aparecerá aquí.</p></div>`;
  }
  const lvl = levelInfo(state);
  const completedCount = Object.keys(state.completedDays).length;
  const safePct = Math.min(100, Math.round((lvl.total / (lvl.next ? lvl.next.min : lvl.total || 1)) * 100));
  const badges = badgeStatus(state);

  let html = `
    <div class="card hero-card">
      <div class="hero-horse">${lvl.emoji}</div>
      <h3>${state.horseName ? `Caballo: ${state.horseName}` : "Aún sin caballo"}</h3>
      <p class="muted">Nivel: <strong>${lvl.name}</strong> · 🧲 ${lvl.total} herraduras</p>
      <div class="progress-bar big"><div class="progress-fill" style="width:${Math.round((completedCount / DAYS.length) * 100)}%"></div></div>
      <p class="muted small">${completedCount} / ${DAYS.length} jornadas completadas</p>
      ${lvl.next ? `<p class="muted small">${lvl.next.min - lvl.total} 🧲 para llegar a "${lvl.next.name}"</p>` : `<p class="muted small">¡Nivel máximo alcanzado! 🎉</p>`}
    </div>
  `;

  html += `<div class="ios-section-label">Insignias</div><div class="grid3">`;
  badges.forEach((b) => {
    const pct = Math.min(100, Math.round((b.current / b.threshold) * 100));
    html += `
      <div class="card badge ${b.unlocked ? "unlocked" : ""}">
        <div class="badge-emoji">${b.emoji}</div>
        <div class="badge-name">${b.name}</div>
        <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
        <div class="muted small">${b.current} / ${b.threshold}</div>
      </div>`;
  });
  html += `</div>`;

  WEEKS.forEach((week, wIdx) => {
    const ribbon = weekRibbon(wIdx, state);
    html += `<h3 class="week-title">${week.title} ${ribbon ? `<span class="ribbon ${ribbon.cls}">${ribbon.label}</span>` : ""}</h3><div class="day-grid">`;
    for (let i = week.range[0]; i <= week.range[1]; i++) {
      const day = DAYS[i];
      const rec = state.completedDays[i];
      const stars = rec ? starsFor(rec.score, rec.maxScore) : 0;
      html += `
        <div class="daycard ${day.isShowDay ? "showday" : ""}">
          <div class="daycard-date">${day.date}</div>
          <div class="daycard-title">${day.title}</div>
          <div class="daycard-subject">${day.subjectLabel}</div>
          ${rec
            ? `<div class="stars">${"⭐".repeat(stars)}${"☆".repeat(3 - stars)}</div><div class="muted small">${rec.score}/${rec.maxScore} 🧲</div>`
            : `<div class="muted small">Pendiente</div>`}
        </div>`;
    }
    html += `</div>`;
  });

  return html;
}

/* ---------- Gestión de tareas diarias (compartida entre padre y admin) ---------- */
async function renderTasksManageBlock(container, email) {
  container.innerHTML = `<p class="muted">Cargando tareas...</p>`;
  let data;
  try {
    data = await apiFetch("/api/tasks/manage/" + encodeURIComponent(email));
  } catch (e) {
    container.innerHTML = `<p class="feedback" style="color:#C22A20;">${e.message}</p>`;
    return;
  }

  container.innerHTML = `
    <div class="card">
      <h3>+ Nueva tarea</h3>
      <input id="ntEmoji" class="ios-input" style="width:56px; text-align:center; display:inline-block; vertical-align:top;" maxlength="2" value="📌" />
      <input id="ntTitle" class="ios-input" style="width:calc(100% - 140px); text-align:left; display:inline-block; margin-left:6px;" placeholder="Ej: Cepillarse los dientes" maxlength="60" />
      <select id="ntDay" class="ios-input" style="width:100%; margin-top:8px; display:block;">
        ${DAYS.map((d, i) => `<option value="${i}">Día ${i + 1}: ${d.title}</option>`).join("")}
      </select>
      <div id="ntError" class="feedback" style="color:#C22A20;"></div>
      <button class="btn btn-primary small" id="ntSubmit">Agregar tarea</button>
    </div>
    <div class="ios-list">
      ${data.tasks.length === 0 ? `<div class="ios-row ios-row-static"><span class="muted">Todavía no hay tareas asignadas</span></div>` : ""}
      ${data.tasks.map((t) => `
        <div class="ios-row ios-row-static" style="align-items:center;">
          <div>
            <span>${t.active ? "" : "⏸ "}${t.emoji} ${t.title}</span>
            ${typeof t.dayIndex === "number" ? `<div class="muted small">Día ${t.dayIndex + 1}: ${DAYS[t.dayIndex] ? DAYS[t.dayIndex].title : ""}</div>` : ""}
          </div>
          <span>
            <button class="btn tiny" data-action="toggle" data-id="${t.id}" data-active="${t.active}">${t.active ? "Pausar" : "Reanudar"}</button>
            <button class="btn tiny" style="color:var(--red);" data-action="delete" data-id="${t.id}">Eliminar</button>
          </span>
        </div>`).join("")}
    </div>
    <div class="ios-section-label">Avance de la semana</div>
    <div class="week-strip">
      ${data.week.map((d) => {
        const pct = d.total ? Math.min(100, Math.round((d.done / d.total) * 100)) : 0;
        const full = d.total > 0 && d.done >= d.total;
        return `
        <div class="week-day ${full ? "week-day-full" : ""}">
          <div class="week-day-letter">${weekdayLetter(d.date)}</div>
          <div class="week-day-bar"><div class="week-day-fill" style="height:${pct}%"></div></div>
          <div class="week-day-count">${d.done}/${d.total}</div>
        </div>`;
      }).join("")}
    </div>
  `;

  container.querySelector("#ntSubmit").addEventListener("click", async () => {
    const emoji = container.querySelector("#ntEmoji").value.trim() || "📌";
    const title = container.querySelector("#ntTitle").value.trim();
    const dayIndex = Number(container.querySelector("#ntDay").value) || 0;
    const errBox = container.querySelector("#ntError");
    errBox.textContent = "";
    if (!title) { errBox.textContent = "Escribe el nombre de la tarea."; return; }
    try {
      await apiFetch("/api/tasks/manage/" + encodeURIComponent(email), { method: "POST", body: JSON.stringify({ title, emoji, dayIndex }) });
      renderTasksManageBlock(container, email);
    } catch (e) {
      errBox.textContent = e.message;
    }
  });
  container.querySelectorAll('[data-action="toggle"]').forEach((btn) => {
    btn.addEventListener("click", async () => {
      const nowActive = btn.dataset.active === "true";
      try {
        await apiFetch("/api/tasks/manage/" + encodeURIComponent(email) + "/" + btn.dataset.id, { method: "PUT", body: JSON.stringify({ active: !nowActive }) });
        renderTasksManageBlock(container, email);
      } catch (e) { window.alert(e.message); }
    });
  });
  container.querySelectorAll('[data-action="delete"]').forEach((btn) => {
    btn.addEventListener("click", async () => {
      if (!window.confirm("¿Eliminar esta tarea? También se borra su historial.")) return;
      try {
        await apiFetch("/api/tasks/manage/" + encodeURIComponent(email) + "/" + btn.dataset.id, { method: "DELETE" });
        renderTasksManageBlock(container, email);
      } catch (e) { window.alert(e.message); }
    });
  });
}

/* =========================================================
   PANEL DE PADRES
   ========================================================= */
let PARENT_USER = null;
let PARENT_CHILDREN = [];

function mountParentChrome() {
  const tabbar = document.getElementById("tabbar");
  if (tabbar) {
    tabbar.innerHTML = `
      <button class="navbtn active" data-nav="parent-home">
        <span class="navicon">👪</span><span class="navlabel">Mis hijos</span>
      </button>`;
    tabbar.querySelectorAll("[data-nav]").forEach((btn) => {
      btn.addEventListener("click", () => { window.location.hash = btn.dataset.nav; });
    });
  }
  const stats = document.querySelector(".hero-stats");
  if (stats) {
    stats.style.visibility = "visible";
    stats.innerHTML = `<span class="chip chip-gold">${ROLE_LABEL.parent}</span><button class="chip chip-tint" id="logoutChip" style="border:none;cursor:pointer;">Salir</button>`;
    stats.querySelector("#logoutChip").addEventListener("click", () => window.mirandaLogout());
  }
}

window.startParentPortal = async function startParentPortal(user) {
  PARENT_USER = user;
  mountParentChrome();
  window.addEventListener("hashchange", renderParentRoute);
  await refreshParentChildren();
  renderParentRoute();
};

async function refreshParentChildren() {
  try {
    const data = await apiFetch("/api/parent/children");
    PARENT_CHILDREN = data.children;
  } catch (e) {
    PARENT_CHILDREN = [];
  }
}

function renderParentRoute() {
  const hash = window.location.hash.replace("#", "") || "parent-home";
  if (hash.startsWith("parent-child-")) {
    const email = decodeURIComponent(hash.replace("parent-child-", ""));
    renderParentChildDetail(email);
  } else {
    renderParentHome();
  }
}

function renderParentHome() {
  let html = `<h2 class="page-title">👪 Mis hijos</h2>`;
  if (!PARENT_CHILDREN.length) {
    html += `<div class="card"><p class="muted">Todavía no tienes ningún hijo vinculado a tu cuenta. Pídele al super admin que cree la cuenta de tu hijo(a) y la vincule a tu correo (${PARENT_USER.email}).</p></div>`;
    portalView.innerHTML = html;
    return;
  }
  if (PARENT_CHILDREN.length === 1) {
    // Un solo hijo: mostramos su progreso directamente, sin paso intermedio.
    renderParentChildDetail(PARENT_CHILDREN[0].email);
    return;
  }
  html += `<div class="ios-list">`;
  PARENT_CHILDREN.forEach((c) => {
    html += `<button class="ios-row" data-email="${encodeURIComponent(c.email)}"><span>🐴 ${c.name}</span><span class="ios-chevron">›</span></button>`;
  });
  html += `</div>`;
  portalView.innerHTML = html;
  portalView.querySelectorAll("[data-email]").forEach((btn) => {
    btn.addEventListener("click", () => { window.location.hash = "parent-child-" + btn.dataset.email; });
  });
}

async function renderParentChildDetail(email) {
  const child = PARENT_CHILDREN.find((c) => c.email === email);
  const backBtn = PARENT_CHILDREN.length > 1 ? `<button class="btn" id="backBtn">‹ Mis hijos</button>` : "";
  portalView.innerHTML = `<h2 class="page-title">🐴 ${child ? child.name : "Progreso"}</h2>${backBtn}
    <div class="ios-section-label">Tareas diarias</div>
    <div id="tasksBlock"><p class="muted">Cargando tareas...</p></div>
    <div class="ios-section-label">Progreso académico</div>
    <div id="progressBlock"><p class="muted">Cargando progreso...</p></div>`;
  if (backBtn) portalView.querySelector("#backBtn").addEventListener("click", () => { window.location.hash = "parent-home"; });

  renderTasksManageBlock(portalView.querySelector("#tasksBlock"), email);

  try {
    const data = await apiFetch("/api/parent/progress/" + encodeURIComponent(email));
    portalView.querySelector("#progressBlock").innerHTML = renderProgressBlock(data.state, child ? child.name : "");
  } catch (e) {
    portalView.querySelector("#progressBlock").innerHTML = `<div class="card"><p class="feedback" style="color:#C22A20;">${e.message}</p></div>`;
  }
}

/* =========================================================
   PANEL DE ADMINISTRACIÓN (super admin)
   ========================================================= */
let ADMIN_USER = null;

function mountAdminChrome() {
  const tabbar = document.getElementById("tabbar");
  if (tabbar) {
    tabbar.innerHTML = `
      <button class="navbtn active" data-nav="admin-users">
        <span class="navicon">👤</span><span class="navlabel">Usuarios</span>
      </button>`;
    tabbar.querySelectorAll("[data-nav]").forEach((btn) => {
      btn.addEventListener("click", () => { window.location.hash = btn.dataset.nav; });
    });
  }
  const stats = document.querySelector(".hero-stats");
  if (stats) {
    stats.style.visibility = "visible";
    stats.innerHTML = `<span class="chip chip-gold">${ROLE_LABEL.admin}</span><button class="chip chip-tint" id="logoutChip" style="border:none;cursor:pointer;">Salir</button>`;
    stats.querySelector("#logoutChip").addEventListener("click", () => window.mirandaLogout());
  }
}

window.startAdminPortal = async function startAdminPortal(user) {
  ADMIN_USER = user;
  mountAdminChrome();
  window.addEventListener("hashchange", renderAdminRoute);
  renderAdminRoute();
};

function renderAdminRoute() {
  const hash = window.location.hash.replace("#", "") || "admin-users";
  if (hash.startsWith("admin-progress-")) {
    const email = decodeURIComponent(hash.replace("admin-progress-", ""));
    renderAdminChildProgress(email);
  } else {
    renderAdminUsers();
  }
}

const ROLE_NAMES = { admin: "Super admin", parent: "Padres y madres", child: "Niños y niñas" };

async function renderAdminUsers() {
  portalView.innerHTML = `
    <h2 class="page-title">👤 Usuarios</h2>
    <button class="btn btn-primary big" id="newUserBtn">+ Nuevo usuario</button>
    <div id="createUserCard"></div>
    <div id="usersList"><p class="muted">Cargando...</p></div>
  `;

  let users = [];
  try {
    const data = await apiFetch("/api/admin/users");
    users = data.users;
  } catch (e) {
    portalView.querySelector("#usersList").innerHTML = `<p class="feedback" style="color:#C22A20;">${e.message}</p>`;
    return;
  }

  portalView.querySelector("#newUserBtn").addEventListener("click", () => {
    const card = portalView.querySelector("#createUserCard");
    card.innerHTML = card.innerHTML ? "" : buildCreateUserForm(users);
    if (card.innerHTML) wireCreateUserForm(users);
  });

  renderUsersList(users);
}

function buildCreateUserForm(users) {
  const parents = users.filter((u) => u.role === "parent");
  return `
    <div class="card">
      <h3>Nuevo usuario</h3>
      <input id="nuName" class="ios-input" style="width:100%; text-align:left;" type="text" placeholder="Nombre" />
      <input id="nuEmail" class="ios-input" style="width:100%; text-align:left; margin-top:8px;" type="email" placeholder="Correo" />
      <select id="nuRole" class="ios-select">
        <option value="child">Niño/a</option>
        <option value="parent">Padre/Madre</option>
        <option value="admin">Super admin</option>
      </select>
      <select id="nuParent" class="ios-select" style="display:none;">
        <option value="">Sin padre/madre asignado (puedes vincularlo después)</option>
        ${parents.map((p) => `<option value="${p.email}">${p.name} (${p.email})</option>`).join("")}
      </select>
      <input id="nuPassword" class="ios-input" style="width:100%; text-align:left;" type="text" placeholder="Contraseña (vacío = generar automática)" />
      <div id="nuError" class="feedback" style="color:#C22A20;"></div>
      <div id="nuResult"></div>
      <button class="btn btn-primary big" id="nuSubmit">Crear usuario</button>
    </div>
  `;
}

function wireCreateUserForm(users) {
  const roleSelect = portalView.querySelector("#nuRole");
  const parentSelect = portalView.querySelector("#nuParent");
  roleSelect.addEventListener("change", () => {
    parentSelect.style.display = roleSelect.value === "child" ? "block" : "none";
  });

  portalView.querySelector("#nuSubmit").addEventListener("click", async () => {
    const name = portalView.querySelector("#nuName").value.trim();
    const email = portalView.querySelector("#nuEmail").value.trim().toLowerCase();
    const role = roleSelect.value;
    const parentEmail = role === "child" ? parentSelect.value || null : null;
    const password = portalView.querySelector("#nuPassword").value.trim();
    const errorBox = portalView.querySelector("#nuError");
    const resultBox = portalView.querySelector("#nuResult");
    errorBox.textContent = "";
    resultBox.innerHTML = "";
    try {
      const data = await apiFetch("/api/admin/users", {
        method: "POST",
        body: JSON.stringify({ name, email, role, parentEmail, password }),
      });
      resultBox.innerHTML = `<p class="feedback" style="color:#1F8B3C;">¡Usuario creado!${data.tempPassword ? ` Contraseña: <strong>${data.tempPassword}</strong> (guárdala, no quedó visible en ningún otro lado).` : " Se envió la contraseña por correo."}</p>`;
      setTimeout(() => renderAdminUsers(), 1800);
    } catch (e) {
      errorBox.textContent = e.message;
    }
  });
}

function renderUsersList(users) {
  const listEl = portalView.querySelector("#usersList");
  if (!users.length) { listEl.innerHTML = `<p class="muted">Todavía no hay usuarios.</p>`; return; }

  const byRole = { admin: [], parent: [], child: [] };
  users.forEach((u) => byRole[u.role] && byRole[u.role].push(u));

  let html = "";
  ["admin", "parent", "child"].forEach((role) => {
    if (!byRole[role].length) return;
    html += `<div class="ios-section-label">${ROLE_NAMES[role]}</div>`;
    byRole[role].forEach((u) => {
      const parentName = u.parentEmail ? (users.find((p) => p.email === u.parentEmail) || {}).name || u.parentEmail : null;
      html += `
        <div class="card user-card" data-email="${encodeURIComponent(u.email)}">
          <div class="user-card-head">
            <div>
              <strong>${u.name}</strong>
              <div class="muted small">${u.email}</div>
              ${role === "child" ? `<div class="muted small">${parentName ? "Vinculado a: " + parentName : "Sin padre/madre vinculado"}</div>` : ""}
            </div>
          </div>
          <div class="ios-list" style="margin-top:10px;">
            ${role === "child" ? `<button class="ios-row" data-action="progress"><span>Ver progreso</span><span class="ios-chevron">›</span></button>` : ""}
            ${role === "child" ? `<button class="ios-row" data-action="link"><span>Vincular a padre/madre</span><span class="ios-chevron">›</span></button>` : ""}
            <button class="ios-row" data-action="reset"><span>Reiniciar contraseña</span><span class="ios-chevron">›</span></button>
            ${role !== "admin" ? `<button class="ios-row ios-row-danger" data-action="delete"><span>Eliminar usuario</span><span class="ios-chevron">›</span></button>` : ""}
          </div>
          <div class="user-card-extra"></div>
        </div>`;
    });
  });
  listEl.innerHTML = html;

  listEl.querySelectorAll(".user-card").forEach((card) => {
    const email = decodeURIComponent(card.dataset.email);
    const extra = card.querySelector(".user-card-extra");
    card.querySelectorAll("[data-action]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const action = btn.dataset.action;
        if (action === "progress") { window.location.hash = "admin-progress-" + encodeURIComponent(email); return; }
        if (action === "delete") return handleDeleteUser(email);
        if (action === "reset") return showResetPasswordForm(extra, email);
        if (action === "link") return showLinkParentForm(extra, email, users);
      });
    });
  });
}

async function handleDeleteUser(email) {
  if (!window.confirm(`¿Seguro que quieres eliminar la cuenta ${email}? Se perderá también su progreso guardado.`)) return;
  try {
    await apiFetch("/api/admin/users/" + encodeURIComponent(email), { method: "DELETE" });
    renderAdminUsers();
  } catch (e) {
    window.alert(e.message);
  }
}

function showResetPasswordForm(extraEl, email) {
  extraEl.innerHTML = `
    <div class="card" style="margin-top:8px; background:var(--ios-bg);">
      <input id="rpPassword" class="ios-input" style="width:100%; text-align:left;" type="text" placeholder="Nueva contraseña (vacío = generar automática)" />
      <div id="rpResult"></div>
      <button class="btn btn-primary small" id="rpSubmit">Confirmar</button>
    </div>`;
  extraEl.querySelector("#rpSubmit").addEventListener("click", async () => {
    const password = extraEl.querySelector("#rpPassword").value.trim();
    try {
      const data = await apiFetch("/api/admin/users/" + encodeURIComponent(email) + "/reset-password", {
        method: "POST",
        body: JSON.stringify({ password }),
      });
      extraEl.querySelector("#rpResult").innerHTML = `<p class="feedback" style="color:#1F8B3C;">${data.tempPassword ? `Nueva contraseña: <strong>${data.tempPassword}</strong>` : "Se envió la nueva contraseña por correo."}</p>`;
    } catch (e) {
      extraEl.querySelector("#rpResult").innerHTML = `<p class="feedback" style="color:#C22A20;">${e.message}</p>`;
    }
  });
}

function showLinkParentForm(extraEl, email, users) {
  const parents = users.filter((u) => u.role === "parent");
  extraEl.innerHTML = `
    <div class="card" style="margin-top:8px; background:var(--ios-bg);">
      <select id="lpParent" class="ios-select">
        <option value="">Sin padre/madre asignado</option>
        ${parents.map((p) => `<option value="${p.email}">${p.name} (${p.email})</option>`).join("")}
      </select>
      <div id="lpResult"></div>
      <button class="btn btn-primary small" id="lpSubmit">Confirmar</button>
    </div>`;
  extraEl.querySelector("#lpSubmit").addEventListener("click", async () => {
    const parentEmail = extraEl.querySelector("#lpParent").value || null;
    try {
      await apiFetch("/api/admin/users/" + encodeURIComponent(email), {
        method: "PUT",
        body: JSON.stringify({ parentEmail }),
      });
      renderAdminUsers();
    } catch (e) {
      extraEl.querySelector("#lpResult").innerHTML = `<p class="feedback" style="color:#C22A20;">${e.message}</p>`;
    }
  });
}

async function renderAdminChildProgress(email) {
  portalView.innerHTML = `<h2 class="page-title">📊 Progreso</h2><button class="btn" id="backBtn">‹ Usuarios</button>
    <div class="ios-section-label">Tareas diarias</div>
    <div id="tasksBlock"><p class="muted">Cargando tareas...</p></div>
    <div class="ios-section-label">Progreso académico</div>
    <div id="progressBlock"><p class="muted">Cargando...</p></div>`;
  portalView.querySelector("#backBtn").addEventListener("click", () => { window.location.hash = "admin-users"; });

  renderTasksManageBlock(portalView.querySelector("#tasksBlock"), email);

  try {
    const data = await apiFetch("/api/admin/progress/" + encodeURIComponent(email));
    portalView.querySelector("#progressBlock").innerHTML = renderProgressBlock(data.state, email);
  } catch (e) {
    portalView.querySelector("#progressBlock").innerHTML = `<div class="card"><p class="feedback" style="color:#C22A20;">${e.message}</p></div>`;
  }
}
