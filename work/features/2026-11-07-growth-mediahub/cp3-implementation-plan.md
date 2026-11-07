# CP3 · Implementación local y trazabilidad

**Estado:** implementación local construida sobre CP2 v1 aprobado; módulos y E2E completo del CMS con evidencia ejecutada; entrega local cerrada en CP4/CP5.
**Historia:** `work/stories/2026-11-07-growth-mediahub.md` — HU-SA-GROWTH-001, Readiness LISTA.
**Aprobación:** «si lo apruebo contruye lis artefactis» — Roger, Product Owner, conversación Codex del 2026-11-07. No autoriza despliegue público.

## Repo Paths

Las rutas siguientes existen dentro de SalesAcademyVibes y corresponden a la implementación actual.

| Spec / necesidad | Ruta real | Capa |
|---|---|---|
| Landing, mediahub, recursos y diagnóstico | `growth/site/templates/{landing,hub,resource,diagnostic,base,macros}.html`; `growth/site/assets/{site.css,site.mjs,diagnostic.mjs,diagnostic-ui.mjs}` | frontend |
| Análisis público y aviso local | `growth/site/templates/{analysis,privacy}.html`; rutas `/descubre/analisis/` y `/descubre/privacidad/` en `growth/server/app.py` | frontend/backend |
| CMS y preview autenticada | `growth/site/templates/cms.html`; `growth/site/assets/{cms.mjs,cms.css}`; `/cms/preview/` en `growth/server/app.py` | frontend/backend |
| Identidad, publicación, solicitudes y eventos | `growth/server/app.py`, `growth/server/content.py`, `growth/CONTRACT.md`, `growth/openapi.json` | backend |
| Esquema editorial v1 y retención | `growth/server/store.py`: `initialize`, `schema_version=1`, `purge_expired_data` | data |
| Medios y respaldos | `growth/server/media.py`, `growth/server/backup.py` | backend/data |
| Recursos iniciales y planificación | `growth/content/{seed.json,editorial-plan.md,email-sequence.md}` | contenido |
| Dependencias, perfil y operación local | `growth/requirements.txt`, `growth/project-profile.example.yml`, `growth/start-local.sh`, `growth/server/cli.py` | runtime/infra |
| Pruebas de módulos | `growth/tests/{test_backend.py,test_media.py,test_backup.py,test_cli.py,diagnostic.test.mjs}` | QA |
| Recorridos reales de navegador | `growth/tests/run_e2e.py`, `growth/tests/e2e.mjs`, `growth/tests/e2e-cms.mjs`, `growth/package.json` | QA |
| Verificación de artefactos y manuales | `growth/verify_artifacts.py`, `growth/README.md`, `growth/deploy/README.md` | QA/infra |
| Decisiones y evidencia | `work/features/2026-11-07-growth-mediahub/`; evidencias de módulo `growth/{backend,frontend,media}-evidence.md` | gobierno |

No existe un directorio `growth/server/migrations/`: esta primera versión usa creación idempotente con `CREATE TABLE IF NOT EXISTS`, inserción de versión de esquema y seed únicamente cuando falta el borrador. Una futura modificación del esquema necesita su cambio y migración definidos; no se presenta el inicializador v1 como un sistema de migraciones evolutivas.

La adaptación de referencias fue selectiva. No se copiaron cuentas, secretos ni contenido de otro cliente. El servicio editorial y su SQLite están separados del API de tours y del stack de vcsAcademyMobile; `/`, `/ops/`, `/copiloto/` y `/api/` siguen perteneciendo al producto existente.

## Runtime y comandos existentes

Frontend HTML/Jinja, CSS y JavaScript modular; backend Python/Flask; persistencia SQLite y archivos privados. Python 3.11 o posterior, verificado en el entorno de trabajo con Python 3.14.7. `growth/requirements.txt` fija las dependencias, entre ellas Flask 3.1.3, Jinja2 3.1.6, Werkzeug 3.1.9, Pillow 12.3.0, pypdf 7.0.0 y Gunicorn 23.0.0, además de sus dependencias declaradas. `growth/package.json` fija Playwright 1.63.0 como dependencia de desarrollo.

`growth/project-profile.example.yml` registra los comandos del módulo. Es un perfil de referencia existente, no una instalación de `.ecosystem360` ni un perfil local simulado. Desde la raíz del producto, con `GROWTH_PYTHON` apuntando al Python del entorno virtual:

