# Historia Enriquecida · Nuevo tour desde survey o captura manual

**Readiness:** LISTA
**ID:** HU-TOUR-REGISTRATION
**Solicitante:** Roger
**Product Owner (aprueba):** Roger
**Enriquecido por:** Codex
**Fecha:** 2026-11-08
**Version:** v1

Contrato asociado: `work/features/2026-11-08-tour-registration/cp2-spec.md` v1. Contrato, criterios y fixtures aprobados por el PO el 2026-11-10: «Apruebo v1; implementar».

## 1. Resumen Ejecutivo

- **Qué:** registrar un tour desde una foto del survey o desde datos manuales de la pareja, con revisión humana y persistencia privada; diseñarlo en Stitch e integrarlo a la app.
- **Por qué ahora:** el usuario pidió este módulo; la agenda vigente solo admite leads anónimos y el registro actual captura resultados al terminar.
- **Costo de no hacerlo:** continúa la recaptura y falta una entrada para preparar el tour; no se cuantifica sin medición.
- **Alternativa más barata:** registro manual anónimo existente. No cubre los datos de pareja ni la lectura del survey solicitados.

## 2. Historia

Como asesor de sala, quiero iniciar un tour desde el survey o capturar la información de los visitantes, para revisar los datos una vez y continuar con mi preparación.

- **Problema actual:** no existe esa captura privada; los flujos de agenda y resultado son distintos.
- **Métrica de éxito propuesta:** ambas entradas completan los escenarios AC-01/02 sin duplicados, con datos correctos después de reiniciar el servicio. No se propone una mejora porcentual sin línea base.

## 3. Insumos Recibidos

| Insumo | Existe | Referencia | Acción |
|---|---|---|---|
| Requerimiento | Sí | Conversación citada en CP0 | Usar |
| Alcance Stitch y app | Sí | «Stitch y app funcionando» | Alcance confirmado; no aprobación CP2 |
| Diseño | Parcial | `DESIGN-TOUR.md` y proyecto Stitch 16859674583431881734 | Revisar ocho pantallas propuestas |
| Criterios | Propuestos | CP2 v1 | Propuesto IA, aceptar o ajustar |
| Escenarios/datos | Propuestos | Secciones 12–13 | Propuesto IA / Simulado IA |
| Reglas/contrato nuevo | Propuestos | CP2 v1 | Aprobar antes de código |
| Contratos existentes | Sí | Importador y contexto Hermes | Conservar límites y compatibilidad |

### Fuentes De Contexto

**Modo de contexto:** workspace

| Fuente | Tipo | Consultada | Referencia | Aporte |
|---|---|---|---|---|
| App activa | Repo workspace | Sí | `prototypes/smart-agenda-mockup/agenda.js`, `agenda.css`, `ops-api.js`, `ops-store.js`, `index.html` | Flujo, fechas, estilo, cliente API y estado |
| Spec importador | Documento | Sí | `work/features/2026-11-07-ops-import-preview/cp2-spec.md` | Contrato anónimo, sin pareja |
| Spec Hermes | Documento | Sí | `work/features/2026-11-07-hermes-contexto/cp2-spec.md` | Contexto sin PII y navegación |
| Runbook | Documento | Sí | `docs/stack-y-api.md` | Rutas y pruebas de app/API |
| Contrato del módulo | Documento | Sí | `work/features/2026-11-08-tour-registration/cp2-spec.md` v1 | Reglas propuestas de esta historia |
| Hermes | Servicio | No | No se realizó consulta | No se atribuyen hallazgos a Hermes |

## 4. Hechos Y Supuestos

| Tipo | Enunciado | Base | Riesgo si es falso |
|---|---|---|---|
| Hecho | El usuario pide foto y captura manual, en Stitch y app | Conversación | — |
| Hecho | La demo actual tiene acceso abierto de actor al tablero | FTD vigente y código | — |
| Hecho | Hoy usa una fecha sintética; Copiloto usa querystring para preguntas | `agenda.js` | — |
| Supuesto | Retención privada de 30 días es apropiada | Propuesta CP2 | Conservación insuficiente o excesiva; Q-02 |
| Supuesto | America/Cancun es la zona operativa de las salas | Propuesta CP2 | Fechas incorrectas; Q-02 |
| Supuesto | Lectura local de campos etiquetados más corrección manual satisface primera entrega | Propuesta CP2 | Formularios reales requieren otro parser; Q-03 |

