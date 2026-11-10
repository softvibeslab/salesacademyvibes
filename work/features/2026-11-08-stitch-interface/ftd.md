# FTD · Transferencia visual y de fuente a Stitch

**Status:** completed
**Lane:** FTD
**Author:** Codex, a solicitud de Roger
**Date:** 2026-11-08
**Ticket:** Solicitud en conversación
**Historia (opcional):** N/A

## Claridad

- **Solicitud:** «puedes crear un nuevo stitch y subir toda la interfaz»; después, continuar en el proyecto elegido por el usuario: https://stitch.withgoogle.com/projects/16859674583431881734.
- **Entendimiento:** trasladar referencias originales y código de la interfaz vigente de Sales Academy: landing, MediaHub, diagnóstico, galería, asesor y CMS. Distinguir referencias y fuentes cargadas de recreaciones generadas.
- **Hecho cuando:** las referencias, documentos y piezas de organización están guardados y comprobados en el proyecto elegido; se entrega el enlace y se aclaran los límites de edición y fidelidad.

| # | Pregunta | Respuesta | Estado |
|---|---|---|---|
| 1 | ¿Qué interfaz se traslada? | Sales Academy vigente, incluida la experiencia del asesor aprobada. | Respondida |
| 2 | ¿Dónde continuar? | Proyecto 16859674583431881734 elegido por el usuario; propietario en Chrome, lector por conector. | Respondida |

## Intencion

Reunir la interfaz existente en el espacio de Stitch elegido, conservando referencias visuales y fuentes verificables para continuar su diseño.

## Alcance entregado

**54 elementos comprobados en el proyecto elegido:**

- 49 imágenes originales de referencia, importadas en nueve lotes y organizadas en filas.
- DESIGN.md: fuente de pantalla `7349080980780965115`, identidad y cobertura de 25 pantallas.
- ORIGINAL-SOURCE.md: fuente de pantalla `7349080980780965877`, 45 archivos UTF-8 exactos e índice de 49 binarios. Cubre las 94 fuentes del ZIP original, sin base64.
- Portada HTML «Sales Academy · Portada e Índice de Referencia»: `cc8ccd53436042968eeb76199cf462c9`. Copia en evidence/target-index.html.
- Sistema inicial de diseño: `assets/d6d131906dfd44a083cf443b67499d42`.
- Sistema posterior «Sales Academy · Sistema original»: `assets/554156d571d1454daaee7c4f1799c01d`.

Los ZIP permanecen como respaldos locales porque el importador los rechazó; las imágenes y documentos se cargaron por separado. Los cinco MP4 siguen en el ZIP y en el índice de URLs públicas; no se intentó su importación directa.

No se cambiaron runtime, despliegue, bases de datos, autenticación, CMS productivo ni credenciales.

## Límites de la entrega

Las imágenes importadas no se convirtieron en 25 pantallas de aplicación editables. La portada es una pieza HTML adicional y la fuente original está disponible para continuar esa conversión.

Los metadatos del sistema generado por Stitch usan Arimo y EB Garamond, aunque el documento fuente solicita Arial/Helvetica y Georgia. No se afirma equivalencia exacta del sistema generado. DESIGN.md y ORIGINAL-SOURCE.md son la fuente maestra; capturas y código se mantienen íntegros.

Las 25 recreaciones del proyecto anterior `8496026853797356014` son recuperables por ID pero no tienen asociación al lienzo comprobada. No se cuentan entre las 54 piezas del proyecto elegido ni se presentan como trasladadas.

## Escalamiento

Trabajo de artefactos de diseño y documentación, sin código productivo ni integración nueva en el producto. Se usó el servicio externo para el traslado autorizado con material público o sintético.

## Checklist

