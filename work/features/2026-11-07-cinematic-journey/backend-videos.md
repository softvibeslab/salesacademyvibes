# Evidencia de integración audiovisual y CMS

Fecha: 2026-11-07. Contrato: [CP2](cp2-spec.md). Implementación y comprobaciones locales; no se modificaron SQL, autenticación, permisos ni endpoints productivos.

## Resultado

Los cinco clips únicos son seleccionables desde el editor de recursos y se reproducen mediante controles nativos. `videoId` es opcional y compatible con los documentos anteriores. Guardar, vista previa, publicar, archivar y recuperar revisiones utilizan los flujos existentes. Los archivos son activos públicos curados; el estado del recurso regula aparición editorial, no confidencialidad del archivo.

`videos.py` carga un único catálogo JSON y rechaza estructura, identificadores, rutas, duración, dimensiones o captions incompatibles con CP2. Un catálogo faltante produce un error de despliegue explícito; no se sustituye por un catálogo vacío. El campo editorial selecciona IDs exactos y nunca se usa para construir una ruta de disco.

El catálogo se entrega por contexto Jinja y un bloque JSON inerte escapado en el CMS. No hay endpoint nuevo, dependencia nueva ni subida general de MP4. El validador externo de YouTube/Vimeo permanece intacto. Una fuente local y una externa simultáneas reciben400 y conservan revisión y formulario.

## RED → GREEN observado

| Comportamiento | Fase | Comando | Resultado observado |
|---|---|---|---|
| Campo opcional, selección local, editor/preview/publicación, restore antiguo y catálogo CMS | RED | `python -m unittest growth.tests.test_videos -v` | 7 tests ejecutados, 10 fallos incluyendo subtests; claves rechazadas, guardado400 en lugar de201 y catálogo/player ausentes. Sin fallos de importación o sintaxis. [Salida](evidence/videos-red.txt) |
| Mismos comportamientos tras implementación | GREEN | Mismo comando | Primer bloque7/7 correcto. Suite ampliada final11/11 correcta. [Salida final](evidence/videos-green.txt) |
| La portada del CMS debe prevalecer también en el poster del reproductor | RED | `python -m unittest growth.tests.test_videos.CuratedVideoContract.test_cms_cover_takes_priority_over_curated_poster -v` | El test encontró el poster de colección en el player pese a `coverId`; tarjeta ya correcta. [Salida](evidence/video-cover-red.txt) |
| Prioridad de portada y regresión audiovisual | GREEN | `python -m unittest growth.tests.test_videos -v` | 11 pruebas correctas tras aplicar la portada al player y evitar imagen duplicada en detalle. [Salida](evidence/videos-green.txt) |
| Regresión Python existente más audiovisual | GREEN | `python -m unittest discover -s growth/tests -p 'test_*.py' -v` | 47 pruebas correctas. Ejecutado antes del ajuste final acotado de poster; las11 audiovisuales se repitieron después. [Salida](evidence/backend-regression.txt) |

Las pruebas adicionales de catálogo, MIME/Range y prioridad de imagen amplían regresión después del primer ciclo. No se presenta cada nueva aserción como un ciclo RED independiente. El error de prioridad del player sí tiene su reproducción RED separada.

Python utilizado: `/private/tmp/salesacademy-growth-venv/bin/python`. Los tests usan SQLite y directorios temporales propios; no leen ni modifican cuentas o contenido de las vistas entregadas. Sintaxis de `cms.mjs`, `media-player.mjs`, el runner y las plantillas comprobada durante integración.

## Cobertura ejecutada de servidor

- `videoId` ausente/null y restauración de documento antiguo aceptados.
- Cinco IDs curados aceptados para video. ID desconocido, URL, traversal, vacío, número, bool, array y objeto rechazados.
- Selección local en formato guía/audio y fuentes simultáneas rechazadas. Publicar audiovisual sin fuente sigue rechazado.
- Editor guarda y previsualiza con headers privados; no puede publicar. Owner publica. Un nuevo proceso de aplicación recupera el clip persistido.
- Borradores y archivados no aparecen en el hub o detalle público. Restaurar no publica automáticamente.
- Portada CMS prevalece sobre poster de colección en tarjeta y player; no queda overlay tipográfico en la tarjeta audiovisual.
- Los cinco MP4 responden `206`, `video/mp4`, `Content-Range` y64bytes a una petición `bytes=0-63`. Los posters responden `image/webp`; captions, `text/vtt`. Asset desconocido y traversal devuelven404.
- Catálogo ausente, ruta externa o con traversal, caption faltante, audioKind incompatible, dimensión bool, duraciónNaN/cero, ID adulterado y campo extra se rechazan.

## Chromium: recorrido CMS y recuperación del player

Runner entregado: `growth/tests/run_video_cms.py` y `growth/tests/e2e-video-cms.mjs`. Usa Flask/SQLite reales en puerto loopback libre, contraseña sintética generada al arrancar y timeout90s. La ruta `/qa-films/` existe únicamente dentro del runner como fixture de componente; no se añadió a la fábrica del producto ni a OpenAPI.

```sh
GROWTH_PLAYWRIGHT_MODULE=/ruta/a/node_modules/playwright \
GROWTH_EVIDENCE_DIR=work/features/2026-11-07-cinematic-journey/evidence \
growth/.venv/bin/python growth/tests/run_video_cms.py
```

El runner se volvió a ejecutar desde sus archivos portables entregados. Resultado: seis comprobaciones completas. [JSON](evidence/cms-video-browser.json), [salida](evidence/cms-video-browser-log.txt), [CMS móvil](evidence/cms-video-mobile.png).

1. Selector con cinco clips y opción vacía; estado sucio, guardado, preview privada y publicación explícita correctos.
2. Conflicto de fuente local/externa muestra error y conserva valores del formulario y revisión del servidor.
3. Reasignación de clip a390px se guarda y publica, sin desbordamiento horizontal.
4. Recuperación desde historial de una versión sin `videoId`, sin cambiar el público hasta publicar otra vez.
5. Dos reproductores H264 reales: iniciar el segundo pausa el primero.
6. Interrupción deliberada de la petición MP4: aparece error legible; al restaurar la conexión, el botón Reintentar recupera reproducción y retira el error.

El primer intento de prueba de navegador consultaba `count()` antes de que terminara la carga asíncrona del editor; se corrigió el runner para esperar el selector visible, sin modificar producto. La simulación de fallo de fuente tampoco espera indefinidamente la promesa de `play()` que Chromium puede dejar pendiente cuando falla un `<source>`; espera el mensaje de error observable. El runner tiene además un límite global90s. Esas correcciones son del test, no cambios de expectativa funcional.

## Interfaz compartida con el recorrido

`{% from 'macros.html' import video_player with context %}` permite `{{ video_player(r) }}`. El wrapper es `.film-player[data-film-player]`; contiene video nativo con `controls`, `playsinline`, `preload="none"`, dimensiones, poster y captions españoles. El HTML permite reproducir sin JavaScript. `media-player.mjs` coordina pausa exclusiva, pausa al ocultar la pestaña y recuperación de errores; no inicia audio por su cuenta. `media-player.css` conserva ancho adaptable y foco visible.

La carga inicial, reproducción desde la landing, reduced-motion y recorrido continuo se verifican en la QA cinematográfica de integración del responsable principal. Esta evidencia no sustituye esa comprobación ni certifica todos los navegadores o accesibilidad global. Los subtítulos y fidelidad de transcripción pertenecen al análisis audiovisual, no se deducen de tener un track técnicamente válido.
