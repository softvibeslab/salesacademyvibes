# CP3 · Implementación
## Repo Paths
Backend: growth/server/advisor.py, app.py, store.py; growth/tests/test_advisor.py. Frontend: growth/site/assets/advisor.mjs, advisor.css, plantillas base/CMS/privacy y galería, tests JS/navegador. Runtime: growth/deploy/advisor/ y tests de puente; contenido curado en growth/content/advisor-knowledge.md. Documentos y evidencia en esta feature.

## Pares TDD
| Tarea | RED | GREEN | Responsable |
|---|---|---|---|
| T01 | Pruebas API fallan por rutas ausentes | API y persistencia satisfacen contrato | backend |
| T02 | Funciones/widget ausentes | Flujo accesible + WhatsApp revisable | frontend |
| T03 | Puente ausente | Perfil restringido, protocolo y timeout | Hermes |
| T04 | Verificación integración | QA real y publicación | root |

Las escrituras de producción se realizan solo tras pruebas y revisión del paquete. No se modifica trabajo operativo existente del usuario. Sin commit conjunto de archivos ajenos.

## Gates
Story verify previo código, Python/Node/backend/frontend/bridge, navegador móvil/escritorio, evidencia real de Hermes y hashes públicos; TRUST5. Operación puntual y estilos: Excepcion TDD por configuración/visual, con hashes y capturas; comportamiento sí requiere RED→GREEN.