- [x] Inventariar rutas, estados, fuentes e identidad.
- [x] Copiar y verificar 49 referencias sin alterar originales.
- [x] Revisar procedencia y ausencia de sesiones o datos productivos.
- [x] Preparar ZIP original con 94 fuentes y cinco MP4.
- [x] Importar las 49 imágenes en nueve lotes y comprobar su presencia en el lienzo.
- [x] Compilar 45 archivos textuales exactos e indexar los 49 binarios.
- [x] Subir y persistir DESIGN.md y ORIGINAL-SOURCE.md.
- [x] Verificar portada HTML y dos sistemas de diseño adicionales.
- [x] Confirmar 54 elementos y preservación de IDs, fuentes y etiquetas de las 49 referencias.
- [x] Documentar la sustitución de fuentes en Stitch y la ausencia de conversión de capturas en pantallas editables.
- [x] Ejecutar gate final de gobernanza.

## Evidencia

Excepcion TDD: transferencia de material visual y documentación, sin código productivo. Validación por fuentes, inventario, hashes, integridad de paquetes y consulta de elementos persistidos en Stitch.

| Tarea | Fase | Comprobación | Resultado observado |
|---|---|---|---|
| Inventario | VALIDADO | Templates, CSS y estados JS | 25 pantallas base, móvil 02 incluido. INVENTORY.md y screen-map.json. |
| Referencias | VALIDADO | SHA256 y comparación de copias | 49 referencias idénticas, incluidas 16 de app. reference-validation.json. |
| ZIP de referencias | VALIDADO | Integridad y SHA256 | 49 imágenes y manifiesto; respaldo local. reference-bundle.json. |
| ZIP original | VALIDADO | Hash de fuente y entrada ZIP | 94 fuentes exactas, cinco MP4 y 96 entradas con README/manifiesto. original-ui-package.json. |
| Imágenes importadas | VALIDADO | UI y get_project | 49 referencias presentes. evidence/target-canvas-49.json. |
| Fuente compilada | VALIDADO | Cada bloque frente al ZIP | 45 bloques exactos, 49 binarios indexados; 450676 bytes. original-source-validation.json. |
| Documentos | VALIDADO | UI owner, get_project y descarga persistida | DESIGN.md y ORIGINAL-SOURCE.md persistidos con sus IDs registrados. Longitud Unicode y huella FNV-1a-64 coinciden con los locales; evidence/uploaded-documents-validation.json. |
| Portada | VALIDADO | Consulta y descarga de HTML | Pantalla cc8ccd53436042968eeb76199cf462c9; evidence/target-index.html. |
| Sistemas de diseño | VALIDADO CON LÍMITE | Manifiestos y theme devueltos por Stitch | Dos sistemas presentes; el posterior usa Arimo/EB Garamond. No equivale exactamente a Arial/Georgia de la fuente. |
| Proyecto final | VALIDADO | get_project y comparación de referencias | 54 elementos; las 49 referencias conservan ID, sourceScreen y label de la línea base. evidence/delivery-verification.json. |
| ZIP en Stitch | NO ADMITIDO | Mensaje explícito del importador | «Only image (JPG, PNG) and text (html, txt, md) files are supported». ZIP conservados localmente. |
| MP4 directo | NO INTENTADO | Alcance de importación | No se atribuye a Stitch un rechazo que no se probó. MP4 disponibles en ZIP y URLs de referencia. |

SHA256 de ORIGINAL-SOURCE.md: `4253ec77402dc85bf08a4f2d4be126b3fc181477fd0dcc8e20b05a1d5b81d5cb`.

Gate final: evidence/verify-governance.txt. Los manifiestos de preparación conservan su estado histórico; esta evidencia y delivery-verification.json registran la entrega posterior.

## TRUST 5

| Dimensión | Evidencia |
|---|---|
| Tested | Hashes, ZIP, bloques exactos, 54 elementos finales y preservación de las 49 referencias comprobados. |
| Readable | Se distinguen fuentes originales, referencias visuales, portada y sistemas generados. |
| Unified | Identidad y código originales conservados como fuente maestra; diferencias de Stitch declaradas. |
| Secured | Solo material público o sintético; sin sesiones, claves, bases privadas ni conversaciones reales. |
| Trackable | Proyecto objetivo, IDs, HTML de portada, manifiestos, fuentes y verificación final registrados. |

## Siguiente

Entrega lista para consultar y continuar el diseño en el proyecto elegido. No queda pendiente la subida de las referencias y documentos incluidos. Una futura conversión de capturas a pantallas editables sería trabajo adicional; no se declara realizada en esta entrega.
