# Inventario actualizado y aprendizajes de diseño · Sales Academy v2

**Fecha:** 2026-11-07. **Alcance:** análisis de fuentes locales, clasificación y selección de patrones para un rediseño frontend. No es una auditoría visual ni funcional completa de los sitios de referencia.

## Qué se volvió a revisar

Se leyeron `SoftvibesSites/AGENTS.md`, `PROMPT-TELEGRAM.md`, `index.html`, la skill `landing-inventory-first` y los inventarios previos de Sales Academy. Se contrastaron los directorios inmediatos con las referencias ya registradas y se inspeccionaron las fuentes de diseño más pertinentes. No se modificó otro proyecto, se ejecutaron despliegues ni se accedió a bases, secretos, leads o medios privados.

El inventario completo de clasificación se conserva en [inventario previo](../2026-11-07-growth-mediahub/inventario-previo.md) y [complemento](../2026-11-07-growth-mediahub/inventario-complementario.md). Este documento los actualiza: no vuelve a presentar esas clasificaciones como si fueran hallazgos nuevos ni altera el estado comercial de otros sitios.

| Comparación | Estado observado ahora | Consecuencia |
|---|---|---|
| Catálogo `index.html` | 46 entradas frente a 45 en la primera revisión | Se añadió Sales Academy, que ya tiene una landing/mediahub/CMS locales; no apareció un nicho nuevo |
| Directorios raíz visibles | 74; incluyen herramientas, archivos, variantes y productos | El número de carpetas no equivale al número de landings o clientes |
| Familias de producto previamente clasificadas | Las 48 familias de la tabla previa continúan representadas | Se conserva su clasificación; se profundiza en diseño de candidatos pertinentes |
| Colección `MusicSites` | `ioushua-barragan` y su producto Rhomán ya constaban | No se cuenta otra vez como una marca nueva |
| Colección `clientes` | `blestyum-valmadero`, ya agrupada con Val Madero | Se mantiene agrupada |
| `scroll-craft-onboarding` y `scroll-world-onboarding` | Sus nombres completos no figuraban en la tabla; estaban agrupadas como onboarding de sus herramientas | Se leyeron ambos README: guías/demos de técnicas, no nuevas landings del nicho |
| Softvibes Funnel, integración declarada | `site/app.js` contiene ahora un destino de webhook configurado; la revisión anterior lo describía pendiente | No se probó ni invocó ese destino. Configuración presente no demuestra recepción persistente; no se copia ni se revela el identificador |
| Estado Git dirigido de referencias | `softvibes-corporativo/` y `the-close-factory/` aparecen sin rastrear en el workspace | Son trabajo ajeno existente; solo se inspeccionan fuentes, no se sobrescriben |

## Entrada nueva y precisión de variantes

| Proyecto / ruta | Nicho / audiencia | Oferta / conversión | Landing y análisis | Stack | Comparación / decisión |
|---|---|---|---|---|---|
| `../SalesAcademyVibes/growth/` | Entrenamiento comercial B2B para salas de clubes vacacionales | Recursos → diagnóstico abierto → solicitud voluntaria de demo | `site/templates/landing.html`, `analysis.html`; expediente CP0–CP5 previo | Jinja/HTML/CSS/JS, Flask/SQLite | Mismo producto; base técnica y de identidad de v2. Rediseñar presentación conservando contratos de CMS, recursos y consentimiento |
| `mario-villanueva/` | Formación en ventas y marca personal | Método → programa → curso | `sitio/index.html`; análisis; `version-estructurada/` documentada como segunda versión | HTML/CSS/JS | Mismo nicho amplio de formación; su comprador B2C y método propio no se trasladan a Sales Academy |
| `mario-villanueva/sitio-completo` y `sitio-hostinger` | Variantes del mismo producto | Portadas relacionadas | Constan archivos fuente adicionales | HTML/CSS/JS | No se infiere que sean canónicas por su nombre. Para esta comparación se usa la ruta `sitio/` documentada y la existencia de v2 se conserva |
| `scroll-craft-onboarding/` | Formación técnica para construir landings guiadas por scroll | Guía de diseño y demo sintética | README y `builds/demo/` | Documentación y demo web | Herramienta, sin evidencia de nicho comercial nuevo; aporta gramática, un pico visual y revisión en navegador |
| `scroll-world-onboarding/` | Formación técnica para escenas controladas por scroll | Guía y demo sintética | README y `demo/` | Documentación, HTML/video | Herramienta; su vídeo prerenderizado y proveedores de pago no son necesarios para esta v2 |

