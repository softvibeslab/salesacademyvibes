# Intake (CP0)

**Status:** approved
**Feature:** `resultado-del-tour`
**Product:** `Sales Academy (salesacademy.softvibes.art)`
**Owner:** `Roger (PO)`
**Date:** `2026-11-07`
**Historia:** `work/stories/2026-11-07-resultado-del-tour.md` (LISTA el 2026-11-07; el expediente se mantiene local por decisión del PO, fuera del repo público)

> Salida de CP0 del ciclo. No autoriza implementacion.

## 1. Entrada

Origen de la solicitud: conversacion con el PO (7 de noviembre de 2026) a partir del análisis del MVP y de la reunión de descubrimiento con el cliente piloto (27 de agosto de 2026).

Resumen en una frase:

Registrar el resultado comercial de cada tour (venta, no venta o abandono, con objeción, recuperabilidad y siguiente paso) desde la app del rep y el tablero `/ops/`, y calcular los indicadores de Home a partir de esos resultados.

## 2. Contexto

- El MVP del 7 de noviembre asigna tours de punta a punta, pero un tour solo tiene estado operativo; no existe el resultado comercial.
- El análisis con el cliente concluyó que sin ese dato la analítica es "estadística sin ground truth".
- Los indicadores de Home y Perfil son cifras de ejemplo (estado Red en `docs/status.md`).
- Demo 100 % sintético: identidad declarada con `X-Ops-Actor`, leads `Lead #NNN`.

## 3. Fuentes

| Fuente | Tipo | Acceso | Sensible |
|---|---|---|---|
| Historia enriquecida v2 | doc | `work/stories/2026-11-07-resultado-del-tour.md` (local) | no |
| Código del corte | repo | rama `feat/sala-tours-sync`, commit `21b4bd1` | no |
| Diseño aprobado | Stitch | proyecto "Smart Agenda · Rediseño UX Material 3", pantallas `562a8402…` (móvil) y `f12a7617…` (escritorio) | no |
| Contrato actual del API | doc | `docs/stack-y-api.md` | no |

## 4. Preguntas Abiertas

- [x] Ninguna que bloquee: Q-01 a Q-05, Q-07 y Q-11 respondidas por el PO el 2026-11-07 (ver historia, sección 17). Q-12 (quién corre la UAT) sigue abierta y no bloquea CP1-CP3.

## 5. No-Goals

- Autenticación real o cambios a `X-Ops-Actor`.
- Enganche, comisión y estado "Pendiente / Procesable" de la venta.
- Ingesta del sistema de presentaciones del cliente; dashboards analíticos; Telegram.
- Perfil (semana/mes), persistencia del roadmap, push/websockets.
- Datos reales de cualquier tipo.

## 6. Capas Afectadas (preliminar)

- [x] backend (API Python `server/ops_api.py`)
- [x] frontend (app del rep `agenda.js` y tablero `ops/ops.js`)
- [ ] android
- [ ] maui
- [ ] data (el cambio al JSON es aditivo, sin migración)
- [ ] infra

## 7. Responsables Preliminares

- Accountable propuesto: Roger (PO)
- Areas a consultar: desarrollo full-stack (agente con harness), QA (escenarios de la historia)
