# Despliegue posterior · pendiente de autorización

Esta entrega no ejecuta cambios de DNS, hosting, VPS ni producción. El código funciona como servicio editorial independiente Flask/SQLite. El servidor de desarrollo es solo una vista previa en loopback.

En un despliegue aprobado, usar un proceso WSGI (Gunicorn incluido), un usuario de servicio y un directorio persistente privado fuera del árbol servido. `SA_GROWTH_DATA_ROOT` es obligatorio. Ejemplo de arranque interno, desde la raíz del repositorio:

```sh
SA_GROWTH_DATA_ROOT=/var/lib/salesacademy-growth growth/.venv/bin/gunicorn 'growth.server.app:create_app()' --bind 127.0.0.1:4186 --workers 1 --threads 4 --access-logfile /dev/null
```

Publicar solo las rutas `/descubre/`, `/mediahub/`, `/cms/`, `/growth-assets/`, `/growth-api/` y `/media/` detrás del proxy HTTPS existente. No reemplazar el upstream de `/`, `/ops/`, `/copiloto/` o `/api/`. Conservar `Host`; configurar explícitamente la confianza del proxy y el esquema HTTPS según el hosting real. No activar CORS global. Configurar límite de carga de 11 MB y backups fuera del webroot. La cookie usa Secure por defecto.

El contacto público sigue apagado en la fábrica de la aplicación. El aviso local declara un estado de revisión: no habilitar captación pública hasta completar responsable, canal de atención, aviso final y retención. Ningún contenido, evento ni solicitud debe enviarse automáticamente a terceros. Las cinco comunicaciones son borradores.

Antes del cambio público: backup verificado, prueba de restauración, cuenta owner individual, eliminación de datos sintéticos, QA de rutas del producto existente y comprobación de HTTPS. La vuelta atrás consiste en retirar las nuevas rutas del proxy y conservar los datos para diagnóstico, sin sobrescribir los servicios previos.
