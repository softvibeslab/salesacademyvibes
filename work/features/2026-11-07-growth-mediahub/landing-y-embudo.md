# Sales Academy · Landing, embudo y mediahub

Fecha: 7 de noviembre de 2026. Estado: **PROPUESTA para CP2; no implementada ni publicada**. Todo contenido nuevo, diagnóstico, automatización y flujo editorial de este documento es propuesto. No hay envíos configurados.

## 1. Recomendación y evidencia

Construir una entrada B2B para líderes de salas de ventas de clubes vacacionales. El recorrido comienza con un recurso útil, permite identificar una prioridad sin entregar datos personales y ofrece una demostración por decisión del visitante. “Embudo invisible” significa una experiencia natural de aprendizaje y decisión; la finalidad comercial, el contacto y cualquier consentimiento permanecen visibles.

La propuesta conecta tres necesidades: coordinar el día, practicar con un método aprobado y revisar evidencia. La implementación para tres salas se presenta como alcance a definir y verificar, no como caso de éxito ya ejecutado. El resultado comercial buscado es una conversación calificada sobre un piloto; no un registro forzado ni una promesa de ventas.

Fuentes leídas:

| Fuente local en SalesAcademyVibes | Qué demuestra | Límite |
|---|---|---|
| `docs/ficha-ejecutiva.md`, `docs/status.md`, corte 7 Nov | Existe recorrido de demo plataforma→tablero; se reporta prueba local y live previa | Esta tarea no reejecutó la prueba ni verificó producción |
| `docs/stack-y-api.md` | HTML/CSS/JS y API Python; semilla Norte/Sur; encabezado de rol | Son dos salas de ejemplo; encabezado no autentica |
| `docs/privacidad.md` | Datos de demo; métricas de Home y Perfil no son ventas | No reutilizar como evidencia comercial |
| `vcsAcademyMobile/work/stories/2026-11-06-piloto-3-salas.md` | Historia PILOTO-3S-001, EN REVISION, tres instancias aisladas y uso web móvil | PO pendiente; excluye integración tours/CRM, LLM externo y reporte consolidado |
| `investment/calculadora-semilla/PROYECCION_INGRESOS.md` | Escenario financiero anterior con tres salas de pago al cierre | Proyección, no despliegue ni aceptación comercial |
| `sitios/marcas/sales-academy.json` | Nicho clubes vacacionales; método y coaching; tinta, oro, marfil | Propuestas anteriores contienen metas y datos pendientes |
| `investment/pitch-sales-academy/landing.template.html` | Base del mismo producto, recorrido contextual, brief local y FAQ | Precios, plazos y alcance anteriores son propuestas, no condiciones vigentes |
| `sitios/plantilla/assets/propuesta.js` y `core.js` | Patrones de contenido separado y cálculos explicitados como hipótesis | No convierten una simulación en resultado medido |

No se localizaron en la lectura datos de tráfico, conversión, clientes de pago o comparación controlada de resultados. No se afirma que las tres salas estén implementadas. No se extrapolan cifras de otro cliente.

Distinción necesaria: el piloto de tres salas documentado en `vcsAcademyMobile` busca Training Roadmap, Smart GoalSheet, roleplay y Smart Agent con contenido por sala; propone una instancia separada por sala y excluye integración de tours/CRM y reporte consolidado. La demo de tours del 7 de noviembre pertenece a `prototypes/smart-agenda-mockup/`. La landing puede mostrar ambas líneas con sus etiquetas, pero no debe presentarlas como un único sistema productivo ya conectado ni ampliar tácitamente el piloto.

## 2. Posicionamiento

**Comprador propuesto:** dirección comercial o responsable de varias salas. **Usuario influyente:** jefe de sala. **Beneficiario:** representante. Es una segmentación por responsabilidad y necesidad, no por capacidad de pagar ni características personales.

**Trabajo que busca resolver:** que el método de ventas esté presente antes y después de cada tour y que el líder conozca qué acompañar. Esta formulación se infiere del producto documentado; necesita validación con el PO y usuarios.

**Oferta de entrada propuesta:** recursos abiertos y diagnóstico orientativo de seis preguntas. **Oferta siguiente:** demostración del recorrido actual con datos de ejemplo y preparación del alcance de un piloto. **Oferta posterior:** implementación cotizada por alcance después de validar requisitos y acceso real. No se publican precios históricos como vigentes.

**Qué comunicar hoy:** coordinación de tours demostrable, entrenamiento y recursos presentes como demo, posibilidad de definir un despliegue supervisado. **Qué necesita prueba antes de prometerse:** acceso seguro de producción, aislamiento real por organización, integración con sistemas de tours, persistencia de aprendizaje, mejora de conversión, ahorro, retorno de inversión y operación de tres salas.

## 3. Análisis de conversión

### Mejoras directas

1. Separar entrada comercial de la app. Un visitante nuevo necesita entender para quién es y qué puede evaluar antes de llegar a un selector de rol. Mantener acceso a la plataforma como enlace secundario.
2. Mostrar una sola acción principal: **Diagnosticar mi sala**. Inicia el diagnóstico abierto. El recurso editorial que origine la visita puede aparecer antes, pero no se añade un segundo formulario.
3. Usar prueba de producto: un recorrido con datos de ejemplo. No hay testimonios ni resultados medidos suficientes para una franja de “éxitos”.
4. Explicar qué recibirá el visitante: una prioridad, una plantilla y una opción de conversar. Pedir contacto sólo cuando lo solicite.
5. Distinguir capacidades demostrables y alcance de implementación. La claridad evita que una demo se interprete como plataforma productiva contratada.

