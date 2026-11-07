# QA del ajuste de pantallas · candidato previo a publicación

2026-11-07. Se comparó el sitio público con el candidato local mediante intercepción exclusiva de tres hojas CSS. TLS verificado, sin override DNS, sin login CMS ni activación de WhatsApp. Ningún contenido persistente fue modificado.

## Resultado

18 comparaciones: índice, landing V5 y galería V5 en 360, 390, 768, 980, 1440 y 1920 px. Se ejecutaron 36 cargas de página: una pública antes y una con CSS candidato después para cada combinación.

- Reducción de ancho efectiva entre 21.43% y 23.40%.
- Cero desbordamientos horizontales, errores HTTP o excepciones JavaScript.
- Imágenes cargadas y proporciones de captura preservadas.
- Geometría de fotografías y VSL exactamente igual antes/después.
- Cinco pilares correctos en 980, 1440 y 1920; versión lineal disponible en 360, 390 y 768.
- Sin colisiones de teléfono/etiqueta con copy de los pilares ni de captions con notas de escenarios.
- Control de movimiento reducido conserva su cambio de estado en escritorio.

## Medidas representativas

| Vista | Antes | Después |
|---|---:|---:|
| Índice 390 |178 px |139 px |
| Índice 1440 |215 px |168 px |
| Landing lineal 390 |220 px |170 px |
| Landing animada 980 |232 px |180 px |
| Landing animada 1440 |280 px |220 px |
| Galería 390 |211 px |165 px |
| Galería 1440 |274 px |214 px |

## Alertas geométricas aclaradas

El verificador inicial encontró dos intersecciones entre el rectángulo completo de `.art-annotation` y el teléfono del índice a360/390. El rectángulo incluye espacio vacío después del texto. No se modificó el producto para pasar esta comprobación. Se midieron las líneas reales con Range/getClientRects: cero colisiones en ambos anchos, confirmado revisando las capturas. `candidate-results.json` conserva las alertas originales; `index-text-geometry.json` contiene la evidencia que las resuelve.

## Archivos

- `qa-candidate.cjs`: reproducción de las18 comparaciones, interceptando solamente tres CSS.
- `candidate-results.json`: medidas completas, estados de capítulos e incidencias originales.
- `qa-index-text.cjs` e `index-text-geometry.json`: comprobación precisa de líneas de texto.
- `candidate-summary.json`: resumen derivado de resultados, cero incidencias pendientes.
- Capturas `candidate-index-*`, `candidate-landing-*-practice.png` y `candidate-gallery-*`: revisión visual de composición y captions.

Las imágenes se marcaron eager en el DOM de QA para poder verificar que todas estaban decodificadas antes de medir. No se alteraron fuentes ni assets originales. Las pruebas no reproducen la VSL completa: comprueban que su tamaño permanece igual. La publicación y comprobación del CSS remoto corresponden al agente principal.

## Comprobación pública posterior

Tras activar `20261107-compact-screens-02`, se revisaron seis vistas públicas sin interceptar CSS: índice, landing y galería a390 y1440 px. Seis correctas, cero incidencias. Todos los anchos coinciden con el candidato aprobado, la VSL conserva sus medidas, HTTP200, imágenes cargadas y sin overflow ni errores JS/HTTP. Capítulo practice activo en desktop. Evidencia: public-final.json, qa-public-final.cjs y las dos capturas public-final-*.png.
