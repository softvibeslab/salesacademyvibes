# Intake (CP0)

**Status:** approved
**Feature:** `tareas-evidencia`
**Product:** `Sales Academy (salesacademy.softvibes.art)`
**Owner:** `Roger (PO)`
**Date:** `2026-11-07`
**Historia:** N/A — Excepcion Ready (ver abajo)

Excepcion Ready: fase 3 del plan aprobado por el PO el 2026-11-07 («…detalle de las tareas, para marcar como realizadas es necesario adjuntar una evidencia o screenshot o audio…»; aprobación: «si lo apruebo … las evidencias justo lo que dices recomendado»), confirmada hoy: «sigamos con la fase 3». Valores propuestos y no objetados: retención 30 días, audio ≤ 60 s, archivo ≤ 5 MB al elegirlo. TDD y TRUST 5 se mantienen.

## 1. Entrada

Resumen: las tareas del rep viven en el servidor; «Marcar hecha» exige una evidencia (foto, captura o audio) que ven solo el rep y su jefe y que se borra a los 30 días.

## 2. Contexto

- Hoy «Tus prioridades» son datos locales del navegador y se marcan con un checkbox sin prueba.
- El jefe no ve si su equipo cumplió.

## 3. No-Goals

- Video, varias evidencias por tarea, comentarios del jefe, notificaciones push.
- Cambiar el límite de nginx: la app comprime antes de subir (≤ 700 KB por evidencia).

## 4. Capas Afectadas

- [x] backend (`server/ops_tasks.py`, `server/ops_api.py`, contexto de Hermes)
- [x] frontend (app: Hoy, detalle de tarea; tablero: tareas por rep)
- [x] datos (`tasks` en `ops.json`, archivos en `OPS_EVIDENCE_DIR`)

## 5. Responsables

- Accountable: Roger (PO) · Responsible: agente de desarrollo
