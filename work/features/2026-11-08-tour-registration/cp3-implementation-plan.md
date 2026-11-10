# CP3 · Plan de implementación aprobado

**Status:** in-progress — CP2 v1 aprobado 2026-11-10
**Feature:** tour-registration
**Owner:** Roger (PO)
**Date:** 2026-11-08
**Spec:** cp2-spec.md v1
**Historia:** work/stories/2026-11-08-tour-registration.md

Plan autorizado por Roger: «Apruebo v1; implementar». Código y pruebas locales realizados, con evidencia en CP4. UAT visual completa y activación privada pendientes. El plan inicial se conserva para trazabilidad; los paths/comandos ejecutados se precisan abajo.

## 1. Tareas por Capa

| Capa | Trabajo | Responsable | Depende de |
|---|---|---|---|
| Gobierno | Aprobación CP2, historia LISTA, gate y ADR de separación privada/auth | PO + ingeniería | Revisión v1 |
| Backend/auth | Configuración privada, hashes, sesiones y capacidad apagada por defecto | Ingeniería | Gate aprobado |
| Datos | Colección privada, proyecciones, transacción, idempotencia y retención | Ingeniería | Auth |
| Backend/OCR | Validar imagen y leer candidatos sin guardar ni bloquear agenda | Ingeniería | Permisos privados |
| Frontend | Entradas, foto/manual, revisión, errores, confirmación y detalle | Ingeniería | Contratos acordados y tests RED |
| QA | Aislamiento, regresiones, UAT local y TRUST 5 | QA | GREEN por comportamiento |
| Operación/docs | Runbook, preparación de publicación apagada, activación condicionada | Ingeniería + operación | CP4 conforme |

## 1b. Pares TDD RED → GREEN

Ejecutar desde `prototypes/smart-agenda-mockup/`, con almacén temporal, credenciales sintéticas y sin `OPS_BASE` remoto. Un RED debe fallar por la expectativa de comportamiento, no por imports o sintaxis. Si se necesita un arnés mínimo, introducirlo sin resolver el comportamiento y registrar la diferencia.

| ID | AC / REQ | Tarea | Hecha cuando |
|---|---|---|---|
| T01-test | AC-05, AC-10 / 08,11 | Probar flag cerrado, guardas iguales en preview/crear/lista/detalle, rechazo de demo/actor falso y revocación al retirar/rotar credencial | `python3 tests/test_tour_registration.py` falla por acceso/capacidad o sesión revocada incorrectos |
| T01-impl | AC-05, AC-10 / 08,11 | Implementar modo privado, provisión por stdin, controles compartidos y versión de credencial en sesiones | Mismo comando pasa y login demo existente conserva su contrato |
| T02-test | AC-01, AC-03, AC-04 / 04,06,07 | Probar validación, escritura atómica, reinicio, empalme e idempotencia | `node tests/e2e-tour-registration.mjs` falla por estado/persistencia esperado |
| T02-impl | AC-01, AC-03, AC-04 / 04,06,07 | Crear registro y tour anónimo en una transacción | Mismo comando pasa, incluido reintento y concurrencia |
| T03-test | AC-05, AC-06 / 08,09 | Probar matriz, proyecciones, mutaciones/reset y flag apagado con datos existentes; transferir rep y comprobar pérdida de acceso histórico, manteniendo jefe original/admin | `node tests/e2e-tour-registration.mjs` falla al filtrar datos o aceptar actor no autorizado |
| T03-impl | AC-05, AC-06 / 08,09 | Separar lectura privada, redacción pública y autoridad; exigir pertenencia actual del rep a sala original y proteger datos aun con flag apagado | Mismo comando pasa y `node tests/e2e-ops.mjs` sigue verde para datos anónimos |
| T04-test | AC-02 / 02,03 | Probar imagen válida/inválida, OCR ausente/timeout/ilegible y limpieza de temporal | `python3 tests/test_survey_preview.py` falla por candidatos/cleanup esperados |
| T04-impl | AC-02 / 02,03 | Implementar parser de survey y proceso local acotado sin persistencia | Mismo comando pasa sin guardar OCR bruto ni bloquear store |
| T05-test | AC-08, AC-09 / 04,05 | Probar borrador, mezcla OCR/manual, respuesta obsoleta, logout y usuario distinto | `node tests/tour-registration.mjs` falla por pérdida/sobrescritura/retención indebida |
| T05-impl | AC-08, AC-09 / 04,05 | Implementar máquina de estados, validadores y limpieza de memoria/foto | Mismo comando pasa y se comprueba la liberación de URLs de imagen |
| T06-test | AC-01, AC-04, AC-07, AC-08 / 01,06,07,10 | Probar navegación, resumen, error 409/red, fecha, resultado separado y salida sin PII en URL | `node tests/tour-registration-ui.mjs` falla por acción o estado incorrecto |
| T06-impl | AC-01, AC-04, AC-07, AC-08 / 01,06,07,10 | Integrar vistas y API; actualizar agenda y accesos después de confirmar | Mismo comando pasa; UAT verifica foto/manual y 360/390/1440 px |
| T07-test | AC-10 / 09,11 y datos | Probar purga diaria sin tráfico antes de 31 días, tombstone sin hash de payload personal y modo cerrado sin archivo de credenciales válido | `python3 tests/test_tour_registration.py` falla por retención o habilitación indebidas |
| T07-impl | AC-10 / 09,11 y datos | Limpiar PII al inicio/operaciones/tarea diaria; conservar referencia anónima y tombstone sin PII ni hash personal | Mismo comando pasa con reloj/fixtures controlados y simulación de cadencia sin solicitudes |

