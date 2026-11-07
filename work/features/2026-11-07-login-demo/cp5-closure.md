# Closure (CP5)

**Status:** approved
**Feature:** `login-demo`
**Owner:** `Roger (PO)`
**Date:** `2026-11-07`
**Validation:** `cp4-validation.md`

## 1. Summary

Login con sesión en producción: usuarios demo para testers, admin privado y Hermes protegido. Cierra el riesgo de identidad declarada y el de consumo libre del modelo.

## 2. Shared Memory

- Archivos: `server/ops_api.py`, `server/salesacademy-ops.service`, `ops-api.js`, `agenda.js`, `ops/ops.js`, `styles.css`, `tests/e2e-ops.mjs`, `tests/live-smoke.mjs`; copiloto `server.mjs` + T05.
- Decisiones: `decision-log.md`. Evidencia: `cp4-validation.md`.
- Pendientes: ver backlog.

## 3. Decisions Recorded

| Decision | Type | Link |
|---|---|---|
| Contraseñas, Hermes con sesión, entrada única, Excepción Ready | decision-log | `decision-log.md` |

## 4. Learnings

| What worked | What to improve | Action |
|---|---|---|
| La suite completa autenticada por sesión detectó cero regresiones | Dos sesiones editando los mismos archivos sin commit: una pisó la identidad por sesión | Commits pequeños y frecuentes; revisar `git status` antes de cada deploy |
| Revisar dependencias nuevas antes del deploy evitó caída del API (`ops_import.py`) | El script de deploy lista archivos a mano | Copiar `server/*.py` completo en el próximo ajuste |

## 5. Metrics

| Metric | Target | Actual |
|---|---|---|
| Gate pass rate | 100 % | 100 % (local + vivo) |

## 6. Next Backlog

- [ ] Fecha real en lugar del día de ejemplo (bloqueante para pruebas con agenda real).
- [ ] Alta de personas y salas desde el tablero (admin).
- [ ] Cambiar `OPS_DEMO_PASSWORD` antes de testers externos.
- [ ] Respaldo diario de `ops.json`.

## Gate CP5 (Closure)

- [x] Memoria · [x] Decisiones enlazadas · [x] Aprendizajes · [x] Backlog · [x] Dashboard (`docs/status.md`)
