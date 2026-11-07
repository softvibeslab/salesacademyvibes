import { opsRequest } from "./ops-api.js";
import { EXAMPLE_TODAY, ME_REP, STATUS_LABEL, addDays, defaultOps, labelDate } from "./ops-store.js";
import { homeCounters } from "./home-counters.js";
import { waShareUrl, previewMessage } from "./wa-share.js";
import { FAB_MSG_TYPE, FAB_SIZE, FAB_MARGIN, clampFab, isTap, resolveFabMenu } from "./fab.js";

// Catálogos del resultado (REQ-006). El servidor manda los vigentes en /api/catalog;
// estos son el respaldo si no responde.
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

async function refreshCatalog() {
  try {
    const data = await opsRequest("/api/catalog", { actor: `rep:${state.meId}` });
    ["outcomes", "objections", "actions", "failSteps"].forEach((key) => {
      if (Array.isArray(data[key]) && data[key].length) catalogs[key] = data[key];
    });
    if (Array.isArray(data.currencies) && data.currencies.length) catalogs.currencies = data.currencies;
  } catch { /* el respaldo local cubre los catálogos */ }
}

const CONFLICT_HINT = "Alguien más actualizó";

const FLOWS = [
  { id: "nota", n: "02", title: "Nota personal", path: "Hoy → Nueva nota → Guardar", start: "nota" },
  { id: "presentacion", n: "03", title: "Registrar presentación", path: "Hoy → Registro → Vista previa → Confirmar", start: "presentacion" },
  { id: "tarea", n: "04", title: "Tarea y origen", path: "Hoy → Recordatorio o prioridad", start: "tarea" },
  { id: "cierre", n: "05", title: "Cerrar la jornada", path: "Hoy → Cierre personal → Compartir", start: "cierre" },
  { id: "metas", n: "13", title: "Metas del día", path: "Hoy → Editar prioridades", start: "metas" },
  { id: "bloque", n: "14", title: "Bloque flexible", path: "Hoy → Añadir bloque", start: "bloque" },
  { id: "mes", n: "07", title: "Meta del mes", path: "Métricas, meta y revisión", start: "goalsheet" },
  { id: "equipo", n: "10", title: "Coaching y equipo", path: "Próximo bloque → Coaching → Equipo", start: "coaching" },
  { id: "historial", n: "09", title: "Historial", path: "Buscar notas y presentaciones", start: "historial" },
  { id: "explorar", n: "16", title: "Módulos y recursos", path: "Módulos, Copiloto y fichas", start: "roadmap" },
];

const TABS = [
  { id: "hoy", icon: "home", label: "Home" },
  { id: "roadmap", icon: "timeline", label: "Roadmap" },
  { id: "coach", icon: "smart_toy", label: "Copiloto" },
  { id: "resources", icon: "local_library", label: "Recursos" },
  { id: "perfil", icon: "person", label: "Perfil" },
];

const SHELL = new Set(["hoy", "roadmap", "coach", "resources", "perfil", "goalsheet", "historial", "coaching", "equipo", "metricas", "revision", "pendientes", "notas", "presentaciones", "ficha"]);

const RES_CATS = {
  todas: "Todas",
  cotizar: "Cotizar",
  registrar: "Registrar",
  medir: "Medir",
  practicar: "Practicar",
  aprender: "Aprender",
  cliente: "Cuidar al cliente",
  biblioteca: "Biblioteca",
};

const COPILOTO_SKILLS = [
  ["SK-01", "Cotizar membresía", "cotizar", "Base", "Mensualidad, inversión inicial y saldo en segundos.", "cotiza 20 mil con 30% a 120 meses al 14.9"],
  ["SK-02", "Comparar enganches", "cotizar", "Base", "Tres escenarios lado a lado para mostrar al cliente.", "muéstrale al cliente"],
  ["SK-03", "Cotizar upgrade", "cotizar", "Base", "Nuevo valor, pago de hoy y mensualidad del upgrade.", "upgrade de 20 mil, costo 10 mil, 20% inicial, saldo 8 mil, 60 meses al 12"],
  ["SK-04", "¿Cuánto puede pagar?", "cotizar", "Base", "De la mensualidad que le alcanza al paquete sugerido.", "puede pagar 300 al mes a 48 meses al 7"],
  ["SK-05", "Enganche diferido", "cotizar", "Pro", "Divide el enganche en hoy + pagos con recargo fijo.", "enganche diferido de 20 mil: 10% hoy y 10% en 12 pagos con recargo 10, 120 meses al 14.9"],
  ["SK-06", "Convertir a pesos", "cotizar", "Base", "Equivalente en MXN con el tipo de cambio de la sala.", "pásalo a pesos con tipo de cambio 18.5"],
  ["SK-07", "Registrar tour en 30 s", "registrar", "Base", "Venta o no venta con la objeción principal.", "vendí 25 mil, objeción dinero"],
  ["SK-08", "Mi día / Mi mes", "medir", "Base", "VPG, cierre, promedio y lo que falta para la meta.", "¿cómo voy?"],
  ["SK-09", "Meta del mes", "medir", "Base", "Fija tu meta de volumen del mes.", "mi meta es 60 mil"],
  ["SK-10", "Mi comisión estimada", "medir", "Pro", "Comisión con split y retención (estimación personal).", "comisión de 25 mil con split reps 2.5% closers 3.5% y retención 16%"],
  ["SK-11", "Ahorro vacacional", "cotizar", "Pro", "Cuánto ahorra el cliente frente a viajar por su cuenta.", "ahorro de 7 noches a 250 la noche contra 120 del club por 10 años"],
  ["SK-12", "Mantenimiento proyectado", "cotizar", "Pro", "Costo de mantenimiento acumulado con inflación.", "mantenimiento de 1000 al año con 10% de inflación por 10 años"],
  ["SK-13", "Practicar objeción", "practicar", "Base", "Aislar, reencuadrar y cerrar; tu respuesta va al manager.", "quiero practicar la objeción de tiempo"],
  ["SK-14", "Preparar mi tour", "aprender", "Base", "Guion y objeciones probables según el perfil del prospecto.", "prepárame para una pareja de jubilados"],
  ["SK-15", "Después del tour", "aprender", "Base", "Qué aprendiste y qué practicar después de cada tour.", "¿cómo me fue en el último tour?"],
  ["SK-16", "Buscar en la biblioteca", "aprender", "Base", "Respuestas con cita del material aprobado de la sala.", "¿qué le digo si no tiene tiempo?"],
  ["SK-17", "Seguimiento de cliente", "cliente", "Pro", "Recordatorios y notas con consentimiento del cliente.", "dar seguimiento a Ana en 3 días: quiere ver fechas"],
  ["SK-18", "Sala del manager", "medir", "Base", "Ranking de reps, alertas de cierre y asignar práctica.", "ranking de mi sala"],
  ["SK-19", "Inicio del día", "medir", "Base", "Tu meta, tu racha y una práctica sugerida cada mañana.", "buenos días"],
].map(([id, name, category, plan, description, example]) => ({ id, name, category, plan, description, example }));

const COPILOTO_LIBRARY = [
  { id: "LIB-01", title: "Objeción de tiempo: \"no sé cuándo podré viajar\"", tags: "tiempo · agenda · fechas", ask: "¿qué le digo si no tiene tiempo?", body: "Primero confirma si es lo único que lo detiene. Luego cambia el enfoque: la membresía sirve justo para apartar descanso antes de que el trabajo lo ocupe todo. Cierra con una pregunta concreta sobre su próxima ventana de vacaciones." },
  { id: "LIB-02", title: "Objeción de dinero: \"está muy caro\"", tags: "dinero · precio · enganche", ask: "¿qué le digo si está muy caro?", body: "Pregunta qué mensualidad le resulta cómoda y usa \"¿Cuánto puede pagar?\" para mostrar el paquete que sí le cabe. No negocies precio fuera de lo publicado por la sala; si pide descuento, deriva al manager." },
  { id: "LIB-03", title: "Decisión de pareja: \"lo tengo que platicar\"", tags: "pareja · decisión", ask: "¿qué le digo si lo tiene que platicar con su pareja?", body: "Identifica qué le preocuparía a la otra persona y resuélvelo ahora con ambos presentes si es posible. Si no está, agenda una llamada corta con los dos antes de que salgan de la sala." },
  { id: "LIB-04", title: "Escepticismo: \"leí cosas malas en redes\"", tags: "escepticismo · redes · contrato", ask: "¿qué le digo si leyó cosas malas en redes?", body: "Valida la duda sin discutir. Muestra el contrato, el periodo de cancelación y el proceso de verificación. La transparencia vende más que la insistencia." },
  { id: "LIB-05", title: "Pasos de la presentación", tags: "guion · presentación", ask: "pasos de la presentación", body: "Conexión, descubrimiento, presentación del producto, cotización, manejo de objeciones y cierre. Registra el tour al terminar para que tu meta del mes se actualice." },
];

const COPILOTO_PRACTICE = [
  { id: "dinero", title: "Práctica · dinero", client: "Pareja joven en su primera presentación", objection: "\"Nos encanta, pero ahorita está muy caro para nosotros.\"", steps: ["Aislar: si el pago mensual les quedara cómodo, ¿hay algo más que les impida avanzar hoy?", "Reencuadrar: compara lo que ya pagan cada año de vacaciones contra la mensualidad.", "Cerrar: deja el plan de 120 meses en la mensualidad que ellos validaron, con el enganche de hoy."] },
  { id: "pareja", title: "Práctica · pareja", client: "Señor que vino solo", objection: "\"Esto lo tengo que platicar con mi esposa.\"", steps: ["Aislar: aparte de platicarlo con ella, ¿a usted le hace sentido el programa?", "Reencuadrar: pregunta qué le preocuparía a ella y resuélvelo ahora.", "Cerrar: llámenla y véanlo los tres en diez minutos."] },
  { id: "tiempo", title: "Práctica · tiempo", client: "Familia con agenda de trabajo impredecible", objection: "\"Nunca sé qué fechas voy a tener libres.\"", steps: ["Aislar: si pudieran elegir fechas con poca anticipación, ¿esto les funcionaría?", "Reencuadrar: una agenda apretada es la razón para apartar descanso antes de que el trabajo lo ocupe.", "Cerrar: ¿cuál es la próxima semana que les gustaría apartar este año?"] },
  { id: "escepticismo", title: "Práctica · escepticismo", client: "Cliente que leyó comentarios negativos", objection: "\"Vi en redes que esto es un fraude.\"", steps: ["Aislar: valida la duda y pregunta si mostrar el contrato lo dejaría tranquilo.", "Reencuadrar: revisen juntos el contrato, el periodo para cancelar y la verificación.", "Cerrar: ¿qué más necesitaría ver para sentirse seguro de firmar hoy?"] },
];

const state = {
  view: "hoy",
  flow: "nota",
  resFilter: "todas",
  openKind: "skill",
  openId: "SK-01",
  copilotoQuery: "",
  copilotoRole: "",
  perfilRange: "hoy",
  moduleId: 5,
  doneSteps: [1, 2, 3, 4],
  showHow: false,
  calDate: "2026-11-06",
  calWeek: "2026-11-02",
  meId: (() => { try { return sessionStorage.getItem("sa.app.rep") || ME_REP; } catch { return ME_REP; } })(),
  coachTab: "hoy",
  toast: "",
  presentations: 3,
  closes: 1,
  volume: 8000,
  notes: [
    { title: "Nota #12", body: "Demo con equipo de compras.", cat: "Seguimiento", when: "6 nov" },
    { title: "Descubrimiento", body: "Confirmar la necesidad antes de presentar una solución.", cat: "Entrenamiento", when: "6 nov" },
  ],
  talks: [
    { ref: "Lead #302", result: "No venta · recuperable", amount: "", when: "5 nov" },
    { ref: "Mesa 2", result: "No venta", amount: "", when: "6 nov" },
    { ref: "Lead #188", result: "Venta", amount: "USD 8,000", when: "6 nov" },
  ],
  priorities: [
    { id: "p1", title: "Confirmar seguimiento", when: "10:45", detail: "Lead #302 · Propuesta enviada ayer", done: false, origin: "Historial de ayer" },
    { id: "p2", title: "Practicar preguntas de descubrimiento", when: "11:00", detail: "Acuerdo de coaching · Foco en objeción de precio", done: false, origin: "Coaching" },
    { id: "p3", title: "Preparar tour presencial", when: "15:00", detail: "Desde nota #12 · Demo con equipo de compras", done: false, origin: "Nota #12" },
  ],
  extra: [
    { title: "Enviar resumen de mesa", when: "16:10", detail: "Sala norte" },
    { title: "Revisar objeción de cuota", when: "17:00", detail: "Lead #4920" },
  ],
  reminder: { time: "11:30", text: "Llamada con Lead #4920 · Objeción de cuota y cierre de ciclo.", done: false },
  block: { start: "11:30", end: "12:00", title: "Práctica con mi manager", detail: "Revisión de objeciones y roleplay", mins: "30 min" },
  closed: false,
  shortcuts: null,
  editingShortcuts: false,
  taskId: "reminder",
  draft: {
    title: "",
    body: "Confirmar la necesidad antes de presentar una solución.",
    cat: "Entrenamiento",
    makeTask: false,
  },
  resultDraft: {
    tourId: "",
    outcome: "venta",
    currency: "USD",
    amount: "8000",
    objection: "",
    objectionOther: "",
    recoverable: null,
    nextAction: "segunda_visita",
    nextDate: "",
    nextOwner: "",
    failStep: 0,
    note: "",
    saving: false,
    error: "",
  },
};

const phone = document.getElementById("phone");
const sheets = document.createElement("div");
sheets.id = "sheets";
phone.append(sheets);
const map = document.getElementById("map");

/* ---------- FAB de atajos (FTD fab-atajos-app) ---------- */
const fab = document.createElement("button");
fab.id = "fab";
fab.className = "fab";
fab.type = "button";
fab.setAttribute("aria-haspopup", "true");
fab.setAttribute("aria-expanded", "false");
fab.setAttribute("aria-label", "Atajos");
fab.textContent = "+";
const fabMenu = document.createElement("div");
fabMenu.id = "fab-menu";
fabMenu.className = "fab-menu";
fabMenu.hidden = true;
phone.append(fabMenu, fab);
const FAB_POS_KEY = "sa.fab.pos";

function placeFab() {
  const w = phone.clientWidth;
  const h = phone.clientHeight;
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem(FAB_POS_KEY) || "null"); } catch { saved = null; }
  const base = saved || { x: w - FAB_SIZE - 16, y: h - FAB_SIZE - 96 };
  const pos = clampFab(base.x, base.y, w, h);
  fab.style.left = `${pos.x}px`;
  fab.style.top = `${pos.y}px`;
}

