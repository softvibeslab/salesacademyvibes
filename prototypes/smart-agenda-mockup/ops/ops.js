import { opsRequest } from "../ops-api.js";
import {
  EXAMPLE_LEADS, ME_REP, STATUS_LABEL, addDays, labelDate, normalizeClock,
} from "../ops-store.js";

const app = document.querySelector("#app");
const session = {
  role: sessionStorage.getItem("sa.ops.role") || "jefe",
  jefeId: sessionStorage.getItem("sa.ops.jefe") || "jorge",
  room: sessionStorage.getItem("sa.ops.room") || "todas",
  date: "2026-11-06",
  editing: null,
  draft: null,
  error: "",
  confirmId: "",
  confirmReset: false,
  toast: "",
  focusId: "",
};
const board = { rooms: [], people: [], visits: [], ready: false, busy: false, syncError: "" };
let writing = false;
let toastTimer = 0;

function actor() {
  return session.role === "admin" ? "admin" : `jefe:${session.jefeId}`;
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

async function pull() {
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
    app.innerHTML = `<div class="wrap"><h1>Tablero de sala</h1><p class="fine">Cargando el servidor…</p></div>`;
    return;
  }
  const { ops, jefe } = scope();
  const reps = visibleReps();
  const roleChips = [
    ["jefe", "Jefe de sala"],
    ["admin", "Administrador"],
  ].map(([id, label]) => `<button class="chip ${session.role === id ? "on" : ""}" data-role="${id}" type="button">${label}</button>`).join("");
  const jefeChips = session.role === "jefe"
    ? ops.people.filter((person) => person.role === "jefe").map((person) => `<button class="chip ${session.jefeId === person.id ? "on" : ""}" data-jefe="${person.id}" type="button">${esc(person.name)} · ${esc(roomName(ops, person.roomId))}</button>`).join("")
    : ops.rooms.map((room) => `<button class="chip ${session.room === room.id ? "on" : ""}" data-room="${room.id}" type="button">${esc(room.name)}</button>`).join("")
      + `<button class="chip ${session.room === "todas" ? "on" : ""}" data-room="todas" type="button">Todas</button>`;
  const columns = reps.map((rep) => {
    const visits = dayVisits(rep.id);
    const cards = visits.map((visit) => `<article class="visit ${session.focusId === visit.id ? "fresh" : ""}" data-visit="${esc(visit.id)}">
      <header><b>${esc(visit.start)}–${esc(visit.end)}</b><span class="tag ${esc(visit.status)}">${esc(STATUS_LABEL[visit.status] || visit.status)}</span></header>
      <div>${esc(visit.lead)}</div>
      ${visit.note ? `<div class="fine">${esc(visit.note)}</div>` : ""}
      <div class="actions">
        <button type="button" data-edit="${esc(visit.id)}">Editar</button>
        <button type="button" data-drop="${esc(visit.id)}">${session.confirmId === visit.id ? "Confirmar quitar" : "Quitar"}</button>
      </div>
    </article>`).join("");
    const open = session.draft && (session.editing === "new" ? session.draft.repId === rep.id : dayVisits(rep.id).some((visit) => visit.id === session.editing));
    return `<section class="col ${open ? "on" : ""}">
      <div class="row"><h2>${esc(rep.name)}${rep.id === ME_REP ? " · app" : ""}</h2><span class="fine">${visits.length}</span></div>
      <div class="fine">${esc(roomName(ops, rep.roomId))}</div>
      ${cards || `<p class="fine">Sin tours este día.</p>`}
      <button class="line" data-new="${esc(rep.id)}" type="button" style="margin-top:10px">Asignar tour</button>
    </section>`;
  }).join("");
  const form = session.editing ? formPanel(reps) : "";
  const repAdmin = session.role === "admin" ? `<section class="panel">
      <h2>Reps por sala</h2>
      <p class="fine">El administrador mueve al rep de sala. Los tours se quedan con esa persona.</p>
      <div class="reps">${ops.people.filter((person) => person.role === "rep").map((rep) => `<div class="rep">
        <b>${esc(rep.name)}</b>
        <select data-move="${esc(rep.id)}">${ops.rooms.map((room) => `<option value="${esc(room.id)}" ${room.id === rep.roomId ? "selected" : ""}>${esc(room.name)}</option>`).join("")}</select>
      </div>`).join("")}</div>
      <button class="ghost" data-reset type="button">${session.confirmReset ? "Confirmar restaurar ejemplo" : "Restaurar ejemplo"}</button>
    </section>` : `<section class="panel"><h2>Tu sala</h2><p class="fine">${esc(jefe ? `${jefe.name} ve solo ${roomName(ops, jefe.roomId)}.` : "")} Los tours del día se asignan en las columnas. La app del rep los lee al abrir o al actualizar.</p></section>`;
  app.innerHTML = `<div class="wrap">
    <header class="top">
      <div>
        <h1>Tablero de sala</h1>
        <p>Se guarda en el servidor. Cada rep ve lo suyo en la app.</p>
        ${board.busy ? `<p class="fine">Actualizando…</p>` : ""}
        ${board.syncError ? `<div class="warn">${esc(board.syncError)}</div>` : ""}
        ${session.toast ? `<div class="toast">${esc(session.toast)}</div>` : ""}
      </div>
      <a class="back" href="/">Volver a la app</a>
    </header>
    <div class="switch">${roleChips}</div>
    <div class="bar">${jefeChips}</div>
    <div class="datebar">
      <button class="icon" data-day="-1" type="button" aria-label="Día anterior"><span class="material-symbols-outlined">chevron_left</span></button>
      <strong>${esc(titleDate(session.date))}</strong>
      <button class="icon" data-day="1" type="button" aria-label="Día siguiente"><span class="material-symbols-outlined">chevron_right</span></button>
      <button class="line" data-reload type="button">Actualizar</button>
    </div>
    ${form}
    <div class="board">${columns || `<section class="col"><p>Esta sala no tiene reps.</p></section>`}</div>
    ${repAdmin}
  </div>`;
  if (session.editing) document.querySelector(".composer")?.scrollIntoView({ block: "nearest" });
}

