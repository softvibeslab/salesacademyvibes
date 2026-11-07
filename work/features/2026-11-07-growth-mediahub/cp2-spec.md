# CP2 · Landing, embudo y mediahub de Sales Academy

**Status:** approved — v1 aprobada para implementación local.
**Date:** 2026-11-07
**Product:** Sales Academy
**Owner:** Roger, Product Owner. Aprobación: «si lo apruebo contruye lis artefactis», conversación Codex, 2026-11-07.
**Historia:** ../../stories/2026-11-07-growth-mediahub.md

## 1. Problema y objetivo

El dominio actual abre directamente una app de demostración. Falta una entrada comercial que explique el producto a responsables de salas de ventas de clubes vacacionales, les entregue ayuda útil y permita pedir una demostración con contexto. El contenido comercial está distribuido entre propuestas, presentaciones y prototipos; no hay evidencia de un CMS editorial de Sales Academy operativo.

Crear una experiencia pública de descubrimiento y una herramienta editorial privada. Conversión principal: solicitud de demo recibida en el servidor. Los clics, diagnósticos y solicitudes no equivalen a ventas ni a reuniones realizadas. El desempeño comercial se medirá después de publicar y obtener una línea base; no se promete una tasa de conversión.

## 2. Alcance propuesto

- Landing B2B en `/descubre/`, sin cambiar la app en `/`, el tablero `/ops/`, el Copiloto `/copiloto/` ni el contrato `/api/` existente.
- Mediahub público en `/mediahub/`: guías, plantillas, prácticas y, cuando existan materiales aprobados, video y audio. Tres recursos escritos completos iniciales; no tarjetas de descarga sin archivo.
- Autodiagnóstico anónimo en `/descubre/diagnostico/`, resultado visible sin correo ni cuenta.
- Formulario voluntario para pedir una demo. Persistencia propia y bandeja privada; no se afirma que un correo o WhatsApp se envió si no existe integración comprobada.
- CMS en `/cms/`: landing por bloques, biblioteca editorial y multimedia, borradores, preview privada, publicación, historial y recuperación.
- Comunicación del piloto de tres salas de `vcsAcademyMobile/work/stories/2026-11-06-piloto-3-salas.md`, aún EN REVISION: una instancia aislada por sala para entrenamiento. Esta feature no implementa ni aprueba ese piloto y no agrega tours/CRM, LLM externo o reporte consolidado a su alcance.
- Instrumentación mínima y consentimiento granular; secuencia de seguimiento entregada como borrador editorial.

Fuera de esta versión: cobros, suscripciones, envío automático de mensajes, publicación social, anuncios pagados, integración CRM, datos reales de tours, nueva autenticación de la app operativa y despliegue público. Activar esos componentes requiere su alcance y comprobación correspondientes. No se cambia de lugar la app existente en esta versión.

## 3. Hechos y base de reutilización

| Evidencia | Implicación |
|---|---|
| `docs/status.md`, `docs/ficha-ejecutiva.md`, `docs/stack-y-api.md`, corte 2026-11-07 | Demo con tours compartidos, identidad por selector y métricas ilustrativas; no presentarlo como operación real |
| `prototypes/smart-agenda-mockup/ops-store.js`, `server/ops_api.py` | Semilla de dos salas; no usar el encabezado de rol del demo como login del CMS |
| `vcsAcademyMobile/work/stories/2026-11-06-piloto-3-salas.md` | Piloto operativo propuesto de tres instancias aisladas; pendiente PO. Distinto de la proyección comercial de septiembre y del demo de tours |
| `chrissalesacademy/knowledge-base/03_MARCA_CONTENIDO_MEDIOS.md` | Marca negro/oro/blanco, español, término plataforma y preferencia por UI real; no metodología universal ni publicación de contenidos privados |
| `investment/pitch-sales-academy/README.md`, `sitios/marcas/sales-academy.json` | Existe landing del mismo nicho y recorrido de producto; reutilizar arquitectura visual y vocabulario, no precios ni proyecciones como hechos |
| SoftvibesSites: `cisne-negro-cerveceria/backend/cms_server.py`, `cms_content.py`, `cms_media.py`, `sitio/cms/` | Referencia real en código para persistencia, sesiones, versiones, permisos y medios; adaptación selectiva, sin datos, cuentas o contenido ajeno |

