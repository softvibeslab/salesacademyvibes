# CP4 · Validación

## Evidencia RED → GREEN
| Tarea | Estado | Comando | Resultado observado |
|---|---|---|---|
| T01 API | RED | python -m unittest growth.tests.test_advisor -v | 12 fallos esperados HTTP404 por rutas ausentes; evidence/backend-red.txt. |
| T01 API | GREEN | python -m unittest growth.tests.test_advisor growth.tests.test_backend -v | 36 pruebas aprobadas tras ampliar cobertura; evidence/backend-final-green.txt. |
| T01 bordes | RED | Suite advisor ampliada | Recurso final fuera de contexto y carrera de reintento duplicaban inferencia; evidence/backend-edge-red.txt. |
| T01 bordes | GREEN | Suite advisor ampliada | Relectura de idempotencia dentro de transacción y contexto priorizado; evidence/backend-regression.txt. |
| T01 resumen | RED | Suite advisor con edición de contacto | URL de backend reintroducía un campo retirado del resumen; evidence/backend-handoff-red.txt. |
| T01 resumen | GREEN | Suite final backend | URL usa exclusivamente resumen revisado; evidence/backend-final-green.txt. |
| T02 widget | RED | node growth/tests/advisor-browser.mjs | Lanzador ausente: 0 frente a 1; evidence/frontend-red.txt. |
| T02 widget | GREEN | Misma suite de navegador | 18 casos aprobados en 1440/390/360, API simulada; evidence/frontend-green.txt. |
| T02 VSL | RED | Suite navegador con película activa | Lanzador podía cubrir video reproduciéndose; evidence/frontend-vsl-red.txt. |
| T02 VSL | GREEN | Misma suite | Se oculta solo ante colisión con película activa y vuelve al pausar; 18/18. |
| T03 bridge | RED | python -m unittest growth.tests.test_advisor_bridge -v | Transporte ausente, export de credencial mínima y aislamiento temporal pendientes; bridge-red.txt, provider-red.txt, ephemeral-profile-red.txt. |
| T03 bridge | GREEN | Misma suite | 8/8, subprocess acotado, autenticación, timeout y limpieza de hogar efímero; bridge-green.txt. |
| T04 recursos | RED | Suite advisor con título citado por modelo | Enlace del recurso mencionado no aparecía primero; recommendation-red.txt. |
| T04 recursos | GREEN | /private/tmp/sa-advisor-final-venv/bin/python -m unittest discover -s growth/tests -p test_*.py -v | 83/83 aprobadas incluyendo recomendación por título y regresión completa; evidence/python-release06.txt. |

Excepcion TDD: ficha editorial, estilos y configuración operativa puntual se verifican mediante revisión visual, hashes, salud y permisos. La lógica de chat, consentimiento, persistencia, enlaces, validación e aislamiento sí tiene RED → GREEN.

## Integración y regresión

- Python discover: 82/82 aprobadas antes del último ajuste de enlaces, evidence/python-final.txt.
- Node diagnostic/journey/advisor: 18/18, evidence/node-final.txt.
- growth/tests/run_advisor_integration.py: 5/5 con Flask/SQLite reales efímeros y modelo determinista; sesiones, CSRF, guardado consentido, aislamiento, owner/editor y texto escapado. evidence/frontend-integration.txt.
- growth/verify_artifacts.py: sin incidencias; 106 archivos y 36 rutas OpenAPI, evidence/artifact-check.txt.
- Hermes VPS: dos inferencias reales HTTP200 en 9.10s/6.33s; 401 sin clave y 400 rol inválido; perfil permanente idéntico, sin DB ni temporales retenidos, usuario no puede leer root. evidence/advisor-isolation.json.
- Navegador público: 12/12 en 1440/390, exactamente 2 inferencias reales, cero solicitudes de lead y cero aperturas de WhatsApp; sin errores JS. Capturas y respuestas en evidence/public/; informe frontend-qa.md.
- HTTPS: 14 comprobaciones de índice/versiones, hashes públicos, cookie segura, no-store y CMS anónimo401; evidence/public-http.json.
- Retención periódica: timer activo y ejecución exitosa como sa-cloud-v5, evidence/service-health.txt. Cinco versiones, Hermes anterior y Copiloto siguen activos.

## Revisión y ajuste final

QA público identificó que un recurso citado por nombre en la respuesta podía no figurar entre los tres enlaces. Se ajustó el ranking para priorizar títulos publicados mencionados por la respuesta, preservando el catálogo como única fuente de URLs. La primera repetición de pruebas encontró falta de espacio local; se conserva recommendation-green.txt con el error de entorno en vez de declararlo aprobado. El entorno temporal anterior dejó de existir; se reconstruyó con requirements fijados y el candidato final aprobó 83/83. OpenAPI amplía el límite de la URL de WhatsApp a 20000 caracteres para contemplar la codificación de resúmenes Unicode de hasta 1500 caracteres.

## TRUST 5
| Dimensión | Evidencia |
|---|---|
| Tested | RED/GREEN por comportamiento, suites existentes, integración real de datos sintéticos, inferencia y QA público. |
| Readable | Perfil e identidad definidos; módulos públicos, transporte y persistencia separados; copy y documentación en español. |
| Unified | Reutiliza Flask/Jinja/CMS, permisos owner y fuente publicada; frontend sin dependencia nueva. Copiloto operativo intacto. |
| Secured | Cookie/CSRF, origen, límites, cuotas, dos inferencias concurrentes, herramientas deshabilitadas, hogar por petición eliminado, sin credenciales en navegador/repo ni logs de mensajes. |
| Trackable | Historia aprobada y verificada antes del código, contrato, ADR, paquetes/hashes, capturas y releases reversibles. |

## Publicación final
Release activo: 20261107-advisor-links-06. El ajuste final modifica exclusivamente advisor.py y su contrato OpenAPI sobre advisor-05. Manifiesto SHA256 c40ac742e5d95fd689dfdd4e0a49fbb343eb538c2762759737e2d246bd47a3a9. Evidencia: links-deploy-result.json y links-package.json. El estado privado no cambió en este incremento.

Verificación final del ajuste: una consulta pública real devolvió como primer enlace «Coaching y agentes de IA: el siguiente paso», citado en la respuesta; los tres recursos respondieron HTTP200. Cero leads guardados y cero mensajes/WhatsApp abiertos. evidence/recommendation-public.json. Gate de gobernanza: evidence/verify-governance.txt.
