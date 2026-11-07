# Referencias visuales · Sales Academy v2

Fecha: 2026-11-07. Encargo: aprender del trabajo realizado en SoftvibesSites y crear otra dirección visual para Sales Academy. Esta revisión es de diseño y calidad de presentación; no es una auditoría de producción de los proyectos fuente.

## Qué se revisó realmente

Se leyeron `SoftvibesSites/AGENTS.md`, el catálogo operativo y fuentes HTML/CSS/README de seis sitios. Se renderizaron en Chromium seis portadas locales a 1440 × 1000 y se inspeccionaron las imágenes resultantes. La comparación de Sales Academy usa la captura de la v1 ya verificada: `work/features/2026-11-07-growth-mediahub/evidence/screenshots/landing-desktop.png`.

El servidor de referencia fue temporal, de lectura y ligado a loopback. Las capturas de comparación viven solo en `/private/tmp/salesacademy-v2-reference-shots/`; no se incorporan al producto ni al paquete. No se copiaron fotos, marcas, contactos, testimonios, números comerciales, datasets o cuentas de otros proyectos. Los sitios fuente permanecen intactos.

La primera captura de Cisne Negro no resolvió sus assets absolutos al montarse bajo un prefijo. Se repitió con su directorio público servido como raíz y se verificó el diseño correcto. Ese primer render sin estilos no se considera un defecto del proyecto.

`scroll-craft` y `scroll-world` se revisaron como referencias de herramientas/README. Son repositorios de generación/experiencias de scroll, no dos landings terminadas de este encargo. No se ejecutaron, instalaron ni se contaron como portadas comprobadas.

## Seis referencias con decisiones concretas

| Referencia y evidencia local | Lo observado en el render y fuente | Qué trasladar como principio | Qué no trasladar |
|---|---|---|---|
| THE CLOSE FACTORY · `the-close-factory/index.html`, `styles.css`, README | Hero oscuro con retícula fina; display Big Shoulders muy grande y estrecha; anotaciones IBM Plex Mono; diorama SVG propio que explica un flujo; un acento vivo dirige CTA y estaciones. La página continúa con demostración, problema, calculadora y método. | Una metáfora visual específica del proceso, jerarquía fuerte y una herramienta útil antes del contacto. En Sales Academy, el objeto central debe ser el recorrido de aprendizaje y práctica real. | El diorama, logo, métricas, calculadora financiera, contactos ni el acento verde de esa marca. No fingir que el diorama es una pantalla de Sales Academy. |
| Cisne Negro · `cisne-negro-cerveceria/sitio/index.html`, `sitio/assets/css/landing.css` | Fotografía de marca a toda anchura con oscuridad controlada; titular condensado de unos 150 px en escritorio; oro cálido para el titular y contraste de superficie; firma visual reconocible. La fuente usa Big Shoulders Display, etiquetas mono, `clamp()` y reduced-motion. | Una escena dominante con intención y una identidad de color que se reconoce de inmediato. El equivalente adecuado para Sales Academy es una escena de plataforma real, no una fotografía genérica de equipo de ventas. | Fotos, mascota, naranja de CTA ni personalidad de cervecería. Tampoco texto sobre una imagen sin suficiente contraste. |
| Softvibes corporativo · `softvibes-corporativo/site/index.html`, `site/assets/estilos.css` | Titular corto de tres líneas, oscuro casi negro y un acento; el lado derecho representa una instrucción humana, proceso y resultado dentro de una consola; anillos tenues unifican el fondo. Después alterna problema, solución, demo y diagnóstico. El contenido permanece visible sin JS. | Presentar una escena comprensible de uso, con contexto y resultado tangible; conectar hero con demostración posterior; mejora progresiva y contenido legible sin JS. | Copiar estados de agentes o cifras de tareas a la plataforma de entrenamiento. No inventar integración CRM, estado operativo en vivo o capacidad no verificada. |
| Grupo Zamna · `grupo-zamna-realty/sitio/index.html` y sus estilos locales | Composición verde muy oscuro/oro con contraste marfil; serif grande y cursiva selectiva; fotografía vertical dominante; una ficha blanca anclada al borde aporta contexto concreto. La narración llega a herramienta de evaluación y recursos informativos. | Oro usado con moderación, contraste material entre panel claro y fondo oscuro, y una anotación útil sobre el objeto principal. En B2B ayuda a evitar un negro plano sin profundidad. | Fotografías, precios, testimonios, inventario, claims financieros ni su estética inmobiliaria completa. La captura mostró la versión inglesa elegida por el navegador; no se auditó la lógica de traducción. |
| Gaby de la Mora · `gaby-de-la-mora/sitio/index.html`, `sitio/assets/gaby.css` | Display Unbounded con combinación relleno/contorno, medio vertical real protagonista, fondo oscuro y pocos halos; la imagen contiene contexto de actuación. CTA principal y acción de escuchar están claramente separados. La hoja incluye reduced-motion. | Uso decidido de escala y de un medio real con contexto; el usuario comprende la identidad por la escena. Una inclinación leve solo tiene valor si refuerza el objeto, no si reemplaza la demostración. | Retratos, flyers, logotipos, magenta/teal ni formato de artista. Evitar un carrusel o marquee ruidoso en la landing B2B. |
| Berova v2 · `berova-mama-blog/v2/public/index.html`, `style.css`, README | Hero editorial con serif, imagen real grande recortada en arco, navegación reducida y firma de voz; tres momentos simples ordenan el contenido. Recetas con fotografías y filtros conectan la promesa con acciones reales. La variante está separada de su CMS original. | Cada bloque debe aportar evidencia o una acción concreta; reducir repetición; un recurso destacado puede tener su propia composición editorial antes de la rejilla secundaria. Conservar funciones existentes al cambiar presentación. | Retratos familiares, recetas, imágenes o voz de esa creadora. No copiar la misma tarjeta inclinada de texto como nuevo hero de Sales Academy. |

