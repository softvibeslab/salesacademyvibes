# FTD · Pantalla Meet & Greet

Fecha: 2026-11-07. Capa: frontend/contenido visual. Autorización del usuario: «agrega igual un screenshot de esta que te adjunto obvio retocala para que quede igual que las otras». Publicación continuada dentro del sitio aprobado; no transferencia de credenciales.

## Claridad

- **Solicitud:** incorporar la captura adjunta de Meet & Greet con acabado coherente con las otras pantallas.
- **Entendimiento:** conservar el original y producir una variante visual retocada mediante imagegen; integrar en el pilar de método de V5 y en su galería/caso de bienvenida, manteniendo los tamaños compactos aprobados. Etiquetar el retoque, sin presentarlo como captura intacta ni como funcionalidad nueva de la app.
- **Hecho cuando:** original y variante guardados, visual legible y coherente, nueva pantalla visible en landing/caso/catálogo, cuenta actualizada a 16 pantallas (15 previas + 1 aportada), proporciones y navegación correctas en móvil/escritorio y HTTPS actualizado.

## Intencion

Mostrar cómo se consulta el paso de bienvenida: video, guion y errores frecuentes. Mantener IA como apoyo propuesto para preparar preguntas, sin inventar respuestas operativas.

## Alcance

Plantilla landing, galería HTML, nuevo asset PNG/WebP y composición derivada si aplica. Retocar únicamente presentación de la captura; conservar textos principales y método. Fuente original privada del Desktop se copia a assets públicos autorizados. No cambiar APIs, datos CMS, usuarios ni versiones históricas. Release incremental recuperable sobre 20261107-compact-screens-02.

## Checklist

- Preservar original y producir variante con imagegen, revisar texto y apariencia.
- Integrar nueva pantalla en el método y escenario adecuado; actualizar leyendas y conteos sin alterar 15 capturas previas.
- Revisar imágenes/links/scroll en móvil y escritorio; publicar y comprobar hashes.

## Evidencia

Excepcion TDD: incorporación visual/editorial y configuración puntual de despliegue, sin nueva lógica de aplicación. Se verifica mediante revisión de imagen, render HTML, navegación, medidas y hashes públicos. Ejecutado: nueve pruebas de contratos/plantillas pasan, seis recorridos de galería pasan y seis vistas locales en 390/980/1440 pasan. Ver evidence/template-tests.txt, evidence/gallery-regression/results.json y evidence/local-qa.json. Se actualizó el test existente de 15 a 16 tarjetas y se especificó etiqueta retocada para escenario 02 porque cambió el requerimiento, no para ocultar una regresión.

Retoque con herramienta integrada imagegen, usando la captura aportada como objetivo y Roadmap como referencia. Prompt completo en evidence/imagegen-prompt.txt. Se conservaron textos, miniatura, navegación y contenido; se armonizaron espaciado y acabado. El PNG generado mide 853×1844. Entrega WebP 390×844 a 49,838 bytes; PNG de alta resolución y original intacto disponibles. El original tiene SHA256 da051d399971773d91b434704ffcf34c8f82eed1cb29a01d318c9ec6fef03b9e. No se afirmó identidad de píxeles para el retoque.

Archivos nuevos: scenarios/screens/16-meet-greet-original.png,16-meet-greet-retouched.png,16-meet-greet-retouched.webp y scenarios/compositions/02-meet-greet.png. Composición 1600×1000 con 57px de margen inferior y sin recorte, etiquetada como presentación retocada. Las 15 capturas anteriores permanecen intactas. El intento inicial de codificar WebP con ffmpeg falló porque ese binario carece de libwebp; se utilizó cwebp instalado. No se instaló ninguna dependencia.

## TRUST 5

| Dimensión | Evidencia ejecutada |
|---|---|
| Tested |9 pruebas Python, 6 recorridos de galería, 6 vistas locales, composición y revisión visual. Cuatro vistas públicas finales y cuatro assets verificados por HTTPS: evidence/public-qa.json y evidence/meet-greet-public.json. |
| Readable |Captura aplicada al caso de bienvenida con guion y errores frecuentes; original y retoque diferenciados. |
| Unified |Mismo marco compacto, tonos y archivos CSS existentes. Sin dependencia ni modelo nuevo. |
| Secured |No lectura de contraseñas ni modificación de CMS; fuente autorizada por el usuario, originales preservados y hash verificado. |
| Trackable |FTD previo, prompt, fuente, hashes, versiones de imagen, pruebas y release recuperable. |

## Siguiente

Entrega completada. La verificación pública final pasó cuatro vistas en 390/1440, sin incidencias y con hashes exactos en las cuatro imágenes/composición nuevas. URLs disponibles para revisión del usuario.

## Publicación

Publicado en el release /srv/salesacademy-cloud/releases/20261107-meet-greet-03, manifiesto SHA256 1e5af80cc52ebebd57533fa9701125f6d3314a1863f4c46a7d71f168e8a12a61. Ocho archivos nuevos/modificados; únicamente reinicio de V5. Release previo 20261107-compact-screens-02 conservado para rollback; bases CMS intactas.

URLs: https://v5.salesacademy.softvibes.cloud/descubre/#method y https://v5.salesacademy.softvibes.cloud/growth-assets/scenarios/index.html#tour-preparation.