Cada fila ejecutada tendrá salida RED/GREEN en `cp4-validation.md`; ninguna se marca completa por esta planificación.

## 2. Contratos

| Contrato | Productor | Consumidor | Estado |
|---|---|---|---|
| `/api/tour-registrations/capabilities`, preview, creación, lista y detalle | API | App | v1 aprobado e implementado |
| `visits` público + `tourRegistrations` privado | Store | API/contexto | Proyección explícita implementada y probada |
| Modo de autenticación y archivo de hashes | Operación/API | Login y endpoints privados | Implementado; cuentas reales pendientes de provisión |
| Preparación/Meet & Greet | App | Copiloto/roadmap | Solo navegación sin PII; no nuevo proveedor |
| Resultados `/api/tours/:id/result` e importador anónimo | API existente | App/tablero | Compatibilidad obligatoria |

## 3. Repo Paths (spec ↔ código)

Raíz del producto: `SalesAcademyVibes`. Runtime observado en código; no se encontró perfil local instalado que declare gates de este producto.

| Capa | Rutas | Runtime / trazabilidad |
|---|---|---|
| Frontend | `prototypes/smart-agenda-mockup/agenda.js`, `agenda.css`, `styles.css`, `index.html`, `ops-api.js`; nuevos `tour-registration.js`, `tour-registration.css` | JS ES modules, HTML/CSS; REQ-01,02,04–06,10 |
| Backend | `prototypes/smart-agenda-mockup/server/ops_api.py`; nuevos `tour_registration.py`, `survey_preview.py`, `private_auth.py` | Python stdlib y Tesseract local existente; REQ-02–11 |
| Datos | Operaciones del store en `server/ops_api.py` y módulo nuevo; fixtures temporales de tests | JSON + flock/reemplazo atómico; REQ-06–09 |
| Operación | `server/salesacademy-ops.service`; herramientas propuestas `server/provision_private_user.py`, `server/purge_tour_registrations.py` y timer/servicio diario de purga; `docs/stack-y-api.md` | systemd/Python; flags y hashes fuera del repo; purga diaria incluso sin tráfico |
| Tests | Nuevos `tests/test_tour_registration.py`, `test_survey_preview.py`, `tour-registration.mjs`, `tour-registration-ui.mjs`, `e2e-tour-registration.mjs` | Python unittest/Node; todos los AC |
| Regresión | `tests/e2e-ops.mjs`, `test_import.py`, `test_context.py`, `test_tasks.py`, `home-counters.mjs`, `app-fab.mjs`, `theme.mjs` | Comandos existentes, siempre locales |
| Documentación | Esta feature, historia, ADR propuesto, guía de uso y runbook | Evidencia en producto; no en framework |

No tocar el antiguo `app.js`. `fab.js` y `tests/app-fab.mjs` solo se modifican si se decide añadir un atajo, no necesario para las entradas Hoy/Calendario.