## Bases revisadas con mayor profundidad

Rutas relativas a `/Users/rogergv/Documents/SoftvibesLab/SoftvibesSites`, salvo Sales Academy. Las afirmaciones de publicación de los README son documentación del autor, no verificaciones productivas realizadas en esta tarea.

| Referencia y evidencia de fuente | Relación con Sales Academy | Qué está bien resuelto en la composición | Qué aplicar en v2 | Qué no trasladar |
|---|---|---|---|---|
| **Sales Academy propio:** `SalesAcademyVibes/growth/site/`, `sitios/plantilla`, `investment/pitch-sales-academy/landing.template.html` | Mismo producto, comprador y contrato | Ruta consistente hacia diagnóstico, recursos completos, edición real y etiquetado de propuesta | Mantener campos y acciones existentes; organizar otra composición y ritmo visual sobre esa base | No alterar roles/API ni reemplazar la app operativa; no usar números de negocio antiguos como prueba |
| **Mario Villanueva:** `README.md`, `sitio/index.html`, `sitio/styles.css` | Mismo nicho amplio de formación en ventas | Hero asimétrico, una idea verbal breve, retrato real con elementos de marca; secuencia problema → método → programa → trayectoria | Una idea principal dominante, contraste de escala, expresión propia del método, contenido organizado por la práctica | Nombre, método BEAT, fotografías, autoridad, testimonios y duración/promesa del curso pertenecen a esa marca |
| **THE CLOSE FACTORY:** `README.md`, `index.html`, `styles.css`, `docs/DESIGN.md` | Operación comercial B2B, otro sector | Hero con diorama SVG isométrico, metáfora repetida por estaciones, alternancia noche/papel, tipografía display + datos mono; movimiento asociado al proceso | Convertir el producto en una escena legible: preparación, práctica y acompañamiento; una firma gráfica propia y continuidad entre secciones | No copiar diorama, tickets, marca, contactos, afirmaciones de cierres ni métricas. No añadir scroll largo por imitación |
| **Detailbox Academy:** `README.md`, `package.json`, `index.html`, `styles.css` | Formación práctica, otra disciplina | Hero inmersivo con material de trabajo real, titular de gran escala, rutas de aprendizaje diferenciadas y secciones de alto contraste | Hacer visible la práctica, presentar el recurso como una herramienta concreta y dar una cadencia clara a la página | Fotos sociales de coches/instructores, cursos, cifras y certificados no aplican; una escena inventada no demuestra operación real |
| **Softvibes corporativo:** `site/index.html`, `site/assets/estilos.css` | Producto y servicios digitales B2B | Consola visual: instrucción humana → trabajo → resultado; el visitante entiende una acción sin leer una lista de tecnología | Composición de producto con un recorrido reconocible, controles visuales y resultado útil. Usar captura propia del producto y textos de ejemplo claramente rotulados | No fingir CRM, integraciones o actividad en vivo de Sales Academy; no importar resultados de demostración como datos reales |
| **Cisne Negro:** `README.md`, `sitio/index.html`, `sitio/assets/css/landing.css` | Otro nicho; identidad fuerte y referencia CMS | Identidad de lugar reconocible, tipografía display, fotografía auténtica, tono y CTA específicos; variante de vídeo separada | Una identidad visible desde el primer pliegue y producto auténtico; separar una versión visual de otra sin perder la funcionalidad | No copiar fotos, datos, inventario, comunidad, alcohol, vídeo ni cuentas. No dar por publicada una variante por existir |
| **Softvibes Funnel:** `site/index.html`, `site/styles.css`, `site/app.js` | Adquisición B2B por diagnóstico | Secuencia problema → evaluación → siguiente paso; repetición de CTA por intención | Recurso útil y diagnóstico sin fricción; ofrecer contacto al terminar, con contexto y consentimiento | No importar automatizaciones externas, cifras, paquetes o enlaces de contacto; no abrir una conversación externa sin acción del visitante |

