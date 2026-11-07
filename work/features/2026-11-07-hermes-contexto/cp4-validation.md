# Validation Report (CP4)

**Status:** approved
**Feature:** `hermes-contexto`
**Owner:** `Roger (PO)`
**Date:** `2026-11-07`
**Plan:** `cp3-implementation-plan.md`

## 1. Test Results

| Suite | Type | Result | Coverage / Notes |
|---|---|---|---|
| `python3 tests/test_context.py` | unit | pass | 6 OK: agenda, mes sin cancelados/futuros/otros meses, objeciones, pendientes, seguimientos, privacidad, alcance, texto ≤ 4 KB |
| `node tests/e2e-ops.mjs` | integration | pass | C1 401 sin sesión · C2 Ana solo lo suyo · C3 fecha inválida e imposible 400 · C4 jefe solo su sala; regresión completa |
| copiloto `npm test` | unit/integration | pass | 83 pass (T06–T08 Hermes con contexto; P1–P6 proactivo) |
| copiloto `tests/e2e.mjs` | e2e | pass | 17/17 |
| app `app-fab`, `fichas`, `home-counters`, `install`, `ops-brand`, `theme`, `wa-share`, `test_import` | unit | pass | regresión |
| Integración local (Playwright, Hermes simulado) | e2e | pass | 11:05 → «Registra el resultado del tour de 09:30», «Tu tour de 11:30 empieza en 25 min», «Plan del día»; 08:15 → «Plan del día»; resumen automático; el prompt contiene la agenda y «Hora local: 11:05»; «Abrir» lleva a Home; «Mi mes» con datos del tablero; 0 errores |
| `tests/live-smoke.mjs` | e2e live | pass | `live-smoke ok https://salesacademy.softvibes.art` |
| UAT en vivo (Hermes real, Ana) | UAT | pass | «¿Cuántos tours tengo hoy…?» → «Ana, hoy tienes 3 tours: 09:30–10:30 Lead #4920 … 11:30–12:30 Lead #302 … 15:30–16:30 Lead #188 … Antes del tour de las 11:30, abre Home o el Calendario y registra el resultado del Lead #4920.» |

### Evidencia TDD (RED -> GREEN)

| Tarea | Fase | Comando | Resultado observado |
|---|---|---|---|
| T01 | RED | `python3 tests/test_context.py` | `ModuleNotFoundError: No module named 'ops_context'` |
| T01 | GREEN | `python3 tests/test_context.py` | `Ran 6 tests … OK` |
| T02 | RED | `node tests/e2e-ops.mjs` | `AssertionError: {"ok":false,"error":"No existe."}` — `404 !== 200` |
| T02 | GREEN | `node tests/e2e-ops.mjs` | `e2e-ops ok` (incluye fecha imposible 2026-13-45 → 400) |
| T03 | RED | `node --test tests/hermes.test.mjs` | `✖ T06 ✖ T07 H1 ✖ T07 H2 ✖ T08` |
| T03 | GREEN | `node --test tests/hermes.test.mjs` | `pass 11 / fail 0` |
| T04 | RED | `node --test tests/proactive.test.mjs` | `ERR_MODULE_NOT_FOUND: src/skills/proactive.js`; luego P3 falló (plan del día fuera del top 3 en la mañana) |
| T04 | GREEN | `node --test tests/proactive.test.mjs` | `pass 6 / fail 0` (plan del día sube antes de pendientes; spec actualizada) |

Decisión sobre pruebas existentes: T06 exigía «no tienes acceso a los tours»; la expectativa cambió por decisión del PO (Hermes ahora tiene los datos) y se invirtió de forma explícita. El e2e del Copiloto aislado excluye el 404 de `/api/context` igual que ya excluía `/api/hermes` (el servidor aislado no tiene API de sala; la app se degrada sin error de JavaScript).

## 2. Findings

| ID | Severity | Description | Status |
|---|---|---|---|
| FND-001 | med | Una fecha con formato válido pero imposible habría causado error 500 | fixed — validación con calendario + prueba |
| FND-002 | high | El deploy no copiaba `soul/` ni `ops_context.py` (el puente y el API se habrían caído) | fixed — script de deploy actualizado antes del deploy |
| FND-003 | low | El navegador podía mandar números del mes al prompt | fixed — el puente ya no acepta `mes` del cliente; los números salen del servidor |

## 3. Security Review

- [x] El contexto se pide con la cookie del llamante; mismo alcance que `/tours` (rep/jefe/admin), probado en C2/C4.
- [x] Sin notas de resultado ni historial en el contexto (pueden traer datos del cliente).
- [x] `today` y `now` validados antes de usarse; `sa:go` con origen verificado y lista blanca.
- [x] La clave de Hermes no sale del servidor (T03 sigue en verde).

## 4. Gate CP4 -> CP5

- [x] Todas las suites en verde con evidencia. [x] UAT en vivo. [x] Sin hallazgos abiertos de severidad alta.
