# CP2 · Contrato de publicación

Estado: implementación del despliegue solicitado explícitamente, registrado antes del código. La autorización no se amplía a aplicaciones ajenas.

## Requisitos y Criterios de aceptacion

- REQ-01 / AC-01: https://salesacademy.softvibes.cloud/ devuelve índice HTML/CSS, v5 destacada y enlaces v1–v5. Móvil 360/390 y escritorio1440 sin overflow; navegación sin JavaScript.
- REQ-02 / AC-02: https://vN.salesacademy.softvibes.cloud/descubre/, /mediahub/ y /cms/ para N=1..5. Raíz de cada versión redirige a /descubre/. En padre, /vN/ y /vN/<ruta> redirigen al subdominio conservando la ruta. Rutas desconocidas responden404.
- REQ-03 / AC-03: v4/v5 /growth-assets/scenarios/index.html funciona, imágenes y videos referenciados cargan; recursos estáticos conservan hashes del ZIP de origen. Sin URLs localhost en navegación pública.
- REQ-04 / AC-04: HTTPS con SAN explícitos para los seis nombres, HTTP redirige a HTTPS después de emisión. Se agregan seis registros A en softvibes.cloud al VPS76.13.231.12 sin reemplazar otros registros.
- REQ-05 / AC-05: cinco Gunicorn en loopback18481–18485, un worker y cuatro threads cada uno, usuarios y DATA_ROOT separados. COOKIE_SECURE=True, PUBLIC_CONTACT_ENABLED=False. ProxyFix confía en un proxy local; Nginx reemplaza X-Forwarded-For y X-Forwarded-Proto. Cookies host-only, HttpOnly y SameSite Strict. CMS exige sesión y CSRF.
- REQ-06 / AC-06: publicar exclusivamente server/site/content/requirements de ZIPs verificados y wrapper de despliegue; sin pruebas, fuentes de evidencia, ZIPs, bases locales ni claves dentro del webroot. Datos persistentes fuera del release en /var/lib/salesacademy-cloud/vN. Usuarios owner nuevos con claves aleatorias privadas. API existente sin ampliación.
- REQ-07 / AC-07: health, rutas públicas, acceso CMS, login, preview y protecciones se comprueban bajo HTTPS. Pruebas no envían mensajes a WhatsApp. Un clic no confirma cita.
- REQ-08 / AC-08: Nginx y servicios actuales se comprueban antes y después. Se agrega un vhost independiente y cinco units; ningún cambio a .art/.pro. Release inmutable, manifiesto SHA256 y procedimiento de reversión.

## Repo Paths

Implementación nueva en growth/deploy/versions/: build_release.py, wsgi.py, index/, configuración Nginx/systemd y procedimientos. Pruebas específicas en el mismo directorio; evidencia y CP0–CP5 aquí. ZIPs de growth/dist/ son las fuentes inmutables, no el árbol operativo modificado del usuario.

## NFR y Seguridad

NFR-01: HTTPS, estado privado, sin secretos en logs/repo, menor privilegio, timeouts y límites HTTP. NFR-02: No CDN ni dependencia frontend nueva. Venv separado con requirements idénticos de las cinco versiones. Índice sin scripts, video automático ni analytics. Los directorios, DNS y units de Cloud tienen nombres dedicados para hacer rollback sin tocar otras aplicaciones.
