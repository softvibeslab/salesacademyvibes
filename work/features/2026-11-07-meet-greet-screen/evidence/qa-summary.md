# QA · Meet & Greet

## Estado local

Seis vistas verificadas: landing y galería a390,980 y1440px. Todas responden200, imágenes cargadas, sin errores HTTP/JS ni overflow. Cinco capítulos conservados y catálogo actualizado a16 pantallas.

En escritorio el recorrido llega a method y muestra únicamente la etiqueta «MEET & GREET · PRESENTACIÓN RETOCADA» para esa pantalla. En móvil, la leyenda y el enlace al original caben dentro de la figura: altura575.39px, leyenda85.39px y margen inferior9px. Los teléfonos conservan el ajuste compacto:170px en móvil y hasta220px para el sticky de escritorio.

Original y retoque son enlaces distintos en el catálogo. El screenshot aportado no se presenta como captura intacta ni como nueva funcionalidad. No se abrió WhatsApp ni el CMS.

## Composición exportada

Únicamente growth/site/assets/scenarios/compositions/02-meet-greet.png:1600×1000, generada desde el HTML en Chromium con export-mode. Todos los textos quedan dentro de la composición; el último texto termina57px antes del borde inferior. Revisada visualmente y etiquetada como escena generada + captura aportada retocada. Los otrosPNG de composición no se tocaron.

Evidencia: local-qa.json, local-landing-*.png, local-gallery-*.png, qa-meet-greet.cjs y gallery-regression/results.json. El script de regresión existente se ejecutó contra la vista local.

La primera pasada del verificador seleccionó el figcaption de la fotografía en vez del screenshot; se corrigió el selector del verificador y se repitió. No fue un fallo del producto. En escritorio las figuras inline siguen ocultas visualmente por el motor existente; sus cajas no se confunden con la pantalla sticky visible.

## Límite

La imagen se revisó visualmente, no mediante OCR automatizado. La prueba valida integración y legibilidad de presentación; no certifica la disponibilidad del video externo que aparece dentro de la captura.

## Publicación final

Verificadas cuatro vistas HTTPS reales sin interceptar HTML/CSS: landing y galería en 390/1440 px. Cero incidencias; imágenes cargadas, 16 tarjetas, leyendas y enlaces al original correctos. Teléfonos máximos: 170 px móvil / 220 px escritorio (galería 165/214 px). Original PNG, retocado PNG, WebP y composición 02 responden 200 y coinciden por SHA256 con los archivos locales. TLS validado normalmente; sin login ni WhatsApp. No se volvió a exportar la composición durante esta pasada pública. Evidencia: public-qa.json y public-*.png.
