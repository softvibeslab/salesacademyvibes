# Revisión de privacidad de las referencias

Fecha: 8 de noviembre de 2026. Alcance: manifiesto de 49 archivos, código de los runners que produjo las capturas sensibles a contexto, evidencia editorial de procedencia y metadatos PNG. No se abrió ninguna sesión CMS, credencial, base de producción ni conversación real. Esta revisión no vuelve a certificar visualmente cada píxel de las 49 imágenes.

## Resultado

No se identificaron secretos ni datos privados de negocio en el material seleccionado. El contenido es interfaz pública, demo ya publicada o evidencia de QA con datos sintéticos. Las cuatro referencias CMS **sí muestran alias de cuentas de pruebas**; no son cuentas de producción ni credenciales utilizables. Si se exige una entrega sin ningún alias visible, esas cuatro capturas se pueden omitir del upload y recrear visualmente desde DESIGN.md; no se retocaron para esconder su procedencia.

## Procedencia comprobada

| Grupo | Archivos | Evidencia |
|---|---:|---|
| Público | 16 | Landing, recursos, diagnóstico, análisis y galería del módulo público. Capturas de regresión local; resultados orientativos y escenas simuladas. |
| Asesor | 8 | Smoke público con preguntas y horario sintéticos; el runner bloquea lead y WhatsApp. No guardó prospectos ni envió mensajes. |
| CMS · Inicio | 2 | `growth/tests/run_e2e.py` crea usuarios efímeros `e2e-owner` y `e2e-editor` con contraseña aleatoria de proceso; `e2e-cms.mjs` captura el dashboard después del login, sin el campo de contraseña en pantalla. |
| CMS · editor video | 1 | `growth/tests/run_video_cms.py` crea usuario efímero `video-owner`; `e2e-video-cms.mjs` captura el formulario de contenido publicado de prueba. No captura la contraseña ni tokens. |
| CMS · solicitudes asesor | 1 | `run_advisor_integration.py` usa almacenamiento temporal. `advisor-integration-browser.mjs` rellena «Persona de prueba» y `prueba@example.invalid` antes de capturar el owner. No es un prospecto real. |
| App operativa demo | 16 | Capturas ya incorporadas en la galería pública. El inventario y README de room-scenarios declaran sus datos de ejemplo; Meet & Greet es la presentación retocada aportada y aprobada. |
| Posters | 5 | Derivados públicos de películas conceptuales ya autorizadas. |

Los nombres de los personajes de los escenarios son ficticios. Las cifras o nombres presentes en la demo no acreditan desempeño comercial ni registros reales. El teléfono de Chris es el contacto comercial que el usuario autorizó publicar y usar en los CTA.

## Archivos y metadatos

- Todas las copias siguen coincidiendo byte a byte con los hashes de `reference-manifest.json`.
- El ZIP contiene únicamente las 49 imágenes y el manifiesto de procedencia, sin HTML de sesión, storageState, cookies, `.env`, claves, logs o bases de datos.
- Ningún PNG seleccionado contiene chunks `tEXt`, `zTXt`, `iTXt` o `eXIf`; resultado en `numbering-validation.json`.
- Los cinco WebP son posters públicos existentes; esta revisión no afirma un escaneo completo de todos sus posibles metadatos binarios.
- No se han alterado imágenes originales ni sus copias para esta revisión.
