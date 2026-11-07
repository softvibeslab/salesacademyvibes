# Spec (CP2)

**Status:** approved
**Feature:** `login-demo`
**Product:** `Sales Academy`
**Owner:** `Roger (PO)`
**Date:** `2026-11-07`

## 1. Problem

Ver `cp1-srs.md`.

## 2. Users And Areas

Reps (app), jefes y admin (tablero), PO (costo de Hermes).

## 3. Goal

Ninguna lectura ni escritura del API ni de Hermes sin sesión válida; los 6 usuarios demo y el admin entran por una sola pantalla.

## 4. Scope

Included: login/logout/me, sesiones persistidas, usuarios demo, pantalla de Acceso, identidad desde la sesión en app y tablero, Hermes con sesión.
Excluded: ver `cp0-intake.md` §5.

## 5. Requirements (Functional)

- REQ-001: `POST /api/login {username, password}` → 200 `{ok, user:{id,name,role,roomId}}` + `Set-Cookie: sa_session=<token>; Path=/; HttpOnly; SameSite=Lax; Max-Age=43200; Secure`. Fallo → 401 «Usuario o contraseña incorrectos.» (mismo mensaje si el usuario no existe), sin cookie.
- REQ-002: la sesión se guarda como `sha256(token)` en `ops.json` (`sessions`), con expiración de 12 h; sobrevive reinicios y «Restaurar ejemplo». El encabezado `X-Ops-Actor` deja de autenticar (solo con `OPS_ALLOW_ACTOR_HEADER=1`, para el selftest local).
- REQ-003: usuarios = personas del directorio (contraseña demo `OPS_DEMO_PASSWORD`, por defecto pública para testers) + `admin` (contraseña `OPS_ADMIN_PASSWORD` solo en el entorno del servidor; sin ella el admin no puede entrar).
- REQ-004: `POST /api/logout` borra la sesión y expira la cookie; `GET /api/me` → 200 con el usuario o 401.
- REQ-005: el puente del Copiloto consulta `SA_AUTH_URL` (en el servidor: `http://127.0.0.1:8026/api/me`) con la cookie del llamante; sin sesión → 401 y nunca llama al modelo.
- REQ-006: 5 fallos de login por usuario en 10 min → 429 «Demasiados intentos. Espera unos minutos.», aun con la contraseña correcta.
- REQ-007: app: sin sesión muestra Acceso; rep entra a su cuaderno (sin chips de identidad); jefe/admin van a `/ops/`; «Cerrar sesión» en Perfil. Tablero: sin sesión redirige a `/`; identidad y sala desde la sesión; rep ve un aviso; «Cerrar sesión» en el encabezado.

## 6. Requirements (Non-Functional)

| Type | Requirement | Target | Verified In |
|---|---|---|---|
| Security | NFR-001: cookie | HttpOnly + Secure + SameSite=Lax | e2e A1, live-smoke |
| Security | NFR-002: fuerza bruta | 429 tras 5 fallos | e2e A8 |
| Security | NFR-003: tokens | 32 bytes aleatorios; solo el hash en disco | revisión de código |

## 7. Security Considerations

- [x] Datos sensibles: contraseña admin solo en `/etc/salesacademy-ops/admin.env` (600); la demo es pública por decisión del PO.
- [x] Autorización: se conserva la matriz de alcance por rol/sala sobre el actor de la sesión.
- [x] Threat model: enumeración (mismo mensaje), fuerza bruta (bloqueo), robo de cookie (HttpOnly/Secure), CSRF (SameSite=Lax + API JSON), costo de Hermes (sesión obligatoria).
- [x] Sin secretos en esta spec.

## 8. RACI

- Accountable: Roger (PO) · Responsible: agente · Consulted: Security (checklist arriba)

## 9. Layer Profile

- backend · frontend

## 10. Risks

Ver `risk-register.md`.

## 11. Test Plan (initial)

| REQ / NFR | How to verify | Type |
|---|---|---|
| REQ-001..004, 006 | `tests/e2e-ops.mjs` A1–A8 + toda la suite autenticada por sesión | integration |
| REQ-005 | copiloto `tests/hermes.test.mjs` T05 | unit/integration |
| REQ-007 | recorrido visual con Playwright | manual asistida |
| live | `tests/live-smoke.mjs` | e2e en vivo |

## 12. Acceptance Criteria

| ID | Criterion | REQ | Test |
|---|---|---|---|
| AC-001 | Dado un usuario demo, cuando entra con la contraseña correcta, entonces recibe cookie HttpOnly y ve solo lo suyo | REQ-001/007 | e2e A1, visual |
| AC-002 | Dado un intento con contraseña mala o usuario inexistente, entonces 401 con el mismo mensaje | REQ-001 | e2e A2 |
| AC-003 | Dado el encabezado `X-Ops-Actor` sin sesión, entonces 401 | REQ-002 | e2e A4, live-smoke |
| AC-004 | Dado el admin con la contraseña demo, entonces 401; con la privada, 200 | REQ-003 | e2e A6 |
| AC-005 | Dado logout, entonces la cookie deja de servir | REQ-004 | e2e A7 |
| AC-006 | Dados 5 fallos, entonces 429 aun con la correcta | REQ-006 | e2e A8 |
| AC-007 | Dado un llamado a Hermes sin sesión, entonces 401 sin llamar al modelo | REQ-005 | T05, live-smoke |

## Gate CP2 -> CP3

- [x] REQ/NFR con id. [x] Seguridad completa. [x] AC con prueba. [x] Plan de pruebas. [x] Aprobación (Excepción Ready).
