import { opsRequest } from "../ops-api.js";
import { applyTheme, readThemePref, watchSystemTheme, writeThemePref } from "../theme.js";
import {
  EXAMPLE_LEADS, ME_REP, STATUS_LABEL, addDays, labelDate, normalizeClock,
} from "../ops-store.js";

const app = document.querySelector("#app");
// Identidad desde la sesión (login-demo): ya no se elige el rol en pantalla.
const session = {
  role: "",
  jefeId: "",
  userName: "",
  room: sessionStorage.getItem("sa.ops.room") || "todas",
  date: "2026-11-06",
  editing: null,
  draft: null,
  error: "",
  confirmId: "",
  confirmReset: false,
  toast: "",
  focusId: "",
  resultEditing: null,
  resultDraft: null,
  confirmResId: "",
  importing: false,
  importBusy: false,
  importText: "",
  importName: "",
  importThumb: "",
  importMime: "",
  importImage: "",
  importPreview: null,
  importError: "",
};
const board = { rooms: [], people: [], visits: [], ready: false, busy: false, syncError: "" };
const histOpen = new Set();
let writing = false;
let toastTimer = 0;

function actor() {
  return session.role === "admin" ? "admin" : `jefe:${session.jefeId}`;
}

// Catálogos del resultado (REQ-006); respaldo local si el servidor no responde.
const catalogs = {
  outcomes: [
    { id: "venta", label: "Venta" },
    { id: "no_venta", label: "No venta" },
    { id: "abandono", label: "Abandono" },
  ],
  objections: [
    { id: "confianza", label: "Confianza" },
    { id: "dinero_cuota", label: "Dinero o cuota" },
    { id: "pareja_decision", label: "Pareja o decisión" },
    { id: "uso_tiempo", label: "Uso o tiempo" },
    { id: "valor_producto", label: "Valor del producto" },
    { id: "ya_tiene_tc", label: "Ya tiene tiempo compartido" },
    { id: "otra", label: "Otra" },
  ],
  actions: [
    { id: "llamada", label: "Llamada" },
    { id: "segunda_visita", label: "Segunda visita" },
    { id: "enviar_propuesta", label: "Enviar propuesta" },
    { id: "otra", label: "Otra" },
  ],
  failSteps: [],
  currencies: ["USD", "MXN"],
};

function catalogLabel(list, id) {
  return catalogs[list].find((item) => item.id === id)?.label || id;
}

async function loadCatalog() {
  try {
    const data = await opsRequest("/api/catalog", { actor: actor() });
    ["outcomes", "objections", "actions", "failSteps"].forEach((key) => {
      if (Array.isArray(data[key]) && data[key].length) catalogs[key] = data[key];
    });
    if (Array.isArray(data.currencies) && data.currencies.length) catalogs.currencies = data.currencies;
  } catch { /* respaldo local */ }
}

function tourEnded(visit) {
  const now = new Date();
  const iso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  if (visit.date < iso) return true;
  if (visit.date > iso) return false;
  const clock = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  return visit.end <= clock;
}

function resultLabel(result) {
  if (result.outcome === "venta") return `Venta · ${result.currency} ${Number(result.amount).toLocaleString("en-US")}`;
  if (result.outcome === "no_venta") return `No venta${result.recoverable ? " · recuperable" : ""}`;
  return `Abandono · paso ${result.failStep}`;
}

function fmtAt(iso) {
  return String(iso || "").slice(5, 16).replace("T", " ");
}

function titleDate(iso) {
  const label = labelDate(iso);
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function showToast(text) {
  session.toast = text;
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    if (session.toast === text) {
      session.toast = "";
      render();
    }
  }, 2200);
}

async function whoAmI() {
  try {
    const data = await opsRequest("/api/me");
    return data.user;
  } catch (error) {
    if (error.status === 401) window.location.replace("/");
    return null;
  }
}

async function pull() {
  if (!session.role) {
    const user = await whoAmI();
    if (!user) return;
    if (user.role === "rep") {
      app.innerHTML = `<div class="wrap"><h1>Tablero de sala</h1><p>El tablero es para jefes de sala y administración, ${esc(user.name)}.</p><p><a class="back md-btn-filled" href="/">Ir a mi cuaderno</a> <button class="md-btn-tonal" data-logout type="button">Cerrar sesión</button></p></div>`;
      return;
    }
    session.role = user.role;
    session.jefeId = user.role === "jefe" ? user.id : "";
    session.userName = user.name;
  }
  board.busy = true;
  if (board.ready) render();
  try {
    const room = session.role === "admin" && session.room !== "todas" ? `&room=${encodeURIComponent(session.room)}` : "";
    const [rooms, tours] = await Promise.all([
      opsRequest("/api/rooms", { actor: actor() }),
      opsRequest(`/api/tours?date=${encodeURIComponent(session.date)}${room}`, { actor: actor() }),
    ]);
    board.rooms = rooms.rooms;
    board.people = rooms.people;
    board.visits = tours.visits;
    board.syncError = "";
  } catch (error) {
    board.syncError = error.message || "No se pudo leer el servidor.";
  }
  board.busy = false;
  board.ready = true;
  render();
  if (session.focusId) {
    document.querySelector(`[data-visit="${CSS.escape(session.focusId)}"]`)?.scrollIntoView({ block: "center" });
  }
}

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[ch]));
}

const MD_ICONS = {
  check: "M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
  refresh: "M17.65 6.35A7.95 7.95 0 0 0 12 4a8 8 0 1 0 7.73 10h-2.08A6 6 0 1 1 12 6c1.66 0 3.14.69 4.22 1.78L13 11h7V4z",
  upload: "M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z",
  photo: "M9 2 7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10z",
  add: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
  edit: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",
  delete: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z",
  fact: "M20 3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z",
  history: "M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.95 8.95 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z",
  back: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z",
};

