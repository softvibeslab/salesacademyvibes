# FTD: Sales Academy · dirección visual v2

**Status:** completed
**Lane:** FTD
**Author:** Codex
**Branch:** feat/sala-tours-sync
**Date:** 2026-11-07
**Ticket:** Solicitud directa de Roger
**Historia (opcional):** N/A

## Claridad

- **Solicitud:** «analiza /Users/rogergv/Documents/SoftvibesLab/SoftvibesSites y aprende la experiencia de como crear paginas chingonas y aplica eso porfa y genera otro de nuevo».
- **Entendimiento:** Crear una segunda dirección visual para la landing de Sales Academy, aplicar composición, tipografía, producto tangible y ritmo de las mejores referencias locales. Se reutilizan CMS, contratos, diagnóstico, recursos y captación aprobados. La versión previa se conserva como artefacto recuperable.
- **Hecho cuando:** Nueva landing renderizada con producto real protagonista, experiencia coherente de mediahub, secciones variadas, móvil360/390, teclado/reduced-motion, flujos existentes funcionando y comparación visual v1/v2. Entrega local, sin despliegue.

| # | Pregunta | Respuesta | Estado |
|---|---|---|---|
| 1 | Ninguna: la solicitud es clara | Rehacer presentación y copy sobre el contrato existente; referencias del workspace autorizadas en lectura | Respondida |

## Intencion

Pasar de una landing editorial genérica a una presentación reconocible del producto: negro/oro, tipografía de gran escala, escenas reales de interfaz y una ruta visual de tres salas. Producto B2B para responsables de sala, líderes y representantes; tono profesional directo.

## Alcance

- Incluye: templates/assets públicos, copy en los campos editoriales ya definidos, pequeñas interacciones de presentación, QA y documentación del aprendizaje.
- No incluye: cambios backend/API/esquema/auth, servicios externos, datos de otros clientes, nuevas promesas de resultados ni despliegue.
- Capa: frontend. El contenido usa el modelo editorial existente sin migraciones.

## Escalamiento

- [x] Una sola capa.
- [x] Sin cambio de contrato (API/OpenAPI, eventos, payloads).
- [x] Sin cambio de esquema ni migraciones.
- [x] Sin auth, autorizacion, datos sensibles ni superficie externa nueva.
- [x] Sin dependencias nuevas.
- [x] Sin decision que amerite ADR: respeta ADR editorial aprobado.
- [x] Menos de 2 dias.

## Checklist (tests primero)

- [x] Inventario delta y comparación de referencias, antes de implementar.
- [x] Respaldo recuperable v1; código original aislado y vista en 4186, v2 en 4187.
- [x] Nueva composición con assets propios/demostración sintética, sin trasladar contenido ajeno.
- [x] Lógica limitada al revelado decorativo: excepción TDD documentada y validación de movimiento reducido.
- [x] Regresión E2E existente, responsive, teclado, movimiento reducido y revisión visual.
- [x] TRUST 5 y gate FTD con evidencia.

## Evidencia

Excepcion TDD: rediseño visual HTML/CSS, contenido, capturas, documentación, configuración de empaquetado y revelado decorativo de 18px. El revelado no oculta contenido ni modifica datos o estados de negocio; respeta movimiento reducido. Se verifica en navegador. Los flujos de diagnóstico, consentimiento, captación y CMS reutilizan la suite funcional existente. No se añadieron interacciones de negocio nuevas.

