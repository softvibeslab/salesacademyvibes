# QA de navegador · versión IA/VSL

Fecha: 7 de noviembre de 2026. Ejecutado con Chromium/Playwright local. La prueba es `growth/tests/ai-vsl-browser.mjs`.

## RED observado

Contra la v4 preservada en `simulacion.localhost:4189`, antes de los cambios: el diagnóstico completado conservaba un enlace a `/descubre/#demo` y no existía `[data-vsl]` en el hero. Ambos requisitos fallaron funcionalmente; no hubo error de sintaxis ni de compilación. [Resultado RED](browser-red/ai-vsl-results.json).

## GREEN final

Ocho recorridos correctos en la demo `agentes.localhost:4190` y los mismos ocho en un servidor efímero con SQLite nuevo, mediante `python growth/tests/run_e2e.py --ai-vsl`.

1. VSL solicitada una sola vez, situada en el hero, controles/captions nativos y cinco películas totales; ninguna solicitud MP4 antes de acción.
2. Cinco capítulos; fotos y capturas dominantes cambian al avanzar y regresar; transformaciones cambian con el progreso. Se revisaron 31 posiciones, incluidas 24 transiciones a 980/1440px, sin solapamiento de copia con fotografía o dispositivo y sin overflow.
3. Preferencia manual persistida y `prefers-reduced-motion` conservan lectura lineal completa.
4. Móvil360/390 y escritorio1440, más móvil sin JavaScript, mantienen capítulos, VSL nativa y CTA WhatsApp.
5. Landing, mediahub, diagnóstico, guía de la jornada, análisis y galería usan el mismo número529843163268 y mensaje genérico exacto. Un clic fue interceptado y respondido localmente antes de red; nunca se abrió una conversación real ni se envió un mensaje.
6. VSL reproducida y pausada con teclado; archivo VTT local respondió200 con contenido WEBVTT.
7. Fallo de descarga provocado por QA muestra recuperación; al habilitar la ruta y pulsar Reintentar, vuelve la reproducción y desaparece el error.
8. Diagnóstico completado enlaza al WhatsApp genérico sin añadir respuestas ni valores al query.

[Resultado de demo](browser-green/ai-vsl-results.json) · [Resultado portable](portable-browser/ai-vsl-results.json).

## Transferencia medida, con contexto frío

| Medición | Antes de optimizar | Final |
|---|---:|---:|
| Cuerpos de recursos iniciales, sin video |1,095,110 bytes |726,074 bytes |
| Transferencia inicial reportada por ResourceTiming |1,104,110 bytes |735,074 bytes |
| MP4 antes de acción |0 bytes |0 bytes |
| Cuerpos acumulados tras recorrer capítulos, sin video |1,095,110 bytes |726,074 bytes |

El set de fotos/capturas del escenario sticky ya se carga al inicio; no se atribuye ahorro a una carga diferida que la medición no muestra. El ahorro observado es369,036bytes de cuerpos (≈33.7%). Los5.55MB de la VSL se transfieren después de la elección de reproducir. [Medición anterior](browser-before-optimization.json).

## Revisión visual

Inspeccionados hero desktop, capítulo método/práctica desktop, hero móvil390 y práctica móvil390 tras cargar imágenes. Las fotos optimizadas conservan detalle suficiente en el tamaño presentado; las pantallas permanecen legibles y las etiquetas distinguen captura, escena ilustrativa y pregunta propuesta. Los CTAs principales son visibles y alcanzan44px; el panel de consentimiento no cubre el CTA principal del hero.

La primera captura móvil se tomó antes de decodificar una imagen lazy y mostró un placeholder transitorio. Se corrigió únicamente la espera de QA: ahora se comprueba `complete && naturalWidth > 0` antes de la captura; no se cambió la aplicación para simular un resultado.

No se observaron errores JavaScript en la suite final. El error de red del recorrido de recuperación es intencional. Esta verificación es local en Chromium; no constituye auditoría completa de accesibilidad ni medición de Core Web Vitals en campo.