function mdIcon(name) {
  const d = MD_ICONS[name];
  return d ? `<svg class="md-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${d}"/></svg>` : "";
}

function persistSession() {
  sessionStorage.setItem("sa.ops.role", session.role);
  sessionStorage.setItem("sa.ops.jefe", session.jefeId);
  sessionStorage.setItem("sa.ops.room", session.room);
}

function scope() {
  const ops = board;
  if (session.role === "jefe") {
    const jefe = ops.people.find((person) => person.id === session.jefeId && person.role === "jefe")
      || ops.people.find((person) => person.role === "jefe");
    return { ops, roomId: jefe?.roomId || "norte", jefe };
  }
  return { ops, roomId: session.room, jefe: null };
}

function visibleReps() {
  const { ops, roomId } = scope();
  return ops.people.filter((person) => person.role === "rep" && (roomId === "todas" || person.roomId === roomId));
}

function roomName(ops, roomId) {
  return ops.rooms.find((room) => room.id === roomId)?.name || roomId;
}

function personName(id) {
  return board.people.find((person) => person.id === id)?.name || id;
}

function dayVisits(repId) {
  return board.visits
    .filter((visit) => visit.repId === repId && visit.date === session.date)
    .sort((a, b) => a.start.localeCompare(b.start));
}

function overlaps(draft, ignoreId) {
  const start = normalizeClock(draft.start);
  const end = normalizeClock(draft.end);
  if (!start || !end) return false;
  return board.visits.some((visit) => visit.id !== ignoreId
    && visit.repId === draft.repId
    && visit.date === session.date
    && visit.status !== "cancelado"
    && draft.status !== "cancelado"
    && start < visit.end
    && end > visit.start);
}

function blankDraft(repId) {
  const reps = visibleReps();
  return {
    repId: repId || reps[0]?.id || "",
    start: "09:00",
    end: "10:00",
    lead: "Lead #4920",
    status: "pendiente",
    note: "",
  };
}

