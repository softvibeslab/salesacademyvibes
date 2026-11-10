# CP2 · Nuevo tour desde survey o captura manual

**Status:** approved
**Feature:** tour-registration
**Product:** Sales Academy
**Owner:** Roger (PO)
**Date:** 2026-11-08
**Version:** 1

## Decisión para revisión

Implementar el módulo en la app existente, con dos entradas que terminan en una revisión y un único registro: foto del survey con lectura local asistida, o captura manual de la pareja. La entrega incluye ocho diseños en Stitch, código funcional, pruebas locales y preparación de publicación. Los datos de pareja requieren acceso privado; la demo pública conserva agenda anónima.

Roger aprobó este contrato v1 el 2026-11-10: «Apruebo v1; implementar». La confirmación anterior «Stitch y app funcionando» delimitó el alcance; la aprobación posterior y explícita abrió CP3. El gate de historia LISTA pasó antes de cambiar código.

## Problema y evidencia

- La app activa carga `agenda.js` y `agenda.css`, no el antiguo `app.js`; usa módulos JS nativos y API Python stdlib.
- `POST /api/tours` y el importador actual solo aceptan leads anónimos. El nuevo registro de pareja no está cubierto por `2026-11-07-ops-import-preview/cp2-spec.md`.
- `/ops/` acepta un encabezado de actor por diseño. No puede autorizar acceso a datos personales.
- El login vigente comparte contraseña demo entre reps/jefes. No hay credenciales privadas individuales configurables todavía.
- El Copiloto transporta preguntas por URL; su fuente no está en este repositorio. Los datos personales no se enviarán por ese canal.

## Alcance y usuarios

Frontend, backend y datos; carril Contrato CP0–CP5. Rep registra para sí mismo; jefe para reps de su sala; admin autenticado para todas. Propietario y sala se verifican en servidor. Los nuevos datos privados usan el alcance fijado al crear, no una reasignación pública posterior.

Incluye foto, preview editable, manual, resumen, confirmación, errores, agenda del día registrado, detalle privado y accesos a preparación/Meet & Greet. Incluye autenticación privada configurable para poder habilitar el módulo con datos reales.

No incluye CRM externo, OCR garantizado de cualquier manuscrito, visión cloud, envío de WhatsApp, análisis de personalidad/solvencia, edición posterior de datos privados ni borrador persistente. El registro de resultados «Registrar presentación» permanece separado.

## Requisitos funcionales

- REQ-01: acceso **Nuevo tour** en Hoy y Calendario. Desde Calendario hereda fecha seleccionada; modo privado usa fecha operativa de sala, modo demo conserva fecha sintética y etiqueta de ejemplo. No alterar las métricas de muestra por accidente.
- REQ-02: foto/cámara o archivo JPEG/PNG. Preview antes de enviar; alternativa manual siempre disponible. Cliente normaliza/orienta/comprime y elimina metadatos al recodificar; máximo 1.5 MB decodificado, cuerpo máximo 2 MB. Error visible para formato/tamaño inválido.
- REQ-03: OCR local Tesseract fuera del bloqueo de datos, límite total 20 s. Parser nuevo de etiquetas explícitas de survey, separado del parser de listas. Valores no reconocidos vacíos, procedencia y advertencias; ningún preview crea tour. Archivo temporal restringido eliminado también en error/timeout; no conservar imagen ni OCR bruto.
- REQ-04: formulario editable con visitante principal obligatorio (1–80 caracteres), acompañante opcional (0–80), fecha y horas válidas, inicio anterior a fin, sala/asesor visibles y limitados por permisos. Contexto opcional: idioma de catálogo, hasta cinco intereses de 60 caracteres, notas de 400 y contacto estructurado teléfono/email opcional validado. No pedir identidad oficial, ingresos ni dirección.
- REQ-05: preservar cambios humanos frente a respuestas OCR tardías. Borrador y foto solo en memoria de la sesión de página; mantener al volver/cambiar ruta, limpiar al salir/cambiar usuario/expirar sesión. Texto «Mantener borrador durante esta sesión»; no prometer recuperación tras recarga.
- REQ-06: resumen editable y confirmación humana explícita. Guardar con requestId idempotente, bloquear doble clic, revisar empalmes dentro del bloqueo. Fallo de red/409 conserva el borrador. Mismo requestId y payload devuelve mismo tour; payload distinto devuelve 409.
- REQ-07: guardar tour anónimo y registro privado en la misma escritura atómica. Generar referencia Lead #NNNN válida y única; si se agota el espacio, devolver error sin escribir. Estado inicial pendiente, nunca resultado de venta. Mostrar el tour en agenda de su fecha después de guardar.
- REQ-08: consultas privadas solo por cookie autenticada, ignorando encabezados/query de actor. Rep propietario; jefe de sala original; admin. No exponer nombres, contacto o notas privadas en tours públicos, contexto de Hermes, URLs, logs ni mensajes de error.
- REQ-09: tours vinculados a registros privados solo pueden modificarse/eliminarse/reasignarse mediante sesión privada autorizada. Reset con registros privados requiere admin privado. Cambio de sala del propietario requiere admin privado y no transfiere acceso a datos históricos automáticamente.
- REQ-10: éxito ofrece preparación genérica por identificador anónimo en el Copiloto y apertura de Meet & Greet. Ningún nombre/contacto/foto/nota se inserta en `q`. Lectura OCR se etiqueta «Lectura asistida del survey»; no simular una extracción de Hermes inexistente.
- REQ-11: capacidad de autenticación privada con hashes por usuario fuera del repo. Modo privado rechaza contraseña compartida y sesiones emitidas en modo demo. Usar hashing estándar con sal (scrypt), comparación segura, archivo restringido, control de intentos existente y cookies HttpOnly/Secure/SameSite. Herramienta de provisión por stdin, sin contraseña en argumentos, logs o documentación.

