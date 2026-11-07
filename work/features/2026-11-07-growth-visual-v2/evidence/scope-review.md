# Revisión de alcance de la v2

Fecha: 2026-11-07. Revisión de código y comparación de archivos; sin cambios de implementación. Se aplicó `code-reviewer` (`/Users/rogergv/.agents/skills/code-reviewer/SKILL.md`), sus reglas universales y las de JavaScript/TypeScript pertinentes.

**Resultado: sin bloqueadores encontrados dentro del alcance revisado.** La v2 modifica presentación, textos iniciales, empaquetado y adaptación de comprobaciones visuales. No cambia backend, API, autenticación, esquema ni dependencias.

## Base de comparación

ZIP preservado: `../salesacademy-growth-v1-preserved.zip`.

SHA-256: `d56950a8b1b48f6207c883d708f80186689e6b3436e5eb72c6d5cc125142fbb6`.

Se comparó el contenido binario de sus 60 archivos de `growth/` contra los archivos actuales. Se excluyeron directorios de dependencias, cachés y entregables generados (`node_modules`, `.venv`, `__pycache__`, `dist`). Resultado observado: **51 idénticos, 9 modificados, 0 eliminados y 6 añadidos**.

| Área | Evidencia observada |
| --- | --- |
| Backend, autenticación y esquema | Los seis archivos de `growth/server/` son idénticos al ZIP: `app.py`, `backup.py`, `cli.py`, `content.py`, `media.py`, `store.py`. Esto incluye rutas, sesiones, validadores y SQL de inicialización. |
| Contratos y dependencias | `CONTRACT.md`, `openapi.json`, `package.json`, `package-lock.json` y `requirements.txt` son idénticos. No se añadió dependencia. |
| CMS y diagnóstico | Sin cambios en `cms.html`, `cms.mjs`, `site.mjs`, `diagnostic.mjs` y `diagnostic-ui.mjs`; también permanecen idénticos `macros.html` y `resource.html`. |
| Semilla editorial | Cambian textos de hero y secciones. Una comparación recursiva confirma igual estructura y tipos. Los recursos, FAQs y SEO conservan exactamente sus valores. |
| Presentación | Cambian `base.html`, `landing.html`, `hub.html`. Se añaden tres CSS, un módulo decorativo y dos imágenes. |
| Verificación y entrega | Cambian README, `package_delivery.py` y tres scripts de navegador. Las comprobaciones de titular pasan a texto renderizado para tolerar el nuevo marcado; se mantiene la expectativa de contenido y publicación. El inventario de peso incluye ahora los assets v2 realmente usados. |

Los nueve archivos modificados son: `README.md`, `content/seed.json`, `package_delivery.py`, `site/templates/base.html`, `site/templates/hub.html`, `site/templates/landing.html`, `tests/e2e-cms.mjs`, `tests/e2e.mjs`, `tests/quality-browser.mjs`.

Los seis añadidos están en `site/assets/`: `public-v2.css`, `landing-v2.css`, `hub-v2.css`, `landing-v2.mjs`, `product-resources.png`, `product-agenda.png`.

## Portadas editadas desde CMS

Se ejecutó un render aislado de Jinja/Flask con la semilla actual y un `coverId` sintético (`qa-cover-fixture`), comparando cada plantilla antes y después. No se escribió ni publicó contenido del CMS.

| Plantilla | Resultado ejecutado |
| --- | --- |
| `landing.html` | La URL `/media/qa-cover-fixture/web` pasa de 0 a 1 aparición. Las portadas tipográficas de sustitución pasan de 3 a 2. PASS. |
| `hub.html` | La misma URL pasa de 0 a 1 aparición y los overlays de sustitución de 3 a 2. PASS. |
| `resource.html` | La portada pasa de 0 a 1 aparición y conserva el texto alternativo entregado en `media_items`. PASS. |

El macro existente sigue generando la imagen cuando hay `coverId`. Las nuevas composiciones tipográficas se generan únicamente con `if not r.coverId`. El CSS da tamaño a las imágenes de portada; la opacidad cero solo afecta los `span` decorativos del arte anterior. Los overlays nuevos tienen `aria-hidden` y `pointer-events: none`. Esta comprobación valida ramas de render; no sustituye una subida real de archivo ni un test HTTP de medios.

## Mejora progresiva y contenido

`landing-v2.mjs` solo observa elementos y aplica clases. No añade peticiones, almacenamiento, HTML dinámico ni lógica de negocio. Las reglas de revelado aplican únicamente `translateY(18px)` y transición; el contenido permanece visible antes de JavaScript, sin `IntersectionObserver` y con movimiento reducido. El observer se desconecta al cambiar la preferencia de movimiento y deja de observar cada elemento revelado.

`node --check growth/site/assets/landing-v2.mjs` terminó con código 0. No se detectó `opacity: 0`, `display: none` ni `visibility: hidden` en las reglas de revelado. Se conserva la advertencia visible de pantallas de demostración y la distinción entre propuesta de tres salas e implementación real.

## Assets y límites

La composición usa el `product-demo.png` propio ya presente en v1 y las nuevas capturas `product-resources.png` y `product-agenda.png`. El implementador confirmó que ambas se capturaron en esta sesión desde la demo propia `https://salesacademy.softvibes.art/`, con Chromium a 390 × 844, abriendo las vistas `data-go=resources` y `data-go=hoy`, sin modificar datos. La procedencia, pasos y hashes se registran en `media-provenance.json` por el implementador. No se importaron fotos, fuentes, archivos ni datos de los seis sitios de referencia a la lista de cambios de `growth/`; sus aprendizajes se trasladan a composición, tipografía y ritmo. La revisión visual y sus referencias se documentan por separado en `../referencias-visuales.md`.

Esta revisión acredita el delta de archivos y las verificaciones explícitas anteriores. No constituye una auditoría nueva de todo el backend, una certificación de accesibilidad ni evidencia de despliegue. Las pruebas funcionales completas y de navegador se registran en la evidencia de QA de la feature; no se infieren de capturas ni de esta comparación.