function render() {
  if (!board.ready && !board.people.length) {
    app.innerHTML = `${masthead("Cargando el servidor…")}<div class="wrap"><p class="fine">Cargando el servidor…</p></div>`;
    return;
  }
  const { ops, jefe } = scope();
  const reps = visibleReps();
  const roleChips = `<span class="chip on">${mdIcon("check")}${esc(session.userName)} · ${session.role === "admin" ? "Administrador" : `Jefe de sala · ${esc(roomName(ops, jefe?.roomId || ""))}`}</span>`;
  const jefeChips = session.role === "jefe"
    ? ""
    : ops.rooms.map((room) => `<button class="chip md-filter-chip ${session.room === room.id ? "on" : ""}" data-room="${room.id}" type="button">${session.room === room.id ? mdIcon("check") : ""}${esc(room.name)}</button>`).join("")
      + `<button class="chip md-filter-chip ${session.room === "todas" ? "on" : ""}" data-room="todas" type="button">${session.room === "todas" ? mdIcon("check") : ""}Todas</button>`;
  const jumpTabs = reps.length > 1
    ? `<nav class="rep-tabs" aria-label="Representantes">${reps.map((rep) => `<button class="chip md-assist-chip" data-jump="${esc(rep.id)}" type="button"><span class="md-avatar sm">${esc(rep.name.slice(0, 1))}</span>${esc(rep.name)} <b class="md-badge">${dayVisits(rep.id).length}</b></button>`).join("")}</nav>`
    : "";
  const columns = reps.map((rep) => {
    const visits = dayVisits(rep.id);
    const cards = visits.map((visit) => {
      const result = visit.result;
      const nextStep = result?.nextStep
        ? `<div class="fine">Siguiente paso: ${esc(catalogLabel("actions", result.nextStep.action))} · ${esc(result.nextStep.date)} · ${esc(personName(result.nextStep.ownerId))}</div>`
        : "";
      const resLine = result
        ? `<div class="resline ${esc(result.outcome)}">${esc(resultLabel(result))}</div>${nextStep}`
        : (tourEnded(visit) && visit.status !== "cancelado" ? `<div class="resline dim">Sin resultado</div>` : "");
      const history = visit.resultHistory || [];
      const histList = histOpen.has(visit.id) && history.length
        ? `<div class="hist">${history.slice().reverse().map((entry) => `<div class="fine">${esc(fmtAt(entry.at))} · ${esc(personName(entry.by))} · ${entry.previous ? `antes: ${esc(resultLabel(entry.previous))}` : "alta del resultado"}</div>`).join("")}</div>`
        : "";
      return `<article class="visit md-card ${session.focusId === visit.id ? "fresh" : ""} ${session.resultEditing === visit.id ? "editing" : ""}" data-visit="${esc(visit.id)}">
      <header><b>${esc(visit.start)}–${esc(visit.end)}</b><span class="tag ${esc(visit.status)}">${esc(STATUS_LABEL[visit.status] || visit.status)}</span></header>
      <div class="visit-lead">${esc(visit.lead)}</div>
      ${visit.note ? `<div class="fine">${esc(visit.note)}</div>` : ""}
      ${resLine}
      <div class="actions">
        <button class="md-btn-tonal" type="button" data-edit="${esc(visit.id)}">${mdIcon("edit")}Editar</button>
        <button class="md-btn-text danger" type="button" data-drop="${esc(visit.id)}">${mdIcon("delete")}${session.confirmId === visit.id ? "Confirmar quitar" : "Quitar"}</button>
        ${visit.status !== "cancelado" && tourEnded(visit) ? `<button class="md-btn-tonal" type="button" data-result="${esc(visit.id)}">${mdIcon("fact")}Resultado</button>` : ""}
        ${result ? `<button class="md-btn-text danger" type="button" data-dropres="${esc(visit.id)}">${session.confirmResId === visit.id ? "Confirmar quitar resultado" : "Quitar resultado"}</button>` : ""}
        ${history.length ? `<button class="md-btn-text" type="button" data-hist="${esc(visit.id)}">${mdIcon("history")}Cambios (${history.length})</button>` : ""}
      </div>
      ${histList}
    </article>`;
    }).join("");
    const open = session.draft && (session.editing === "new" ? session.draft.repId === rep.id : dayVisits(rep.id).some((visit) => visit.id === session.editing));
    return `<section class="col md-card ${open ? "on" : ""}" data-col="${esc(rep.id)}">
      <div class="col-head">
        <span class="md-avatar">${esc(rep.name.slice(0, 1))}</span>
        <div class="col-title">
          <h2>${esc(rep.name)}${rep.id === ME_REP ? " · app" : ""}</h2>
          <div class="fine">${esc(roomName(ops, rep.roomId))}</div>
        </div>
        <span class="md-badge">${visits.length}</span>
      </div>
      ${cards || `<p class="fine empty-state">Sin tours este día.</p>`}
      <button class="line md-btn-tonal full" data-new="${esc(rep.id)}" type="button">${mdIcon("add")}Asignar tour</button>
    </section>`;
  }).join("");
  const form = session.importing
    ? importPanel(reps)
    : (session.editing ? formPanel(reps) : (session.resultEditing ? resultPanel() : ""));
  const repAdmin = session.role === "admin" ? `<section class="panel md-card">
      <h2>Reps por sala</h2>
      <p class="fine">El administrador mueve al rep de sala. Los tours se quedan con esa persona.</p>
      <div class="reps">${ops.people.filter((person) => person.role === "rep").map((rep) => `<div class="rep md-list-item">
        <span class="rep-ident"><span class="md-avatar sm">${esc(rep.name.slice(0, 1))}</span><b>${esc(rep.name)}</b></span>
        <select class="md-select" data-move="${esc(rep.id)}">${ops.rooms.map((room) => `<option value="${esc(room.id)}" ${room.id === rep.roomId ? "selected" : ""}>${esc(room.name)}</option>`).join("")}</select>
      </div>`).join("")}</div>
      <button class="ghost md-btn-text danger" data-reset type="button">${session.confirmReset ? "Confirmar restaurar ejemplo" : "Restaurar ejemplo"}</button>
    </section>` : `<section class="panel md-card"><h2>Tu sala</h2><p class="fine">${esc(jefe ? `${jefe.name} ve solo ${roomName(ops, jefe.roomId)}.` : "")} Los tours del día se asignan en las columnas. El resultado baja a la app del rep al abrir o al actualizar.</p></section>`;
  app.innerHTML = `<div class="shell">
    ${masthead(board.busy ? "Actualizando…" : "", board.syncError, session.toast)}
    <div class="wrap">
      <p class="kicker">Sales Academy / operación de sala</p>
      <h1>Tablero de <em>sala</em></h1>
      <p class="lede">Se guarda en el servidor. Cada rep ve lo suyo en la app.</p>
      <div class="toolbar">
        <div class="switch md-segmented" role="group" aria-label="Rol">${roleChips}</div>
        <div class="bar md-chip-set" role="group" aria-label="Sala">${jefeChips}</div>
        <div class="datebar">
          <button class="icon md-icon-btn" data-day="-1" type="button" aria-label="Día anterior">‹</button>
          <strong>${esc(titleDate(session.date))}</strong>
          <button class="icon md-icon-btn" data-day="1" type="button" aria-label="Día siguiente">›</button>
          <button class="line md-btn-outlined" data-reload type="button">${mdIcon("refresh")}Actualizar</button>
          <button class="gold md-btn-filled" data-import type="button">${mdIcon("upload")}Importar</button>
        </div>
      </div>
      ${form}
      ${jumpTabs}
      <p class="fine board-hint">Toca un nombre o desliza para ver cada rep.</p>
      <div class="board">${columns || `<section class="col md-card"><p>Esta sala no tiene reps.</p></section>`}</div>
      ${repAdmin}
    </div>
  </div>`;
  if (session.editing) document.querySelector(".composer")?.scrollIntoView({ block: "nearest" });
}

function masthead(status, error, toast) {
  return `<header class="masthead">
    <a class="brand" href="/">
      <span class="brand-mark">S<span>A</span></span>
      <span>SALES<br>ACADEMY<span class="brand-sub">TABLERO DE SALA</span></span>
    </a>
    <div class="masthead-actions">
      ${status ? `<p class="fine">${esc(status)}</p>` : ""}
      ${error ? `<div class="warn">${esc(error)}</div>` : ""}
      ${toast ? `<div class="toast md-snackbar" role="status">${esc(toast)}</div>` : ""}
      <a class="back md-btn-filled" href="/">${mdIcon("back")}Volver a la app</a>
      <div class="theme-switch" role="group" aria-label="Tema">${[["system", "Sistema"], ["light", "Claro"], ["dark", "Oscuro"]].map(([id, label]) => `<button type="button" class="${readThemePref(localStorage) === id ? "on" : ""}" data-theme-pref="${id}" aria-pressed="${readThemePref(localStorage) === id}">${label}</button>`).join("")}</div>
      <button class="md-btn-tonal" data-logout type="button">Cerrar sesión</button>
    </div>
  </header>`;
}