### Cambios de mayor impacto

| Cambio propuesto | Por qué | Evidencia de resultado futura |
|---|---|---|
| Recurso→diagnóstico→recomendación contextual | Reduce fricción y demuestra conocimiento antes del contacto | Resultados mostrados / diagnósticos iniciados |
| Mediahub filtrable por necesidad y rol | Ayuda a elegir contenido relevante | Recursos abiertos por categoría y siguientes pasos elegidos |
| CMS con revisión y separación público/interno | Evita que borradores o contenido de salas llegue al público | Pruebas de autorización y publicación; errores editoriales registrados |
| Ruta propuesta para tres salas con criterio de avance por fase | Facilita una compra con alcance verificable | Pilotos que llegan a revisión de aceptación / pilotos iniciados |

### Hipótesis para probar

| Hipótesis | Variante | Medida | Condición |
|---|---|---|---|
| “Preparar cada tour” conecta mejor que un mensaje de plataforma | Titular centrado en preparación vs coordinación | Diagnósticos completados por visita elegible | Probar sólo cuando exista volumen suficiente; no declarar ganador con pocos casos |
| Una plantilla antes del diagnóstico aumenta confianza | Recurso primero vs diagnóstico primero | Solicitudes calificadas por visita | Mantener mismo público y periodo comparable |
| Mostrar una demostración breve reduce dudas de implementación | Recorrido visible vs acceso tras resultados | Solicitudes de demo que se presentan | Definir muestra/periodo antes de observar resultados |

## 4. Landing: texto propuesto por sección

Dirección visual: adaptar las fuentes existentes del propio producto. Tinta, marfil y acento dorado; tipografía legible; una demostración de producto como pieza central. El inventario final determina componentes concretos. No usar fotografías de otros clientes ni interfaces ficticias presentadas como actuales.

### Navegación

Marca: **Sales Academy**. Enlaces discretos: **Cómo funciona**, **Recursos**, **Ver la demo**. Botón principal: **Diagnosticar mi sala**.

### Hero

Antetítulo: **ENTRENAMIENTO Y OPERACIÓN PARA SALAS DE VENTAS**

Titular recomendado para la campaña de tres salas: **Un plan simple para entrenar en 3 salas de ventas.**

Subtítulo: **Lleva el método aprobado a la práctica del representante y al acompañamiento del líder. Empieza por identificar qué necesita tu operación.**

CTA: **Diagnosticar mi sala**.

Microcopy: **6 preguntas. Recomendación orientativa al momento. Sin registro.**

Apoyo junto al visual: **Explora el recorrido de Sales Academy con datos de ejemplo. La implementación en tres salas se define y valida por etapas.**

Anotación: el titular editorial final describe el alcance del plan solicitado, no tres clientes o salas ya activas. Para una campaña más amplia, usar la alternativa “Tu sala de ventas, preparada para cada tour”. No publicar una duración del diagnóstico hasta medirla con usuarios.

### Sección: el problema que se reconoce

Título: **El método necesita llegar al momento de vender.**

Texto: **Coordinar tours, preparar al equipo y revisar lo que pasó suelen ser conversaciones distintas. Sales Academy propone conectarlas para que cada persona sepa qué sigue.**

- **Antes del tour:** una asignación clara y una habilidad que practicar.
- **Durante el día:** acceso al método y a los recursos aprobados.
- **Después:** una revisión concreta para decidir el siguiente acompañamiento.

Anotación: se presenta una hipótesis del problema y un enfoque, sin afirmar que se hayan medido pérdidas o fallas en la empresa visitante.

### Sección: prueba de producto

Título: **Mira lo que ya puedes explorar.**

Texto: **En la demostración, el jefe asigna un tour y el representante lo ve en su agenda. Desde la plataforma también puede explorar el roadmap y los recursos de entrenamiento.**

Tarjetas:

- **Agenda del representante.** El día y sus tours en una misma vista.
- **Tablero de sala.** Asignación y seguimiento del recorrido de ejemplo.
- **Recursos y método.** Un punto de entrada para repasar y preparar la práctica.

Enlace secundario: **Explorar la demo**.

Nota visible: **Demostración con datos de ejemplo. El acceso seguro y las integraciones se validan antes de operar con datos reales.**

Anotación: no mostrar gráficos con ventas inventadas. Si hay capturas de Home/Perfil con cifras de ejemplo, recortarlas o etiquetarlas de manera visible; preferir agenda sin valores comerciales.

### Sección: tres salas

Título: **Tres salas. Un método compartido. Un arranque por etapas.**

Texto: **La historia del piloto plantea un entorno aislado por sala para usar el método, los recursos y el seguimiento de entrenamiento desde el celular. Proponemos validar la primera sala antes de repetir el proceso en la segunda y la tercera.**

1. **Sala A · Establecer.** Responsables, materiales aprobados, accesos y línea base.
2. **Sala B · Replicar.** Repetir el recorrido y revisar qué necesita adaptación.
3. **Sala C · Consolidar.** Revisar manualmente con las mismas definiciones y acordar la operación continua.

Apoyo: **El orden, las fechas y el alcance se acuerdan con tu equipo. Estas etapas son una propuesta, no un despliegue ya completado. La integración de tours y los reportes conjuntos requieren un alcance adicional.**

