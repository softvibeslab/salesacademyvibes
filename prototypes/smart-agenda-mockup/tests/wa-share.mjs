// FTD whatsapp-cotizacion (app) — T01: URL de WhatsApp y mensaje de la vista previa.
import assert from "node:assert/strict";
import { waShareUrl, previewMessage } from "../wa-share.js";

// URL con número normalizado
assert.equal(waShareUrl("+52 (998) 123-4567", "hola"), "https://wa.me/529981234567?text=hola");
// Sin número: selector de chat de WhatsApp
assert.equal(waShareUrl("", "hola mundo"), "https://wa.me/?text=hola%20mundo");
// Inválido: muy corto o muy largo → cadena vacía (la UI muestra error)
assert.equal(waShareUrl("12", "hola"), "");
assert.equal(waShareUrl("1".repeat(16), "hola"), "");

// Mensaje desde la vista previa de una plantilla de cotización
const preview = {
  hero: "$225.01",
  heroLabel: "Mensualidad",
  rows: [
    { label: "Enganche", text: "$6,000.00" },
    { label: "Saldo", text: "$14,000.00" },
    { label: "Plazo y tasa", text: "120 meses · 14.9%" },
  ],
  note: "Ejemplo calculado con la plantilla.",
};
const msg = previewMessage("Cotizar membresía", preview);
assert.match(msg, /Cotizar membresía/);
assert.match(msg, /Mensualidad: \$225\.01/);
assert.match(msg, /Enganche: \$6,000\.00/);
assert.match(msg, /120 meses · 14\.9%/);
assert.match(msg, /sujeta a confirmación/);

console.log("wa-share ok");