function openImport() {
  session.importing = true;
  session.editing = null;
  session.draft = null;
  session.resultEditing = null;
  session.resultDraft = null;
  session.importError = "";
  session.error = "";
  render();
}

function closeImport() {
  session.importing = false;
  session.importBusy = false;
  session.importText = "";
  session.importName = "";
  session.importThumb = "";
  session.importMime = "";
  session.importImage = "";
  session.importPreview = null;
  session.importError = "";
  render();
}

function readImportDraft() {
  const area = app.querySelector("[data-import-text]");
  if (area) session.importText = area.value;
  if (!session.importPreview) return;
  app.querySelectorAll("[data-isel]").forEach((box) => {
    const row = session.importPreview.rows[Number(box.dataset.isel)];
    if (row) row.selected = box.checked;
  });
  app.querySelectorAll("[data-imap]").forEach((field) => {
    const [index, key] = field.dataset.imap.split(".");
    const row = session.importPreview.rows[Number(index)];
    if (row?.visit && key) row.visit[key] = field.value;
  });
}

function importPanel(reps) {
  const preview = session.importPreview;
  const rows = preview?.rows || [];
  const ready = rows.filter((row) => row.selected);
  const table = rows.length ? `<div class="preview-scroll"><table class="preview-table">
      <thead><tr><th></th><th>Rep</th><th>Fecha</th><th>Inicio</th><th>Fin</th><th>Lead</th><th>Estado</th><th>Nota</th></tr></thead>
      <tbody>${rows.map((row, index) => {
        const visit = row.visit || {};
        const blocked = (row.issues || []).length || row.clash;
        return `<tr class="${blocked ? (row.clash ? "clash" : "bad") : ""}">
          <td data-label="Incluir"><input type="checkbox" data-isel="${index}" ${row.selected ? "checked" : ""}></td>
          <td data-label="Rep"><select data-imap="${index}.repId">${reps.map((rep) => `<option value="${esc(rep.id)}" ${rep.id === visit.repId ? "selected" : ""}>${esc(rep.name)}</option>`).join("")}</select></td>
          <td data-label="Fecha"><input data-imap="${index}.date" type="date" value="${esc(visit.date || session.date)}"></td>
          <td data-label="Inicio"><input data-imap="${index}.start" type="time" step="60" value="${esc(visit.start || "")}"></td>
          <td data-label="Fin"><input data-imap="${index}.end" type="time" step="60" value="${esc(visit.end || "")}"></td>
          <td data-label="Lead"><input data-imap="${index}.lead" value="${esc(visit.lead || "")}"></td>
          <td data-label="Estado"><select data-imap="${index}.status">${Object.entries(STATUS_LABEL).map(([id, label]) => `<option value="${id}" ${id === visit.status ? "selected" : ""}>${label}</option>`).join("")}</select></td>
          <td data-label="Nota"><input data-imap="${index}.note" maxlength="80" value="${esc(visit.note || "")}">
            ${blocked ? `<p class="issues">${esc((row.issues || []).join(" "))}</p>` : ""}</td>
        </tr>`;
      }).join("")}</tbody>
    </table></div>` : (preview ? `<p class="fine">No encontré tours en ese archivo. Revisa el texto o toma otra foto.</p>` : "");
  const warnings = (preview?.warnings || []).map((item) => `<div class="warn">${esc(item)}</div>`).join("");
  return `<section class="panel composer md-card">
    <p class="kicker">Importar / confirmar</p>
    <h2>Importar tours</h2>
    <p class="fine">Sube un CSV, pega la lista o toma una foto. Se mapea al directorio y a Lead #. Nada se guarda hasta que confirmas.</p>
    ${session.importError ? `<div class="warn" role="alert">${esc(session.importError)}</div>` : ""}
    <div class="dropzone" data-dropzone>
      <p class="fine">CSV, JSON, texto o foto. Máximo 1.5 MB. Ejemplo: Ana, 09:00-10:00, Lead #8801</p>
      <div class="import-actions">
        <button class="line md-btn-tonal" data-pick-file type="button">${mdIcon("upload")}Archivo</button>
        <button class="line md-btn-tonal" data-pick-photo type="button">${mdIcon("photo")}Foto</button>
        <input data-import-file type="file" accept=".csv,.json,.txt,.tsv,text/csv,application/json,text/plain,image/*" hidden>
        <input data-import-photo type="file" accept="image/*" capture="environment" hidden>
      </div>
      ${session.importName ? `<p class="fine">${esc(session.importName)}</p>` : ""}
      ${session.importThumb ? `<img class="thumb" alt="Vista previa de la foto" src="${esc(session.importThumb)}">` : ""}
    </div>
    <label class="md-field">Texto a analizar<textarea data-import-text placeholder="Ana 09:00-10:00 Lead #8801">${esc(session.importText)}</textarea></label>
    ${warnings}
    ${table}
    <div class="actions">
      <button class="gold md-btn-filled" data-analyze type="button" ${session.importBusy ? "disabled" : ""}>${session.importBusy ? "Analizando…" : "Analizar"}</button>
      <button class="gold md-btn-filled" data-confirm-import type="button" ${session.importBusy || !ready.length ? "disabled" : ""}>Confirmar ${ready.length || ""}</button>
      <button class="line md-btn-outlined" data-import-close type="button">Cancelar</button>
    </div>
  </section>`;
}

