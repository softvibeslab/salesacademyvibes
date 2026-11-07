# Revisión visual final · recorrido continuo

**Fecha:** 2026-11-07. **Resultado:** composición lista para la entrega local. Fuentes de esta revisión: Chromium real en `http://localhost:4188/descubre/`, capturas y geometría renderizada. No sustituye las pruebas funcionales ni la auditoría de accesibilidad registradas por separado.

## Decisiones aplicadas

- El hero forma parte de un recorrido de cinco capítulos. Un mismo teléfono permanece en escena y cambia de encuadre, profundidad e interfaz al avanzar. El scroll es nativo y las acciones permanecen en el flujo HTML.
- La cámara se mantiene en la mitad derecha. Las variaciones de escala, elevación, rotación y separación de los teléfonos secundarios producen continuidad sin atravesar la columna de lectura.
- Las escenas conceptuales de los videos funcionan como atmósfera desenfocada; las capturas reales de la app tienen el foco visual. Las películas completas aparecen después, con reproducción voluntaria y su contexto editorial.
- Cada caso de uso incluye explicación, ejemplo y una figura real de Roadmap, Recursos o Agenda. Móvil y modo sin movimiento muestran el recorrido secuencial completo.
- La galería presenta cinco películas en escritorio y una fila con scroll horizontal nativo en móvil. La siguiente película queda parcialmente visible para indicar continuidad. Tiene foco explícito y acceso por teclado.

## Verificación ejecutada

Se inspeccionaron las cinco composiciones a 1440×1000, el inicio y secciones interiores a 390×844 y la galería en ambos tamaños. Se revisó la geometría a 980×1000 —umbral mínimo de composición animada— y 1440×1000.

Se tomaron 24 observaciones nominalmente 100 ms y 1300 ms después de cambiar posición: inicio, método, práctica, equipo, transformación y regreso al inicio, en ambos anchos. Se comparó el borde derecho de la columna de texto con el borde izquierdo de cada teléfono cuya opacidad superaba 1%.

**Resultado final:** separación mínima 46.41 px, cero muestras por debajo de 30 px y cero desbordamientos horizontales. Datos: [composition-final.json](composition-final.json).

Durante la revisión se corrigieron dos problemas de composición: el teléfono inicialmente viajaba de izquierda a derecha y podía cruzar texto durante la transición; un compañero lateral rozaba 8 px la columna a 980 px. La cámara ahora viaja dentro de la mitad derecha y los compañeros se retiran hacia el dispositivo principal, con menor separación en anchos 980–1199 px. Se repitió la comprobación sobre el CSS final.

El cambio de pantalla usa un fundido corto de 160 ms para limitar superposición de texto durante el cambio. Las figuras esenciales y los encabezados no dependen de ese fundido para ser legibles.

## Capturas finales

- [Portada 1440](screenshots/final-desktop-start.png)
- [Método](screenshots/final-desktop-method.png)
- [Práctica](screenshots/final-desktop-practice.png)
- [Equipo](screenshots/final-desktop-coaching.png)
- [Transformación](screenshots/final-desktop-scale.png)
- [Portada móvil 390](screenshots/final-mobile-390.png)

Son capturas estables del estado final. Las imágenes intermedias de pruebas anteriores no se usan como vista principal de entrega.

## Aplicación de epic-design

Se leyó `epic-design/SKILL.md` y las referencias de profundidad, rendimiento y accesibilidad. Se aplicaron escena sticky, capas 0–4, perspectiva moderada y separación entre fondo, producto y texto.

El inspector de assets se ejecutó sobre las tres capturas PNG 390×844 y los cinco pósters WebP 480 px de ancho. Las PNG son interfaces con fondo claro: se conservó. Los pósters son escenas o composiciones intencionalmente oscuras: se conservó su fondo. No se recortaron personas ni se fabricó transparencia.

Se adaptaron las recomendaciones al contrato del producto: Jinja y archivos locales separados, sin CDN/GSAP ni animación infinita, sin ocultar texto esencial y sin animar todas las palabras. El JavaScript de la escena pertenece al módulo implementado y probado por el agente principal. Esta revisión no afirma una tasa de cuadros por segundo ni una medición de rendimiento en producción.

**Archivos de implementación revisados:** `growth/site/templates/landing.html` y `growth/site/assets/cinematic.css`. CSS y plantilla quedan congelados tras esta revisión.