Estas referencias son de patrones visuales y de presentación. La base de negocio y contrato continúa siendo Sales Academy, del mismo nicho ya inventariado. La disponibilidad de un sitio en el workspace no implica permiso para reutilizar sus activos comerciales.

## Lo que limita a la v1 de Sales Academy

La v1 es legible, tiene una paleta sobria, buen espaciado y una jerarquía funcional. Su primer pantallazo, sin embargo, está dominado por texto en ambos lados: el titular explica un plan y la tarjeta inclinada repite tres verbos. El objeto visual principal no permite reconocer que existe una plataforma. La demostración real aparece bastante después.

Los seis referentes fuertes muestran un objeto identificable de su actividad desde el hero. Por eso la mejora principal no consiste en sumar brillo: consiste en mostrar el producto y crear una narrativa visual propia. La repetición posterior de tarjetas con numerales y secciones similares puede sustituirse por cambios de composición más intencionales.

También conviene separar dos mensajes: la plataforma entrena y acompaña; la implementación en tres salas es una ruta propuesta. El titular no tiene que cargar toda la explicación del piloto. La evidencia disponible no autoriza prometer ventas, adopción real o salas ya operando.

## Dirección recomendada: del método al momento de práctica

### Hero

- Negro cálido, blanco marfil y oro contenido. Mantener la identidad Sales Academy y evitar que parezca una copia verde/lima de otra marca.
- Una escena de producto ocupa el lado de mayor peso visual: Roadmap real en primer plano y una vista secundaria real de agenda o contexto del representante. Las capturas se identifican como demostración con datos de ejemplo.
- El contraste entre pantalla clara y entorno oscuro da profundidad. El marco del dispositivo debe acompañar la interfaz, no esconderla con rotaciones grandes o recortes arbitrarios.
- Titular de dos o tres grupos visuales y una descripción breve. Si el CMS admite textos extensos, la composición debe refluír sin alturas fijas ni texto truncado.
- CTA principal al diagnóstico y acción secundaria a explorar la plataforma. Mantener el valor concreto: seis preguntas, resultado en pantalla, sin correo.
- Una anotación exterior solo para explicar la escena: método aprobado, práctica elegida o siguiente acompañamiento. No añadir porcentajes de éxito, actividad en vivo o notificaciones inventadas.

### Continuidad de la página

1. **Reconocer el problema:** una composición editorial concisa y una transición visual, no otro hero completo.
2. **Ver el método en uso:** tres momentos claros conectados por una línea o secuencia, con interfaz real y copy de acción.
3. **Aplicar algo hoy:** destacar un recurso con vista previa de su estructura (hoja, guía o matriz) y presentar los otros dos con sus formatos. Evitar que las cubiertas sean únicamente números grandes.
4. **Entender las tres salas:** una ruta 01 → 02 → 03 visible, con condición inicial, adaptación y revisión. Usar nombres neutros y señalar propuesta; no reproducir una consola de operación multicentro que aún no existe.
5. **Diagnosticar y conversar:** conservar diagnóstico abierto, privacidad, formulario voluntario y FAQ. Los cambios visuales no deben ocultar los límites ni romper el contrato del CMS.

### Movimiento y detalle

El movimiento debe revelar relaciones: resaltar un paso, acompañar un cambio de escena o dar respuesta a un botón. No hace falta vídeo de fondo, animación infinita, cursor custom ni un motor 3D nuevo. Las líneas, luces y profundidad pueden ser CSS/SVG accesibles. Los elementos deben ser visibles antes del JavaScript y con `prefers-reduced-motion`.

