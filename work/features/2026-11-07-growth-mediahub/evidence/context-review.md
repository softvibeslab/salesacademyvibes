# Sales Academy: revisión de contexto y CP2

Fecha: 2026-11-07. Revisión en solo lectura; no se ejecutaron endpoints ni pruebas contra producción.

## Dictamen

El CP2 `work/features/2026-11-07-growth-mediahub/cp2-spec.md` y el ADR propuesto son coherentes con el estado documentado actual. No se encontró aprobación previa que autorice implementar esta landing/CMS. La iniciativa de tres salas tampoco está aprobada como contrato ejecutable.

## Hechos confirmados y fuentes

- `README.md`, `docs/status.md`, `docs/ficha-ejecutiva.md`, `docs/stack-y-api.md`: corte 7 de noviembre; dominio raíz sirve demo del rep, `/ops/` el tablero y `/copiloto/` el asistente. Stack actual HTML/CSS/JS + API Python stdlib + JSON. Identidad declarada por selector/encabezado, no autenticación real. Semilla de dos salas. Métricas de ventas ilustrativas, no resultados del negocio.
- `vcsAcademyMobile/work/stories/2026-11-06-piloto-3-salas.md`: `Readiness: EN REVISION`, aprobación PO pendiente. Propone CLUB-A, S1, S2 y S3; una instancia aislada por sala, en stack FastAPI/SQLite y React/Expo. Contiene preguntas abiertas de dominios, infraestructura, usuarios, contenido, UI y permiso de datos. No acredita tres salas desplegadas ni ventas.
- `investment/calculadora-semilla/PROYECCION_INGRESOS.md`: septiembre; hipótesis comerciales, no contratos. Plantea una sala piloto y tres salas de pago progresivas en M4/M7/M10. Once salas = oportunidad mencionada. Precios, 20 reps, 1,000 tours/mes, ingresos y margen son escenarios internos, no claims públicos.
- `hub/admin/README.md` y `hub/admin/ANALISIS.md`: dashboard de integración demo, con localStorage y datos ficticios. No es CMS editorial ni autorización real.
- `sitios/README.md`: generador de páginas white-label desde JSON, sin dependencias ni servicios; no es CMS multiusuario. Publicación descrita como no realizada en esa documentación.
- `chrissalesacademy/knowledge-base/00_FUENTE_DE_VERDAD.md`, `01_PRODUCTO_Y_NEGOCIO.md`, `03_MARCA_CONTENIDO_MEDIOS.md`: nombre Sales Academy; español; «plataforma», «rep» o «representante»; Smart Agent, Smart GoalSheet, Training Roadmap; negro/oro/blanco, preferencia por UI real. El producto ayuda a preparar y entrenar, sin garantizar resultados ni sustituir líderes. El Blueprint de 11 pasos no es metodología universal.

## Ajustes accionables al CP2

1. Incluir la historia de tres salas del 6 de noviembre en la tabla de evidencia como fuente reciente; explicitar su estado pendiente. Separarla del escenario comercial de septiembre.
2. Indicar que CMS/landing no aprueban ni implementan las instancias operativas del piloto. La separación por sala y la identidad real siguen en aquella historia y stack.
3. Añadir la fuente de marca a la sección de diseño. Los hex nuevos son propuesta, no paleta oficial exacta. El actual `prototypes/smart-agenda-mockup/styles.css` usa marfil y oro oscuro, lo que apoya la dirección propuesta.
4. Usar «Acceder a la plataforma» o «Ver la demo» en el enlace público, conservando «app» solo en documentación técnica si conviene.
5. Etiquetar recursos iniciales como propuestas editoriales revisables; no reutilizar guiones/metodologías privadas, nombres de clubes, condiciones comerciales ni testimonios por existir en las carpetas.

## Assets

- Mejor evidencia visual: captura nueva de la UI actual del rep/ops usando datos de demostración, con etiqueta visible.
- `investment/pitch-sales-academy/product-demo.png` y previews del mismo directorio son candidatos existentes; revisar antigüedad y contenido antes de publicar.
- `prototypes/copiloto-rep/docs/capturas/` contiene capturas funcionales; varias incluyen cotizaciones/catálogos, por lo que no asumir que son aptas para marketing.
- `sitios/ruta/assets/img/`, `sitios/presentacion/assets/` y `sitios/viaje-v2/assets/` son ilustraciones narrativas existentes; no acreditan clientes, salones ni resultados reales. Mantenerlos como referencia, no como prueba de operación.

## Límites

No se leyeron archivos de secretos, datos crudos de tours ni transcripciones personales. La revisión en AIS-OS encontró solo una referencia de alcance Graphify al término Sales Academy, sin contrato de aprobación adicional. No se encontró `project-profile.local.yml` en el inventario dirigido de SalesAcademyVibes.
