# FTD: `fab-contextual`

**Status:** done
**Lane:** FTD
**Author:** `RogerDevAndroid`
**Branch:** `feat/sala-tours-sync`
**Date:** `2026-11-07`
**Ticket:** `Plan «un FAB, dueño único, menú por contexto» aprobado por el PO (AskUserQuestion, 2026-11-07)`
**Historia (opcional):** N/A

## Claridad

- **Solicitud:** que solo aparezca un botón flotante y que sus opciones sean dinámicas según el módulo o pestaña (el PO vio dos FAB encimados en la pestaña Copiloto).
- **Entendimiento:** el FAB es de la app y se ve siempre; el Copiloto no dibuja el suyo cuando corre embebido. `resolveFabMenu(vista, flags)` decide el menú por vista (tabla aprobada en el plan). En la pestaña Copiloto el menú trae la navegación del agente (Chat/Catálogo/Mi mes, con la actual marcada) y sus atajos, y cada opción viaja al iframe con el contrato `sa:fab`.
- **Hecho cuando:** pruebas unitarias del menú por vista en verde, e2e del Copiloto con el caso «embebido sin FAB propio», y en el sitio hay una sola bolita cuyo menú cambia por pestaña.

| # | Pregunta | Respuesta | Estado |
|---|---|---|---|
| 1 | Carril ante el contrato nuevo `sa:fab` (payload entre app y agente) | PO 2026-11-07: «Aprobado, como FTD» con el mini-contrato documentado aquí y en el repo del Copiloto | Respondida |

## Contrato `sa:fab` (postMessage, mismo origen)

- App → Copiloto: `{ type: 'sa:fab', id }` con `id` ∈ nav-hoy, nav-catalogo, nav-mes, tour, venta, no-venta, cotizar, como-voy. El Copiloto resuelve con `fabCommand(id)` (prueba T04 en su repo) e ignora orígenes ajenos o ids desconocidos.
- Copiloto → App: `{ type: 'sa:fab-state', tab }` al navegar, para marcar la pestaña activa en el menú.

## Intencion

Un solo botón flotante, siempre con las acciones que tocan en el lugar donde estás.

## Alcance

- Incluye: `resolveFabMenu` + menús por vista en `fab.js`, despacho por contexto y puente postMessage en `agenda.js`, separador y resaltado en `styles.css`, fix `.fab[hidden]{display:none}` (causa raíz del doble botón: `hidden` perdía contra `display:grid`), caché `20261107u`, prueba ampliada `tests/app-fab.mjs`.
- No incluye: FAB en `/ops/` (escritorio), nuevos atajos de negocio.
- Capa: frontend de la app (el lado del Copiloto va en su FTD homónimo).

## Escalamiento

- [x] Una sola capa por repo. [x] Contrato: solo el mensaje interno `sa:fab`, mismo origen, sin datos sensibles — excepción aceptada por el PO (pregunta 1). [x] Sin esquema. [x] Sin auth. [x] Sin dependencias. [x] Sin ADR. [x] < 2 días.

## Checklist (tests primero)

- [x] T01-test: `resolveFabMenu` por vista (Home global, fallback, roadmap/módulo, ficha con y sin WhatsApp, coach con nav+separador+atajos) - FALLÓ: `no export named 'resolveFabMenu'`.
- [x] T01-impl: menús + cableado - `node tests/app-fab.mjs` PASA.

## Evidencia

| Tarea | Fase | Comando | Resultado observado |
|---|---|---|---|
| T01 | RED | `node tests/app-fab.mjs` | `does not provide an export named 'resolveFabMenu'` |
| T01 | GREEN | `node tests/app-fab.mjs` | `app-fab ok`; regresión `wa-share ok`, `home-counters ok`, `e2e-ops ok`. Visual integral: `visibleFabs: 1` en la pestaña Copiloto, FAB del iframe oculto, `nav-catalogo` abre el Catálogo dentro del iframe, `aria-current` sigue la pestaña del agente; menús distintos en Home, Roadmap y Ficha; cero errores de página. |

Excepcion TDD (solo si aplica): el puente DOM/iframe se valida con el recorrido visual automatizado; la resolución de menús y los comandos tienen prueba unitaria.

## TRUST 5 (alcance FTD)

- [x] Tested [x] Readable [x] Unified [x] Secured (postMessage valida `origin`; sin datos sensibles) [x] Trackable (commit citando este FTD)

## Siguiente

Hecho: desplegado con el corte 20261107u.
