# Revisión de seguridad · Registro de tours v1

Fecha: 2026-11-10. Revisor independiente: `tour_security_review`.
Carril: Contrato, validación CP4 de CP2 aprobado por Roger.

Estado: revisión local completada. Los cinco hallazgos reproducidos se corrigieron y se verificaron de nuevo de forma independiente. Este informe no acredita despliegue ni activación productiva.

## Alcance y método

Lectura de CP2, ADR, threat-model, plan de pruebas y código de `private_auth.py`, `tour_registration.py`, `survey_preview.py`, `ops_api.py`, CLI de provisión, tarea de retención, `tour-registration.js`, integración `agenda.js`, `ops-api.js` y `sw.js`.

Se aplicaron las perspectivas de fallo operativo, mantenimiento y control de acceso de la skill `adversarial-reviewer`, registrando únicamente problemas concretos o límites explícitos. No se modificó código productivo desde esta revisión. No se operó Chrome, producción, cuentas reales ni servicios externos. Toda prueba usa datos sintéticos y almacenes temporales; HTTP solo en loopback.

El primer intento de la suite Python en sandbox no pudo abrir el puerto local (`PermissionError: Operation not permitted`); la repetición con permiso de ejecución local sí completó la suite. No fue un fallo de la aplicación.

## Hallazgos priorizados

| ID | Prioridad | Hallazgo observado | Estado |
|---|---|---|---|
| SEC-R01 | P1 | Después de purgar todos los registros, `/reset` quedaba accesible por actor de cabecera y borraba los tombstones. Un reintento posterior podía recrear los datos con la clave vencida. | Cerrado: guardia para `tourRegistrationRequests`; test 17 verde independiente. |
| SEC-R02 | P1 | El replay de `POST /tour-registrations` devolvía el registro privado tras cambiar ambos modos a demo y entrar de nuevo con el mismo id. La protección `privacyMode` existía en GET, pero no en el replay. | Cerrado: comprobación de modo y alcance antes del hash/respuesta; test 18 verde independiente. |
| SEC-R03 | P1 | Carrera de rotación durante login: la contraseña se verificaba contra la entrada antigua y `session_fields()` volvía a leer el archivo para sellar la sesión con la versión nueva. La contraseña revocada podía emitir una sesión nueva válida. | Cerrado: `authenticate()` devuelve el stamp de la misma entrada verificada; se revalida antes de emitir. Test 19 verde independiente. |
| SEC-R04 | P1 | En modo privado, `/login` aceptaba origen externo y cuerpo `text/plain`. Una navegación con formulario puede enviar JSON válido y forzar una cuenta conocida por quien inicia la petición, permitiendo confusión de cuenta al capturar datos. | Cerrado: Origin/JSON en login/logout privados; test 20 verde independiente. Demo mantiene su contrato. |
| SEC-R05 | P2 | El validador aceptaba PNG de 45 bytes sin IDAT/CRC válido y JPEG de 14 bytes sin scan como imágenes válidas antes del subprocess. | Cerrado para el caso reproducido: PNG verifica chunks/CRC/orden y JPEG segmentos/frame/scan/EOI. Test 21 y comprobación independiente verdes. Sigue siendo validación estructural, no decoder completo. |

SEC-R02 necesita conocer el requestId y el payload original para reproducir el replay; no se presenta como recuperación arbitraria de PII desconocida. Aun así rompe el límite privado/demo de AC-05. SEC-R05 no constituye inyección de comandos: el subprocess utiliza argumentos separados y no shell.

Para SEC-R03 se sustituyó únicamente `private_auth.verify` durante la prueba: tras verificar la entrada antigua, el fixture rotó el archivo antes de devolver control a `Handler.do_POST`. Salida observada antes del arreglo:

```json
{"case":"credential_rotation_during_login","login_status":200,"old_password_still_valid":false,"issued_session_valid":true}
```

Para SEC-R05 se llamó a `survey_preview.image_bytes()` con contenedores sintéticos truncados. Salida antes del arreglo:

```json
{"case":"invalid_image_container","mime":"image/png","bytes":45,"accepted_before_subprocess":true,"error":""}
{"case":"invalid_image_container","mime":"image/jpeg","bytes":14,"accepted_before_subprocess":true,"error":""}
```

## Evidencia ejecutada

Directorio de ejecución: `prototypes/smart-agenda-mockup`.

| Comando / prueba | Salida observada | Resultado |
|---|---|---|
| `python3 -B -m unittest discover -s tests -p 'test_*.py' -v` inicial | `Ran 34 tests in 1.198s`, `OK` | 18 pruebas anteriores y 16 de registro, todas verdes antes de nuevos casos adversariales. |
| Mismo comando Python, después de las correcciones | `Ran 39 tests in 1.411s`, `OK` | 18 anteriores + 21 de registro; incluye los cinco hallazgos. Exit 0. |
| `node --test tests/tour-registration.mjs tests/tour-registration-ui.mjs` inicial | `tests 14`, `pass 14`, `fail 0` | Controller y markup pasan antes de hardening. |
| Mismo comando Node, después de las correcciones | `tests 19`, `pass 19`, `fail 0`, `duration_ms 50.2395` | Incluye 403, detalle tardío, nuevo borrador, teléfono y limpieza local antes de logout lento. Exit 0. |
| Variantes sintéticas de `tour_registration.clean()` | 98 variantes anidadas; `unhandled_exceptions: []` | Tipos inesperados no causaron excepciones en los campos probados. |
| Agotamiento de referencias con 9000 leads, `registration.create()` | 503 `lead_capacity`, `private_collection_created:false`, `visit_count:9000` | Sin escritura parcial ni lead duplicado. |
| `cleanup_registrations.py` en proceso separado con `OPS_DATA` temporal | exit 0; colección privada vacía, tour anónimo conservado, tombstone `expired`, sin `payloadHash` | La limpieza funciona sin tráfico HTTP. |

