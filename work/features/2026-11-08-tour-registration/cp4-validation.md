# CP4 · Evidencia de diseño e implementación

**Status:** complete — implementación, UAT, publicación y activación privada verificadas
**Date:** 2026-11-10

## Evidencia ejecutada del diseño

| Verificación | Evidencia | Resultado observado |
|---|---|---|
| Pantallas persistidas | Stitch get_project y get_screen; `evidence/canvas-final.json`, `screens-final.json` | 64 nodos: 54 originales, Rendimiento actualizado por el usuario, guía del tour y ocho pantallas TOUR |
| Preservación | Comparación id/sourceScreen/label contra baseline de 54 | 54/54 conservados; también permanece Rendimiento |
| Integridad de las ocho copias | `evidence/copied-screens-verification.json` | 8/8 HTML coinciden exactamente con la revisión refinada; etiquetas de prototipo presentes |
| Formulario manual | form-cro analyzer sobre `stitch/tour-04.html` | Exit 0; nueve controles totales, cuatro requeridos; contexto opcional cerrado, date/time y textarea |
| Revisión de etiquetas | HTMLParser por id/for; `evidence/html-field-review.json` | Inspección independiente del parser simplificado de la skill |
| Vista de lienzo | Chrome/Stitch nativo | Ocho pantallas visibles y seleccionables; unión preservó actualización simultánea de KPIs |

Excepción visual: las maquetas y CSS se verifican por inspección y UAT. El código productivo registra RED → GREEN debajo; no se extiende la excepción visual al comportamiento.

## Límites observados de la maqueta

- El analizador form-cro da falsos positivos de etiquetas porque busca labels por nombre y después del campo. Las etiquetas visibles están vinculadas por id; no se usa su puntuación como medida de conversión ni se repiten sus porcentajes genéricos.
- La navegación, OCR, guardar y autenticación no están implementados por los HTML de Stitch. Los CTAs del diseño no acreditan integración funcional.
- TOUR 03 aún requiere formalizar form y hora de fin en la implementación; el formulario manual y escritorio sí muestran inicio/fin. Los marcos móviles son 390 px fijos; la validación del runtime se registra en la UAT final.
- El screenshot descargado de TOUR 03 mostró regiones de texto vacías aunque el HTML exportado y el lienzo contienen los campos. No se usa esa miniatura parcial como evidencia de accesibilidad.
- El estilo de la app real usa DM Sans; Stitch utilizó Arial/Helvetica conforme al brief. La implementación reutilizará la tipografía/tokens reales.

## TRUST 5 proporcional al diseño

| Dimensión | Estado y evidencia |
|---|---|
| Tested | Verificados ocho recursos persistidos, correspondencia HTML y conservación de nodos; pruebas funcionales pendientes |
| Readable | Acciones Foto del survey / Ingresar información / Revisar resumen / Registrar tour; campos etiquetados y contexto opcional |
| Unified | Dos rutas convergen en revisión; registro de resultados sigue separado; ajustes de coherencia en CP2/CP3 |
| Secured | Solo ejemplos sintéticos en Stitch; datos reales requieren credenciales privadas y pruebas de aislamiento |
| Trackable | Solicitud, alcance confirmado, contrato propuesto, IDs del lienzo y exportaciones en esta feature |

## Puertas de implementación

Roger aprobó CP2 v1 el 2026-11-10: «Apruebo v1; implementar». verify-story salió 0 con historia LISTA. Evidencia en evidence/ready-gate.txt.

## TDD y pruebas de implementación

Comandos desde `prototypes/smart-agenda-mockup`, almacenes temporales y cuentas ficticias. Los detalles y salidas están en `backend-implementation.md`, `frontend-implementation.md` y `evidence/`.

| Caso | Fase | Comando | Resultado observado |
|---|---|---|---|
| T01 auth | RED | `python3 -B tests/test_tour_registration.py` | 13 fallos esperados: login privado 401 en vez de 200; backend-registration-red.txt |
| T02/T03 rutas | RED | Mismo comando después de auth | Login pasa; alta/preview reciben 404, capacidad ausente; backend-red-after-auth.txt |
| T05/T06 estado/UI | RED | `node --test tests/tour-registration.mjs tests/tour-registration-ui.mjs` | 14 assertions de comportamiento fallan; frontend-red.txt |
| Seguridad | RED | Casos test_17 a test_21 del backend | Reset tras purga, downgrade, rotación durante login, login cross-origin e imagen incompleta reproducidos antes del arreglo |
| Sesión/carreras UI | RED | Suite Node nueva | 3 fallos de autorización/detalle y 2 de logout/teléfono; frontend-races-red.txt y frontend-logout-red.txt |
| T01–T04/T07 backend | GREEN | `python3 -B -m unittest discover -s tests -p 'test_*.py'` | 39/39 pasan, incluidos 21 del registro; backend-python-final.txt |
| T05/T06 frontend | GREEN | `node --test tests/tour-registration.mjs tests/tour-registration-ui.mjs` | 19/19 pasan; frontend-green.txt |
| Regresión API | GREEN | `env -u OPS_BASE node tests/e2e-ops.mjs` | e2e-ops ok en localhost; backend-e2e-final.txt |
| Regresión frontend | GREEN | Ocho suites Node listadas en frontend-implementation.md | 8/8 pasan; frontend-regression.txt |
| Integración real | GREEN | `node tests/e2e-tour-registration.mjs` | Controlador→HTTP→store: foto/manual, revisión, doble envío, replay, conflicto, privacidad, reinicio y expiración; controller-api-integration.txt |
| OCR real | GREEN | Ejecución aislada de Tesseract en VPS con survey-demo.png | Cinco campos leídos en 0.995 s; temporal eliminado; ocr-vps-synthetic.json |

