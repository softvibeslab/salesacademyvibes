# Closure (CP5)

**Status:** approved
**Feature:** `resultado-del-tour`
**Owner:** `Roger (PO)`
**Date:** `2026-11-07`
**Validation:** `cp4-validation.md`

## 1. Summary

Cada tour del demo puede cerrarse con su resultado comercial (venta, no venta o abandono) desde la app del rep o el tablero, con historial, versión optimista y la Home calculada desde datos reales del día. Cierra la brecha número uno del análisis con el cliente: el tour ya tiene ground truth.

## 2. Shared Memory

- Objetivo: registrar el resultado de cada tour y bajarlo a todas las superficies del demo.
- Archivos / modulos tocados: `server/ops_api.py`, `agenda.js`, `home-counters.js` (nuevo), `ops-api.js` (sin cambios de contrato), `ops/ops.js`, `ops/ops.css`, `styles.css`/`agenda.css`, `index.html`, `ops/index.html`, `tests/e2e-ops.mjs`, `tests/home-counters.mjs` (nuevo), `docs/*` y `docs/wiki/*`.
- Decisiones: `decision-log.md` (8 decisiones del PO del 2026-11-07); historia local `work/stories/2026-11-07-resultado-del-tour.md` (LISTA, v2).
- Pendientes: UAT formal del PO a su ritmo (la asistida ya pasó); autenticación antes de datos reales (RSK-002); Perfil sigue con ejemplo; wiki de GitHub sin crear (falta la página Home manual).
- Evidencia: `cp4-validation.md`; e2e en verde local y en `https://salesacademy.softvibes.art`; capturas UAT en `/tmp/sav-uat/`; corte publicado `20261107r`.

## 3. Decisions Recorded

| Decision | Type | Link |
|---|---|---|
| Catálogo de resultados, objeciones y acciones; permisos; Home desde resultados; diseño Stitch | decision-log | `decision-log.md` |
| Waiver RSK-002 (identidad declarada, solo demo sintético) | risk-register | `risk-register.md` |
| Expediente de la historia se mantiene local | decision-log | `decision-log.md` |

## 4. Learnings

| What worked | What to improve | Action |
|---|---|---|
| TDD por suite: 13 pruebas escritas antes dieron un RED limpio (501) y la implementación salió a la primera en GREEN | El RED por suite no documenta cada par por separado | Mantener el patrón; si una historia exige evidencia por par, correr las pruebas por bloque |
| La prueba T08 escrita antes del código evitó el bug real de `clean_visit` borrando el resultado | — | — |
| Generación en Stitch: los timeouts del MCP no significan fallo; el trabajo sí entra | Esperar y consultar `list_screens` antes de reintentar (quedó una pantalla móvil duplicada) | Borrar el duplicado en Stitch cuando se pueda |
| Despliegue reproducible con `.claude/deploy-demo.sh` (local, fuera del repo público) | El runbook manual de docs queda como referencia | Usar el script en los próximos cortes |

## 5. Metrics

| Metric | Target | Actual |
|---|---|---|
| Esfuerzo | 36.9 h PERT (43 con contingencia) | ~1 sesión de trabajo asistido por IA (historia → producción el mismo día) |
| Gate pass rate | 100 % | 100 % (verify-story, verify-governance, e2e local y live, selftest, unit) |

## 6. Next Backlog

- [ ] Autenticación real (pantalla «12 · Acceso» ya diseñada en Stitch) — bloquea cualquier dato real.
- [ ] Validar el catálogo de resultados/objeciones con el responsable de datos del cliente (insumo del contrato de ingesta).
- [ ] Contrato de ingesta del sistema de presentaciones del cliente (webhook/API).
- [ ] Perfil calculado desde resultados (hoy sigue de ejemplo).
- [ ] Crear la página Home del wiki de GitHub y correr `scripts/publish-wiki.sh`.
- [ ] Borrar la pantalla duplicada «Registrar resultado del tour · Móvil» en Stitch.

## Gate CP5 (Closure)

- [x] Memoria compartida guardada.
- [x] Decisiones versionadas enlazadas.
- [x] Aprendizajes con accion.
- [x] Backlog siguiente registrado.
- [x] Dashboard final actualizado (`docs/status.md`: Resultado del tour Green, Métricas Yellow).
