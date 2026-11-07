# Inventario de las cinco versiones y estrategia de publicación

Fecha: 2026-11-07. Alcance de esta revisión: lectura de los paquetes y del servicio editorial; no se leyó información secreta ni se realizó despliegue. La petición del usuario autoriza publicar todas las versiones en el dominio indicado. La decisión de infraestructura corresponde al contrato de esta feature.

## Paquetes verificados

Se comprobaron el SHA-256 del ZIP, la integridad del contenedor y cada hash del manifiesto. Los cinco paquetes conservan la raíz `salesacademy-growth/growth/`. Evidencia estructurada: [versions-inventory.json](versions-inventory.json).

| Versión | ZIP | Bytes del ZIP | Archivos del manifiesto | Recursos publicados iniciales | Árbol growth sin tests, bytes |
|---|---|---:|---:|---:|---:|
| v1 | salesacademy-growth-v1.zip | 3,867,005 | 115 | 3 | 501,733 |
| v2 | salesacademy-growth-v2.zip | 9,119,480 | 163 | 3 | 676,085 |
| v3 | salesacademy-growth-v3.zip | 46,083,211 | 319 | 8 | 23,499,130 |
| v4 | salesacademy-room-scenarios-v4.zip | 72,199,451 | 493 | 9 | 28,509,477 |
| v5 | salesacademy-ai-vsl-v5.zip | 99,337,177 | 614 | 9 | 29,028,030 |

Los ZIP completos incluyen documentación y capturas de validación, por eso pesan más que el árbol necesario para ejecutar la aplicación. El total `growth` sin tests es 82,214,455 bytes. No es necesario publicar los ZIP ni las evidencias dentro del webroot.

Todos usan exactamente el mismo `requirements.txt` y el mismo entry point `growth.server.app:create_app()`. Dependencias observadas: Flask 3.1.3, Gunicorn 23.0.0, Werkzeug 3.1.9, Pillow 12.3.0, pypdf 7.0.0 y sus dependencias fijadas. Un mismo entorno de dependencias puede servir a los cinco procesos, si la instalación valida esas versiones.

## Rutas de cada versión

Las cinco implementan `/descubre/`, `/descubre/diagnostico/`, `/descubre/analisis/`, `/descubre/privacidad/`, `/mediahub/`, `/cms/`, `/cms/api/`, `/growth-assets/`, `/growth-api/` y `/media/`. El servidor editorial no sirve la app operativa `/ops/`, `/copiloto/` ni `/api/`.

V4 y v5 añaden la galería completa en `/growth-assets/scenarios/index.html`, con capturas, fotos y composiciones relativas a esa carpeta. V3 incluye los cinco videos; v4 agrega la jornada simulada; v5 destaca smart-agent como VSL y mantiene el CTA WhatsApp autorizado.

Para el índice de comparación se recomienda:

| Versión | Título de tarjeta | Enlace principal | Enlace complementario |
|---|---|---|---|
| v1 | Landing, diagnóstico y mediahub | `/descubre/` | `/mediahub/` |
| v2 | Diseño editorial | `/descubre/` | `/mediahub/` |
| v3 | Recorrido cinematográfico | `/descubre/` | `/mediahub/` |
| v4 | Un día en la sala | `/growth-assets/scenarios/index.html` | `/descubre/` |
| v5 | Agentes de IA + VSL | `/descubre/` | `/growth-assets/scenarios/index.html` |

## Opción preferida: subdominios nativos

Usar `salesacademy.softvibes.cloud` para el índice y `v1.salesacademy.softvibes.cloud` hasta `v5.salesacademy.softvibes.cloud` para los sitios. El padre puede ofrecer también `/v1/` a `/v5/` como redirecciones cómodas. En cada subdominio, `/` redirige a `/descubre/`; el enlace de la tarjeta v4 puede abrir directamente su galería.

Esta arquitectura conserva los HTML, JS, JSON, rutas y contratos de los paquetes sin reescribir su contenido. Cada origen mantiene cookies host-only y localStorage propios. Las llamadas relativas a `/cms/api/` y `/growth-api/` permanecen en la versión correspondiente. No necesita CORS ni cambios en el catálogo de videos.

Desventajas concretas: requiere DNS y HTTPS para seis nombres. Un certificado `*.softvibes.cloud` no cubre `v1.salesacademy.softvibes.cloud`; hacen falta SAN explícitos o un wildcard para el nivel adecuado. La infraestructura debe comprobar renovación y resolución de los seis nombres. El índice debe usar tarjetas y enlaces, no iframes: la CSP existente declara `frame-ancestors 'self'`, por lo que el padre no puede embeber los subdominios sin cambiar esa política.