El OCR, la limpieza CLI y la integración final incluyen comprobaciones de contrato añadidas después de implementar; no se inventa un RED anterior independiente. Las cinco correcciones de seguridad y las carreras frontend sí tienen RED documentado. Node conserva un aviso previo de autodetección ESM; no requiere alterar el package.json fuera del proyecto.

## Revisión independiente y criterios

`evidence/security-review.md` registra 39 pruebas Python, 19 Node, 98 payloads anidados, agotamiento de leads sin escritura y purga ejecutada sin tráfico. Cinco hallazgos se corrigieron; no quedan bloqueantes abiertos dentro del alcance local revisado.

| AC | Estado observado |
|---|---|
| AC-01 | API real y controlador crean; lectura tras reinicio conserva el registro |
| AC-02 | Fixture OCR real pasa; ilegible/ausente/timeout recuperables y cleanup probado |
| AC-03 | Validación y empalmes rechazan sin escritura |
| AC-04 | Reintentos concurrentes e idénticos no duplican; conflicto conserva borrador |
| AC-05 | Matriz de cookie/actor/sala/rotación/modo pasa |
| AC-06 | Proyecciones públicas, contexto, reset, transferencias y flag apagado comprobados |
| AC-07 | Manual completo en navegador, agenda de fecha elegida y estado pendiente sin resultado; API/controlador integrados |
| AC-08 | Labels, escaping, contraste mínimo 6.46:1 y formulario a 360/390/1440 verificados; selector nativo y foco de teclado observados. Cámara física móvil no probada |
| AC-09 | Limpieza inmediata, foto liberada, cambio de sesión y respuestas tardías probados |
| AC-10 | Siete cuentas privadas reales verificadas por HTTPS, demo rechazada, timer activo y permisos 0700/0600; evidencia activation-private.json |

## TRUST 5 de implementación

| Dimensión | Evidencia y límites |
|---|---|
| Tested | 39 pruebas Python, 21 frontend y regresiones/integración pasan; UAT real y smoke HTTPS privados ejecutados |
| Readable | Módulos separados para credenciales, registro, OCR y estado UI; errores accionables y contexto opcional |
| Unified | Contrato v1, dos entradas al mismo registro, resultados previos conservados y regresiones verdes |
| Secured | Cookie privada, Origin/JSON, scrypt, revisión independiente, no PII pública, retención y temporales acotados |
| Trackable | Aprobación citable, historia LISTA, ADR aceptado, rutas, RED/GREEN e IDs Stitch en el producto |

## Primer intento de UAT — histórico, resuelto por la revisión final

CUA mostró login privado y Hoy a 375 px con fecha operativa del 10 de noviembre y botón Nuevo tour. Después devolvió `noWindowsAvailable` / `elementHasNoFrame`, incluso tras reconectar; por eso no se acredita el recorrido completo del formulario ni selección de foto en navegador. Esto no se registra como fallo funcional confirmado de la app.

No se ha medido un corpus de manuscritos. El OCR asistido exige revisión humana y conserva ruta manual. La activación con datos reales permanece pendiente de la elección de acceso inicial del usuario y de completar UAT; publicar código apagado no equivale a activar captura privada.

## Primera publicación apagada · 2026-11-10 — histórico

- Destino: `https://salesacademy.softvibes.art/`; no se modificó la landing cloud ni el servicio del puerto 8010.
- Trece archivos de código/unidades publicados según `evidence/release-manifest.json`. Imports frontend versionados para evitar mezclar versiones en caché; `node --check agenda.js` salió 0 tras ese ajuste de configuración.
- Servicio `salesacademy-ops` activo y salud HTTPS 200. Los cinco recursos frontend tienen hash idéntico al paquete. APIs con `Cache-Control: no-store`.
- Capacidad pública: `enabled:false`, `canRegister:false`, `ocrAvailable:true`. Consulta del registro devuelve `503 module_disabled`, como corresponde a esta publicación apagada.
- Directorio de datos 0700 y store 0600; los siete tours existentes se conservaron sin cambios, cero registros privados creados.
- Timer diario instalado y activo; se ejecutó la limpieza sin registros privados y se verificó siguiente disparo `2026-11-11 00:00:00 UTC`.
- Respaldo solo de código/unidades: `/var/backups/salesacademy-ops/releases/tour-v1-20261110T214039Z`. No contiene store, imágenes ni credenciales. No se crearon backups personales ni se cambiaron políticas remotas. No se encontraron jobs locales de backup del store en los directorios inspeccionados; las copias externas requieren verificación antes de activar datos reales.
- Evidencia: `evidence/deployment-disabled.json`, `evidence/https-release-smoke.json`. No hubo reset, provisión de cuentas reales ni envío de mensajes.