async function analyzeImport() {
  if (session.importBusy) return;
  readImportDraft();
  session.importBusy = true;
  session.importError = "";
  render();
  try {
    const body = {
      text: session.importText,
      filename: session.importName,
      mime: session.importMime,
      defaultDate: session.date,
    };
    if (session.importImage) body.image = session.importImage;
    const data = await opsRequest("/api/imports/preview", { method: "POST", actor: actor(), body });
    session.importPreview = data;
    session.importError = "";
  } catch (error) {
    session.importError = error.message;
  } finally {
    session.importBusy = false;
    render();
  }
}

async function confirmImport() {
  if (session.importBusy || !session.importPreview) return;
  readImportDraft();
  const rows = session.importPreview.rows.filter((row) => row.selected);
  if (!rows.length) {
    session.importError = "No hay filas listas para confirmar.";
    render();
    return;
  }
  session.importBusy = true;
  session.importError = "";
  render();
  const saved = [];
  const failed = [];
  try {
    for (const row of rows) {
      try {
        const created = await opsRequest("/api/tours", { method: "POST", actor: actor(), body: row.visit });
        saved.push(created.visit?.id);
      } catch (error) {
        failed.push(error.message);
        row.issues = listIssues(row, error.message);
        row.selected = false;
      }
    }
    session.focusId = saved[saved.length - 1] || "";
    if (saved.length) showToast(failed.length
      ? `${saved.length} tours confirmados. ${failed.length} no pasaron.`
      : `${saved.length} tours confirmados.`);
    if (!failed.length) {
      session.importing = false;
      session.importPreview = null;
      session.importText = "";
      session.importName = "";
      session.importThumb = "";
      session.importImage = "";
    } else {
      session.importError = failed[0];
    }
    await pull();
  } finally {
    session.importBusy = false;
    if (session.importing) render();
  }
}

function listIssues(row, message) {
  const issues = listCopy(row.issues);
  if (message && !issues.includes(message)) issues.push(message);
  return issues;
}

function listCopy(value) {
  return Array.isArray(value) ? value.slice() : [];
}

function fileKind(file) {
  const type = (file.type || "").toLowerCase();
  const name = (file.name || "").toLowerCase();
  if (type.startsWith("image/") || /\.(png|jpe?g|webp|gif)$/.test(name)) return "image";
  return "text";
}

function readPickedFile(file) {
  if (!file) return;
  if (file.size > 1_500_000) {
    session.importError = "El archivo es muy grande (máximo 1.5 MB).";
    render();
    return;
  }
  const kind = fileKind(file);
  const reader = new FileReader();
  reader.onload = () => {
    session.importName = file.name || (kind === "image" ? "foto" : "archivo");
    session.importMime = file.type || "";
    session.importPreview = null;
    session.importError = "";
    if (kind === "image") {
      const url = String(reader.result || "");
      session.importThumb = url;
      session.importImage = url.includes(",") ? url.split(",")[1] : url;
    } else {
      session.importText = String(reader.result || "");
      session.importThumb = "";
      session.importImage = "";
    }
    render();
  };
  if (kind === "image") reader.readAsDataURL(file);
  else reader.readAsText(file);
}

function formPanel(reps) {
  const draft = session.draft;
  const clash = overlaps(draft, session.editing === "new" ? "" : session.editing);
  return `<section class="panel composer md-card">
    <p class="kicker">${session.editing === "new" ? "Asignar" : "Editar"}</p>
    <h2>${session.editing === "new" ? "Nuevo tour" : "Editar tour"}</h2>
    <p class="fine">${esc(titleDate(session.date))} · ${esc(personName(draft.repId))}. El lead se queda como Lead #.</p>
    ${session.error ? `<div class="warn">${esc(session.error)}</div>` : ""}
    ${clash ? `<div class="warn">Ese horario se empalma con otro tour del mismo rep. Cámbialo para guardar.</div>` : ""}
    <div class="grid">
      <label class="md-field span-2">Rep<select data-draft="repId">${reps.map((rep) => `<option value="${esc(rep.id)}" ${rep.id === draft.repId ? "selected" : ""}>${esc(rep.name)}</option>`).join("")}</select></label>
      <label class="md-field span-2">Lead<input data-draft="lead" list="leads" value="${esc(draft.lead)}"></label>
      <label class="md-field">Inicio<input data-draft="start" type="time" step="60" value="${esc(normalizeClock(draft.start) || draft.start)}"></label>
      <label class="md-field">Fin<input data-draft="end" type="time" step="60" value="${esc(normalizeClock(draft.end) || draft.end)}"></label>
      <label class="md-field span-2">Estado<select data-draft="status">${Object.entries(STATUS_LABEL).map(([id, label]) => `<option value="${id}" ${id === draft.status ? "selected" : ""}>${label}</option>`).join("")}</select></label>
      <label class="md-field span-2">Nota<input data-draft="note" value="${esc(draft.note)}" maxlength="80"></label>
    </div>
    <datalist id="leads">${EXAMPLE_LEADS.map((lead) => `<option value="${esc(lead)}"></option>`).join("")}</datalist>
    <div class="actions">
      <button class="gold md-btn-filled" data-save type="button" ${clash ? "disabled" : ""}>Guardar</button>
      <button class="line md-btn-outlined" data-cancel type="button">Cancelar</button>
    </div>
  </section>`;
}

function readDraft() {
  if (!session.draft) return;
  app.querySelectorAll("[data-draft]").forEach((field) => {
    session.draft[field.dataset.draft] = field.value;
  });
}

