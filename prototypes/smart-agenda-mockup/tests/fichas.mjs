// FTD fase2-fichas — T01: cada recurso tiene ficha completa (qué es, cuándo, valor) con pasos válidos.
import assert from "node:assert/strict";
import { FICHAS, fichaFor } from "../fichas.js";

const ids = [
  ...Array.from({ length: 19 }, (_, i) => `SK-${String(i + 1).padStart(2, "0")}`),
  "LIB-01", "LIB-02", "LIB-03", "LIB-04", "LIB-05",
  "dinero", "pareja", "tiempo", "escepticismo",
];
for (const id of ids) {
  const f = fichaFor(id);
  assert.ok(f, `falta la ficha de ${id}`);
  for (const k of ["que", "cuando", "valor"]) {
    assert.ok(typeof f[k] === "string" && f[k].trim().length >= 25, `${id}: «${k}» vacío o muy corto`);
  }
  assert.ok(Array.isArray(f.pasos), `${id}: pasos no es lista`);
  for (const n of f.pasos) assert.ok(Number.isInteger(n) && n >= 1 && n <= 11, `${id}: paso inválido ${n}`);
}
assert.equal(Object.keys(FICHAS).length, ids.length, "no sobran fichas sin recurso");
assert.equal(fichaFor("SK-99"), null);
console.log("fichas ok");