CTA principal repetido: **Diagnosticar mi sala**.

### Sección: mediahub

Título: **Una herramienta útil para tu próxima conversación de sala.**

Texto: **Explora guías breves para preparar un tour, acompañar una habilidad y organizar un piloto. Puedes leerlas sin dejar tus datos.**

Tarjetas iniciales:

- **Antes del próximo tour.** Una hoja para elegir objetivo, práctica y revisión. Acción: **Abrir la hoja**.
- **Coaching con una acción concreta.** Una guía para pasar de una observación a un acuerdo. Acción: **Leer la guía**.
- **Cómo empezar en tres salas.** Una matriz para ordenar responsabilidades y criterios de avance. Acción: **Ver la matriz**.

### Sección: después del diagnóstico

Título: **Sal con una prioridad, no con otra lista interminable.**

Texto: **Tus respuestas señalan dónde empezar: coordinación, práctica o evidencia. Recibes un recurso relacionado y puedes revisar una demostración si quieres evaluar el proyecto con tu equipo.**

### Preguntas frecuentes

**¿Es una academia, una app o una implementación?**

Sales Academy conecta entrenamiento y operación de sala. Hoy puedes explorar una demostración de la plataforma y el tablero. La configuración del método, los accesos y el alcance de una implementación se acuerdan por separado.

**¿El diagnóstico evalúa a mis vendedores?**

No. Es una autoevaluación del proceso de la sala. No pide nombres de representantes, datos de clientes ni resultados individuales. Su recomendación es orientativa.

**¿Tengo que dejar mis datos para ver el resultado?**

No. La propuesta muestra el resultado y el recurso en la misma sesión. El contacto es opcional y tiene una finalidad explícita.

**¿Las tres salas ya están operando con esta implementación?**

Existe una historia de implementación en tres salas que sigue en revisión. Propone un entorno separado por sala para el entrenamiento. La demostración disponible no acredita tres salas reales en operación.

**¿Garantiza más cierres?**

No se promete un incremento de ventas. Un piloto debe acordar primero las definiciones, la línea base y cómo se revisarán los resultados.

**¿Se conecta con mi sistema actual?**

La integración se revisa con el proveedor, sus accesos y el contrato de datos. No se presenta como una conexión activa sin una prueba del recorrido.

### Cierre

Título: **Empieza por el siguiente paso de tu sala.**

Texto: **Responde seis preguntas y recibe una herramienta para trabajar con tu equipo. Después decides si quieres explorar una demostración.**

CTA: **Diagnosticar mi sala**.

Pie: **Sales Academy · Entrenamiento y operación de sala.** Enlaces: recursos, acceso a la plataforma, privacidad y contacto. Los destinos finales se configuran en la implementación aprobada.

### Metadatos propuestos

Title: **Sales Academy | Entrenamiento y operación de sala**

Description: **Conoce Sales Academy: recursos abiertos, diagnóstico orientativo y una propuesta para conectar entrenamiento, tours y revisión del líder en tus salas de ventas.**

No añadir calificaciones, testimonios o marcado de productos con precios sin evidencia vigente y aprobación.

### Alternativas y evaluación de titulares

Se ejecutó `headline_scorer.py` sobre cinco opciones preliminares; el titular final cambia «coordinar» por «entrenar» tras contrastar el alcance del piloto y no fue puntuado por ese script. La herramienta usa vocabulario en inglés; no mide claridad real en español ni predice conversión. Se conservan las variantes sin añadir promesas para subir el puntaje.

| Titular | Puntaje heurístico | Uso |
|---|---:|---|
| Un plan simple para coordinar 3 salas de ventas | 61/100 | Campaña del alcance solicitado; requiere contexto de propuesta |
| Tu sala de ventas, preparada para cada tour | 30/100 | Variante general orientada al beneficio; validar con usuarios |
| Entrena con un método. Coordina cada tour. | 30/100 | Variante centrada en acciones |
| Del entrenamiento a la operación de tu sala | 30/100 | Variante de categoría |
| Una misma forma de preparar cada tour | 30/100 | Variante de consistencia |

En las cinco: longitud 100/100 y claridad léxica 100/100; emoción 0/100. La primera obtiene número 100, especificidad 34 y palabras de poder 45 por “simple”; las demás 0 en esos apartados. No usar estos números como evidencia de negocio.

Alternativas CTA: **Diagnosticar mi sala** (resultado), **Revisar mi operación** (intención), **Hacer el diagnóstico** (claridad funcional). Primaria v1: Diagnosticar mi sala; complemento accesible explica que son seis preguntas.

## 5. Recorrido del embudo propuesto

| Etapa | Experiencia | Siguiente paso | Qué recibe el visitante |
|---|---|---|---|
| Descubrimiento | Pieza de contenido compartida por canales aprobados | Recurso del mediahub | Una herramienta completa |
| Identificación | CTA contextual al final del recurso | Diagnóstico abierto | Reconoce una prioridad de su proceso |
| Valor | Resultado inmediato, reglas visibles | Recurso recomendado | Acción concreta sin pedir contacto |
| Consideración | Demo voluntaria y explicación de alcance | Solicitud de conversación | Qué se revisará y cómo se responderá |
| Conversación | Revisión humana con contexto consentido | Alcance de piloto | Responsables, límites y evidencia acordados |
| Decisión | Propuesta de implementación | Piloto supervisado | Criterios para continuar, ajustar o detener |

