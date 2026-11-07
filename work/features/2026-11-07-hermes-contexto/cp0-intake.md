# Intake (CP0)

**Status:** approved
**Feature:** `hermes-contexto`
**Product:** `Sales Academy (salesacademy.softvibes.art)`
**Owner:** `Roger (PO)`
**Date:** `2026-11-07`
**Historia:** N/A — Excepcion Ready (ver abajo)

Excepcion Ready: el PO aprobó el plan de fases el 2026-11-07 («si lo apruebo y de hermes un perfil propio…») y hoy pidió priorizarlo: «tener como prioridad validar que el agente hermes que vive como copiloto esté conectado con la información y el contexto del usuario registrado, en todos sus datos de tours, ventas, etc … y que hermes esté siempre de forma proactiva viendo cómo mejorar el día y en el chat ponga sugerencias conforme vaya el día y tenga su agenda» (conversación Claude Code, 2026-11-07). TDD y TRUST 5 se mantienen.

## 1. Entrada

Resumen en una frase: Hermes responde con los datos reales del usuario con sesión (agenda, resultados, ventas, objeciones, seguimientos) y el chat propone acciones según la hora y la agenda.

## 2. Contexto

- Hoy el puente solo envía `sala/role/mes/skills` del almacenamiento local del Copiloto y el prompt dice «Todavía no tienes acceso a los tours».
- La tarjeta «Mi mes» del chat lee el almacenamiento local, no los resultados del tablero ($0.00).
- Los datos reales viven en el API de sala (`ops.json`): tours, resultados (historia `resultado-del-tour`), siguientes pasos.

## 3. Fuentes

| Fuente | Tipo | Acceso | Sensible |
|---|---|---|---|
| Pedido del PO | conversación | sesión Claude Code 2026-11-07 | no |
| `server/ops_api.py`, `copiloto-rep/server.mjs`, `src/app.js` | repo | rama `release/demo-pruebas-20261107` | no |

## 4. Preguntas Abiertas

- [x] Ninguna bloqueante. Supuestos registrados en `decision-log.md`.

## 5. No-Goals

- Que Hermes escriba en el tablero (registrar resultados o tareas): solo lectura.
- Crear el perfil `sales-academy` dentro de Hermes en el VPS (queda como runbook; la personalidad viaja como prompt de sistema del puente).
- Tareas con evidencia (fase 3, feature aparte).

## 6. Capas Afectadas

- [x] backend (`server/ops_api.py` + `server/ops_context.py`, puente `copiloto-rep/server.mjs`)
- [x] frontend (Copiloto `src/app.js`, `src/skills/proactive.js`; app `agenda.js` para navegación desde el chat)

## 7. Responsables

- Accountable: Roger (PO) · Responsible: agente de desarrollo
