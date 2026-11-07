# Sales Academy · nueva dirección visual

La v2 ya está construida: una portada centrada en el producto, identidad negro/oro y un mediahub con composición editorial. Conserva el diagnóstico abierto, la captación voluntaria y el CMS funcional de la primera entrega.

## Abrir y comparar

- [Landing v2](http://localhost:4187/descubre/)
- [Mediahub v2](http://localhost:4187/mediahub/)
- [CMS](http://localhost:4187/cms/) · [acceso privado local](/private/tmp/salesacademy-growth-v2-access.txt)
- [Análisis del embudo](http://localhost:4187/descubre/analisis/) · [estrategia completa](../2026-11-07-growth-mediahub/analisis.md)
- [Landing v1 conservada](http://127.0.0.1:4186/descubre/)
- [Código y documentación v2](../../../growth/dist/salesacademy-growth-v2.zip)

Las vistas requieren los servidores locales de esta sesión. [Instalación y reinicio](../../../growth/README.md). La v1 tiene código y datos separados de la v2; su ZIP original se conserva. No se ha desplegado esta variante en el dominio público.

## Qué aprendimos y qué cambió

Se actualizó el inventario de SoftvibesSites y se profundizó en sus referencias pertinentes. Se renderizaron seis portadas locales: Close Factory, Cisne Negro, Softvibes corporativo, Grupo Zamna, Gaby de la Mora y Berova v2. Esto no equivale a auditar todas sus páginas o certificar sus funciones.

| Aprendizaje | Aplicación concreta |
|---|---|
| Un objeto reconocible explica mejor el producto | Roadmap, Recursos y Agenda de la demo propia protagonizan el hero; se identifican como demostración con datos de ejemplo |
| La identidad debe reconocerse desde el primer vistazo | Negro cálido, oro moderado, marfil y contraste tipográfico; titular «Tu método. En cada sala.» |
| La composición necesita cambios de ritmo | Escena oscura → explicación editorial → recursos → recorrido de tres salas → diagnóstico → conversación |
| Un recurso debe parecer utilizable | Portadas con título y extracto real; recurso destacado y filtros del mediahub conservados |
| La utilidad puede preceder al contacto | Recursos completos y diagnóstico de seis preguntas sin correo; solicitud voluntaria al final |
| El diseño debe continuar siendo editable | Textos, recursos, medios, borradores, vista previa, publicación y restauración siguen bajo el contrato del CMS existente |

La implementación en tres salas se mantiene como propuesta. No se inventaron clientes, métricas de ventas ni testimonios. No se incorporaron imágenes, contactos, integraciones ni código privado de los proyectos usados como referencia.

## Evidencia

- [Inventario actualizado y decisión de base](inventario-delta.md)
- [Comparación de seis referencias y evaluación visual de v2](referencias-visuales.md)
- [Landing escritorio](evidence/screenshots/landing-v2-1440.png) · [móvil](evidence/screenshots/landing-v2-390.png)
- [Mediahub escritorio](evidence/screenshots/hub-v2-1440.png) · [móvil](evidence/screenshots/hub-v2-390.png)
- [FTD, decisiones y validación](ftd.md)
- [15 recorridos funcionales](evidence/e2e-results.json), [36 pruebas Python](evidence/unit-python-log.txt) y [7 pruebas JavaScript](evidence/unit-js-log.txt)
- [Teclado, reflujo, movimiento reducido y presupuesto](evidence/browser-quality.json)
- [Contraste y nombres accesibles](evidence/a11y-v2.md)
- [Gobierno FTD estricto](evidence/verify-governance.txt)
- [Revisión independiente del alcance y portadas CMS](evidence/scope-review.md)
- [Procedencia y hashes de las capturas propias](evidence/media-provenance.json)

El conjunto de recursos de la landing pesa aproximadamente 298 KB sin comprimir; la estimación gzip es 216 KB. No es una medición de Core Web Vitals en producción. El reflujo se comprobó en móviles de 360/390 px y a 720 píxeles CSS con DPR2 como aproximación de zoom 200%; la revisión de accesibilidad es dirigida, no una certificación global.

## Criterios y skills aplicados

`landing-inventory-first` ordenó inventario y reutilización; `page-cro` y `landing` ayudaron a jerarquizar propuesta, demostración y acción; los patrones locales de `scroll-craft` aportaron escala y profundidad contenida. Se conservaron el stack, la CSP y las dependencias existentes en lugar de incorporar el flujo CDN de una plantilla distinta. `a11y-audit`, `code-reviewer` y la suite Playwright existente dieron evidencia de cierre. El contrato anterior conserva el análisis, copy, estrategia de contenidos y medición desarrollados para el embudo.

El rediseño utiliza HTML/CSS/Jinja y un revelado decorativo de 18 px que mantiene el contenido visible sin JavaScript y respeta movimiento reducido. No agrega API, esquema, autenticación ni servicios. El CMS y la lógica de negocio siguen siendo los de la entrega aprobada.
