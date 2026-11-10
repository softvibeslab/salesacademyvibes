# Sales Academy Cloud · Operación

Publicación solicitada por Roger el 2026-11-07. Evidencia y contrato: `work/features/2026-11-07-publish-versions/`.

## Direcciones

- Índice: https://salesacademy.softvibes.cloud/
- Versiones: https://v1.salesacademy.softvibes.cloud/descubre/ hasta https://v5.salesacademy.softvibes.cloud/descubre/.
- Cada origen conserva `/mediahub/`, `/cms/`, `/descubre/diagnostico/` y sus recursos.
- Galerías v4/v5: `/growth-assets/scenarios/index.html`.
- Alias del padre `/v1/`…`/v5/` y sus sufijos llevan al origen correspondiente.

## Release y servicios

VPS (host privado). Raíz `/srv/salesacademy-cloud`, release activo `releases/20261107-advisor-rich-07`, symlink `current`. Release anterior recuperable: `releases/20261107-advisor-links-06`; también se conserva advisor-05. También se conservan film-play-04, meet-greet-03, compact-screens-02 y versions-01. El índice está en `current/index`; los cinco runtimes en `current/vN`. Venv propio, requirements fijados e iguales en las cinco versiones. La extracción verifica hashes de los ZIPs y cada miembro antes de seleccionar exclusivamente runtime.

Units `salesacademy-cloud@v1.service`…`@v5.service`. Usuarios `sa-cloud-v1`…`sa-cloud-v5`. Puertos18481–18485 ligados solo a127.0.0.1. Cada servicio tiene un worker y cuatro threads. Estado SQLite/medios fuera del release: `/var/lib/salesacademy-cloud/vN`, permisos0700. Configuración sin contraseñas en `/etc/salesacademy-cloud/vN.env`,0600.

Vhost dedicado `/etc/nginx/sites-available/salesacademy-cloud.conf`, enlazado en `sites-enabled`. DNS: seis A a<host privado>, TTL300, creados con `overwrite:false`. Certificado SAN dedicado `/etc/letsencrypt/live/salesacademy.softvibes.cloud/`, válido hasta2027-02-05, timer de renovación y hook Nginx existentes comprobados.

`COOKIE_SECURE=True`, `PUBLIC_CONTACT_ENABLED=False`; cookies host-only, HttpOnly, SameSite Strict. Nginx reemplaza headers reenviados y ProxyFix confía en un solo salto. El CTA WhatsApp de v5 conserva el número solicitado; no se envían mensajes desde servidor ni desde QA.

## Accesos y datos

Se crearon propietarios nuevos, con contraseñas aleatorias independientes, en las cinco bases vacías. El archivo de entrega permanece **solo** en `/root/salesacademy-cloud-access.json` del VPS, modo0600; no está en el webroot, repositorio, manifiesto ni ZIP.

La revisión automática rechazó la transferencia a `/private/tmp/salesacademy-cloud-access.json`: exige autorización explícita del usuario para copiar estos secretos a ese destino. No se reintentó ni se utilizó otra vía. La publicación y las pruebas autenticadas en el propio servidor sí están completadas. No imprimir contraseñas en logs ni docs. Entrega local pendiente de autorización.

No se importaron cuentas, sesiones, leads ni ediciones de las demos locales. Los CMS pueden editar y publicar contenido en su propia versión. El diagnóstico permanece abierto; los formularios de captación se mantienen deshabilitados por la configuración de producción de las entregas. No se mezclan las bases de versiones.

## Verificar

```sh
python3 growth/deploy/versions/verify_public.py --json /tmp/public-smoke.json
python3 -m unittest discover -s growth/deploy/versions -p 'test_*.py' -v
```

En el VPS, `operations/verify_cms.py` usa el archivo privado directamente y solo hace login, lecturas, previews y logout. Nunca ejecuta publicación válida ni modifica contenido. Los informes no contienen usuarios, contraseñas, cookies ni tokens.

## Reversión

Esta es la primera publicación de Cloud; no hay release Cloud previo. Para retirar temporalmente las versiones sin dirigir sus dominios a otro sitio, activar el vhost de mantenimiento dedicado (503) y detener exclusivamente las cinco units. Conservar DNS, certificado y bases. Preparar primero una copia de la configuración vigente en `operations/`; probar `nginx -t` antes de recargar. Si falla, restaurar la copia y no recargar.

```sh
cp /etc/nginx/sites-available/salesacademy-cloud.conf /srv/salesacademy-cloud/operations/vhost-before-maintenance.conf
cp /srv/salesacademy-cloud/operations/maintenance-nginx.conf /etc/nginx/sites-available/salesacademy-cloud.conf
nginx -t
# Solo si la prueba anterior pasó:
systemctl reload nginx
systemctl stop salesacademy-cloud@v1 salesacademy-cloud@v2 salesacademy-cloud@v3 salesacademy-cloud@v4 salesacademy-cloud@v5
```

Para reactivar, arrancar esas cinco units, comprobar sus health en loopback, restaurar `vhost-before-maintenance.conf`, ejecutar `nginx -t` y recargar. No borrar estados. La reversión está documentada y preparada, no ejecutada sobre la publicación activa.

Para una entrega futura: construir otro directorio, validar manifest, respaldar datos de cada versión usando SQLite backup, probar compatibilidad y cambiar `current` de forma atómica; reiniciar solo las units de Cloud. `install_release.py` es un instalador inicial deliberadamente conservador y rechaza reemplazar un despliegue existente. No usarlo como actualizador.

