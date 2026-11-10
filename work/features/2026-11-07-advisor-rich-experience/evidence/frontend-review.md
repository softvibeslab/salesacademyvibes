# Verificación de interfaz del asesor

Implementado en `growth/site/assets/advisor.mjs` y `advisor.css`; suite `growth/tests/advisor-rich-browser.mjs`. Smoke público actualizado en `advisor-public-smoke.mjs`. El coordinador publicó release07 y ejecutó la verificación pública: 14/14 comprobaciones, dos inferencias Hermes de 64 y 62 palabras, cero leads y cero aperturas de WhatsApp. La revisión frontend local no realizó inferencias públicas.

## Comportamiento

- Paleta verde oscuro/negro y oro intenso, colores y tipografía encapsulados para evitar que el CSS de cada página vuelva a atenuar el texto. Cuerpo 14 px escritorio / 16 px móvil; secundarios de 12 px.
- Hasta tres sugerencias del servidor, con acciones de pregunta o demo. Las opciones se sustituyen con cada respuesta y el clic es el único disparador de inferencia.
- Hasta dos recursos actuales con título, extracto, etiqueta editorial y enlace al MediaHub. Video bajo gesto, audio y subtítulos ES, controles nativos y composición compacta.
- Defensa adicional para mensajes antiguos extensos: respuesta neutral breve y texto original íntegro en «Ver detalle». No resume ni recorta una negación. El límite de texto original sigue siendo el del contrato, 6000 caracteres.
- Media en pausa al cerrar (botón o Escape), cambiar pestaña, ocultar documento, enviar otra pregunta o iniciar otra película, incluido VSL. Se conservan el resumen editable, la decisión de abrir WhatsApp y el consentimiento opcional para guardar un lead.

## Evidencia ejecutada

| Prueba | Resultado | Archivo |
|---|---|---|
| RED: ausencia de sugerencias dinámicas en versión previa | Falla esperada por controles ausentes | `frontend-red.txt` |
| RED: cierre debía pausar sin esperar al evento asincrónico | Falla esperada; corregida en `close()` y `cancel` | `frontend-close-red.txt` |
| RED: respuesta legacy extensa | Falla esperada por más de 90 palabras visibles | `frontend-legacy-red.txt` |
| GREEN: suite rica final, Chromium 1440/390/360 px | 22 comprobaciones, 0 errores JS | `frontend-green.txt`, `frontend/results.json` |
| GREEN: regresión existente de formularios, sesión, red, VSL y rutas | 18 comprobaciones | `frontend-regression.txt`, `frontend-regression/results.json` |
| Unitarias: URL, video permitido, controles, resumen, horario | 6/6 | `frontend-unit.txt` |
| Contraste real computado de texto | Mínimo 7.70:1 entre pares auditados | `frontend/results.json` |
| Bordes de controles / foco de teclado | Mínimos 3.58:1 / 3.05:1 | `contrast-controls.json`, `contrast-controls.txt` |
| Tamaños de controles visibles | Mínimo 44 px de alto | `frontend/results.json` |

Las capturas `frontend/intro-390.png`, `reply-390.png` y sus variantes de 1440/360 px fueron generadas durante la suite. Se inspeccionó visualmente la introducción y la respuesta en móvil. El flujo de videos reprodujo archivos reales y esperó que avanzara el tiempo y se cargaran cues ES. La comprobación de página oculta simula `document.hidden` en el fixture; las otras pausas usan acciones o videos reales. El contraste del foco también se contrastó con el script de la skill `a11y-audit`.

Esta revisión cubre los componentes modificados en Chromium, no es una certificación global de accesibilidad ni una prueba en dispositivos físicos Safari/iOS. El smoke público está limitado a dos turnos de inferencia, cero leads y cero aperturas de WhatsApp.

## Confirmación del coordinador

Release07 publicado con hash JS `773956de733de1de9b1675a1590659bf92827ebc0f57f20a50b0c6e0f0749be3` coincidente. El coordinador confirmó 326 archivos verificados, reproducción pública con audio/VTT bajo gesto, sugerencias dinámicas, pausa y revisión visual móvil satisfactoria. No quedan cambios pendientes en frontend.
