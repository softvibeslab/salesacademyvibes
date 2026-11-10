# Sales Academy · diseño del sitio, asesor y estudio editorial

## Objetivo

Trasladar a un nuevo proyecto Stitch la interfaz existente de Sales Academy, conservando identidad, contenido, jerarquía, pantallas y estados. Es una biblioteca de diseño del producto actual, con 25 pantallas base y un grupo separado de 16 capturas de referencia de la app. La interfaz original está en español. No convertirlo en un dashboard SaaS genérico ni añadir promesas comerciales, funciones o estadísticas inventadas.

Proyecto Stitch: 8496026853797356014. Referencia pública: https://v5.salesacademy.softvibes.cloud/descubre/. Fecha de corte: 8 de noviembre de 2026. El asesor corresponde al release advisor-rich-07.

## Identidad y tono

Sales Academy acompaña la jornada de una sala de ventas de tiempo compartido con método, preparación, práctica, coaching y agentes de inteligencia artificial. La composición combina una estética editorial cálida con interfaces utilitarias claras. El título grande se apoya en una palabra o frase serif en cursiva; la navegación y los controles usan sans-serif. La marca SA aparece como monograma serif dorado junto a SALES ACADEMY en mayúsculas pequeñas.

El recorrido visual cuenta una jornada continua: Preparar → Aprender → Practicar → Acompañar → Escalar. Las fotografías de escenas son ilustrativas generadas; las pantallas proceden de una demo; los videos expresan visión conceptual. Mantener estas etiquetas cerca del material correspondiente.

## Tokens: colores exactos

### Sitio público

- Fondo oscuro principal/header: #10120f. Otros fondos existentes: #101110 y #111310.
- Papel principal: #f5f3ed. Panel claro editorial: #f5f2e9 o #f7f5f0.
- Texto oscuro: #20211e. Texto secundario: #62655e.
- Oro de marca y CTA público: #d4b574. Oro oscuro sobre papel: #765922.
- Texto claro: #f4f2e9. Borde claro: #dcdcd2. Borde sobre oscuro: #30342a.
- Galería de escenarios: fondo #151a13, texto #f3f0e7, oro #d6bd82, texto secundario #b6bdaf.

### Asesor IA: usar la paleta reforzada vigente

- Ink: #182219.
- Dark/header: #101a13.
- Gold/CTA: #f4bd3f.
- Paper/body: #f6f5ef.
- Borde base: #7c816f.
- Burbuja del visitante: #203c28 con texto blanco.
- Burbuja del asesor: blanco con tinta #182219.
- Etiquetas sobre oscuro y nombre de visitante: #f4d894.
- Sugerencias: fondo #ffe6a1, tinta #332800, borde #806000; acción demo fondo #f4bd3f y tinta #251c00.
- Foco: outline de 3px #806000, offset de 3px y halo blanco de 2px.
- No heredar el gris tenue de párrafos de la landing dentro del asesor.

### Estudio editorial CMS

- Fondo de workspace: #f4f4ed.
- Sidebar y bloque editorial del login: #1d241c.
- Texto claro: #f7f3e8.
- Oro editorial: #cfb16e; monograma #d1b578.
- CTA principal del CMS: #171b17 con texto claro.
- Paneles de formulario en papel/blanco cálido, bordes finos gris oliva; badges compactos para estado, revisión y derechos.

## Tipografía

- UI, navegación, formularios, tablas y cuerpo: Arial, Helvetica, sans-serif.
- Títulos editoriales de landing, hub, escenarios, login y encabezado del asesor: Georgia, Times New Roman, serif; cursiva para énfasis.
- CMS funcional usa titulares sans-serif y jerarquía clara; no convertir tablas en titulares ornamentales.
- Asesor: cuerpo 14px desktop y 16px móvil; etiquetas secundarias nunca menores de 12px. Header h2 23px desktop/21px móvil; títulos de recurso 17px.
- Botones y entradas táctiles de al menos 44px. Contraste de texto normal mínimo 4.5:1 y límites/foco de controles mínimo 3:1.
- Si Stitch obliga a elegir una fuente de catálogo, usar una serif editorial próxima a Georgia y una sans neutral próxima a Arial; dejar registrada la sustitución, sin atribuirla a la implementación actual.

## Estructura, espaciado y superficies

