# Sales Academy · Nuevo tour y datos de la pareja

Propuesta de UX para el módulo de registro. No constituye un cambio aprobado de API ni una función ya desplegada.

## Flujo

Hoy / Calendario → Nuevo tour → Foto de survey O Ingresar información → Revisar datos → Confirmar registro → Preparar tour con IA / Meet & Greet.

La foto es una ayuda para transcribir. La persona revisa y corrige antes de confirmar. No inventar valores ilegibles ni convertir una detección incierta en dato confirmado. La imagen ilegible permite retomar la foto o cambiar al formulario conservando lo ya introducido. El registro manual no depende del OCR.

El acceso «Nuevo tour» distingue este flujo del registro de resultados que ya existe después de una visita. No sustituir ese flujo. Mostrar asesor asignado y sala como contexto de la sesión, sin permitir asignaciones fuera de los permisos definidos en una futura implementación.

## Campos propuestos

| Campo | Uso | Regla de diseño |
|---|---|---|
| Nombre de visitante 1 | Identificar el tour en la sala | Obligatorio para confirmar; permite borrador vacío |
| Nombre de visitante 2 | Contexto de la pareja | Opcional; estado «Por completar» |
| Sala | Enrutar el tour | Obligatoria; preselección desde contexto visible y editable |
| Fecha, hora inicio y fin | Agenda y comprobación de empalmes | Obligatorias; prellenadas para revisión; no asumir disponibilidad |
| Idioma preferido | Preparar conversación | Opcional; sin inferir nacionalidad |
| Contacto compartido | Seguimiento posterior | Opcional, en sección desplegable; sin envío automático |
| Intereses y notas | Preparar conversación con IA | Opcionales, chips editables y nota breve |

No pedir ingresos, tarjetas, documentos oficiales, fecha de nacimiento ni domicilio en esta propuesta. No inferir relación legal, género, edad o poder adquisitivo a partir de una foto. El nombre de «pareja» describe a los visitantes del tour; no exige un estado civil.

## Ocho pantallas para el lienzo

1. **TOUR 01 · Nuevo tour · Inicio móvil**. Header Sales Academy, volver a Hoy, título Nuevo tour y subtítulo «Registra los datos de la pareja», dos tarjetas grandes: «Foto del survey» / «Ingresar información». Frase «Empieza como te resulte más fácil. Revisarás todo antes de guardar». Vista compacta de un borrador sintético. Navegación inferior original Home, Roadmap, Copiloto, Recursos, Perfil.
2. **TOUR 02 · Survey · Foto móvil**. Flujo «1 Capturar · 2 Revisar · 3 Confirmar». Preview de documento ilustrativo marcado DEMO / DATOS FICTICIOS, encuadre sin rostros, «Tomar foto», «Elegir imagen», «Volver a tomar», «Usar esta foto». Texto «Procura que se vea completo y sin reflejos». Alternativa «Continuar sin foto». Permiso de cámara denegado lleva a elegir imagen o captura manual, sin bloquear.
3. **TOUR 03 · Survey · Revisión IA móvil**. Mensaje «El agente preparó estos datos. Tú confirmas». Campos editables con origen «Del survey» y marcador «Revisar» en lectura incierta; dato no encontrado queda vacío. Nunca mostrar porcentajes de certeza inventados. Visitante 1 Ana Demo; visitante 2 pendiente. Idioma Español; sala Sala Demo; fecha 9 nov 2026, 10:30–11:30. Thumbnail sintético; CTA Revisar resumen. Estado breve «Leyendo survey…» y cancelación conservando formulario.
4. **TOUR 04 · Pareja · Captura manual móvil**. Secciones Pareja y Datos del tour. Visitante 1 Ana Demo, visitante 2 Luis Demo. Sala Demo, fecha, inicio/fin visibles. «Más contexto (opcional)» despliega idioma, contacto compartido sin valor real, intereses y notas. CTA Revisar resumen y acción Guardar borrador. No cobrar, contactar ni asignar automáticamente.
5. **TOUR 05 · Tour · Resumen móvil**. Tarjetas Pareja, Tour, Preferencias. Enlaces Editar por bloque; ruta de origen Foto de survey o Captura manual. Mostrar «Visitante 2: Por completar» cuando falta. Confirmación humana «Revisé la información del tour». CTA Registrar tour. Indicador de simulación en la cabecera. Variante de conflicto «Ese horario se cruza con otro tour» y Cambiar horario, sin duplicar ni borrar datos.
6. **TOUR 06 · Tour registrado · Siguiente paso móvil**. Estado de éxito de simulación «Tour listo», referencia DEMO-8206, pareja, sala, fecha y horario. Estado Pendiente de iniciar, consistente con datos propuestos. CTA Preparar con mi agente IA; secundario Abrir Meet & Greet; Volver a mis tours. Resumen IA breve únicamente de los datos aportados, sin inventar personalidad ni necesidades. Próxima acción sugerida: confirmar preferencias al iniciar la conversación.
7. **TOUR 07 · Survey · Recuperación móvil**. «No pudimos leer bien el survey». Preview borroso ilustrativo marcado DEMO, motivos legibilidad generales sin datos fabricados, botones Volver a tomar foto y Capturar manualmente. Conserva nombre ya introducido y muestra que no se registró el tour. No dependencia obligatoria de cámara ni IA.
8. **TOUR 08 · Nuevo tour · Revisión escritorio**. Vista 1440 px, panel foto a la izquierda y campos a la derecha, ruta Foto/Manual accesible, navegación de pasos y bloque final de revisión. Sidebar/contexto de sala y horario; sin transformar el módulo en CRM genérico. Mismos campos, error, procedencia y CTA que móvil.

