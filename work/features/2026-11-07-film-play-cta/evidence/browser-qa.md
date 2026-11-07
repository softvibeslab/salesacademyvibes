# QA del botón de reproducción

Fecha: 2026-11-07. Suite: `growth/tests/film-play-browser.mjs`.

## Resultado

GREEN local: **12/12 casos**, código de salida 0, sin errores JavaScript no controlados. Chromium real con videos MP4 y subtítulos VTT, en `http://127.0.0.1:4191`. No se inició sesión en CMS ni se abrió WhatsApp.

| Fase | Evidencia | Resultado observado |
| --- | --- | --- |
| RED | `browser-red.txt`, `red/film-play-results.json` | V5 pública antes de implementar: faltaban los cinco botones; `0 !== 5`. Fallo funcional esperado, salida 1. |
| GREEN | `browser-green.txt`, `green/film-play-results.json` | 12 casos aprobados en el preview local, salida 0. |

## Comportamiento comprobado

- Los cinco reproductores ofrecen un botón semántico visible; no se solicita ningún MP4 antes de una interacción.
- Clic, Enter y Espacio reproducen; el foco pasa al video, desaparece el botón y continúa disponible el control nativo.
- Pausa y final de video restauran el botón; volver a reproducir tras el final inicia desde el principio.
- El audio no se silencia: `muted=false`, `volume=1`. Subtítulos en español: `mode=showing`, nueve cues cargados. Sin autoplay y con reproducción inline.
- Iniciar otro video pausa el anterior. MediaHub `/mediahub/smart-agent/` usa el mismo control y reproduce.
- `prefers-reduced-motion: reduce` elimina animaciones decorativas, manteniendo el botón disponible.
- Sin JavaScript, el botón mejorado permanece oculto y los controles nativos permiten reproducir y pausar.
- Un error de descarga expone la recuperación; reintentar tras restaurar la red reproduce y limpia el mensaje.

## Revisión visual

Se inspeccionaron `green/play-ready-1440.png` y `green/play-ready-390.png`. El botón de 190 × 162 px destaca sobre el póster, mantiene la identidad dorada y conserva libres los controles inferiores. No existe desbordamiento horizontal. También se guardaron `play-running-1440.png` y `play-running-390.png` para verificar la imagen sin overlay durante reproducción.

## Correcciones del instrumento de prueba

Las primeras ejecuciones GREEN detectaron dos lecturas prematuras del instrumento: el estado `paused` cambia antes de que el evento actualice el botón, y el tiempo existente al reanudar no demuestra avance nuevo. Se añadieron esperas al estado visible/oculto y al avance posterior a la interacción, sin cambiar expectativas. Además, `waitForFunction` usa por defecto `requestAnimationFrame`, que no ejecutaba su polling en el contexto sin JavaScript; se sustituyó por polling desde Node con evaluación del estado real del video. El diagnóstico sin JS observó `paused=false`, `currentTime=2.013`, `readyState=4`. Ninguna corrección requirió cambios del producto.

## Reproducir

```sh
GROWTH_PLAYWRIGHT_MODULE=/Users/rogergv/Documents/SoftvibesLab/SalesAcademyVibes/vcsAcademyMobile/node_modules/playwright GROWTH_E2E_URL=http://127.0.0.1:4191 GROWTH_EVIDENCE_DIR=work/features/2026-11-07-film-play-cta/evidence/green node growth/tests/film-play-browser.mjs
```

## Comprobación pública

Tras activar el release `20261107-film-play-04`, el smoke en `https://v5.salesacademy.softvibes.cloud/descubre/#vision` aprobó **2/2 viewports (1440 y 390 px)**, salida 0. El botón es visible, inicia reproducción real con audio y subtítulos en español, transfiere el foco al video, se oculta durante playback y reaparece al pausar mediante el control nativo. Cero solicitudes MP4 antes de la interacción, sin desbordamiento horizontal y sin errores JavaScript. No se abrió CMS ni WhatsApp.

Evidencia pública: `public-smoke.txt`, `public/smoke-results.json` y capturas `public/play-ready-1440.png`, `public/play-ready-390.png`, `public/play-running-1440.png`, `public/play-running-390.png`. Se inspeccionaron visualmente ambas capturas del estado inicial: el CTA conserva el diseño y deja libres los controles nativos.