- Escritorio de referencia: 1440px. Móvil principal: 390px; comprobar 360px. Conservar el contenido completo bajo scroll.
- Cabecera pública desktop de unos 94px; móvil 82px. Logotipo a la izquierda, navegación intermedia, CTA dorado a la derecha.
- Hero oscuro con dos columnas: titular grande a la izquierda y película vertical compacta a la derecha. No expandir las pantallas de app hasta dominar toda la sección.
- Recorrido de cinco pilares: bloques amplios con texto, pregunta propuesta al agente, caso simulado, fotografía ilustrativa y screenshot de app con marco compacto. El progreso y navegación deben quedar legibles al desplazarse.
- Cards/editorial: bordes discretos, sombras moderadas, espacio blanco suficiente. La landing es más rectangular; el asesor usa radios más amplios y claros.
- CMS escritorio: sidebar fija a la izquierda, topbar con estado de borrador, Vista previa y Publicar cambios; contenido en paneles, listas o tablas. En móvil, sidebar se transforma en cabecera/navegación accesible y formularios apilados.
- Asesor desktop: ancho 450px, alto máximo 790px o viewport menos 40px, abajo a la derecha, radio 22px. Móvil: margen lateral 10px, altura máxima viewport menos 20px, radio 18px.
- Modal del asesor con header y tabs fijos; historial es la región que desplaza; composer y privacidad permanecen accesibles. No ocultar cerrar o enviar debajo de tarjetas largas.
- Video del asesor: marco 210px de alto desktop/196px móvil, ajuste contain, preservando proporción vertical; botón dorado de play con duración.

## Biblioteca de 25 pantallas base

Crear las pantallas con estos nombres y agrupar las variantes bajo el mismo número. No representar toda la aplicación como una sola captura del hero.

### Grupo A · Sitio público

**01 · Landing cinematográfica · escritorio.** Ruta /descubre/. Hero «Agentes de IA. Tu método, presente en cada conversación.»; VSL «PELÍCULA CONCEPTUAL · SALES ACADEMY», play visible y «Reproduce cuando quieras. Audio y subtítulos disponibles.»; CTA «Solicitar demo por WhatsApp». Cinco pilares y jornada simulada, cuatro películas adicionales, recursos, FAQ, cierre y footer. Vista desktop 1440px y banner de consentimiento opcional. La variante móvil se presenta como pantalla 02.

**02 · Landing cinematográfica · móvil.** La misma ruta y contenido de 01 a 390px, con comprobación de 360px. Header compacto, hero apilado, VSL vertical, cinco pilares bajo scroll, pantallas de app compactas, CTA táctil y asesor flotante sin colisión. Mantener el contenido completo y el orden narrativo; no reducir a una portada distinta.

**03 · MediaHub.** Ruta /mediahub/. Hero «Tu método. Tu agente. Tu día.»; accesos por necesidad; buscador, filtros de rol/necesidad/formato, contador, biblioteca editorial y videos. Incluir variante sin resultados con «Ver todos los recursos».

**04 · Recurso escrito.** Usar «Prepara el próximo tour con IA». Volver al MediaHub, etiqueta de formato/evidencia, título, extracto, duración/rol/revisión, lectura de bloques, sidebar «Hazlo tuyo», descarga Markdown y CTA. Variantes guía/matriz pueden usar listas o tablas.

**05 · Película y contexto.** Usar /mediahub/smart-agent/. Mismo marco editorial con película vertical, poster, play, controles, audio/subtítulos y transcripción. Conservar «Visión de producto»; no insertar un reproductor externo arbitrario. Incluir estado listo y reproduciendo.

**06 · Diagnóstico: pregunta.** Dos zonas: introducción «Encuentra dónde la IA puede ayudarte» y formulario. Seis preguntas, progreso «Pregunta 1 de 6», opciones de respuesta, anterior/siguiente y error si falta elegir. Respuestas locales, sin pedir contacto.

**07 · Diagnóstico: orientación.** Resultado sobre coordinación, práctica y evidencia; prioridades, recurso recomendado, explicación orientativa y acciones para revisar o reiniciar. Usar respuestas y puntuaciones sintéticas, no rendimiento de personas reales.

**08 · Jornada y escenarios.** Portada, seis momentos de un día en la sala, navegación de capítulos, fotografía ilustrativa más screenshot, diálogo ficticio, pregunta propuesta al agente, decisión humana y fuente. Catálogo de 16 pantallas compactas y CTA final. Mantener etiqueta simulada.

