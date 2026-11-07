# Validation Report (CP4)

**Status:** approved
**Feature:** `tareas-evidencia`
**Owner:** `Roger (PO)`
**Date:** `2026-11-07`
**Plan:** `cp3-implementation-plan.md`

## 1. Test Results

| Suite | Type | Result | Coverage / Notes |
|---|---|---|---|
| `python3 tests/test_tasks.py` | unit | pass | 5 OK: imagen/audio válidos; consentimiento, tipo, firma (SVG disfrazado de PNG, PNG declarado JPEG), base64 inválido, > 700 KB, audio 0 s y 61 s; reglas de creación por rol; siembra; retención 30 días |
| `node tests/e2e-ops.mjs` | integration | pass | E0 alcance; E1 jefe fuera de sala 403; E2 sin evidencia 400 y sigue pendiente; E3 otro rep 403, dueño 200 hecha; E4 firma falsa 400; E5 evidencia: Ana 200, Jorge 200, Luis 403, Rosa 403, sin sesión 401, cabeceras `no-store`/`nosniff`, reabrir → 404; E6 cuerpo > 1 MB → 413; E7 Hermes ve tareas |
| `python3 tests/test_context.py` | unit | pass | 8 OK (tareas pendientes ≤ hoy y hechas del mes) |
| `node tests/tasks.mjs` | unit | pass | mapeo, habilitación de «Marcar hecha», formato de audio, escalado de foto |
| copiloto `npm test` / `e2e.mjs` | unit / e2e | pass | 84 pass (P7 tarea pendiente) · 17/17 |
| Regresión app | unit | pass | app-fab, fichas, home-counters, install, ops-brand, theme, wa-share, test_import |
| Playwright `phase3.mjs` (local) | e2e | pass | Ana: «Marcar hecha» deshabilitado sin evidencia y sin consentimiento; foto real de varios MB → 69 KB; audio grabado con micrófono simulado (2 s); Home muestra hecha; la evidencia se ve en el detalle; Jorge ve «2/3», «Ver foto», «Ver audio» (200) y asigna tarea a Luis; 0 errores |
| `tests/live-smoke.mjs` + UAT en vivo | e2e live | pass | sin evidencia 400 · con PNG «hecha» · Jorge 200 `image/png` · Luis 403 · contexto con «Tareas pendientes» · reabrir «pendiente» (demo limpia) |

### Evidencia TDD (RED -> GREEN)

| Tarea | Fase | Comando | Resultado observado |
|---|---|---|---|
| T01 | RED | `python3 tests/test_tasks.py` | `ModuleNotFoundError: No module named 'ops_tasks'`; luego `AssertionError: True is not false` (la guardia de id rechazaba `t1`; se relajó a `[a-z0-9-]`, sigue bloqueando rutas) |
| T01 | GREEN | `python3 tests/test_tasks.py` | `Ran 5 tests … OK` |
| T02 | RED | `node tests/e2e-ops.mjs` | `{"ok":false,"error":"No existe."}` `404`; luego `E7 Hermes ve las tareas pendientes` falso |
| T02 | GREEN | `node tests/e2e-ops.mjs` | `e2e-ops ok` |
| T03 | RED | `test_context.py` / `proactive.test.mjs` | `FAILED (errors=1)` / `fail 1` (P7) |
| T03 | GREEN | idem | `OK` / `pass 7` |
| T04 | RED | `node tests/tasks.mjs` | `ERR_MODULE_NOT_FOUND` |
| T04 | GREEN | `node tests/tasks.mjs` | `tasks ok` |

## 2. Findings

| ID | Severity | Description | Status |
|---|---|---|---|
| FND-001 | med | El recuadro de evidencia se desbordaba en celular (grid sin `minmax(0,1fr)`) | fixed, verificado con captura |
| FND-002 | low | Círculo doble en tareas pendientes del tablero | fixed |
| FND-003 | info | nginx limita a 1 MB: se resolvió comprimiendo en el cliente (≤ 700 KB) sin tocar el servidor web | by design |

## 3. Security Review

- [x] Evidencia fuera del webroot; solo el API la sirve con sesión y alcance por rol; archivo 600, carpeta 700.
- [x] Tipo verificado por firma de bytes; nombre de archivo = id del servidor; `nosniff` + `inline` + `no-store`.
- [x] Consentimiento explícito y aviso de privacidad antes de subir; retención 30 días.
- [x] Título y detalle sin correos ni teléfonos.

## 4. Gate CP4 -> CP5

- [x] Suites y UAT en verde. [x] Sin hallazgos abiertos de severidad alta.