```sh
"${GROWTH_PYTHON}" -m compileall -q growth/server
"${GROWTH_PYTHON}" -m unittest discover -s growth/tests -p 'test_*.py' -v
node --test growth/tests/diagnostic.test.mjs
node --check growth/site/assets/site.mjs
node --check growth/site/assets/cms.mjs
node --check growth/site/assets/diagnostic-ui.mjs
"${GROWTH_PYTHON}" growth/verify_artifacts.py
"${GROWTH_PYTHON}" growth/tests/run_e2e.py
```

El runner E2E crea una base, cuentas y contraseña sintéticas temporales, inicia Flask en un puerto loopback libre, ejecuta Chromium y cierra el servidor al terminar. Admite `--public-only` y `GROWTH_PLAYWRIGHT_MODULE` para una instalación de Playwright existente. La ejecución final completó 15 recorridos correctos; resultados y log están enlazados en CP4.

`verify_artifacts.py` comprueba seed, sintaxis Python, plantillas, assets referenciados, presencia básica de rutas OpenAPI y patrones acotados de secretos/archivos privados. No sustituye una validación completa del esquema OpenAPI ni una revisión de seguridad. Los resultados efectivos y gates de gobierno corresponden a CP4; aquí no se inventan comprobaciones superadas.

La CLI implementa `bootstrap`, `recover`, `serve`, `backup`, `verify-backup`, `restore-backup` y `purge-expired`. El launcher solo permite loopback, rechaza datos bajo `growth/` y solicita contraseñas ocultas. Respaldo y restauración usan directorios privados; restaurar exige destino aislado vacío. El runbook está en `growth/README.md` y la preparación de un despliegue posterior en `growth/deploy/README.md`.

## Refinamientos coordinados del contrato

1. **Identificador analítico:** `resourceId` representa el `id` inmutable de un recurso de la publicación activa; el slug se usa exclusivamente para navegación. `growth/CONTRACT.md` y `growth/openapi.json` reflejan esta decisión coordinada por integración/frontend/backend. En backend, `test_analytics_resource_reference_uses_published_id` falló al recibir 400 para `before-tour`, después pasó con 202 y rechazo del slug. En frontend, la recomendación falló por `Unknown resource ID: antes-del-tour` y pasó al separar ID y URL. Evidencias RED/GREEN en ambos documentos de módulo.
2. **Análisis entregable:** `/descubre/analisis/` renderiza `analysis.html` como reporte público y lleva `X-Robots-Tag: noindex, nofollow`. No es una vista del borrador CMS ni revela archivos internos del expediente.
3. **Medios en plantillas:** `media_items` contiene solo `{id,title,alt,mime,variants}` de los medios referenciados por el documento renderizado. Permite usar alt editorial y elegir imágenes `/web` frente a PDF `/download`; no expone originales, paths ni medios ajenos. `test_template_media_context_contains_only_referenced_safe_metadata` tiene RED/GREEN específico.

Estos refinamientos quedan trazados sin reescribir retroactivamente la aprobación del CP2. No añaden servicios externos ni autorizan publicación.

## Tareas y pruebas reales

Los pares Txx-test/Txx-impl se mantienen para trazar los AC. Las pruebas se agruparon por módulo durante la ejecución; no se inventa una corrida RED independiente para cada fila. Los logs RED/GREEN observados están en `growth/backend-evidence.md`, `growth/frontend-evidence.md`, `growth/media-evidence.md`, `growth/tests/evidence/` y `evidence/cli-{red,green}.txt`. La composición visual HTML/CSS tiene excepción TDD documentada y requiere revisión visual.