function placeFabMenu() {
  const w = phone.clientWidth;
  const h = phone.clientHeight;
  const x = parseFloat(fab.style.left) || 0;
  const y = parseFloat(fab.style.top) || 0;
  fabMenu.style.left = fabMenu.style.right = fabMenu.style.top = fabMenu.style.bottom = "auto";
  if (x > w / 2) fabMenu.style.right = `${w - x - FAB_SIZE}px`;
  else fabMenu.style.left = `${x}px`;
  if (y > h / 2) fabMenu.style.bottom = `${h - y + FAB_MARGIN}px`;
  else fabMenu.style.top = `${y + FAB_SIZE + FAB_MARGIN}px`;
}

function fichaShareFlag() {
  if (state.view !== "ficha" || state.openKind !== "skill") return false;
  return COPILOTO_SKILLS.find((item) => item.id === state.openId)?.category === "cotizar";
}

function toggleFabMenu(open) {
  const show = open ?? fabMenu.hidden;
  fabMenu.hidden = !show;
  fab.setAttribute("aria-expanded", String(show));
  if (show) {
    // Menú dinámico según la vista (plan aprobado por el PO 2026-11-07).
    const menu = resolveFabMenu(state.view, { share: fichaShareFlag() });
    const current = `nav-${state.coachTab || "hoy"}`;
    fabMenu.innerHTML = menu.map((item) => {
      if (item.sep) return `<hr class="fab-sep">`;
      const mark = item.nav && item.id === current ? ' aria-current="page"' : "";
      return `<button type="button" data-fab-act="${esc(item.id)}"${mark}>${item.icon ? `<span class="material-symbols-outlined">${esc(item.icon)}</span>` : ""}${esc(item.label)}</button>`;
    }).join("");
    placeFabMenu();
    fabMenu.querySelector("button")?.focus();
  }
}

let fabDrag = null;
fab.addEventListener("pointerdown", (event) => {
  fabDrag = {
    startX: event.clientX,
    startY: event.clientY,
    baseX: parseFloat(fab.style.left) || 0,
    baseY: parseFloat(fab.style.top) || 0,
    at: Date.now(),
  };
  fab.setPointerCapture(event.pointerId);
});
fab.addEventListener("pointermove", (event) => {
  if (!fabDrag) return;
  const pos = clampFab(fabDrag.baseX + event.clientX - fabDrag.startX, fabDrag.baseY + event.clientY - fabDrag.startY, phone.clientWidth, phone.clientHeight);
  fab.style.left = `${pos.x}px`;
  fab.style.top = `${pos.y}px`;
  if (!fabMenu.hidden) placeFabMenu();
});
fab.addEventListener("pointerup", (event) => {
  if (!fabDrag) return;
  const dx = event.clientX - fabDrag.startX;
  const dy = event.clientY - fabDrag.startY;
  const ms = Date.now() - fabDrag.at;
  fabDrag = null;
  if (isTap(dx, dy, ms)) {
    toggleFabMenu();
    return;
  }
  try { localStorage.setItem(FAB_POS_KEY, JSON.stringify({ x: parseFloat(fab.style.left), y: parseFloat(fab.style.top) })); } catch { /* el modo privado no guarda */ }
});
const COACH_FAB_IDS = new Set(["nav-hoy", "nav-catalogo", "nav-mes", "tour", "venta", "no-venta", "cotizar-cop", "como-voy"]);
fabMenu.addEventListener("click", (event) => {
  const button = event.target.closest("[data-fab-act]");
  if (!button) return;
  toggleFabMenu(false);
  const act = button.dataset.fabAct;
  if (COACH_FAB_IDS.has(act)) {
    // Contrato sa:fab: el Copiloto embebido ejecuta el comando (mismo origen).
    const id = act === "cotizar-cop" ? "cotizar" : act;
    coachFrameEl().contentWindow?.postMessage({ type: FAB_MSG_TYPE, id }, window.location.origin);
    return;
  }
  if (act === "resultado") { go("presentacion", "presentacion"); return; }
  if (act === "nota") { go("nota", "nota"); return; }
  if (act === "cotizar") { state.openKind = "skill"; state.openId = "SK-01"; go("ficha", "explorar"); return; }
  if (act === "bloque") { go("bloque", "bloque"); return; }
  if (act === "tablero") { window.open("/ops/", "_blank", "noopener"); return; }
  if (act === "reload") { refreshTours(); return; }
  if (act === "paso") { state.moduleId = currentStep().n; go("modulo"); return; }
  if (act === "practicar") { state.copilotoQuery = currentStep().q; state.copilotoRole = ""; go("coach"); return; }
  if (act === "ejecutar-paso") {
    const step = STEPS.find((item) => item.n === Number(state.moduleId)) || currentStep();
    state.copilotoQuery = step.q;
    state.copilotoRole = "";
    go("coach");
    return;
  }
  if (act === "paso-listo") { run("complete-step"); return; }
  if (act === "biblioteca") {
    state.resFilter = "biblioteca";
    go("resources", "explorar");
    phone.querySelector("#res-q")?.focus();
    return;
  }
  if (act === "usar-plantilla") { run("use-template"); return; }
  if (act === "whatsapp") { run("wa-share"); return; }
  if (act === "meta") go("goalsheet");
});
window.addEventListener("message", (event) => {
  if (event.origin !== window.location.origin) return;
  if (event.data?.type === "sa:fab-state") state.coachTab = event.data.tab;
});
document.addEventListener("click", (event) => {
  if (!fabMenu.hidden && !event.target.closest("#fab-menu, #fab")) toggleFabMenu(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !fabMenu.hidden) toggleFabMenu(false);
});
window.addEventListener("resize", () => { placeFab(); if (!fabMenu.hidden) placeFabMenu(); });
placeFab();

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[ch]));
}

function money(n) {
  return `$${Number(n).toLocaleString("en-US")}`;
}

function go(view, flow) {
  state.view = view;
  if (flow) state.flow = flow;
  state.toast = "";
  state.editingShortcuts = false;
  render();
  if (view === "hoy" || view === "calendario") refreshTours({ quiet: true });
}

function toast(text, view) {
  state.toast = text;
  if (view) state.view = view;
  render();
  window.setTimeout(() => {
    if (state.toast === text) {
      state.toast = "";
      render();
    }
  }, 2200);
}

const TAB_OF = {
  hoy: "hoy", nota: "hoy", presentacion: "hoy", preview: "hoy", tarea: "hoy", cierre: "hoy", compartir: "hoy",
  metas: "hoy", bloque: "hoy", metricas: "hoy", goalsheet: "hoy", revision: "hoy", historial: "hoy",
  notas: "hoy", presentaciones: "hoy", pendientes: "hoy", coaching: "hoy", equipo: "hoy", atajos: "hoy", calendario: "hoy",
  roadmap: "roadmap", modulo: "roadmap", coach: "coach", resources: "resources", ficha: "resources", perfil: "perfil", acceso: "perfil",
};

function shell(inner) {
  const current = TAB_OF[state.view] || "hoy";
  const tabs = TABS.map((tab) => `
    <button class="tab ${tab.id === current ? "on" : ""}" data-go="${tab.id}" type="button" ${tab.id === current ? 'aria-current="page"' : ""}>
      <span class="material-symbols-outlined ${tab.id === current ? "fill" : ""}">${tab.icon}</span>
      ${esc(tab.label)}
    </button>`).join("");
  return `${inner}<nav class="dock">${tabs}</nav>${state.toast ? `<div class="toast" role="status">${esc(state.toast)}</div>` : ""}`;
}

function taskbar(title, back, badge, label = "Home") {
  return `<header class="taskbar">
    <button class="back" data-go="${back}" type="button"><span class="material-symbols-outlined">chevron_left</span> ${esc(label)}</button>
    <h1>${esc(title)}</h1>
    <span class="pill">${esc(badge)}</span>
  </header>`;
}

const DEFAULT_SHORTCUTS = ["nota", "presentacion", "SK-01", "paso"];
const SHORT_LABEL = { "SK-01": "Cotizar", "SK-13": "Practicar", "SK-08": "Mi día", "SK-19": "Inicio" };

function shortcutCatalog() {
  const fixed = [
    { id: "nota", label: "Nueva nota", icon: "edit_note", go: "nota", flow: "nota", group: "Destinos" },
    { id: "presentacion", label: "Registrar presentación", icon: "co_present", go: "presentacion", flow: "presentacion", group: "Destinos" },
    { id: "paso", label: "Paso en curso", icon: "timeline", go: "modulo", dynamic: "step", group: "Destinos" },
    { id: "metas", label: "Prioridades", icon: "checklist", go: "metas", flow: "metas", group: "Destinos" },
    { id: "goalsheet", label: "Meta del mes", icon: "flag", go: "goalsheet", group: "Destinos" },
    { id: "historial", label: "Historial", icon: "history", go: "historial", group: "Destinos" },
    { id: "notas", label: "Notas", icon: "description", go: "notas", group: "Destinos" },
    { id: "presentaciones", label: "Presentaciones", icon: "record_voice_over", go: "presentaciones", group: "Destinos" },
    { id: "coach", label: "Copiloto", icon: "smart_toy", go: "coach", group: "Destinos" },
    { id: "bloque", label: "Nuevo bloque", icon: "schedule", go: "bloque", flow: "bloque", group: "Destinos" },
  ];
  const skills = COPILOTO_SKILLS.map((skill) => ({
    id: skill.id, label: skill.name, short: SHORT_LABEL[skill.id], icon: "bolt", go: "ficha", open: "skill", openId: skill.id, group: "Habilidades",
  }));
  const libs = COPILOTO_LIBRARY.map((item) => ({
    id: item.id, label: item.title, icon: "menu_book", go: "ficha", open: "lib", openId: item.id, group: "Biblioteca",
  }));
  const practices = COPILOTO_PRACTICE.map((item) => ({
    id: `pr-${item.id}`, label: item.title, icon: "forum", go: "ficha", open: "practice", openId: item.id, group: "Prácticas",
  }));
  return [...fixed, ...skills, ...libs, ...practices];
}

function shortcutById(id) {
  return shortcutCatalog().find((item) => item.id === id);
}

function shortcuts() {
  if (state.shortcuts == null) {
    const known = new Set(shortcutCatalog().map((item) => item.id));
    try {
      const raw = JSON.parse(localStorage.getItem("sa.home.shortcuts") || "null");
      state.shortcuts = Array.isArray(raw)
        ? [...new Set(raw.filter((id) => known.has(id)))].slice(0, 6)
        : [...DEFAULT_SHORTCUTS];
    } catch {
      state.shortcuts = [...DEFAULT_SHORTCUTS];
    }
  }
  return state.shortcuts;
}

function writeShortcuts(ids) {
  state.shortcuts = ids.slice(0, 6);
  try { localStorage.setItem("sa.home.shortcuts", JSON.stringify(state.shortcuts)); } catch { /* el modo privado no guarda */ }
}

function currentStep() {
  return STEPS.find((step) => stepState(step) === "now") || STEPS[STEPS.length - 1];
}

function shortcutChip(item) {
  const step = item.dynamic === "step" ? currentStep() : null;
  const label = step ? `${step.n}. ${step.title}` : (item.short || item.label);
  if (item.open) {
    return `<button class="shortcut" data-open="${esc(item.open)}" data-id="${esc(item.openId)}" type="button"><span class="material-symbols-outlined">${item.icon}</span><span class="name">${esc(label)}</span></button>`;
  }
  const id = step ? ` data-id="${step.n}"` : "";
  const flow = item.flow ? ` data-flow="${esc(item.flow)}"` : "";
  return `<button class="shortcut" data-go="${esc(item.go)}"${flow}${id} type="button"><span class="material-symbols-outlined">${item.icon}</span><span class="name">${esc(label)}</span></button>`;
}

function minutesOf(value) {
  const [hour, minute] = String(value || "0:0").split(":").map(Number);
  return (hour || 0) * 60 + (minute || 0);
}