El demo actual de tours y el piloto propuesto de entrenamiento son líneas distintas. Ninguna pieza debe presentarlos como un único sistema productivo conectado.

La portada pública debe mostrar demostraciones identificadas como tales. No se usarán logos de clientes, testimonios, número de salas activas, ahorros o incrementos de cierre sin evidencia y permiso de publicación.

## 4. Recorrido y diseño para aprobación

Landing: encabezado de marca y enlace discreto «Ver la demo»; propuesta de valor; demostración tour → preparación → práctica; recursos abiertos; autodiagnóstico; ruta propuesta de una a tres salas; preguntas frecuentes; solicitud de demo. El CTA de descubrimiento es **Diagnosticar mi sala**; el de intención alta, **Solicitar una demo**. No compiten tres ofertas o tres precios en el primer bloque.

Mediahub: recurso destacado, búsqueda y filtros por rol, tema y formato; tarjetas con título, propósito, duración orientativa y formato; ficha con contenido completo, fuente editorial y recurso siguiente. Estados de carga, vacío, sin resultados y error explícitos. CMS: navegación Inicio / Landing / Recursos / Medios / Solicitudes / Publicaciones / Usuarios.

Dirección de marca confirmada: negro, oro y blanco; variantes de superficie tomadas de sitios/marcas y del demo actual. Paleta concreta propuesta: marfil `#F7F5F0`, tinta `#141414`, oro `#C9A24A`; el oro es acento, no texto pequeño sobre blanco. Tipografía sans legible, títulos de gran tamaño, espaciado editorial y captura demostrativa como evidencia de producto. Sin vídeo automático de fondo ni animación que impida leer. Los materiales del pitch verde quedan como referencia estructural; se unifica la nueva entrada con la identidad marfil y oro.

## 5. Requisitos funcionales

| ID | Comportamiento obligatorio |
|---|---|
| REQ-01 | Servir HTML público con título, descripción, H1, contenido útil y navegación sin depender de JavaScript para leerlo. Mantener las rutas existentes. |
| REQ-02 | Mostrar capacidades existentes, ejemplos y propuestas con etiquetas distintas y sin cifras de negocio inventadas. |
| REQ-03 | Resolver un diagnóstico de seis respuestas discretas en el navegador; permitir volver, corregir y reiniciar; no pedir contacto para ver el resultado. |
| REQ-04 | Filtrar y buscar recursos publicados; tener una URL estable por recurso y un estado sin resultados con acción para limpiar filtros. |
| REQ-05 | Leer íntegramente los tres recursos iniciales y descargar su versión disponible; cada enlace debe existir y corresponder al texto ofrecido. |
| REQ-06 | Validar y persistir solicitudes de demo con consentimiento para responder, idempotencia y límite de frecuencia; confirmar recepción solo tras éxito del servidor. |
| REQ-07 | Autenticar cuentas editoriales individuales, expirar y revocar sesiones; validar permisos en servidor. Crear primer owner únicamente mediante comando local con contraseña introducida de forma oculta; sin credenciales por defecto ni autorregistro público. Recuperación asistida por operador mediante comando local que revoca sesiones; impedir desactivar o degradar la última cuenta owner activa. |
| REQ-08 | Guardar borradores duraderos de landing y recursos, recuperar tras reconexión y detectar edición concurrente mediante revisión. |
| REQ-09 | Subir y organizar imágenes y documentos admitidos con validación real de tipo y tamaño, procedencia, derechos, estado de revisión, alt text y búsqueda. |
| REQ-10 | Mantener originales, borradores y previews privados. Servir al público únicamente derivados y recursos aprobados de una publicación activa. |
| REQ-11 | Publicar una revisión completa validada; un fallo conserva la versión anterior. Recuperar una versión al borrador y exigir publicación explícita. |
| REQ-12 | Archivar recursos y medios; impedir que una retirada rompa contenido publicado o versiones retenidas. |
| REQ-13 | Registrar solo los eventos v1 definidos en el contrato propio de captación, sin texto libre, PII ni respuestas individuales; no enviar analítica opcional antes del consentimiento. Métricas comerciales posteriores se revisan manualmente y no activan correo o CRM. |
| REQ-14 | Mostrar la ruta de tres salas como propuesta y mantener acceso editorial independiente de datos operativos por sala. |

