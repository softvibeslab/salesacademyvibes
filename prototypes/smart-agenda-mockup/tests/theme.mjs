// FTD fase1-temas — T01: preferencia de tema (sistema / claro / oscuro).
import assert from "node:assert/strict";
import { THEME_KEY, resolveTheme, readThemePref, writeThemePref } from "../theme.js";

const mem = () => { const m = new Map(); return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)) }; };

assert.equal(THEME_KEY, "sa.theme");
// Sistema sigue al sistema operativo
assert.equal(resolveTheme("system", true), "dark");
assert.equal(resolveTheme("system", false), "light");
// Elección explícita gana sobre el sistema
assert.equal(resolveTheme("light", true), "light");
assert.equal(resolveTheme("dark", false), "dark");
// Valor desconocido se trata como sistema
assert.equal(resolveTheme("morado", true), "dark");
// Lectura con respaldo y escritura validada
const s = mem();
assert.equal(readThemePref(s), "system", "sin preferencia guardada → sistema");
writeThemePref(s, "dark");
assert.equal(readThemePref(s), "dark");
writeThemePref(s, "rojo");
assert.equal(readThemePref(s), "dark", "un valor inválido no se guarda");
assert.equal(readThemePref({ getItem() { throw new Error("privado"); } }), "system", "storage bloqueado → sistema");

console.log("theme ok");
