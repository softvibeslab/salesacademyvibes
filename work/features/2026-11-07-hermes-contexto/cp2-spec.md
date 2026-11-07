# Spec (CP2)

**Status:** approved (Excepción Ready, ver CP0)
**Feature:** `hermes-contexto`
**Owner:** `Roger (PO)`
**Date:** `2026-11-07`

## 1. Goal

Hermes conoce la agenda y los resultados del usuario con sesión y el chat sugiere, sin que se lo pidan, qué hacer ahora.

## 2. Requirements (Functional)

- REQ-001 `GET /api/context?today=YYYY-MM-DD` (sesión obligatoria; 401 sin sesión). `today` opcional (por defecto la fecha del servidor; inválido → 400). Respuesta `{ok, context}` con:
  - `user {name, role, room}`; `today`;
  - `agenda[]` del día: `{start, end, lead, status, note, result}` (`result` en texto: «Venta USD 8,000», «No venta · Dinero o cuota · recuperable», «Abandono · paso 7», o `null`);
  - `month {tours, withResult, sales, noSales, abandons, volumeUSD, volumeMXN, closePct}` del mes de `today` hasta `today`, sin cancelados;
  - `topObjections[] {id, label, count}` (máx. 3) y `failSteps[] {n, title, count}` (máx. 3) del mes;
  - `pendingResults[]` tours de días anteriores del mes sin resultado (máx. 5);
  - `followUps[] {lead, action, date, owner}` siguientes pasos con fecha ≥ hace 7 días (máx. 5, por fecha);
  - `upcoming[]` próximos 3 tours después de `today`.
  Alcance por rol igual que `/tours`: rep = lo suyo; jefe = su sala; admin = todo. Sin `resultHistory`, sin notas del resultado (pueden traer datos del cliente).
- REQ-002 El puente, con sesión válida, pide `SA_CONTEXT_URL` (por defecto `http://127.0.0.1:8026/api/context`) con la cookie del llamante y `today` del cuerpo (validado), y lo agrega al prompt de sistema como «Datos del usuario». Si falla, responde igual y le dice al modelo que no hay datos (nunca inventa).
- REQ-003 Personalidad propia versionada `soul/sales-academy.md` como prompt de sistema del puente (no toca el SOUL global de Hermes). Reglas: usar los datos para responder, no inventar cifras, no pedir datos personales, proactivo y breve.
- REQ-004 El cuerpo puede traer `now` (HH:MM local) para razonar por hora del día.
- REQ-005 Copiloto: `proactiveTips(context, now)` (función pura) devuelve hasta 3 sugerencias ordenadas por prioridad: resultado sin registrar (tour de hoy ya terminado) → tour que empieza en ≤ 60 min → seguimiento que vence hoy o vencido → plan del día (antes de las 12 con tours) → resultados pendientes de días anteriores → objeción más frecuente (≥ 2) para practicar → análisis del día (≥ 17 h). (Ajuste en CP3: el plan sube antes de pendientes para que en la mañana siempre se vea.). Se muestran como tarjetas «Hermes sugiere» en el chat y se recalculan cada 5 min y al volver a la pestaña.
- REQ-006 Resumen proactivo: al abrir el chat, si hay sesión y Hermes, se pide un resumen breve del día una vez por usuario + fecha + franja (mañana < 12, mediodía < 17, tarde); se guarda localmente y se muestra como mensaje de Hermes. Sin Hermes, se muestra un resumen local con los mismos datos.
- REQ-007 La tarjeta «Mi mes» del chat usa `context.month` cuando existe.
- REQ-008 Las tarjetas que piden registrar un resultado llevan a Home de la app (`postMessage {type:'sa:go', view:'hoy'}`, origen verificado; la app solo acepta vistas de una lista).

## 3. Non-Functional

| Tipo | Requisito | Verificado en |
|---|---|---|
| Seguridad | NFR-001 el contexto solo se obtiene con la cookie del usuario; el navegador no puede inyectar contexto de otro | e2e-ops C1–C4, hermes test |
| Privacidad | NFR-002 sin notas de resultado, sin historial, sin teléfonos/correos | test_context |
| Costo | NFR-003 máximo 3 resúmenes automáticos por usuario y día | proactive test |
| Tamaño | NFR-004 el contexto en el prompt ≤ 4 KB | test_context |

## 4. Security Considerations

- [x] Lectura con el mismo filtro de alcance que `/tours`.
- [x] El cliente ya no envía datos de mes al puente para el prompt; el puente usa solo el contexto del servidor (más `sala/skills`).
- [x] `sa:go` con origen verificado y lista blanca de vistas.

## 5. Acceptance Criteria

| ID | Criterio | Prueba |
|---|---|---|
| AC-001 | Dada Ana con 3 tours hoy y una venta, cuando se pide el contexto, entonces la agenda trae los 3 con su resultado y el mes suma la venta | test_context T1 |
| AC-002 | Dado un rep, entonces no ve tours de otro rep | test_context T2, e2e C2 |
| AC-003 | Sin sesión → 401; `today` inválido → 400 | e2e C1, C3 |
| AC-004 | Dada una pregunta a Hermes, entonces el prompt de sistema contiene la agenda del usuario | hermes test H1 |
| AC-005 | Si el contexto falla, Hermes responde igual y el prompt dice que no hay datos | hermes test H2 |
| AC-006 | Dado un tour de hoy terminado sin resultado, la primera sugerencia pide registrarlo | proactive P1 |
| AC-007 | Dado un tour que empieza en 25 min, se sugiere prepararlo | proactive P2 |
| AC-008 | En vivo, «¿cuántos tours tengo hoy y a qué hora?» responde con las horas reales | UAT en vivo |
