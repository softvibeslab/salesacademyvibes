# Revisión del contrato CMS y verificación de publicación

Fecha: 2026-11-07. Alcance: lectura directa de `growth/server/app.py` contenido en los ZIPs de v1–v5, preparación de `growth/deploy/versions/verify_public.py` y comprobaciones locales con respuestas simuladas. No hubo solicitudes a dominios públicos, VPS, WhatsApp ni APIs de publicación.

## Contrato comprobado en las cinco versiones

Las funciones `authentication`, `login`, `session`, `logout`, `preview`, `publish_document` y `health` tienen contenido idéntico en los cinco ZIPs. Las cabeceras mantienen el mismo comportamiento de caché y sesión; v3–v5 incorporan proveedores de video a la CSP.

| Operación | Contrato | Efecto |
| --- | --- | --- |
| Health | `GET /growth-api/health` → `200 {"ok":true}` | Lectura; `no-store` y `noindex`. |
| Shell del CMS | `GET /cms/` → HTML público | No implica acceso al contenido privado. |
| Login | `POST /cms/api/login`, JSON `{username,password}` → `{user,csrf}` | Crea sesión, registra auditoría y usa el limitador de intentos. No modifica publicaciones. |
| Sesión | `GET /cms/api/session` → `{user,csrf}` | Exige cookie válida. No existe `/cms/api/me`. |
| Borrador | `GET /cms/api/draft` | Lectura autenticada; devuelve el documento y revisión. |
| Vista previa | `GET /cms/preview/`, `?page=hub` o `?resource=<slug>` | Lectura del borrador; exige sesión y usa `Cache-Control: no-store`. |
| Publicar | `POST /cms/api/publish`, JSON `{revision}` | Requiere owner, cookie, origen válido y `X-CSRF-Token`. Inserta publicación y cambia el puntero activo, incluso cuando el contenido es idéntico. |
| Logout | `POST /cms/api/logout`, JSON `{}` y `X-CSRF-Token` | Elimina sesión, registra auditoría y borra cookie. |

La cookie se establece con `Secure` según la configuración, `HttpOnly`, `SameSite=Strict`, `Path=/` y sin atributo `Domain`. Las cinco versiones deben mantener bases separadas; no compartir la misma cookie entre subdominios. El wrapper/proxy de producción debe conservar la detección de HTTPS y `COOKIE_SECURE=True`.

Sin sesión, las rutas GET registradas del CMS y las vistas previas responden `401` con `error.code=unauthorized`. Una ruta inexistente debe seguir siendo `404`; hacer GET a una operación exclusiva POST no demuestra su protección de autenticación.

## Smoke autenticado seguro, sin alterar contenido publicado

1. Cargar credenciales desde el archivo privado generado durante el despliegue, sin volcarlas a argumentos, registros, JSON de evidencia ni salida de terminal. Mantener una cookie jar independiente por versión y validar el certificado HTTPS.
2. Enviar un único login válido por versión con `Origin` igual al origen HTTPS del subdominio. Conservar cookie y CSRF sólo durante la prueba. Verificar atributos de cookie: Secure, HttpOnly, SameSite Strict, Path `/`, ausencia de Domain.
3. Consultar `GET /cms/api/session`, `GET /cms/api/draft` y `GET /cms/api/revisions`. Registrar únicamente códigos HTTP y resultados booleanos de las comprobaciones, nunca tokens, documentos o datos de personas.
4. Abrir las vistas previas de landing y hub. Deben devolver HTML y `Cache-Control: no-store`. Comprobar rutas de recursos públicos sin ejecutar scripts que registren eventos.
5. Para verificar CSRF sin editar contenido: enviar `POST /cms/api/logout` con cookie válida y sin `X-CSRF-Token`. Debe responder `403 csrf_required`. La verificación ocurre antes de ejecutar logout; confirmar después que `GET /cms/api/session` sigue respondiendo `200`.
6. Cerrar sesión con el CSRF correcto; verificar `200` y borrado de cookie. El GET de sesión posterior debe ser `401`.
7. Comparar antes/después la revisión de borrador y los identificadores de publicaciones obtenidos por lectura. Deben permanecer iguales. Las únicas escrituras esperadas son sesión, auditoría y contadores de login, no contenido editorial.

No ejecutar un `POST /cms/api/publish` válido como prueba de producción. Para comprobar la publicación funcional, usar una copia aislada de los datos y la aplicación o las pruebas existentes; un ciclo publicar/restaurar agrega historial y puede servir contenido transitorio a visitantes. Tampoco enviar formularios de contacto, eventos de analytics o mensajes de WhatsApp durante el smoke.

## Verificador público preparado

Ruta: `growth/deploy/versions/verify_public.py`. Sólo utiliza la biblioteca estándar de Python. Ejecución prevista después de DNS/TLS:

```sh
python3 growth/deploy/versions/verify_public.py --json work/features/2026-11-07-publish-versions/public-smoke.json
```

Cobertura:

- Seis nombres HTTPS y redirección HTTP a HTTPS, con validación TLS habilitada.
- Índice con enlaces v1–v5; aliases `/vN/` y rutas profundas con query; raíz de cada versión a `/descubre/`.
- Landing, diagnóstico, privacidad, análisis, MediaHub, shell CMS y galerías de v4/v5.
- Health y siete rutas privadas por versión que deben rechazar acceso anónimo con `401`.
- Rutas desconocidas `404`; ausencia de localhost y direcciones de loopback en HTML.
- HSTS, CSP, nosniff y Referrer-Policy; `no-store`/`noindex` en CMS y health.
- Recursos de origen propio referenciados en HTML y validadores de caché. Los cinco videos de cada v3/v4/v5 se verifican con `Range: bytes=0-1023`, esperando `206`, tipo MP4, Content-Range correcto y exactamente 1024 bytes.

El verificador emite exclusivamente GET, no sigue ninguna redirección ni enlaces externos, ignora proxies de entorno y no tiene cookies ni credenciales. La evidencia JSON contiene URLs y resultados, no cuerpos de respuesta ni cabeceras de cookie. Su código de salida es `1` si cualquier comprobación falla.

## Evidencia local y límites

Se ejecutaron diez pruebas unitarias efímeras, con `unittest` y respuestas simuladas, sin acceso de red: **10/10 OK**. Cubrieron rechazo de destinos ajenos/credenciales en URL, extracción de assets, método GET y límites de lectura, no seguimiento de redirects, contrato anónimo CMS, detección de cabeceras ausentes, Range correcto e incorrecto, preservación de query, detección de localhost, exclusión de assets externos y validación TLS activa. Se comprobaron tanto respuestas aceptadas como fallos detectados.

Excepción TDD: se trata de una herramienta de verificación del despliegue y documentación, sin cambios al producto. La evidencia anterior valida el propio verificador; no demuestra todavía el estado de producción. Quedan pendientes la ejecución pública después de DNS/TLS y el smoke autenticado con credenciales privadas.
