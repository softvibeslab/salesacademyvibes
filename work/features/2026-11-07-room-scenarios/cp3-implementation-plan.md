# CP3 · Plan de implementación

| Par | Test primero | Implementación | Repo Paths |
|---|---|---|---|
| T01 | RED: guía/CTA/galería ausentes, aislamiento de publicación | guía compatible y enlaces condicionados | growth/tests/test_scenarios.py; seed.json; templates |
| T02 | RED: recorrido ausente; GREEN: seis momentos, navegación, límites, noJS, movimiento y archivos | galería semántica con mejora progresiva | assets/scenarios; tests/scenarios-browser.mjs |

Excepcion TDD: análisis, fotografías generadas, optimización sin cambio semántico, exportación visual y documentación se verifican por inspección, metadatos y hashes. No se crean pruebas que reproduzcan CSS.

Responsables: agente experiencia implementa página/CSS/JS y pruebas de navegación; raíz integra seed/templates, valida capturas, exporta composiciones, revisa visualmente y empaqueta. Agentes de captura/análisis escriben solo evidencia asignada.
