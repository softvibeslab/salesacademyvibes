# QA pública de Sales Academy

Fecha: 7 de noviembre de 2026. Alcance: índice público, navegación a las cinco versiones y recorrido v5 en escritorio y móvil. Solo se escribieron artefactos de evidencia; no se cambió contenido, DNS ni configuración. No se ingresó al CMS ni se activó WhatsApp.

## Resultado

Nueve comprobaciones de navegador completadas sin incidencias detectadas en los controles ejecutados. El dominio resolvió con DNS normal; no fue necesario el override permitido. Chromium validó HTTPS con TLS 1.3 y certificado para `salesacademy.softvibes.cloud`. No se utilizó `ignoreHTTPSErrors` ni otra omisión de validación TLS.

| Área | Evidencia observada |
| --- | --- |
| Índice 1440 y 390 px | HTTP 200, navegación nativa con JavaScript deshabilitado, foco inicial en enlace para saltar al contenido, cinco destinos de versión, imágenes cargadas, sin desbordamiento horizontal |
| Navegación v1–v5 | Click real desde el índice a cada `/descubre/`; título y contenido presentes, sin URLs localhost ni imágenes fallidas |
| VSL v5, escritorio y móvil | Inició pausada, sin autoplay, controles nativos y `preload=none`. Reproducción comprobada hasta superar 1 s; duración declarada 32.879002 s, 576 × 1024, `readyState=4`, sin error de video |
| Subtítulos | Pista española activa con nueve entradas cargadas |
| Scroll v5 escritorio | Los cinco estados cambiaron en orden: start, method, practice, coaching y scale; progreso de 0.08158 a 0.88158 |
| Movimiento reducido | Botón activó estado reducido, `aria-pressed=true` y desactivó la mejora cinematográfica |
| Scroll v5 móvil | Contenido y escenas en flujo normal, sin mejora parallax de escritorio; sin desbordamiento |
| Galería v5 1440 y 390 px | Enlace desde la landing correcto; seis escenas y quince capturas. Ancla de práctica selecciona `#objection-practice`, indicador `04 / 06` |
| Capturas originales | Las quince URLs respondieron HTTP 200 con tipo `image/png`, tanto en la comprobación desktop como móvil |
| Red y JavaScript | Cero errores HTTP, solicitudes fallidas, errores de consola o excepciones de página en los nueve recorridos |

Los contadores de imágenes cargadas reflejan el instante de medición y la carga diferida. La comprobación de originales valida por separado las quince capturas. No es una auditoría exhaustiva de accesibilidad, rendimiento o CMS, ni una escucha de todo el video.

## Evidencia y reproducción

- `results.json`: resultados completos de los nueve recorridos, red, geometría, VSL, scroll, galería y certificado.
- `qa-public.cjs`: script ejecutado contra las URLs públicas, con Chromium y validación TLS activa.
- `index-1440.png` y `index-390.png`: índice completo publicado.
- `v1-desktop-hero.png` a `v5-desktop-hero.png`: primera vista de cada versión.
- `v5-{1440,390}-{hero,vsl,practice}.png`: primeras visitas con aviso de consentimiento.
- `gallery-{1440,390}-{hero,practice,catalog}.png`: galería publicada.
- `qa-consent.cjs`, `consent-results.json` y archivos `*-necessary.png`: revisión de «Solo lo necesario» y capturas posteriores sin el aviso superpuesto.

Comandos ejecutados desde la raíz del producto:

```sh
node work/features/2026-11-07-publish-versions/evidence/public-browser/qa-public.cjs
node work/features/2026-11-07-publish-versions/evidence/public-browser/qa-consent.cjs
```
