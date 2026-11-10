# Implementación frontend · Nuevo tour

**Fecha:** 2026-11-10. **Contrato:** CP2 v1 aprobado. **Estado:** código y pruebas Node completos; UAT visual completa pendiente. Sin despliegue desde esta entrega.

## Comportamiento implementado

`Nuevo tour` aparece en Hoy y Calendario. Usa la fecha operativa del servidor en modo privado y conserva el día sintético en demo; desde Calendario hereda la fecha seleccionada. El registro de resultados existente sigue separado.

Dos entradas —foto del survey y captura manual— convergen en campos editables, resumen y confirmación humana. El contexto y contacto son opcionales y empiezan cerrados. Los candidatos OCR muestran procedencia; una respuesta tardía nunca sustituye cambios humanos. Formato, datos requeridos, horario y contacto tienen errores asociados a sus campos. Los errores estructurados del API se conservan.

Las imágenes JPEG/PNG se orientan y recodifican por canvas a JPEG, sin EXIF. Se limita la foto normalizada a 1,490,000 bytes y se comprueba además el cuerpo JSON de 2 MB. La foto previa se puede sustituir; si falla la cámara, conversión o lectura, sigue disponible la captura manual. El preview no registra tours.

El guardado requiere revisión explícita y bloquea doble clic. Los errores conservan el borrador y su requestId para reintentos idempotentes. Al guardar se actualiza la agenda de la fecha registrada. El detalle se solicita con cookie privada y mantiene solamente en memoria. El acceso al agente prepara una pregunta general con la referencia anónima; no incluye nombres, contacto, notas ni foto en URLs. Meet & Greet abre el paso 1 de la app.

Borrador, foto y detalle privado nunca se escriben en storage del navegador. Se limpian al cerrar sesión, cambiar identidad/rol/sala, perder autorización o salir de la página. Cerrar sesión limpia inmediatamente, aunque la solicitud de revocación quede pendiente. Se comprueba sesión al recuperar visibilidad y cada 15 segundos con el módulo abierto; el servidor sigue siendo la autoridad en cada petición privada. Tokens de generación invalidan OCR, conversiones y detalles tardíos.

## Repo Paths

| Archivo | Responsabilidad |
|---|---|
| `prototypes/smart-agenda-mockup/tour-registration.js` | Estado del módulo, validación, normalización de foto, render y llamadas privadas |
| `prototypes/smart-agenda-mockup/tour-registration.css` | Componentes responsivos con tokens claros/oscuros y DM Sans existentes |
| `prototypes/smart-agenda-mockup/agenda.js` | Entradas, navegación, fecha, sesión, agenda y preparación |
| `prototypes/smart-agenda-mockup/ops-api.js` | AbortSignal, no-store de registro privado y errores estructurados |
| `prototypes/smart-agenda-mockup/index.html` | Carga del módulo y versión de recursos |
| `prototypes/smart-agenda-mockup/tests/tour-registration*.mjs` | Contrato de estado, render, seguridad y regresión de logout |

## Evidencia TDD ejecutada

Comandos desde `prototypes/smart-agenda-mockup/`, sin `OPS_BASE` ni servicio remoto.

| Caso | Fase | Comando | Resultado observado / evidencia |
|---|---|---|---|
| Núcleo y UI | RED | `node --test tests/tour-registration.mjs tests/tour-registration-ui.mjs` | 14 fallos de comportamiento mediante assertions; sin errores de importación. `evidence/frontend-red.txt` |
| Autorización y carreras de detalle | RED | mismo comando | 3 fallos esperados: datos retenidos tras 403, respuesta antigua de detalle y contexto heredado. `evidence/frontend-races-red.txt` |
| Logout inmediato y teléfono | RED | mismo comando | 2 fallos esperados: limpieza retrasada por red y teléfono compuesto solo de puntuación. `evidence/frontend-logout-red.txt` |
| Suite final | GREEN | mismo comando | 19 pruebas, 19 pasan, 0 fallan. `evidence/frontend-green.txt` |
| Regresión existente | GREEN | `node --test tests/app-fab.mjs tests/home-counters.mjs tests/theme.mjs tests/install.mjs tests/ops-brand.mjs tests/wa-share.mjs tests/fichas.mjs tests/tasks.mjs` | 8 suites pasan. `evidence/frontend-regression.txt` |

`node --check agenda.js`, `node --check tour-registration.js` y `node --check ops-api.js` terminaron con exit 0. Node emite el aviso previo del workspace sobre autodetección ESM; no se modificó el package.json ajeno al alcance.

La suite cubre fecha operativa, contexto cerrado, validaciones, payload permitido, ausencia de actor falso, confirmación, doble clic, requestId estable, fallos 401/403/409, ausencia de PII en preparación, tamaño del cuerpo de imagen, OCR tardío, liberación de foto, carreras de detalle, labels/escaping y limpieza inmediata al salir. El test de logout ejecuta la función real de integración en una VM Node con una revocación pendiente.

## Revisión de interfaz y límites

**Excepción TDD:** CSS y disposición visual se revisan por inspección y UAT; los tests de estado/render no equivalen a prueba visual. `evidence/frontend-css-inspection.txt` registra contraste calculado de tokens (12 combinaciones claras/oscuras ≥6.46:1) e inspección de reglas a 360/390/1440 px. Campos de 16px, controles de 48px, foco visible, labels persistentes y errores asociados; FAB oculto en captura. El layout móvil usa una columna y escritorio separa fuente/formulario.

El coordinador observó mediante CUA el acceso privado y Hoy con fecha operativa/Nuevo tour a 375px. La herramienta dejó de ejecutar acciones por errores de frame/ventana; eso no acredita un fallo de la app. Permanecen pendientes la UAT visual del formulario completo en los tres tamaños, el recorrido de teclado y la cámara/selector nativo. Las pruebas Node no acreditan la calidad OCR de surveys manuscritos ni la orientación real de todos los dispositivos; el fallback manual siempre está disponible. Backend, persistencia y aislamiento se documentan en su evidencia separada.
