# Auditoría acotada de accesibilidad · NFR-02

Fecha: 2026-11-07. Alcance: contraste de textos habituales, indicadores de foco y tratamiento de movimiento reducido en landing, mediahub y CMS. No es una certificación WCAG completa.

Se aplicó la skill [a11y-audit](/Users/rogergv/.agents/skills/a11y-audit/SKILL.md). No se instaló ninguna dependencia.

## Evidencia ejecutada

1. Scanner estático: `python3 /Users/rogergv/.agents/skills/a11y-audit/scripts/a11y_scanner.py growth/site --json`. Reportó 43 alertas heurísticas. Trata archivos CSS y plantillas Jinja parciales como documentos completos, no resuelve `extends` ni etiquetas `label` envolventes y exige `aria-live` explícito incluso cuando el rol ya lo proporciona. Se revisó su salida como señal de inspección, no como resultado de conformidad. No se alteraron elementos semánticos correctos para silenciar esos avisos.
2. Contraste estático: `python3 /Users/rogergv/.agents/skills/a11y-audit/scripts/contrast_checker.py --batch growth/site/assets/cms.css --json`. Encontró dos pares explícitos de texto pequeño con 4.48:1 y 4.49:1. Para pares heredados se usó la misma función WCAG del script y estilos computados de Chromium.
3. Chromium local con Playwright ya disponible, servidor Flask efímero y cuenta sintética: se recorrieron 14 superficies, incluidas seis páginas públicas, login y siete secciones del CMS. Se calcularon color de texto y fondo opaco heredado; se excluyeron texto decorativo `aria-hidden`, controles deshabilitados y nodos no visibles. Se aplicó 4.5:1 a texto normal y 3:1 a texto grande. No se enviaron datos a servicios externos.
4. Resultado después de corregir: **756 nodos de texto comprobados, 0 incumplimientos en la muestra**. El resumen por superficie está en [a11y-contrast-summary.json](a11y-contrast-summary.json).

Los nombres de opciones documentados en la skill difieren de sus scripts instalados: `contrast_checker.py` admite colores posicionales y `--batch`; el scanner escribe JSON a stdout. Se usaron las opciones que aceptan los ejecutables locales.

## Hallazgos corregidos

- Nombre de usuario CMS: heredaba el gris general de párrafos sobre fondo oscuro, 2.57:1. Ahora hereda el texto claro de la barra lateral.
- Ruta editorial, metadatos de tablas, ayudas y notas de métricas: valores entre 3.71:1 y 4.18:1. Se oscurecieron al verde gris `#626f55`, conservando la paleta y jerarquía visual.
- Numeración del recorrido: de 4.48:1 a 5.28:1. Encabezados de tablas: de 4.49:1 a 4.60:1.
- Foco sobre secciones oscuras públicas: el oro oscuro tenía 2.73:1 contra el fondo. Ahora usa oro claro con 8.93:1. Barra lateral y login CMS reciben una variante clara; la barra de vista previa usa marfil.
- El rótulo grande PDF utiliza un verde más oscuro (3.92:1, texto grande de 45 px). No se cambió la tipografía, distribución ni contenido.

## Pares verificados

| Uso | Texto / indicador | Fondo | Contraste | Umbral | Resultado |
|---|---|---|---|---|---|
| Texto principal público | `#1b1d19` | `#f7f5f0` | 15.59:1 | 4.5:1 | Pasa |
| Texto secundario público | `#60635b` | `#f7f5f0` | 5.61:1 | 4.5:1 | Pasa |
| Acento oro sobre marfil | `#775b1b` | `#f7f5f0` | 5.85:1 | 4.5:1 | Pasa |
| Nombre de usuario CMS | `#e3e9dc` | `#1e251d` | 12.68:1 | 4.5:1 | Pasa |
| Ruta editorial CMS | `#626f55` | `#fafaf5` | 5.11:1 | 4.5:1 | Pasa |
| Ayudas y metadatos CMS | `#626f55` | `#fffef9` | 5.30:1 | 4.5:1 | Pasa |
| Encabezados de tabla CMS | `#626f55` | `#ecefe4` | 4.60:1 | 4.5:1 | Pasa |
| Numeración de pasos CMS | `#715e32` | `#edece0` | 5.28:1 | 4.5:1 | Pasa |
| Texto de carga CMS | `#626f55` | `#f4f4ed` | 4.84:1 | 4.5:1 | Pasa |
| Foco público sobre fondo oscuro | `#d6b66d` | `#171b17` | 8.93:1 | 3:1 | Pasa |
| Foco CMS en barra lateral | `#cfb478` | `#1e251d` | 7.81:1 | 3:1 | Pasa |
| Foco de vista previa | `#fffefa` | `#775b1b` | 6.31:1 | 3:1 | Pasa |

## Foco y movimiento

La hoja compartida mantiene `:focus-visible` de 3 px y separación de 5 px para enlaces, botones, campos, selectores y `summary`. Las variantes nuevas conservan ese ancho. El enlace para saltar al contenido se vuelve visible al recibir foco. Los estados usan texto además del color.

`@media (prefers-reduced-motion: reduce)` cambia el desplazamiento a `auto` y desactiva transiciones y animaciones con `!important`, también en CMS. El agente principal ejecutó la comprobación de teclado, foco, reflow equivalente a 200% y movimiento reducido en Chromium; su evidencia integrada registra el resultado por recorrido.

## Límites

La comprobación de contraste usa la muestra renderizada y colores sólidos; no certifica contenido futuro, medios subidos, todos los estados dinámicos, navegadores adicionales ni la experiencia completa con lectores de pantalla. El contenido editorial debe seguir conservando etiquetas, alternativas de imagen y el contraste al evolucionar el diseño. La salida estática por sí sola no cubre estos límites.