## Contrato HTTP propuesto

Se mantienen rutas actuales. Endpoints nuevos:

| Método y ruta | Entrada / salida | Permiso |
|---|---|---|
| GET `/api/tour-registrations/capabilities` | `{ok, enabled, mode, ocrAvailable, canRegister, operationalDate, timeZone}` | Puede informar capacidad sin PII; no habilita por encabezado |
| POST `/api/tour-registrations/preview` | `{image, mime}` → `{ok, engine, candidates, warnings}`; candidatos `{value, source, state}` | Cookie válida; privada para modo privado |
| POST `/api/tour-registrations` | JSON siguiente → `{ok, visit, registration}` | Rep propio/jefe sala/admin autenticado |
| GET `/api/tour-registrations?date=YYYY-MM-DD&limit=50` | Lista privada, límite 1–100, filtro de fecha | Mismo alcance; sin PII de otros |
| GET `/api/tour-registrations/:tourId` | Un registro privado o 404 | Mismo alcance |

```json
{
  "requestId": "UUID",
  "source": "manual",
  "date": "2026-11-09",
  "start": "10:30",
  "end": "11:30",
  "visitors": {"primaryName": "Ana Demo", "companionName": "Luis Demo"},
  "preferences": {"language": "es", "interests": [], "notes": ""},
  "contact": null,
  "reviewConfirmed": true
}
```

`source` es `manual|survey`; `repId` solo opcional para jefe/admin, validado contra directorio. El rep no puede enviar otro rep/sala. `contact` es null o `{type: "email|phone", value: "..."}`. No aceptar campos desconocidos sensibles. Preview devuelve exclusivamente candidatos de campos permitidos, nunca texto bruto. Sala, asesor y horario propuesto se distinguen de datos leídos.

Idiomas permitidos: cadena vacía (sin declarar), `es`, `en`, `otro`. `candidates` es un objeto con claves `primaryName`, `companionName`, `language`, `interests`, `notes`; cada candidato es `{value, source:"survey", state:"review|missing"}`. Valores de texto ausentes son `""`, intereses ausentes `[]`; todo valor detectado exige revisión humana. No extraer contacto automáticamente en v1. `warnings` es una lista de códigos conocidos con texto seguro. Después de purgar el hash personal, cualquier uso del requestId conservado devuelve `409 registration_expired`, sin recrear el registro ni comparar PII eliminada.

Errores `{ok:false, code, error, fields?}`: 400 validación, 401 sesión ausente/expirada, 403 permiso/modo de autenticación, 404 registro no disponible, 409 empalme/idempotencia, 413 tamaño, 415 formato, 429 límite de intentos/preview, 503 módulo deshabilitado o servicio. OCR ausente/ilegible/timeout devuelve preview sin candidatos y advertencia recuperable. Cliente conserva error estructurado.

## Datos y seguridad

Colección interna `tourRegistrations`, separada de `visits`, dentro del store privado JSON del servicio; una operación bajo `flock` y reemplazo atómico confirma ambos. Sin dependencia de base de datos nueva. Proyección explícita de campos públicos de `visits`; nunca devolver el store entero. Registro privado: tourId, actor propietario, sala original, campos revisados, origen, requestId, hash del payload y fechas de creación/revisión. Datos antiguos sin colección continúan funcionando.