Usar una familia display local disponible o una pila de sistema bien elegida, cuerpo de lectura claro y etiquetas pequeñas con suficiente contraste. Si se incorpora una fuente externa, comprobar licencia y servirla localmente para conservar CSP y presupuesto; no copiar archivos de fuentes de otros clientes sin verificar su licencia.

### Criterios visuales de aceptación

- En los primeros cinco segundos se reconoce una plataforma para entrenamiento de sala y el siguiente paso.
- La portada tiene una escena específica de Sales Academy, no una tarjeta con palabras sobre un fondo genérico.
- La identidad negra/oro se sostiene en hero, navegación, recursos y cierre, con cambios de superficie que ordenan la narración.
- Móvil reorganiza la escena sin reducir la UI a un elemento ilegible ni generar scroll horizontal.
- El diseño admite el texto del CMS, mantiene CTA y no convierte la edición en HTML manual.
- No se añaden números de éxito, logos de clientes o testimonios sin evidencia.
- Se conserva legibilidad, foco, reduced-motion, lectura sin JS y los flujos ya comprobados.

## Alcance de esta revisión

Se verificó composición de portada en escritorio y patrones de las fuentes de seis proyectos. No se afirma haber auditado todas sus páginas, probado su CMS, recorrido su conversión real, validado su hosting o certificado accesibilidad. Las lecciones propuestas son juicio de diseño basado en esa evidencia; la aceptación final depende de renderizar y probar la nueva versión de Sales Academy.


## Revisión visual de la versión construida

Se inspeccionaron las capturas `evidence/screenshots/landing-v2-1440.png`, `landing-v2-390.png` y `landing-v2-1440-full.png`. Esta revisión evalúa composición y jerarquía de las imágenes suministradas; no declara haber ejecutado pruebas funcionales, mediciones de contraste ni todos los tamaños intermedios.

**Juicio:** la v2 aplica el aprendizaje y se distingue claramente de la v1. No se observaron problemas visuales que bloqueen la entrega en las capturas revisadas.

| Aspecto | Observación de la v2 |
|---|---|
| Primer reconocimiento | Las tres pantallas hacen reconocible la plataforma desde el hero. El Roadmap central tiene mayor escala y brillo; las laterales aportan contexto sin competir por igual. Se sustituyó la tarjeta tipográfica decorativa por producto verificable. |
| Identidad | Negro cálido, oro y blanco marfil se mantienen en navegación, portada, recorrido y cierre. La cursiva aparece como énfasis puntual y convive con un cuerpo claro; no convierte toda la página en una composición serif. |
| Jerarquía de mensaje | El titular corto tiene dos ideas legibles, una descripción concreta y un CTA dominante. La explicación de tres salas se desarrolla después y ya no ocupa el titular entero. |
| Escena de producto | Los marcos y ángulos aportan profundidad, pero el panel principal sigue siendo una captura real reconocible. La etiqueta de demostración limita la interpretación de las cifras de ejemplo. |
| Ritmo de página | Oscuro → marfil → biblioteca clara → tres salas oscuras → franja oro → FAQ → contacto. Los cortes de superficie y los cambios de composición evitan repetir la misma rejilla de tarjetas. |
| Recursos | Las cubiertas parecen piezas editoriales con título y formato. El escalonado da ritmo sin eliminar la información de lectura. A diferencia de v1, los números no son la única identidad del recurso. |
| Tres salas | El recorrido 01/02/03 y las láminas discretas refuerzan etapas; el bloque conserva la condición de propuesta. No parece una consola ficticia de operación en vivo. |
| Móvil de 390 px | Titular, descripción y CTA mantienen orden y tamaño útil. El recorte de las pantallas laterales es intencional; la pantalla central permanece protagonista. El primer CTA aparece antes de la escena larga. |
| Cierre | La sección de contacto oscura recupera la identidad inicial; formulario y explicación tienen una jerarquía separada. La franja de diagnóstico anterior ofrece una salida útil para quien aún no desea conversar. |

Cautelas de continuidad, sin necesidad de ampliar este rediseño: conservar las etiquetas de demostración/propuesta cuando cambie el contenido y mantener discretas las láminas decorativas de las salas. El texto pequeño y el contraste exacto deben quedar cubiertos por la comprobación de accesibilidad de la entrega, no por una apreciación de estas capturas.

La escena central y el titular breve son las decisiones de mayor impacto. Añadir más brillo, movimiento o elementos flotantes no aportaría una mejora evidente a esta versión.
