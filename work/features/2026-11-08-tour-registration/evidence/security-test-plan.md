# Plan adversarial · Registro de tours

**Fecha:** 2026-11-10
**Estado:** preparado; no acredita pruebas ejecutadas de la nueva implementación
**Contrato:** CP2 v1 aprobado por Roger («Apruebo v1; implementar»)
**Auditor:** agente `tour_security_review`

## Entorno y límites

Ejecutar contra servidor local iniciado por la suite, `OPS_DATA` temporal, puerto aleatorio y credenciales privadas sintéticas de vida corta. El proceso debe borrar/ignorar `OPS_BASE` y variables remotas heredadas. No ejecutar reset, e2e-ops ni live-smoke contra producción. No inspeccionar ni imprimir el archivo real de credenciales.

Preparar dos salas ficticias con rep_a/jefe_a y rep_b/jefe_b, además de admin privado. Fijar fecha y reloj; poner marcadores sintéticos distinguibles en nombre, contacto y notas (`NombrePruebaPrivada`, `contacto@example.invalid`, `NotaPrivadaPrueba`). Crear un tour privado y un tour anónimo heredado. Las pruebas deben buscar estos marcadores en respuestas, logs y store, sin datos personales reales.

El servidor existente resuelve encabezado jefe/admin antes que la cookie en `actor()`. Cada operación privada necesita una guarda que no herede esa prioridad. Proteger solo las rutas nuevas es insuficiente: también existen PATCH de tour/persona, PUT de resultado, DELETE de resultado/tour y POST reset.

## Casos P0 · Bloquean habilitación privada

| ID | Acción verificable | Resultado requerido | Traza |
|---|---|---|---|
| SEC-01 | Preview, crear, lista y detalle sin cookie; con `X-Ops-Actor: admin`; con `?actor=admin` | Sin lectura/escritura privada. Capabilities no concede canRegister por encabezado | AC-05, REQ-08 |
| SEC-02 | Cookie de rep_b + encabezado admin/jefe_a para registro de rep_a | El encabezado no eleva autoridad; detalle/lista no muestran datos de rep_a | AC-05 |
| SEC-03 | Reutilizar cookie demo emitida antes de cambiar `OPS_AUTH_MODE=private`; intentar contraseña compartida | Rechazo de sesión y login; sin cookie privada creada | AC-10, REQ-11 |
| SEC-04 | Quitar, corromper o cambiar permisos del archivo privado de credenciales; configurar private sin archivo | Falla cerrado; no fallback a contraseña demo/admin del entorno | AC-10 |
| SEC-05 | Rotar contraseña/versionar credencial, después quitar usuario; conservar cookies antiguas | Las cookies previas dejan de funcionar inmediatamente en todas las rutas privadas; la nueva credencial sí funciona | AC-10 |
| SEC-06 | Registro privado previo, apagar feature flag y enviar PATCH tour, PUT/DELETE resultado, DELETE tour y POST reset solo por header | Ninguna operación abierta modifica ni destruye el tour/registro privado. La guarda sobre datos existentes no depende del flag | AC-06, REQ-09 |
| SEC-07 | Cambiar rep_a de sala por header admin; luego repetir con admin privado autorizado | Header rechazado. Cambio autorizado no concede el histórico a rep_a en sala nueva ni al jefe nuevo; jefe de sala original y admin conservan acceso | AC-05/06 |
| SEC-08 | Consultar `/api/tours`, `/api/context`, `/api/directory`, `/api/rooms`; capturar respuestas de creación/actualización/resultado anónimas | Ningún marcador privado, foto, OCR bruto ni `tourRegistrations` fuera de respuestas explícitamente privadas autorizadas | AC-06 |
| SEC-09 | Crear con Origin ajeno, `Origin: null`, JSON con Content-Type incorrecto; validar origen permitido detrás de proxy | Mutaciones privadas rechazadas salvo origen previsto y JSON. No reflejar Origin ni permitir CORS abierto. No confiar en forwarded headers arbitrarios como lista de autorización | AC-05/10 |
| SEC-10 | Dos POST simultáneos con mismo actor/requestId/payload; después mismo ID con payload diferente | Una sola escritura y referencia; respuesta idéntica en reintento; cambio produce 409 y no altera el original | AC-01/04 |
| SEC-11 | Dos requestId diferentes pero mismo rep/fecha/horario concurrentes | Solo uno crea tour; el otro recibe 409; no hay registro privado huérfano ni tour sin su registro | AC-03/04 |
| SEC-12 | Vencer 30 días, ejecutar purga diaria sin tráfico; inspeccionar store y backups sintéticos | Antes de 31 días desaparecen nombres/contacto/intereses/notas y hash del payload personal. Tour anónimo permanece; tombstone no conserva derivados personales | AC-10 |
| SEC-13 | Reintentar requestId después de purga, y después de reiniciar servicio | `409 registration_expired`; nunca restaura PII ni crea un segundo tour | AC-04/10 |
| SEC-14 | OCR lento; en paralelo GET tours y una escritura no conflictiva; invalidar sesión durante OCR | La agenda responde sin esperar al OCR. Preview revalida sesión al terminar y no devuelve candidatos privados después de revocación | AC-02/05 |
| SEC-15 | Foto inválida/truncada, MIME falso, base64 corrupto, imagen >1.5MB y cuerpo >2MB | Rechazo seguro 400/413/415 sin subprocess innecesario, traza de datos, archivo huérfano ni caída del servidor | AC-02/03 |

