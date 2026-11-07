# Spec (CP2)

**Status:** approved (Excepción Ready, ver CP0)
**Feature:** `tareas-evidencia`
**Owner:** `Roger (PO)`
**Date:** `2026-11-07`

## 1. Data

`tasks[]` en `ops.json`: `{id, repId, title (≤80), detail (≤160), due YYYY-MM-DD, when HH:MM|"" , origin (≤40), createdBy, createdAt, status: pendiente|hecha, doneAt, evidence: null | {kind: imagen|audio, mime, size, durationSec, at, by, expired}}`.
Archivo: `OPS_EVIDENCE_DIR/<taskId>.<ext>` (por defecto junto a `ops.json`, carpeta `evidence/`, permisos 700). Si falta `tasks` en un `ops.json` existente se siembra con las tareas demo.

## 2. Requirements (Functional)

- REQ-001 `GET /api/tasks?rep=` con el mismo alcance que `/tours` (rep: suyas; jefe: su sala; admin: todas). Orden: pendientes primero, luego por `due`, `when`.
- REQ-002 `POST /api/tasks {repId, title, detail, due, when, origin}`: rep solo para sí; jefe para reps de su sala; admin cualquiera. Validación de longitudes y fecha; sin correos ni teléfonos en título/detalle.
- REQ-003 `POST /api/tasks/:id/complete {kind, mime, data (base64), durationSec, consent}`: solo el rep dueño (o admin). Exige `consent === true`; `kind` y `mime` de lista blanca (imagen: jpeg/png/webp; audio: webm/mp4/mpeg/ogg); los bytes deben coincidir con el tipo (firma); ≤ 700,000 bytes decodificados; audio con `0 < durationSec ≤ 60`. Guarda el archivo, marca `hecha`. Sin evidencia válida → 400 y la tarea sigue pendiente.
- REQ-004 `GET /api/tasks/:id/evidence`: rep dueño, jefe de su sala o admin; responde el archivo con su `Content-Type`, `Cache-Control: no-store`, `X-Content-Type-Options: nosniff`, `Content-Disposition: inline`. Expirada o inexistente → 404.
- REQ-005 `POST /api/tasks/:id/reopen`: dueño, jefe de la sala o admin; borra el archivo y vuelve a `pendiente`.
- REQ-006 Retención: en cada lectura/escritura se borran archivos con más de 30 días y la evidencia queda `expired: true` (la tarea sigue `hecha`).
- REQ-007 App: «Tus prioridades» de Home sale del servidor; el checkbox ya no marca: abre el detalle. El detalle muestra aviso de privacidad, casilla de consentimiento, «Foto o captura» (imagen comprimida a ≤ 1280 px JPEG) y «Grabar audio» (máx. 60 s, 32 kbps, cuenta regresiva); «Marcar hecha» solo se habilita con evidencia + consentimiento. Hecha: muestra la evidencia y «Reabrir».
- REQ-008 Tablero: por rep, tareas con estado y enlace «Ver evidencia»; el jefe puede asignar una tarea.
- REQ-009 Contexto de Hermes: tareas pendientes con vencimiento ≤ hoy (máx. 5) y conteo de hechas del mes; sugerencia proactiva «Tarea pendiente».

## 3. Non-Functional

| Tipo | Requisito | Verificado en |
|---|---|---|
| Privacidad | NFR-001 evidencia visible solo para rep, su jefe y admin | e2e E5 |
| Seguridad | NFR-002 tipo verificado por firma de bytes; nombre de archivo = id del servidor | test_tasks, e2e E4 |
| Retención | NFR-003 30 días | test_tasks |
| Tamaño | NFR-004 cuerpo < 1 MB (límite de nginx) | e2e E6 |

## 4. Acceptance Criteria

| ID | Criterio | Prueba |
|---|---|---|
| AC-001 | Dada una tarea pendiente, cuando el rep intenta marcarla sin evidencia, entonces 400 y sigue pendiente | e2e E2 |
| AC-002 | Dada una imagen PNG válida con consentimiento, entonces la tarea queda hecha | e2e E3 |
| AC-003 | Dado un archivo que dice ser PNG pero no lo es, entonces 400 | e2e E4 |
| AC-004 | Dado un audio de 61 s, entonces 400 | test_tasks |
| AC-005 | Dada la evidencia de Ana, Luis no la ve (403); Jorge (su jefe) sí; Rosa no | e2e E5 |
| AC-006 | Dada una evidencia de 31 días, entonces el archivo se borra y queda `expired` | test_tasks |
| AC-007 | Dado el jefe, cuando asigna una tarea a un rep de otra sala, entonces 403 | e2e E1 |
| AC-008 | En la app, «Marcar hecha» está deshabilitado hasta tener evidencia y consentimiento | visual |