No bloquear recursos por correo; no usar contadores ficticios, avisos de ventas falsas, casillas preseleccionadas ni mensajes que finjan un diagnóstico humano. No enviar correos por haber descargado un recurso. No describir formularios locales como solicitudes recibidas.

### Formulario opcional de conversación

Contrato v1 de CP2: correo de contacto obligatorio; rol (dirección/líder/representante/otro), número de salas (1/2/3/4+) y necesidad (coordinación/práctica/coaching/piloto). Sin nombre, organización, teléfono ni texto libre. Consentimiento para responder obligatorio y novedades opcionales desmarcadas. La bandeja privada del CMS debe recibir la solicitud antes de habilitar captación pública.

Botón: **Solicitar una demo**. Texto: **Usaremos estos datos para responder sobre Sales Academy. No confirma una cita ni una contratación.** Preferencia independiente y desmarcada: **Quiero recibir la serie de cinco recursos por correo.** No se condiciona la solicitud al consentimiento de marketing.

Éxito sólo tras confirmación del servidor: **Recibimos tu solicitud. Te responderemos al correo que indicaste.** No prometer un plazo sin responsable y SLA acordados. Fallo: **No pudimos enviar tu solicitud. Tus datos siguen aquí para reintentar.** No registrar una conversión de solicitud en caso de error.

## 6. Diagnóstico abierto propuesto

Propósito: priorizar trabajo de proceso, no certificar desempeño. Se responde sin nombres ni información de clientes. Respuestas en memoria de la sesión, sin transmisión por defecto. No bloquear resultados por registro. “No lo sé” se distingue visualmente de “No existe”, aunque ambas valen cero para la orientación.

Cada pregunta se responde **No existe (0)**, **Existe de forma parcial (1)**, **Está definido y se aplica (2)** o **No lo sé (0)**.

| ID | Dimensión | Pregunta |
|---|---|---|
| Q1 | Coordinación | ¿Cada tour tiene un responsable y un horario que el representante puede consultar? |
| Q2 | Coordinación | ¿Los cambios de asignación llegan al representante mediante un proceso acordado? |
| Q3 | Práctica | ¿El equipo identifica la versión aprobada del método y dónde consultarla? |
| Q4 | Práctica | ¿La práctica termina con una observación concreta y una siguiente acción? |
| Q5 | Evidencia | ¿Están definidos los estados y resultados que se registran después del tour? |
| Q6 | Evidencia | ¿Las salas usan las mismas definiciones para revisar su operación? |

Algoritmo propuesto: suma por dimensión 0–4; total 0–12. La prioridad es la dimensión con menor suma. En empate, mostrar “Prioridades compartidas” con todas las dimensiones empatadas; el visitante puede elegir por cuál comenzar. No forzar desempate oculto. Si todo es 4, proponer documentar una línea base y revisar condiciones del piloto. Si hay respuestas “No lo sé”, agregarlas como “Por confirmar” sin suponer que el proceso no existe.

Bandas de orientación:

- 0–4: **Acordar lo esencial.** Documenta responsables, método y definiciones antes de automatizar.
- 5–8: **Hacer consistente la rutina.** Elige la dimensión con menos evidencia y prueba una acción con el equipo.
- 9–12: **Preparar un piloto medible.** Define alcance, accesos y línea base; el puntaje no acredita preparación técnica o seguridad.

Resultado siempre muestra respuestas, puntajes por dimensión, regla utilizada, prioridad y recurso. “Volver a responder” limpia sólo el estado del diagnóstico. CTA opcional: **Explorar una demo para mi equipo**.

| Caso simulado | Respuestas Q1–Q6 | Total | Salida esperada |
|---|---|---:|---|
| Base inicial | 0,0,1,0,1,0 | 2 | Acordar lo esencial; coordinación 0, práctica 1, evidencia 1 |
| Proceso parcial | 2,1,2,1,0,1 | 7 | Hacer consistente la rutina; evidencia 1 |
| Todos definidos | 2,2,2,2,2,2 | 12 | Preparar piloto medible; documentar línea base, sin certificación |
| Desconocido | seis “No lo sé” | 0 | Todas por confirmar; empate en tres dimensiones |
| Incompleto | Falta Q4 | — | No calcular; identificar pregunta sin respuesta y conservar resto |

## 7. Mediahub y operación editorial propuestos

Tres pilares: **Coordinar la sala** (operación), **Practicar una habilidad** (entrenamiento) y **Decidir con evidencia** (piloto). Filtros: necesidad, rol y formato. La selección por rol modifica recomendaciones de lectura; no concede acceso a documentos internos.

Tarjeta: título, resumen, tipo de recurso, audiencia, fecha de revisión y etiqueta de estado cuando proceda. Detalle: resumen, contenido, pasos aplicables, autor responsable, versión, fuentes autorizadas y recurso relacionado. Recurso abierto completo antes de CTA. No construir una biblioteca con tarjetas vacías ni descargas inexistentes.

Campos editoriales propuestos: `title`, `slug`, `summary`, `body`, `format`, `pillar`, `audience`, `status`, `visibility`, `author`, `reviewer`, `source_refs`, `rights_status`, `version`, `reviewed_at`, `published_at`, `seo_title`, `seo_description`, `cover_alt`, `related_ids`, `cta_type`.

