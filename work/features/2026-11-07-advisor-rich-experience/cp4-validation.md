# CP4 · Validación

## Evidencia RED → GREEN

| Tarea | Estado | Comando | Resultado observado |
|---|---|---|---|
| T01 brevedad y recursos | RED | python -m unittest growth.tests.test_advisor -v | Cinco fallos esperados: ausencia de sugerencias, tres recursos y respuestas de 140/134 palabras. evidence/backend-red.txt. |
| T01 perfil declarado | RED | Misma suite ampliada | Cinco fallos: consultas o negaciones se confundían con perfil y una respuesta sobre salas perdía el tema previo. evidence/backend-profile-red.txt. |
| T01 backend | GREEN | Misma suite | 26 pruebas aprobadas, incluyendo respuestas largas, detalle íntegro, recursos publicados, contexto y compatibilidad. evidence/backend-green.txt. |
| T02 controles | RED | node growth/tests/advisor-rich-browser.mjs | No existían los controles dinámicos esperados en la versión pública anterior. evidence/frontend-red.txt. |
| T02 cierre | RED | Misma suite ampliada | Pausa del video diferida al evento close; la prueba exige pausa inmediata. evidence/frontend-close-red.txt. |
| T02 caché antigua | RED | ADVISOR_LEGACY_ONLY=1 node growth/tests/advisor-rich-browser.mjs | Respuesta antigua de más de 90 palabras aparecía completa en la vista principal. evidence/frontend-legacy-red.txt. |
| T02 frontend | GREEN | node growth/tests/advisor-rich-browser.mjs | 22 comprobaciones aprobadas en 1440/390/360px; vista legacy breve y detalle original, controles y medios seguros. evidence/frontend-green.txt y evidence/frontend/results.json. |

Excepcion TDD: la redacción del perfil, documentación y despliegue son configuración y operación. Se validaron por revisión, sintaxis, hashes, permisos, salud y dos inferencias reales. Los comportamientos de backend y navegador tienen evidencia RED → GREEN.

## Regresión e integración

- Suite Python completa: **90/90**, evidence/python-suite.txt.
- Node diagnóstico, journey y asesor: **20/20**, evidence/node-suite.txt.
- Regresión original de navegador: **18/18**, evidence/frontend-regression/results.json.
- Integración real Flask/SQLite efímeros con modelo determinista: **5/5**, evidence/integration/results.json. Incluye sesión/CSRF, guardado consentido, separación de visitantes, owner y editor.
- Artefactos: 106 archivos y 36 rutas, sin problemas, evidence/artifacts.json.
- JSON Schema: 39 schemas Draft 2020-12 válidos, seis payloads positivos y cuatro negativos comprobados, evidence/backend-schema-validation.txt. No es una certificación semántica completa de OpenAPI. El gate de rutas comprueba ambos endpoints del contrato contra una proyección YAML de paths del JSON, evidence/openapi-paths.txt; el lector shell del marco no interpreta correctamente las comillas JSON.

## Legibilidad y medios

Colores computados en landing, MediaHub y galería: texto ≥4.5:1. Controles con altura mínima de 44px; límites medidos ≥3:1 frente al fondo adyacente. Tipografía principal de 14px en escritorio y 16px en móvil, secundarios de al menos 12px. Teclado y foco visibles, incluido outline de 3px con halo blanco. Evidencia: frontend/results.json, control-contrast.json y contrast-controls.json. Revisión visual de capturas locales y públicas; no se presenta como auditoría WCAG completa.

Antes de pulsar play no hay descargas MP4. Video con controles nativos, audio y VTT español; pausa al cerrar, cambiar de pestaña, ocultar el documento, iniciar otra película o enviar otra pregunta. Se reutilizan cinco piezas únicas de seis adjuntos; no se regeneró ni alteró el original. Las tarjetas conservan la etiqueta conceptual y solo usan recursos publicados.

## Publicación e inferencia real

Release activo: **20261107-advisor-rich-07**, anterior **20261107-advisor-links-06**. Cuatro archivos de V5 y dos copias del mismo SOUL actualizados. Solo V5 se reinicia; el perfil se lee por solicitud. No hay migración ni cambio de credenciales. Manifiesto SHA256: 0d92c266d0215f1129fc732583535e752ee95cb65b9110d784ffa6b0685fabf1.

Smoke público: **14/14** en escritorio 1440px y móvil 390px. Dos inferencias reales de Hermes devolvieron respuestas de **64 y 62 palabras**, con sugerencias nuevas y recursos pertinentes. Reproducción con audio/subtítulos y pausa comprobadas; cero solicitudes de lead y cero aperturas de WhatsApp. Sin errores JS. evidence/public/results.json y capturas public/.

Se verificaron los 326 archivos del manifiesto, SHA y permisos de ambas SOUL, cinco servicios Cloud y timers/bridge del asesor. Hermes gateway y Copiloto anteriores activos. evidence/live-verification.json y existing-services.txt. Reversión preparada y revisada; no se provocó un fallo en producción. evidence/deployment-review.md y deployment.json.

## TRUST 5

| Dimensión | Evidencia |
|---|---|
| Tested | RED/GREEN, suites completas, integración con datos sintéticos, contraste y smoke real. |
| Readable | Texto breve, controles claros, detalle completo voluntario y documentación en español. |
| Unified | Reutiliza Flask/Jinja/CMS, catálogo audiovisual y formulario existentes; sin nuevas dependencias. |
| Secured | Texto escapado, acciones permitidas, rutas de medios verificadas, contenido publicado, consentimiento y aislamiento conservados; sin secretos exportados. |
| Trackable | Historia LISTA antes del código, CP0–CP5, ADR, evidencias, manifiesto y publicación recuperable. |

Gate final de gobernanza: evidence/verify-governance.txt.