## 5. Alcance

**Incluye:** dos entradas, preview, formulario, resumen, registro idempotente, detalle privado, agenda de la fecha registrada, recuperación, preparación genérica/Meet & Greet, configuración de autenticación privada y pruebas locales sintéticas.

**No incluye:** CRM, visión cloud, garantía de manuscritos, WhatsApp automático, solvencia/identidad oficial, edición privada posterior, borrador tras recarga ni PII enviada al Copiloto por URL.

## 6. Usuarios, Roles Y Permisos

| Rol | Puede | No puede |
|---|---|---|
| Rep autenticado | Registrar y consultar para sí mismo mientras pertenece a la sala original | Elegir otro rep/sala, ver pareja ajena o conservar acceso histórico al cambiar de sala |
| Jefe autenticado | Registrar para reps de su sala y consultar su alcance original | Usar encabezado abierto como autorización privada |
| Admin privado | Acceso autorizado global y operación protegida | Omitir control de sesión, retención o validación |
| Visitante sin sesión/actor abierto | Consultar capacidad no personal y superficies anónimas vigentes | Leer/escribir PII o mutar tours privados |

## 7. Flujos

1. Abrir Nuevo tour desde Hoy o Calendario; mostrar fecha, sala y asesor.
2. Elegir foto o manual. La foto se revisa antes de enviarla al lector local.
3. Revisar campos; corregir candidatos y completar lo faltante. Contexto adicional es opcional.
4. Revisar resumen, confirmar explícitamente y registrar una vez.
5. Ver tour pendiente, abrir su agenda, preparar de forma genérica o entrar a Meet & Greet.

Alternos: imagen inválida/ilegible/timeout → reintentar o manual; empalme/validación → corregir sin perder captura; red → reintentar mismo requestId; sesión expirada/cambio de usuario → limpiar memoria/foto; volver dentro de la sesión conserva borrador.

## 8. Reglas De Negocio

| ID | Regla | Fuente | Ejemplo |
|---|---|---|---|
| BR-01 | Principal 1–80 caracteres; acompañante opcional | Propuesto IA, CP2 REQ-04 | Ana Demo / vacío |
| BR-02 | Fecha válida, inicio anterior al fin y sin empalme del rep | Propuesto IA, CP2 REQ-06 | 10:30–11:30 válido; 11:00–10:00 inválido |
| BR-03 | Preview no crea tour; revisión humana obligatoria | Propuesto IA, REQ-03/06 | Foto legible solo genera candidatos |
| BR-04 | Reintento idéntico no duplica y payload distinto con mismo ID da 409 | Propuesto IA, REQ-06 | Dos clics crean una referencia |
| BR-05 | Datos privados separados; ámbito original no cambia por reasignación pública; rep trasladado pierde acceso histórico, jefe original/admin lo mantienen | Propuesto IA, REQ-08/09 y datos | Jefe ajeno no hereda acceso |
| BR-06 | Estado inicial pendiente; resultado de venta separado | Propuesto IA, REQ-07 | Nuevo tour no incrementa cierres |
| BR-07 | Retención 30 días con purga diaria sin tráfico y máximo efectivo 31; tombstone sin hash personal; borrador en memoria/foto temporal | Propuesto IA, datos/REQ-05 | Recarga no recupera borrador; purga no conserva hash de nombres |

## 9. Diseño

