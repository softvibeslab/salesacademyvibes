# Revisión del despliegue

Revisión independiente de advisor_media_review, de solo lectura. Correcciones aplicadas antes de publicar:

- Intentar restaurar ambas SOUL y el release aunque falle una restauración de identidad.
- Verificar SHA de JS y CSS y salud del bridge, además de sesión V5.
- Exigir usuario root y nombres exactos de release y parent.
- Conservar uid/gid/modo de ambas SOUL y comprobarlos después.

El instalador verifica linaje, manifiesto completo, archivos candidatos y espacio antes de cambiar current. No lee credenciales ni cambia bases. La salud del bridge no acredita respuesta del modelo: las dos inferencias sintéticas públicas son gate adicional antes de cerrar. Si falla la conexión real por este cambio, se restaura la identidad respaldada y el release anterior según deployment.json.

Excepción TDD: configuración y operación del despliegue; validación por sintaxis, revisión, hashes, salud e inferencia pública. No se ha provocado un fallo en producción para probar rollback.