## 4. Rama y Publicación

No se creó rama ni se asumió limpia la copia de trabajo. Antes del primer cambio de código: inspeccionar estado y aislar modificaciones ajenas si hace falta. Destino observado: app `salesacademy.softvibes.art`, API puerto 8026; confirmar configuración viva antes de operar. La landing cloud no es destino de este módulo.

Código funcional puede prepararse/publicarse con flag apagado. Activación de datos reales queda condicionada a credenciales privadas, permisos del store, retención de backups y UAT de aislamiento. No ejecutar reset remoto ni el e2e destructivo contra live.

## 5. Evidencia Esperada

| Gate | Evidencia | Destino |
|---|---|---|
| Ready/CP2 | Cita de aprobación v1, criterios/datos aceptados y verificador exitoso | Historia + CP2 |
| TDD | Salidas reales RED/GREEN por par | `cp4-validation.md`, `evidence/` |
| Seguridad/datos | Matriz de roles, PII ausente en API pública/logs, limpieza y concurrencia | Tests y reporte CP4 |
| UX | Foto/manual, foco, teclado, errores, modo claro/oscuro y tamaños | UAT y capturas sintéticas |
| Release | Config inspeccionada, respaldo, flags y smoke seguro | Runbook y CP4/CP5 |

## 6. Gates Locales Propuestos

Tras aprobar CP2, ejecutar suites nuevas de los pares y regresiones necesarias:

```sh
node --check agenda.js
node --check tour-registration.js
node --check ops-api.js
python3 -m py_compile server/ops_api.py server/tour_registration.py server/survey_preview.py server/private_auth.py
node tests/e2e-ops.mjs
node tests/home-counters.mjs
node tests/app-fab.mjs
node tests/theme.mjs
python3 tests/test_import.py
python3 tests/test_context.py
python3 tests/test_tasks.py
```

Gate de historia desde la raíz del producto:

```sh
bash /Users/rogergv/Documents/SoftvibesLab/px-onboarding-mob-gen/install/verify-story.sh work/stories/2026-11-08-tour-registration.md
```

La ejecución inicial del 2026-11-08 salió 1, «historia NO LISTA para desarrollo (27 pendiente(s))», antes de recibir aprobación. Tras la respuesta explícita del 2026-11-10 se actualizó la historia y el gate pasó con salida 0 antes de código (evidence/ready-gate.txt). TRUST 5 ejecutado y límites pendientes se registran en CP4.

## 7. Observabilidad

Registrar únicamente código de resultado, duración OCR y correlación técnica no personal. Nunca imagen, OCR bruto, nombres, contacto, notas o contraseñas. No activar envío de telemetría ni alertas externas nuevas. Revisar errores 409/timeout con fixtures; no inventar métricas de producción.

## 8. Recuperación

Desactivar capacidad del módulo antes de revertir código. Conservar store/colección privada y respaldos restringidos; una versión anterior no debe leerlos ni permitir reset público que los borre. Documentar migración compatible y probar recuperación con store temporal antes de publicación. No volver a autenticación demo mientras haya datos privados accesibles.

## Gate CP3 → CP4

- [x] Tareas, pares TDD, contratos propuestos, rutas y evidencia definidos.
- [x] CP2 aprobado e historia LISTA; gate exit 0 en evidence/ready-gate.txt.
- [x] ADR aprobado y configuración de release inspeccionada; activación privada condicionada.
- [x] Código local y pares de comportamiento con evidencia RED → GREEN en CP4.
- [ ] UAT completa y activación final conforme al contrato.

## Ajustes ejecutados al plan

El backend concentró OCR, auth, retención y HTTP en `tests/test_tour_registration.py` (21 casos); no creó un archivo separado test_survey_preview.py. La integración adicional `tests/e2e-tour-registration.mjs` ejecuta el controlador real contra API/store temporales. La purga se llama `server/cleanup_registrations.py`, con unidades `salesacademy-registration-cleanup.service` y `.timer`. Son ajustes de organización de archivos, sin nuevas rutas ni cambios de contrato. Las evidencias finales son 39/39 Python, 19/19 frontend, ocho suites frontend previas y e2e operativo local verde.
