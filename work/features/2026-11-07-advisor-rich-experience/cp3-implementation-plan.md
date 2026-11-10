# CP3 · Implementación

## Repo Paths

- Backend: growth/server/advisor.py, growth/tests/test_advisor.py, growth/openapi.json.
- Frontend: growth/site/assets/advisor.mjs, advisor.css, pruebas growth/tests/advisor*.mjs.
- Perfil y operación: growth/deploy/advisor/SOUL.md, documentación y parche de publicación.
- Medios: auditoría del catálogo existente, sin modificar originales.

## Tareas

| Tarea | Resultado requerido |
|---|---|
| T01-test | Pruebas RED del contrato: brevedad, contexto y recursos publicados. |
| T01-impl | Las mismas pruebas pasan; actualizar OpenAPI y conservar regresiones. |
| T02-test | Prueba RED de controles dinámicos y recursos dentro del asesor. |
| T02-impl | Controles y tarjetas funcionan con contraste medido, teclado y vistas móviles. |
| T03 | QA integrada, inferencia real controlada y publicación de release y perfil verificados. |

## Gates

Historia LISTA verificada antes del código. Mantener los cambios ajenos. Ejecutar suites de regresión, navegador con modelo simulado, verificación de carga de medios y contraste, TRUST 5 y verificador de gobernanza. Registrar resultados observados en CP4.