**09 · Análisis.** Página editorial «Tu método. Con agentes de IA.» con cinco pilares, explicación del recorrido, ruta de tres salas y preguntas para revisar en demo. Listas y párrafos con ancho de lectura cómodo.

**10 · Privacidad.** Título «Tu información. Tus decisiones.»; diagnóstico local, WhatsApp voluntario, uso de IA, sesiones de una hora, eliminación periódica, medición opcional y retención de solicitudes. Mantener tono claro; no agregar formularios ni permisos nuevos.

### Grupo B · Asesor IA

**11 · Asesor: bienvenida.** Mostrar lanzador «Pregunta a Sales Academy / Tu asesor con IA» en la esquina inferior derecha y variante modal abierto. Header «Tu siguiente paso, claro.», cerrar, tabs Conversar/Coordinar demo, saludo, tres sugerencias iniciales, recursos introductorios, composer y privacidad.

**12 · Asesor: conversación.** Burbujas diferenciadas; pregunta sintética y respuesta de 30–65 palabras, máximo 90 visibles. Hasta tres sugerencias que cambian con contexto; hasta dos recursos, preferiblemente un video y una guía. Variante «Ver detalle» expandible para la explicación original. Estados de espera, error/reintento y límite preservan acceso a Chris.

**13 · Asesor: video en conversación.** Tarjeta con etiqueta conceptual, título, extracto, poster y duración; estado reproducción con controles nativos y subtítulos. Enlace «Ver contexto y transcripción». No autoplay. Pausar al cerrar, ocultar página, cambiar tab o iniciar otra película.

**14 · Asesor: demo y revisión.** Variantes: formulario y resumen preparado. Nombre opcional, rol, salas, tamaño de equipo, necesidad, plazo, contacto opcional, fecha/hora/zona preferidas. Después, resumen editable y CTA «Coordinar mi demo con Chris». Texto «Pendiente de confirmación»; consentimiento separado, desmarcado, para guardar seguimiento. La fecha es preferencia, no reserva automática.

### Grupo C · CMS editorial

**15 · CMS: acceso.** Dos columnas: marca y frase «El conocimiento merece una buena casa.» sobre verde oscuro; formulario «Bienvenido al estudio» sobre papel, usuario/contraseña, Entrar y regreso al sitio. Variante error sin exponer credenciales.

**16 · CMS: inicio.** Shell con ocho opciones owner. Título «Una buena sala empieza aquí». Cuatro métricas sintéticas o vacías, flujo Escribe/Revisa/Publica, accesos rápidos, señales de navegación consentidas. No inventar conversiones comerciales. Variante editor con cuatro módulos.

**17 · CMS: editar landing.** Hero, secciones del recorrido, FAQ y SEO en paneles. Guardar landing y Recargar borrador; topbar con Vista previa/Publicar cambios. Distinguir guardar de publicar y advertir cambios no guardados al salir.

**18 · CMS: recursos.** Lista/catálogo buscable de nueve recursos con formato, estado y acciones; añadir recurso y editar. Variante vacía y filtrada.

**19 · CMS: editor de recurso.** Título/slug/extracto, formato/rol/tema/nivel/duración/estado; editor de bloques párrafo/título/lista/tabla; portada, video de colección, enlace externo y adjuntos; etiqueta de evidencia, fuente y fecha de revisión. Guardar y preview. Mostrar un clip permitido y texto de ejemplo sin datos reales.

**20 · CMS: biblioteca de medios.** Grid de imágenes/PDF con nombre, tamaño, revisión, derechos y archivado. Subir medio, editar detalles, paginación y vacío. El módulo no presenta una subida general de MP4: los cinco clips son una colección curada.

**21 · CMS: subir o editar medio.** Variantes subida/detalle: archivo, título, texto alternativo, origen, derechos y revisión; preview; «Dónde se utiliza» y referencias editoriales. Usar imágenes de ejemplo ya públicas. No incluir URLs privadas o credenciales.

**22 · CMS: solicitudes.** Tabla Contacto/Contexto/Consentimiento/Seguimiento. Contactos sintéticos como contacto@example.invalid; select de estado y guardar. Estado vacío. No simular envío automático de correos.

**23 · CMS: asesor IA.** Título «De la conversación al siguiente paso». Métricas sesiones sin expirar, mensajes, solicitudes y calificadas. Tabla de persona/contexto, resumen revisado, horario preferido y seguimiento. Etiquetar preferencia, no reserva. Los ejemplos son ficticios.

