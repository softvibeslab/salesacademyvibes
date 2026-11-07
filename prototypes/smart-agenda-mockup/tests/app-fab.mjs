// FTD fab-atajos-app — T01: FAB de atajos de la app del rep.
import assert from "node:assert/strict";
import { clampFab, isTap, FAB_ACTIONS, resolveFabMenu } from "../fab.js";

// Geometría: siempre dentro de la pantalla (size 56, margen 8)
assert.deepEqual(clampFab(-40, -40, 390, 700), { x: 8, y: 8 });
assert.deepEqual(clampFab(5000, 5000, 390, 700), { x: 390 - 56 - 8, y: 700 - 56 - 8 });
assert.deepEqual(clampFab(120, 300, 390, 700), { x: 120, y: 300 });
// Zona segura inferior (p. ej. el compositor del Copiloto embebido)
assert.deepEqual(clampFab(120, 5000, 390, 844, 56, 8, 150), { x: 120, y: 844 - 56 - 8 - 150 });

// Toque vs arrastre
assert.equal(isTap(2, 3, 150), true);
assert.equal(isTap(40, 0, 150), false);
assert.equal(isTap(0, 0, 900), false);

// Atajos críticos de la app: registrar resultado, nueva nota, cotizar, bloque y tablero
const ids = FAB_ACTIONS.map((a) => a.id);
for (const id of ["resultado", "nota", "cotizar", "bloque", "tablero"]) {
  assert.ok(ids.includes(id), `falta el atajo ${id}`);
}
for (const a of FAB_ACTIONS) assert.ok(a.id && a.label, `${a.id || "?"} sin id o label`);

// Menú dinámico por vista (plan aprobado por el PO 2026-11-07)
const home = resolveFabMenu("hoy", {});
assert.deepEqual(home.map((i) => i.id), ["resultado", "nota", "bloque", "cotizar", "tablero"]);
// Vista sin entrada propia → set global de Home
assert.deepEqual(resolveFabMenu("historial", {}), home);
// Roadmap y módulo tienen acciones de paso
assert.ok(resolveFabMenu("roadmap", {}).some((i) => i.id === "paso"));
assert.ok(resolveFabMenu("modulo", {}).some((i) => i.id === "ejecutar-paso"));
// Ficha: usar plantilla siempre; WhatsApp solo si la plantilla es de Cotizar
assert.ok(resolveFabMenu("ficha", { share: false }).some((i) => i.id === "usar-plantilla"));
assert.ok(!resolveFabMenu("ficha", { share: false }).some((i) => i.id === "whatsapp"));
assert.ok(resolveFabMenu("ficha", { share: true }).some((i) => i.id === "whatsapp"));
// Copiloto embebido: navegación del agente + separador + sus atajos
const coach = resolveFabMenu("coach", {});
assert.deepEqual(coach.filter((i) => i.nav).map((i) => i.id), ["nav-hoy", "nav-catalogo", "nav-mes"]);
assert.ok(coach.some((i) => i.sep), "lleva separador");
for (const id of ["tour", "venta", "no-venta", "cotizar-cop", "como-voy"]) {
  assert.ok(coach.some((i) => i.id === id), `falta ${id} en coach`);
}
// Todo menú resuelve a una lista no vacía de items con id y label (o separador)
for (const view of ["hoy", "calendario", "roadmap", "modulo", "resources", "ficha", "perfil", "coach", "nota", "preview"]) {
  const menu = resolveFabMenu(view, { share: true });
  assert.ok(menu.length >= 2, `${view} sin menú`);
  for (const item of menu) assert.ok(item.sep || (item.id && item.label), `${view}: item inválido`);
}

console.log("app-fab ok");
