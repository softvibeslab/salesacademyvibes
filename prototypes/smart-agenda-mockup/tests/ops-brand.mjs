import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const css = readFileSync(path.join(ROOT, "ops/ops.css"), "utf8");
const js = readFileSync(path.join(ROOT, "ops/ops.js"), "utf8");
const apiJs = readFileSync(path.join(ROOT, "ops-api.js"), "utf8");
const html = readFileSync(path.join(ROOT, "ops/index.html"), "utf8");

assert.match(css, /--sa-night:\s*#101110/i, "noche de Descubre");
assert.match(css, /--sa-gold:\s*#d4b574/i, "oro champagne de Descubre");
assert.match(css, /--sa-paper:\s*#f4f1e9/i, "papel de Descubre");
assert.match(css, /scroll-snap-type:\s*x\s+mandatory/i, "columnas con snap en móvil");
assert.match(js, /brand-mark/, "marca SA en el tablero");
assert.match(js, /data-label/, "preview con etiquetas para móvil");
assert.match(js, /data-jump/, "pestañas rápidas de reps en móvil");
assert.match(css, /1024px/, "breakpoint tablet");
assert.match(css, /--md-shape-full:\s*999px/i, "tokens de forma Material Design 3");
assert.match(css, /--md-elevation-1:/i, "tokens de elevación Material Design 3");
assert.match(js, /md-segmented/, "segmented buttons Material Design 3");
assert.match(js, /md-field/, "text fields Material Design 3");
assert.match(js, /md-card/, "cards Material Design 3");
assert.match(js, /md-avatar/, "avatares Material Design 3 en reps");
assert.doesNotMatch(js, /whoAmI/, "/ops/ no depende de /api/me ni redirige al login");
assert.match(js, /data-role="\$\{id\}"/, "selector de rol directo en /ops/");
assert.match(js, /data-jefe="\$\{person\.id\}"/, "selector de jefe de sala directo en /ops/");
assert.match(apiJs, /X-Ops-Actor/, "ops-api envía X-Ops-Actor para que /ops/ opere sin login");
assert.doesNotMatch(html, /DM\+Sans/, "sin DM Sans de Material");

console.log("ops-brand ok");