function blankResultDraft(visit) {
  const result = visit.result;
  return {
    outcome: result?.outcome || "venta",
    currency: result?.currency || "USD",
    amount: result?.amount != null ? String(result.amount) : "8000",
    objection: result?.objection || "",
    objectionOther: result?.objectionOther || "",
    recoverable: typeof result?.recoverable === "boolean" ? (result.recoverable ? "si" : "no") : "",
    nextAction: result?.nextStep?.action || "segunda_visita",
    nextDate: result?.nextStep?.date || addDays(visit.date, 1),
    nextOwner: result?.nextStep?.ownerId || visit.repId,
    failStep: result?.failStep || 0,
    note: result?.note || "",
  };
}

function readResultDraft() {
  if (!session.resultDraft) return;
  app.querySelectorAll("[data-rdraft]").forEach((field) => {
    session.resultDraft[field.dataset.rdraft] = field.value;
  });
}

function resultPanel() {
  const visit = board.visits.find((item) => item.id === session.resultEditing);
  if (!visit || !session.resultDraft) return "";
  const draft = session.resultDraft;
  const rep = board.people.find((person) => person.id === visit.repId);
  const jefes = board.people.filter((person) => person.role === "jefe" && person.roomId === rep?.roomId);
  const owners = [rep, ...jefes].filter(Boolean);
  const segChips = catalogs.outcomes.map((item) => `<button class="chip ${draft.outcome === item.id ? "on" : ""}" data-rout="${esc(item.id)}" type="button" aria-pressed="${draft.outcome === item.id}">${draft.outcome === item.id ? mdIcon("check") : ""}${esc(item.label)}</button>`).join("");
  let fields = "";
  if (draft.outcome === "venta") {
    fields = `
      <label class="md-field">Divisa<select data-rdraft="currency">${catalogs.currencies.map((cur) => `<option ${cur === draft.currency ? "selected" : ""}>${esc(cur)}</option>`).join("")}</select></label>
      <label class="md-field">Volumen<input data-rdraft="amount" inputmode="decimal" value="${esc(draft.amount)}"></label>`;
  } else if (draft.outcome === "no_venta") {
    fields = `
      <label class="md-field">Objeción<select data-rdraft="objection"><option value="" ${!draft.objection ? "selected" : ""}>Elige</option>${catalogs.objections.map((item) => `<option value="${esc(item.id)}" ${item.id === draft.objection ? "selected" : ""}>${esc(item.label)}</option>`).join("")}</select></label>
      ${draft.objection === "otra" ? `<label class="md-field">¿Cuál?<input data-rdraft="objectionOther" maxlength="60" value="${esc(draft.objectionOther)}"></label>` : ""}
      <label class="md-field">¿Se puede recuperar?<select data-rdraft="recoverable"><option value="" ${!draft.recoverable ? "selected" : ""}>Elige</option><option value="si" ${draft.recoverable === "si" ? "selected" : ""}>Sí</option><option value="no" ${draft.recoverable === "no" ? "selected" : ""}>No</option></select></label>
      ${draft.recoverable === "si" ? `
      <label class="md-field">Siguiente paso<select data-rdraft="nextAction">${catalogs.actions.map((item) => `<option value="${esc(item.id)}" ${item.id === draft.nextAction ? "selected" : ""}>${esc(item.label)}</option>`).join("")}</select></label>
      <label class="md-field">Fecha<input data-rdraft="nextDate" type="date" min="${esc(visit.date)}" value="${esc(draft.nextDate)}"></label>
      <label class="md-field">Responsable<select data-rdraft="nextOwner">${owners.map((person) => `<option value="${esc(person.id)}" ${person.id === draft.nextOwner ? "selected" : ""}>${esc(person.name)} (${person.role === "jefe" ? "jefe" : "rep"})</option>`).join("")}</select></label>` : ""}`;
  } else {
    const steps = catalogs.failSteps.length ? catalogs.failSteps : Array.from({ length: 11 }, (_, index) => ({ n: index + 1, title: `Paso ${index + 1}` }));
    fields = `<label class="md-field span-2">¿En qué paso se cortó?<select data-rdraft="failStep"><option value="0" ${!Number(draft.failStep) ? "selected" : ""}>Elige el paso</option>${steps.map((step) => `<option value="${step.n}" ${Number(draft.failStep) === step.n ? "selected" : ""}>${step.n} · ${esc(step.title)}</option>`).join("")}</select></label>`;
  }
  return `<section class="panel composer md-card">
    <p class="kicker">Resultado</p>
    <h2>Resultado del tour · ${esc(personName(visit.repId))} · ${esc(visit.start)}–${esc(visit.end)} · ${esc(visit.lead)}</h2>
    ${visit.result ? `<p class="fine">Hoy: ${esc(resultLabel(visit.result))}. Al guardar lo reemplazas.</p>` : ""}
    ${session.error ? `<div class="warn" role="alert">${esc(session.error)}${session.error.includes("Alguien más") ? ` <button type="button" data-reload class="linklike">Actualizar</button>` : ""}</div>` : ""}
    <div class="switch md-segmented" role="group" aria-label="Resultado">${segChips}</div>
    <div class="grid">
      ${fields}
      <label class="md-field span-2">Nota (opcional)<input data-rdraft="note" maxlength="120" value="${esc(draft.note)}"></label>
    </div>
    <p class="fine">Sin nombres, correos ni teléfonos.</p>
    <div class="actions">
      <button class="gold md-btn-filled" data-saveres type="button" ${writing ? "disabled" : ""}>Guardar resultado</button>
      <button class="line md-btn-outlined" data-cancelres type="button">Cancelar</button>
    </div>
  </section>`;
}

