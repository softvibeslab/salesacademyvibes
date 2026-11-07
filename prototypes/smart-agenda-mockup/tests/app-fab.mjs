// FTD fab-atajos-app — T01: FAB de atajos de la app del rep.
import assert from "node:assert/strict";
import { clampFab, isTap, FAB_ACTIONS } from "../fab.js";

// Geometría: siempre dentro de la pantalla (size 56, margen 8)
assert.deepEqual(clampFab(-40, -40, 390, 700), { x: 8, y: 8 });
assert.deepEqual(clampFab(5000, 5000, 390, 700), { x: 390 - 56 - 8, y: 700 - 56 - 8 });
assert.deepEqual(clampFab(120, 300, 390, 700), { x: 120, y: 300 });

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

console.log("app-fab ok");
