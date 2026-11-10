# Perfil público de Sales Academy

Implementación CP2 aprobada en `work/features/2026-11-07-sales-advisor/cp2-spec.md`. El asesor prepara solicitudes de demo para WhatsApp de Chris; no usa calendario ni envía mensajes.

## Contrato privado

- `GET http://127.0.0.1:18642/health`: salud del proceso y nombre de perfil; no consume inferencia.
- `POST http://127.0.0.1:18642/chat`: Bearer privado; JSON `{messages:[{role,content}]}`. Solo `system` inicial e historial `user/assistant`, terminando en `user`; hasta 41 mensajes y 128 KiB.
- Respuesta `{reply}`; texto de hasta 6000 caracteres. Errores sanitizados `{error:{code,message}}`; estados 400/401/413/415/429/503/504.
- Cada solicitud ejecuta un proceso nuevo de Hermes con límite duro de 32 segundos. Máximo dos procesos; una iteración y 1200 tokens de salida por inferencia. Backend limita además cuota diaria/sesión.

## Aislamiento comprobado

El perfil permanente `sales-academy-advisor` contiene identidad/configuración, sin memoria conversacional. El transporte copia exclusivamente `config.yaml`, `SOUL.md` y `.no-bundled-skills` a un directorio temporal único, lo asigna como `HERMES_HOME` del subprocess y lo elimina tras respuesta, error o timeout. Así la inicialización interna de Hermes tampoco conserva cache/DB entre visitantes.

`AIAgent` se instancia con herramientas vacías, memoria/contexto de proyecto/background review deshabilitados, sin SessionDB ni trayectorias. El perfil físico no cambia durante conversación. El servicio corre como `sa-advisor`, no puede leer `/root`, usa `ProtectSystem=strict`, `ProtectHome=true`, `PrivateTmp=true`, límites de memoria y procesos.

El Python original de Hermes apunta dentro de `/root`; se copió solo la distribución estándar CPython 3.11 a `/opt/salesacademy-advisor/python`, con venv propio y dependencias compartidas de solo lectura. No se modificaron permisos de `/root` ni el intérprete de los servicios existentes.

## Credenciales, solo VPS

El modelo y proveedor seleccionados existentes eran `gpt-6-astra` / `openai-codex`. El helper root `refresh_provider.py` usa la resolución y refresh oficial de Hermes, manteniendo el auth store autoritativo y sus bloqueos. Exporta solo access token, base URL, modo, proveedor y modelo a `/etc/salesacademy-advisor/provider.json` (`root:sa-advisor`, 0640). No clona refresh tokens, historial, `.env`, herramientas ni configuración del perfil administrativo. Un timer actualiza este mínimo cada cinco minutos; los valores nunca salen del VPS.

El token privado del bridge se comparte únicamente entre `/etc/salesacademy-advisor/bridge.env` y `/etc/salesacademy-advisor/client.env`, ambos root 0600. El cliente contiene `ADVISOR_ENABLED=1`, `ADVISOR_HERMES_URL` y `ADVISOR_HERMES_KEY`. Cloud V5 debe cargarlo mediante `EnvironmentFile`, sin mostrar ni copiar su contenido. Los valores nunca se incluyen en paquetes, pruebas o documentación.

## Operación

Archivos de servicio: `salesacademy-advisor.service`, `salesacademy-advisor-credential.service` y `salesacademy-advisor-credential.timer`. `provision.py` crea únicamente estos componentes y el usuario/directorios nuevos; no cambia configuración/modelo/default del Hermes existente.

`verify_bridge.py` se ejecuta en el VPS: prueba autenticación, rechazo de roles, dos inferencias sintéticas independientes, limpieza de temporales, permisos, separación de memoria y salud de los servicios anteriores. No llama WhatsApp ni usa clientes reales.

Rollback: deshabilitar el widget V5 mediante su configuración o restaurar su release anterior y detener únicamente `salesacademy-advisor.service` y `salesacademy-advisor-credential.timer` cuando no haya peticiones. Conservar los datos de prospectos del backend. El gateway y Copiloto anteriores no requieren cambios.

## Evidencia

`python3 -m unittest growth.tests.test_advisor_bridge -v`: 8/8 aprobados. RED funcional inicial por ausencia del bridge y RED adicional de export mínimo/aislamiento; GREEN registrado en `work/features/2026-11-07-sales-advisor/evidence/bridge-green.txt`.

Smoke real final: dos respuestas HTTP 200 (9.10 s y 6.33 s), sin clave 401, rol no permitido 400. La segunda conversación no conoció el marcador sintético de la primera y no afirmó cita confirmada. Perfil permanente sin modificaciones, sin `state.db`, cero temporales después, acceso a root rechazado, servicios existentes activos. Fuente: `evidence/advisor-isolation.json`.

Excepción TDD: el provisionador y unidades son configuración operativa puntual; se validaron mediante sintaxis, salud, permisos, hashes y pruebas reales en VPS. La lógica de transporte, mínimos de credencial, timeout y aislamiento sí tienen pruebas previas RED → GREEN.

## Respuestas breves y contenido contextual

El incremento advisor-rich-07 pide al perfil 30–65 palabras, una idea y como máximo una pregunta útil. El servidor limita la vista a 90 palabras y conserva el original en un detalle desplegable si hace falta. El historial usado por el modelo no se recorta por esta presentación.

El siguiente paso se calcula con un catálogo del servidor y datos declarados por el visitante. Las acciones pueden continuar la conversación o abrir el formulario de demo sin inferencia. Videos y guías se resuelven contra la publicación actual del CMS y el catálogo audiovisual autorizado; el modelo no genera controles ni rutas ejecutables. No cambia el funcionamiento de solicitudes, consentimiento o WhatsApp.

La identidad se actualiza en /var/lib/salesacademy-advisor/.hermes/profiles/sales-academy-advisor/SOUL.md y /opt/salesacademy-advisor/SOUL.md preservando propietarios y modos. Evidencia, revisión y reversión: work/features/2026-11-07-advisor-rich-experience/.
