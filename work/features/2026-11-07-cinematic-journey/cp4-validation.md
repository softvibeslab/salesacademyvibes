# CP4 · Validación local ejecutada

**Estado:** verificación funcional, visual, gobierno y entrega local completados.
**Fecha:**2026-11-07.

## Evidencia TDD

| Tarea | Fase | Comando | Resultado observado |
|---|---|---|---|
| T01/T02 contrato audiovisual | RED | `python -m unittest growth.tests.test_videos -v` |7 tests iniciales produjeron10 fallos funcionales: campo rechazado, selector/player ausentes; [log](evidence/videos-red.txt) |
| T01/T02 contrato audiovisual | GREEN | mismo comando, suite ampliada |11 tests correctos: validación, fuentes excluyentes, catálogo, draft/publish, restore anterior, poster yRange; [log](evidence/videos-green.txt) |
| Portada CMS en player | RED | test específico de portada |1 fallo: el player conservaba poster de colección al elegir una portada CMS; [evidencia](evidence/video-cover-red.txt) |
| Portada CMS en player | GREEN | suite audiovisual |Portada elegida prioritaria; 11 tests correctos |
| T03 progreso | RED | `node --test growth/tests/journey.test.mjs` |6 fallos y1 pass contra scaffold válido: no avanzaba, no calculaba límites/retorno ni geometría desigual; [log](evidence/journey-red.txt) |
| T03 progreso | GREEN | mismo comando |7 tests correctos sin cambiar expectativas; [log](evidence/journey-green.txt) |
| T04 experiencia | RED | `node growth/tests/cinematic.mjs` contra v2 preservada |Fallo esperado: el recorrido no existía (0 frente a1); [log](evidence/cinematic-red.txt) |
| T04 experiencia | GREEN | `python growth/tests/run_e2e.py --cinematic` |5 recorridos correctos: escena persistente, avance/retroceso, motion preferences, reproducción/captions/carga, móvil/noJS; [resultado](evidence/cinematic-results.json) |

Excepcion TDD: composición visual, copy, documentación, transcodificación y configuración de empaquetado se inspeccionaron visualmente/por metadatos. La lógica de progreso, contrato videoId y asociación/reproducción tienen RED→GREEN. No se inventa un RED por cada ajuste de CSS.

## Gates ejecutados

| Comprobación | Resultado | Evidencia |
|---|---|---|
| Regresión Python completa |47 tests correctos; los11 audiovisuales incluidos. Tras refinar prioridad de portada se volvió a pasar la suite audiovisual |[log](evidence/backend-regression.txt), [detalle](backend-videos.md) |
| JavaScript diagnóstico y progreso |14 tests correctos |[log](evidence/javascript-tests.txt) |
| Regresión navegador HTTP/SQLite real |15 recorridos completos correctos, sin errores JS |[resultado](evidence/e2e-results.json) |
| Navegador audiovisual/CMS |6 comprobaciones correctas: edición, preview/publicación, fuentes conflictivas, móvil, restore histórico, exclusividad y recuperación real del player |[resultado](evidence/cms-video-browser.json) |
| Reflujo y presupuesto |Teclado, skip/foco, CTA 44 px, reducedmotion, rutas públicas/CMS y 720CSSpxDPR2; recursos completos de landing sin MP4≈462 KB, bajo500 KB |[resultado](evidence/browser-quality.json) |
| Accesibilidad dirigida | 1270 observaciones de texto y 209 de foco, sin fallos finales/nombres vacíos; player ytoggle por teclado |[informe](evidence/a11y-v3.md) |
| Medios |5 decodificaciones completas, faststart, codecs, dimensiones/duración y VTT ordenados;6 hashes originales intactos |[validación](evidence/media/derivative-validation.json) |
| Compilación/sintaxis/artefactos |Compilación Python, sintaxis 6 módulos JS;59 archivos fuente,8 recursos,31 rutas OpenAPI sin problemas |[artefactos](evidence/artifact-check.json) |
| Historia aprobada de la iniciativa |Gate LISTA; el incremento actual está citado en CP0 como solicitud explícita del usuario |[salida](evidence/verify-story.txt) |
| Acceso local entregado |Landing, mediahub yCMS responden 200 con host separado salesacademy.localhost:4188 |[evidencia](evidence/preview-access.json) |

