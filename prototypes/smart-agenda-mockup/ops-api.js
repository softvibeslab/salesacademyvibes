// Cliente del API de tours. La identidad viaja en la cookie de sesión (login-demo);
// el parámetro `actor` se conserva por compatibilidad y ya no se envía.
export async function opsRequest(path, { method = "GET", body } = {}) {
  const response = await fetch(path, {
    method,
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
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
    throw error;
  }
  return data;
}