Estados v1 según CP2: borrador → en revisión → publicado → archivado. Guardar no publica. Dos roles: editor prepara y owner revisa/publica. La revisión se registra como acción del owner; no se crea un tercer rol implícito. Contenido interno nunca aparece en búsqueda, API pública, feed, sitemap ni archivos públicos. Revertir a una versión anterior requiere historial, vista previa y confirmación del cambio editorial. El CMS debe guardar contenido en el servidor; almacenamiento sólo en navegador sería un editor demo, no la entrega productiva.

Primera carga: tres recursos originales siguientes, revisados antes de publicación. Vídeo/audio en v1 solo mediante enlaces HTTPS permitidos según CP2, sin carga audiovisual; los videos existentes pasan por inventario de derechos y revisión; no asumir autorización sólo por aparecer en una biblioteca local. Evitar subir grabaciones o transcripciones de clientes al CMS público.

### Calendario editorial inicial

Las etiquetas de búsqueda son hipótesis de intención, **sin volumen ni dificultad verificados**. “Buscable candidato” no afirma demanda de búsqueda medida. La distribución se propone para canales que el responsable confirme.

| # | Semana | Pieza | Pilar/rol | Formato e intención | Búsqueda candidata / canal | Paso siguiente |
|---|---:|---|---|---|---|---|
| 1 | 1 | Antes del próximo tour | Práctica / rep | Hoja completa; compartible | preparación de tour / enlace de equipo | Diagnóstico de proceso |
| 2 | 1 | Coaching con una acción concreta | Práctica / líder | Guía; buscable candidata y compartible | coaching de ventas / LinkedIn | Hoja de preparación |
| 3 | 1 | Cómo empezar en tres salas | Evidencia / dirección | Matriz; compartible | piloto salas de ventas / conversación B2B | Diagnóstico |
| 4 | 2 | Cómo comunicar un cambio de asignación | Coordinación / líder | Checklist; buscable candidata | asignación de tours / mediahub | Demo tablero |
| 5 | 2 | Una objeción, una práctica, una corrección | Práctica / rep | Guion original de práctica | práctica objeciones ventas / video corto aprobado | Recurso 2 |
| 6 | 2 | Qué puede demostrar una demo de sala | Evidencia / dirección | Recorrido grabado con datos ejemplo | demo Sales Academy / LinkedIn | Solicitud voluntaria |
| 7 | 3 | Qué debe saber el representante antes del tour | Coordinación / rep | Checklist | preparación representante / mediahub | Recurso 1 |
| 8 | 3 | Una sola versión del método para el equipo | Práctica / líder | Guía de gobierno editorial | método de ventas / LinkedIn | Matriz de responsables |
| 9 | 3 | Por qué dos salas pueden medir distinto | Evidencia / dirección | Explicación con datos simulados | métricas salas ventas / mediahub | Recurso 3 |
| 10 | 4 | Del tour a la siguiente práctica | Práctica / líder | Caso didáctico explícitamente simulado | entrenamiento post tour / video aprobado | Diagnóstico |
| 11 | 4 | Los acuerdos antes de conectar un proveedor | Coordinación / dirección | Lista de preparación | integración plataforma tours / mediahub | Alcance de piloto |
| 12 | 4 | Cuándo ampliar un piloto a otra sala | Evidencia / dirección | Guía de decisión | escalar piloto ventas / conversación B2B | Solicitud voluntaria |

Responsables propuestos: PO valida afirmaciones y material; editor prepara; owner revisa y publica manualmente tras aprobación; comercial atiende contactos consentidos. Cadencia propuesta: tres piezas por semana durante cuatro semanas después de aprobar el contenido. No existe un compromiso de publicación ni campaña activa.

Enlaces internos: piezas 1,2,5,8,10 → pilar práctica; 4,7,11 → coordinación; 3,6,9,12 → evidencia. Cada pilar enlaza al diagnóstico, cada resultado a su recurso y cada recurso relacionado conserva una sola acción contextual.

## 8. Recurso inicial 1 · Antes del próximo tour

**Formato:** hoja de preparación original. **Para:** representante y líder. **Estado:** borrador editorial propuesto. No sustituye el método aprobado de la sala.

### Una preparación breve con un objetivo concreto

Antes de entrar al tour, elige una conducta que puedas practicar y observar. “Vender mejor” no te dice qué hacer. “Escuchar la respuesta completa antes de presentar una solución” sí permite preparar y revisar una acción.

1. **Confirma la asignación.** Revisa horario, responsable y canal para avisar un cambio. Usa únicamente la información autorizada de la operación. Esta hoja no necesita datos del visitante.
2. **Elige un paso del método.** Anota el nombre o identificador del paso y la versión del material aprobado. Si no sabes cuál está vigente, resuélvelo con el líder antes de improvisar.
3. **Define una conducta observable.** Completa: “En este tour voy a…”. Usa una acción concreta: preguntar, escuchar, resumir, verificar o explicar con un material aprobado.
4. **Practica una situación.** Con un compañero, plantea una objeción ficticia. El representante pregunta primero, verifica qué entendió y responde dentro de los límites del material autorizado.
5. **Acuerda qué revisar después.** Escoge una señal observable. No conviertas una sola venta o no venta en la evaluación completa de la práctica.

### Hoja para completar

| Campo | Mi preparación |
|---|---|
| Paso del método y versión | |
| Conducta que voy a practicar | |
| Situación ficticia para ensayar | |
| Pregunta que usaré para comprender | |
| Material autorizado que consultaré | |
| Qué observaré al terminar | |
| Qué necesito aclarar con mi líder | |