## 6. Datos y contratos propuestos

Son contratos nuevos para esta feature, no endpoints existentes. Prefijo `/cms/api/` para gestión y `/growth-api/` para captación. Nunca reutilizar `/api/reset` ni el almacén de tours.

| Entidad | Campos y restricciones principales |
|---|---|
| LandingRevision | id, version, hero, sections, cta, seo, status, authorId, createdAt; estructura validada, sin HTML o scripts arbitrarios |
| Resource | id, slug único estable, title, excerpt, body por bloques permitidos, type, role, topic, level, coverId, attachments, externalMediaUrl opcional HTTPS con proveedor permitido, status, evidenceLabel, sourceNote, reviewedAt; estados draft/review/published/archived |
| MediaAsset | id opaco, checksum, mime validado, bytes, title, alt, origin, rightsStatus, reviewStatus, derivatives, usages; original privado |
| Publication | id, snapshot completo, authorId, createdAt, checksum; revisión inmutable |
| StaffUser / Session | id, role owner/editor, active; hash de contraseña y hash de token fuera de respuestas; expiración y revocación |
| DemoRequest | id, email, role, roomCountBucket, need, contactConsentAt, marketingOptIn, privacyVersion, createdAt, status; sin nombres de huéspedes ni texto de tours |
| AnalyticsEvent | eventId UUID, flowId efímero UUID en memoria tras consentimiento, event enum, resourceId opcional existente, placement enum, consentVersion, receivedAt asignado por servidor; sin identificadores personales |
| AuditEntry | actorId, action, entityId, revisionId, time; sin contraseñas, tokens ni contenido privado en logs |

Solicitud de demo: correo obligatorio de máximo 254 caracteres; rol en director/leader/rep/other; salas en one/two/three/more; necesidad en coordination/practice/coaching/pilot; consentimiento para responder obligatorio; novedades opcionales y desmarcadas. No pedir teléfono o empresa para la primera solicitud. Privacidad y responsable de atención deben cerrarse antes de habilitar captación pública.

| Método y ruta | Acceso | Resultado |
|---|---|---|
| GET `/mediahub/` y `/mediahub/{slug}/` | Público | HTML de revisión publicada; 404 si no está publicada |
| POST `/growth-api/demo-requests` | Público con validación y rate limit | 201 con id; repetición misma clave/cuerpo devuelve recepción existente; 400 inválido; 409 clave reutilizada con otro cuerpo; 429 límite; error no muestra éxito |
| POST `/growth-api/events` | Público, consentimiento y validación | 202 aceptado; 204 repetición de eventId; 400 esquema/propiedad desconocida; 429 límite; nunca almacenar PII |
| POST `/cms/api/login` | Público limitado | Sesión por cookie HttpOnly; error genérico y 429 por abuso |
| GET `/cms/api/session`, POST `/cms/api/logout` | Autenticado | Usuario/permisos y CSRF; logout invalida token |
| GET/PUT `/cms/api/draft` | Editor/owner, CSRF en escritura | Documento y revision; 409 si revisión antigua, sin sobrescritura |
| GET/POST `/cms/api/resources`; PATCH `/cms/api/resources/{id}` | Editor/owner | CRUD editorial; nunca publicación implícita |
| GET/POST `/cms/api/media`; PATCH `/cms/api/media/{id}` | Editor/owner | Índice, carga y metadatos; 413 peso, 415 tipo; archivos pendientes privados |
| GET `/cms/preview/` | Editor/owner | Preview privada no indexable, sin caché pública |
| POST `/cms/api/publish` | Owner, CSRF | Nueva publicación o fallo conservando revisión anterior |
| GET `/cms/api/revisions`, POST `/cms/api/restore` | Owner | Historial; restauración a borrador, sin afectar leads ni tours |
| GET/PATCH `/cms/api/demo-requests` | Owner | Bandeja y estado interno; nunca visible a editor |
| GET/POST `/cms/api/users`; PATCH `/cms/api/users/{id}` | Owner | Cuentas; desactivar revoca sesiones |