Los comandos Python usan `/private/tmp/salesacademy-growth-venv/bin/python`; Node24.15 y Playwright existente. Los runners crean cuentas sintéticas, puertos locales efímeros y datos temporales; no utilizan la cuenta del usuario ni la instancia de revisión. La suite audiovisual portable se volvió a ejecutar desde `growth/tests/run_video_cms.py` tras versionarla.

## Correcciones y decisiones de QA

- La escena inicialmente podía cruzar el texto al cambiar de lado. Se mantuvo el dispositivo en la mitad derecha, con variaciones de elevación/rotación/escala, y se acortó el fundido entre interfaces. Se revisaron posiciones intermedias y estables, además de móvil.
- Se reforzaron el foco del salto al contenido y el rail de películas. Un detector señaló el texto fallback interno de video: Chromium no lo renderiza con soporteHTML5; se excluyó ese falso positivo, conservando controles y mensajes de error realmente visibles.
- El primer test CMS consultaba el selector antes de terminar la carga de medios. Se añadió espera explícita por el control visible, sin cambiar el producto ni relajar la expectativa.
- La regresión de filtros usa el conteo de recursos publicados del seed, porque ahora hay8 recursos, no3. Los controles de filtrado/vacío siguen verificados.
- El presupuesto incluye los cinco posters y el módulo importado de matemáticas; los22.63MBde video se reportan aparte. Los tests verificaron cero solicitudes MP4 antes de acción, no se dedujo solo del atributo preload.

## TRUST 5

La composición final se verificó con 24 observaciones a 980 y 1440 px, en transición y tras estabilizar: separación mínima 46.41 px entre texto y todos los dispositivos visibles, sin solapamientos ni desbordamiento. [Informe y capturas finales](evidence/visual-final.md).

| Dimensión | Evidencia |
|---|---|
| Tested |61 pruebas de módulos,15 recorridos previos, 5 nuevos del viaje y 6 de CMS/video, además de revisión visual/accesible |
| Readable |Casos de uso, fuentes separadas, documentación española, identificadores ingleses; controles de error/pausa claros |
| Unified |Campo opcional y catálogo cerrado, rutas y SQL conservados; contrato/OpenAPI/ADR alineados; sin dependencia nueva |
| Secured |Selección por ID conocido, rutas de catálogo validadas, roles/CSRF/sesiones conservados, cuentas/datos fuera del código; sin cargas externas |
| Trackable |Petición citada, historia aprobada, CP0–CP5, análisis de 6 archivos, duplicado/hash, v2 preservada y paquete con manifiesto |

## Límites

El gate de gobierno estricto terminó correctamente usando el paquete fuente y la feature externa del producto, sin modificar el marco: [salida](evidence/verify-governance.txt). El ZIP pasó prueba de integridad y hashes del manifiesto; incluye las cinco películas, posters, VTT y transcripciones, sin bases ni credenciales. La v2 se conserva idéntica a su ZIP original y el catálogo mantiene 46 entradas: [comprobación](evidence/delivery-check.json). El manifiesto final queda junto al ZIP en `growth/dist/delivery-manifest-v3.json`.

Verificación local en Chromium, no certificación WCAG ni cobertura de todos los navegadores. La simulación de 200% usa 720 píxelesCSS y DPR2; no sustituye una auditoría con todos los dispositivos. Subtítulos automáticos corregidos editorialmente, sin afirmar transcripción manual perfecta. El peso gzip es estimado, no Core Web Vitals de campo. Los videos muestran visión conceptual y la demo datos de ejemplo. No hay resultados comerciales acreditados ni despliegue público.