async function saveResult() {
  if (writing) return;
  readResultDraft();
  const visit = board.visits.find((item) => item.id === session.resultEditing);
  const draft = session.resultDraft;
  if (!visit || !draft) return;
  const body = { outcome: draft.outcome, note: draft.note.trim(), version: visit.result?.version || 0 };
  if (draft.outcome === "venta") {
    body.currency = draft.currency;
    body.amount = Number(String(draft.amount).replace(/[^0-9.]/g, ""));
  } else if (draft.outcome === "no_venta") {
    if (!draft.objection) { session.error = "Elige la objeción principal."; render(); return; }
    if (!draft.recoverable) { session.error = "Indica si se puede recuperar."; render(); return; }
    body.objection = draft.objection;
    body.objectionOther = draft.objection === "otra" ? draft.objectionOther.trim() : "";
    body.recoverable = draft.recoverable === "si";
    if (body.recoverable) body.nextStep = { action: draft.nextAction, date: draft.nextDate, ownerId: draft.nextOwner };
  } else {
    body.failStep = Number(draft.failStep);
    if (!body.failStep) { session.error = "Elige el paso donde se cortó."; render(); return; }
  }
  writing = true;
  try {
    await opsRequest(`/api/tours/${encodeURIComponent(visit.id)}/result`, { method: "PUT", actor: actor(), body });
    session.resultEditing = null;
    session.resultDraft = null;
    session.error = "";
    session.focusId = visit.id;
    showToast(`Resultado guardado para ${personName(visit.repId)}.`);
    await pull();
  } catch (error) {
    session.error = error.message;
    render();
  } finally {
    writing = false;
  }
}

async function saveVisit() {
  if (writing) return;
  readDraft();
  const draft = session.draft;
  if (!draft) return;
  const start = normalizeClock(draft.start);
  const end = normalizeClock(draft.end);
  if (!/^Lead #\d{3,4}$/.test(draft.lead.trim())) {
    session.error = "Usa un Lead # de ejemplo, por ejemplo Lead #4920.";
    render();
    return;
  }
  if (!start || !end) {
    session.error = "La hora no es válida.";
    render();
    return;
  }
  if (start >= end) {
    session.error = "La hora de fin va después del inicio.";
    render();
    return;
  }
  if (!visibleReps().some((rep) => rep.id === draft.repId)) {
    session.error = "Ese rep no está en la sala que estás viendo.";
    render();
    return;
  }
  draft.start = start;
  draft.end = end;
  if (overlaps(draft, session.editing === "new" ? "" : session.editing)) {
    session.error = "Ese horario se empalma con otro tour del mismo rep.";
    render();
    return;
  }
  const visit = {
    repId: draft.repId,
    date: session.date,
    start,
    end,
    lead: draft.lead.trim(),
    status: STATUS_LABEL[draft.status] ? draft.status : "pendiente",
    note: draft.note.trim().slice(0, 80),
  };
  writing = true;
  try {
    const saved = session.editing === "new"
      ? await opsRequest("/api/tours", { method: "POST", actor: actor(), body: visit })
      : await opsRequest(`/api/tours/${encodeURIComponent(session.editing)}`, { method: "PATCH", actor: actor(), body: visit });
    session.focusId = saved.visit?.id || "";
    session.editing = null;
    session.draft = null;
    session.error = "";
    session.confirmId = "";
    showToast(session.focusId && session.role ? `Tour guardado para ${personName(visit.repId)}.` : "Tour guardado.");
    await pull();
  } catch (error) {
    session.error = error.message;
    render();
  } finally {
    writing = false;
  }
}