function viewHoy() {
  const goal = 12000;
  const live = homeCounters(tours.visits, state.meId, EXAMPLE_TODAY);
  state.presentations = live.presentations;
  state.closes = live.closes;
  state.volume = live.volumeUSD;
  const presPct = Math.min(100, Math.round((live.presentations / 4) * 100));
  const closePct = Math.min(100, Math.round((live.closes / 2) * 100));
  const volPct = Math.min(100, Math.round((live.volumeUSD / goal) * 100));
  const mxnSale = myVisits(EXAMPLE_TODAY).some((visit) => visit.result?.outcome === "venta" && visit.result.currency === "MXN");
  const stats = [
    ["Presentaciones", `${live.presentations}/4`, presPct],
    ["Cierres", `${live.closes}/2`, closePct],
    ["Volumen", money(live.volumeUSD), volPct],
  ];
  const items = state.priorities.map((item) => `
    <div class="item">
      <input class="check" data-done="${item.id}" type="checkbox" ${item.done ? "checked" : ""} aria-label="Marcar ${esc(item.title)}">
      <button data-task="${item.id}" type="button" style="flex:1;text-align:left;background:none;border:0;padding:0">
        <strong style="${item.done ? "text-decoration:line-through" : ""}">${esc(item.title)} <span class="time">${esc(item.when)}</span></strong>
        <span class="meta">${esc(item.detail)}</span>
      </button>
      <span class="material-symbols-outlined" style="color:#7e7666">chevron_right</span>
    </div>`).join("");
  const showReminder = !state.reminder.done && minutesOf(state.reminder.time) <= minutesOf(state.block.start);
  const now = state.closed
    ? `<section class="card"><b>Jornada cerrada</b><p class="fine">El cierre quedó guardado para ti.</p></section>`
    : showReminder
      ? `<section class="alert">
          <div class="row-between">
            <span class="kicker"><span class="material-symbols-outlined">notifications_active</span> Ahora</span>
            <span class="fine">${esc(state.reminder.time)}</span>
          </div>
          <p class="fine" style="margin:0;color:var(--ink)">${esc(state.reminder.text)}</p>
          <div class="actions">
            <button class="chip-btn" data-act="snooze" type="button">Posponer 15m</button>
            <button class="chip-btn gold" data-act="call" type="button"><span class="material-symbols-outlined">call</span> Iniciar</button>
          </div>
        </section>`
      : `<button class="card block" data-go="coaching" data-flow="equipo" type="button" style="width:100%">
          <span style="display:flex;gap:10px;align-items:center;text-align:left">
            <span class="clock">${esc(state.block.start)}<small>${esc(state.block.end)}</small></span>
            <span><strong style="display:block">${esc(state.block.title)}</strong><span class="meta">${esc(state.block.detail)}</span></span>
          </span>
          <span class="badge">${esc(state.block.mins)}</span>
        </button>`;
  const pinned = shortcuts().map((id) => shortcutById(id)).filter(Boolean);
  const shortcutBody = state.editingShortcuts
    ? pinned.map((item, index) => `<div class="sc-row">
        <span class="material-symbols-outlined">${item.icon}</span>
        <span class="name">${esc(item.dynamic === "step" ? `${currentStep().n}. ${currentStep().title}` : item.label)}</span>
        <button class="icon-btn" data-act="up-sc-${esc(item.id)}" type="button" aria-label="Subir" ${index === 0 ? "disabled" : ""}><span class="material-symbols-outlined">arrow_upward</span></button>
        <button class="icon-btn" data-act="down-sc-${esc(item.id)}" type="button" aria-label="Bajar" ${index === pinned.length - 1 ? "disabled" : ""}><span class="material-symbols-outlined">arrow_downward</span></button>
        <button class="icon-btn" data-act="drop-sc-${esc(item.id)}" type="button" aria-label="Quitar"><span class="material-symbols-outlined">close</span></button>
      </div>`).join("")
    : `<div class="shortcut-row">${pinned.map(shortcutChip).join("")}</div>`;
  const addLink = pinned.length < 6 ? `<button class="linkish" data-go="atajos" type="button">Agregar</button>` : `<span class="fine">6 de 6</span>`;
  return shell(`
    <header class="topbar">
      <div class="brand"><span class="avatar">SA</span> Sales Academy</div>
      <button class="icon-btn" data-go="calendario" type="button" aria-label="Calendario"><span class="material-symbols-outlined">calendar_today</span></button>
    </header>
    <div class="screen">
      <div class="head">
        <div><h1>Hoy</h1><p>Viernes 6 de noviembre</p></div>
        <button class="datechip" data-go="calendario" type="button">Nov 06</button>
      </div>
      <button class="stats" data-go="perfil" type="button" aria-label="Ver rendimiento">
        ${stats.map(([label, value, pct]) => `<span class="stat"><em>${esc(label)}</em><b>${esc(value)}</b><span class="track"><span style="width:${pct}%"></span></span></span>`).join("")}
      </button>
      <p class="fine">Metas de ejemplo: 4 presentaciones, 2 cierres y ${money(goal)} USD. Los avances salen de tus resultados del día.${mxnSale ? " Las ventas en MXN no suman al volumen USD." : ""}</p>
      <section style="margin-top:16px">
        ${whoChips()}
        <p class="fine">${esc(meLabel())}. ${esc(agoLabel())}</p>
        <div class="row-between"><h2 class="section-title">Tours de hoy</h2><span><button class="linkish" data-act="reload-tours" type="button">Actualizar</button> · <button class="linkish" data-go="calendario" type="button">Calendario</button></span></div>
        ${tourCard(EXAMPLE_TODAY)}
      </section>
      <section style="margin-top:16px">
        <div class="row-between"><h2 class="section-title">Ahora</h2><button class="linkish" data-go="bloque" data-flow="bloque" type="button">+ Bloque</button></div>
        ${now}
      </section>
      <section style="margin-top:18px">
        <div class="row-between">
          <h2 class="section-title">Tus prioridades</h2>
          <button class="linkish" data-go="metas" data-flow="metas" type="button">Editar</button>
        </div>
        <div class="ledger">${items}</div>
        <button class="linkish" data-go="pendientes" type="button" style="margin-top:8px">Ver pendientes (${state.priorities.length + state.extra.length})</button>
      </section>
      <section style="margin-top:18px">
        <div class="row-between">
          <h2 class="section-title">Atajos</h2>
          <span>${addLink}<button class="linkish" data-act="edit-shortcuts" type="button" style="margin-left:10px">${state.editingShortcuts ? "Listo" : "Editar"}</button></span>
        </div>
        ${shortcutBody || `<p class="fine">Todavía no hay atajos.</p>`}
      </section>
      <section style="margin-top:22px;text-align:center">
        <button class="btn ghost" data-go="cierre" data-flow="cierre" type="button" style="width:100%" ${state.closed ? "disabled" : ""}>
          <span class="material-symbols-outlined">task_alt</span> ${state.closed ? "Jornada cerrada" : "Cerrar jornada"}
        </button>
        <p class="fine"><span class="material-symbols-outlined" style="font-size:14px">lock</span> El cierre es personal</p>
      </section>
    </div>`);
}

function viewAtajos() {
  const pinned = new Set(shortcuts());
  const room = 6 - pinned.size;
  const groups = ["Destinos", "Habilidades", "Biblioteca", "Prácticas"];
  const body = groups.map((group) => {
    const rows = shortcutCatalog().filter((item) => item.group === group && !pinned.has(item.id));
    if (!rows.length) return "";
    return `<h2 class="section-title" style="margin:12px 0 8px">${group}</h2>` + rows.map((item) => `
      <button class="sc-add" data-act="add-sc-${esc(item.id)}" type="button" ${room ? "" : "disabled"}>
        <span class="material-symbols-outlined">${item.icon}</span>
        <span>${esc(item.label)}</span>
      </button>`).join("");
  }).join("");
  return `${taskbar("Atajos", "hoy", `${pinned.size}/6`)}
    <div class="screen task">
      <p class="fine">${room ? `Puedes agregar ${room}.` : "Ya tienes 6. Quita uno en Home para agregar otro."}</p>
      ${body}
    </div>`;
}

function viewNota() {
  const d = state.draft;
  return `${taskbar("Nueva nota", "hoy", "Personal")}
    <div class="screen task">
      <section class="card paper">
        <div class="field"><label for="note-title">Título (opcional)</label><input id="note-title" value="${esc(d.title)}" placeholder="Asunto clave o prospecto"></div>
        <div class="field"><label for="note-body">Reflexión o apunte</label><textarea id="note-body">${esc(d.body)}</textarea></div>
        <div class="field"><label for="note-cat">Categoría</label>
          <select id="note-cat">${["Entrenamiento", "Objeciones", "Pitch", "Seguimiento"].map((cat) => `<option ${cat === d.cat ? "selected" : ""}>${cat}</option>`).join("")}</select>
        </div>
      </section>
      <section class="card paper switch" style="margin-top:10px">
        <span><strong style="display:block">Convertir en tarea después de guardar</strong><span class="fine">Se añadirá a la agenda de hoy</span></span>
        <input id="note-task" type="checkbox" ${d.makeTask ? "checked" : ""}>
      </section>
      <p class="note"><span class="material-symbols-outlined">lock</span> Esta nota es personal. No se comparte sola.</p>
      <div class="footer-actions">
        <button class="btn gold" data-act="save-note" type="button" style="width:100%">Guardar nota</button>
        <button class="btn text" data-go="hoy" type="button" style="width:100%">Cancelar</button>
      </div>
    </div>`;
}

function selectedTour() {
  return tours.visits.find((visit) => visit.id === state.resultDraft.tourId) || null;
}

function prefillResultDraft(visit) {
  const r = state.resultDraft;
  r.tourId = visit ? visit.id : "";
  r.saving = false;
  r.error = "";
  const result = visit?.result;
  if (result) {
    r.outcome = result.outcome;
    r.currency = result.currency || "USD";
    r.amount = result.amount != null ? String(result.amount) : "8000";
    r.objection = result.objection || "";
    r.objectionOther = result.objectionOther || "";
    r.recoverable = typeof result.recoverable === "boolean" ? result.recoverable : null;
    r.nextAction = result.nextStep?.action || "segunda_visita";
    r.nextDate = result.nextStep?.date || (visit ? addDays(visit.date, 1) : "");
    r.nextOwner = result.nextStep?.ownerId || state.meId;
    r.failStep = result.failStep || 0;
    r.note = result.note || "";
  } else {
    r.outcome = "venta";
    r.currency = "USD";
    r.amount = "8000";
    r.objection = "";
    r.objectionOther = "";
    r.recoverable = null;
    r.nextAction = "segunda_visita";
    r.nextDate = visit ? addDays(visit.date, 1) : "";
    r.nextOwner = state.meId;
    r.failStep = 0;
    r.note = "";
  }
}

function ensureResultDraft() {
  const r = state.resultDraft;
  const candidates = closableTours();
  if (!candidates.some((visit) => visit.id === r.tourId)) {
    prefillResultDraft(candidates[0] || null);
  }
}

function viewPresentacion() {
  ensureResultDraft();
  const r = state.resultDraft;
  const candidates = closableTours();
  const visit = selectedTour();
  if (!candidates.length) {
    return `${taskbar("Registrar resultado", "hoy", "Registro")}
      <div class="screen task">
        <section class="card"><p class="fine">No tienes tours por cerrar hoy. Los asigna el jefe de sala en el tablero.</p></section>
        <div class="footer-actions"><button class="btn text" data-go="hoy" type="button" style="width:100%">Volver</button></div>
      </div>`;
  }
  const seg = (value, label) => `<label><input name="result" type="radio" value="${value}" ${r.outcome === value ? "checked" : ""}><span>${label}</span></label>`;
  const objChips = catalogs.objections.map((item) => `<button class="chip-btn ${r.objection === item.id ? "gold" : ""}" data-act="obj-${esc(item.id)}" type="button">${esc(item.label)}</button>`).join("");
  const jefes = roster.people.filter((person) => person.role === "jefe" && person.roomId === mePerson().roomId);
  const owners = [mePerson(), ...jefes];
  const steps = (catalogs.failSteps.length ? catalogs.failSteps : STEPS.map((step) => ({ n: step.n, title: step.title })));
  const saleBox = r.outcome === "venta" ? `<section class="card paper">
      <h2 class="section-title">Detalle de la venta</h2>
      <div class="duo">
        <div class="field"><label for="res-currency">Divisa</label><select id="res-currency">${catalogs.currencies.map((cur) => `<option ${cur === r.currency ? "selected" : ""}>${esc(cur)}</option>`).join("")}</select></div>
        <div class="field"><label for="res-amount">Volumen</label><input id="res-amount" inputmode="decimal" value="${esc(r.amount)}"></div>
      </div>
    </section>` : "";
  const noSaleBox = r.outcome === "no_venta" ? `<section class="card paper">
      <h2 class="section-title">Detalle de la no venta</h2>
      <div class="field"><label>Objeción principal</label><div class="types" role="group" aria-label="Objeción principal">${objChips}</div></div>
      ${r.objection === "otra" ? `<div class="field"><label for="res-obj-other">¿Cuál?</label><input id="res-obj-other" maxlength="60" value="${esc(r.objectionOther)}"></div>` : ""}
      <div class="field"><label>¿Se puede recuperar?</label><div class="seg two">
        <label><input name="recoverable" type="radio" value="si" ${r.recoverable === true ? "checked" : ""}><span>Sí</span></label>
        <label><input name="recoverable" type="radio" value="no" ${r.recoverable === false ? "checked" : ""}><span>No</span></label>
      </div></div>
      ${r.recoverable ? `<div class="field"><label for="res-action">Siguiente paso</label><select id="res-action">${catalogs.actions.map((item) => `<option value="${esc(item.id)}" ${item.id === r.nextAction ? "selected" : ""}>${esc(item.label)}</option>`).join("")}</select></div>
      <div class="duo">
        <div class="field"><label for="res-date">Fecha</label><input id="res-date" type="date" value="${esc(r.nextDate)}" min="${esc(visit?.date || "")}"></div>
        <div class="field"><label for="res-owner">Responsable</label><select id="res-owner">${owners.map((person) => `<option value="${esc(person.id)}" ${person.id === r.nextOwner ? "selected" : ""}>${esc(person.name)} (${person.role === "jefe" ? "jefe" : "rep"})</option>`).join("")}</select></div>
      </div>` : ""}
    </section>` : "";
  const abandonBox = r.outcome === "abandono" ? `<section class="card paper">
      <h2 class="section-title">¿En qué paso se cortó?</h2>
      <div class="field"><select id="res-step"><option value="0" ${!r.failStep ? "selected" : ""}>Elige el paso</option>${steps.map((step) => `<option value="${step.n}" ${Number(r.failStep) === step.n ? "selected" : ""}>${step.n} · ${esc(step.title)}</option>`).join("")}</select></div>
    </section>` : "";
  const correction = visit?.result ? `<p class="note"><span class="material-symbols-outlined">history</span> Este tour ya tiene resultado (${esc(resultLabel(visit.result))}). Al confirmar lo reemplazas.</p>` : "";
  const conflict = r.error.includes(CONFLICT_HINT);
  return `${taskbar("Registrar resultado", "hoy", "Registro")}
    <div class="screen task">
      <div class="field"><label for="res-tour">Tour</label><select id="res-tour">${candidates.map((item) => `<option value="${esc(item.id)}" ${item.id === r.tourId ? "selected" : ""}>${esc(item.start)}–${esc(item.end)} · ${esc(item.lead)}${item.result ? " · con resultado" : ""}</option>`).join("")}</select></div>
      <p class="fine">Solo tus tours que ya terminaron.</p>
      ${correction}
      <div class="field"><label>Resultado</label><div class="seg">${catalogs.outcomes.map((item) => seg(item.id, item.label)).join("")}</div></div>
      ${saleBox}${noSaleBox}${abandonBox}
      <div class="field"><label for="res-note">Nota (opcional) <span class="fine" id="note-count">${r.note.length}/120</span></label><textarea id="res-note" maxlength="120" style="min-height:64px">${esc(r.note)}</textarea></div>
      <p class="fine">Sin nombres, correos ni teléfonos.</p>
      ${r.error ? `<div class="warn" role="alert">${esc(r.error)}${conflict ? ` <button class="linkish" data-act="refresh-result" type="button">Actualizar</button>` : ""}</div>` : ""}
      <div class="footer-actions">
        <button class="btn gold" data-act="save-talk" type="button" style="width:100%" ${r.saving ? "disabled" : ""}>Vista previa</button>
        <button class="btn text" data-go="hoy" type="button" style="width:100%">Cancelar</button>
      </div>
    </div>`;
}

