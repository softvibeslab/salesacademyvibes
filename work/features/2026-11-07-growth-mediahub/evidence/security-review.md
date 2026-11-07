# Revisión independiente de seguridad e integración

Fecha: 2026-11-07. Revisor: agente `growth_media`. Carril: Contrato; CP2 aprobado. Alcance: lectura de `growth/server/app.py`, `content.py`, `store.py` y `media.py`; reproducciones con bases y archivos temporales, exclusivamente datos sintéticos. El revisor no modificó código backend durante esta revisión. Las correcciones las realizó `growth_backend`.

Skill aplicada: [code-reviewer](/Users/rogergv/.agents/skills/code-reviewer/SKILL.md), incluyendo sus reglas universales y de Python. La revisión priorizó autenticación, autorización, privacidad, referencias públicas y concurrencia. No se asigna una puntuación automática ni se interpreta esta revisión como prueba de seguridad exhaustiva.

## Resultado

No quedan hallazgos materiales abiertos dentro del alcance revisado. Se detectaron y corrigieron una carrera de autenticación y dos defectos de integración multimedia. Se verificó además la función de retención añadida durante la revisión. La captura pública permanece deshabilitada por defecto; la activación pública y la programación operativa de retención quedan fuera de esta entrega local.

## Hallazgos y resolución

| ID | Severidad inicial | Evidencia y efecto | Resolución verificada |
|---|---|---|---|
| SEC-01 | Alta | `app.py`, versión inicial líneas 245–253: la comprobación de contraseña ocurría antes de adquirir la transacción que insertaba la sesión. Reproducción determinista: ejecutar `reset_staff_password` justo después de comprobar el hash anterior. El login respondió **200** y la nueva sesión respondió **200**, pese al reset. Una contraseña recién revocada podía emitir una sesión válida por hasta ocho horas. | Cerrado. `app.py:249` relee la cuenta bajo `BEGIN IMMEDIATE`; `app.py:253` exige que siga activa y que el hash no haya cambiado. La regresión `test_password_reset_during_login_cannot_create_stale_session` ahora exige login **401** y sesión **401**. |
| INT-01 | Media | `app.py`, versión inicial línea 409: `send_file` infería MIME a partir del nombre original. Una carga JPEG produjo `/web` con cabecera **image/jpeg** y bytes **RIFF…WEBP**. El tipo declarado no correspondía con el derivado. | Cerrado. `app.py:422` declara **image/webp** para web/thumbnail. Comprobado nuevamente por HTTP: **200**, MIME **image/webp** y contenido WebP. PDF mantiene descarga como adjunto. |
| INT-02 | Media | `app.py`, versión inicial línea 394, junto con `media.py:310`: la consulta de uso reutilizaba el filtro de referencias públicas. Un recurso en estado draft con coverId guardado respondió `{"uses":[]}`. Ocultaba al editor referencias existentes y no cumplía AC-12. | Cerrado. `app.py:398` recorre recursos de todos los estados para el inventario editorial. `/usage` incluye borrador y versiones retenidas. La autorización pública conserva su filtro independiente en `app.py:417`. |
| PRIV-01 | Media antes de recoger datos reales | En la versión inicial no existía eliminación de solicitudes inactivas ni auditoría antigua. Los eventos se limpiaban únicamente al ingresar otro evento. La política propuesta 90/30 días no tenía una operación completa. | Cerrado en módulo. `store.py:76` expone `purge_expired_data`: solicitudes según **updated_at** >90 días; eventos y auditoría >30 días; sesiones y límites expirados. La prueba comprueba que una solicitud antigua con actividad reciente permanece y que publicaciones/cuentas no se alteran. La programación y rotación de respaldos corresponden al operador y al runbook. |

## Controles contrastados

