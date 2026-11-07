// FAB de atajos de la app del rep (FTD fab-atajos-app). Geometría pura y acciones críticas.

export const FAB_SIZE = 56;
export const FAB_MARGIN = 8;

/** Atajos críticos de la app. El dock se queda; esto es acceso a un toque desde cualquier vista. */
export const FAB_ACTIONS = [
  { id: "resultado", label: "Registrar resultado", icon: "co_present" },
  { id: "nota", label: "Nueva nota", icon: "edit_note" },
  { id: "cotizar", label: "Cotizar membresía", icon: "calculate" },
  { id: "bloque", label: "Nuevo bloque", icon: "schedule" },
  { id: "tablero", label: "Tablero de sala", icon: "grid_view" },
];

/** Acota la posición del FAB a la pantalla del teléfono. */
export function clampFab(x, y, vw, vh, size = FAB_SIZE, margin = FAB_MARGIN) {
  const clamp = (v, max) => Math.min(Math.max(v, margin), Math.max(margin, max - size - margin));
  return { x: clamp(x, vw), y: clamp(y, vh) };
}

/** Un toque es poco movimiento y poco tiempo; lo demás es arrastre o presión larga. */
export function isTap(dx, dy, ms, slop = 6, maxMs = 400) {
  return Math.abs(dx) <= slop && Math.abs(dy) <= slop && ms <= maxMs;
}