## Casos P1 · Correctitud y privacidad de borde

| ID | Acción verificable | Resultado requerido |
|---|---|---|
| SEC-16 | JSON `null`, lista, cadena, nested tipos incorrectos; `reviewConfirmed` ausente, false, 1 o string | Error de validación estructurado, nunca traceback/500; confirmar exige booleano true |
| SEC-17 | Nombre vacío/81 caracteres, contacto inválido, más de cinco intereses, nota 401, idioma fuera de enum, campos sensibles desconocidos | No escritura; errores de campo sin reflejar valores privados |
| SEC-18 | Fecha inexistente, hora fin anterior/igual, rangos en límite de día, cambio de zona | Reglas de calendario y zona del contrato; no normalización silenciosa a otra fecha |
| SEC-19 | Mismo requestId utilizado por otro actor, con o sin repId igual | No revela el registro del primer actor ni comparte respuesta idempotente entre usuarios |
| SEC-20 | Reasignar un tour privado con sesión admin; leer como nuevo rep | La reasignación de agenda no transfiere propietario/sala histórica del registro privado |
| SEC-21 | Límite lista 0/101/no numérico; fecha inválida; ID ajeno o inexistente | Validación y paginación acotadas; ID fuera de alcance no filtra existencia ni datos |
| SEC-22 | Agotar el espacio válido de Lead #NNNN y crear otra solicitud | Error sin escritura parcial ni bucle infinito; referencias existentes intactas |
| SEC-23 | Excepción en OCR, timeout total y ausencia del ejecutable/idioma | Respuesta recuperable segura; cero persistencia; temporal borrado en todos los caminos; límite total 20s |
| SEC-24 | Texto OCR con instrucciones, HTML/script, ingresos o identidad oficial | Solo campos permitidos y candidatos por revisar; no ejecución, exfiltración o incorporación de campos prohibidos |
| SEC-25 | Tras crear/preview/errores revisar headers, service worker y URLs del Copiloto | `Cache-Control: no-store`, sin cache API ni PII en query `q`, URL, log o telemetría |
| SEC-26 | Campo corregido mientras OCR tarda; cambiar a otro borrador/usuario; logout/401 | Respuesta obsoleta no pisa cambios; foto, object URLs y PII en memoria se liberan al cambiar sesión |
| SEC-27 | Recargar página después de mantener borrador | No rehidrata PII/foto desde localStorage/sessionStorage/IndexedDB; la UI no promete persistencia |
| SEC-28 | Foto de exactamente 1,500,000 bytes antes de envolver en JSON | Cliente calcula el tamaño final o comprime debajo del máximo: base64 ocupa 2,000,000 bytes, y el envoltorio aumenta el cuerpo. No aceptar un payload que inevitablemente exceda 2MB |
| SEC-29 | Store privado/directorio con permisos abiertos; archivo symlink y provisión simultánea | Verificación de habilitación falla cerrado o runbook bloquea activación; provisión no escribe contraseñas en args/logs, usa archivo externo restringido |
| SEC-30 | Módulo deshabilitado y visitas anónimas anteriores | Flujos demo autorizados conservan compatibilidad; las regresiones no amplían autoridad privada ni impiden agenda anónima innecesariamente |

## Solicitudes de referencia

Los cuerpos válidos siguen CP2; mantener `Content-Type: application/json` y `Origin` del servidor local, con cookies obtenidas por login de fixture. Para actor falso, no sustituir cookie: añadir `X-Ops-Actor: admin` a una cookie de rep ajeno demuestra la prioridad peligrosa del código anterior.

Ejemplo de secuencia sobre el tour `v_demo` (ID ilustrativo; usar el ID real devuelto por fixture):

1. Crear privado como rep_a y guardar hash del store temporal.
2. Apagar flag en configuración local conservando el store.
3. Intentar `PATCH /api/tours/v_demo`, `PUT /api/tours/v_demo/result`, `DELETE /api/tours/v_demo/result`, `DELETE /api/tours/v_demo`, `PATCH /api/people/rep_a` y `POST /api/reset` con header admin sin cookie.
4. Verificar estado denegado y store sin cambio privado. Repetir con cookie rep_b + header admin.
5. Como admin privado, ejecutar únicamente la mutación permitida prevista y verificar su efecto atómico y proyección de respuesta.

## Evidencia al revisar implementación

Registrar comando, exit code y nombres reales de tests que cubren cada SEC; no marcar una fila verde porque existe una función o un test con nombre similar. Si una suite usa datos/servidor remoto, detenerla antes de ejecutar. Las suites actuales `e2e-ops.mjs` y `live-smoke.mjs` pueden escribir/restaurar tours: para esta auditoría solo se admite el servidor temporal local.

Pendiente recibir aviso de implementación lista para revisión de código y ejecución local. Este documento no sustituye el reporte final de hallazgos ni acredita seguridad del despliegue.
