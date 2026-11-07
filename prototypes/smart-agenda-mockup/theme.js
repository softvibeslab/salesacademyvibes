// Tema claro / oscuro (FTD fase1-temas). Por defecto sigue al sistema (decisión del PO 2026-11-07).
// Una sola clave para app, tablero y Copiloto (mismo origen).
export const THEME_KEY = "sa.theme";
export const THEME_PREFS = ["system", "light", "dark"];

export function resolveTheme(pref, systemDark) {
  if (pref === "light" || pref === "dark") return pref;
  return systemDark ? "dark" : "light";
}

export function readThemePref(storage) {
  try {
    const value = storage.getItem(THEME_KEY);
    return THEME_PREFS.includes(value) ? value : "system";
  } catch {
    return "system";
  }
}

export function writeThemePref(storage, pref) {
  if (!THEME_PREFS.includes(pref)) return;
  try { storage.setItem(THEME_KEY, pref); } catch { /* el modo privado no guarda */ }
}

/** Aplica el tema al documento y avisa a quien escuche (iframes del Copiloto). */
export function applyTheme(doc = document, win = window, storage = win.localStorage) {
  const pref = readThemePref(storage);
  const dark = win.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  const theme = resolveTheme(pref, dark);
  doc.documentElement.dataset.theme = theme;
  doc.documentElement.style.colorScheme = theme;
  return { pref, theme };
}

/** Engancha el cambio del sistema operativo cuando la preferencia es «sistema». */
export function watchSystemTheme(onChange, win = window) {
  const mq = win.matchMedia?.("(prefers-color-scheme: dark)");
  mq?.addEventListener?.("change", onChange);
}