app.addEventListener("click", async (event) => {
  const themeBtn = event.target.closest("[data-theme-pref]");
  if (themeBtn) {
    writeThemePref(localStorage, themeBtn.dataset.themePref);
    applyTheme();
    render();
    return;
  }
  if (event.target.closest("[data-logout]")) {
    try { await opsRequest("/api/logout", { method: "POST", body: {} }); } catch { /* sin sesión */ }
    window.location.replace("/");
    return;
  }
  const role = event.target.closest("[data-role]");
  if (role) {
    session.role = role.dataset.role;
    session.editing = null;
    persistSession();
    pull();
    return;
  }
  const jefe = event.target.closest("[data-jefe]");
  if (jefe) {
    session.jefeId = jefe.dataset.jefe;
    session.editing = null;
    persistSession();
    pull();
    return;
  }
  const room = event.target.closest("[data-room]");
  if (room) {
    session.room = room.dataset.room;
    session.editing = null;
    persistSession();
    pull();
    return;
  }
  const jump = event.target.closest("[data-jump]");
  if (jump) {
    document.querySelector(`[data-col="${CSS.escape(jump.dataset.jump)}"]`)?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    return;
  }
  const day = event.target.closest("[data-day]");
  if (day) {
    session.date = addDays(session.date, Number(day.dataset.day));
    session.editing = null;
    session.focusId = "";
    pull();
    return;
  }
  if (event.target.closest("[data-import-close]")) {
    closeImport();
    return;
  }
  if (event.target.closest("[data-analyze]")) {
    analyzeImport();
    return;
  }
  if (event.target.closest("[data-confirm-import]")) {
    confirmImport();
    return;
  }
  if (event.target.closest("[data-pick-file]")) {
    app.querySelector("[data-import-file]")?.click();
    return;
  }
  if (event.target.closest("[data-pick-photo]")) {
    app.querySelector("[data-import-photo]")?.click();
    return;
  }
  if (event.target.closest("[data-import]")) {
    openImport();
    return;
  }
  const create = event.target.closest("[data-new]");
  if (create) {
    session.importing = false;
    session.editing = "new";
    session.draft = blankDraft(create.dataset.new);
    session.resultEditing = null;
    session.resultDraft = null;
    session.error = "";
    session.focusId = "";
    render();
    return;
  }
  const resultBtn = event.target.closest("[data-result]");
  if (resultBtn) {
    const visit = board.visits.find((item) => item.id === resultBtn.dataset.result);
    if (!visit) return;
    session.resultEditing = visit.id;
    session.resultDraft = blankResultDraft(visit);
    session.importing = false;
    session.editing = null;
    session.draft = null;
    session.error = "";
    session.confirmResId = "";
    render();
    document.querySelector(".composer")?.scrollIntoView({ block: "nearest" });
    return;
  }
  const rout = event.target.closest("[data-rout]");
  if (rout) {
    readResultDraft();
    if (session.resultDraft) session.resultDraft.outcome = rout.dataset.rout;
    session.error = "";
    render();
    return;
  }
  const dropRes = event.target.closest("[data-dropres]");
  if (dropRes) {
    if (session.confirmResId !== dropRes.dataset.dropres) {
      session.confirmResId = dropRes.dataset.dropres;
      render();
      return;
    }
    const id = dropRes.dataset.dropres;
    session.confirmResId = "";
    if (session.resultEditing === id) { session.resultEditing = null; session.resultDraft = null; }
    try {
      await opsRequest(`/api/tours/${encodeURIComponent(id)}/result`, { method: "DELETE", actor: actor() });
      showToast("Resultado quitado.");
      await pull();
    } catch (error) {
      board.syncError = error.message;
      render();
    }
    return;
  }
  const hist = event.target.closest("[data-hist]");
  if (hist) {
    const id = hist.dataset.hist;
    if (histOpen.has(id)) histOpen.delete(id);
    else histOpen.add(id);
    render();
    return;
  }
  if (event.target.closest("[data-saveres]")) {
    saveResult();
    return;
  }
  if (event.target.closest("[data-cancelres]")) {
    session.resultEditing = null;
    session.resultDraft = null;
    session.error = "";
    render();
    return;
  }
  const edit = event.target.closest("[data-edit]");
  if (edit) {
    const visit = board.visits.find((item) => item.id === edit.dataset.edit);
    if (!visit) return;
    session.editing = visit.id;
    session.draft = { repId: visit.repId, start: visit.start, end: visit.end, lead: visit.lead, status: visit.status, note: visit.note || "" };
    session.resultEditing = null;
    session.resultDraft = null;
    session.error = "";
    render();
    return;
  }
  const drop = event.target.closest("[data-drop]");
  if (drop) {
    if (session.confirmId !== drop.dataset.drop) {
      session.confirmId = drop.dataset.drop;
      render();
      return;
    }
    const id = drop.dataset.drop;
    session.confirmId = "";
    if (session.editing === id) session.editing = null;
    try {
      await opsRequest(`/api/tours/${encodeURIComponent(id)}`, { method: "DELETE", actor: actor() });
      showToast("Tour quitado.");
      await pull();
    } catch (error) {
      board.syncError = error.message;
      render();
    }
    return;
  }
  if (event.target.closest("[data-save]")) {
    saveVisit();
    return;
  }
  if (event.target.closest("[data-cancel]")) {
    session.editing = null;
    session.error = "";
    render();
    return;
  }
  if (event.target.closest("[data-reload]")) {
    pull();
    return;
  }
  if (event.target.closest("[data-reset]")) {
    if (!session.confirmReset) {
      session.confirmReset = true;
      render();
      return;
    }
    session.confirmReset = false;
    session.editing = null;
    try {
      await opsRequest("/api/reset", { method: "POST", actor: actor(), body: {} });
      showToast("Ejemplo restaurado.");
      await pull();
    } catch (error) {
      board.syncError = error.message;
      render();
    }
  }
});

app.addEventListener("change", async (event) => {
  if (event.target.matches("[data-import-file], [data-import-photo]")) {
    readPickedFile(event.target.files?.[0]);
    event.target.value = "";
    return;
  }
  if (event.target.dataset.draft) {
    readDraft();
    session.error = "";
    render();
    const field = app.querySelector(`[data-draft="${event.target.dataset.draft}"]`);
    field?.focus();
    return;
  }
  if (event.target.dataset.rdraft) {
    readResultDraft();
    session.error = "";
    render();
    const field = app.querySelector(`[data-rdraft="${event.target.dataset.rdraft}"]`);
    field?.focus();
    return;
  }
  const move = event.target.dataset.move;
  if (!move || session.role !== "admin") return;
  const rep = board.people.find((person) => person.id === move && person.role === "rep");
  if (!rep || !board.rooms.some((room) => room.id === event.target.value)) return;
  try {
    await opsRequest(`/api/people/${encodeURIComponent(move)}`, {
      method: "PATCH",
      actor: actor(),
      body: { roomId: event.target.value },
    });
    showToast(`${personName(move)} se movió de sala.`);
    await pull();
  } catch (error) {
    board.syncError = error.message;
    render();
  }
});

app.addEventListener("dragover", (event) => {
  const zone = event.target.closest("[data-dropzone]");
  if (!zone) return;
  event.preventDefault();
  zone.classList.add("on");
});
app.addEventListener("dragleave", (event) => {
  event.target.closest("[data-dropzone]")?.classList.remove("on");
});
app.addEventListener("drop", (event) => {
  const zone = event.target.closest("[data-dropzone]");
  if (!zone) return;
  event.preventDefault();
  zone.classList.remove("on");
  readPickedFile(event.dataTransfer.files?.[0]);
});

pull();
loadCatalog();
applyTheme();
watchSystemTheme(() => applyTheme());