Eventos v1 permitidos: landing_viewed, resource_viewed, diagnostic_started, diagnostic_completed, recommendation_opened. demo_requested se genera una sola vez en servidor al persistir una solicitud y no depende de un clic cliente. Los demás eventos de calificación/piloto/correo del plan son métricas manuales futuras. placement permite hero/resource/result/footer; resourceId solo ID estable de un recurso publicado conocido (refinamiento CP3: separa identidad del recurso y slug de su URL). El servidor rechaza campos extra, cuerpos mayores a 2 KB y nombres de evento desconocidos. flowId no se guarda en cookie ni localStorage y se regenera al iniciar otra visita; se descarta al retirar consentimiento. Retención propuesta de eventos: 30 días, consulta agregada solo owner. V1 muestra conteos y la tasa de diagnósticos completados sobre flujos consentidos que iniciaron el diagnóstico en los últimos 30 días; deduplica flujos e intersecta inicio y fin. Sin denominador muestra «Sin datos». No correlaciona páginas, identifica visitantes únicos ni atribuye resultados comerciales.

Todos los errores devuelven código estable y mensaje seguro, sin trazas internas. Paginación cursor/limit con límite máximo 50. Los contratos detallados OpenAPI se producirán en CP3 a partir de esta frontera aprobada. No habrá subida desde URL arbitraria ni proxy remoto que permita SSRF.

## 7. Seguridad y privacidad

Propietario publica, restaura y gestiona usuarios/solicitudes. Editor prepara contenido y medios pero no publica ni lee solicitudes. Anónimo lee exclusivamente publicaciones. La app operativa conserva su situación actual; su selector de rol no sirve para entrar al CMS.

Sesiones del lado servidor, cookies HttpOnly y Secure bajo HTTPS, SameSite, CSRF en operaciones, rotación al login y revocación en cambios de acceso. Limitar login y formulario, validar longitud y enumeraciones. Datos editoriales y solicitudes fuera del directorio desplegable, con permisos mínimos. Respaldo consistente con prueba de recuperación. Contenido textual escapado; enlaces HTTP(S) permitidos y recursos con MIME comprobado. Referencias: [autenticación OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html), [sesiones OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html), [cargas OWASP](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html).

Límites propuestos v1: imágenes JPG/PNG/WebP de hasta 10 MB y 25 megapíxeles; PDF de hasta 10 MB con descarga como attachment y sin HTML activo; vídeo/audio únicamente enlaces HTTPS a proveedores permitidos (YouTube y Vimeo en v1) con título, duración y transcripción revisada. No subir ni transcodificar vídeo/audio en esta versión; no importar grabaciones privadas. Los embeds no se cargan hasta una acción expresa del visitante; validar hostname exacto y ruta permitida, sin fetch del servidor ni HTML de embed arbitrario. Cuota inicial propuesta 2 GB, contador visible. No transcodificación de vídeo en v1. Imágenes derivadas sin metadatos EXIF. Formularios de prueba solo con dominios `.invalid`.

Retención propuesta para revisión de negocio: solicitudes sin actividad, 90 días; logs técnicos sin contenido, 30 días; 14 respaldos diarios. La retención efectiva y el aviso deben aprobarse antes de recoger datos reales. El consentimiento para novedades es distinto de pedir respuesta a la demo. No habrá retargeting ni identificación encubierta.

## 8. Requisitos no funcionales