### Ejemplo simulado

Paso: exploración de necesidades. Conducta: resumir lo que escuché y pedir confirmación. Situación: una persona ficticia dice “Necesito pensarlo”. Pregunta: “¿Qué parte te gustaría revisar con más calma?”. Señal: pude identificar una duda concreta sin suponer cuál era. No se registran nombres, presupuestos ni detalles de una persona real.

### Después del tour

Escribe qué hiciste, qué observaste y qué repetirás o cambiarás. Si algo depende de precios, disponibilidad, condiciones o financiamiento, consulta la fuente autorizada. La práctica no autoriza promesas comerciales.

**Siguiente paso:** si cuesta mantener esta rutina en la sala, utiliza el diagnóstico abierto para elegir por dónde empezar.

## 9. Recurso inicial 2 · Coaching con una acción concreta

**Formato:** guía de conversación original. **Para:** jefe de sala. **Estado:** borrador editorial propuesto.

### De una observación a un acuerdo

Una conversación de coaching resulta más útil cuando termina con una conducta que ambas personas pueden reconocer. Esta guía ayuda a revisar una práctica sin etiquetar al representante ni inferir su intención.

**1. Acordar el foco.** “Vamos a revisar cómo verificaste que entendiste la necesidad”. Elige una habilidad, no todo el tour.

**2. Pedir la versión del representante.** “¿Qué intentaste hacer? ¿Qué parte te resultó difícil?”. Escucha antes de dar instrucciones.

**3. Describir lo observado.** “En el ejercicio respondiste antes de confirmar la duda”. Evita “No escuchas” o “Eres malo para cerrar”. Si no hubo observación directa o registro autorizado, dilo: se está trabajando con el relato del representante.

**4. Comparar con el material aprobado.** Revisen juntos el paso o guion vigente. Aclaren si existe una excepción y quién puede autorizarla.

**5. Repetir una sola situación.** El líder interpreta a una persona ficticia. El representante practica una respuesta. Se repite una vez con una corrección concreta; no se presiona para memorizar una frase fuera de contexto.

**6. Cerrar un acuerdo.** “En la siguiente práctica, antes de responder, resume la duda y confirma si la entendiste”. Define quién revisa, qué observa y cuándo se vuelve a conversar.

### Registro de acuerdo

| Elemento | Qué registrar |
|---|---|
| Habilidad | Una conducta, no una calificación general |
| Evidencia | Observación de una práctica o relato identificado como tal |
| Referencia | Material aprobado y versión |
| Próxima acción | Qué se intentará hacer |
| Revisión | Momento y persona responsable |
| Resultado | Qué se observó en la siguiente práctica |

### Ejemplo simulado

Observación: en un roleplay, la persona respondió “Es la mejor opción” sin preguntar qué faltaba aclarar. Acuerdo: hacer una pregunta abierta y resumir la respuesta antes de presentar información. En la repetición se observa si lo hizo; no se concluye que esto aumentará automáticamente los cierres.

### Criterio de cierre

La sesión termina cuando el representante puede explicar la acción acordada y el líder sabe cómo revisarla. Si ambos salen con interpretaciones distintas, reformulen el acuerdo. La guía no es un instrumento de sanción ni una certificación automática.

**Siguiente paso:** conecta esta conversación con la hoja “Antes del próximo tour”.

## 10. Recurso inicial 3 · Cómo empezar en tres salas

**Formato:** matriz de preparación de piloto. **Para:** dirección y responsables de sala. **Estado:** propuesta original. A, B y C son etiquetas de planificación, no ubicaciones o clientes existentes.

### Primero acuerda qué significa que funcione

Una expansión entre salas necesita criterios comparables. Antes de fijar fechas, define qué recorrido debe funcionar, quién responde por él y qué evidencia autoriza avanzar. Una demostración y un piloto con datos reales requieren condiciones distintas.

### Matriz de preparación

| Acuerdo | Sala A | Sala B | Sala C | Evidencia esperada |
|---|---|---|---|---|
| Responsable de operación | Por definir | Por definir | Por definir | Persona y función acordadas internamente |
| Versión del método | Por validar | Por validar | Por validar | Material aprobado y accesible |
| Training Roadmap, Smart GoalSheet y práctica | Por validar | Por validar | Por validar | Recorrido completo con datos de ejemplo |
| Accesos y límites de consulta | Por validar | Por validar | Por validar | Pruebas positivas y negativas por rol y sala |
| Recursos iniciales | Por revisar | Por revisar | Por revisar | Fuente, derechos y aprobación |
| Línea base | Por acordar | Por acordar | Por acordar | Definición, periodo y responsable del dato |
| Soporte y seguimiento | Por definir | Por definir | Por definir | Canal, horario y responsable |
| Criterio de avance | Por aprobar | Por aprobar | Por aprobar | Decisión escrita y evidencia asociada |

### Etapa A · Establecer

Prueba el recorrido mínimo del piloto de entrenamiento: el representante accede a la instancia de su sala, consulta su Training Roadmap y un recurso aprobado, registra en Smart GoalSheet y completa una práctica; el líder revisa la evidencia permitida. Los datos de ejemplo sirven para verificar funcionamiento; la operación real requiere identidad y permisos comprobados antes de comenzar. La asignación e integración de tours pertenecen a otro alcance. Documenta dudas y límites.

