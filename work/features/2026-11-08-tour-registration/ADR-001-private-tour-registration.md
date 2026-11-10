# ADR-001 · Registro privado de tours sin alterar la agenda anónima

**Estado:** ACEPTADA — CP2 v1 aprobado por Roger el 2026-11-10
**Fecha:** 2026-11-08
**Contrato rector:** [CP2, versión 1](cp2-spec.md)
**Implementación:** CP3 en curso

## Contexto observado

La app vigente usa JavaScript nativo y una API Python stdlib. El store JSON ya dispone de exclusión mediante `flock` y reemplazo atómico. Los tours actuales utilizan `Lead #NNNN`; `/ops/` permite actor por encabezado y las contraseñas de reps/jefes son compartidas para demostración. Ninguno de esos mecanismos autoriza datos personales del nuevo módulo.

## Decisión aceptada

1. Añadir `tourRegistrations` como colección interna, separada de `visits`, dentro del store privado actual. Confirmar tour anónimo, registro privado e idempotencia en una sola operación bajo el bloqueo existente. No introducir SQLite ni otra dependencia en esta versión.
2. Mantener proyecciones explícitas de tours públicos; los nombres, contacto, notas privadas, imagen y OCR no forman parte de `visits`, respuestas públicas ni contexto de Hermes. La imagen y OCR bruto no se persisten.
3. Resolver identidad exclusivamente desde la cookie para endpoints privados. Según CP2 v1, `OPS_AUTH_MODE=private` es global: exige hashes individuales externos al repo y rechaza contraseña compartida y sesiones demo anteriores. Sin configurar modo privado se conserva el comportamiento demo. El modo de emisión de la sesión proviene de la configuración del servidor, no del navegador; un encabezado nunca eleva la autenticación. No se propone coexistencia por nivel individual de usuario.
4. Fijar propietario y sala original en el registro. Los cambios públicos de asignación no conceden acceso privado. Proteger también las mutaciones de tours vinculados, reset y cambios de sala; estas guardas siguen vigentes aunque se apague el flag del módulo.
5. Leer surveys con Tesseract local fuera del bloqueo del store, parser de etiquetas y revisión humana. El OCR no tiene autoridad para crear registros, asignar personas ni decidir permisos.
6. Conservar el feature flag apagado por defecto. Validar localmente con datos sintéticos; habilitar uso real solo tras provisión privada, pruebas de aislamiento y verificación de retención, permisos y backups.

## Alternativas consideradas

| Alternativa | Evaluación |
|---|---|
| Incrustar datos de pareja en `visits` | Rechazada: los endpoints actuales devuelven tours completos y hay acceso público por encabezado. |
| Segundo archivo JSON para datos privados | Rechazada para esta versión: complica confirmar agenda e información privada sin escrituras parciales. |
| Migrar todo a SQLite | Diferida: ofrece transacciones, pero exige migración de store y revalidación de consumidores. Mantener agenda JSON y solo PII en SQLite tampoco resuelve la atomicidad entre ambos. |
| OCR por proveedor multimodal/Hermes | Fuera de alcance: no hay parser multimodal de surveys verificado ni fuente local del puente Copiloto en este repo. |

## Consecuencias

- Se mantiene el runtime y la compatibilidad con datos antiguos; no se requiere migración SQL.
- El aislamiento es lógico y de API, no separación física: quien pueda leer el archivo del servicio podrá leer la colección privada. Permisos de archivos y backups son condiciones de habilitación.
- Cada respuesta y mutación debe respetar el límite público/privado. Proteger solo los endpoints nuevos sería insuficiente.
- El propietario privado no cambia por una reasignación pública. La transferencia posterior de datos personales queda fuera de esta versión.
- La retención de 30 días se aplica mediante purga diaria y tombstone sin PII conforme a CP2.

## Precisiones aceptadas en CP2 v1

- Guardas idénticas en todos los endpoints privados; flag apagado no debilita protección de registros existentes.
- Purga diaria: objetivo 30 días, máximo efectivo 31. Tombstone sin PII ni hash personal; reintentos posteriores devuelven 409 registration_expired.
- Rep trasladado pierde lectura privada de sala anterior; jefe original/admin mantienen acceso. No transferir PII por reasignación pública.
- Versión de credencial revoca sesiones al rotar o retirar acceso; modo privado rechaza sesiones demo anteriores.

## Evidencia exigida

Pruebas RED → GREEN de creación atómica, repetición idempotente, empalme concurrente, rechazo de encabezados falsos, aislamiento de salas, respuestas sin PII, reset protegido, sesiones demo contra modo privado, purga y funcionamiento con el flag apagado. Este ADR registra la decisión aprobada; las pruebas se acreditan únicamente en CP4.
