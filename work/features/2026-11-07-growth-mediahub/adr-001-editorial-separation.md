# ADR-001 · Separar descubrimiento editorial y operación de salas

**Estado:** Aceptado como parte de CP2 v1, 2026-11-07; aprobación registrada en la historia.

## Contexto

La raíz del dominio sirve la app. El API operativo usa un encabezado de rol para el demo y un archivo JSON. Eso no es un sistema de identidad reutilizable para edición pública. El CMS de referencia de Cisne Negro ya contiene patrones de Flask, SQLite, sesiones, CSRF, medios y revisiones; no basta copiar sus pantallas.

## Decisión propuesta

Mantener el frontend comercial HTML/CSS/JS y renderizar publicaciones como HTML legible. Adaptar selectivamente los módulos editoriales y controles del CMS de referencia a un servicio Python/Flask propio, SQLite editorial separado, almacenamiento de medios fuera del despliegue y sesiones individuales. Nuevas superficies `/descubre/`, `/mediahub/`, `/cms/` y `/growth-api/`; conservar `/`, `/ops/`, `/copiloto/` y `/api/`.

La base visual principal es la plantilla de academias y la marca de Sales Academy; el pitch aporta ritmo y demostración. El CMS de otro nicho es referencia técnica y funcional, no fuente de contenido o cuentas. No se heredan límites comerciales ni datos de ese cliente.

## Alternativas

| Opción | Valor | Motivo de selección o descarte |
|---|---|---|
| Adaptación selectiva Python/Flask/SQLite | Alineada con stack y referencia comprobable en código | Recomendada para v1; requiere pruebas específicas y revisión de seguridad |
| CMS nuevo con framework integral | Puede aportar identidad y administración ya resueltas | Mayor cambio de stack y dependencia; reconsiderar si adaptación no mantiene límites claros |
| CMS externo gestionado | Reduce operación editorial propia | Añade proveedor, cuenta, coste y transferencia de contenido no acordados |
| JSON/localStorage editado en navegador | Prototipo rápido | No cumple persistencia multiusuario, permisos ni publicación controlada |

## Consecuencias

Se mantiene el demo de operación aislado. Revertir una publicación no puede borrar solicitudes ni tours. Hay que implementar contratos específicos de recursos/landing, render seguro, controles de acceso, backups y migraciones repetibles. SQLite es una decisión para una instancia editorial pequeña; multiinstancia o concurrencia sostenida exige revisión. No se promete una capacidad de usuarios ni disponibilidad sin prueba.

Antes de reutilizar código: leer instrucciones de la referencia, revisar Git y dependencias, identificar funciones acopladas al negocio anterior, excluir secretos/datos y adaptar pruebas al contrato de Sales Academy. Ningún comando de prueba debe apuntar a producción ni ejecutar el reset del API de tours.
