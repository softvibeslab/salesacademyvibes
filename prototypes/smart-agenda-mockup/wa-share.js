// Compartir una cotización por WhatsApp (FTD whatsapp-cotizacion).
// Privacidad: el teléfono solo arma la URL del momento; nunca se guarda ni va en la tarea.

/** URL de WhatsApp. Sin número abre el selector de chat; inválido devuelve ''. */
export function waShareUrl(rawPhone, text) {
  const digits = String(rawPhone ?? "").replace(/\D/g, "");
  if (digits && (digits.length < 8 || digits.length > 15)) return "";
  const query = "text=" + encodeURIComponent(text);
  return digits ? `https://wa.me/${digits}?${query}` : `https://wa.me/?${query}`;
}

/** Mensaje para el cliente desde la vista previa de una plantilla. */
export function previewMessage(title, preview) {
  const hero = preview?.hero ? `${preview.heroLabel || "Resultado"}: ${preview.hero}` : "";
  const rows = (preview?.rows || []).map((row) => `${row.label}: ${row.text}`).join("\n");
  return [
    `Propuesta Sales Academy · ${title}`,
    hero,
    rows,
    "Propuesta informativa del demo; sujeta a confirmación en sala.",
  ].filter(Boolean).join("\n");
}
