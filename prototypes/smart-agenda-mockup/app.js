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
  { id: "roadmap", icon: "timeline", label: "Roadmap" },
  { id: "hoy", icon: "menu_book", label: "Agenda" },
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
  horizon: "trimestre",
  toast: "",
  presentations: 3,
  closes: 1,
  volume: 8000,
  notes: [
    { title: "Nota #12", body: "Demo con equipo de compras.", cat: "Seguimiento", when: "6 nov" },
    { title: "Descubrimiento", body: "Confirmar la necesidad antes de presentar una solución.", cat: "Entrenamiento", when: "6 nov" },
  ],
  talks: [
    { ref: "Lead #302", result: "Seguimiento", amount: "", when: "5 nov" },
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
  taskId: "reminder",
  draft: {
    title: "",
    body: "Confirmar la necesidad antes de presentar una solución.",
    cat: "Entrenamiento",
    makeTask: false,
    result: "venta",
    amount: "8000",
    currency: "USD",
    status: "procesable",
    down: "20%",
    commission: "1600",
    tour: "Q",
    ref: "Lead #4920 - Salón Norte",
    note: "",
  },
};

const phone = document.getElementById("phone");
const sheets = document.createElement("div");
sheets.id = "sheets";
phone.append(sheets);
const map = document.getElementById("map");

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
  render();
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
  notas: "hoy", presentaciones: "hoy", pendientes: "hoy", coaching: "hoy", equipo: "hoy",
  roadmap: "roadmap", habilidad: "roadmap", coach: "coach", resources: "resources", ficha: "resources", perfil: "perfil", acceso: "perfil",
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

function taskbar(title, back, badge, label = "Agenda") {
  return `<header class="taskbar">
    <button class="back" data-go="${back}" type="button"><span class="material-symbols-outlined">chevron_left</span> ${esc(label)}</button>
    <h1>${esc(title)}</h1>
    <span class="pill">${esc(badge)}</span>
  </header>`;
}

