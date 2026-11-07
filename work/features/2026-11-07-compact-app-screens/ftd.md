# FTD · Pantallas de app más compactas

Fecha: 2026-11-07. Carril: FTD, ajuste visual frontend sobre el despliegue autorizado.

## Claridad

Solicitud literal del usuario en Codex: «haz mas pequeño el tamaño de los screenshots o layouts de la app y ya subela».

Entendimiento: reducir aproximadamente un 25% los marcos de pantallas de app de la versión más reciente V5, su galería de escenarios y el índice público. Mantener proporciones, imágenes originales, navegación, scroll y VSL. Conservar las versiones históricas v1–v4 y las bases CMS. La publicación del ajuste está expresamente autorizada.

- **Hecho cuando:** pantallas visiblemente más pequeñas en móvil/tablet/escritorio; imágenes completas sin recorte, textos y leyendas legibles, sin overflow ni solapamientos nuevos; mismo CTA WhatsApp y VSL reproducible; CSS actualizado en HTTPS y release anterior recuperable. No hay preguntas abiertas.

## Intencion

Dar más aire a la fotografía y al contenido reduciendo el tamaño visual de las interfaces de app. La petición y el alcance se registraron antes del cambio; se ajustan ahora los encabezados al formato estricto del verificador.

## Alcance y Repo Paths

Frontend: growth/site/assets/ai-journey.css, growth/site/assets/scenarios/scenarios.css y growth/deploy/versions/index/styles.css. Publicación mediante nueva copia del release existente, parche CSS explícito y cambio atómico del symlink current; reinicio solo de V5 para cargar la nueva raíz. No cambia contratos API, modelos, autenticación, DNS, TLS ni dependencias.

## Checklist

- Medir tamaños públicos actuales y guardar capturas.
- Reducir anchos CSS respetando puntos de quiebre y mantener proporción.
- Medir y revisar versión candidata con hojas CSS interceptadas en navegador antes de publicación.
- Publicar copia versionada y verificar hashes HTTPS, páginas y geometría finales.

Excepcion TDD: ajuste puramente visual de CSS. Se comparan dimensiones reales antes/después y se valida en navegador; no se añaden pruebas que repliquen constantes CSS.

## TRUST 5

| Dimensión | Evidencia |
|---|---|
| Tested |18 comparaciones antes/después en 360/390/768/980/1440/1920; reducción real 21.43–23.40%, sin overflow, imágenes y proporciones correctas. evidence/candidate-summary.json. |
| Readable |Solo cambian anchos de marcos; se preservan leyendas y textos. Revisión visual de índices, galería y práctica en móvil/escritorio. |
| Unified |Tres hojas CSS existentes, mismos breakpoints y motores de scroll. Sin nuevas dependencias ni contratos. |
| Secured |Revisión de hashes antes de reemplazar; misma configuración CMS/TLS; no se accedió ni transfirió ninguna credencial. |
| Trackable |Petición citada, valores previos respaldados, parche con SHA256, release anterior recuperable y pruebas públicas finales. |

## Evidencia y publicación

- Anchos reducidos en 21.43–23.40%. VSL y fotografías con geometría idéntica. Cinco pilares activos correctos; imágenes cargadas sin distorsión.
- Dos alertas iniciales de overlap en el índice correspondían a cajas CSS vacías: verificación de líneas de texto reales y revisión visual dieron cero colisiones. Evidencia original preservada en candidate-results.json; resolución en index-text-geometry.json.
- Publicado en https://salesacademy.softvibes.cloud/ y https://v5.salesacademy.softvibes.cloud/descubre/, con galería V5 en /growth-assets/scenarios/index.html.
- Release activo: /srv/salesacademy-cloud/releases/20261107-compact-screens-02. Manifiesto SHA256: c587c429e784d49ceb9830ace424d073047bb4539203c04746e2b0ca9e4a5e52.
- Se copiaron 317 archivos verificados desde el release anterior y se modificaron solamente 3 CSS. Solo se reinició salesacademy-cloud@v5; las bases CMS y versiones históricas no fueron modificadas.
- Rollback: cambiar atómicamente /srv/salesacademy-cloud/current a /srv/salesacademy-cloud/releases/20261107-versions-01 y reiniciar únicamente salesacademy-cloud@v5.service. El release anterior se conserva íntegro.
- Verificación pública y gobernanza: evidence/public-final.json, evidence/compact-screens-public.json y evidence/verify-governance.txt.

Excepcion TDD adicional: el script puntual de despliegue es configuración/operación de este parche visual; se valida con hashes, salud HTTP y verificación pública. No es un nuevo actualizador genérico.


## Siguiente

Entrega completada: revisión pública final 6/6 sin interceptores CSS, cero incidencias, tamaños idénticos al candidato aprobado. Disponible para revisión del usuario en las URLs publicadas.