Retención propuesta: 30 días de datos personales confirmados; limpieza al inicio, en operaciones y tarea periódica diaria aun sin tráfico. Conservar el tour anónimo y tombstone de idempotencia sin nombres, contacto, notas ni hash del payload personal después de purgar. El plazo efectivo máximo es 31 días por la cadencia diaria. Borrado normal del tour elimina su registro privado en la misma transacción. Backups con la misma retención; modo privado no se habilita hasta verificar permisos del directorio/archivo y exclusión de cache/logs. No se modifica configuración de backups remotos sin inspección.

Las guardas privadas aplican por igual a preview, creación, lista y detalle; apagar el flag no debilita la protección de registros existentes. Si un rep cambia de sala, deja de leer los registros privados de la sala anterior; el jefe de la sala original y admin privado mantienen su acceso histórico. El cambio de sala no vuelve público ningún dato. Retirar o rotar credenciales invalida las sesiones de ese usuario mediante versión de credencial; no esperar únicamente a su expiración.

Mutaciones privadas exigen Origin del mismo sitio en navegador, JSON y sesión; no aceptar CORS abierto. Respuestas privadas `Cache-Control: no-store`. Revalidar sesión después del OCR. Rechazar imágenes inválidas antes del subprocess; no ejecutar comandos shell con contenido del survey. Los fixtures y Stitch solo contienen datos sintéticos.

## Configuración y publicación

- `OPS_TOUR_REGISTRATION_ENABLED=0` por defecto.
- `OPS_TOUR_REGISTRATION_MODE=demo|private`, demo por defecto; uso de demo explícito con fixtures, nunca presentación como producción privada.
- `OPS_AUTH_MODE=demo|private`; modo privado exige `OPS_PRIVATE_CREDENTIALS_FILE` con hashes individuales y deniega sesiones demo antiguas. Sin archivo válido falla cerrado para el módulo privado.
- `OPS_TIME_ZONE=America/Cancun` propuesto para estas salas; fecha operativa calculada con esa zona, configurable.
- Validación local con store temporal y cuentas privadas sintéticas. Publicación puede instalar el código apagado; activar datos reales requiere credenciales privadas provisionadas y pruebas de aislamiento. No se inventan ni publican contraseñas.
- Destinos observados en runbook: estáticos `/var/www/salesacademy.softvibes.art/`, API `/opt/salesacademy-ops/`, servicio `salesacademy-ops`; confirmar configuración activa antes de operar. No cambiar landing cloud ni ejecutar reset de producción.

## Calidad y criterios de aceptacion

| AC | Resultado verificable | Pruebas propuestas |
|---|---|---|
| AC-01 | Manual revisado crea un único tour y reaparece tras reinicio | unit/API + e2e manual |
| AC-02 | Foto genera candidatos sin escribir; ilegible/timeout permite manual | OCR stub/fixture + e2e |
| AC-03 | Fecha imposible, nombre vacío, fin anterior, empalme no escriben | unit/API |
| AC-04 | Reintento idéntico no duplica; conflicto conserva borrador | concurrencia/API + UI |
| AC-05 | Rep ajeno/sala ajena/header falso/demo contra private no leen ni escriben PII | seguridad API |
| AC-06 | Tours/contexto/directorio/reset no filtran o destruyen registros privados por acceso abierto | regresión API |
| AC-07 | Hoy/Calendario muestran fecha registrada; resultado de venta intacto | frontend/e2e |
| AC-08 | Foco, labels, errores y CTA accesibles a 360/390/1440 px; contexto opcional cerrado | DOM + revisión visual |
| AC-09 | Sesión expirada y cambio de usuario limpian memoria/foto; OCR tardío no pisa revisión | unit/frontend |
| AC-10 | Credenciales individuales, revocación de demo, retención y flag cerrado comprobados | auth/persistencia/API |

Objetivos no funcionales: controles ≥44px, texto de campo ≥16px, contraste normal ≥4.5:1; OCR total ≤20s; no bloqueo de agenda durante OCR; sin nueva dependencia JS. No declarar OCR fiable en manuscritos hasta medir corpus de surveys representativos.

## Gate CP2 → CP3

- [x] Requisitos, contrato, datos, seguridad y criterios propuestos.
- [x] Aprobación explícita de Roger sobre versión 1 y datos de prueba de la historia.
- [x] Historia LISTA y verificador exitoso; evidence/ready-gate.txt.
- [x] Plan TDD por capas revisado en cp3-implementation-plan.md.

**Aprobación:** Roger, 2026-11-10: «Apruebo v1; implementar», conversación. Autoriza implementación de v1 y validación local; activación privada conserva sus gates operativos.

**Estado de implementación:** inicio de CP3 tras verificar historia. Las maquetas no acreditan backend.