function viewHoy() {
  const presPct = Math.round((state.presentations / 4) * 100);
  const closePct = Math.round((state.closes / 2) * 100);
  const items = state.priorities.map((item) => `
    <div class="item">
      <input class="check" data-done="${item.id}" type="checkbox" ${item.done ? "checked" : ""} aria-label="Marcar ${esc(item.title)}">
      <button data-task="${item.id}" type="button" style="flex:1;text-align:left;background:none;border:0;padding:0">
        <strong style="${item.done ? "text-decoration:line-through" : ""}">${esc(item.title)} <span class="time">${esc(item.when)}</span></strong>
        <span class="meta">${esc(item.detail)}</span>
      </button>
      <span class="material-symbols-outlined" style="color:#7e7666">chevron_right</span>
    </div>`).join("");
  const reminder = state.reminder.done ? "" : `
    <section class="alert">
      <div class="row-between">
        <span class="kicker"><span class="material-symbols-outlined">notifications_active</span> Recordatorio crítico</span>
        <span class="fine">${esc(state.reminder.time)}</span>
      </div>
      <p class="fine" style="margin:0;color:var(--ink)">${esc(state.reminder.text)}</p>
      <div class="actions">
        <button class="chip-btn" data-act="snooze" type="button">Posponer 15m</button>
        <button class="chip-btn gold" data-act="call" type="button"><span class="material-symbols-outlined">call</span> Iniciar</button>
      </div>
    </section>`;
  return shell(`
    <header class="topbar">
      <div class="brand"><span class="avatar">SA</span> Sales Academy</div>
      <button class="icon-btn" data-go="revision" type="button" aria-label="Calendario"><span class="material-symbols-outlined">calendar_today</span></button>
    </header>
    <div class="screen">
      <div class="head">
        <div><h1>Hoy</h1><p>Viernes 6 de noviembre</p></div>
        <button class="datechip" data-go="revision" type="button">Nov 06</button>
      </div>
      <div class="stack">
        <button class="btn gold" data-go="nota" data-flow="nota" type="button"><span class="material-symbols-outlined">edit_note</span> Nueva nota</button>
        <button class="btn line" data-go="presentacion" data-flow="presentacion" type="button"><span class="material-symbols-outlined">co_present</span> Registrar presentación</button>
      </div>
      <section class="card" style="margin-top:16px">
        <div class="row-between">
          <span class="kicker"><span class="material-symbols-outlined">monitoring</span> Avance del día</span>
          <span class="badge">${state.closed ? "Jornada cerrada" : state.volume >= 12000 ? "Por encima de la meta" : "Ritmo óptimo · 83% cuota"}</span>
        </div>
        <div class="metrics">
          <div><div class="row-between fine"><span>Presentaciones</span><b>${state.presentations}/4</b></div><div class="track"><span style="width:${presPct}%"></span></div></div>
          <div><div class="row-between fine"><span>Cierres</span><b>${state.closes}/2</b></div><div class="track"><span style="width:${closePct}%"></span></div></div>
        </div>
        <div class="row-between" style="margin-top:10px">
          <span class="fine">Volumen meta: <b style="color:var(--ink)">${money(state.volume)} / $12,000 USD</b></span>
          <button class="linkish" data-go="metricas" data-flow="mes" type="button">Ver métricas</button>
        </div>
      </section>
      <div style="height:12px"></div>
      ${reminder}
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
          <h2 class="section-title">Próximo bloque</h2>
          <button class="linkish" data-go="bloque" data-flow="bloque" type="button">+ Añadir bloque</button>
        </div>
        <button class="card block" data-go="coaching" data-flow="equipo" type="button" style="width:100%;margin-top:8px">
          <span style="display:flex;gap:10px;align-items:center;text-align:left">
            <span class="clock">${esc(state.block.start)}<small>${esc(state.block.end)}</small></span>
            <span><strong style="display:block">${esc(state.block.title)}</strong><span class="meta">${esc(state.block.detail)}</span></span>
          </span>
          <span class="badge">${esc(state.block.mins)}</span>
        </button>
      </section>
      <div class="duo" style="margin-top:14px">
        <button class="card block" data-go="notas" type="button"><span class="kicker"><span class="material-symbols-outlined">description</span> Notas (${state.notes.length})</span></button>
        <button class="card block" data-go="presentaciones" type="button"><span class="kicker"><span class="material-symbols-outlined">record_voice_over</span> Presentaciones (${state.talks.length})</span></button>
      </div>
      <section style="margin-top:22px;text-align:center">
        <button class="btn ghost" data-go="cierre" data-flow="cierre" type="button" style="width:100%" ${state.closed ? "disabled" : ""}>
          <span class="material-symbols-outlined">task_alt</span> ${state.closed ? "Jornada cerrada" : "Cerrar jornada"}
        </button>
        <p class="fine"><span class="material-symbols-outlined" style="font-size:14px">lock</span> El cierre es personal</p>
      </section>
    </div>`);
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

function viewPresentacion() {
  const d = state.draft;
  const result = (value, label) => `<label><input name="result" type="radio" value="${value}" ${d.result === value ? "checked" : ""}><span>${label}</span></label>`;
  const tour = (value) => `<label><input name="tour" type="radio" value="${value}" ${d.tour === value ? "checked" : ""}><span>${value === "unclassified" ? "Sin clasif." : value}</span></label>`;
  return `${taskbar("Registrar presentación", "hoy", "Registro")}
    <div class="screen task">
      <p class="note">Agenda de hoy: 6 nov 2026 · Turno matutino</p>
      <div class="field"><label>Resultado obtenido</label><div class="seg">${result("venta", "Venta")}${result("no_venta", "No venta")}${result("seguimiento", "Seguimiento")}</div></div>
      <section class="card paper" id="sale-box" ${d.result === "venta" ? "" : "hidden"}>
        <h2 class="section-title">Detalle de la venta</h2>
        <div class="duo">
          <div class="field"><label for="sale-currency">Divisa</label><select id="sale-currency"><option ${d.currency === "USD" ? "selected" : ""}>USD</option><option ${d.currency === "MXN" ? "selected" : ""}>MXN</option></select></div>
          <div class="field"><label for="sale-amount">Volumen</label><input id="sale-amount" value="${esc(d.amount)}"></div>
        </div>
        <div class="duo">
          <div class="field"><label for="sale-down">Enganche</label><input id="sale-down" value="${esc(d.down)}"></div>
          <div class="field"><label for="sale-commission">Comisión manual</label><input id="sale-commission" value="${esc(d.commission)}"></div>
        </div>
      </section>
      <h2 class="section-title" style="margin:14px 0 8px">Datos del tour</h2>
      <div class="field"><label>Tipo de prospecto</label><div class="types">${["unclassified", "Q", "CT", "NQ"].map(tour).join("")}</div></div>
      <div class="field"><label for="sale-ref">Referencia</label><input id="sale-ref" value="${esc(d.ref)}"></div>
      <div class="field"><label for="sale-note">Motivo u objeción</label><textarea id="sale-note" style="min-height:72px">${esc(d.note)}</textarea></div>
      <div class="footer-actions">
        <button class="btn gold" data-act="save-talk" type="button" style="width:100%">Guardar resultado</button>
        <button class="btn text" data-go="hoy" type="button" style="width:100%">Cancelar</button>
      </div>
    </div>`;
}

function viewPreview() {
  const d = state.draft;
  const label = { venta: "Venta", no_venta: "No venta", seguimiento: "Seguimiento" }[d.result];
  return `${taskbar("Vista previa", "presentacion", "Confirmar", "Registro")}
    <div class="screen task">
      <section class="card paper">
        <p class="fine">Así queda el registro. Todavía no entra a la agenda.</p>
        <h2 class="section-title" style="margin-top:8px">${esc(label)}</h2>
        <p>${esc(d.ref)}</p>
        ${d.result === "venta" ? `<p><b>${esc(d.currency)} ${esc(Number(d.amount).toLocaleString("en-US"))}</b> · enganche ${esc(d.down)} · comisión ${esc(d.currency)} ${esc(Number(d.commission).toLocaleString("en-US"))}</p>` : ""}
        <p class="fine">Tour ${esc(d.tour)} · 6 nov 2026${d.note ? ` · ${esc(d.note)}` : ""}</p>
      </section>
      <p class="note"><span class="material-symbols-outlined">event</span> Después de confirmar se agenda el siguiente paso de mañana.</p>
      <div class="footer-actions">
        <button class="btn gold" data-act="confirm-talk" type="button" style="width:100%">Confirmar registro</button>
        <button class="btn text" data-go="presentacion" type="button" style="width:100%">Volver a editar</button>
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

function viewSimple(title, body, back = null, backLabel = "Agenda") {
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

function viewRoadmap() {
  const horizon = state.horizon || "trimestre";
  const quota = `<section class="card">
      <div class="row"><div><div class="eyebrow">Cuota de ventas Q4</div><div class="money">${money(54400)} <span class="fine">/ ${money(80000)} USD</span></div></div><span class="pill on">68%</span></div>
      <div class="track"><span style="width:68%"></span></div>
      <div class="row fine"><span>$0</span><span>Ritmo proyectado: ${money(84200)} USD</span><span>$80k</span></div>
      <div class="pair">
        <div><span class="eyebrow">Cierre estimado</span><b>105.2%</b><span class="fine">Sobre el plan objetivo</span></div>
        <div><span class="eyebrow">Bono de escala</span><b>+${money(3200)}</b><span class="fine">En umbral de 100%</span></div>
      </div>
    </section>`;
  const career = `<section class="card">
      <div class="row"><div><div class="eyebrow">Nivel de carrera</div><b>Ejecutivo Senior</b></div><span class="fine">Siguiente: Master</span></div>
      <div class="row fine"><span>Requisitos de acreditación</span><span>3 de 4</span></div>
      <div class="req done"><span class="material-symbols-outlined fill">check_circle</span><span>Volumen acumulado ($150k+)</span><em>Cumplido</em></div>
      <div class="req done"><span class="material-symbols-outlined fill">check_circle</span><span>Tasa de cierre superior al 30%</span><em>33.4%</em></div>
      <div class="req done"><span class="material-symbols-outlined fill">check_circle</span><span>15 horas de coaching</span><em>15/15 h</em></div>
      <button class="req" data-go="habilidad" type="button"><span class="material-symbols-outlined">radio_button_unchecked</span><span>Caso de estudio B2B</span><em>En revisión</em></button>
    </section>`;
  const week = `<section class="card">
      <div class="eyebrow">Semana 42 · 14 al 18 oct</div>
      <b>Metas semanales</b>
      <div class="trio">
        <div><b>12</b><span>Tours</span><em>8 listos</em></div>
        <div><b>4</b><span>Cierres</span><em>2 firmados</em></div>
        <div><b>$1.8k</b><span>Comisión est.</span><em>+$920</em></div>
      </div>
    </section>`;
  const tactics = `<section class="card">
      <div class="row"><b>Tácticas recomendadas</b><span class="fine">Desbloqueo de cuota</span></div>
      <button class="tactic" data-go="historial" type="button"><span class="material-symbols-outlined">verified</span><span><strong>Reactivar prospectos fríos</strong><em>4 cuentas evaluaron propuesta hace más de 12 días.</em></span></button>
      <button class="tactic" data-go="habilidad" type="button"><span class="material-symbols-outlined">workspace_premium</span><span><strong>Caso B2B con métricas</strong><em>Negociación y cierre. 4 módulos, 45 min.</em></span></button>
    </section>`;
  const order = horizon === "mes" ? [week, quota, tactics] : horizon === "carrera" ? [career, quota, tactics] : [quota, career, week, tactics];
  return shell(`
    <header class="topbar"><h1 class="brand">Roadmap</h1><button class="icon-btn" data-go="perfil" type="button" aria-label="Perfil"><span class="material-symbols-outlined">person</span></button></header>
    <div class="screen">
      <div class="row" style="margin-bottom:10px"><div><span class="pill">Q4 2026</span> <span class="fine">Ruta comercial · ejemplo</span></div><span class="fine">18 días hábiles</span></div>
      <div class="filters" role="tablist">
        ${[["mes", "Mes"], ["trimestre", "Trimestre"], ["carrera", "Nivel carrera"]].map(([id, label]) => `<button class="chip-btn ${horizon === id ? "on" : ""}" data-act="horizon-${id}" type="button">${label}</button>`).join("")}
      </div>
      ${order.join("")}
      <button class="btn gold" data-go="presentacion" type="button" style="width:100%;margin-top:4px">Registrar avance o cierre</button>
    </div>
  `);
}

function viewHabilidad() {
  const modules = [
    ["1", "Desarme del factor precio", "12 min", "Separa la cifra del valor con una pregunta condicional."],
    ["2", "Reencuadre de plazos", "15 min", "Objeción de flujo de caja sin ceder la tarifa base."],
    ["3", "Práctica en el Copiloto", "10 min", "Aislar, reencuadrar y cerrar la objeción de dinero."],
    ["4", "Cierre y firma", "8 min", "Confirmación en dos tiempos antes de salir de la sala."],
  ];
  return `${taskbar("Negociación B2B", "roadmap", "Sala", "Roadmap")}
    <div class="screen task">
      <div class="head"><div><h1>Negociación y cierre B2B</h1><p>Playbook de la sala · recomendado para la cuota del Q4.</p></div></div>
      <div class="trio">
        <div><b>45 min</b><span>Lectura</span></div>
        <div><b>4</b><span>Módulos</span></div>
        <div><b>Senior</b><span>Nivel</span></div>
      </div>
      <section class="card" style="margin-top:12px"><b>Plan</b>
        ${modules.map(([n, title, time, body]) => `<div class="req"><span class="num">${n}</span><span><strong>${esc(title)}</strong><em>${esc(body)}</em></span><em>${esc(time)}</em></div>`).join("")}
      </section>
      <button class="btn gold" data-go="coach" data-q="quiero practicar la objeción de dinero" type="button" style="width:100%;margin-top:12px">Practicarlo en el Copiloto</button>
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
    <div class="head"><div><h1>Recursos</h1><p>Elige una ficha y úsala en el Copiloto.</p></div></div>
    <button class="btn line" data-go="coach" type="button" style="width:100%;margin-bottom:12px">Abrir el chat</button>
    <div class="filters">${chips}</div>
    <input class="search" id="res-q" placeholder="Buscar" value="">
    ${skillCards ? `<h2 class="section-title" style="margin:4px 0 8px">Habilidades</h2>${skillCards}` : ""}
    ${libraryCards ? `<h2 class="section-title" style="margin:12px 0 8px">Biblioteca de la sala</h2>${libraryCards}` : ""}
    ${practiceCards ? `<h2 class="section-title" style="margin:12px 0 8px">Prácticas de objeción</h2>${practiceCards}` : ""}
  `);
}

function viewFicha() {
  if (state.openKind === "lib") {
    const item = COPILOTO_LIBRARY.find((row) => row.id === state.openId) || COPILOTO_LIBRARY[0];
    return viewSimple("Biblioteca", `
      <div class="head"><div><h1>${esc(item.title)}</h1><p>${esc(item.tags)}</p></div></div>
      <section class="card paper"><p>${esc(item.body)}</p><p class="fine">Biblioteca de la sala · ${esc(item.id)} · SK-16</p></section>
      <button class="btn gold" data-go="coach" data-q="${esc(item.ask)}" type="button" style="width:100%;margin-top:12px">Preguntarlo al Copiloto</button>
      <button class="btn line" data-go="resources" type="button" style="width:100%;margin-top:8px">Volver a Recursos</button>
    `, "resources", "Recursos");
  }
  if (state.openKind === "practice") {
    const item = COPILOTO_PRACTICE.find((row) => row.id === state.openId) || COPILOTO_PRACTICE[0];
    return viewSimple("Práctica", `
      <div class="head"><div><h1>${esc(item.title)}</h1><p>${esc(item.client)}</p></div></div>
      <section class="card paper"><p><b>Objeción.</b> ${esc(item.objection)}</p><ol>${item.steps.map((step) => `<li>${esc(step)}</li>`).join("")}</ol><p class="fine">La respuesta correcta va al manager. Tres errores cierran la práctica.</p></section>
      <button class="btn gold" data-go="coach" data-q="quiero practicar la objeción de ${esc(item.id)}" type="button" style="width:100%;margin-top:12px">Practicarlo en el Copiloto</button>
      <button class="btn line" data-go="resources" type="button" style="width:100%;margin-top:8px">Volver a Recursos</button>
    `, "resources", "Recursos");
  }
  const skill = COPILOTO_SKILLS.find((row) => row.id === state.openId) || COPILOTO_SKILLS[0];
  const extra = skill.id === "SK-13"
    ? `<p class="fine">Objeciones de la sala: dinero, pareja, tiempo y escepticismo. Cada una se practica en aislar, reencuadrar y cerrar.</p>`
    : skill.id === "SK-18" ? `<p class="fine">Solo manager y admin.</p>` : "";
  return viewSimple(skill.name, `
    <div class="head"><div><h1>${esc(skill.name)}</h1><p>${esc(RES_CATS[skill.category])} · ${esc(skill.plan)}</p></div></div>
    <section class="card paper"><p>${esc(skill.description)}</p>${extra}<p class="fine">Frase de ejemplo: ${esc(skill.example)}</p></section>
    <button class="btn gold" data-go="coach" data-q="${esc(skill.example)}" ${skill.id === "SK-18" ? 'data-role="manager"' : ""} type="button" style="width:100%;margin-top:12px">Usarlo en el Copiloto</button>
    <button class="btn line" data-go="resources" type="button" style="width:100%;margin-top:8px">Volver a Recursos</button>
  `, "resources", "Recursos");
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
    <header class="topbar"><h1 class="brand">Perfil</h1><button class="icon-btn" data-go="acceso" type="button" aria-label="Acceso"><span class="material-symbols-outlined">calendar_today</span></button></header>
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
  habilidad: viewHabilidad,
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
  const amount = phone.querySelector("#sale-amount");
  if (amount) {
    state.draft.result = phone.querySelector("input[name=result]:checked")?.value || "venta";
    state.draft.amount = amount.value;
    state.draft.currency = phone.querySelector("#sale-currency").value;
    state.draft.down = phone.querySelector("#sale-down").value;
    state.draft.commission = phone.querySelector("#sale-commission").value;
    state.draft.tour = phone.querySelector("input[name=tour]:checked")?.value || "Q";
    state.draft.ref = phone.querySelector("#sale-ref").value;
    state.draft.note = phone.querySelector("#sale-note").value;
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
  if (dest.dataset.go === "coach" && ("q" in dest.dataset || "role" in dest.dataset)) {
    state.copilotoQuery = dest.dataset.q || "";
    state.copilotoRole = dest.dataset.role || "";
  }
  go(dest.dataset.go, dest.dataset.flow);
});

phone.addEventListener("change", (event) => {
  if (event.target.name === "result") {
    state.draft.result = event.target.value;
    const box = phone.querySelector("#sale-box");
    if (box) box.hidden = event.target.value !== "venta";
  }
});

if (map) map.addEventListener("click", (event) => {
  const button = event.target.closest("[data-flow-start]");
  if (!button) return;
  state.taskId = button.dataset.flow === "tarea" ? "reminder" : state.taskId;
  go(button.dataset.flowStart, button.dataset.flow);
});

function run(act) {
  if (act.startsWith("range-")) {
    state.perfilRange = act.slice(6);
    if (!PERF[state.perfilRange]) state.perfilRange = "hoy";
    render();
    return;
  }
  if (act.startsWith("horizon-")) {
    state.horizon = act.slice(8);
    render();
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
  if (act === "save-talk") {
    go("preview", "presentacion");
    return;
  }
  if (act === "confirm-talk") {
    const d = state.draft;
    const amount = Number(String(d.amount).replace(/[^0-9.]/g, "")) || 0;
    state.talks.unshift({
      ref: d.ref || "Tour sin referencia",
      result: { venta: "Venta", no_venta: "No venta", seguimiento: "Seguimiento" }[d.result],
      amount: d.result === "venta" ? `${d.currency} ${amount.toLocaleString("en-US")}` : "",
      when: "6 nov",
    });
    state.presentations += 1;
    if (d.result === "venta") {
      state.closes += 1;
      state.volume += amount;
    }
    toast("Registro confirmado", "hoy");
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

render();