function viewPreview() {
  const r = state.resultDraft;
  const visit = selectedTour();
  if (!visit) {
    return `${taskbar("Vista previa", "presentacion", "Confirmar", "Registro")}
      <div class="screen task"><section class="card"><p class="fine">Elige primero el tour.</p></section></div>`;
  }
  let detail = "";
  if (r.outcome === "venta") {
    detail = `<p><b>${esc(r.currency)} ${esc(Number(String(r.amount).replace(/[^0-9.]/g, "")).toLocaleString("en-US"))}</b></p>`;
  } else if (r.outcome === "no_venta") {
    const objection = r.objection === "otra" ? r.objectionOther : catalogLabel("objections", r.objection);
    detail = `<p>Objeción: <b>${esc(objection)}</b> · ${r.recoverable ? "recuperable" : "no recuperable"}</p>
      ${r.recoverable ? `<p class="fine">Siguiente paso: ${esc(catalogLabel("actions", r.nextAction))} · ${esc(r.nextDate)} · ${esc(roster.people.find((person) => person.id === r.nextOwner)?.name || r.nextOwner)}</p>` : ""}`;
  } else {
    const step = STEPS.find((item) => item.n === Number(r.failStep));
    detail = `<p>Se cortó en el paso <b>${esc(r.failStep)}${step ? ` · ${esc(step.title)}` : ""}</b></p>`;
  }
  const conflict = r.error.includes(CONFLICT_HINT);
  return `${taskbar("Vista previa", "presentacion", "Confirmar", "Registro")}
    <div class="screen task">
      <section class="card paper">
        <p class="fine">Así queda el resultado. Se guarda al confirmar.</p>
        <h2 class="section-title" style="margin-top:8px">${esc(catalogLabel("outcomes", r.outcome))}</h2>
        <p>${esc(visit.start)}–${esc(visit.end)} · ${esc(visit.lead)}</p>
        ${detail}
        ${r.note ? `<p class="fine">Nota: ${esc(r.note)}</p>` : ""}
        ${visit.result ? `<p class="fine">Reemplaza el resultado actual (${esc(resultLabel(visit.result))}).</p>` : ""}
      </section>
      ${r.error ? `<div class="warn" role="alert">${esc(r.error)}${conflict ? ` <button class="linkish" data-act="refresh-result" type="button">Actualizar</button>` : ""}</div>` : ""}
      <div class="footer-actions">
        <button class="btn gold" data-act="confirm-talk" type="button" style="width:100%" ${r.saving ? "disabled" : ""}>${r.saving ? "Guardando…" : "Confirmar resultado"}</button>
        <button class="btn text" data-go="presentacion" type="button" style="width:100%" ${r.saving ? "disabled" : ""}>Volver a editar</button>
      </div>
    </div>`;
}

function currentTask() {
  if (state.taskId === "reminder") {
    return { title: "Llamada con Lead #4920", detail: state.reminder.text, origin: "Recordatorio de hoy", when: state.reminder.time };
  }
  return state.priorities.find((item) => item.id === state.taskId) || state.priorities[0];
}

function viewTarea() {
  const task = currentTask();
  return `${taskbar("Tarea y origen", "hoy", "Tarea")}
    <div class="screen task">
      <section class="card paper">
        <span class="badge">${esc(task.when || "")}</span>
        <h2 class="section-title" style="margin-top:8px">${esc(task.title)}</h2>
        <p>${esc(task.detail)}</p>
        <p class="fine">Origen: ${esc(task.origin || "Agenda")}</p>
      </section>
      <div class="footer-actions">
        <button class="btn gold" data-act="done-task" type="button" style="width:100%">Marcar hecha</button>
        <button class="btn line" data-act="snooze" type="button" style="width:100%">Posponer 15 min</button>
      </div>
    </div>`;
}

function viewCierre() {
  return `${taskbar("Cierre personal", "hoy", "Privado")}
    <div class="screen task">
      <div class="field"><label for="close-win">Qué funcionó hoy</label><textarea id="close-win">La pregunta de descubrimiento abrió la objeción de cuota antes del precio.</textarea></div>
      <div class="field"><label for="close-next">Siguiente acción de mañana</label><input id="close-next" value="Llamar a Lead #4920 a las 10:00"></div>
      <p class="note"><span class="material-symbols-outlined">lock</span> Este cierre no se comparte hasta que tú lo elijas.</p>
      <div class="footer-actions">
        <button class="btn gold" data-go="compartir" type="button" style="width:100%">Elegir qué compartir</button>
        <button class="btn text" data-act="close-private" type="button" style="width:100%">Guardar solo para mí</button>
      </div>
    </div>`;
}

function viewCompartir() {
  return `${taskbar("Compartir selección", "cierre", "Sala", "Cierre")}
    <div class="screen task">
      <p class="fine">Tu manager solo recibe lo que marques.</p>
      ${["Avance del día", "Presentaciones registradas", "Siguiente acción de mañana"].map((label, index) => `
        <label class="card paper switch" style="margin-top:8px">
          <span>${esc(label)}</span>
          <input type="checkbox" checked data-share="${index}">
        </label>`).join("")}
      <label class="card paper switch" style="margin-top:8px">
        <span>Notas personales</span>
        <input type="checkbox" disabled>
      </label>
      <p class="fine">Las notas personales quedan fuera.</p>
      <div class="footer-actions">
        <button class="btn gold" data-act="share" type="button" style="width:100%">Enviar al manager</button>
      </div>
    </div>`;
}

function viewMetas() {
  return `${taskbar("Metas del día", "hoy", "Día")}
    <div class="screen task">
      ${state.priorities.map((item) => `<div class="field"><label>${esc(item.when)}</label><input data-goal="${item.id}" value="${esc(item.title)}"></div>`).join("")}
      <div class="footer-actions">
        <button class="btn gold" data-act="save-goals" type="button" style="width:100%">Guardar metas</button>
      </div>
    </div>`;
}

function viewBloque() {
  return `${taskbar("Bloque flexible", "hoy", "Bloque")}
    <div class="screen task">
      <div class="duo">
        <div class="field"><label for="block-start">Empieza</label><input id="block-start" value="16:00"></div>
        <div class="field"><label for="block-end">Termina</label><input id="block-end" value="16:30"></div>
      </div>
      <div class="field"><label for="block-title">Actividad</label><input id="block-title" value="Roleplay de cuota"></div>
      <div class="footer-actions">
        <button class="btn gold" data-act="save-block" type="button" style="width:100%">Agendar bloque</button>
      </div>
    </div>`;
}

function viewSimple(title, body, back = null, backLabel = "Home") {
  const head = back
    ? taskbar(title, back, "Sala", backLabel)
    : `<header class="topbar"><div class="brand"><span class="avatar">SA</span> ${esc(title)}</div></header>`;
  const screen = `<div class="screen ${back ? "task" : ""}">${body}</div>`;
  return back ? head + screen : shell(head + screen);
}

function viewMetricas() {
  return viewSimple("Métricas", `
    <div class="head"><div><h1>Rendimiento</h1><p>Semana del 3 al 6 de noviembre</p></div></div>
    <section class="card"><div class="bars">
      ${bar("Presentaciones", state.presentations, 4)}
      ${bar("Cierres", state.closes, 2)}
      ${bar("Volumen", Math.round(state.volume / 120), 100)}
    </div></section>
    <button class="btn line" data-go="goalsheet" type="button" style="width:100%;margin-top:12px">Abrir meta del mes</button>
  `);
}

function bar(label, value, max) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return `<div class="bar-row"><span>${esc(label)}</span><div class="track"><span style="width:${pct}%"></span></div><b>${pct}%</b></div>`;
}

function viewGoalsheet() {
  return viewSimple("Meta del mes", `
    <div class="head"><div><h1>Meta del mes</h1><p>Noviembre · cuota de sala</p></div></div>
    <section class="card">
      <div class="row-between"><span>Volumen</span><b>${money(state.volume)} / $48,000</b></div>
      <div class="track" style="margin:8px 0 14px"><span style="width:${Math.round(state.volume / 480)}%"></span></div>
      <div class="row-between"><span>Presentaciones</span><b>${state.presentations} / 40</b></div>
      <div class="track" style="margin-top:8px"><span style="width:${state.presentations * 2.5}%"></span></div>
    </section>
    <button class="btn gold" data-go="revision" type="button" style="width:100%;margin-top:12px">Revisión semanal</button>
  `);
}

const tours = { ready: false, error: "", visits: [], at: 0 };
const roster = defaultOps();
let tourRequest = 0;

function mePerson() {
  return roster.people.find((person) => person.id === state.meId)
    || roster.people.find((person) => person.id === ME_REP)
    || { id: ME_REP, name: "Ana", role: "rep", roomId: "norte" };
}

function roomLabel(roomId) {
  return roster.rooms.find((room) => room.id === roomId)?.name || roomId;
}

function meLabel() {
  const me = mePerson();
  return `${me.name} · ${roomLabel(me.roomId)}`;
}

function agoLabel() {
  if (!tours.at) return "Sin actualizar";
  const sec = Math.max(0, Math.round((Date.now() - tours.at) / 1000));
  if (sec < 8) return "Actualizado ahora";
  if (sec < 60) return `Actualizado hace ${sec} s`;
  return `Actualizado hace ${Math.floor(sec / 60)} min`;
}

function whoChips() {
  const reps = roster.people.filter((person) => person.role === "rep");
  return `<div class="who">${reps.map((rep) => `<button class="chip-btn ${rep.id === state.meId ? "on" : ""}" data-act="me-${esc(rep.id)}" type="button">${esc(rep.name)}</button>`).join("")}</div>`;
}

function myVisits(date) {
  return tours.visits
    .filter((visit) => visit.repId === state.meId && visit.date === date && visit.status !== "cancelado")
    .sort((a, b) => a.start.localeCompare(b.start));
}

async function refreshRoster() {
  try {
    const data = await opsRequest("/api/directory", { actor: `rep:${state.meId}` });
    roster.rooms = data.rooms;
    roster.people = data.people;
    if (!roster.people.some((person) => person.id === state.meId && person.role === "rep")) {
      state.meId = ME_REP;
    }
  } catch {
    /* el directorio local cubre el selector si el servidor no responde */
  }
}