Gobierno estricto salió 0; evidencia `evidence/governance-strict.txt`. Este gate valida historia/artefactos/TDD, no sustituye UAT pendiente ni autoriza inferir una respuesta a la pregunta de accesos.


## Cierre de UAT y activación privada · 2026-11-10

Roger respondió explícitamente: «Crear accesos privados para las cuentas actuales y guardar las claves fuera del sitio». Se aplicó la autorización existente, sin pedir aprobación duplicada. UAT completa mediante CUA en Chrome: manual → revisión → confirmación → agenda, selector nativo, fallback OCR local y teclado; revisión a 360/390/1440 en `evidence/uat-browser-final.md`.

La UAT encontró pérdida de archivo cuando el refresco de sesión redibujaba el input. Se escribió reproducción RED y se corrigió con selector temporal independiente; 21/21 pruebas frontend pasan. Se repitió la selección real dejando el diálogo abierto más de 15 segundos y pasó con caché `20261110tour2`. Publicados tres archivos con respaldo solo de código; `evidence/photo-patch-deployment.json`.

| Caso | Fase | Comando | Resultado observado |
|---|---|---|---|
| Foto durante refresco y expiración | RED | `node --test tests/tour-photo-picker.mjs` | Dos fallos esperados: archivo perdido y referencia retenida; photo-picker-red.txt |
| Selector y módulo completo | GREEN | `node --test tests/tour-photo-picker.mjs tests/tour-registration.mjs tests/tour-registration-ui.mjs` | 21/21; photo-picker-green.txt; repetido por coordinador |
| Preview HTTPS con imagen de 59 KB | RED | Smoke privado con fixture a /api/tour-registrations/preview | 413 del proxy; upstream acepta el tamaño; nginx-preview-413-diagnosis.md |
| Preview HTTPS corregido | GREEN | Mismo smoke privado con fixture | 200, Tesseract, cinco campos cotejados, no-store; https-final-smoke.json |

Excepcion TDD: configuración de proxy y provisión operacional; se verificaron por reproducción real, inspección, nginx -t, recarga y smoke. El proxy conservaba un máximo de 32 KB para toda la API: se añadió una ruta exacta de preview con límite de 2,000,000 bytes y timeout de 30 segundos, manteniendo el resto. El backend conserva límite OCR de 20 segundos, validación de imagen y autorización. Respaldo `/var/backups/salesacademy-ops/releases/tour-proxy-20261110T224035Z`.

La activación real verificó siete cuentas (seis del directorio y admin), rechazo de contraseña demo, cookies privadas y alcance: propietario/jefe original/admin pueden leer; otro asesor y otra sala no. El replay devolvió un único tour. Se eliminó únicamente la visita sintética creada por requestId, se cerraron las sesiones y se cotejaron intactas las siete visitas anteriores. No hubo reset. Servicio y timer permanecen activos. `evidence/activation-private.json`.

Entrega de claves fuera del sitio y repositorio: `/Users/rogergv/.config/salesacademy/initial-access.json`, directorio 0700/archivo 0600. Copia de recuperación VPS root-only y hashes scrypt legibles solo por el servicio. Ninguna clave, hash ni cookie se incluyó en esta evidencia. `evidence/credential-handoff.json`.

Respaldos y límites: revisión en `evidence/backup-activation-review.md`; no se identificaron jobs locales del store, y releases solo respaldaron código/configuración. La política estándar del proveedor rota respaldos con edad inferior a 30 días; no se acreditó inventario individual ni se modificó su política. Los 30 días de PII (máximo operativo 31) aplican al store activo, no a eliminación absoluta de todas las copias. Restauraciones deben limpiarse antes de reabrir acceso.

No se acredita cámara física iOS/Android ni reconocimiento general de manuscritos; existe selección de archivo y captura manual. La entrada publicada muestra Acceso privado y pide cuenta individual; navegador real confirmó el sitio HTTPS. La comprobación funcional autenticada productiva se hizo por API y la interacción completa por navegador local con los mismos archivos publicados.

Gobierno final ejecutado tras documentar activación y UAT: `verify-governance.sh --strict` terminó con salida 0, evidencia `evidence/governance-final.txt`. `git diff --check` terminó con salida 0. Se cerró el servidor temporal de QA y su limpieza elimina store y credenciales ficticias; producción conserva únicamente sus cuentas privadas autorizadas.