**24 · CMS: publicaciones.** Historial, autor sintético, fecha, descripción y «Recuperar como borrador». Mostrar versión actual, confirmación de publicación y estado vacío. Restaurar no publica automáticamente.

**25 · CMS: usuarios y acceso.** Variantes listado/nueva cuenta/editar: usuario sintético, rol editor/owner, activo/desactivado, gestionar; formulario de cuenta con campo contraseña vacío, nunca valor visible. Cambios de acceso revocan sesiones; conservar al menos un owner. No generar credenciales.

## Grupo D · Referencias de app, fuera de las 25 pantallas

Incluir 16 imágenes como referencias, no como funcionalidades recién creadas: Hoy móvil, Agenda móvil, Roadmap móvil, Descubrimiento, Negociación, Preparar tour, Practicar objeción, Objeción precio, Después del tour, Meta del mes, Progreso semanal, Copiloto, Hoy desktop, Roadmap desktop, Tablero de sala desktop y Meet & Greet retocada. Los archivos están en references/app/. Usarlas en las composiciones con tamaño compacto y conservar rótulo de demo o presentación retocada.

## Flujos y relaciones

1. Landing → MediaHub o escenario → recurso → asesor o solicitud de demo.
2. Diagnóstico → orientación → recurso pertinente → decisión voluntaria de conversar.
3. Asesor: explica primero → recibe contexto declarado → sugiere siguiente paso → contenido pertinente → formulario opcional → resumen editable → WhatsApp. No volver a preguntar rol o salas ya declarados.
4. CMS: acceso → borrador → edición → guardar → preview → publicación explícita por owner. Los editores preparan y revisan contenido; no administran usuarios ni publican.
5. CMS asesor: solicitud consentida → seguimiento humano; Chris confirma horario por WhatsApp.

## Restricciones de contenido y comportamiento

- Respetar los textos existentes y los límites conceptuales. No afirmar piloto operativo, integración CRM, calendario conectado o resultados medidos sin evidencia.
- Los videos no se reproducen ni descargan antes de un clic. Audio y subtítulos son voluntarios y accesibles.
- El diseño no debe aparentar que Stitch ejecuta Hermes, CMS, WhatsApp o sesiones reales: son pantallas/prototipos visuales; el backend está fuera del archivo de diseño.
- No incrustar secretos, tokens, contraseñas, bases de datos ni conversaciones de visitantes reales. Usar exclusivamente fixtures y recursos públicos.
- Las sugerencias y tarjetas provienen de catálogos autorizados; no sugerir que el modelo genera HTML o controles ejecutables arbitrarios.
- El WhatsApp autorizado es +52 984 316 3268. Mostrar solicitud preparada y confirmación humana; no enviar mensajes desde prototipos.
- Consentimiento independiente y desmarcado. No añadir datos del diagnóstico o toda la conversación al resumen sin elección del visitante.
- Respetar movimiento reducido. El parallax y la transición continua pueden documentarse como notas de interacción y estados; una pantalla estática no acredita la animación implementada.
- Mantener lectura móvil, foco visible, texto alternativo, controles de 44px y cierre accesible. Evitar textos de 7–11px en el asesor.

## Material disponible y trazabilidad

INVENTORY.md lista rutas y fuentes. references/ incluye 49 imágenes copiadas sin retoque: 16 públicas, ocho del asesor actual, cuatro CMS sintéticas, 16 de app y cinco posters. reference-manifest.json registra SHA256 y fuente exacta. salesacademy-stitch-references.zip contiene esas referencias.

No existe captura individual previa para cada módulo CMS ni para privacidad; reconstruir desde la especificación y código verificados, conservando la etiqueta «recreación de interfaz» cuando corresponda. Las capturas antiguas no prevalecen sobre el asesor reforzado ni sobre Meet & Greet retocada. La carga del DESIGN.md establece una referencia de diseño; no equivale a importar el backend ni a haber verificado todas las pantallas en Stitch.


## Numeración y referencias estables

La secuencia actual tiene **25 pantallas, incluyendo móvil como 02**: diez públicas, cuatro del asesor y once del CMS. `screen-map.json` ofrece IDs semánticos estables para asociar cada generación sin depender de la posición en el canvas. Los prefijos numéricos de archivos en `references/` pertenecen al inventario inicial y se conservan para no alterar las copias ni sus hashes; usar la relación explícita del mapa, no deducir el número de pantalla desde un nombre de imagen.
