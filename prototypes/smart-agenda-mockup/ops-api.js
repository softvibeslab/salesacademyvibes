// Cliente del API de tours. Envía `X-Ops-Actor` cuando se indica (para que `/ops/`
// funcione de forma independiente al login) además de la cookie `same-origin`.
export async function opsRequest(path, { method = "GET", actor, body, signal } = {}) {
  const response = await fetch(path, {
    method,
    credentials: "same-origin",
    signal,
    ...(path.startsWith("/api/tour-registrations") ? { cache: "no-store" } : {}),
    headers: {
      Accept: "application/json",
      ...(actor ? { "X-Ops-Actor": actor } : {}),
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  let data = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }
  if (!response.ok || data.ok === false) {
    const error = new Error(data.error || "No se pudo completar.");
    error.status = response.status;
    error.code = typeof data.code === "string" ? data.code : "";
    error.fields = data.fields && typeof data.fields === "object" ? data.fields : {};
    throw error;
  }
  return data;
}