| Control | Evidencia revisada o ejecutada |
|---|---|
| CSRF y origen | Escrituras CMS requieren token ligado a sesión; falta de token **403**; origen externo con token correcto **403**. Login exige JSON y no hay CORS permisivo. |
| Sesiones | Token aleatorio; almacenamiento del hash; caducidad ocho horas; cookie HttpOnly/SameSite Strict y Secure por defecto. Desactivación/reset revocan sesiones. Expiración forzada devuelve **401**. La carrera SEC-01 tiene prueba específica. |
| Permisos | Anónimo no obtiene draft/preview; editor no publica ni lee solicitudes/usuarios/métricas de owner. Último owner activo protegido en transacción. |
| Publicación y conflictos | `BEGIN IMMEDIATE` serializa escrituras. Guardar revisión obsoleta devuelve **409**. Validación completa y cambio del puntero público ocurren en la misma transacción. Restaurar crea borrador y conserva solicitudes. |
| Archivos privados | Derivado sin referencia activa **404** para anónimo; original privado incluso cuando el recurso es público. Descarga privada usa `Cache-Control: no-store`. IDs y variantes no se convierten directamente en rutas arbitrarias. |
| Referencias e historial | Derivado de publicación activa **200**. Archivar medio conserva esa publicación. Publicar otra revisión con medio archivado falla **400**. Al retirar su referencia activa, el derivado retenido vuelve a **404** para anónimo. |
| Imágenes y PDF | Formato real y límites comprobados; metadatos eliminados de derivados; original separado; cuota y deduplicación. PDF analizado por pypdf, rechazo de cifrado/acciones/adjuntos, reconstrucción de páginas y descarga forzada. No se declara protección antivirus universal. |
| Solicitudes de demo | Campos permitidos y enumeraciones, consentimiento obligatorio, cuerpo 4 KB, idempotencia transaccional. Diez solicitudes válidas por dirección en una hora; la undécima devuelve **429**. No se expone correo en métricas. |
| Eventos | Lista cerrada de nombres/campos, UUID, máximo 2 KB y resourceId público conocido. Eventos repetidos deduplicados. **120** aceptados por minuto; el siguiente **429**. `demo_requested` se genera exclusivamente en la transacción del servidor. |
| Contenido | Bloques estructurados sin ejecución de HTML; Jinja escapa texto. URLs multimedia restringidas a rutas HTTPS de YouTube/Vimeo y sin descarga servidor, credenciales, puerto o fragmento. SQL con parámetros. |
| Persistencia y errores | Conexiones cerradas con context manager y rollback en fallos. Estado fuera del sitio público, permisos de directorio/base restringidos. Error HTTP genérico; no se registran cuerpos de contacto ni trazas con PII. |

## Evidencia ejecutada

Comando desde la raíz de SalesAcademyVibes:

```sh
/private/tmp/salesacademy-growth-venv/bin/python -m unittest growth.tests.test_backend growth.tests.test_media growth.tests.test_backup
```

Salida observada después de las correcciones:

```text
..............................
----------------------------------------------------------------------
Ran 30 tests in 3.416s

OK
```

Se ejecutó además un script independiente con Flask `test_client`, una base temporal y un JPEG sintético. Observó **30 comprobaciones correctas de 30**, incluyendo la secuencia publicar → archivar → rechazar nueva publicación → retirar referencia pública, controles de CSRF/origen, revisión obsoleta, caducidad y los límites de solicitudes/eventos. El bucle de eventos comprobó también cada una de las primeras 120 respuestas **202**, antes del **429**. No se enviaron solicitudes a producción ni se usaron correos reales.

La reproducción inicial de SEC-01/INT-01/INT-02 devolvió:

```json
{"case":"password reset before session insertion","login_status":200,"session_after_reset":200}
{"case":"WebP derivative MIME","status":200,"mimetype":"image/jpeg","signature":"RIFFJ\u0000\u0000\u0000WEBP"}
{"case":"draft media references","save_status":200,"usage":{"uses":[]}}
```

## Identificación de la versión revisada

SHA-256 al completar las comprobaciones:

```text
app.py     9f503ed69acfb57c0b9150a502bf1386b179f2c09e6bccdf12b2a07f9a8cbf37
content.py bb5d6516a6ff467b4a6915252ff5fc7331ca5f44b2a208c66f03bda907141682
store.py   f660933585939f3c525fd652170c532f0192f249649c45c8bc24158838507f1f
media.py   8b2b54c40cd052e86583b365a1ea2620265191f024dde303b53c89c6ab8d3cc1
```

## Límites de esta revisión

No se validó infraestructura productiva, TLS/proxy, programación de purgas ni rotación de los 14 respaldos diarios propuestos. Los respaldos completos contienen el estado privado y requieren el mismo control de acceso que la base original. La eliminación lógica de filas no constituye un certificado de borrado físico de discos o respaldos. Antes de captar datos reales siguen aplicando el aviso definitivo, responsable y condiciones de retención del CP2. Las pruebas emplearon Flask local; el flujo visual y accesibilidad se verifican en la evidencia de UI del proyecto.
