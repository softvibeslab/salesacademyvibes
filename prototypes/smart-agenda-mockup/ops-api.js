export async function opsRequest(path, { method = "GET", actor, body } = {}) {
  const response = await fetch(path, {
    method,
    headers: {
      Accept: "application/json",
      "X-Ops-Actor": actor,
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
    throw new Error(data.error || "No se pudo completar.");
  }
  return data;
}
