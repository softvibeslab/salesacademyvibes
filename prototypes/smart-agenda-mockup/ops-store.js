export const ME_REP = "ana";
export const EXAMPLE_TODAY = "2026-11-06";

export const STATUS_LABEL = {
  confirmado: "Confirmado",
  en_curso: "En curso",
  pendiente: "Pendiente",
  cancelado: "Cancelado",
};

export const EXAMPLE_LEADS = ["Lead #4920", "Lead #302", "Lead #188", "Lead #210", "Lead #077", "Lead #441"];

export function defaultOps() {
  return {
    rooms: [
      { id: "norte", name: "Sala Norte" },
      { id: "sur", name: "Sala Sur" },
    ],
    people: [
      { id: "jorge", name: "Jorge", role: "jefe", roomId: "norte" },
      { id: "rosa", name: "Rosa", role: "jefe", roomId: "sur" },
      { id: "ana", name: "Ana", role: "rep", roomId: "norte" },
      { id: "luis", name: "Luis", role: "rep", roomId: "norte" },
      { id: "mira", name: "Mira", role: "rep", roomId: "sur" },
      { id: "teo", name: "Teo", role: "rep", roomId: "sur" },
    ],
    visits: [
      { id: "v1", repId: "ana", date: "2026-11-06", start: "09:30", end: "10:30", lead: "Lead #4920", status: "confirmado", note: "Objeción de cuota" },
      { id: "v2", repId: "ana", date: "2026-11-06", start: "11:30", end: "12:30", lead: "Lead #302", status: "en_curso", note: "Seguimiento" },
      { id: "v3", repId: "ana", date: "2026-11-06", start: "15:30", end: "16:30", lead: "Lead #188", status: "pendiente", note: "Visita de demostración" },
      { id: "v4", repId: "luis", date: "2026-11-06", start: "10:00", end: "11:00", lead: "Lead #210", status: "confirmado", note: "" },
      { id: "v5", repId: "mira", date: "2026-11-06", start: "13:00", end: "14:00", lead: "Lead #077", status: "pendiente", note: "" },
      { id: "v6", repId: "ana", date: "2026-11-07", start: "10:00", end: "11:00", lead: "Lead #441", status: "pendiente", note: "Día siguiente" },
    ],
  };
}

export function normalizeClock(raw) {
  const match = String(raw ?? "").trim().match(/^(\d{1,2}):([0-5]\d)(?::[0-5]\d)?$/);
  if (!match) return "";
  const hour = Number(match[1]);
  if (hour > 23) return "";
  return `${String(hour).padStart(2, "0")}:${match[2]}`;
}

export function addDays(iso, count) {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(year, month - 1, day + count);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${mm}-${dd}`;
}

const WEEKDAYS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const MONTHS = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

export function labelDate(iso) {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return `${WEEKDAYS[date.getDay()]} ${day} de ${MONTHS[month - 1]}`;
}
