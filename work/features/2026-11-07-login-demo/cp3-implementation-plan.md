# Implementation Plan (CP3)

**Status:** approved
**Feature:** `login-demo`
**Owner:** `Roger (PO)`
**Date:** `2026-11-07`
**Spec:** `cp2-spec.md`

## 1. Tasks By Team

| Layer | Task | Owner | Depends On | Estimate |
|---|---|---|---|---|
| backend | Sesiones, login/logout/me, rate limit, admin por env | agente | - | M |
| backend | Puente Hermes con `SA_AUTH_URL` | agente | login | S |
| frontend | Acceso + identidad de sesión (app), sesión en tablero | agente | login | M |
| ops | Contraseña admin en el servidor + EnvironmentFile del servicio | operador (PO) | deploy | S |

## 1b. Test-First Pairs (TDD)

| ID | AC / REQ | Tarea | Hecha cuando |
|---|---|---|---|
| T01-test/impl | AC-001..006 | A1–A8 en `tests/e2e-ops.mjs` y la suite entera autenticada por sesión | RED: `401 !== 200` («Falta el rol.» en `/api/login`) → GREEN: `e2e-ops ok` |
| T02-test/impl | AC-007 | T05 en `copiloto-rep/tests/hermes.test.mjs` | RED: anónimo respondido → GREEN: 72 pass |
| T03 | AC-001..007 | `tests/live-smoke.mjs` contra el sitio | tras el deploy |

## 2. Contracts

| Contract | Producer | Consumer | Version | Status |
|---|---|---|---|---|
| `/api/login`, `/api/logout`, `/api/me`, cookie `sa_session`; retiro de `X-Ops-Actor` | backend | app, tablero, puente Hermes | v1 | agreed (Excepción Ready) |

## 3. Repo Paths

| Layer | Repo | Path(s) | Runtime |
|---|---|---|---|
| backend | salesacademyvibes | `prototypes/smart-agenda-mockup/server/ops_api.py`, `server/salesacademy-ops.service` | Python 3 |
| backend | copiloto-rep (local) | `server.mjs` | node 22 |
| frontend | salesacademyvibes | `agenda.js`, `ops-api.js`, `ops/ops.js`, `styles.css` | navegador |

## 4. Branch Strategy

- `feat/sala-tours-sync` → ff a `main`. Release: corte `20261107w`.

## 5. Expected Evidence

TDD y visual en `cp4-validation.md`; `live-smoke ok` tras deploy.

## 6. Gates

- [x] py_compile + node --check · [x] suites locales · [ ] live-smoke · [ ] trust5

## 7. Observability

El API no loguea cuerpos ni contraseñas (`log_message` vacío se conserva).

## 8. Rollback Plan

Volver al commit anterior y redeplegar; las sesiones en `ops.json` son aditivas y el código anterior las ignora. Si el login fallara en vivo: `OPS_ALLOW_ACTOR_HEADER=1` en el servicio restaura el modo anterior temporalmente.

## Gate CP3 -> CP4

- [x] Tareas · [x] Pares TDD · [x] Contrato · [x] Rama · [x] Evidencia esperada · [x] Rollback