| Par | Implementación y prueba existente | Estado de evidencia | AC |
|---|---|---|---|
| T01-test / T01-impl | Landing SSR y separación de rutas; `test_backend.py::test_unpublished_resources_are_private_and_filtering_is_server_side`; recorridos de landing y lectura sin JS en `e2e.mjs` | Backend GREEN; cierre E2E integrado correcto | AC-01 |
| T02-test / T02-impl | Etiquetas de propuesta/demo en seed y plantillas; recorrido de landing en `e2e.mjs` y revisión editorial/visual | Implementado; excepción TDD visual; no se afirma certificación de claims por un test de texto | AC-02 |
| T03-test / T03-impl | `diagnostic.mjs`; siete pruebas reales en `diagnostic.test.mjs` de prioridades, desconocidos, empates, límites, entradas inválidas, determinismo e IDs | RED/GREEN frontend documentado; integración de navegador correcta | AC-03 |
| T04-test / T04-impl | Filtros y búsqueda públicos; `test_unpublished_resources_are_private_and_filtering_is_server_side`; recorrido mediahub/vacío en `e2e.mjs` | Backend GREEN; cierre E2E correcto | AC-04 |
| T05-test / T05-impl | Tres recursos en `seed.json`, descarga Markdown; prueba backend anterior, verificador de artefactos y recorrido de lectura/descarga real | Contenido construido; evidencia de módulo, revisión editorial y cierre E2E separados | AC-05 |
| T06-test / T06-impl | Solicitudes persistentes y bandeja owner; `test_demo_request_validation_idempotency_and_disabled_contact`; recorridos públicos y bandeja CMS | Backend GREEN; CMS E2E correcto | AC-06 |
| T07-test / T07-impl | `test_authentication_csrf_and_server_roles`, `test_owner_protection_and_session_revocation`, `test_password_reset_during_login_cannot_create_stale_session`; `test_cli.py` | RED/GREEN backend y CLI; carrera reset/login corregida | AC-07 |
| T08-test / T08-impl | `test_drafts_survive_restart_and_conflict_without_losing_publication`; conflicto entre dos páginas en `e2e-cms.mjs` | Persistencia/conflicto backend GREEN; conservación visual de campos en E2E correcto | AC-08 |
| T09-test / T09-impl | `test_media.py`: formatos, EXIF, deduplicación, límites, cuota, PDF y metadatos; biblioteca CMS en `e2e-cms.mjs` | RED/GREEN medios; CMS E2E correcto | AC-09 |
| T10-test / T10-impl | Privacidad en `test_unpublished_resources_are_private_and_filtering_is_server_side` y `test_media_routes_usages_and_failed_publication_preserve_active_snapshot` | Backend GREEN; originales y publicaciones retenidas comprobados | AC-10 |
| T11-test / T11-impl | `test_publication_restore_is_atomic_and_does_not_revert_requests`; fallo de publicación con medios pendientes y restore CMS | Backend GREEN; CMS E2E correcto | AC-11 |
| T12-test / T12-impl | `test_search_pagination_and_archive_preserve_files`, `test_publication_requires_existing_reviewed_rights_and_alt` y usos integrados del backend | RED/GREEN; usos de borrador e historial corregidos y comprobados | AC-12 |
| T13-test / T13-impl | `test_events_allowlist_deduplication_and_metrics_privacy`, `test_analytics_resource_reference_uses_published_id`; consentimiento/retirada en `e2e.mjs` | Backend y referencia frontend GREEN; cierre E2E correcto | AC-13 |
| T14-test / T14-impl | Seis pruebas en `test_backup.py`, incluido manifiesto sin derivado; recorridos móviles públicos y CMS | Backup RED/GREEN; móvil/teclado y CMS requieren cierre E2E/UAT | AC-14 |

La retención se comprueba con `test_retention_removes_only_expired_records_and_preserves_editorial_data`: solicitudes según última actividad de 90 días y eventos/auditoría de 30 días, sin tocar cuentas o publicaciones. La revisión independiente `evidence/security-review.md` documenta hallazgos corregidos, pruebas y límites; no sustituye QA visual ni autorización productiva.

## Cierre de integración

La integración completó 15 recorridos E2E correctos y revisión de capturas móviles/escritorio. Los gates de historia y gobierno terminaron con código 0; CP4 conserva el resultado de 36 pruebas Python, 7 Node y TRUST 5. CP5 registra el cierre local, la entrega y sus límites. El catálogo de SoftvibesSites incorpora una sola entrada nueva sin cambiar estados ajenos.

La publicación pública, el DNS y las cuentas de servicios externos no están incluidos en esta aprobación local. El aviso definitivo, responsable, HTTPS/proxy y operación de retención/respaldos corresponden a una futura activación expresamente autorizada.

Excepcion TDD: actualización documental de CP0, CP1 y CP3 para reflejar implementación y evidencia existentes; no cambia código productivo. Comprobación documental ejecutada: los tres documentos conservan aprobación y LISTA; 14 métodos citados existen en las pruebas, nueve rutas requeridas y todos los enlaces locales resuelven. `git diff --check` de estos documentos terminó sin errores. Esta comprobación no se presenta como gate de producto.
