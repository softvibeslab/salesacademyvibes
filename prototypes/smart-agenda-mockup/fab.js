// FAB de atajos de la app del rep (FTD fab-atajos-app). Geometría pura y acciones críticas.

export const FAB_SIZE = 56;
export const FAB_MARGIN = 8;

/** Atajos globales de la app. El dock se queda; esto es acceso a un toque desde cualquier vista. */
export const FAB_ACTIONS = [
  { id: "resultado", label: "Registrar resultado", icon: "co_present" },
  { id: "nota", label: "Nueva nota", icon: "edit_note" },
  { id: "bloque", label: "Nuevo bloque", icon: "schedule" },
  { id: "cotizar", label: "Cotizar membresía", icon: "calculate" },
  { id: "tablero", label: "Tablero de sala", icon: "grid_view" },
];

/* Contrato sa:fab con el Copiloto embebido: en la pestaña Copiloto, el FAB de la
   app manda postMessage({ type: FAB_MSG_TYPE, id }) al iframe (mismo origen) y el
   agente lo ejecuta; el agente responde { type: 'sa:fab-state', tab }. */
export const FAB_MSG_TYPE = "sa:fab";

const RESULTADO = { id: "resultado", label: "Registrar resultado", icon: "co_present" };
const TABLERO = { id: "tablero", label: "Tablero de sala", icon: "grid_view" };

const COACH_MENU = [
  { id: "nav-hoy", label: "Chat", nav: true },
  { id: "nav-catalogo", label: "Catálogo", nav: true },
  { id: "nav-mes", label: "Mi mes", nav: true },
  { sep: true },
  { id: "tour", label: "Programar tour", icon: "event" },
  { id: "venta", label: "Registrar venta", icon: "check_circle" },
  { id: "no-venta", label: "Registrar no venta", icon: "cancel" },
  { id: "cotizar-cop", label: "Cotizar membresía", icon: "calculate" },
  { id: "como-voy", label: "¿Cómo voy?", icon: "insights" },
];

const MENUS = {
  hoy: FAB_ACTIONS,
  calendario: [RESULTADO, { id: "reload", label: "Actualizar tours", icon: "refresh" }, TABLERO],
  roadmap: [
    { id: "paso", label: "Continuar paso actual", icon: "timeline" },
    { id: "practicar", label: "Practicar en el Copiloto", icon: "forum" },
  ],
  modulo: [
    { id: "ejecutar-paso", label: "Ejecutar paso en el Copiloto", icon: "smart_toy" },
    { id: "paso-listo", label: "Marcar paso como listo", icon: "check_circle" },
  ],
  resources: [
    { id: "cotizar", label: "Cotizar membresía", icon: "calculate" },
    { id: "biblioteca", label: "Buscar en biblioteca", icon: "menu_book" },
  ],
  perfil: [RESULTADO, { id: "meta", label: "Meta del mes", icon: "flag" }],
  coach: COACH_MENU,
};

/** Menú del FAB según la vista. `flags.share`: la ficha abierta es de Cotizar. */
export function resolveFabMenu(view, flags = {}) {
  if (view === "ficha") {
    const menu = [{ id: "usar-plantilla", label: "Usar esta plantilla", icon: "bolt" }];
    if (flags.share) menu.push({ id: "whatsapp", label: "Enviar por WhatsApp", icon: "send" });
    return menu;
  }
  return MENUS[view] || MENUS.hoy;
}

/** Acota la posición del FAB a la pantalla del teléfono. */
export function clampFab(x, y, vw, vh, size = FAB_SIZE, margin = FAB_MARGIN) {
  const clamp = (v, max) => Math.min(Math.max(v, margin), Math.max(margin, max - size - margin));
  return { x: clamp(x, vw), y: clamp(y, vh) };
}

/** Un toque es poco movimiento y poco tiempo; lo demás es arrastre o presión larga. */
export function isTap(dx, dy, ms, slop = 6, maxMs = 400) {
  return Math.abs(dx) <= slop && Math.abs(dy) <= slop && ms <= maxMs;
}