Los alias `/vN/` pueden redirigir al destino principal de cada versión. Si se aceptan sufijos como `/v3/mediahub/`, conviene preservar el sufijo y query hacia el subdominio exacto, sin construir un redirect abierto a hosts arbitrarios.

## Aislamiento de ejecución y estado

Las cinco versiones importan el namespace Python `growth`. Deben correr en cinco procesos independientes: importar las cinco en un solo intérprete mediante cambios de `sys.path` podría reutilizar módulos de la primera versión por `sys.modules`.

Ejemplo conceptual de proceso por versión, desde la raíz extraída del ZIP:

```sh
SA_GROWTH_DATA_ROOT=/var/lib/salesacademy-growth/v1 \
  /opt/salesacademy-growth/venv/bin/gunicorn 'production:app' \
  --bind 127.0.0.1:PORT --workers 1 --threads 4
```

`production.py` puede ser un wrapper de despliegue separado del árbol inmutable: importa la fábrica, mantiene `COOKIE_SECURE=True`, `PUBLIC_CONTACT_ENABLED=False` y agrega confianza explícita del proxy solo para el número de saltos conocido. Nginx conserva `Host`, establece `X-Forwarded-Proto` y un `X-Forwarded-For` controlado; la aplicación se enlaza solo a loopback. El `origin_check` compara el origen recibido con `request.host_url`, por lo que el esquema HTTPS debe ser reconocido correctamente para que el CMS no rechace sus propias escrituras.

Cada versión necesita `DATA_ROOT` propio, persistente y privado. No copiar bases de demo, cuentas locales, sesiones ni archivos `*-access.txt`. Las semillas editoriales son contenido de ejemplo autorizado; no son solicitudes reales que deban migrarse. Crear cuentas owner individuales mediante el mecanismo de bootstrap, conservar credenciales fuera de código/webroot y verificar permisos, restauración y respaldo. Las aplicaciones ya implementan CSRF, roles, cookies Secure/HttpOnly/SameSite Strict, rate limiting y límite de carga de 11 MB.

La captación de formularios queda deshabilitada por defecto. Esto permite publicar los materiales y el CTA WhatsApp de v5 sin habilitar un nuevo flujo de correo o almacenar solicitudes reales en las versiones históricas. La disponibilidad de la cuenta de WhatsApp y una cita confirmada no se deducen de publicar el enlace.

## Alternativa: prefijos en un solo host

Un `proxy_pass` que únicamente retire `/vN/` no basta. Las plantillas, el JavaScript y el JSON usan rutas absolutas `/descubre/`, `/mediahub/`, `/cms/`, `/growth-assets/`, `/growth-api/` y `/media/`. Saltarían al padre o a otra versión.

Sería necesario adaptar respuestas de HTML, JS, CSS y JSON, redirecciones y el `Path` de Set-Cookie/Delete-Cookie. Un sub_filter Nginx para namespaces conocidos, con compresión desactivada hacia upstream y pruebas de cada flujo, puede evitar cambios en los ZIP; requiere verificar especialmente CMS, portadas, adjuntos, preview, publicar/restaurar, logout, videos Range206 y módulos JS. El catálogo del servidor valida rutas exactas `/growth-assets/films/...`; cambiar sus archivos fuente a `/vN/growth-assets/...` rompe esa validación. La adaptación tendría que ocurrir al servir la respuesta, no alterando el catálogo.

El prefijo debe manejar también las cookies de cada versión (`Path=/vN/`), pero los paths no constituyen aislamiento de origen para almacenamiento o código. La opción de subdominios evita estas transformaciones y reduce la superficie de regresión; por eso es preferible con el DNS y TLS disponibles.

## Alternativa descartada para la entrega completa: exportar solo HTML

Una exportación estática puede publicar la apariencia y películas, pero pierde CMS, permisos, preview/publicación, filtros del servidor, descarga editorial y recepción local de formularios. Solo sería adecuada como archivo visual explícito; no equivale a publicar todas las funcionalidades solicitadas previamente.

## Verificación antes de cerrar la publicación

Comprobar por versión: HTTPS, landing/mediahub/galería aplicable, cinco identidades visuales distintas, cero solicitudes a localhost, recursos estáticos y videos con Range206, cookies seguras host-only, API CMS sin sesión401, login/preview/logout en origen correcto, límites de carga y contacto histórico apagado. Las pruebas que escriban contenido deben usar un recurso de QA aislado y retirarlo/restaurarlo antes de cerrar. No realizar tests operativos contra `/api/` o `/ops/` de la aplicación existente.