## Identidad

Tomar como referencia la app importada `app__01-today-mobile.png`, `app__06-tour-preparation-mobile.png` y `app__16-meet-greet-retouched.png`. Fondo blanco cálido #f7f7f5, tinta #20211e, bordes arena, oro fuerte #806000 y CTA con texto blanco de buen contraste; acento puntual #f4bd3f con texto oscuro. App funcional sans-serif Arial/Helvetica, títulos de 24–28 px, cuerpos y controles 16 px; botones mínimo 44 px. Interfaces claras, una columna en móvil de 390 px, radio 14–18 px, espaciado generoso. No usar parallax ni animación decorativa dentro del formulario. La portada editorial oscura no es la UI de captura.

Mantener los textos de las acciones cortos, etiquetas persistentes y errors junto al campo; no depender solo del color. CTA inferior visible con espacio para navegación y teclado. Progreso anunciable y foco lógico. En escritorio, usar el ancho para comparar fuente/datos. Todas las pantallas nuevas llevan una etiqueta discreta «Prototipo · Datos de ejemplo».

## Revisión de formulario (form-cro)

| Hallazgo | Impacto esperado, sin métricas inventadas | Ajuste | Prioridad |
|---|---|---|---|
| Mezclar foto, identidad y agenda en una pantalla larga | Aumenta carga de lectura | Elegir entrada y converger en revisión común | Alta |
| Forzar contacto al registrar el tour | Interrumpe operación cuando aún no se conoce | Contacto opcional y posterior | Alta |
| OCR incierto presentado como hecho | Produce registros erróneos | Origen y estados Revisar / No encontrado, edición humana | Alta |
| Error borra información | Obliga a recapturar | Preservar borrador y ofrecer ruta manual | Alta |
| Calendario sin revisar empalmes | Puede duplicar reservas | Resumen de horario y estado de conflicto diseñado; ejecución requiere backend aprobado | Alta |

CTAs considerados: «Registrar tour» (confirma el registro, elegido al final), «Revisar resumen» (avanza sin guardar, elegido en captura), «Guardar borrador» (permite interrumpir, acción secundaria). No usar «Enviar» para una operación interna.

## Errores propuestos

- Nombre vacío: «Escribe el nombre del visitante 1 para confirmar».
- Hora fin anterior al inicio: «La hora de fin debe ser después del inicio».
- Lectura incierta: «Revisa este dato antes de continuar».
- Imagen ilegible: «No pudimos leer bien el survey. Puedes tomar otra foto o capturar la información».
- Conflicto: «Ese horario se cruza con otro tour. Revisa la agenda o cambia el horario».
- Error de guardado (futura implementación): «No se pudo registrar. Tu información sigue aquí; intenta de nuevo».

## Hipótesis de UX para validación futura

Comparar foto/manual con tiempo hasta resumen y correcciones por campo; comparar sección opcional cerrada/abierta con abandono por paso; comprobar en móvil que revisión y CTA son operables con teclado. No atribuir resultados observados a estas hipótesis: son propuestas para cuando exista implementación funcional.