**Estado del diseno:** Aprobado
**Fuente del diseno:** `work/features/2026-11-08-tour-registration/DESIGN-TOUR.md`; [Stitch](https://stitch.withgoogle.com/projects/16859674583431881734).

| Pantalla/componente | Existe en diseño | Estados previstos | Observaciones |
|---|---|---|---|
| TOUR 01 Entrada | Sí, brief | Inicial, borrador | Dos tarjetas Foto/Manual |
| TOUR 02 Foto | Sí, brief | Vacío, preview, permiso/error | Imagen solo ficticia en diseño |
| TOUR 03 Revisión IA | Sí, brief | Carga, candidato, no encontrado | Procedencia por campo |
| TOUR 04 Manual | Sí, brief | Captura, validación | Opcionales desplegables |
| TOUR 05 Resumen | Sí, brief | Revisión, conflicto, guardando | CTA final único |
| TOUR 06 Éxito | Sí, brief | Tour pendiente | No resultado de venta |
| TOUR 07 Recuperación | Sí, brief | Ilegible, reintento/manual | Conserva correcciones |
| TOUR 08 Escritorio | Sí, brief | Comparación fuente/campos | Mismas reglas que móvil |

La existencia efectiva de pantallas guardadas se acredita en la evidencia visual de la feature. El brief no acredita funcionalidad ni aprobación del PO.

## 10. Datos, Contratos E Integraciones

| Elemento | Tipo | Cambio esperado | Responsable |
|---|---|---|---|
| `tourRegistrations` | Nuevo | Datos privados revisados + referencia anónima | Backend/datos |
| API del módulo | Nuevo | Capacidad, preview, creación, lista y detalle; forma exacta CP2 | Backend/frontend |
| Sesiones privadas | Cambio | Hashes individuales fuera del repo; rechazar demo | Backend/operación |
| `visits` y contexto Hermes | Lectura compatible | Proyección anónima; no filtrar datos de pareja | Backend |
| Foto | Temporal | Normalizar, leer, eliminar; no conservar original | Frontend/backend |
| Copiloto/Meet & Greet | Navegación | Preparación genérica sin PII en URL | Frontend |

## 11. Criterios De Aceptacion

| ID | Origen | Criterio (Dado / Cuando / Entonces) | Tipo | Estado PO | Comentario PO |
|---|---|---|---|---|---|
| AC-01 | Propuesto IA | Dado un formulario válido revisado, cuando confirma y reinicia el servicio, entonces existe un solo tour con su registro privado correcto | Positivo | Aceptado | — |
| AC-02 | Propuesto IA | Dada una foto, cuando se lee, entonces genera candidatos sin escribir; ilegible/timeout permite continuar manualmente | Positivo/borde | Aceptado | — |
| AC-03 | Propuesto IA | Dados fecha imposible, principal vacío, fin anterior o empalme, cuando confirma, entonces no escribe y explica cómo corregir | Negativo | Aceptado | — |
| AC-04 | Propuesto IA | Dado un reintento idéntico, cuando repite, entonces no duplica; ante conflicto conserva borrador | Borde | Aceptado | — |
| AC-05 | Propuesto IA | Dado rep/sala ajena, header falso o demo contra private, cuando consulta/escribe, entonces no obtiene ni cambia PII | Negativo | Aceptado | — |
| AC-06 | Propuesto IA | Dados registros privados, cuando se consultan superficies abiertas o se intenta reset/mutación abierta, entonces no filtran ni destruyen esos registros | Regresión | Aceptado | — |
| AC-07 | Propuesto IA | Dado un tour nuevo, cuando vuelve a su agenda, entonces ve la fecha registrada y el flujo de resultado sigue intacto | Regresión | Aceptado | — |
| AC-08 | Propuesto IA | Dada la UI a 360/390/1440 px, cuando usa teclado y foco, entonces labels, errores y CTA son operables y contexto opcional inicia cerrado | Positivo | Aceptado | — |
| AC-09 | Propuesto IA | Dada expiración/cambio de usuario u OCR tardío, cuando ocurre, entonces limpia memoria/foto o conserva corrección humana según corresponda | Borde | Aceptado | — |
| AC-10 | Propuesto IA | Dada configuración privada, cuando valida credenciales, retención y flag, entonces aplica identidad individual, revoca demo y sesiones al rotar/retirar credencial, purga sin tráfico antes de 31 días y falla cerrado | Negativo/borde | Aceptado | — |

## 12. Escenarios De Prueba

| ID | AC cubiertos | Tipo | Precondición | Pasos | Resultado esperado | Datos | Nivel | Origen | Estado PO |
|---|---|---|---|---|---|---|---|---|---|
| ESC-01 | AC-01 | Positivo | Módulo privado local habilitado | Manual → revisar → confirmar → reiniciar API → consultar | Un tour y detalle idéntico | DS-01 | API/e2e/UAT | Propuesto IA | Aceptado |
| ESC-02 | AC-02 | Borde | Store vacío | Foto etiquetada/ilegible/timeout → revisar o manual | Sin escritura en preview; fallback disponible | DS-02 | Unit/API/UAT | Propuesto IA | Aceptado |
| ESC-03 | AC-03 | Negativo | Borrador válido base | Cambiar fecha/nombre/horas; probar cruce | Error específico, store sin cambios | DS-03 | Unit/API | Propuesto IA | Aceptado |
| ESC-04 | AC-04 | Concurrencia | Captura válida | Dos POST idénticos; mismo ID con otro payload; reintento de red | Uno creado; 409 distinto; borrador retenido | DS-04 | API/UI | Propuesto IA | Aceptado |
| ESC-05 | AC-05 | Negativo | Cuentas privadas sintéticas por dos salas | Probar preview/crear/lista/detalle como ajeno/header falso/demo; trasladar rep | Sin PII; rep trasladado sin histórico; jefe original/admin conservan alcance | DS-05 | API | Propuesto IA | Aceptado |
| ESC-06 | AC-06 | Regresión | Un tour privado y uno anónimo | Consultar tours/contexto/directorio; intentar reset/mutaciones abiertas; apagar flag | Proyección sin PII y operaciones privadas protegidas aun con flag apagado | DS-05 | API | Propuesto IA | Aceptado |
| ESC-07 | AC-07 | Regresión | Fecha demo y operativa distintas | Crear desde Calendario → agenda → resultado de otro tour | Tour en fecha correcta; resultados intactos | DS-06 | UI/e2e/UAT | Propuesto IA | Aceptado |
| ESC-08 | AC-08 | Accesibilidad | Formularios con error | Navegar por teclado a tres tamaños y claro/oscuro | Etiquetas/foco/CTA visibles; 44 px/16 px/contraste | DS-07 | DOM/UAT | Propuesto IA | Aceptado |
| ESC-09 | AC-09 | Borde | OCR pendiente y campo corregido | Completar lectura tardía; expirar sesión; cambiar usuario | No pisa dato corregido; foto/borrador limpiados al salir | DS-08 | Unit/UI | Propuesto IA | Aceptado |
| ESC-10 | AC-10 | Seguridad/datos | Reloj y configuración controlados | Flag off; archivo inválido; sesión demo; rotar/retirar credencial; simular purga diaria sin tráfico | Falla cerrado; sesión revocada; PII/hash personal eliminados antes de 31 días, tour anónimo conservado | DS-09 | Unit/API | Propuesto IA | Aceptado |

## 13. Datos De Prueba

Todos los datos son **Simulado IA**. Contraseñas de fixtures se generan solo en memoria/directorio temporal; nunca se usan credenciales reales.

| ID | Descripción | Origen | Registros | Por qué aplica | Validado PO | Comentario PO |
|---|---|---|---|---|---|---|
| DS-01 | Pareja válida | Simulado IA | 1 tour | BR-01/02/06, AC-01 | Si | — |
| DS-02 | Surveys sintéticos y OCR controlado | Simulado IA | 4 imágenes/estados | BR-03, AC-02 | Si | — |
| DS-03 | Validaciones y empalme | Simulado IA | 5 variantes | BR-01/02, AC-03 | Si | — |
| DS-04 | Reintentos/concurrencia | Simulado IA | 3 envíos, 1 resultado esperado | BR-04, AC-04 | Si | — |
| DS-05 | Roles y superficies públicas | Simulado IA | 2 salas, 5 cuentas, 2 tours | BR-05, AC-05/06 | Si | — |
| DS-06 | Fechas y resultado previo | Simulado IA | 2 fechas, 2 tours | BR-06, AC-07 | Si | — |
| DS-07 | Viewports y temas | Simulado IA | 3 anchos × 2 temas | AC-08 | Si | — |
| DS-08 | Estado en tránsito | Simulado IA | 3 secuencias | BR-07, AC-09 | Si | — |
| DS-09 | Configuración/retención | Simulado IA | 7 variantes | BR-07, AC-10 | Si | — |

### Valores de los Sets

| Set | Valores concretos |
|---|---|
| DS-01 | Ana Demo / Luis Demo; 2026-11-09, 10:30–11:30; Sala Demo; language es; intereses []; notas vacías; contacto null; source manual; reviewConfirmed true; requestId UUID generado |
| DS-02 | JPEG/PNG de documento marcado DEMO con etiquetas Nombre/Idioma; segunda persona ilegible queda vacía; imagen borrosa; stub timeout >20 s; motor ausente. Nunca foto de visitante real |
| DS-03 | Nombre vacío; nombre de 81 caracteres; fecha 2026-02-30; inicio 11:30/fin 10:30; tour existente 10:00–11:00 que cruza con 10:30–11:30 |
| DS-04 | Dos requests con UUID idéntico y payload DS-01; tercero mismo UUID y fin 12:00; respuesta de red perdida después de persistir |
| DS-05 | rep_a/jefe_a en sala_a, rep_b/jefe_b en sala_b, admin_private; tour de rep_a privado y lead anónimo histórico; actor de header admin sin sesión; sesión demo antigua; traslado autorizado rep_a a sala_b; flag apagado después de crear |
| DS-06 | Fecha demo 2026-11-06; fecha operativa fijada a 2026-11-09 America/Cancun; tour anterior con resultado ficticio y nuevo pendiente sin resultado |
| DS-07 | 360×800, 390×844, 1440×1000; claro/oscuro; teclado, foco y nombre faltante; sección opcional cerrada |
| DS-08 | OCR solicitud A tarda; persona corrige a Ana Demo Revisada; cancela/cambia a borrador B; sesión expira o entra rep_b |
| DS-09 | enabled=0; private sin archivo; hashes individuales temporales; cookie demo; rotación y retiro de credencial con cookies previas; registros de 29/30 días y cadencia diaria simulada sin tráfico; tombstone esperado sin hash personal |

## 14. Mapa De Cobertura

| AC | Escenarios | Datos | Estado |
|---|---|---|---|
| AC-01 | ESC-01 | DS-01 | Cubierto en plan, no ejecutado |
| AC-02 | ESC-02 | DS-02 | Cubierto en plan, no ejecutado |
| AC-03 | ESC-03 | DS-03 | Cubierto en plan, no ejecutado |
| AC-04 | ESC-04 | DS-04 | Cubierto en plan, no ejecutado |
| AC-05 | ESC-05 | DS-05 | Cubierto en plan, no ejecutado |
| AC-06 | ESC-06 | DS-05 | Cubierto en plan, no ejecutado |
| AC-07 | ESC-07 | DS-06 | Cubierto en plan, no ejecutado |
| AC-08 | ESC-08 | DS-07 | Cubierto en plan, no ejecutado |
| AC-09 | ESC-09 | DS-08 | Cubierto en plan, no ejecutado |
| AC-10 | ESC-10 | DS-09 | Cubierto en plan, no ejecutado |

## 15. Requisitos No Funcionales

| ID | Atributo | Requisito propuesto |
|---|---|---|
| NFR-01 | Accesibilidad | Controles ≥44 px, campos ≥16 px, contraste normal ≥4.5:1 y foco/errores vinculados |
| NFR-02 | Rendimiento | OCR ≤20 s total, fuera del bloqueo de agenda |
| NFR-03 | Privacidad | Foto/OCR bruto no persistidos; 30 días de PII con máximo efectivo 31 por purga diaria sin tráfico; sin hash personal postpurga ni PII en URL/logs/proyecciones públicas |
| NFR-04 | Seguridad | Sesión privada y revocación por versión al rotar/retirar credencial; hashing con sal; fail-closed, guardas compartidas incluso flag off, no-store y origen validado |
| NFR-05 | Consistencia | Escritura atómica, requestId idempotente y empalmes bajo bloqueo |

## 16. Seguridad, Privacidad Y Casos Borde

Datos privados: nombres, contacto opcional, intereses y notas declarados. No ingresos, identificadores oficiales ni inferencias de persona. El servidor verifica propietario/sala original e ignora autoridad falsa de headers. Pruebas cubren vacío, límites, simultaneidad, vencimiento, sin red y foto corrupta. Errores indican corrección sin repetir datos privados; la UI distingue lectura sugerida de valor revisado. Cámara es opcional. Datos privados no se habilitan en demo pública por presentar pantallas en Stitch.

## 17. Puntos Abiertos

| ID | Tipo | Categoría | Pregunta o supuesto | Recomendación IA | Impacto | Bloquea | Para quién | Respuesta/decisión | Estado |
|---|---|---|---|---|---|---|---|---|---|
| Q-01 | Pregunta | Aprobación | Aprobación CP2 v1 e historia con AC/DS | Aprobar antes de código | Contrato | Sí | Roger | «Apruebo v1; implementar», conversación 2026-11-10 | Respondida |
| Q-02 | Supuesto | Operación/datos | Retención 30 días y America/Cancun | Incluidas explícitamente en aprobación v1 | Datos/fechas | Sí | Roger | Aprobadas junto al contrato el 2026-11-10 | Validado |
| Q-03 | Diferida | Calidad OCR | ¿Qué formatos reales deben medirse? | Primera versión con etiquetas explícitas y fallback; corpus representativo sin PII para medir después | Precisión no acreditada | No para v1 limitada | PO/QA | No prometer manuscritos universales | Diferida |
| Q-04 | Diferida | Activación | Credenciales privadas y configuración de backups/store verificadas | Provisionar por canal seguro antes de activar datos reales | Acceso o retención indebidos | No | Operación/PO | No bloquea código tras Q-01/02; sí es gate obligatorio de activación privada | Diferida |

## 18. Dependencias Y Riesgos

| Tipo | Descripción | Mitigación | Responsable |
|---|---|---|---|
| Gate | Contrato todavía propuesto | Aprobación citable y verify-story | PO |
| Dependencia | OCR local puede no existir/leer manuscritos | Capacidad, timeout y manual | Backend/QA |
| Riesgo | Tablero abierto y datos privados | Colección separada + proyección + auth real | Backend |
| Riesgo | Fecha demo y operativa distintas | Capabilities y pruebas por modo | Frontend |
| Riesgo | Despliegue/reset afecta datos existentes | Store temporal, no live reset, respaldo y flags | Operación |

## 19. Estrategia De Pruebas TDD

| Escenario | Prueba prevista | Nivel | Fixture |
|---|---|---|---|
| ESC-01/03/04 | `e2e-tour-registration.mjs` y validadores | API/unit | DS-01/03/04 |
| ESC-02 | `test_survey_preview.py` | Unit/API | DS-02 |
| ESC-05/06/10 | `test_tour_registration.py`, API e2e | Seguridad/datos | DS-05/09 |
| ESC-07/08/09 | `tour-registration.mjs`, `tour-registration-ui.mjs`, UAT | UI/unit/manual | DS-06/07/08 |

Son archivos propuestos. CP3 detalla pares RED/GREEN y regresiones existentes. No pruebas remotas con reset; no evidencia de ejecución todavía.

## 20. Documentación A Producir

- [ ] Guía Nuevo tour y límites del OCR/borrador.
- [ ] Contrato API, esquema privado y ADR de autenticación/separación.
- [ ] Runbook de flags, provisión por stdin, retención y recuperación.
- [ ] CP4 con pruebas ejecutadas y CP5 con entrega verificada.

## 21. Carril Recomendado

- **Carril:** Contrato CP0–CP5.
- **Razón:** frontend/backend/datos, APIs nuevas, permisos y autenticación.
- **Estimación gruesa:** M/L; no calendario comprometido sin revisar activación y corpus.
- **Siguiente paso:** ejecutar verify-story y comenzar los pares TDD de CP3.

## 22. Aprobación Del Product Owner

**Decision del PO:** Aprobada
**Aprobado por:** Roger (PO)
**Fecha de aprobacion:** 2026-11-10
**Evidencia de aprobacion:** «Apruebo v1; implementar» — respuesta del usuario en la conversación a la aprobación explícita del contrato v1, 2026-11-10.
**Versión aprobada:** v1

## 23. Revisiones

| Versión | Fecha | Cambio | Motivo |
|---|---|---|---|
| v1 | 2026-11-08 | Expediente propuesto, AC/escenarios/datos y puntos abiertos | Solicitud de nuevo módulo y alcance app confirmado |

## 24. Estimación Para Cotización

No solicitada. Esta historia pertenece al carril Contrato, no Descubrimiento. No se inventan horas ni precio. Inventario para estimación posterior: módulo UI, API/parseo, auth privada, datos/retención, pruebas y operación detallados en CP3. Reestimar si cambia proveedor OCR, persistencia de fotos, edición posterior o alcance CRM.
