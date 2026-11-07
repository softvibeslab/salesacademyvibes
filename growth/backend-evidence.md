# Evidencia backend · Sales Academy Growth

Carril: Contrato. Implementación de CP2 v1 aprobada por el PO con «si lo apruebo contruye lis artefactis». Todo se ejecutó localmente contra directorios temporales y contactos `.invalid`; ninguna prueba usa el almacén operativo, publica en producción o envía mensajes.

## TDD ejecutado

Python usado: `/private/tmp/salesacademy-growth-venv/bin/python`. Directorio de trabajo: raíz de SalesAcademyVibes. Los logs originales están en `growth/tests/evidence/`.

| Tarea | Estado | Comando | Salida observada |
|---|---|---|---|
| T01 autenticación, contenido, publicación, captación | RED | `python -m unittest growth.tests.test_backend -v` sobre scaffold Flask válido | 10 tests, 10 fallos funcionales, 0.029 s; rutas devuelven 404 en vez de 200/401. Sin errores de importación o sintaxis. `backend-red.txt` |
| T01 | GREEN | `python -m unittest growth.tests.test_backend -v` | 10 tests OK, 2.360 s. Persistencia, roles, CSRF, conflicto, restore, leads, eventos y límites implementados. |
| T02 medios integrados y retención | RED | `python -m unittest growth.tests.test_backend -v` | 14 tests, 2 fallos funcionales, 3.025 s: derivado WebP anunciado image/png; purga scaffold devuelve 0 en lugar de 1 solicitud expirada. `backend-integration-red.txt` |
| T03 carrera entre reset y login | RED | `python -m unittest growth.tests.test_backend.BackendAcceptance.test_password_reset_during_login_cannot_create_stale_session -v` | 1 fallo, 0.204 s: login acepta contraseña anterior (200) tras reset concurrente; esperado 401. `backend-race-red.txt` |
| T02/T03 | GREEN | `python -m unittest growth.tests.test_backend -v` | 15 tests OK, 3.222 s; MIME explícito, referencias completas, retención transaccional y relectura del hash/active bajo bloqueo de escritura antes de emitir sesión. |
| T04 identificación analítica de recursos | RED | `python -m unittest growth.tests.test_backend.BackendAcceptance.test_analytics_resource_reference_uses_published_id -v` | 1 fallo, 0.109 s: `before-tour` recibe 400 en lugar de 202. `backend-event-id-red.txt` |
| T04 y regresión | GREEN | `python -m unittest growth.tests.test_backend -v` | **16 tests OK, 3.270 s**, sin warnings. ID publicado admitido y slug rechazado. `backend-green.txt` |

El refinamiento de T04 fue coordinado explícitamente por ROOT/frontend/backend: `resourceId` identifica el `id` estable; `slug` identifica la URL. Está reflejado en `CONTRACT.md` y OpenAPI. No se añaden eventos, campos libres ni datos personales.

## Cobertura y límites

- AC-01/04/05/10: rutas públicas independientes, filtros en servidor, borradores ausentes del HTML público, descargas Markdown reales, originales privados y derivados solo con referencia en publicación activa.
- AC-06/13: solicitud validada y normalizada, consentimiento requerido, clave idempotente, misma solicitud persistida una vez y conflicto para cuerpo distinto; evento transaccional una vez; analítica opcional con esquema cerrado, UUID, referencia publicada y límite de 2 KB.
- AC-07: cookie HttpOnly/SameSite, token de sesión hasheado, CSRF, origen, permisos del servidor, bloqueo de último owner, revocación por desactivación/contraseña, login genérico y rate limit. Bootstrap/recuperación son helpers locales, sin autorregistro HTTP.
- AC-08/11/12: persistencia tras reinicio, revisión optimista 409, publicación atómica, rechazo de medios pendientes conservando publicación, archivo conserva derivado activo, versiones retenidas privadas y restore solo a borrador sin revertir solicitudes.
- Validación adicional: tipos JSON malformados devuelven 400, PDF servido como attachment, MIME real WebP, paginación máxima 50, CSP/escaping/no-store, purga 90 días por última actividad y 30 días de eventos/auditoría sin tocar publicaciones ni usuarios.

La suite usa test client Flask y SQLite reales. Solo el caso de carrera intercala un reset del operador después de verificar la contraseña para reproducir un orden concurrente preciso. Las plantillas de pruebas son pequeñas fixtures escapadas; la validación visual y UAT con las plantillas finales corresponde a la integración de ROOT/frontend.

Excepción TDD: OpenAPI y esta evidencia son documentación del contrato; se validan como artefactos. Los cambios de cierre en tests únicamente cierran streams devueltos por `send_file`, sin cambiar expectativas.

## Interfaces de operación