Salidas de las comprobaciones adicionales:

```json
{"case":"nested_payload_resilience","variants":98,"unhandled_exceptions":[]}
{"case":"lead_capacity","status":503,"code":"lead_capacity","private_collection_created":false,"visit_count":9000}
{"case":"cleanup_without_traffic","exit":0,"private_collection_count":0,"anonymous_visit_retained":true,"tombstone_state":"expired","hash_removed":true,"stdout":"Tour registration retention completed."}
```

La suite Python original comprueba cookie frente a actor falso, aislamiento rep/sala, cabecera admin junto a cookie rep, flag OFF en mutaciones vinculadas, traslado de sala sin transferencia histórica, Origin ausente/null/ajeno, JSON y campos inválidos, idempotencia concurrente, purga, permisos del archivo de credenciales, revocación por versión, OCR fuera del lock, logout durante OCR, timeout y limpieza temporal. Se leyó el contenido de esas pruebas; la ejecución fue independiente.

También se inspeccionó la evidencia RED→GREEN del implementador en `backend-security-red.txt`, `backend-security-green.txt`, `backend-auth-race-red.txt`, `backend-auth-race-green.txt`, `backend-hardening-red.txt` y `backend-hardening-green.txt`. La ejecución final de este revisor no sustituye ni inventa las ejecuciones RED anteriores.

Para el hardening PNG se detectó que el fixture base64 anterior contenía un CRC de IDAT incorrecto. Se reemplazó por un PNG sintético válido construido con stdlib; no se relajó la expectativa de rechazo de contenedores inválidos.

Comprobación final independiente de imágenes, sin invocar OCR ni enviar contenido:

```json
{"case":"existing_jpeg_structural_check","sample":1,"accepted":true,"bytes":23729,"dimensions":[360,640],"error":""}
{"case":"existing_jpeg_structural_check","sample":2,"accepted":true,"bytes":30595,"dimensions":[360,640],"error":""}
{"case":"invalid_image_container_after_fix","mime":"image/png","accepted":false,"error":"invalid_image"}
{"case":"invalid_image_container_after_fix","mime":"image/jpeg","accepted":false,"error":"invalid_image"}
```

Advertencias no bloqueantes observadas: dos `ResourceWarning` de archivos sin cerrar en fixtures anteriores de `test_tasks.py`; Node avisa que el package padre no declara tipo de módulo. No se cambió configuración global ni fixtures ajenos por estas advertencias.

## Revisión de frontend

El payload privado se envía sin `X-Ops-Actor`; `opsRequest` mantiene cookie same-origin y `cache:no-store` para el módulo. Los valores dinámicos se escapan en markup. El controlador guarda el borrador en memoria; no usa localStorage/sessionStorage/IndexedDB para visitantes. El service worker deja las APIs fuera del cache.

La normalización recodifica JPEG, limita a 1,490,000 bytes y comprueba el tamaño del sobre JSON para no sobrepasar 2 MB. La selección de foto usa epoch/token y revoca URLs de respuestas tardías. La preparación del agente inserta únicamente una referencia anónima válida, sin trasladar nombres, contacto, notas ni imagen a `q`.

El agente frontend identificó y corrigió durante esta revisión carreras de detalle y limpieza por 403. Se notificó además la espera de red antes de limpiar en `logout()`; ahora la limpieza local ocurre primero. Las tres correcciones se leyeron y sus pruebas pasan en la suite final de 19 casos.

## Límites del cierre

- La tarea diaria se probó como proceso sin tráfico; no se instaló ni verificó un timer remoto desde esta auditoría. Su ejecución efectiva diaria, permisos del servicio y retención de backups siguen siendo gates operativos antes de activar datos reales.
- No se midió OCR de manuscritos ni un corpus real de surveys. La disponibilidad de Tesseract no demuestra calidad de extracción.
- La validación PNG/JPEG es estructural y acotada; una imagen con estructura válida puede contener píxeles no decodificables. La decodificación sigue a cargo de Tesseract bajo timeout, slots y fallback manual. No se agregó expansión zlib sin límite ni dependencia nueva.
- Las pruebas de interfaz aquí son de controller/markup. La validación visual y de controles 360/390/1440 px corresponde a la revisión CUA del agente raíz.
- La protección de `/ops/` para la agenda anónima mantiene el contrato demo existente. La auditoría cubre las nuevas fronteras privadas y sus mutaciones vinculadas; no afirma que toda la plataforma legacy use autenticación privada.

## Veredicto final de la revisión local

Sin hallazgos bloqueantes abiertos en el alcance revisado. SEC-R01–R05 cerrados con reproducción, corrección y pruebas verdes independientes. Las pruebas locales de acceso privado, retención y frontend pasan.

Los gates operativos ya exigidos por CP2 —credenciales reales provisionadas, permisos, timer diario, backup/retención y verificación del entorno— permanecen a cargo del despliegue. La publicación del código apagado y la validación sintética no equivalen a activar datos reales.
