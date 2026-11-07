# CP5 · Entrega local

Alcance implementado: análisis ampliado del video indicado;15 screenshots reales;3 fotografías ilustrativas generadas;6 escenas navegables;6 composiciones PNG;guía CMS compatible y entrada en landing. Sin despliegue externo.

Vista: http://simulacion.localhost:4189/growth-assets/scenarios/index.html

Landing: http://simulacion.localhost:4189/descubre/

Guía: http://simulacion.localhost:4189/mediahub/un-dia-en-la-sala/

CMS: http://simulacion.localhost:4189/cms/ . Acceso local guardado fuera del repo en /private/tmp/salesacademy-growth-v4-access.txt, permisos0600; no se distribuye en el ZIP.

Fuente: growth/site/assets/scenarios/. Composiciones: compositions/*.png. Capturas: screens/*.png. Fotos fuente: assets/generated/ de esta feature. Prompts y modo built-in image_gen en image-prompts.json. Se usaron tres generaciones, no edición de screenshots. El navegador compone fotos y capturas como capas HTML explícitas.

Paquete: growth/dist/salesacademy-room-scenarios-v4.zip; manifiesto delivery-manifest-v4.json. Incluye fuente, landing/mediahub/CMS, películas previas, nuevos assets y evidencia. Excluye datos runtime y credenciales. Ver evidence/delivery-check.json para prueba de integridad final.

V3 recuperable en ZIP original y fuente preservada en /private/tmp/salesacademy-v3-preserved-20261107/salesacademy-growth; su servidor salesacademy.localhost:4188 conserva base anterior. V4 usa estado privado distinto. No se alteraron originales del usuario ni aplicación operativa.

La gobernanza estricta y los resultados de empaquetado quedan en evidence/verify-governance.txt y evidence/delivery-check.json. Validación funcional y límites en CP4. La aprobación del alcance proviene de CP0; la entrega local queda lista para revisión visual del usuario, sin atribuir una aceptación final que no ha ocurrido.
