# FTD: `responsive`

**Status:** done
**Lane:** FTD
**Author:** `RogerDevAndroid`
**Branch:** `release/demo-pruebas-20261107`
**Date:** `2026-11-07`
**Ticket:** `Pedido del PO (2026-11-07): «analiza toda la app y hazla responsiva par[a cualquier dispositivo]»` (mensaje cortado; se asumió teléfono, horizontal, tablet y escritorio)

## Claridad

- **Solicitud:** revisar toda la app y que se adapte a cualquier pantalla.
- **Entendimiento (auditoría en 6 tamaños: 360×740, 390×844, 844×390, 768×1024, 1024×768, 1440×900; app y tablero):**
  1. Tablet y escritorio: columna fija de 560 px con dock de teléfono y espacio vacío.
  2. Celular horizontal: barra superior, aviso y dock dejaban ~150 px de contenido.
  3. Celular chico: en «Tours de hoy» el lead se partía y «Sin resultado» quedaba cortado.
  4. Tablero en celular: el encabezado apilaba 4 botones (~200 px).
  5. App instalada en iPhone: sin márgenes para notch y barra de inicio.
- **Arreglo:** ancho completo con contenido centrado (`--content` por vista); con ≥ 960 px o celular horizontal el dock pasa a barra lateral (con etiquetas a ≥ 1200 px); Hoy en dos columnas a ≥ 1200 px; Recursos y Roadmap en cuadrícula automática; Perfil con indicadores 4 por fila; login dividido (foto | formulario) a ≥ 960 px; filas de tours que bajan de línea; `viewport-fit=cover` + `env(safe-area-inset-*)`; aviso de instalar en una fila; encabezado del tablero en filas compactas; Copiloto embebido con ancho máximo de lectura (900 px).
- **Hecho cuando:** sin desbordes horizontales ni errores en los 6 tamaños, en claro y oscuro, y sin regresiones.

| # | Pregunta | Respuesta | Estado |
|---|---|---|---|
| 1 | ¿Qué dispositivos? | Mensaje cortado; supuesto: todos (teléfono, horizontal, tablet, escritorio) | Respondida |

## Alcance

- Incluye: `styles.css`/`agenda.css`, envoltorios `home-grid`/`res-grid`/`mods-grid` y `has-dock`/`data-view` en `agenda.js`, reserva del FAB según barra lateral, `index.html`, `ops/index.html`, `ops/ops.css`, `copiloto-rep/styles.css`.
- No incluye: rediseño de contenidos.
- Capa: frontend.

## Escalamiento

- [x] Una capa · [x] Sin contrato · [x] Sin esquema · [x] Sin datos sensibles · [x] Sin dependencias · [x] Sin ADR · [x] < 2 días

## Checklist (tests primero)

- [x] T01-test auditoría `responsive-audit.mjs` antes del cambio - FALLÓ: columna de 560 px en 4 de 6 tamaños, tours cortados a 360 px, encabezado del tablero de ~200 px.
- [x] T01-impl CSS + envoltorios - auditoría limpia.

## Evidencia

| Tarea | Fase | Comando | Resultado observado |
|---|---|---|---|
| T01 | RED | Playwright `responsive-audit.mjs` (9 vistas × 6 tamaños + tablero) | `phoneW: 560` en horizontal/tablet/escritorio; capturas: dock de teléfono en 1440 px, ~150 px útiles en 844×390, «Sin resultado» cortado y lead partido en 360 px, encabezado del tablero apilado |
| T01 | GREEN | Playwright `responsive-audit.mjs` + `resp-dark.mjs` | ancho completo en todos; barra lateral en 844×390, 1024×768 y 1440×900; Hoy en 2 columnas, Recursos 4 columnas, Roadmap 2 columnas en tablet, Perfil 4 indicadores; login dividido; tours sin cortes en 360 px; tablero en 3 filas compactas con todos los botones visibles; claro y oscuro; 0 errores; único desborde = carrusel de Atajos (intencional) |
| REG | GREEN | suites app + Copiloto | app-fab, e2e-ops, fichas, home-counters, install, ops-brand, theme, wa-share ok; Copiloto 74 pass, e2e 17/17 |

Excepcion TDD: cambio de maquetación (CSS); validado con auditoría automatizada en navegador real antes y después.

## TRUST 5

- [x] Tested [x] Readable [x] Unified [x] Secured [x] Trackable

## Siguiente

Prueba en dispositivos reales (iPhone instalada, Android, iPad). Siguiente: fase 3.
