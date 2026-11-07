# CP4 · Validación local ejecutada

**Estado:** validación técnica local completada; apta para entregar y revisar.
**Fecha:** 2026-11-07.
**Decisión:** avanzar a cierre de la v1 local aprobada; el despliegue público queda fuera de este alcance.

## TDD observado

Los pares de CP3 se agruparon por comportamiento compartido. No se inventa un RED independiente por cada página visual. Las expectativas de seguridad y persistencia se mantuvieron; las correcciones de fixtures/locators se explican abajo.

| Tarea / cobertura | Estado | Comando | Resultado observado |
|---|---|---|---|
| T01/T04/T06/T07/T08/T10/T11/T13 · backend inicial | RED | `python -m unittest growth.tests.test_backend -v` | 10 fallos funcionales contra scaffold Flask válido: 404 donde se requerían rutas protegidas/públicas; sin errores de importación/sintaxis |
| Backend y regresiones | GREEN | `python -m unittest growth.tests.test_backend -v` | 18 pruebas correctas tras completar medios, carrera reset/login, contexto seguro y métricas; logs originales enlazados abajo |
| T03 · diagnóstico | RED | `node --test growth/tests/diagnostic.test.mjs` | 6 fallos por ausencia de resultado/validación en función scaffold |
| T03 · diagnóstico y referencias | GREEN | mismo comando | 7 pruebas correctas: límites, empates, desconocidos, invalidación, determinismo y enlaces/IDs del seed |
| T09/T12/T14 · medios y backups | RED | `python -m unittest growth.tests.test_media growth.tests.test_backup` | 14 pruebas contra scaffolds sin validación ni persistencia fallaron; fixtures de pypdf y rutas se corrigieron antes de la regresión específica de referencias |
| T09/T12/T14 | GREEN | mismo comando | 15 pruebas correctas; incluido test que inicialmente no detectaba un derivado faltante ocultado en el manifiesto |
| Lanzador local | RED | `python -m unittest growth.tests.test_cli` | 2 fallos: permitía datos en sitio público y binding de red |
| Lanzador local | GREEN | mismo comando | 3 pruebas correctas; solo loopback y datos fuera del árbol público |
| Integración de medios, sesión y métricas | RED | métodos específicos de `test_backend` | MIME incorrecto, sesión obsoleta tras reset, falta de referencias seguras y métrica sin denominador reproducidos; detalle en backend-evidence |
| Integración de medios, sesión y métricas | GREEN | suite backend | Expectativas conservadas y 18 pruebas correctas |

**Excepcion TDD: diseño puramente visual HTML/CSS, contenido editorial, documentación, configuración y empaquetado.** Se verificaron con compilación Jinja, revisión visual, comprobación de artefactos y navegador real. El flujo HTTP/SQLite y diagnóstico tienen evidencia RED→GREEN; esta excepción no sustituye sus pruebas.

Fuentes: [backend](../../../growth/backend-evidence.md), [frontend](../../../growth/frontend-evidence.md), [medios y respaldos](../../../growth/media-evidence.md), [logs backend originales](../../../growth/tests/evidence/), [CLI RED](evidence/cli-red.txt), [CLI GREEN](evidence/cli-green.txt).

## Gates y operación

| Comprobación ejecutada | Resultado | Evidencia |
|---|---|---|
| Compilación, suite Python, Node, sintaxis y artefactos | 36 Python + 7 Node correctas; compilación/sintaxis correctas; 3 recursos y 31 rutas OpenAPI comprobadas | [quality-gates.txt](evidence/quality-gates.txt) |
| Chromium contra Flask/SQLite y datos temporales reales | 15 recorridos correctos; sin errores JS; sin mock de API propia | [e2e-results.json](evidence/e2e-results.json), [log](evidence/e2e-log.txt) |
| Revisión independiente de seguridad | Hallazgos corregidos: carrera reset/login, MIME y referencias de medios; controles HTTP adicionales correctos | [security-review.md](evidence/security-review.md) |
| Backup mediante CLI y restore a directorio aislado | Hashes/referencias correctos, SQLite quick_check=ok, cuenta y publicación recuperadas; purga en la copia sin tocar datos vivos | [operations.json](evidence/operations.json) |
| Historia LISTA con aprobación citable | Gate ejecutado sobre historia del producto | [verify-story.txt](evidence/verify-story.txt) |
| Gobierno estricto | Paquete fuente como raíz de gobierno y feature del producto por ruta absoluta; no instala Ecosistema 360 | [verify-governance.txt](evidence/verify-governance.txt) |
| Catálogo SoftvibesSites | 46 entradas, una nueva Sales Academy; destino local existente | [document-review.json](evidence/document-review.json) |