async function refreshTours(opts = {}) {
  const token = ++tourRequest;
  try {
    const data = await opsRequest(`/api/tours?rep=${encodeURIComponent(state.meId)}`, { actor: `rep:${state.meId}` });
    if (token !== tourRequest) return;
    tours.visits = data.visits;
    tours.error = "";
    tours.at = Date.now();
  } catch (error) {
    if (token !== tourRequest) return;
    tours.error = error.message || "No se pudo actualizar.";
    if (!opts.quiet) tours.visits = tours.visits;
  }
  tours.ready = true;
  render();
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

function resultChip(visit) {
  if (visit.result) return `<span class="pill ${visit.result.outcome === "venta" ? "on" : ""}">${esc(resultLabel(visit.result))}</span>`;
  if (tourEnded(visit)) return `<span class="pill dim">Sin resultado</span>`;
  return "";
}

function closableTours() {
  return tours.visits
    .filter((visit) => visit.repId === state.meId && visit.status !== "cancelado" && tourEnded(visit))
    .sort((a, b) => `${b.date} ${b.start}`.localeCompare(`${a.date} ${a.start}`));
}

function tourCard(date) {
  if (!tours.ready) return `<section class="card"><p class="fine">Cargando tours…</p></section>`;
  if (tours.error && !tours.visits.length) return `<section class="card"><p class="fine">${esc(tours.error)}</p></section>`;
  const visits = myVisits(date);
  if (!visits.length) return `<section class="card"><p class="fine">Sin tours asignados. Los carga el jefe de sala.</p></section>`;
  return `<section class="card">${visits.map((visit) => `<button class="vrow vrow-btn" data-act="open-result-${esc(visit.id)}" type="button">
      <span><b>${esc(visit.start)}</b> ${esc(visit.lead)}</span>
      <span class="vtags"><span class="pill">${esc(STATUS_LABEL[visit.status] || visit.status)}</span>${resultChip(visit)}</span>
    </button>`).join("")}</section>`;
}

function viewCalendario() {
  const week = state.calWeek || "2026-11-02";
  const selected = state.calDate || EXAMPLE_TODAY;
  const names = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  const days = names.map((name, index) => {
    const iso = addDays(week, index);
    const count = myVisits(iso).length;
    return `<button class="day ${iso === selected ? "on" : ""}" data-act="cal-${iso}" type="button"><small>${name}</small><b>${Number(iso.slice(-2))}</b><i class="${count ? "" : "off"}"></i></button>`;
  }).join("");
  const visits = myVisits(selected);
  const list = visits.length
    ? visits.map((visit) => `<section class="card vrow"><span><b>${esc(visit.start)}–${esc(visit.end)}</b><br>${esc(visit.lead)}${visit.note ? `<span class="fine"> · ${esc(visit.note)}</span>` : ""}</span><span class="vtags"><span class="pill">${esc(STATUS_LABEL[visit.status] || visit.status)}</span>${resultChip(visit)}</span></section>`).join("")
    : `<section class="card"><p class="fine">Este día no tienes tours.</p></section>`;
  return `${taskbar("Calendario", "hoy", mePerson().name)}
    <div class="screen task">
      <div class="row"><button class="icon-btn" data-act="cal-prev" type="button" aria-label="Semana anterior"><span class="material-symbols-outlined">chevron_left</span></button><h1 class="page-title" style="font-size:18px">${esc(labelDate(selected))}</h1><button class="icon-btn" data-act="cal-next" type="button" aria-label="Semana siguiente"><span class="material-symbols-outlined">chevron_right</span></button></div>
      ${whoChips()}
      <p class="fine">${esc(meLabel())}. Los tours los asigna el jefe de sala. ${esc(agoLabel())}</p>
      ${tours.error ? `<div class="warn">${esc(tours.error)}</div>` : ""}
      <div class="week">${days}</div>
      ${tours.ready ? list : `<section class="card"><p class="fine">Cargando tours…</p></section>`}
      <button class="btn line" data-act="reload-tours" type="button" style="width:100%;margin-top:12px">Actualizar</button>
      <a class="btn line" href="/ops/" style="width:100%;margin-top:8px;text-decoration:none">Abrir tablero de sala</a>
    </div>`;
}

function viewRevision() {
  return viewSimple("Revisión semanal", `
    <div class="head"><div><h1>Esta semana</h1><p>Tres días con ritmo y uno por cerrar.</p></div></div>
    ${["Lun · 2 presentaciones", "Mar · 1 cierre", "Mié · práctica de precio", "Jue · sin registro", "Vie · hoy, en curso"].map((line) => `<div class="card" style="margin-bottom:8px">${esc(line)}</div>`).join("")}
    <button class="btn line" data-go="hoy" type="button" style="width:100%">Volver a la agenda</button>
  `, "hoy");
}

function viewHistorial() {
  const rows = [...state.notes.map((note) => `Nota · ${note.title}`), ...state.talks.map((talk) => `Tour · ${talk.ref} · ${talk.result}`)];
  return viewSimple("Historial", `
    <div class="head"><div><h1>Historial</h1><p>Notas y presentaciones de la sala de ejemplo.</p></div></div>
    <input class="search" id="q" placeholder="Buscar" value="">
    <div id="hits">${rows.map((row) => `<div class="card" style="margin-bottom:8px" data-hit>${esc(row)}</div>`).join("")}</div>
  `);
}

function viewList(title, rows, goEach) {
  return viewSimple(title, `
    <div class="head"><div><h1>${esc(title)}</h1></div></div>
    ${rows.map((row) => `<button class="card" data-go="${goEach || "hoy"}" type="button" style="width:100%;text-align:left;margin-bottom:8px"><strong>${esc(row.title)}</strong><div class="fine">${esc(row.meta)}</div></button>`).join("")}
  `);
}

function viewCoaching() {
  return viewSimple("Coaching personal", `
    <div class="head"><div><h1>Práctica</h1><p>${esc(state.block.start)} · ${esc(state.block.mins)}</p></div></div>
    <section class="card paper"><h2 class="section-title">${esc(state.block.title)}</h2><p>${esc(state.block.detail)}</p><p class="fine">Guion: abre con la cuota, espera la objeción y pide el siguiente paso.</p></section>
    <button class="btn gold" data-go="equipo" type="button" style="width:100%;margin-top:12px">Ver a mi equipo</button>
  `);
}

function viewEquipo() {
  return viewSimple("Mi equipo", `
    <div class="head"><div><h1>Revisión</h1><p>Lo que tu manager puede ver.</p></div></div>
    <section class="card"><b>Avance compartido</b><p class="fine">${state.presentations}/4 presentaciones · ${state.closes}/2 cierres · ${money(state.volume)}</p></section>
    <section class="card" style="margin-top:8px"><b>Foco de coaching</b><p class="fine">Objeción de precio y de cuota.</p></section>
    <button class="btn line" data-go="hoy" type="button" style="width:100%;margin-top:12px">Volver a la agenda</button>
  `);
}

const DEMO_VIDEO = "PkB9UAx2fuI";

const STEPS = [
  { n: 1, title: "Meet & Greet", body: "La bienvenida se siente natural y deja clara la visita.", lesson: "Los primeros dos minutos", script: "Preséntate, di cuánto dura la visita y pregunta cómo prefieren que los llamen.", mistakes: ["Hablar de precio en el saludo.", "Ignorar a quien vino acompañando.", "Apresurarte a sentarlos."], checks: ["Saludas a todos.", "Dices la duración.", "Confirmas el nombre."], when: "Al recibirlos, antes de sentarse.", q: "prepárame el inicio del tour" },
  { n: 2, title: "Control de agenda", impact: true, body: "El control de la agenda se siente natural y establece autoridad desde el primer minuto.", lesson: "Control de agenda", script: "Usa una transición serena, haz una pregunta clara y confirma que entendieron antes de avanzar.", mistakes: ["Presionar al prospecto.", "Inventar condiciones que la sala no publicó.", "Omitir lo que hay que decir."], checks: ["Usas el lenguaje de la sala.", "Haces una sola pregunta de compromiso.", "Registras la señal en la agenda."], when: "Después del descubrimiento y antes del precio.", q: "cómo controlo la agenda del tour" },
  { n: 3, title: "Rapport (FORM)", body: "Conexión breve: familia, ocupación, recreación y motivación.", lesson: "Una vuelta de FORM", script: "Una pregunta de familia, una de trabajo y una de descanso. Luego vuelves al motivo de la visita.", mistakes: ["Interrogar.", "Contar tu vida.", "Quedarte en la charla y no pasar al descubrimiento."], checks: ["Cierras FORM en una vuelta.", "Vuelves al motivo.", "Anotas una frase suya."], when: "Después del saludo, antes del descubrimiento.", q: "prepárame el rapport" },
  { n: 4, title: "Descubrimiento", body: "Escuchas dolor, presupuesto y si pueden decidir.", lesson: "Diagnóstico antes de presentar", script: "¿Qué tendría que pasar hoy para que esto les haga sentido?", mistakes: ["Presentar antes de escuchar.", "Asumir el presupuesto.", "Hablar tú más que ellos."], checks: ["El presupuesto está en sus palabras.", "Sabes quién decide.", "Anotaste una objeción."], when: "Antes de cualquier número.", q: "pasos de la presentación" },
  { n: 5, title: "Renovar el pacto", note: "Sí o no hoy", impact: true, body: "Confirmas que pueden decidir hoy, antes de entrar a números.", lesson: "El pacto de sí o no", script: "Si el programa les cierra, ¿pueden decidir hoy, sí o no?", mistakes: ["Amenazar con que se acaba.", "Aceptar “lo pensamos” sin una fecha.", "Entrar a números sin el sí."], checks: ["La pregunta es una.", "Esperas la respuesta.", "Si es no, cierras con respeto."], when: "Justo antes de la presentación del precio.", q: "quiero practicar el cierre de sí o no hoy" },
  { n: 6, title: "Presentación a tres", body: "Entra quien valida las condiciones y tú te quedas en la mesa.", lesson: "Entrada del manager", script: "Les presento a quien valida las condiciones de la sala. Yo sigo con ustedes.", mistakes: ["Desaparecer.", "Dejar que rehagan todo el tour.", "Prometer algo que no se dijo en la mesa."], checks: ["Presentas el rol.", "Te quedas.", "Anotas lo acordado."], when: "Cuando hace falta validar una condición.", q: "cómo presento con mi manager" },
  { n: 7, title: "Recorrido", body: "Cada parada ancla un valor y vuelve a lo que ellos dijeron.", lesson: "Tres paradas", script: "En cada parada, una frase de valor y una pregunta: ¿esto es lo que buscaban?", mistakes: ["Recitar fichas.", "Saltar lo que les importa.", "Cerrar en el pasillo."], checks: ["Tres paradas.", "Una pregunta por parada.", "Vuelves a la mesa para el precio."], when: "Después del descubrimiento, antes del precio.", q: "prepárame para una pareja de jubilados" },
  { n: 8, title: "Casos de éxito", body: "Un caso parecido, sin nombres, y qué decidieron.", lesson: "Un caso, sin nombre", script: "Les cuento un caso parecido al de ustedes, sin nombres, y qué decidieron.", mistakes: ["Inventar testimonios.", "Usar nombres de clientes.", "Compararlos con alguien que no se parece."], checks: ["El caso no tiene nombre.", "Se parece a su situación.", "Preguntas si se ven ahí."], when: "Antes del punto de confirmación.", q: "¿qué le digo si leyó cosas malas en redes?" },
  { n: 9, title: "Punto de confirmación", body: "Repites lo que buscan y esperas el sí antes del número.", lesson: "El resumen en sus palabras", script: "Antes del número: lo que dijeron que buscan es esto. ¿Sigo bien?", mistakes: ["Cambiar el resumen.", "Meter el precio aquí.", "No esperar el sí."], checks: ["Repites sus palabras.", "Ellos confirman.", "Entonces pasas al precio."], when: "Inmediatamente antes del precio.", q: "pasos de la presentación" },
  { n: 10, title: "Precio y negociación", impact: true, body: "Una opción, el silencio, y la objeción aislada.", lesson: "Una opción y silencio", script: "Dices el enganche de hoy y la mensualidad. Luego callas.", mistakes: ["Ofrecer un descuento no publicado.", "Hablar encima del silencio.", "Soltar tres opciones a la vez."], checks: ["Una opción primero.", "Guardas silencio.", "Aíslas la objeción."], when: "Después de la confirmación.", q: "quiero practicar la objeción de dinero" },
  { n: 11, title: "Cierre y bienvenida", body: "Firma, pago de hoy y el siguiente paso, dichos en voz alta.", lesson: "Firma y siguiente paso", script: "Si vamos, el siguiente paso es la firma y el pago de hoy. ¿Lo hacemos?", mistakes: ["Dejar la firma para después, sin fecha.", "No mostrar el plazo para cancelar.", "Presionar el último minuto."], checks: ["El contrato está a la vista.", "El pago de hoy está claro.", "Dices el próximo paso."], when: "Al final de la mesa.", q: "vendí 25 mil, objeción dinero" },
];

function stepState(step) {
  if (state.doneSteps.includes(step.n)) return "done";
  const open = STEPS.find((item) => !state.doneSteps.includes(item.n));
  return open && open.n === step.n ? "now" : "todo";
}

function viewRoadmap() {
  const done = STEPS.filter((step) => stepState(step) === "done").length;
  const current = STEPS.find((step) => stepState(step) === "now") || STEPS[STEPS.length - 1];
  const pct = Math.round((done / STEPS.length) * 100);
  const rows = STEPS.map((step) => {
    const status = stepState(step);
    const mark = status === "done"
      ? `<span class="badge"><span class="material-symbols-outlined">check</span></span>`
      : `<span class="badge">${step.n}</span>`;
    const tag = status === "done" ? "Listo" : status === "now" ? "En curso" : "0%";
    return `<button class="mod ${status}" data-go="modulo" data-id="${step.n}" type="button">${mark}<span><strong>${step.n}. ${esc(step.title)}</strong><em>${esc(step.body)}</em></span><em class="tag">${tag}</em></button>`;
  }).join("");
  return shell(`
    <header class="topbar"><h1 class="brand">Roadmap</h1><button class="chip-btn" data-go="coach" data-q="${esc(current.q)}" type="button">Copiloto</button></header>
    <div class="screen">
      <h1 class="page-title">11 pasos</h1>
      <p class="fine">El recorrido de la venta consultiva. Ejemplo de sala.</p>
      <section class="card">
        <div class="hero">
          <div class="ring" style="--p:${pct}%"><span><b>${pct}%</b><em>Listo</em></span></div>
          <div>
            <span class="pill on">Paso actual</span>
            <b>${current.n}. ${esc(current.title)}</b>
            <p class="fine">${current.note ? `${esc(current.note)}. ` : ""}${esc(current.body)}</p>
          </div>
        </div>
        <div class="track"><span style="width:${pct}%"></span></div>
        <div class="row"><span class="fine">${done} de ${STEPS.length} módulos</span><button class="chip-btn on" data-go="modulo" data-id="${current.n}" type="button">Continuar</button></div>
      </section>
      <div class="row"><span class="eyebrow">Los 11 módulos</span><span class="pill">${done} / ${STEPS.length} listos</span></div>
      ${rows}
    </div>
  `);
}

function viewModulo() {
  const step = STEPS.find((item) => item.n === Number(state.moduleId)) || STEPS[1];
  const status = stepState(step);
  const mistakes = step.mistakes.map((item) => `<div class="checkline"><span class="material-symbols-outlined">help</span><span>${esc(item)}</span></div>`).join("");
  const checks = step.checks.map((item) => `<div class="checkline"><span class="material-symbols-outlined fill">check_circle</span><span>${esc(item)}</span></div>`).join("");
  const how = state.showHow ? `<section class="warn"><b>Cómo funciona.</b> Transición serena, una pregunta clara y confirmas que entendieron antes de avanzar. No prometas disponibilidad, descuentos ni resultados que la sala no haya publicado.</section>` : "";
  const doneBtn = status === "done"
    ? `<p class="fine">Este paso ya está listo.</p>`
    : `<button class="btn line" data-act="complete-step" type="button" style="width:100%">Marcar paso como listo</button>`;
  return `<header class="taskbar"><button class="back" data-go="roadmap" type="button"><span class="material-symbols-outlined">chevron_left</span> Roadmap</button><span class="pill">Paso ${step.n}</span></header>
    <div class="screen task">
      <div class="row"><span class="kicker">Paso ${step.n} de ${STEPS.length}</span><button class="chip-btn" data-act="how" type="button">Cómo funciona</button></div>
      <h1 class="page-title">${esc(step.title)}</h1>
      ${step.impact ? `<span class="pill on">Paso de alto impacto</span>` : ""}
      <p class="fine" style="margin:8px 0 12px">${esc(step.body)}</p>
      ${how}
      <section class="card">
        <span class="kicker">Video demo</span>
        <b>${esc(step.lesson)}</b>
        <div class="player">
          <iframe src="https://www.youtube-nocookie.com/embed/${DEMO_VIDEO}?rel=0" title="Video demo: ${esc(step.title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
        </div>
        <p class="fine">Demo del paso. La práctica sigue en el Copiloto.</p>
      </section>
      <section class="card">
        <span class="kicker">Guion</span>
        <div class="quote">${esc(step.script)}</div>
        <div class="warn"><b>Regla.</b> El mensaje se queda en lo publicado por la sala.</div>
      </section>
      <section class="card">
        <span class="kicker">Errores frecuentes</span>
        ${mistakes}
      </section>
      <section class="card">
        <span class="kicker">Checklist</span>
        ${checks}
        <p class="fine">${esc(step.when)}</p>
      </section>
      <button class="btn gold" data-go="coach" data-q="${esc(step.q)}" type="button" style="width:100%">Ejecutar paso en el Copiloto</button>
      ${doneBtn}
    </div>`;
}

function copilotoSrc() {
  const query = new URLSearchParams({ embed: "1" });
  if (state.copilotoQuery) query.set("q", state.copilotoQuery);
  if (state.copilotoRole) query.set("role", state.copilotoRole);
  return `/copiloto/?${query.toString()}`;
}

let coachFrame = null;

function coachFrameEl() {
  if (!coachFrame) {
    coachFrame = document.createElement("iframe");
    coachFrame.className = "copiloto";
    coachFrame.title = "Copiloto del rep";
  }
  const desired = copilotoSrc();
  if (coachFrame.dataset.src !== desired) {
    coachFrame.dataset.src = desired;
    coachFrame.src = desired;
  }
  return coachFrame;
}

function resourceCard(kind, id, title, meta) {
  return `<button class="card res" data-hit data-open="${kind}" data-id="${esc(id)}" type="button"><strong>${esc(title)}</strong><div class="fine">${esc(meta)}</div></button>`;
}

function viewResources() {
  const filter = state.resFilter;
  const skills = COPILOTO_SKILLS.filter((skill) => filter === "todas" || filter === skill.category);
  const showLibrary = filter === "todas" || filter === "biblioteca" || filter === "aprender";
  const showPractice = filter === "todas" || filter === "practicar";
  const chips = Object.entries(RES_CATS).map(([id, label]) => `<button class="chip-btn ${filter === id ? "gold" : ""}" data-filter="${id}" type="button">${esc(label)}</button>`).join("");
  const skillCards = skills.map((skill) => resourceCard("skill", skill.id, skill.name, `${RES_CATS[skill.category]} · ${skill.plan}`)).join("");
  const libraryCards = showLibrary ? COPILOTO_LIBRARY.map((item) => resourceCard("lib", item.id, item.title, item.tags)).join("") : "";
  const practiceCards = showPractice ? COPILOTO_PRACTICE.map((item) => resourceCard("practice", item.id, item.title, item.objection)).join("") : "";
  return viewSimple("Recursos", `
    <div class="head"><div><h1>Recursos</h1><p>Cada item abre su plantilla. La vista previa se arma con lo que escribes.</p></div></div>
    <button class="btn line" data-go="coach" type="button" style="width:100%;margin-bottom:12px">Abrir el chat</button>
    <div class="filters">${chips}</div>
    <input class="search" id="res-q" placeholder="Buscar" value="">
    ${skillCards ? `<h2 class="section-title" style="margin:4px 0 8px">Habilidades</h2>${skillCards}` : ""}
    ${libraryCards ? `<h2 class="section-title" style="margin:12px 0 8px">Biblioteca de la sala</h2>${libraryCards}` : ""}
    ${practiceCards ? `<h2 class="section-title" style="margin:12px 0 8px">Prácticas de objeción</h2>${practiceCards}` : ""}
  `);
}

const ROOM = { downPct: "30", months: "120", rate: "14.9", fxRate: "18.5", nights: "7", years: "10", inflation: "10" };

const SKILL_FORMS = {
  "SK-01": { hint: "Precio del cliente. Enganche, plazo y tasa de la sala de ejemplo.", fields: [
    { name: "price", label: "Precio", value: "20000" },
    { name: "downPct", label: "Enganche %", from: "downPct" },
    { name: "months", label: "Meses", from: "months" },
    { name: "rate", label: "Tasa %", from: "rate" },
  ] },
  "SK-03": { hint: "Valor actual, costo del upgrade y el porcentaje que paga hoy.", fields: [
    { name: "previousValue", label: "Valor actual", value: "20000" },
    { name: "upgradeCost", label: "Costo", value: "10000" },
    { name: "initialPct", label: "% de hoy", value: "20" },
    { name: "months", label: "Meses", value: "60" },
    { name: "rate", label: "Tasa %", value: "12" },
  ] },
  "SK-04": { hint: "La mensualidad que el cliente valida. El enganche de la vista previa es el 30% de la sala.", fields: [
    { name: "monthly", label: "Al mes", value: "300" },
    { name: "months", label: "Meses", value: "48" },
    { name: "rate", label: "Tasa %", value: "7" },
  ] },
  "SK-05": { hint: "Cuánto paga hoy y cuánto queda en pagos, con recargo fijo.", fields: [
    { name: "price", label: "Precio", value: "20000" },
    { name: "todayPct", label: "% hoy", value: "10" },
    { name: "deferredPct", label: "% diferido", value: "10" },
    { name: "deferredMonths", label: "Pagos", value: "12" },
    { name: "surchargePct", label: "Recargo %", value: "10" },
    { name: "months", label: "Meses", from: "months" },
    { name: "rate", label: "Tasa %", from: "rate" },
  ] },
  "SK-06": { hint: "Tipo de cambio de la sala. El chat convierte la última cotización.", fields: [
    { name: "fxRate", label: "Tipo de cambio", from: "fxRate", wide: true },
  ] },
  "SK-07": { hint: "Venta con monto, o no venta con la objeción principal.", fields: [
    { name: "type", label: "Resultado", value: "venta", options: [{ value: "venta", label: "Venta" }, { value: "no venta", label: "No venta" }] },
    { name: "amount", label: "Monto", value: "25000" },
    { name: "objection", label: "Objeción", value: "dinero", wide: true },
  ] },
  "SK-09": { hint: "El volumen que quieres cerrar este mes.", fields: [
    { name: "goal", label: "Meta", value: "60000", wide: true },
  ] },
  "SK-10": { hint: "Volumen y tu porcentaje. Estimación personal, sin nómina.", fields: [
    { name: "volume", label: "Volumen", value: "25000" },
    { name: "pct", label: "Tu %", value: "2.5" },
  ] },
  "SK-11": { hint: "Costo por noche por su cuenta y con el club. Sin inflación.", fields: [
    { name: "nights", label: "Noches", from: "nights" },
    { name: "years", label: "Años", from: "years" },
    { name: "others", label: "Por noche fuera", value: "250" },
    { name: "club", label: "Por noche club", value: "120" },
  ] },
  "SK-12": { hint: "Cuota anual y los años a proyectar.", fields: [
    { name: "yearlyCost", label: "Cuota anual", value: "1000" },
    { name: "inflation", label: "Inflación %", from: "inflation" },
    { name: "years", label: "Años", from: "years" },
  ] },
  "SK-13": { hint: "Dinero, pareja, tiempo o escepticismo.", fields: [
    { name: "category", label: "Objeción", value: "tiempo", wide: true, options: [
      { value: "dinero", label: "Dinero" }, { value: "pareja", label: "Pareja" },
      { value: "tiempo", label: "Tiempo" }, { value: "escepticismo", label: "Escepticismo" },
    ] },
  ] },
  "SK-14": { hint: "Quién llega. Sin apellidos ni datos reales.", fields: [
    { name: "profile", label: "Perfil", value: "una pareja de jubilados", wide: true },
  ] },
  "SK-16": { hint: "La pregunta, con tus palabras.", fields: [
    { name: "query", label: "Pregunta", value: "¿qué le digo si no tiene tiempo?", wide: true },
  ] },
  "SK-17": { hint: "Solo el nombre de pila, cuándo y una nota corta.", fields: [
    { name: "name", label: "Nombre", value: "Ana" },
    { name: "days", label: "En días", value: "3" },
    { name: "note", label: "Nota", value: "quiere ver fechas", wide: true },
  ] },
};

const INSTANT_SKILLS = {
  "SK-02": { phrase: "muéstrale al cliente", note: "Tres enganches de la última cotización, lado a lado, para mostrarle al cliente." },
  "SK-08": { phrase: "¿cómo voy?", note: "Volumen, cierre, promedio y lo que falta para la meta de este mes." },
  "SK-15": { phrase: "¿cómo me fue en el último tour?", note: "Qué salió en el último tour y qué conviene practicar después." },
  "SK-18": { phrase: "ranking de mi sala", note: "Ranking de la sala de ejemplo. Solo manager y admin." },
  "SK-19": { phrase: "buenos días", note: "Meta del día, racha y una práctica sugerida." },
};

function round2(n) {
  return Math.round((Number(n) + Number.EPSILON) * 100) / 100;
}

function parseAmount(text) {
  const raw = String(text ?? "").trim().toLowerCase().replace(/[$,]/g, "");
  const match = raw.match(/^(\d+(?:\.\d+)?)\s*(millones|millon|mil|k)?/);
  if (!match) return NaN;
  const mult = { millones: 1e6, millon: 1e6, mil: 1e3, k: 1e3 }[match[2]] || 1;
  return Number(match[1]) * mult;
}

function pmt(balance, annualRate, months) {
  const i = annualRate / 1200;
  if (i === 0) return balance / months;
  return (balance * i) / (1 - (1 + i) ** -months);
}

function pv(payment, annualRate, months) {
  const i = annualRate / 1200;
  if (i === 0) return payment * months;
  return (payment * (1 - (1 + i) ** -months)) / i;
}

function usd(n) {
  if (!Number.isFinite(n)) return "—";
  return `$${round2(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function fieldValue(field) {
  if (field.value != null) return field.value;
  if (field.from && ROOM[field.from] != null) return ROOM[field.from];
  return "";
}

function skillPhrase(id, v) {
  switch (id) {
    case "SK-01": return `cotiza ${v.price} con ${v.downPct}% a ${v.months} meses al ${v.rate}`;
    case "SK-03": return `upgrade de ${v.previousValue}, costo ${v.upgradeCost}, ${v.initialPct}% inicial, ${v.months} meses al ${v.rate}`;
    case "SK-04": return `puede pagar ${v.monthly} al mes a ${v.months} meses al ${v.rate}`;
    case "SK-05": return `enganche diferido de ${v.price}: ${v.todayPct}% hoy y ${v.deferredPct}% en ${v.deferredMonths} pagos con recargo ${v.surchargePct}, ${v.months} meses al ${v.rate}`;
    case "SK-06": return v.fxRate ? `pásalo a pesos con tipo de cambio ${v.fxRate}` : "pásalo a pesos";
    case "SK-07": return /no/.test(String(v.type || ""))
      ? `no venta, objeción ${v.objection || "dinero"}`
      : `vendí ${v.amount}, objeción ${v.objection || "dinero"}`;
    case "SK-09": return `mi meta es ${v.goal}`;
    case "SK-10": return `comisión de ${v.volume} al ${v.pct}%`;
    case "SK-11": return `ahorro de ${v.nights} noches a ${v.others} la noche contra ${v.club} del club por ${v.years} años`;
    case "SK-12": return `mantenimiento de ${v.yearlyCost} al año con ${v.inflation}% de inflación por ${v.years} años`;
    case "SK-13": return `quiero practicar la objeción de ${v.category || "tiempo"}`;
    case "SK-14": return `prepárame para ${v.profile}`;
    case "SK-16": return String(v.query || "").trim();
    case "SK-17": return `dar seguimiento a ${v.name} en ${v.days || 1} días${v.note ? `: ${v.note}` : ""}`;
    default: return INSTANT_SKILLS[id]?.phrase || "";
  }
}

function formDefaults(fields) {
  const values = {};
  fields.forEach((field) => { values[field.name] = fieldValue(field); });
  return values;
}

function quotePreview(id, v) {
  const price = parseAmount(v.price);
  const downPct = parseAmount(v.downPct);
  const months = parseAmount(v.months);
  const rate = parseAmount(v.rate);
  const ok = [price, downPct, months, rate].every((n) => Number.isFinite(n) && n >= 0) && months > 0 && downPct < 100;
  if (id === "SK-01" && ok) {
    const down = (price * downPct) / 100;
    const balance = price - down;
    const monthly = pmt(balance, rate, months);
    return { hero: usd(monthly), heroLabel: "Mensualidad", rows: [
      { label: "Enganche", text: usd(down) },
      { label: "Saldo", text: usd(balance) },
      { label: "Plazo y tasa", text: `${months} meses · ${rate}%` },
    ], note: "Ejemplo calculado con la plantilla." };
  }
  if (id === "SK-03") {
    const previous = parseAmount(v.previousValue);
    const cost = parseAmount(v.upgradeCost);
    const initialPct = parseAmount(v.initialPct);
    const term = parseAmount(v.months);
    const apr = parseAmount(v.rate);
    if ([previous, cost, initialPct, term, apr].every(Number.isFinite) && cost > 0 && term > 0 && initialPct < 100) {
      const initial = (cost * initialPct) / 100;
      const monthly = pmt(cost - initial, apr, term);
      return { hero: usd(monthly), heroLabel: "Mensualidad del upgrade", rows: [
        { label: "Nuevo valor", text: usd(previous + cost) },
        { label: "Pago de hoy", text: usd(initial) },
        { label: "Plazo y tasa", text: `${term} meses · ${apr}%` },
      ], note: "Sin saldo anterior. Ejemplo de la plantilla." };
    }
  }
  if (id === "SK-04") {
    const monthly = parseAmount(v.monthly);
    const term = parseAmount(v.months);
    const apr = parseAmount(v.rate);
    const pct = 30;
    if ([monthly, term, apr].every((n) => Number.isFinite(n) && n > 0)) {
      const balance = pv(monthly, apr, term);
      const value = balance / (1 - pct / 100);
      return { hero: usd(value), heroLabel: "Paquete sugerido", rows: [
        { label: "Mensualidad", text: usd(monthly) },
        { label: "Enganche 30%", text: usd(value * pct / 100) },
        { label: "Plazo y tasa", text: `${term} meses · ${apr}%` },
      ], note: "El 30% es el enganche de la sala de ejemplo." };
    }
  }
  if (id === "SK-05") {
    const todayPct = parseAmount(v.todayPct);
    const deferredPct = parseAmount(v.deferredPct);
    const deferredMonths = parseAmount(v.deferredMonths);
    const surcharge = parseAmount(v.surchargePct);
    if ([price, months, rate, todayPct, deferredPct, deferredMonths, surcharge].every(Number.isFinite) && months > 0 && deferredMonths > 0 && todayPct + deferredPct < 100) {
      const today = (price * todayPct) / 100;
      const deferred = (price * deferredPct) / 100;
      const balance = price - today - deferred;
      const deferredMonthly = (deferred * (1 + surcharge / 100)) / deferredMonths;
      return { hero: usd(pmt(balance, rate, months)), heroLabel: "Mensualidad del saldo", rows: [
        { label: "Hoy", text: usd(today) },
        { label: "Pago del diferido", text: usd(deferredMonthly) },
        { label: "Pagos del diferido", text: String(deferredMonths) },
      ], note: "El recargo es fijo sobre lo diferido." };
    }
  }
  if (id === "SK-10") {
    const volume = parseAmount(v.volume);
    const pct = parseAmount(v.pct);
    if (Number.isFinite(volume) && Number.isFinite(pct)) {
      return { hero: usd((volume * pct) / 100), heroLabel: "Estimación", rows: [
        { label: "Volumen", text: usd(volume) },
        { label: "Tu %", text: `${pct}%` },
      ], note: "Estimación personal. No es la nómina." };
    }
  }
  if (id === "SK-11") {
    const nights = parseAmount(v.nights);
    const years = parseAmount(v.years);
    const others = parseAmount(v.others);
    const club = parseAmount(v.club);
    if ([nights, years, others, club].every((n) => Number.isFinite(n) && n >= 0)) {
      const outside = nights * others * years;
      const inside = nights * club * years;
      return { hero: usd(outside - inside), heroLabel: "Ahorro en el periodo", rows: [
        { label: "Por su cuenta", text: usd(outside) },
        { label: "Con el club", text: usd(inside) },
      ], note: "Sin inflación. Ejemplo de la plantilla." };
    }
  }
  if (id === "SK-12") {
    const yearly = parseAmount(v.yearlyCost);
    const inflation = parseAmount(v.inflation);
    const years = parseAmount(v.years);
    if ([yearly, inflation, years].every(Number.isFinite) && years > 0) {
      const g = inflation / 100;
      const total = g === 0 ? yearly * years : (yearly * ((1 + g) ** years - 1)) / g;
      return { hero: usd(total), heroLabel: "Acumulado", rows: [
        { label: "Cuota anual", text: usd(yearly) },
        { label: "Años", text: String(years) },
      ], note: "La cuota crece con la inflación de la plantilla." };
    }
  }
  if (id === "SK-06") {
    const fx = parseAmount(v.fxRate);
    return { hero: Number.isFinite(fx) ? `${fx} MXN` : "—", heroLabel: "Por cada USD", rows: [], note: "Se aplica a la última cotización del chat." };
  }
  if (id === "SK-07") {
    const sale = !/no/.test(String(v.type || ""));
    return { hero: sale ? usd(parseAmount(v.amount)) : "No venta", heroLabel: sale ? "Venta" : "Registro", rows: [
      { label: "Objeción", text: v.objection || "dinero" },
    ], note: "Ejemplo. No es un tour real." };
  }
  if (id === "SK-09") return { hero: usd(parseAmount(v.goal)), heroLabel: "Meta del mes", rows: [], note: "Ejemplo de volumen." };
  if (id === "SK-13") return { hero: v.category || "tiempo", heroLabel: "Objeción", rows: [
    { label: "1", text: "Aislar" }, { label: "2", text: "Reencuadrar" }, { label: "3", text: "Cerrar" },
  ], note: "La respuesta va al manager." };
  if (id === "SK-17") return { hero: v.name || "Ana", heroLabel: `En ${v.days || 1} días`, rows: [
    { label: "Nota", text: v.note || "sin nota" },
  ], note: "Solo nombre de pila." };
  return null;
}

function previewMarkup(preview, phrase) {
  if (!preview) {
    return `<span class="kicker">Vista previa</span><p class="fine">Completa la plantilla para ver el resultado.</p><p class="phrase">Al Copiloto: ${esc(phrase)}</p>`;
  }
  const rows = (preview.rows || []).map((row) => `<dt>${esc(row.label)}</dt><dd>${esc(row.text)}</dd>`).join("");
  return `<span class="kicker">Vista previa</span>
    ${preview.hero ? `<div class="preview-hero">${esc(preview.hero)}</div><p class="fine">${esc(preview.heroLabel || "")}</p>` : ""}
    ${preview.body ? `<p>${esc(preview.body)}</p>` : ""}
    ${rows ? `<dl>${rows}</dl>` : ""}
    ${preview.note ? `<p class="fine">${esc(preview.note)}</p>` : ""}
    <p class="phrase">Al Copiloto: ${esc(phrase)}</p>`;
}

function templateFields(fields) {
  return `<div class="tpl-grid">${fields.map((field) => {
    const wide = field.wide ? " wide" : "";
    if (field.options) {
      const current = fieldValue(field);
      const opts = field.options.map((opt) => `<option value="${esc(opt.value)}" ${opt.value === current ? "selected" : ""}>${esc(opt.label)}</option>`).join("");
      return `<div class="field${wide}"><label>${esc(field.label)}</label><select data-field="${esc(field.name)}">${opts}</select></div>`;
    }
    return `<div class="field${wide}"><label>${esc(field.label)}</label><input data-field="${esc(field.name)}" value="${esc(fieldValue(field))}"></div>`;
  }).join("")}</div>`;
}

function templateScreen(title, kicker, hint, fields, previewHtml, extra = "") {
  return `<header class="taskbar"><button class="back" data-go="resources" type="button"><span class="material-symbols-outlined">chevron_left</span> Recursos</button><span class="pill">Plantilla</span></header>
    <div class="screen task">
      <span class="kicker">${esc(kicker)}</span>
      <h1 class="page-title">${esc(title)}</h1>
      <p class="fine" style="margin:6px 0 12px">${esc(hint)}</p>
      <form id="tpl">${fields ? `<section class="card">${fields}</section>` : ""}
        <section class="card preview-card" id="tpl-preview">${previewHtml}</section>
        <button class="btn gold" data-act="use-template" type="button" style="width:100%">Usar esta plantilla</button>
      </form>
      ${extra}
    </div>`;
}

function currentTemplate() {
  if (state.openKind === "lib") {
    const item = COPILOTO_LIBRARY.find((row) => row.id === state.openId) || COPILOTO_LIBRARY[0];
    const fields = [{ name: "query", label: "Pregunta", value: item.ask, wide: true }];
    return { title: item.title, kicker: item.id, hint: item.tags, fields, values: formDefaults(fields), phrase: item.ask, preview: { body: item.body, note: "Guion de la sala de ejemplo." } };
  }
  if (state.openKind === "practice") {
    const item = COPILOTO_PRACTICE.find((row) => row.id === state.openId) || COPILOTO_PRACTICE[0];
    return {
      title: item.title,
      kicker: "Práctica",
      hint: item.client,
      fields: [],
      values: {},
      phrase: `quiero practicar la objeción de ${item.id}`,
      preview: {
        hero: item.objection,
        heroLabel: "Objeción",
        rows: item.steps.map((step, index) => ({ label: ["Aislar", "Reencuadrar", "Cerrar"][index] || String(index + 1), text: step })),
        note: "La respuesta va al manager.",
      },
    };
  }
  const skill = COPILOTO_SKILLS.find((row) => row.id === state.openId) || COPILOTO_SKILLS[0];
  const form = SKILL_FORMS[skill.id];
  const instant = INSTANT_SKILLS[skill.id];
  const fields = form?.fields || [];
  const values = formDefaults(fields);
  const phrase = skillPhrase(skill.id, values);
  return {
    title: skill.name,
    kicker: `${skill.id} · ${RES_CATS[skill.category]} · ${skill.plan}`,
    hint: form?.hint || skill.description,
    fields,
    values,
    phrase,
    preview: quotePreview(skill.id, values) || (instant ? { body: instant.note, note: "Se ejecuta con la frase de abajo." } : null),
  };
}

function viewFicha() {
  const tpl = currentTemplate();
  const skill = state.openKind === "skill" ? COPILOTO_SKILLS.find((item) => item.id === state.openId) : null;
  const share = skill && skill.category === "cotizar" ? `
    <section class="card" style="margin-top:10px">
      <span class="kicker">Enviar al cliente por WhatsApp</span>
      <div class="duo">
        <div class="field"><label for="wa-phone">WhatsApp (opcional)</label><input id="wa-phone" inputmode="tel" placeholder="52 998 123 4567" autocomplete="off"></div>
        <div class="field"><label for="wa-lead">Lead # (opcional)</label><input id="wa-lead" placeholder="Lead #4920" autocomplete="off"></div>
      </div>
      <p class="fine">El número no se guarda; solo abre WhatsApp. Sin número, eliges el chat allá.</p>
      <div class="warn" id="wa-error" role="alert" hidden></div>
      <button class="btn line" data-act="wa-share" type="button" style="width:100%">Enviar por WhatsApp</button>
    </section>` : "";
  return templateScreen(tpl.title, tpl.kicker, tpl.hint, tpl.fields.length ? templateFields(tpl.fields) : "", previewMarkup(tpl.preview, tpl.phrase), share);
}

function readTemplateValues() {
  const tpl = currentTemplate();
  const values = { ...tpl.values };
  phone.querySelectorAll("#tpl [data-field]").forEach((el) => { values[el.dataset.field] = el.value; });
  return { ...tpl, values };
}

function paintTemplatePreview() {
  const box = phone.querySelector("#tpl-preview");
  if (!box) return;
  const tpl = readTemplateValues();
  let phrase = tpl.phrase;
  let preview = tpl.preview;
  if (state.openKind === "skill") {
    phrase = skillPhrase(state.openId, tpl.values);
    const sheet = quotePreview(state.openId, tpl.values);
    preview = sheet || preview;
  } else if (state.openKind === "lib") {
    phrase = String(tpl.values.query || "").trim();
  }
  box.innerHTML = previewMarkup(preview, phrase);
}

const PERF = {
  hoy: {
    label: "Noviembre 2026 · semana 45",
    tip: "Con 1 presentación más hoy llegas al 100% de la cuota diaria.",
    goal: 12000,
    close: "33.3%",
    closeNote: "+8.3 pp vs la meta de 25%",
    talksGoal: 4,
    talksNote: "1 para la tarde",
    commission: 1600,
    funnel: [[1, "Contactados", "12", 100], [2, "Calificados", "6", 50], [3, "Presentaciones", "3", 25], [4, "Cierres", "1 · $8,000", 8]],
  },
  semana: {
    label: "Semana 45 · lun a vie",
    tip: "Llevas $34,500 de $50,000. Jueves y viernes siguen en cero.",
    volume: 34500,
    goal: 50000,
    close: "29%",
    closeNote: "Sobre la meta de 25%",
    talks: 8,
    talksGoal: 12,
    talksNote: "4 tours listos",
    commission: 2100,
    funnel: [[1, "Contactados", "40", 100], [2, "Calificados", "18", 45], [3, "Presentaciones", "8", 20], [4, "Cierres", "2 · $34,500", 5]],
  },
  mes: {
    label: "Noviembre 2026 · Q4",
    tip: "El ritmo del mes proyecta $84,200 sobre una cuota de $80,000.",
    volume: 54400,
    goal: 80000,
    close: "33.4%",
    closeNote: "La meta de carrera es 30%",
    talks: 18,
    talksGoal: 24,
    talksNote: "6 para cerrar el mes",
    commission: 4800,
    funnel: [[1, "Contactados", "96", 100], [2, "Calificados", "42", 44], [3, "Presentaciones", "18", 19], [4, "Cierres", "6 · $54,400", 6]],
  },
};

function viewPerfil() {
  const range = state.perfilRange || "hoy";
  const pack = PERF[range];
  const volume = range === "hoy" ? state.volume : pack.volume;
  const talks = range === "hoy" ? state.presentations : pack.talks;
  const pct = Math.min(100, Math.round((volume / pack.goal) * 100));
  const talkPct = Math.round((talks / pack.talksGoal) * 100);
  const dots = [0, 1, 2, 3].map((i) => `<i class="${i < talks ? "on" : ""}"></i>`).join("");
  const ranges = [["hoy", "Hoy"], ["semana", "Esta semana"], ["mes", "Mes Q4"]];
  const accounts = range === "hoy" ? `
    <section class="card">
      <div class="row"><b>Cuentas de hoy</b><span class="fine">3 registros</span></div>
      <div class="acct"><div class="row"><strong>Lead #4920 · 09:30</strong><span class="pill on">Confirmado</span></div><span class="fine">Venta cerrada · ${money(state.volume)} USD</span></div>
      <div class="acct"><div class="row"><strong>Lead #302 · 11:30</strong><span class="pill">En curso</span></div><span class="fine">Presentación hecha · seguimiento 17:00</span></div>
      <div class="acct"><div class="row"><strong>Lead #188 · 15:30</strong><span class="pill">Pendiente</span></div><span class="fine">Visita de demostración · sala de ejemplo</span></div>
    </section>` : "";
  return shell(`
    <header class="topbar"><h1 class="brand">Perfil</h1><span class="pill">Sala de ejemplo</span></header>
    <div class="screen">
      <div class="row"><div><h1 class="page-title">Rendimiento</h1><p class="fine">${esc(pack.label)} · rep de sala, ejemplo</p></div></div>
      <div class="filters" role="tablist">
        ${ranges.map(([id, label]) => `<button class="chip-btn ${range === id ? "on" : ""}" data-act="range-${id}" type="button">${label}</button>`).join("")}
      </div>
      <section class="note"><span class="material-symbols-outlined">bolt</span><span><b>Acelerador del día</b><br>${esc(pack.tip)}</span></section>
      <div class="kpis">
        <section class="card"><div class="row"><span class="eyebrow">Volumen</span><span class="material-symbols-outlined">payments</span></div><b class="kpi">${money(volume)}</b><span class="fine">Meta ${money(pack.goal)} USD</span><div class="track"><span style="width:${pct}%"></span></div><div class="row fine"><span>${pct}%</span><span>Faltan ${money(Math.max(0, pack.goal - volume))}</span></div></section>
        <section class="card"><div class="row"><span class="eyebrow">Tasa de cierre</span><span class="material-symbols-outlined">pie_chart</span></div><b class="kpi">${esc(pack.close)}</b><span class="fine">${esc(pack.closeNote)}</span></section>
        <section class="card"><div class="row"><span class="eyebrow">Presentaciones</span><span class="material-symbols-outlined">forum</span></div><b class="kpi">${talks} / ${pack.talksGoal}</b><span class="fine">${esc(pack.talksNote)}</span><div class="dots">${dots}<em>${talkPct}%</em></div></section>
        <section class="card"><div class="row"><span class="eyebrow">Comisión</span><span class="material-symbols-outlined">monetization_on</span></div><b class="kpi">${money(pack.commission)}</b><span class="fine">Estimada · ejemplo</span></section>
      </div>
      <section class="card">
        <div class="row"><b>Embudo</b><span class="fine">${pack.funnel[0][2]} contactos</span></div>
        ${pack.funnel.map(([n, name, value, width]) => `<div class="funnel"><div class="row"><span><i>${n}</i> ${esc(name)}</span><b>${esc(value)}</b></div><div class="track"><span style="width:${width}%"></span></div></div>`).join("")}
      </section>
      <section class="card">
        <div class="row"><div><b>Ritmo de la semana</b><div class="fine">Lun a vie · meta ${money(50000)}</div></div><b>${money(34500)}</b></div>
        <div class="pace">
          ${[["$9k", 75, "Lun"], ["$11k", 90, "Mar"], ["$8k", 67, "Hoy", true], ["—", 0, "Jue"], ["—", 0, "Vie"]].map(([amt, h, day, today]) => `<div class="${today ? "today" : ""} ${h ? "" : "empty"}"><span>${amt}</span><i style="height:${h}%"></i><em>${day}</em></div>`).join("")}
        </div>
      </section>
      ${accounts}
      <button class="btn gold" data-go="presentacion" type="button" style="width:100%">Registrar presentación o venta</button>
      <button class="btn line" data-go="acceso" type="button" style="width:100%;margin-top:8px">Ver acceso</button>
    </div>
  `);
}

function viewAcceso() {
  return `${taskbar("Acceso", "perfil", "Sala", "Perfil")}
    <div class="screen task">
      <div class="head"><div><h1>Entrar</h1><p>Esta vista no pide cuenta ni contraseña.</p></div></div>
      <div class="field"><label>Sala</label><input value="Sala de ejemplo" readonly></div>
      <button class="btn gold" data-go="hoy" type="button" style="width:100%">Entrar al cuaderno</button>
    </div>`;
}

function viewPendientes() {
  const rows = [...state.priorities, ...state.extra].map((item) => ({ title: item.title, meta: `${item.when} · ${item.detail}` }));
  return viewList("Pendientes", rows, "tarea");
}

const views = {
  hoy: viewHoy,
  calendario: viewCalendario,
  atajos: viewAtajos,
  nota: viewNota,
  presentacion: viewPresentacion,
  preview: viewPreview,
  tarea: viewTarea,
  cierre: viewCierre,
  compartir: viewCompartir,
  metas: viewMetas,
  bloque: viewBloque,
  metricas: viewMetricas,
  goalsheet: viewGoalsheet,
  revision: viewRevision,
  historial: viewHistorial,
  notas: () => viewList("Notas", state.notes.map((note) => ({ title: note.title, meta: `${note.cat} · ${note.body}` })), "hoy"),
  presentaciones: () => viewList("Presentaciones", state.talks.map((talk) => ({ title: talk.ref, meta: `${talk.result} · ${talk.when} ${talk.amount}` })), "hoy"),
  coaching: viewCoaching,
  equipo: viewEquipo,
  roadmap: viewRoadmap,
  modulo: viewModulo,
  resources: viewResources,
  ficha: viewFicha,
  perfil: viewPerfil,
  acceso: viewAcceso,
  pendientes: viewPendientes,
};

function readDraftFromDom() {
  const title = phone.querySelector("#note-title");
  if (title) {
    state.draft.title = title.value;
    state.draft.body = phone.querySelector("#note-body").value;
    state.draft.cat = phone.querySelector("#note-cat").value;
    state.draft.makeTask = phone.querySelector("#note-task").checked;
  }
  const tourSelect = phone.querySelector("#res-tour");
  if (tourSelect) {
    const r = state.resultDraft;
    r.tourId = tourSelect.value;
    r.outcome = phone.querySelector("input[name=result]:checked")?.value || r.outcome;
    const read = (id) => phone.querySelector(id)?.value;
    r.currency = read("#res-currency") ?? r.currency;
    r.amount = read("#res-amount") ?? r.amount;
    r.objectionOther = read("#res-obj-other") ?? r.objectionOther;
    r.nextAction = read("#res-action") ?? r.nextAction;
    r.nextDate = read("#res-date") ?? r.nextDate;
    r.nextOwner = read("#res-owner") ?? r.nextOwner;
    r.failStep = read("#res-step") ?? r.failStep;
    r.note = read("#res-note") ?? r.note;
    const rec = phone.querySelector("input[name=recoverable]:checked")?.value;
    if (rec) r.recoverable = rec === "si";
  }
}

function render() {
  if (state.view === "coach") {
    const frame = coachFrameEl();
    frame.hidden = false;
    if (!phone.contains(frame)) phone.insertBefore(frame, sheets);
    sheets.innerHTML = shell("");
    return;
  }
  if (coachFrame) coachFrame.hidden = true;
  const draw = views[state.view] || viewHoy;
  const html = draw();
  sheets.innerHTML = html.includes('class="dock"') ? html : shell(html);
  phone.querySelectorAll("#q, #res-q").forEach((query) => {
    query.addEventListener("input", () => {
      const text = query.value.toLowerCase();
      phone.querySelectorAll("[data-hit]").forEach((row) => {
        row.hidden = text && !row.textContent.toLowerCase().includes(text);
      });
    });
  });
  const noteField = phone.querySelector("#res-note");
  if (noteField) {
    noteField.addEventListener("input", () => {
      const count = phone.querySelector("#note-count");
      if (count) count.textContent = `${noteField.value.length}/120`;
    });
  }
  const tpl = phone.querySelector("#tpl");
  if (tpl) {
    tpl.addEventListener("input", paintTemplatePreview);
    tpl.addEventListener("change", paintTemplatePreview);
  }
}

phone.addEventListener("click", (event) => {
  const goal = event.target.closest("[data-goal]");
  if (goal) return;
  const done = event.target.closest("[data-done]");
  if (done) {
    const item = state.priorities.find((row) => row.id === done.dataset.done);
    if (item) item.done = done.checked;
    return;
  }
  const task = event.target.closest("[data-task]");
  if (task) {
    state.taskId = task.dataset.task;
    go("tarea", "tarea");
    return;
  }
  const filter = event.target.closest("[data-filter]");
  if (filter) {
    state.resFilter = filter.dataset.filter;
    render();
    return;
  }
  const open = event.target.closest("[data-open]");
  if (open) {
    state.openKind = open.dataset.open;
    state.openId = open.dataset.id;
    go("ficha", "explorar");
    return;
  }
  const act = event.target.closest("[data-act]")?.dataset.act;
  if (act) {
    readDraftFromDom();
    run(act);
    return;
  }
  const dest = event.target.closest("[data-go]");
  if (!dest) return;
  readDraftFromDom();
  if (dest.dataset.go === "tarea" && !dest.dataset.task) state.taskId = "reminder";
  if (dest.dataset.go === "modulo" && dest.dataset.id) state.moduleId = Number(dest.dataset.id);
  if (dest.dataset.go === "coach" && ("q" in dest.dataset || "role" in dest.dataset)) {
    state.copilotoQuery = dest.dataset.q || "";
    state.copilotoRole = dest.dataset.role || "";
  }
  go(dest.dataset.go, dest.dataset.flow);
});

phone.addEventListener("change", (event) => {
  if (event.target.name === "result" || event.target.name === "recoverable") {
    readDraftFromDom();
    state.resultDraft.error = "";
    render();
    return;
  }
  if (event.target.id === "res-tour") {
    readDraftFromDom();
    prefillResultDraft(selectedTour());
    render();
  }
});

if (map) map.addEventListener("click", (event) => {
  const button = event.target.closest("[data-flow-start]");
  if (!button) return;
  state.taskId = button.dataset.flow === "tarea" ? "reminder" : state.taskId;
  go(button.dataset.flowStart, button.dataset.flow);
});

function run(act) {
  if (act.startsWith("me-")) {
    const id = act.slice(3);
    if (!roster.people.some((person) => person.id === id && person.role === "rep")) return;
    state.meId = id;
    try { sessionStorage.setItem("sa.app.rep", id); } catch { /* el modo privado no guarda */ }
    refreshTours();
    return;
  }
  if (act === "reload-tours") {
    refreshTours();
    return;
  }
  if (act === "cal-prev" || act === "cal-next") {
    state.calWeek = addDays(state.calWeek || "2026-11-02", act === "cal-prev" ? -7 : 7);
    state.calDate = state.calWeek;
    render();
    return;
  }
  if (act.startsWith("cal-")) {
    state.calDate = act.slice(4);
    render();
    return;
  }
  if (act === "edit-shortcuts") {
    state.editingShortcuts = !state.editingShortcuts;
    render();
    return;
  }
  if (act.startsWith("add-sc-") || act.startsWith("drop-sc-") || act.startsWith("up-sc-") || act.startsWith("down-sc-")) {
    const list = shortcuts().slice();
    if (act.startsWith("add-sc-")) {
      const id = act.slice(7);
      if (list.length < 6 && !list.includes(id) && shortcutById(id)) list.push(id);
    } else if (act.startsWith("drop-sc-")) {
      const id = act.slice(8);
      const index = list.indexOf(id);
      if (index >= 0) list.splice(index, 1);
    } else {
      const up = act.startsWith("up-sc-");
      const id = act.slice(up ? 6 : 8);
      const index = list.indexOf(id);
      const next = index + (up ? -1 : 1);
      if (index >= 0 && next >= 0 && next < list.length) {
        const swap = list[index];
        list[index] = list[next];
        list[next] = swap;
      }
    }
    writeShortcuts(list);
    render();
    return;
  }
  if (act === "wa-share") {
    const errBox = phone.querySelector("#wa-error");
    const fail = (msg) => { if (errBox) { errBox.hidden = false; errBox.textContent = msg; } };
    const lead = (phone.querySelector("#wa-lead")?.value || "").trim();
    if (lead && !/^Lead #\d{3,4}$/.test(lead)) { fail("Usa un Lead # de ejemplo, por ejemplo Lead #4920."); return; }
    const tpl = readTemplateValues();
    const preview = state.openKind === "skill" ? (quotePreview(state.openId, tpl.values) || tpl.preview) : tpl.preview;
    if (!preview || !preview.hero) { fail("Completa la plantilla para armar la propuesta."); return; }
    const url = waShareUrl(phone.querySelector("#wa-phone")?.value || "", previewMessage(tpl.title, preview));
    if (!url) { fail("El WhatsApp no es válido. Usa solo dígitos, con lada (8 a 15)."); return; }
    if (errBox) errBox.hidden = true;
    window.open(url, "_blank", "noopener");
    // La tarea interna nunca lleva el teléfono.
    state.priorities.unshift({
      id: `p${Date.now()}`,
      title: `Seguimiento WhatsApp${lead ? ` · ${lead}` : ""}`,
      when: "Mañana",
      detail: `${tpl.title} · ${preview.hero}${preview.heroLabel ? ` ${preview.heroLabel}` : ""}`,
      done: false,
      origin: "WhatsApp",
    });
    toast("WhatsApp abierto. Seguimiento agregado a Tus prioridades.");
    return;
  }
  if (act === "use-template") {
    const tpl = readTemplateValues();
    const phrase = state.openKind === "skill" ? skillPhrase(state.openId, tpl.values) : state.openKind === "lib" ? String(tpl.values.query || "").trim() : tpl.phrase;
    state.copilotoQuery = phrase;
    state.copilotoRole = state.openId === "SK-18" ? "manager" : "";
    go("coach");
    return;
  }
  if (act.startsWith("range-")) {
    state.perfilRange = act.slice(6);
    if (!PERF[state.perfilRange]) state.perfilRange = "hoy";
    render();
    return;
  }
  if (act === "how") {
    state.showHow = !state.showHow;
    render();
    return;
  }
  if (act === "complete-step") {
    const n = Number(state.moduleId);
    if (!state.doneSteps.includes(n)) state.doneSteps.push(n);
    toast("Paso listo", "modulo");
    return;
  }
  if (act === "snooze") {
    state.reminder.time = "11:45";
    toast("Pospuesto 15 min", state.view === "tarea" ? "hoy" : "hoy");
    return;
  }
  if (act === "call") {
    state.taskId = "reminder";
    go("tarea", "tarea");
    return;
  }
  if (act === "save-note") {
    const title = state.draft.title.trim() || "Nota sin título";
    state.notes.unshift({ title, body: state.draft.body.trim(), cat: state.draft.cat, when: "6 nov" });
    if (state.draft.makeTask) {
      state.priorities.unshift({
        id: `p${Date.now()}`,
        title,
        when: "Hoy",
        detail: state.draft.body.trim().slice(0, 80),
        done: false,
        origin: "Nota recién guardada",
      });
    }
    toast("Nota guardada", "hoy");
    return;
  }
  if (act.startsWith("open-result-")) {
    const id = act.slice(12);
    const visit = tours.visits.find((item) => item.id === id);
    if (visit && visit.repId === state.meId && visit.status !== "cancelado" && tourEnded(visit)) {
      prefillResultDraft(visit);
    }
    go("presentacion", "presentacion");
    return;
  }
  if (act.startsWith("obj-")) {
    state.resultDraft.objection = act.slice(4);
    state.resultDraft.error = "";
    render();
    return;
  }
  if (act === "refresh-result") {
    state.resultDraft.error = "";
    state.view = "presentacion";
    refreshTours();
    toast("Actualizado. Revisa el resultado vigente y vuelve a confirmar.", "presentacion");
    return;
  }
  if (act === "save-talk") {
    const error = validateResultDraft();
    if (error) {
      state.resultDraft.error = error;
      render();
      return;
    }
    state.resultDraft.error = "";
    go("preview", "presentacion");
    return;
  }
  if (act === "confirm-talk") {
    submitResult();
    return;
  }
  if (act === "done-task") {
    if (state.taskId === "reminder") state.reminder.done = true;
    const item = state.priorities.find((row) => row.id === state.taskId);
    if (item) item.done = true;
    toast("Tarea hecha", "hoy");
    return;
  }
  if (act === "close-private") {
    state.closed = true;
    toast("Cierre guardado solo para ti", "hoy");
    return;
  }
  if (act === "share") {
    state.closed = true;
    toast("Selección enviada al manager", "hoy");
    return;
  }
  if (act === "save-goals") {
    phone.querySelectorAll("[data-goal]").forEach((input) => {
      const item = state.priorities.find((row) => row.id === input.dataset.goal);
      if (item) item.title = input.value;
    });
    toast("Metas actualizadas", "hoy");
    return;
  }
  if (act === "save-block") {
    state.block = {
      start: phone.querySelector("#block-start").value,
      end: phone.querySelector("#block-end").value,
      title: phone.querySelector("#block-title").value,
      detail: "Bloque de tu agenda",
      mins: "30 min",
    };
    toast("Bloque agendado", "hoy");
  }
}

function validateResultDraft() {
  const r = state.resultDraft;
  const visit = selectedTour();
  if (!visit) return "Elige el tour.";
  if (r.outcome === "venta") {
    const amount = Number(String(r.amount).replace(/[^0-9.]/g, ""));
    if (!r.amount) return "Falta el volumen de la venta.";
    if (!Number.isFinite(amount) || amount <= 0 || amount > 1000000) return "El volumen no es válido.";
  } else if (r.outcome === "no_venta") {
    if (!r.objection) return "Elige la objeción principal.";
    if (r.objection === "otra" && !r.objectionOther.trim()) return "Describe la objeción (máximo 60).";
    if (r.recoverable !== true && r.recoverable !== false) return "Indica si se puede recuperar.";
    if (r.recoverable) {
      if (!r.nextAction || !r.nextDate || !r.nextOwner) return "Falta el siguiente paso.";
      if (r.nextDate < visit.date) return "La fecha del siguiente paso no puede ser anterior al tour.";
    }
  } else if (!Number(r.failStep)) {
    return "Elige el paso donde se cortó.";
  }
  return "";
}

async function submitResult() {
  const r = state.resultDraft;
  const visit = selectedTour();
  const error = validateResultDraft();
  if (error || !visit) {
    r.error = error || "Elige el tour.";
    state.view = "presentacion";
    render();
    return;
  }
  const body = { outcome: r.outcome, note: r.note.trim(), version: visit.result?.version || 0 };
  if (r.outcome === "venta") {
    body.currency = r.currency;
    body.amount = Number(String(r.amount).replace(/[^0-9.]/g, ""));
  } else if (r.outcome === "no_venta") {
    body.objection = r.objection;
    body.objectionOther = r.objection === "otra" ? r.objectionOther.trim() : "";
    body.recoverable = r.recoverable;
    if (r.recoverable) body.nextStep = { action: r.nextAction, date: r.nextDate, ownerId: r.nextOwner };
  } else {
    body.failStep = Number(r.failStep);
  }
  r.saving = true;
  r.error = "";
  render();
  try {
    const saved = await opsRequest(`/api/tours/${encodeURIComponent(visit.id)}/result`, {
      method: "PUT",
      actor: `rep:${state.meId}`,
      body,
    });
    r.saving = false;
    const result = saved.visit?.result;
    state.talks.unshift({
      ref: visit.lead,
      result: result ? resultLabel(result) : catalogLabel("outcomes", r.outcome),
      amount: "",
      when: visit.date.slice(8) + " nov",
    });
    prefillResultDraft(null);
    toast("Resultado guardado", "hoy");
    refreshTours({ quiet: true });
  } catch (requestError) {
    r.saving = false;
    r.error = requestError.message || "No se pudo guardar. Intenta de nuevo.";
    render();
  }
}

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") refreshTours({ quiet: true });
});
window.setInterval(() => {
  if (document.visibilityState !== "visible") return;
  if (state.view === "hoy" || state.view === "calendario") refreshTours({ quiet: true });
}, 15000);

render();
refreshRoster().then(() => refreshTours());
refreshCatalog();
