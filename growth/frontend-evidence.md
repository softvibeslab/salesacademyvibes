# Evidencia frontend · 2026-11-07

CP2 aprobado antes de implementar. Excepción de preparación: se exportó una función de diagnóstico vacía para ejecutar las pruebas y observar el fallo del comportamiento, sin errores de importación o sintaxis.

| Par | Fase | Comando | Resultado observado |
|---|---|---|---|
| T03 | RED | node --test growth/tests/diagnostic.test.mjs | 6 pruebas fallan: la función vacía no devuelve orientación ni valida respuestas incompletas |
| T03 | GREEN | node --test growth/tests/diagnostic.test.mjs | 6 pruebas pasan: prioridades, empates, respuestas desconocidas, entradas inválidas, límites de puntuación y determinismo sin mutación |
| T03-link | RED | node --test growth/tests/diagnostic.test.mjs | 6 pasan y 1 falla: Unknown resource ID: antes-del-tour; reproduce el uso anterior del slug como identificador analítico |
| T03-link | GREEN | node --test growth/tests/diagnostic.test.mjs | 7 pasan: cada recomendación apunta a un recurso publicado de seed mediante su ID inmutable y su slug de URL |

Excepcion TDD: composición visual HTML/CSS, validada mediante render y revisión visual. El diagnóstico funcional tiene evidencia RED/GREEN. El agente principal mantiene las pruebas integradas del CMS, los permisos, los medios y las solicitudes; el estado de esa validación se documenta en su evidencia CP4 y no se presume concluido aquí.

## Comprobaciones ejecutadas

- `node --check` correcto para `cms.mjs`, `site.mjs` y `diagnostic-ui.mjs`.
- Compilación Jinja correcta para todas las plantillas.
- Cliente Flask aislado en directorio temporal: `/descubre/`, `/mediahub/`, `/mediahub/antes-del-tour/`, `/descubre/diagnostico/`, `/descubre/privacidad/` y `/cms/` responden 200.
- Prettier local ya instalado en el workspace formateó JavaScript y CSS sin agregar dependencias al producto. Las plantillas mantienen sintaxis Jinja; hub se formateó manualmente.

## Implementación revisada

El CMS consume el contrato compartido: formularios de landing, FAQ y SEO; recursos con editor de títulos, párrafos, listas y tablas; estado de archivo; metadatos, subida de medios y selectores de portada y adjuntos; almacenamiento; bandeja, historial y usuarios para propietarios. Un conflicto conserva los campos locales y ofrece recargar explícitamente el borrador; los cambios sin guardar se señalan antes de navegar.

Los textos interpolados por JavaScript se escapan. Jinja conserva autoescape. No hay editor de HTML arbitrario ni panel JSON. No se cargan scripts o fuentes remotas. Los medios usan el texto alternativo editorial, el título del archivo y la variante correcta según su MIME. El formulario de demo se habilita al inicializar JavaScript; sin JavaScript permanece desactivado y nunca envía el correo mediante una URL GET.

La medición requiere consentimiento previo; no envía respuestas, correo ni otros datos de los formularios. La preferencia se guarda localmente y el identificador de recorrido permanece en memoria. Las recomendaciones separan ID de recurso y slug de navegación.
