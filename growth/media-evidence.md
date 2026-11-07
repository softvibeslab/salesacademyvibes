# MediaHub y respaldos · evidencia ejecutada

Fecha: 2026-11-07. CP2 v1 aprobado por el usuario. Archivos de producto: `server/media.py`, `server/backup.py`; pruebas: `tests/test_media.py`, `tests/test_backup.py`.

## TDD observado

| Par | Estado | Comando | Resultado observado |
|---|---|---|---|
| T09/T12/T14 | RED | `/private/tmp/salesacademy-growth-venv/bin/python -m unittest growth.tests.test_media growth.tests.test_backup` | 14 pruebas contra scaffolds válidos: FAILED (failures=14, errors=8). No errores de importación ni sintaxis. Faltaban id/derivados, rechazo de archivos peligrosos, persistencia, manifiesto y rechazo de restore sobre datos. |
| T09/T12/T14 | GREEN | Mismo comando, con implementación | 14 pruebas, OK tras implementar los comportamientos. |
| T14-ref | RED | `python -m unittest growth.tests.test_backup.BackupTests.test_manifest_cannot_hide_missing_media_reference` | FAIL: `BackupError not raised`. Quitar un derivado y su entrada del manifiesto evitaba la comprobación de referencias. |
| T14-ref | GREEN | `/private/tmp/salesacademy-growth-venv/bin/python -m unittest growth.tests.test_media growth.tests.test_backup` | 15 pruebas, OK; la verificación cruza el índice multimedia con archivos, hashes y tamaños. |

Se corrigieron dos incompatibilidades de fixtures, sin cambiar expectativas: pypdf 7 retiró `add_js`, por lo que el PDF de prueba usa `add_open_action(JavaScript(...))`; macOS expande `/var` a `/private/var`, por lo que se resuelve la ruta temporal antes de calcular su ruta relativa. La última prueba RED se ejecutó después de corregir esos fixtures y falló por la ausencia real de validación de referencias.

## Qué se comprobó

- JPG/PNG/WebP válidos, MIME real y extensión coherentes; falsos tipos, SVG y cargas audio/video rechazadas.
- Límites de bytes, píxeles y cuota; originales privados en disco, derivados WebP sin EXIF.
- Persistencia SQLite, deduplicación por SHA-256 sin sobrescribir metadatos previos, búsqueda, paginación y archivo recuperable.
- Publicación exige medio conocido, revisado, derechos aprobados y alt para imágenes; recursos draft no conceden referencia pública.
- PDF parseado estructuralmente con pypdf, rechazo de cifrado, JavaScript, adjuntos y acciones; descarga derivada reserializada solo con páginas y metadatos propios.
- Rutas de medios conocidas, sin path traversal ni enlaces simbólicos.
- Backups SQLite consistentes mediante API backup; hashes, tamaños, inventario y referencias de medios verificados.
- Restauración a directorio nuevo/vacío; destino con datos y snapshots existentes rechazados; nada se restaura sobre operación viva.

## Integración

`MediaStore` no decide permisos HTTP. El backend debe aplicar sesión/rol/CSRF, restringir el acceso público a referencias de la publicación activa y servir PDFs como descarga. Imágenes: variantes `original`, `web`, `thumbnail`; PDF: `original`, `download`. Original solo autenticado; los paths no se incluyen en el JSON público.

`create_backup` y `restore_backup` devuelven Path. `verify_backup` devuelve `{ok,files,bytes,createdAt}` o lanza `BackupError`. Al publicar una nueva revisión se rechazan archivos archivados, pero un derivado que la publicación vigente aún utiliza permanece en disco y accesible según autorización del backend.
