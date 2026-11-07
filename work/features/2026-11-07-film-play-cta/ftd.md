# FTD · Botón destacado de reproducción

Fecha: 2026-11-07. Carril: FTD, frontend, petición y publicación autorizadas en la continuidad del sitio.

## Claridad

- **Solicitud:** «agrega un boton de play que llame la atencion para PELÍCULA CONCEPTUAL · SALES ACADEMY / Reproduce cuando quieras. Audio y subtítulos disponibles.»
- **Entendimiento:** botón destacado sobre el póster de las películas de V5, compartido en landing y detalle de recursos. Activa reproducción real por clic/Enter/Espacio; se retira al reproducir y reaparece al pausar/terminar. Mantener controles nativos y audio/subtítulos; no reproducción automática ni descarga MP4 previa al gesto.
- **Hecho cuando:** botón visible y accesible en móvil/escritorio, reproducción real por gesto, foco correcto, pausa/replay/errores recuperables, sin bloquear controles o subtítulos y versión publicada comprobada.

## Intencion

Hacer evidente que la película se puede reproducir, con el acento dorado existente y una animación discreta que respete movimiento reducido.

## Alcance

Frontend: growth/site/templates/macros.html, growth/site/assets/media-player.css y media-player.mjs. Sin contratos API, datos CMS, dependencias, cambios de autenticación ni activos de video nuevos. Actualizar únicamente V5 con release recuperable sobre 20261107-meet-greet-03. Mantener las versiones históricas.

## Checklist

- [x] T01-test: prueba de navegador antes de implementación, falla por ausencia de botón y comportamiento.
- [x] T01-impl: botón semántico y coordinación con eventos de video; misma expectativa en verde.
- [x] T02: comprobar teclado, pausa/final/retry, sin JS, reduced-motion, subtítulos y carga voluntaria.
- [x] T03: publicar release incremental y comprobar hashes HTTPS.

## Evidencia

Excepcion TDD: estilo puramente visual y configuración puntual de publicación se verifican mediante capturas, geometría y hashes; comportamiento de reproducción sí se prueba antes del código.

| Tarea | Estado | Comando | Resultado observado |
|---|---|---|---|
| T01 | RED | `FILM_PLAY_RED_ONLY=1 GROWTH_E2E_URL=https://v5.salesacademy.softvibes.cloud GROWTH_PLAYWRIGHT_MODULE=/Users/rogergv/Documents/SoftvibesLab/SalesAcademyVibes/vcsAcademyMobile/node_modules/playwright node growth/tests/film-play-browser.mjs` | Antes de implementar: 0 botones frente a 5 reproductores; falla por la ausencia esperada. evidence/browser-red.txt y evidence/red/film-play-results.json. |
| T01 | GREEN | `GROWTH_E2E_URL=http://127.0.0.1:4191 GROWTH_PLAYWRIGHT_MODULE=/Users/rogergv/Documents/SoftvibesLab/SalesAcademyVibes/vcsAcademyMobile/node_modules/playwright node growth/tests/film-play-browser.mjs` | 12/12 casos aprobados, cero errores de navegador. evidence/browser-green.txt y evidence/green/film-play-results.json. |
| T02 | GREEN | `/private/tmp/salesacademy-growth-venv/bin/python -m unittest growth.tests.test_videos growth.tests.test_ai_campaign -v` | 16 pruebas existentes aprobadas. evidence/template-tests.txt. |
| T02 | GREEN | `node --check growth/site/assets/media-player.mjs` | Exit 0, sintaxis válida. |

Se verificó reproducción real, avance del tiempo, audio sin silenciar, subtítulos ES cargados, foco en controles nativos, pausa, final, replay, exclusión entre películas, MediaHub, fallo de carga y reintento. Resoluciones: 1440 y 390 px, sin overflow ni cobertura de los controles inferiores. Cero descargas MP4 antes del gesto; movimiento reducido desactiva la animación decorativa. Sin JavaScript se mantienen los controles nativos y el botón adicional oculto.

Durante QA se corrigió la sincronización de la prueba: esperar el evento visual tras pausa/play y observar avance nuevo del tiempo, no una posición anterior. Para el caso sin JS se sustituyó el polling requestAnimationFrame de Playwright por consultas periódicas desde Node, tras observar reproducción nativa correcta. No se redujeron expectativas ni se cambió el producto para esos ajustes. Detalle: evidence/browser-qa.md.

## Publicación

- Activo: `/srv/salesacademy-cloud/releases/20261107-film-play-04`; anterior recuperable: `20261107-meet-greet-03`.
- Solo se reemplazaron los tres archivos frontend previstos, verificando hashes del release anterior, del paquete y del candidato; reinicio exclusivo de `salesacademy-cloud@v5.service`.
- Manifiesto SHA256: `d11c270db12d6e72c56bb0e93b4243b385c274c60c9cd5e01c7530b4081b0413`.
- Evidencia: evidence/patch.json, evidence/package.json, evidence/deploy-result.json, evidence/public-http.json y evidence/service-health.txt.
- URL: https://v5.salesacademy.softvibes.cloud/descubre/#vision.
- Rollback: apuntar atómicamente `/srv/salesacademy-cloud/current` al release `20261107-meet-greet-03` y reiniciar solo V5. No se modificó estado editorial.

## TRUST 5

| Dimensión | Evidencia |
|---|---|
| Tested | RED → GREEN observado; 12 casos de navegador y 16 pruebas existentes aprobados. Capturas móvil/escritorio revisadas y reproducción real comprobada. |
| Readable | Botón HTML semántico con nombre accesible; estados controlados por eventos nativos de video; documentación en español. |
| Unified | Macro y módulo existentes compartidos por landing y MediaHub; colores existentes, sin dependencias ni contratos nuevos. |
| Secured | Reproducción por gesto, HTML escapado por plantilla, cero secretos o lecturas de datos privados; publicación limitada a tres rutas y hashes verificados. |
| Trackable | Petición citada antes del código, pruebas, paquete, manifiesto y release recuperable guardados en esta feature. |

## Siguiente

Entrega completada. Smoke público aprobado en 1440 y 390 px: reproducción real con audio y subtítulos, foco, pausa y botón visibles según estado; sin errores ni overflow. Evidencia: evidence/public-smoke.txt y evidence/public/smoke-results.json. Índice y cinco versiones responden HTTP 200, hashes CSS/JS coinciden y los cinco servicios siguen activos. Gate de gobernanza: evidence/verify-governance.txt.
