# CP1 · Necesidades de registro de tour

**Status:** incorporated — necesidades incorporadas al CP2 v1 aprobado el 2026-11-10
**Feature:** tour-registration
**Owner:** Roger (PO)
**Date:** 2026-11-08
**Intake:** cp0-intake.md
**Contrato aprobado:** cp2-spec.md v1, «Apruebo v1; implementar»

## 1. Problema

El asesor no tiene un flujo para convertir la información de una pareja, en papel o capturada directamente, en un tour revisado. El importador y la agenda actuales trabajan con referencias anónimas. Reutilizarlos sin separación expondría datos que no pertenecen a la demo pública.

## 2. Usuarios y Necesidades

| Usuario | Necesidad | Prioridad |
|---|---|---|
| Rep | Capturar a sus visitantes y preparar su tour sin recapturar información | Must |
| Jefe de sala | Registrar para reps de su sala y consultar únicamente el alcance autorizado | Must |
| Admin privado | Configurar acceso y atender registros autorizados | Must |
| QA/operación | Distinguir la demo sintética de un módulo apto para datos privados | Must |

## 3. Visión

Dos entradas sencillas —foto del survey y formulario manual— convergen en una revisión editable y un solo registro persistente. El asesor conserva el control de los datos y recibe acciones para continuar su jornada.

## 4. Necesidades Funcionales

| NEED | Capacidad requerida | REQ de CP2 |
|---|---|---|
| NEED-01 | Iniciar desde Hoy/Calendario, con fecha y contexto correctos | REQ-01 |
| NEED-02 | Usar una foto legible como ayuda, sin depender de ella para continuar | REQ-02, REQ-03 |
| NEED-03 | Revisar, corregir y completar información mínima de los visitantes | REQ-04, REQ-05 |
| NEED-04 | Confirmar una sola vez y resolver empalmes o fallos sin perder captura | REQ-06, REQ-07 |
| NEED-05 | Acceder a datos privados únicamente con identidad y alcance válidos | REQ-08, REQ-09, REQ-11 |
| NEED-06 | Continuar hacia agenda, preparación y Meet & Greet sin filtrar datos | REQ-10 |

## 5. Necesidades No Funcionales

| Atributo | Objetivo propuesto |
|---|---|
| Accesibilidad | Controles de al menos 44 px, campos de al menos 16 px, contraste normal 4.5:1, labels y errores vinculados; 360/390/1440 px |
| Rendimiento | OCR máximo 20 s; agenda no bloqueada durante lectura; alternativa manual disponible |
| Privacidad | Foto y OCR bruto no persistidos; borrador solo en memoria; retención propuesta de 30 días con purga diaria incluso sin tráfico, máximo efectivo 31 días; tombstone sin hash de payload personal |
| Seguridad | Sesión privada, aislamiento por propietario/sala original, revocación al rotar credenciales, no-store y sin PII en superficies públicas o logs; flag apagado mantiene protección |
| Consistencia | Tour anónimo y registro privado en una escritura atómica; idempotencia y empalmes comprobados en servidor |
| Compatibilidad | Tours antiguos, resultados, importador anónimo y métricas demo continúan funcionando |

## 6. Riesgos

| Riesgo | Impacto | Mitigación propuesta |
|---|---|---|
| Foto manuscrita mal leída | Registro incorrecto | Candidatos, valores ausentes vacíos y revisión humana; no prometer precisión sin corpus |
| Acceso abierto del tablero alcanza PII | Alto | Colección privada, proyección pública y endpoints que ignoran actor no autenticado |
| Credenciales demo permiten acceso privado | Alto | Modo privado configurable, hashes individuales y rechazo de sesiones demo |
| Doble envío/empalme concurrente | Duplicado o agenda inconsistente | requestId, hash de payload y verificación dentro del bloqueo |
| Fecha sintética de Home oculta un tour actual | Confusión operativa | Separar fecha operativa privada y fecha sintética demo |
| OCR tardío sobrescribe la corrección | Pérdida de trabajo | Identificador de solicitud, campos revisados y descarte de respuesta obsoleta |
| Retención no aplicada a copias | Conservación excesiva | Inspeccionar backups antes de activar privado; no asumir política existente |

## 7. Trazabilidad

| NEED | Fuente | Criterios CP2 | Verificación prevista |
|---|---|---|---|
| NEED-01 | Solicitud + app vigente | AC-07, AC-08 | Frontend y revisión visual |
| NEED-02 | Foto solicitada | AC-02, AC-09 | OCR fixture/stub, recuperación UI |
| NEED-03 | Información de pareja solicitada | AC-01, AC-03, AC-08 | Validadores y formulario |
| NEED-04 | Revisión y persistencia propuestas | AC-01, AC-03, AC-04 | API, concurrencia y reinicio |
| NEED-05 | Límites observados de demo | AC-05, AC-06, AC-10 | Matriz, cambio de sala, auth/revocación, guardas con flag apagado y retención sin tráfico |
| NEED-06 | Continuidad de la jornada | AC-07, AC-09 | Regresión y navegación |

## 8. Aprobación Humana

Pendiente. «Stitch y app funcionando» confirma alcance, no este SRS/CP2 ni la historia propuesta. La historia permanece **EN REVISION** y el desarrollo no inicia.

- [x] Problema, necesidades, riesgos y trazabilidad documentados.
- [ ] Aprobación de Roger sobre contrato v1 y criterios de la historia.