### Etapa B · Replicar

Repite la prueba en otra sala con su propia configuración. Comprueba que una persona no pueda consultar información fuera de su alcance. Registra qué se pudo reutilizar y qué requirió adaptación. No presupongas que la segunda sala usa el mismo proceso sólo por pertenecer a la misma organización.

### Etapa C · Consolidar

Integra la tercera sala cuando los acuerdos y pruebas se cumplan. Usa un diccionario común de estados y resultados. Comparar cifras sin las mismas definiciones puede confundir diferencias del proceso con desempeño.

### Revisión de avance

El responsable de cada sala responde: ¿el recorrido funciona?, ¿las personas pueden acceder sólo a lo que les corresponde?, ¿los materiales están aprobados?, ¿la evidencia está completa?, ¿quién atiende los incidentes? Si una condición necesaria no se cumple, registra el bloqueo y el siguiente paso; no lo marques terminado por tener una pantalla disponible.

### Medición sin promesas

Elige primero métricas de uso y calidad del dato: accesos sobre personas invitadas, uso de Smart GoalSheet, recursos consultados y revisiones completadas, con un denominador y periodo acordados. Para hablar de resultados comerciales se necesitan resultados, montos, moneda, cancelaciones y contexto comparables. Una diferencia entre periodos no prueba por sí sola que la plataforma la causó.

**Siguiente paso:** lleva la matriz a una conversación de alcance. No incluyas datos personales de clientes en el material público.

## 11. Serie de acompañamiento · borradores no enviados

Nombre: **Una rutina de sala, paso a paso**. Entrada: petición explícita de esta serie; descargar o leer no inscribe. Cinco correos en días 0, 3, 7, 12 y 18 desde confirmación. Propósito: ayudar a utilizar recursos y, al final, ofrecer una conversación. No se activa hasta disponer de responsable, destinatarios consentidos, mecanismo de baja y destinos válidos.

Salida inmediata por baja, rebote definitivo, queja, conversación solicitada o instrucción de parar. Si ya hay conversación en curso, suprimir mensajes de venta duplicados. No reingreso automático. No ramificar por apertura de correo; una apertura no acredita lectura.

Todos los correos: firma **Equipo Sales Academy**; enlace funcional **Dejar de recibir esta serie**; explicación breve “Recibes esta serie porque la solicitaste”. `{{first_name}}` es opcional con fallback “Hola”; nunca exigirlo ni mostrar el token sin resolver. Los destinos se expresan como IDs editoriales hasta aprobar rutas.

### Correo 1 · Día 0

Asunto: **Tu hoja para preparar el próximo tour**

Vista previa: Una conducta concreta antes de empezar.

Hola:

Aquí tienes la hoja de preparación que forma parte de la serie de Sales Academy. Puedes empezar por una sola acción: elegir qué conducta quieres practicar antes del siguiente tour.

Anota el paso del método aprobado, plantea una situación ficticia y define qué revisarás al terminar. No necesitas completar una lista larga ni escribir datos de clientes. La hoja funciona mejor cuando el representante y su líder entienden igual el objetivo.

**Abrir la hoja de preparación** → recurso 1.

En el siguiente correo veremos cómo cerrar una conversación de coaching con una acción concreta. Esta serie comparte herramientas; no supone que ya estés usando la plataforma ni que hayas contratado un piloto.

### Correo 2 · Día 3

Asunto: **Una observación que sí se puede practicar**

Vista previa: Cambia una etiqueta general por una acción.

Hola:

“Necesitas escuchar mejor” deja mucho a la interpretación. “Antes de responder, resume la duda y confirma si la entendiste” permite practicar y observar una conducta.

La guía de coaching propone una conversación sencilla: elegir el foco, escuchar al representante, describir lo observado, consultar el material aprobado y acordar la siguiente práctica. Si no observaste el tour, distingue el relato de una evidencia directa.

**Leer la guía de coaching** → recurso 2.

El objetivo no es evaluar a toda la persona a partir de una situación. Es salir con un acuerdo que el representante pueda explicar y que el líder pueda revisar. La siguiente conversación parte de ese mismo acuerdo.

### Correo 3 · Día 7

Asunto: **¿Qué necesita primero tu sala de ventas?**

Vista previa: Seis preguntas para ordenar el siguiente paso.

Hola:

Coordinar tours, practicar con el método y revisar evidencia son necesidades relacionadas. Intentar resolverlas todas a la vez puede volver difícil elegir por dónde empezar.

El diagnóstico de Sales Academy organiza seis preguntas sobre el proceso. Muestra tus respuestas, explica cómo calcula cada dimensión y recomienda un recurso. No evalúa a vendedores ni necesita información de clientes. Si no conoces una respuesta, puedes señalarlo como pendiente de confirmar.

**Diagnosticar mi sala** → diagnóstico abierto.

El resultado es orientativo. Puede ayudarte a preparar una conversación con tu equipo; no certifica que una sala esté lista para producción ni predice cierres de venta.

### Correo 4 · Día 12

Asunto: **Tres salas: los acuerdos antes de ampliar**

Vista previa: Una matriz para revisar responsables y evidencia.

Hola:

Antes de ampliar un piloto conviene saber qué se podrá repetir y qué cambiará en cada sala. El mismo método puede requerir horarios, responsables o materiales distintos.

