# FTD: Tablero /ops/ independiente del login

**Status:** done
**Lane:** FTD
**Author:** agente
**Date:** 2026-11-08
**Ticket:** N/A
**Historia (opcional):** N/A

## Claridad

- **Solicitud:** `salesacademy.softvibes.art/ops/` manda a login (`/`) y el PO necesita que `/ops/` abra y funcione independientemente del login.
- **Entendimiento:** `/ops/` no debe llamar a `/api/me` para redirigir a `/` ni depender de la cookie `sa_session`. Debe iniciar directo con su selector de rol (`Jefe de sala` / `Administrador`) y de jefe/sala (`Jorge · Sala Norte`, `Rosa · Sala Sur`, `Todas`), enviando `X-Ops-Actor` en `ops-api.js` y aceptándolo en `server/ops_api.py` aun sin sesión o con otra sesión activa en `/`.
- **Hecho cuando:** Al abrir `https://salesacademy.softvibes.art/ops/` sin haber iniciado sesión (o con sesión de rep en `/`), el tablero carga directo con todas sus funciones (ver salas/tours/tareas, cambiar entre Jefe de sala y Administrador, asignar/editar/quitar tours, registrar resultados e importar).

| # | Pregunta | Respuesta | Estado |
|---|---|---|---|
| 1 | Ninguna: la instrucción del PO es directa | `/ops/` opera independiente del login de `/` | Respondida |

## Intencion

Permitir que el jefe de sala o administrador entre directo a `https://salesacademy.softvibes.art/ops/` sin ser redirigido al login del cuaderno del rep en `/`.

## Alcance

- Incluye: `ops/ops.js`, `ops/index.html`, `ops-api.js`, `server/ops_api.py`, `tests/ops-brand.mjs`, `tests/e2e-ops.mjs`, `tests/live-smoke.mjs`.
- No incluye: login del cuaderno del rep en `/` ni Copiloto.
- Capa: `web-ui` + `api-services` (ajuste acotado al mismo prototipo `smart-agenda-mockup`).

## Escalamiento

- [x] Cambio acotado dentro del mismo prototipo `/ops/`.
- [x] Sin esquema ni migraciones.
- [x] Sin dependencias nuevas.
- [x] Sin ADR.
- [x] Menos de 2 dias.

## Checklist (tests primero)

- [x] T01-test: exigir en `tests/ops-brand.mjs` que `ops/ops.js` no redirija a `/` por falta de sesión (`whoAmI`) y que `ops-api.js` envíe `X-Ops-Actor` — hecho cuando `node tests/ops-brand.mjs` FALLA.
- [x] T01-impl: restaurar acceso directo en `ops/ops.js`, envío de `X-Ops-Actor` en `ops-api.js` y soporte en `server/ops_api.py` — hecho cuando `node tests/ops-brand.mjs`, `node tests/e2e-ops.mjs` y `node tests/live-smoke.mjs` PASAN.

## Evidencia

| Tarea | Fase | Comando | Resultado observado |
|---|---|---|---|
| T01 | RED | `node tests/ops-brand.mjs` | `AssertionError [ERR_ASSERTION]: /ops/ no depende de /api/me ni redirige al login` |
| T01 | GREEN | `node tests/ops-brand.mjs && node tests/e2e-ops.mjs` | `ops-brand ok` + `e2e-ops ok` |
| live | GREEN | `OPS_BASE=https://salesacademy.softvibes.art node tests/live-smoke.mjs` | `live-smoke ok https://salesacademy.softvibes.art` |

## TRUST 5 (alcance FTD)

- [x] Tested: `ops-brand.mjs`, `e2e-ops.mjs`, `live-smoke.mjs` y pruebas Python en verde; validado en navegador sin sesión (`/api/me` = `401` mientras `/ops/` carga los 5 tours y selectores).
- [x] Readable
- [x] Unified
- [x] Secured: `/` mantiene su login para los reps (`X-Ops-Actor: rep:*` sin sesión devuelve `401`).
- [x] Trackable: este FTD
