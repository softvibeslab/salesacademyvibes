# FTD: `sugerencias-discretas`

**Status:** done
**Lane:** FTD
**Author:** `RogerDevAndroid`
**Branch:** `release/completo-20261107`
**Date:** `2026-11-07`
**Ticket:** `Ajuste pedido por el PO (2026-11-07): «las sugerencias del agente de Hermes que no digan que son de Hermes y que sean más pequeñas y menos intrusivas»`

## Claridad

- **Solicitud:** las sugerencias proactivas del chat no se presentan como «de Hermes» y ocupan menos espacio.
- **Entendimiento:** hoy cada sugerencia es una tarjeta de ~120 px con el rótulo «Hermes sugiere», título, texto y un botón («Abrir», «Practicar», «Pedir a Hermes»). Cambio: cada sugerencia pasa a ser una píldora de una sola línea (punto dorado + título + flecha), del mismo alto que las burbujas de inicio; toda la píldora es el botón y el detalle queda como texto accesible (`title`/`aria-label`). Sin la palabra «Hermes» en el rótulo, en los botones ni en el `aria-label` del contenedor. Las reglas de qué sugerir (`proactiveTips`) no cambian.
- **Hecho cuando:** el HTML de las sugerencias no contiene «Hermes», cada sugerencia es un solo `<button class="tip">` de una línea y en el navegador el bloque de sugerencias mide ≤ 44 px de alto.

| # | Pregunta | Respuesta | Estado |
|---|---|---|---|
| — | Sin preguntas | — | — |

## Intencion

Que las sugerencias proactivas acompañen sin interrumpir: discretas, de una línea y sin presentarse como «Hermes».

## Alcance

- Incluye: render de sugerencias (`src/skills/proactive.js` `tipsHTML`, `src/app.js` `renderTips`), `index.html` (`aria-label`) y estilos `.tip` del Copiloto.
- No incluye: el resumen del día ni las respuestas del chat (siguen firmadas por Hermes); las reglas de sugerencias.
- Capa: frontend (Copiloto).

## Escalamiento

- [x] Una capa · [x] Sin contrato · [x] Sin esquema · [x] Sin datos sensibles · [x] Sin dependencias · [x] Sin ADR · [x] < 2 días

## Checklist (tests primero)

- [x] T01-test `tipsHTML` sin «Hermes», una píldora `<button class="tip">` por sugerencia - FALLÓ: `tipsHTML is not a function`; luego atrapó `data-testid="hermes-tip"`.
- [x] T01-impl `tipsHTML` + `renderTips` + estilos; testid renombrado a `tip` - 85/85.
- [x] T02 verificación en navegador: bloque de 36 px (antes ~130), píldoras de 30 px, clic abre Hoy y pregunta al modelo.

## Evidencia

| Tarea | Fase | Comando | Resultado observado |
|---|---|---|---|
| T01 | RED | `node --test tests/proactive.test.mjs` | `TypeError: tipsHTML is not a function` |
| T01 | RED | `node --test tests/*.test.mjs` | `doesNotMatch /hermes/i`: el HTML traía `data-testid="hermes-tip"` |
| T01 | GREEN | `node --test tests/*.test.mjs` | `pass 85 fail 0` |
| T02 | GREEN | Playwright integración app + API + puente + Hermes simulado (390×844 a las 11:05 y 1440×900 a las 08:15) | `tipsBox: 36`, `tipHeights: [30,30,30]`, `hermesWord: false`, `afterGo: "hoy"`, la píldora «Tu tour de 11:30…» pregunta al modelo; sin errores de consola |
| — | GREEN | `node tests/e2e.mjs` | `17/17 PASS` |

## Decisiones

- El rótulo «Hermes sugiere» y los botones se quitan; la píldora entera es el botón. El detalle queda en `title` y `aria-label` (lector de pantalla y tooltip en escritorio).
- Ancho máximo 300 px: dentro del carrusel la píldora puede ocupar el margen reservado del botón flotante, así no se corta la hora del tour.
- El resumen del día y las respuestas del chat siguen firmadas por Hermes (fuera de alcance).

## TRUST 5

- [x] Tested (85 unit, 17 e2e, integración) [x] Readable [x] Unified (tokens del tema) [x] Secured (texto escapado, probado) [x] Trackable (este FTD)

## Siguiente

Desplegar y verificar en vivo.