La matriz de tres salas organiza los acuerdos: responsables, versión del método, recorrido de entrenamiento, permisos, recursos y criterio para avanzar. Las etiquetas A, B y C son de planificación. No representan una implementación ya realizada ni resultados medidos.

**Revisar la matriz de tres salas** → recurso 3.

Empieza por una fila que hoy no tenga responsable. Al resolverla tendrás una conversación concreta para el equipo. No necesitas fijar una fecha de lanzamiento para completar este primer acuerdo.

### Correo 5 · Día 18

Asunto: **¿Revisamos el recorrido con tu equipo?**

Vista previa: Una demostración para conversar sobre el alcance.

Hola:

Con la hoja, la guía de coaching y la matriz ya tienes una base para hablar de una rutina de sala. Si ahora quieres explorar Sales Academy, el siguiente paso puede ser una demostración con datos de ejemplo.

La conversación permite revisar qué recorrido está disponible, qué necesita tu operación y qué condiciones faltan para un piloto. No supone una integración ya activa ni un compromiso de compra. Las fechas y el alcance se acuerdan después de revisar requisitos.

**Solicitar una demo** → formulario opcional.

Este es el último correo de la serie. Puedes seguir consultando los recursos abiertos. No continuaremos con mensajes de esta secuencia si no pides otro acompañamiento.

## 12. Medición propuesta

No hay línea base ni objetivos de negocio validados. Durante el primer ciclo se registran numeradores, denominadores, periodo, canal y calidad de datos; los objetivos se acuerdan después. No presentar “más leads” o “más cierres” como efecto demostrado.

| Señal | Cuándo ocurre | Medida útil |
|---|---|---|
| `resource_viewed` | Recurso completo disponible y abierto | Lecturas por recurso y fuente autorizada |
| `diagnostic_started` | Primera respuesta elegida | Inicios / visitas elegibles |
| `diagnostic_completed` | Seis respuestas válidas y resultado mostrado | Completados / inicios |
| `recommendation_opened` | Visitante abre recurso recomendado | Aperturas / resultados mostrados |
| `demo_requested` | Backend confirma recepción válida | Solicitudes / resultados; deduplicar reintentos |
| `conversation_qualified` | Revisión humana de encaje con el alcance | Calificadas / solicitudes atendidas |
| `pilot_proposed` | Alcance entregado en conversación autorizada | Propuestas / conversaciones calificadas |
| `pilot_accepted` | Aceptación real documentada | Pilotos aceptados / propuestas entregadas |

Los clics en “Solicitar” no equivalen a solicitud recibida, y una solicitud no es una cita confirmada. Los eventos editoriales no contienen correo, nombre, texto libre ni respuestas individuales del diagnóstico. No usar grabación de sesiones o herramientas de terceros por defecto. CP2 define el receptor propio /growth-api/events para eventos de navegación consentidos y demo_requested del servidor. conversation_qualified, pilot_proposed y pilot_accepted son métricas de revisión humana futuras, no endpoints ni automatizaciones de v1. Las tasas usan visitas consentidas y declaran esa limitación.

Correo: entregados, clics únicos por entregado, bajas y solicitudes atribuibles a enlaces; no usar aperturas como KPI principal. Cualquier tasa con denominador cero se muestra “Sin datos”, nunca 0% como resultado real. Criterios de calificación B2B: rol involucrado, necesidad de proceso, número de salas y disposición a revisar alcance; no inferir presupuesto o intención a partir de visitas.

## 13. Validación y pendientes

- Copy revisado contra las fuentes: sin resultados, precios vigentes, testimonios o integración activa inventados.
- Nuevos recursos, diagnóstico, CMS y serie están etiquetados como propuestas; no se afirma que estén implementados.
- Tres salas cuenta con historia EN REVISION y aprobación pendiente; no se describe como implementación existente. Se confirmó la separación entre ese piloto de entrenamiento y la demo de tours.
- El destino de contacto, responsable de respuesta, condiciones comerciales y contenido final se aprueban antes de habilitar captación.
- Métricas, canales y calendario son propuestas; no se configuró analítica, se publicaron páginas ni se enviaron comunicaciones.
- Skills aplicadas: `content-strategy`, `copywriting` y `email-sequence`. Las heurísticas auxiliares no sustituyen revisión en español ni medición real.

Excepcion TDD: documento de estrategia y contenido; no hay código productivo en esta entrega.


### Evidencia de revisión mecánica

Se ejecutaron los auxiliares de las skills sobre estos borradores el 7 de noviembre de 2026:

- `headline_scorer.py --file /private/tmp/sa-headlines.txt --json`: cinco variantes; resultados y limitaciones en sección 4.
- `sequence_analyzer.py --file /private/tmp/sa-sequence.json --json`: **80/100, B**; asuntos, cadencia, extensión, personalización y detección de spam 100 en su heurística. CTA 0 porque sólo reconoce verbos en inglés. La revisión manual confirma una acción editorial por correo; no se añadieron verbos ingleses para manipular el score. Intervalos 3, 4, 5 y 6 días, sin alertas del script. No es evaluación de entregabilidad real ni rendimiento comercial.
- `topic_cluster_mapper.py --file /private/tmp/sa-topics.txt --json`: 12 temas, 8 grupos léxicos; detecta relación de preparación, coaching y expansión. Se consolidaron manualmente en tres pilares por intención. Los slugs generados pierden tildes y **no se adoptan** como contratos de rutas.

No se enviaron correos, no se habilitó captación y no se modificó código productivo.