## Qué aprendemos del conjunto

1. **El hero necesita mostrar algo que la persona reconozca.** Una tarjeta con tres verbos ocupa espacio pero explica poco del producto. Las mejores referencias seleccionadas muestran un retrato, una escena de trabajo, una línea de proceso o una consola. En Sales Academy debe dominar una escena propia de entrenamiento/operación y una vista real del Roadmap, rotulada como demostración.
2. **La identidad no se obtiene cambiando el color de la misma plantilla.** Hay que elegir una gramática: una escena central, una forma propia de numerar etapas, proporciones, tipografía y un ritmo que continúe. Negro, oro y marfil de Sales Academy pueden producir un lenguaje distinto al de una página editorial beige.
3. **La escala necesita contraste.** Un título grande funciona mejor con explicación breve, etiqueta pequeña y mucho menos ruido alrededor. En móvil la acción y la promesa deben verse antes de que una pieza decorativa consuma otra pantalla.
4. **Un solo gesto memorable.** El diorama de Close Factory demuestra cómo una metáfora puede organizar toda la página. Para Sales Academy puede ser un recorrido de práctica que conecta momentos del equipo. Repetir ese gesto con intención es más valioso que añadir efectos diferentes a cada sección.
5. **Cambiar de densidad sostiene la lectura.** Alternar una escena oscura de producto, una sección clara y breve para comprender, recursos utilizables y una ruta visual. Evitar muchas filas iguales de tarjetas y texto.
6. **La prueba es el producto y el contenido real.** La captura propia, tres recursos completos y un diagnóstico que responde son evidencia útil. No hacen falta cifras decorativas, testimonios ficticios ni logotipos prestados.
7. **La animación acompaña; no bloquea.** Tomar de scroll-craft la intención y la verificación, no la obligación de vídeo o un recorrido de cientos de pantallas. Contenido visible sin JavaScript, movimiento reducido, foco y navegación por teclado se conservan.
8. **Un sitio se entrega como sistema.** La experiencia pública debe seguir conectada al CMS, a estados de error/vacío y al consentimiento. Un rediseño que rompe formularios o vuelve a texto fijo el contenido editable no mejora el producto.

## Decisión de base y dirección recomendada

**Nicho existente, sin búsqueda de una nueva base en Envato:** Sales Academy ya tiene su implementación y Mario confirma el mismo nicho amplio en el workspace. La compatibilidad vanilla/Jinja permite reutilizar la arquitectura propia. Close Factory, Detailbox y Softvibes aportan composición y narración, no contenido de clientes.

Dirección recomendada: **Sales Academy como estudio de práctica comercial**, negro profundo, oro cálido, marfil para lectura, título con carácter y una escena de producto al frente. El recorrido puede presentar tres momentos del trabajo y después conectar con el plan de tres salas. No confundir tres momentos con tres salas desplegadas; ambas ideas necesitan etiquetas claras.

El objetivo de la v2 es una experiencia nueva reconocible a primera vista, con mejor demostración del producto y una secuencia más breve. Se mantienen diagnóstico abierto, recomendaciones reales, mediahub, contacto voluntario y las capacidades aprobadas del CMS. La propuesta para tres salas conserva su estado de propuesta.

## Verificación y límites

- Se comprobaron 46 entradas del JSON de catálogo y 74 directorios visibles mediante lectura local; se revisaron las colecciones relevantes y se reconcilió su agrupación con el inventario previo.
- Se leyeron README/fuentes CSS/HTML de los candidatos indicados; no se ejecutaron las aplicaciones ni se auditaron visualmente todas las 48 familias.
- La comparación de portadas y buenas prácticas es una evaluación de diseño a partir de fuentes, no una medición de conversión ni una clasificación universal de calidad.
- No se copió ningún archivo ni contenido de otros clientes. Los cambios de v2 y sus capturas/pruebas corresponden al agente implementador y a su evidencia de entrega.
