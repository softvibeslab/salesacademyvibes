# CP4 · Publicación verificada

Fecha: 2026-11-07. Las cinco versiones y el índice están servidos públicamente por HTTPS. Historia LISTA verificada, sin modificar el prototipo operativo ni archivos históricos de las versiones.

## Evidencia RED → GREEN

| Tarea | Fase | Comando | Resultado observado |
|---|---|---|---|
| T01 constructor | RED | `python3 -m unittest discover -s growth/deploy/versions -p test_build_release.py -v` |13 tests;  15 fallos por comportamiento ausente y 1 error por índice inexistente. [Salida](evidence/build-release-red.txt). |
| T01 constructor | GREEN | mismo comando |13 tests OK, whitelist, hashes, traversal, symlinks, duplicados, aislamiento y reproducibilidad. [Salida](evidence/build-release-green.txt). |

Excepcion TDD: índice HTML/CSS, configuración de infraestructura, despliegue y verificadores QA no alteran lógica funcional de las versiones históricas; se comprobaron con pruebas reales, geometría, manifest y smoke HTTPS. El constructor sí se implementó con RED→GREEN. El fallo por índice inexistente no se usa como única evidencia RED: hay 15 fallos funcionales adicionales.

## Gates ejecutados

| Validación | Resultado | Evidencia |
|---|---|---|
| Cinco paquetes de origen |1,704 entradas verificadas, hashes íntegros |versions-inventory.json |
| Release reproducible |Dos builds idénticos;317 archivos runtime/índice/wrappers |evidence/build-release-real.json y release-manifest.json |
| Smoke WSGI local |Las 5 fábricas arrancan, páginas 200, privado 401, HTTPS/config segura |evidence/build-release-wsgi.json |
| Índice sin JS local |360/390/768/980/1440 sin overflow; CTAs ≥44px; 157KB |evidence/index-local/results.json |
| Público HTTPS |544 comprobaciones correctas,0 fallos:6 hosts, redirects, páginas, CMS 401, assets y 15 videos Range206 |evidence/public-smoke.json |
| CMS autenticado |75 comprobaciones correctas:login,owner, session, draft, revisions, preview, CSRF, origen, cookies aisladas y logout;sin publicación válida |evidence/cms-smoke.json |
| Navegador público |9 recorridos:índice desktop/móvil sinJS,5 versiones,v5 desktop/móvil y galerías;sin errores HTTP/JS/consola ni overflow |evidence/public-browser/results.json |
| VSL |32.879 s, 576×1024, 9 cues ES, sin autoplay; reproducción voluntaria correcta |evidence/public-browser/ |
| DNS/TLS/servicios |6 A creados preservando zona; SAN de seis nombres válido hasta 2027-02-05; timer/hook de renovación activos; cinco units activas y puertos loopback |evidence/dns-publication.json y deployment-verification.json |
| Regresión sitios actuales |.art, .pro y digitalspace.pro devuelven 200 con cuerpo SHA idéntico al previo |evidence/deployment-verification.json |

## Alcance de infraestructura y límites

La comparación de todas las configuraciones Nginx detectó un cambio concurrente en `garvi.softvibes.pro.conf`, ajeno a los archivos y comandos de este despliegue. Se registró sin revertirlo ni atribuir su autoría: evidence/existing-vhost-changes.json. Por eso el booleano global existingVhostsUnchanged esfalse; no se oculta ni se presenta como verificación de todo el servidor. Los tres sitios de referencia conservaron sus cuerpos y estado 200.

La revisión final detectó que el verificador de CMS permitía seguir redirects y podía reenviar un header CSRF. Se corrigió para rechazarlos antes de otra solicitud, comprobado con un fixture sintético sin red. No se observó ningún redirect ni fuga en la ejecución previa; no cambió código publicado de las versiones.

Las credenciales se crearon en el servidor con claves independientes y permisos 0600; no están en release ni evidencia. La transferencia local fue rechazada por revisión automática por requerir autorización explícita para mover secretos a ese destino. No se reintentó ni se eludió el bloqueo. Entrega de credenciales pendiente; publicación y validación CMS completadas.

El rollback está preparado/documentado en growth/deploy/versions/README.md; no se simuló una caída sobre el sitio público. Captación por formulario deshabilitada; CTA WhatsApp v5 operativo como enlace, sin mensajes enviados ni agenda confirmada. Los CMS usan nuevas semillas, no bases de las previews locales. La revisión visual no equivale a certificación WCAG ni métricas de campo.

## TRUST 5

| Dimensión | Evidencia ejecutada |
|---|---|
| Tested |13 unitarias, 544 comprobaciones públicas, 75 CMS, 9 recorridos navegador y geometría móvil/escritorio. |
| Readable |Índice español con diferencias concretas; guía operativa y URLs por versión. |
| Unified |ZIPs inmutables, requirements idénticos, orígenes nativos sin reescribir rutas ni contratos CMS. |
| Secured |TLS, SAN, permisos 0700/0600, cookies host-only, CSRF, origen, headers reemplazados, usuarios/procesos aislados; sin secretos en artefactos. |
| Trackable |Autorización citada, CP0–CP5, ADR, manifiestos, QA, release fijado y rollback preparado. |

Gobernanza estricta: evidence/verify-governance.txt. La aceptación visual final del PO no se atribuye automáticamente.