## Ajuste de pantallas · 2026-11-07

Se redujeron 21–23% los marcos de app del índice, V5 y su galería. Solo 3 CSS cambiaron; estado CMS, originales y versiones anteriores permanecen intactos. Parche y evidencia: work/features/2026-11-07-compact-app-screens/ftd.md. Para revertir este ajuste basta apuntar current al release 20261107-versions-01 y reiniciar V5; no es necesario activar mantenimiento ni detener las otras versiones.

## Meet & Greet · 2026-11-07

La captura aportada se retocó con imagegen y se integró en el capítulo Aprender y el escenario de bienvenida. Original, PNG retocada y WebP optimizada disponibles; catálogo de16 pantallas y nueva composición02-meet-greet.png. Se mantienen las dimensiones compactas y el resto de versiones. Fuente, prompt, pruebas y hashes: work/features/2026-11-07-meet-greet-screen/.

Para revertir únicamente esta incorporación: apuntar current a releases/20261107-compact-screens-02 y reiniciar salesacademy-cloud@v5.service. Las bases editoriales no se cambian.

## Botón de película · 2026-11-07

V5 incorpora un botón dorado sobre las películas de la landing y del MediaHub. Reproduce por clic o teclado, transfiere el foco al video, se oculta durante la reproducción y reaparece al pausar o terminar. Conserva audio, subtítulos y controles nativos; funciona sin JavaScript mediante los controles originales y respeta movimiento reducido. Pruebas y publicación: work/features/2026-11-07-film-play-cta/.

Solo cambian macros.html, media-player.css y media-player.mjs en V5. Para revertir únicamente este ajuste: apuntar current a releases/20261107-meet-greet-03 y reiniciar salesacademy-cloud@v5.service. Se conservan el retoque Meet & Greet, las pantallas compactas y el estado CMS.

## Asesor IA · 2026-11-07

V5 incorpora el widget público en landing, MediaHub, diagnóstico y galería. Perfil Hermes `sales-academy-advisor`, transporte privado loopback18642, servicio `salesacademy-advisor.service` bajo usuario propio. El backend compone contexto desde publicación actual y ficha comercial revisada; no incluye borradores ni datos operativos. Cada inferencia usa un hogar efímero, sin herramientas generales ni memoria compartida. Detalles en `growth/deploy/advisor/README.md`.

V5 carga `/etc/salesacademy-advisor/client.env` mediante `/etc/systemd/system/salesacademy-cloud@v5.service.d/advisor.conf`; contiene configuración privada solo en VPS. No imprimir ni descargar valores. `PUBLIC_CONTACT_ENABLED=False` permanece; las solicitudes del asesor tienen su consentimiento y rutas propios.

Sesiones de chat caducan una hora después de crearse. Solicitudes consentidas permanecen hasta90d sin actividad. `salesacademy-advisor-retention.timer` ejecuta purga como sa-cloud-v5 cada5min. Owner CMS dispone de «Asesor IA» con solicitudes y estados pending_confirmation/contacted/qualified/closed. Sesiones/mensajes son conteos de sesiones sin expirar, no acumulados históricos.

WhatsApp de Chris:529843163268, confirmado por Roger. El enlace contiene solo el resumen revisado; el visitante decide enviarlo. No se verifica disponibilidad, confirma reserva ni se envían mensajes automáticamente. Cualificación y nutrición se realizan en la conversación; campañas posteriores no están activadas.

Publicación: advisor-05 añadió12 archivos nuevos/modificados de V5 y tablas aditivas. Una copia SQLite privada previa permanece solo en VPS en operations/advisor-05-private-backup. advisor-links-06 ajusta ranking de recursos mencionados por la respuesta y límite Unicode del contrato. Evidencia: work/features/2026-11-07-sales-advisor/.

Revertir solo el último ajuste: cambiar current atómicamente a advisor-05 y reiniciar V5. Revertir toda la incorporación: desactivar timer de retención, retirar únicamente advisor.conf, daemon-reload, cambiar current a film-play-04 y reiniciar V5; conservar DB privada (tablas aditivas), y detener servicio advisor y timer de credencial cuando no haya solicitudes. No afecta gateway Hermes/Copiloto anteriores ni las otras cuatro versiones.

## Experiencia del asesor · 2026-11-07

Release advisor-rich-07 refuerza contraste y tipografía, limita la respuesta visible a 90 palabras y ofrece hasta tres sugerencias contextuales y dos recursos publicados. Los cinco videos curados pueden reproducirse en el asesor con audio y subtítulos, solo tras pulsar play. El contenido completo de una respuesta larga permanece en «Ver detalle».

Cambian cuatro archivos de V5 (advisor.py, OpenAPI, advisor.mjs y advisor.css) y únicamente la redacción SOUL del perfil Hermes. No cambia el esquema de datos ni las credenciales. Solo se reinicia V5; Hermes lee el perfil en cada solicitud. Evidencia: work/features/2026-11-07-advisor-rich-experience/.

Reversión de este incremento: restaurar ambas SOUL desde /srv/salesacademy-cloud/operations/advisor-rich-07-profile-before.md mediante reemplazo atómico conservando dueño y permisos; apuntar current a releases/20261107-advisor-links-06 y reiniciar salesacademy-cloud@v5.service. No borrar estados ni detener otros servicios. El instalador intenta esta reversión si falla su comprobación de salud; el smoke público con inferencia es el gate adicional de cierre.