| Tarea | Fase | Comando | Resultado observado |
|---|---|---|---|
| Regresión Python | GREEN | `python -m unittest discover -s growth/tests -p 'test_*.py' -v` | 36 pruebas correctas; [salida](evidence/unit-python-log.txt) |
| Diagnóstico | GREEN | `node --test growth/tests/diagnostic.test.mjs` | 7 pruebas correctas; [salida](evidence/unit-js-log.txt) |
| Navegador completo | GREEN | `python growth/tests/run_e2e.py` con `GROWTH_EVIDENCE_DIR` de esta feature | 15 recorridos correctos, incluyendo guardar/vista previa/publicar, medios, restauración, roles, formularios, consentimiento, recursos y móvil; [resultado](evidence/e2e-results.json) |
| Accesibilidad y tamaño | GREEN | `python growth/tests/run_e2e.py --audit` | Reflujo equivalente a 200%, teclado, salto, foco, CTA mínimo44px, movimiento reducido y CMS; 298143 bytes de recursos; [resultado](evidence/browser-quality.json) |
| Contraste dirigido | GREEN | `node /private/tmp/salesacademy-v2-a11y.mjs` | Tres colores del hub corregidos y verificados; 730 observaciones de texto sin fallos finales; [detalle y límites](evidence/a11y-v2.md) |
| Plantillas y fuentes | GREEN | `python growth/verify_artifacts.py`; `node --check growth/site/assets/landing-v2.mjs` | Jinja y sintaxis correctos, 32 archivos fuente, 3 recursos, 31 rutas contractuales; [resultado](evidence/artifact-check.json) |
| Gobierno FTD estricto | GREEN | `bash install/verify-governance.sh <raíz-gobierno> --feature <esta-feature> --strict` | Metodología y plantillas completas, adaptadores sincronizados; [salida](evidence/verify-governance.txt) |
| Separación de versiones | GREEN | Chromium contra vistas locales4186/4187 | Ambas responden200, titulares v1 y v2 distintos; hub sin desbordamiento1440/390; [resultado](evidence/preview-comparison.json) |
| Artefacto descargable | GREEN | `python growth/package_delivery.py` y verificación ZIP/SHA-256 | ZIP v2 íntegro, hashes de entradas coinciden, sin bases/credenciales; [manifiesto final](../../../growth/dist/delivery-manifest-v2.json). ZIP v1 preservado y catálogo válido: [evidencia](evidence/delivery-check.json) |
| Revisión independiente | GREEN | Comparación de hashes contra v1 y render Jinja con portada de prueba | Backend/API/auth/esquema/dependencias idénticos; portadas CMS mostradas correctamente; [informe](evidence/scope-review.md) |

Los comandos Python usan `/private/tmp/salesacademy-growth-venv/bin/python`; Playwright se reutiliza desde `vcsAcademyMobile/node_modules/playwright`, sin añadir dependencias productivas. Las pruebas de navegador usan HTTP/SQLite reales y usuarios sintéticos en datos temporales aislados. No usan las cuentas de las vistas de revisión.

El primer recorrido falló porque el test comparaba `textContent` contra el titular antiguo en una sola línea. La v2 separa el titular con `<br>`; se corrigió el test para comparar el texto visible normalizado con el seed, y las comprobaciones CMS para leer el encabezado renderizado. Se conservan las expectativas de que guardar no publica y publicar sí cambia el contenido. No se alteró el backend para satisfacer los tests.

Fuentes revisadas y comportamiento final: [referencias visuales](referencias-visuales.md), [inventario delta](inventario-delta.md), [guía de entrega](README.md). El empaquetado cambia únicamente el nombre de salida a v2 y añade este expediente, preservando el ZIP v1.

La validación de gobierno usa el paquete fuente en `px-onboarding-mob-gen` y la feature externa del producto por ruta absoluta. No se modificó ni instaló el marco. Compilación Python y sintaxis de los módulos públicos/CMS también completadas. El catálogo `SoftvibesSites/index.html` mantiene sus entradas y estados; solo la descripción de Sales Academy informa la v2 local.

## TRUST 5 (alcance FTD)

- [x] Tested: 43 pruebas de módulos, 15 recorridos de navegador y validación visual/accesible dirigida.
- [x] Readable: fuentes y secciones comprensibles; textos y recursos siguen editables en CMS.
- [x] Unified: contrato CMS y rutas conservados; sin dependencias nuevas.
- [x] Secured: credenciales fuera del código/ZIP, sin datos ajenos; preview solo local y consentimientos conservados.
- [x] Trackable: FTD previo a código, comparación, inventario y evidencias enlazadas.

## Siguiente

Entrega local concluida. Landing, mediahub, CMS y ambas vistas de comparación disponibles. La publicación pública queda fuera de esta entrega local. Para reiniciar y conservar los datos fuera de temporales, seguir [la guía](../../../growth/README.md).