- `growth.server.app.create_app(config)`; `DATA_ROOT` obligatorio, fuera de la raíz pública. Cookies Secure por defecto y captación pública deshabilitada por defecto.
- `create_staff(data_root, username, password, role='owner')` y `reset_staff_password(data_root, username, password)`: uso del comando local, nunca bootstrap público.
- `growth.server.store.purge_expired_data(data_root, now_override=None)`: devuelve cantidades `requests`, `events`, `sessions`, `rateLimits`, `audit`; fecha opcional con zona horaria para prueba. ROOT conecta el comando `purge-expired` y su operación programada.

No se afirma despliegue, medición de tráfico real ni aprobación de los avisos de privacidad para captación real. La activación y el proxy HTTPS siguen el runbook de entrega.

## Revisión de legibilidad y paridad final

Se formatearon únicamente `app.py`, `content.py` y `store.py` con Ruff 0.16.10 ya disponible en caché local, sin instalar ni agregar dependencia de runtime. Comparación `ast.dump(..., include_attributes=False)` antes/después: árboles idénticos en los tres módulos. `ruff format --check --no-cache` confirma tres archivos conformes. Regresión posterior: **16 tests OK, 3.345 s**, log `tests/evidence/backend-format-green.txt`. Excepción TDD: cambio exclusivamente de formato, sin cambio de contrato o comportamiento.

La inspección de `create_app().url_map` normalizó los nombres de parámetros y comparó cada método excepto HEAD/OPTIONS implícitos con OpenAPI: **36 operaciones, 31 rutas, sin rutas sobrantes o faltantes**. Se documentó también el transporte de assets públicos `/growth-assets/{filename}`; no agrega una ruta nueva al servidor. Los 27 esquemas y referencias del documento resuelven correctamente.

Límite operativo para una futura publicación: el proxy HTTPS debe entregar a WSGI el host y esquema externos correctos mediante configuración de proxy de confianza. La validación de Origin compara exactamente contra el origen de la solicitud; un proxy que reporte HTTP cuando el navegador usa HTTPS provocará rechazo 403 de escrituras. No se confía automáticamente en cabeceras reenviadas. La entrega y pruebas actuales funcionan por loopback, sin proxy ni activación pública.

## Integración de adjuntos y alt text

Frontend detectó que la plantilla necesita distinguir imágenes (`/web`) de PDF (`/download`). Se coordinó el contexto opcional `media_items`, con título, alt y MIME exclusivamente de medios referenciados por el documento renderizado; se excluyen nombres de archivo originales, rutas de almacenamiento y archivos ajenos. Público resuelve la publicación activa y preview requiere sesión. Contrato actualizado en `CONTRACT.md`, sin modificar datos persistidos ni APIs.

| Tarea | Estado | Comando | Salida observada |
|---|---|---|---|
| T05 contexto seguro de adjuntos | RED | `python -m unittest growth.tests.test_backend.BackendAcceptance.test_template_media_context_contains_only_referenced_safe_metadata -v` | 1 fallo, 0.197 s: preview no recibe título del medio referenciado. `backend-context-red.txt` |
| T05 y regresión completa | GREEN | `python -m unittest growth.tests.test_backend -v` | **17 tests OK, 3.451 s**. Título/alt/MIME disponibles; adjuntos no publicados ausentes del público y archivos no referenciados/nombres originales excluidos. `backend-context-green.txt` |

## Tasa del diagnóstico con denominador

Refinamiento aditivo de CP3 solicitado por ROOT y coordinado con frontend: métricas owner-only incluyen `diagnostic:{startedFlows,completedFlows,completionRate}`. Se cuentan flujos distintos consentidos durante 30 días; completados es la intersección de esos mismos flujos iniciados y completados. Se devuelve porcentaje 0–100 con dos decimales o `null` cuando no hay inicios. No se exponen flow IDs ni se correlacionan páginas, personas o conversiones comerciales. OpenAPI y `CONTRACT.md` reflejan ese alcance.

| Tarea | Estado | Comando | Salida observada |
|---|---|---|---|
| T06 tasa agregada consentida | RED | `python -m unittest growth.tests.test_backend.BackendAcceptance.test_diagnostic_metric_counts_consented_started_flows_and_intersection -v` | 1 fallo, 0.166 s: falta el agregado esperado `{startedFlows:0,completedFlows:0,completionRate:null}`. `backend-diagnostic-metrics-red.txt` |
| T06 y regresión completa | GREEN | `python -m unittest growth.tests.test_backend -v` | **18 tests OK, 3.689 s**. Tres flujos iniciados, inicio/completados repetidos, completado sin inicio, registros expirados y sin consentimiento producen exactamente 3 inicios, 1 completado y 33.33%; sin denominador devuelve null. `backend-diagnostic-metrics-green.txt` |
