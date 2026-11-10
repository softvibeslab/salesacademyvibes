# Evidencia backend · Nuevo tour

**Fecha:** 2026-11-10
**Contrato:** CP2 v1 aprobado, citado por el coordinador.
**Alcance realizado:** backend local, provisión privada y retención; sin conexiones a producción ni despliegue.

## Implementación

- `server/private_auth.py`: modo privado global, credenciales scrypt externas, archivo restringido y revocación por versión/material de credencial. Demo conservada por defecto.
- `server/tour_registration.py`: validación, alcance por propietario y sala original, creación atómica con tour anónimo, idempotencia por actor, proyección pública y purga de PII/tombstones.
- `server/survey_preview.py`: formato JPEG/PNG y dimensiones acotados, lectura Tesseract con plazo total de 20 s, temporal `0600` eliminado, parser explícito, límite de solicitudes y dos OCR simultáneos. No hay visión multimodal ni envío a Hermes.
- `server/ops_api.py`: cinco rutas del contrato, cookie exclusiva, Origin/JSON, OCR fuera del bloqueo y revalidación posterior, protección de mutaciones heredadas y capacidades. Campos privados solo en la colección interna y sus endpoints.
- `server/provision_private_user.py`: entrada oculta/stdin, provisión/rotación/revocación atómica sin imprimir secretos.
- `server/cleanup_registrations.py` y unidades service/timer: retención diaria sin tráfico; API purga también al iniciar y operar.

## TDD y validación observada

| Fase | Comando | Resultado | Evidencia |
|---|---|---|---|
| RED auth | `python3 -B prototypes/smart-agenda-mockup/tests/test_tour_registration.py` | 13 fallos: login privado recibe 401 en lugar de 200 | `evidence/backend-registration-red.txt` |
| RED después de auth | Mismo comando | Login privado ya pasa; rutas reciben 404 en lugar de 201/415; 11 fallos y un error de capacidad ausente | `evidence/backend-red-after-auth.txt` |
| GREEN feature | Mismo comando | 16 pruebas OK | `evidence/backend-registration-green.txt` |
| RED revisión de seguridad | Dos casos `test_17` y `test_18` | Reset con solo tombstones y replay tras cambiar a modo demo devolvían 200 | `evidence/backend-security-red.txt` |
| GREEN revisión de seguridad | Suite completa del módulo | 18 pruebas OK; reset sigue protegido y replay privado no devuelve datos al modo demo | `evidence/backend-security-green.txt` |
| RED carrera login | `test_19` | Rotación dentro del cálculo scrypt emitía sesión 200 de la versión nueva | `evidence/backend-auth-race-red.txt` |
| GREEN carrera login | Suite completa del módulo | 19 pruebas OK; sesión ligada al snapshot realmente verificado y rotación concurrente rechazada | `evidence/backend-auth-race-green.txt` |
| RED hardening | `test_20` y `test_21` | Login cross-origin privado aceptado e imagen sin estructura completa aceptada | `evidence/backend-hardening-red.txt` |
| GREEN hardening | Suite completa del módulo | 21 pruebas OK; Origin/JSON en login/logout privado y contenedores PNG/JPEG verificados | `evidence/backend-hardening-green.txt` |
| Regresión Python | `python3 -B -m unittest discover -s tests -p 'test_*.py'` desde prototipo | 34 pruebas OK; warnings preexistentes de archivos en `test_tasks.py` | `evidence/backend-python-regression.txt` |
| Regresión API | `env -u OPS_BASE node tests/e2e-ops.mjs` desde prototipo | `e2e-ops ok` en localhost | `evidence/backend-e2e-regression.txt` |
| Regresión final Python | `python3 -B -m unittest discover -s tests -p 'test_*.py'` desde prototipo | 39 pruebas OK | `evidence/backend-python-final.txt` |
| Regresión final API | `env -u OPS_BASE node tests/e2e-ops.mjs` desde prototipo | `e2e-ops ok` en localhost | `evidence/backend-e2e-final.txt` |

La primera ejecución dentro del sandbox no pudo abrir puerto; se repitió con autorización del ejecutor para localhost. La evidencia RED acreditada es el fallo de comportamiento con servidor iniciado, no la restricción del sandbox. Las comprobaciones adicionales de parser/timeout/CLI se añadieron como validación de contrato después del GREEN de rutas; no se atribuye un RED previo independiente a esas comprobaciones.

## Cobertura concreta

Manual y persistencia en JSON, identificación anónima única, lista/detalle privados, idempotencia concurrente por usuario, payload cambiado y empalme sin escribir, validación de tipos/fechas/campos, rep/sala ajenos, encabezados falsos, Origin externo/null, content type, flag apagado, reset y PUT/DELETE de resultados protegidos, traslado de sala sin heredar PII, rotación de credenciales y cambio de modo, purga con hash retirado, OCR ausente, OCR fuera del lock y logout durante lectura, parser de fixture sintético, timeout/limpieza de temporal, provisión sin contraseña/hash en stdout.

La revisión independiente detectó dos casos adicionales: reset público después de purga y replay idempotente privado tras cambiar ambos modos a demo. Se reprodujeron antes de corregir. Ahora los tombstones mantienen la guarda de reset y el replay comprueba alcance/modo antes de comparar payload o devolver el registro.

También se reprodujeron y corrigieron la carrera de rotación durante login, login CSRF privado y aceptación de contenedores de imagen incompletos. El PNG mínimo inicial del test tenía CRC de IDAT incorrecto; se sustituyó por un PNG sintético generado con `struct`/`zlib` y CRC correcto. Se mantuvo la expectativa de aceptar una imagen válida; no se relajó el validador para conservar el fixture defectuoso. La validación de imágenes es estructural (PNG chunks/CRC/orden, JPEG segmentos/frame/scan/EOI), no una garantía de decodificación ni calidad óptica. No se descomprimen IDAT sin límites en el servidor.

## Límites pendientes de integración

No se ejecutó Tesseract real en esta máquina. El coordinador reportó smoke aislado en VPS con fixture sintético, duración 0.995 s, detección de ambos nombres, idioma, intereses y notas, sin temporal remanente; evidencia `evidence/ocr-vps-synthetic.json`. No se ha validado reconocimiento de manuscritos. La API requiere almacenamiento privado `0700/0600` antes de activar; ningún despliegue ni cambio de permisos remoto fue realizado por este trabajo. La integración visual y revisión del agente de seguridad pertenecen al cierre coordinado, no se declaran aquí como terminadas. El runbook detalla la activación, timer y restricción de rollback.