| ID | Objetivo verificable | Evidencia requerida |
|---|---|---|
| NFR-01 | Usable de 360 a 1440 px, zoom 200%, teclado y foco visible; controles de acción de 44 px como objetivo de diseño | Capturas y recorrido manual; auditoría automática complementaria |
| NFR-02 | Contraste texto normal al menos 4.5:1; alt, labels, errores anunciados y reduced-motion | Revisión según [WCAG 2.2](https://www.w3.org/WAI/WCAG22/quickref/) |
| NFR-03 | Landing inicial sin vídeo automático; presupuesto inicial 500 KB comprimidos excluyendo medios cargados voluntariamente | Informe local de recursos y prueba móvil; LCP/CLS de campo pendientes de tráfico real |
| NFR-04 | No filtrar borradores, originales, solicitudes o tokens en HTML, JSON público, mapas o logs | Casos negativos por ruta y revisión de bundle |
| NFR-05 | Persistir tras reinicio; publicación atómica, detección de conflicto y restauración comprobada | Pruebas con directorio/base temporal |
| NFR-06 | App, ops y Copiloto conservan rutas; ninguna prueba comercial resetea datos operativos | Smoke de lectura y comparación de rutas |

## 9. Acceptance Criteria / Criterios de aceptacion

| ID | Dado / Cuando / Entonces | REQ | Prueba prevista |
|---|---|---|---|
| AC-01 | Dado el HTML público, al abrir sin JS se leen oferta, recursos y acceso a la app; no se reemplaza `/` | REQ-01 | public_landing_keeps_app_routes |
| AC-02 | Dado el contenido, las tres salas se etiquetan como ruta propuesta y métricas demo como ejemplo | REQ-02,14 | public_claims_have_evidence_labels |
| AC-03 | Dadas seis respuestas válidas, el diagnóstico produce siempre la misma recomendación sin contacto; incompletas no se evalúan | REQ-03 | diagnostic_is_deterministic_and_ungated |
| AC-04 | Dado un catálogo, filtrar y buscar muestra coincidencias publicadas y un vacío recuperable | REQ-04 | hub_filters_only_published_resources |
| AC-05 | Dados tres recursos iniciales, sus textos y descargas existen, abren y corresponden al título | REQ-05 | starter_resources_have_real_content |
| AC-06 | Dada una solicitud válida, el servidor persiste una vez y confirma; sin consentimiento o sin red no genera falso éxito; misma clave/cuerpo devuelve mismo id sin nuevo registro y clave con otro cuerpo devuelve 409 | REQ-06 | demo_request_validation_idempotency |
| AC-07 | Dado un anónimo/editor, acciones de propietario devuelven 401/403; sesión revocada deja de funcionar; no hay autorregistro y no puede desactivarse el último owner | REQ-07 | server_enforces_roles_and_revocation |
| AC-08 | Dado un borrador guardado, sobrevive a reinicio; revisión obsoleta recibe 409 y conserva cambios locales | REQ-08 | draft_survives_restart_and_conflicts |
| AC-09 | Dados medios falsos, grandes o duplicados, se rechazan o deduplican; medio válido conserva procedencia y alt; subida de vídeo/audio se rechaza y enlaces externos solo pasan allowlist | REQ-09 | media_validation_and_deduplication |
| AC-10 | Dado un borrador o medio no publicado, anónimo no accede por URL, búsqueda, API o índice | REQ-10 | unpublished_content_is_private |
| AC-11 | Dada una publicación fallida se conserva versión previa; restaurar crea borrador y no toca solicitudes/tours | REQ-11 | publication_is_atomic_and_restore_scoped |
| AC-12 | Dado un medio en uso, archivarlo no rompe publicaciones y el CMS muestra sus referencias | REQ-12 | referenced_media_is_preserved |
| AC-13 | Dado rechazo de analítica, no sale ningún evento opcional; al aceptar no se envía PII y no se duplica confirmación | REQ-13 | tracking_respects_consent_and_deduplicates |
| AC-14 | Dado móvil/teclado, se completa diagnóstico y edición; restaurar backup recupera contenido y referencias | NFR-01..06 | mobile_editor_uat_and_backup_restore |

## 10. Riesgos y decisiones

La propuesta de CMS adapta patrones Python/Flask/SQLite y frontend HTML/CSS/JS ya presentes en el ecosistema; el detalle y la separación de almacenamiento están en el ADR. No se copia el CMS completo con funciones del otro negocio. Dependencias y versiones se fijarán en CP3 tras comprobación. No se modifica el framework central ni se instalan componentes sin contrato aprobado.

La fuente del Copiloto no está en este repositorio; basta enlazar a la ruta existente. Las grabaciones, archivos comerciales privados y conversaciones de terceros no son contenido autorizado del mediahub por estar en una carpeta.

## Gate CP2 → CP3

- Especificación, diseño textual, AC y datos simulados preparados para revisión.
- Aprobación humana: **recibida** después de presentar la v1. Cita exacta registrada en la historia.
- Historia: **LISTA**, aprobada por el PO.
- Estado histórico al recibir aprobación: no se había escrito código productivo. La implementación posterior y su evidencia están en CP3/CP4.

La aprobación recibida cubre esta v1, su historia, arquitectura, diseño textual y escenarios; permite pasar a implementación local. El despliegue público será una decisión posterior sobre una entrega comprobada.