function formPanel(reps) {
  const draft = session.draft;
  const clash = overlaps(draft, session.editing === "new" ? "" : session.editing);
  return `<section class="panel composer">
    <h2>${session.editing === "new" ? "Nuevo tour" : "Editar tour"}</h2>
    <p class="fine">${esc(titleDate(session.date))} · ${esc(personName(draft.repId))}. El lead se queda como Lead #.</p>
    ${session.error ? `<div class="warn">${esc(session.error)}</div>` : ""}
    ${clash ? `<div class="warn">Ese horario se empalma con otro tour del mismo rep. Cámbialo para guardar.</div>` : ""}
    <div class="grid">
      <label>Rep<select data-draft="repId">${reps.map((rep) => `<option value="${esc(rep.id)}" ${rep.id === draft.repId ? "selected" : ""}>${esc(rep.name)}</option>`).join("")}</select></label>
      <label>Lead<input data-draft="lead" list="leads" value="${esc(draft.lead)}"></label>
      <label>Inicio<input data-draft="start" type="time" step="60" value="${esc(normalizeClock(draft.start) || draft.start)}"></label>
      <label>Fin<input data-draft="end" type="time" step="60" value="${esc(normalizeClock(draft.end) || draft.end)}"></label>
      <label>Estado<select data-draft="status">${Object.entries(STATUS_LABEL).map(([id, label]) => `<option value="${id}" ${id === draft.status ? "selected" : ""}>${label}</option>`).join("")}</select></label>
      <label>Nota<input data-draft="note" value="${esc(draft.note)}" maxlength="80"></label>
    </div>
    <datalist id="leads">${EXAMPLE_LEADS.map((lead) => `<option value="${esc(lead)}"></option>`).join("")}</datalist>
    <div class="actions">
      <button class="gold" data-save type="button" ${clash ? "disabled" : ""}>Guardar</button>
      <button class="line" data-cancel type="button">Cancelar</button>
    </div>
  </section>`;
}

function readDraft() {
  if (!session.draft) return;
  app.querySelectorAll("[data-draft]").forEach((field) => {
    session.draft[field.dataset.draft] = field.value;
  });
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
  const day = event.target.closest("[data-day]");
  if (day) {
    session.date = addDays(session.date, Number(day.dataset.day));
    session.editing = null;
    session.focusId = "";
    pull();
    return;
  }
  const create = event.target.closest("[data-new]");
  if (create) {
    session.editing = "new";
    session.draft = blankDraft(create.dataset.new);
    session.error = "";
    session.focusId = "";
    render();
    return;
  }
  const edit = event.target.closest("[data-edit]");
  if (edit) {
    const visit = board.visits.find((item) => item.id === edit.dataset.edit);
    if (!visit) return;
    session.editing = visit.id;
    session.draft = { repId: visit.repId, start: visit.start, end: visit.end, lead: visit.lead, status: visit.status, note: visit.note || "" };
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
  if (event.target.dataset.draft) {
    readDraft();
    session.error = "";
    render();
    const field = app.querySelector(`[data-draft="${event.target.dataset.draft}"]`);
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

pull();