El perfil ejecutado es `growth/project-profile.example.yml`, con `GROWTH_PYTHON=/private/tmp/salesacademy-growth-venv/bin/python`. OpenAPI fue contrastado con Flask: 36 operaciones, 31 rutas y 27 esquemas tras añadir la métrica de diagnóstico; el detalle reproducible está en backend-evidence. El verificador de artefactos es un control acotado de archivos/plantillas/patrones conocidos; no equivale a un análisis exhaustivo de secretos o pentest.

## Trazabilidad de aceptación

| Criterio | Evidencia observada |
|---|---|
| AC-01 / AC-02 | Landing legible sin JS; raíz y rutas operativas no servidas por módulo nuevo; demo y tres salas etiquetadas como ejemplo/propuesta |
| AC-03 | Evaluación determinista, todas las bandas/empates/desconocidos, error por incompletas; orientación completa sin contacto y reinicio en navegador |
| AC-04 / AC-05 | Filtros en servidor, vacío recuperable, tres recursos completos y descargas Markdown reales |
| AC-06 | Captación real local, consentimiento separado, idempotencia y conflicto; sin JS botón inactivo y method POST para no exponer contacto en URL |
| AC-07 | Sesión/CSRF/origen/roles, revocación, límite de intentos, último owner protegido; editor recibe 403 incluso invocando API |
| AC-08 | Persistencia tras reinicio, dos editores reciben 409; texto local permanece en pantalla |
| AC-09 | Imagen/PDF válidos, falsos y activos rechazados, límites/cuota, deduplicación, revisión/derechos; carga real desde CMS |
| AC-10 | Preview autenticada no-store/noindex; borradores fuera de HTML público; originales anónimos responden 404 sin revelar existencia |
| AC-11 | Publicación de revisión completa, fallo conserva estado, recuperación solo a borrador; solicitudes preservadas |
| AC-12 | Archivo conservado en versiones, usos incluyendo borrador; derivados públicos solo con referencia activa |
| AC-13 | Cero eventos opcionales antes de permiso/tras retirar; IDs estables sin respuestas/contacto; solicitud transaccional única; tasa de diagnóstico con denominador y Sin datos |
| AC-14 | Escritorio 1440 y móviles 360/390 sin overflow; edición móvil por teclado guardada; backup/restore probado |

Capturas: [landing escritorio](evidence/screenshots/landing-desktop.png), [landing móvil](evidence/screenshots/landing-mobile-390.png), [CMS escritorio](evidence/screenshots/cms-desktop.png), [CMS móvil](evidence/screenshots/cms-mobile.png). El CMS de las capturas contiene datos sintéticos de la prueba, distintos de la instancia de revisión entregada.

## Accesibilidad y presupuesto

Se comprobó reflujo equivalente a zoom 200% (720 píxeles CSS y DPR2), foco visible, enlace de salto, diagnóstico por teclado, movimiento reducido y objetivo primario de 44 píxeles. El resultado y tamaños exactos están en [browser-quality.json](evidence/browser-quality.json). Esta simulación no sustituye probar cada navegador con zoom nativo. La revisión de pares de contraste y sus límites están en [audit-a11y.md](evidence/audit-a11y.md).

## Correcciones durante integración

Se corrigieron slugs de recomendaciones y se separó `resourceId` del slug, alt/variantes de adjuntos, nombres accesibles de campos CMS, formulario sin JS y respuestas obsoletas al cambiar de sección. El contrato detalla estos refinamientos sin añadir PII ni servicios. Una expectativa del runner para original anónimo se corrigió de 401 a 404 para corresponder al contrato de ocultar existencia; no se debilitó el servidor. Los locators exactos de etiquetas se ajustaron o se corrigió el nombre accesible. No se sustituyó la implementación por respuestas simuladas.

## TRUST 5

| Dimensión | Evidencia |
|---|---|
| Tested | RED→GREEN, 43 pruebas de módulos, 15 recorridos, backup real y gates ejecutados |
| Readable | Documentación española, nombres de código ingleses, fuentes formateadas, editor por campos/bloques y errores claros |
| Unified | Servicio editorial independiente, esquema v1 idempotente, ADR/CP2/CP3 y OpenAPI alineados; reutilización selectiva sin datos ajenos |
| Secured | Permisos, CSRF, sesiones hasheadas, validación, revisión de medios, datos fuera del código, credencial 0600 y directorio 0700; captación pública apagada por defecto |
| Trackable | Aprobación textual, historia LISTA, trazabilidad 14 AC, evidencia y paquete con manifiesto SHA-256 |

## Límites de la evidencia

Validación local en Chromium/Python 3.14.7; no certifica todos los navegadores, lectores de pantalla, carga multiinstancia o infraestructura productiva. No se hizo despliegue, conexión con CRM, envío automático ni generación de video/audio. El aviso definitivo, responsable, HTTPS/proxy, programación de retención y rotación de respaldos se completan antes de captar datos reales. Las cookies Secure están activas por defecto fuera del lanzador local. No se alteró el paquete central, por lo que no corresponde verificar cambios del paquete neutral; el gate de gobierno sí comprueba sincronía de adaptadores existentes.
