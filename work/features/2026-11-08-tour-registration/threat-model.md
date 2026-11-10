# Modelo de amenazas · Nuevo tour

**Estado:** ACEPTADO como análisis de CP2 v1 — implementación y comprobaciones en curso
**Fecha:** 2026-11-08
**Referencias:** [CP2](cp2-spec.md), [ADR-001](ADR-001-private-tour-registration.md)

## Límites de confianza

Navegador y survey son entradas no confiables. El servidor determina identidad, sala, propietario, estado y permisos. `/ops/` y su encabezado de actor pertenecen al flujo de agenda anónima; no otorgan acceso privado. El OCR es un proceso local sin autoridad de escritura. El archivo del servicio y sus backups contienen la información confirmada. Hermes recibe únicamente la agenda anónima autorizada.

## Riesgos y comprobación propuesta

| Riesgo concreto | Mitigación propuesta / comprobación requerida |
|---|---|
| Suplantar admin/jefe con `X-Ops-Actor` o query `actor` | Endpoints privados consultan solo cookie y modo de sesión. Rechazar encabezado falso incluso acompañado de cookie de otro usuario. |
| Entrar como cualquier rep con contraseña demo compartida | Modo privado exige credencial individual y rechaza sesión demo previa. Verificar comportamiento al alternar modos y retirar credenciales. |
| Filtrar PII por `GET /tours`, POST/PATCH/PUT de tours, resultados, `/context` o errores | Proyección pública explícita en todas las respuestas; colección privada nunca serializada incidentalmente. Buscar valores sintéticos distintivos en respuestas y logs de pruebas. |
| Modificar `repId` o mover un rep de sala para obtener un registro | Propietario y sala original privados inmutables; autorizar por esos valores. Mutaciones vinculadas y cambios de sala requieren sesión privada autorizada. Reasignación pública no transfiere datos. |
| Borrar registros privados usando `/reset` o DELETE abierto | Guarda independiente del feature flag: admin privado para reset con registros; sesión privada y alcance para borrar tour vinculado. Borrado del tour y registro juntos. |
| CSRF o caché de datos personales | Mutaciones JSON con Origin permitido, cookie y sin CORS abierto. Respuestas privadas no-store; excluir PII del service worker/cache y URLs. |
| Foto maliciosa, demasiado grande o OCR que consume recursos | Validar formato real y tamaño, temporal restringido, timeout total 20 s, límite de solicitudes/concurrencia, sin shell; OCR fuera del bloqueo del store y limpieza en error/cancelación. |
| Texto del survey usado como instrucción o dato inventado | Parser de etiquetas permitidas, candidatos editables, vacíos en ausencia; no ejecutar instrucciones del documento ni enviarlo a Hermes. Confirmación humana antes de crear. |
| OCR tardío pisa correcciones o sobrevive a cambio de usuario | Asociar respuesta al intento y usuario vigente; cancelar/ignorar respuestas antiguas. Revalidar sesión después del OCR y limpiar memoria al salir/expirar. |
| Doble clic, reintento de red o dos registros concurrentes | Idempotencia por actor y requestId; validar empalmes y crear agenda/registro en una operación bloqueada. Dos solicitudes concurrentes no producen dos reservas. |
| Permisos de disco débiles o backup con PII indefinida | Verificar directorio/store/temporales y backup antes de habilitar. No declarar anonimato físico: el JSON contiene la colección privada. |
| Retención declarada de 30 días sin ejecución efectiva | Purga al inicio/uso no garantiza borrado puntual si el servicio permanece inactivo. Definir tarea periódica o documentar límite operativo; impedir lecturas de registros expirados. Backups deben aplicar la misma política. |
| Hash del payload retiene un derivado de PII después de la purga | El tombstone posterior al vencimiento excluye campos privados y hash del payload personal; definir respuesta idempotente posterior sin reconstruir datos. |
| Datos personales persistidos accidentalmente en cliente o herramientas | Borrador/foto solo memoria; limpiar al cambiar usuario. Fixtures, capturas y Stitch sintéticos; sin PII en localStorage, telemetría, preguntas `q` o logs. |

## Decisiones cerradas en CP2 v1

Guardas uniformes y vigentes con flag apagado; alcance histórico de sala original; purga periódica sin tráfico <=31 días; tombstone sin hash personal y 409 registration_expired; revocación de sesión por versión de credencial. Autenticación global OPS_AUTH_MODE, con modo de emisión de sesión determinado por servidor. No hay coexistencia de autenticación demo y privada por usuario. Estas decisiones están aprobadas; la evidencia de su ejecución pertenece a CP4.

## Condición de habilitación

Flag apagado hasta demostrar autenticación privada, aislamiento y proyecciones, guardas de mutación, permisos de archivos, retención y ausencia de caché/logs con PII. La aplicación local puede validarse con cuentas privadas y datos sintéticos. Este documento es análisis del contrato, no evidencia de una función desplegada.
