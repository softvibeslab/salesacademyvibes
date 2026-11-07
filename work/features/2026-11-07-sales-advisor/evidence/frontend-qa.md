# QA frontend · Asesor IA

Fecha: 2026-11-07. Datos sintéticos; no se abrió WhatsApp ni se enviaron mensajes externos.

## RED → GREEN

| Prueba | RED observado antes del cambio | GREEN final |
|---|---|---|
| Widget voluntario | `frontend-red.txt`: 0 botones frente a 1 esperado, ausencia funcional del launcher. | `frontend-green.txt`: 18 verificaciones en 1440, 390 y 360 px. |
| Colisión con película | `frontend-vsl-red.txt`: en 390 px el launcher seguía visible sobre un video reproduciéndose (`true !== false`). | Se oculta únicamente si coincide geométricamente con un video activo; reaparece al pausar o salir del área. Misma prueba aprobada en los tres tamaños. |

## Pruebas ejecutadas

- `node --test growth/tests/advisor.test.mjs`: 4/4. Resumen, codificación al número autorizado, rechazo de enlaces arbitrarios y fecha/hora futura en la zona seleccionada.
- `growth/tests/advisor-browser.mjs`: 18/18 con API sintética interceptada. Apertura sin llamadas previas al chat; sesión al abrir; teclado, foco restaurado, dialog dentro de viewport, cero overflow; respuesta como texto, recursos locales seguros; resumen editable, WhatsApp sin necesidad de guardar; opt-in sin marcar, guardado explícito; recuperación de red; convivencia con video. Verifica también montaje en MediaHub, diagnóstico y galería.
- `growth/tests/run_advisor_integration.py` + `advisor-integration-browser.mjs`: 5/5 con Flask y SQLite efímeros, cookie/CSRF reales, cliente de inferencia determinista. Conversación, solicitud consentida persistida, aislamiento entre visitantes, owner CMS lee y actualiza seguimiento; editor recibe 403. Texto de prueba con etiqueta script permanece texto y no se ejecuta.
- `node --check growth/site/assets/advisor.mjs` y `cms.mjs`: salida 0.

Los comandos de navegador usan `GROWTH_PLAYWRIGHT_MODULE=/Users/rogergv/Documents/SoftvibesLab/SalesAcademyVibes/vcsAcademyMobile/node_modules/playwright`. Suite visual: `GROWTH_E2E_URL=http://127.0.0.1:4191`; integración: servidor efímero del runner. No consumen el modelo real; su prueba corresponde al bridge y a la validación de root.

## Revisión visual

Se inspeccionaron las capturas iniciales y de solicitud en 390 px, la captura final de apertura en 360 px y el CMS owner de integración. Identidad negro/dorado, botones principales/cierre/tabs de 44 px, formulario legible, scroll interno y consentimiento desplazado sin superposición. Capturas en `frontend-green/` e `integration/`.

La conversación utiliza texto plano deliberadamente: las URLs del modelo no se convierten en enlaces. Los recursos clicables provienen del catálogo público del servidor y se restringen además a rutas `/mediahub/<slug>/`.

## Archivos productivos de esta entrega

- growth/site/assets/advisor.mjs
- growth/site/assets/advisor.css
- growth/site/assets/cms.mjs
- growth/site/assets/cms.css
- growth/site/templates/base.html
- growth/site/templates/privacy.html
- growth/site/assets/scenarios/index.html

Pruebas: growth/tests/advisor.test.mjs, advisor-browser.mjs y advisor-integration-browser.mjs. El runner Python lo mantiene root.

## Verificación pública posterior a publicación

Release `20261107-advisor-05`, https://v5.salesacademy.softvibes.cloud/descubre/. `advisor-public-smoke.mjs` aprobó 12/12 comprobaciones en 1440 y 390 px (salida 0). Dos inferencias reales de Hermes en total, ambas con respuesta específica sobre práctica de objeciones y recursos publicados. Cero solicitudes de guardado de leads, cero aperturas de WhatsApp, cero errores JavaScript y ningún acceso CMS autenticado.

Verificados apertura voluntaria, geometría sin colisión con consentimiento, conversación, fecha futura con zona America/Cancun, resumen editable codificado al número aprobado, solicitud pendiente de confirmación, foco restaurado, video activo sin bloqueo por el launcher y presencia del asesor en MediaHub/galería. Se inspeccionaron las capturas de respuesta en desktop/móvil y de solicitud móvil; composición correcta.

Evidencia: `public-smoke.txt`, `public/results.json` y seis capturas `public/advisor-{open,reply,request}-{1440,390}.png`. No se modificaron archivos productivos después del freeze.
