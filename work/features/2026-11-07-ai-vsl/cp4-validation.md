# CP4 · Validación de agentes IA y VSL

Fecha:2026-11-07. Entorno: Chromium y servidores Flask locales con estado aislado. Ningún mensaje enviado a WhatsApp.

## Evidencia RED → GREEN

| Par | Fase | Comando | Resultado observado |
|---|---|---|---|
| T01 campaña y publicación | RED | `python -m unittest growth.tests.test_ai_campaign -v` |5 tests con9 fallos funcionales: CTA ausente, destaque ausente y capas de escenario ausentes. [Log](evidence/campaign-red.txt) |
| T01 campaña y publicación | GREEN | mismo comando |5 tests correctos, incluidos draft/archived, VSL única, enlaces genéricos compartidos y galería. [Log](evidence/campaign-green.txt) |
| T02 VSL / T03 contacto | RED | `AI_VSL_RED_ONLY=1 node growth/tests/ai-vsl-browser.mjs` contra v4 preservada |Diagnóstico enviaba a formulario anterior; VSL destacada ausente. Fallos por comportamiento esperado, no sintaxis. [Resultado](evidence/browser-red/ai-vsl-results.json) |
| T02 VSL / T03 contacto | GREEN | mismo script sin RED_ONLY contra v5; runner `python growth/tests/run_e2e.py --ai-vsl` |8/8 en demo y8/8 con base nueva/puerto efímero. [Demo](evidence/browser-green/ai-vsl-results.json), [portable](evidence/portable-browser/ai-vsl-results.json) |

Excepcion TDD: copy, diseño CSS, codificación de imágenes, exportación y empaquetado se verifican por revisión visual, metadatos y hashes. No se crean pruebas que repliquen CSS. El comportamiento de navegación, reproducción, publicación y CTA sí tiene RED→GREEN.

## Gates y resultados

| Gate | Resultado | Evidencia |
|---|---|---|
| Python completo |56 tests correctos |[log](evidence/python-tests.txt) |
| Módulos JS |14 tests correctos |[log](evidence/javascript-tests.txt) |
| Regresión funcional |15 recorridos de diagnóstico, consentimiento, captación, mediahub y CMS correctos |[resultado](evidence/regression/e2e-results.json) |
| Viaje cinematográfico |5 recorridos correctos, incluida navegación inversa, móvil, sinJS y videos |[resultado](evidence/regression/cinematic-results.json) |
| Galería actualizada |6 recorridos correctos:6 escenas,15 pantallas, export1600×1000, móvil, sinJS y navegación |[resultado](evidence/gallery/results.json) |
| IA/VSL/WhatsApp |8 recorridos nuevos correctos |[informe](evidence/browser-qa.md) |
| Reflujo/teclado/presupuesto |Rutas públicas y CMS correctos a720CSSpx/DPR2, foco, skip, CTA44px y diagnóstico por teclado |[resultado](evidence/regression/browser-quality.json) |
| Contrato y fuentes editoriales |9 recursos válidos,5 transcripciones intactas,15 PNG originales intactos y2 CTA estáticos exactos |[resultado](evidence/narrative-validation.json) |
| Fuente y sintaxis |Compilación Python, sintaxis módulos JS, templates y assets correctos;31 rutas API sin ampliación |[resultado](evidence/artifact-check.json) |
| Historia |LISTA, incremento explícito citado en CP0 |[log](evidence/verify-story.txt) |

Totales de cobertura funcional distintos:70 pruebas de módulos y34 recorridos de navegador (15regresión+5viaje+6galería+8IA). Repetir los8 de IA en runner portable verifica la entrega, no crea8 casos adicionales.

## Visual, movimiento y reproducción

31 posiciones de recorrido medidas, incluidas24 transiciones a980/1440px: cero solapamientos de foto/dispositivo con el texto, sin desbordamiento horizontal. Fotos y pantallas cambian al avanzar y retroceder; se reutiliza el motor existente. Móvil360/390, sinJS y reduced-motion mantienen los cinco capítulos y CTAs.

Revisión visual de hero, método, práctica y VSL móvil. La captura móvil de QA inicialmente se hizo antes de decodificar un lazy image; se añadió espera por imagen completa, sin alterar producto ni expectativas. Exportadas seis composiciones actualizadas con preguntas propuestas al agente y etiquetas fuera de las pantallas: [manifiesto](evidence/compositions.json).

VSL completa smart-agent, una sola instancia, controles nativos y subtítulos. Cero solicitudes/cuerpos MP4 antes de elegir reproducir. Se verificaron pausa por teclado y recuperación tras un fallo de red provocado. El adjunto06.02.39 coincide por SHA256 con el clip previo: [identidad](evidence/vsl-media-verification.json).

## Rendimiento medido

La primera composición cargó1,095,110bytes sin video. Tras optimizar assets:726,074bytes de cuerpos y735,074bytes de transferencia fría, ahorro369,036bytes≈33.7%. Todos los recursos del escenario persistente ya se cargan inicialmente; no se atribuye ahorro a lazy loading que la medición no observa.

El gate que suma todos los assets referenciados sinvideo mide721,653bytes y596,504bytes gzip estimados, bajo800,000bytes. La diferencia con ResourceTiming responde al alcance de la medición. Se sustituyó el presupuesto500KB de v3 por800KB para el conjunto adicional de fotos e interfaces, y se optimizó antes de cerrar.

- Cinco WebP lossless con igualdad de píxeles RGBA: [evidencia](evidence/lossless-screens.json). PNG originales sin cambio.
- Tres fotos WebP70, misma resolución/composición, sin recorte/retocado; originales y activosv4 conservados: [codificación](evidence/scene-encoding.json).
- Verificador estático corregido: trataba prefijos de URL con Jinja como archivos inexistentes. Ahora valida atributos literales completos; rutas dinámicas se comprueban renderizadas en navegador. [Antes](evidence/artifact-before.json), [después](evidence/artifact-check.json).

## TRUST 5

| Dimensión | Evidencia |
|---|---|
| Tested |70 pruebas de módulos,34 recorridos, calidad dirigida,31 posiciones y revisión visual. |
| Readable |IA ligada a tareas cotidianas; VSL breve y CTA explícito; copy español e identificadores ingleses. |
| Unified |Mismo catálogo, contrato editorial, SQL y motor de scroll. Contexto de campaña centralizado; no dependencia nueva. |
| Secured |Enlace genérico sin respuestas/PII, navegación interceptada antes de red en QA, ningún envío, permisos CMS conservados, estado privado separado. |
| Trackable |Petición citada, CP0–CP5, ADR, origen de video, hashes, antes/después de peso, paquetev5 y copias previas. |

La gobernanza estricta y el paquete se verifican en evidence/verify-governance.txt y evidence/delivery-check.json. Las pruebas no certifican WCAG ni Core Web Vitals de campo. No se verificó si el destinatario tiene una cuenta WhatsApp activa ni se confirmó una agenda: solo se valida el enlace autorizado y su mensaje. Las escenas y preguntas son simulaciones; no acreditan capacidades no observadas ni resultados comerciales.
