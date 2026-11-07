# Validation Report (CP4)

**Status:** approved
**Feature:** `login-demo`
**Owner:** `Roger (PO)`
**Date:** `2026-11-07`
**Plan:** `cp3-implementation-plan.md`

## 1. Test Results

| Suite | Type | Result | Coverage / Notes |
|---|---|---|---|
| `python3 -m py_compile` + `OPS_SELFTEST=1` | build/integration | pass | `ops api selftest ok` (selftest con `ALLOW_ACTOR_HEADER`) |
| `node tests/e2e-ops.mjs` | integration | pass | A1–A8 + todos los escenarios previos (tours, resultados, permisos, versión) ahora autenticados por sesión |
| copiloto `npm test` | unit/integration | pass | 72 pass (T05 Hermes con sesión) |
| `app-fab`, `wa-share`, `home-counters` | unit | pass | regresión |
| Visual local (Playwright) | manual asistida | pass | `/ops/` sin sesión → `/`; error «Usuario o contraseña incorrectos.»; Ana entra sin chips y ve 3 tours; cerrar sesión vuelve al Acceso; Jorge es llevado a `/ops/` con su sala; cero errores de página |
| `tests/live-smoke.mjs` | e2e live | pass | `live-smoke ok https://salesacademy.softvibes.art`; admin con contraseña demo → 401; recorrido visual en vivo: Teo entra a su cuaderno, Rosa al tablero con «Rosa · Jefe de sala · Sala Sur» (Mira y Teo), cerrar sesión vuelve al Acceso, cero errores |
| Suites de la otra sesión | unit | pass | `test_import.py` 6 OK, `ops-brand ok` |

### Evidencia TDD (RED -> GREEN)

| Tarea | Fase | Comando | Resultado observado |
|---|---|---|---|
| T01 | RED | `node tests/e2e-ops.mjs` | `AssertionError: {"ok":false,"error":"Falta el rol."}` — `401 !== 200` en `POST /api/login` |
| T01 | GREEN | `node tests/e2e-ops.mjs` | `e2e-ops ok http://127.0.0.1:18988` |
| T02 | RED | copiloto `npm test` | `fail 1 — AssertionError: sin sesión no responde` |
| T02 | GREEN | copiloto `npm test` | `pass 72 / fail 0` |

## 2. Findings

| ID | Severity | Description | Status |
|---|---|---|---|
| FND-001 | low | Botón «Cerrar sesión» perdido/invisible tras el rediseño de otra sesión | fixed (md-btn-tonal en el masthead) |
| FND-002 | med | Trabajo ajeno mezclado; además su reescritura de `ops.js` borró la identidad por sesión (en vivo Rosa aparecía como Jorge y «sin reps») | fixed — identidad por sesión reaplicada sobre el rediseño, verificado en vivo; integración autorizada por el PO («ya quedó, sigue») |
| FND-003 | high | `ops_api.py` ahora importa `ops_import.py`; el deploy solo copiaba `ops_api.py` y el servicio se habría caído | fixed — el script de deploy copia ambos |

## 3. Security Review

- [x] Sin secretos hardcoded (la contraseña demo es pública por decisión del PO; la del admin solo en el servidor).
- [x] Inputs validados (username/password acotados; mismo mensaje ante fallo).
- [x] Logs sin datos privados.
- [x] Threat model en `cp2-spec.md` §7.

## 4. TRUST 5

- [x] Tested · [x] Readable · [x] Unified · [x] Secured · [x] Trackable

## 5. Waivers

| Gate / Finding | Reason | Approved By | Expires |
|---|---|---|---|
| Historia LISTA | Excepción Ready | Roger, PO (2026-11-07) | al cerrar esta feature |

## 6. Advance Decision

- Decision: advance
- Decided by: Roger (PO), «ya quedó, sigue» — Date: 2026-11-07
