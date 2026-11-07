# Sales Academy · landing, mediahub y CMS

Implementación local aprobada por Roger el 7 de noviembre de 2026: «si lo apruebo contruye lis artefactis». [Contrato y evidencia](../work/features/2026-11-07-growth-mediahub/README.md).

## Abrir la entrega

Con el servidor iniciado:

- [Nueva landing v5 · agentes de IA + VSL](http://agentes.localhost:4190/descubre/)
- [Escenarios con IA v5](http://agentes.localhost:4190/growth-assets/scenarios/index.html)
- [Entrega, campaña y evidencia v5](../work/features/2026-11-07-ai-vsl/README.md)
- [CMS actual v5](http://agentes.localhost:4190/cms/)

- [Un día en la sala · escenas y 15 capturas v4](http://simulacion.localhost:4189/growth-assets/scenarios/index.html)
- [Landing actual con casos de uso](http://simulacion.localhost:4189/descubre/)
- [Guía editable en el mediahub](http://simulacion.localhost:4189/mediahub/un-dia-en-la-sala/)
- [CMS de la nueva demo](http://simulacion.localhost:4189/cms/)
- [Imágenes, análisis y evidencia v4](../work/features/2026-11-07-room-scenarios/README.md)
- [Recorrido cinematográfico v3](http://salesacademy.localhost:4188/descubre/)
- [Análisis visual](http://salesacademy.localhost:4188/descubre/analisis/)
- [Diagnóstico de seis preguntas](http://salesacademy.localhost:4188/descubre/diagnostico/)
- [Mediahub con películas](http://salesacademy.localhost:4188/mediahub/)
- [CMS privado](http://salesacademy.localhost:4188/cms/)
- [Comparar la v2 conservada](http://localhost:4187/descubre/)
- [Comparar la v1 conservada](http://127.0.0.1:4186/descubre/)
- [Videos, recorrido y entrega v3](../work/features/2026-11-07-cinematic-journey/README.md)
- [Análisis y estrategia](../work/features/2026-11-07-growth-mediahub/analisis.md)

La portada operativa, `/ops/`, `/copiloto/` y `/api/` siguen siendo responsabilidad del producto existente. Este módulo no las sirve ni modifica. No se ha desplegado en el dominio público.

La v5 preparada en esta sesión usa `/private/tmp/salesacademy-growth-v5`. Su acceso individual está en [el archivo privado local](/private/tmp/salesacademy-growth-v5-access.txt). Para volver a iniciarla mientras exista el entorno temporal:

```sh
GROWTH_PYTHON=/private/tmp/salesacademy-growth-venv/bin/python SA_GROWTH_DATA_ROOT=/private/tmp/salesacademy-growth-v5 bash growth/start-local.sh serve --port 4190 --enable-local-contact
```

La v1 se sirve desde una copia aislada en `/private/tmp/salesacademy-v1-preserved-20261107/salesacademy-growth`, con sus datos previos en `/private/tmp/salesacademy-growth-preview`. La v2 se conserva en `/private/tmp/salesacademy-v2-preserved-20261107/salesacademy-growth`, con datos en `/private/tmp/salesacademy-growth-v2`. Se usa `salesacademy.localhost` para v3, `localhost` para v2 y `127.0.0.1` para v1 para mantener separadas las sesiones del navegador. Las tres direcciones resuelven a la máquina local; también se puede abrir v3 en `http://127.0.0.1:4188/`, compartiendo entonces el ámbito de cookies con v1.

La v3 también se sirve desde una copia preservada en `/private/tmp/salesacademy-v3-preserved-20261107/salesacademy-growth`; conserva sus datos anteriores y host. V4 se conserva en `/private/tmp/salesacademy-v4-preserved-20261107/salesacademy-growth` con su estado anterior y host `simulacion.localhost`. V5 usa `agentes.localhost` y puerto4190 para separar su sesión de navegador.

Para conservarla fuera de los temporales del sistema, sigue la instalación de abajo y restaura un respaldo en el directorio persistente elegido. `python growth/package_delivery.py` genera `salesacademy-ai-vsl-v5.zip` y su manifiesto SHA-256 sin sobrescribir los ZIP anteriores. Incluye código, videos, capturas, fotos ilustrativas, composiciones y documentación; no incluye cuentas ni datos privados.

## Instalación local

Python 3.11 o posterior; verificado con Python 3.14.7. Ejecuta desde la raíz de SalesAcademyVibes:

```sh
python3 -m venv growth/.venv
growth/.venv/bin/python -m pip install -r growth/requirements.txt
bash growth/start-local.sh bootstrap --username roger
bash growth/start-local.sh serve --enable-local-contact
```

La contraseña se solicita en una entrada oculta, tiene al menos 12 caracteres y nunca forma parte de una URL, comando ni archivo del proyecto. No hay contraseña predeterminada. `bootstrap` crea una cuenta individual owner; las demás se administran desde el CMS. Para recuperar acceso local: `bash growth/start-local.sh recover --username roger`; revoca sus sesiones.

El servidor escucha exclusivamente en `127.0.0.1:4186`. Los datos privados se guardan en `~/Library/Application Support/SalesAcademyGrowth`. Puedes usar otro directorio con `SA_GROWTH_DATA_ROOT` y otro Python con `GROWTH_PYTHON`. No pongas datos dentro de `growth/`. La opción `--enable-local-contact` habilita pruebas de solicitudes con correos sintéticos, por ejemplo `prueba@example.invalid`. Sin ella el formulario queda deshabilitado.

## Operación editorial

1. Inicia sesión y edita el texto de la landing o un recurso. El editor incluye párrafos, títulos, listas y tablas.
2. Guarda el borrador y abre su vista previa privada. No cambia la página pública.
3. Sube medios reales y completa título, alternativa accesible, origen, derechos y revisión. Un medio pendiente no puede publicarse.
4. El owner publica una revisión completa. El editor puede preparar contenido, sin administrar usuarios ni publicar.
5. Para recuperar contenido, elige una publicación del historial: vuelve al borrador. Revísala y publícala expresamente.

Dos personas guardando la misma revisión reciben un conflicto explícito; el navegador conserva el trabajo sin guardar. Los recursos se archivan y los slugs publicados permanecen estables. Los originales subidos a Medios requieren sesión; solo sus derivados referenciados por la publicación activa son públicos.

Para las cinco películas incluidas, edita un recurso de formato Video y elige «Video de la colección». Puedes cambiar título, contexto, portada y asociación; guarda, revisa la vista previa y publica. No combines un clip local con un enlace externo. Estas películas son activos públicos curados del paquete: archivar el recurso retira su aparición editorial, pero no hace privado su archivo. El módulo Medios sigue admitiendo imágenes/PDF; no simula una subida general de MP4. Los videos incluyen subtítulos automáticos revisados editorialmente, transcripción y controles nativos; no se descargan automáticamente al entrar.

Las solicitudes voluntarias quedan en la bandeja del owner con estado. No se envían correos ni se conectan servicios externos. El consentimiento para novedades está separado y desmarcado. Las métricas muestran eventos almacenados, sin prometer conversiones ni ventas. El diagnóstico se calcula en el navegador, sin subir respuestas; la medición opcional solo se activa con permiso y puede retirarse.

## Respaldo y restauración

```sh
bash growth/start-local.sh backup --destination /ruta/privada/backups
bash growth/start-local.sh verify-backup --snapshot /ruta/privada/backups/snapshot-id
SA_GROWTH_DATA_ROOT=/ruta/privada/restaurado bash growth/start-local.sh restore-backup --snapshot /ruta/privada/backups/snapshot-id
```

El primer comando devuelve la ruta exacta de la copia. Se verifican SQLite, hashes y referencias multimedia. La restauración exige un destino vacío y no cambia el servidor activo. Para cambiar de copia: detén el servidor, verifica el respaldo, restaura en otro directorio y arranca señalando ese directorio. Conserva el anterior hasta comprobar la recuperación. Los respaldos contienen solicitudes de contacto y deben guardarse en almacenamiento privado con permisos restringidos y su propia política de eliminación.

`bash growth/start-local.sh purge-expired` aplica la retención: solicitudes sin actividad durante más de 90 días; eventos y auditoría de más de 30 días; sesiones y límites de tasa expirados. Devuelve solo cantidades. Este comando debe programarse diariamente en el entorno de operación; la vista local no instala tareas del sistema. No elimina usuarios, publicaciones ni recursos. Para una solicitud individual de eliminación, el operador debe atenderla antes de habilitar captación real; esta v1 no incluye un portal de autoservicio.

## Comprobaciones

```sh
growth/.venv/bin/python -m unittest discover -s growth/tests -p 'test_*.py' -v
node --test growth/tests/diagnostic.test.mjs growth/tests/journey.test.mjs
growth/.venv/bin/python growth/verify_artifacts.py
```

Para pruebas reales de navegador (Node.js 20 o posterior, verificado con 24.15): instala las dependencias de desarrollo con `npm --prefix growth ci` y `cd growth && npx playwright install chromium`. Después, desde la raíz, ejecuta `growth/.venv/bin/python growth/tests/run_e2e.py`. El runner crea datos y usuarios sintéticos temporales, inicia un puerto local libre y elimina esos datos al terminar. Admite `GROWTH_PLAYWRIGHT_MODULE` para reutilizar Playwright y `GROWTH_EVIDENCE_DIR` para separar resultados. `--audit` comprueba teclado, reflujo equivalente a zoom 200% y presupuesto; `--cinematic` comprueba scroll, marcha atrás, modos de movimiento y reproducción. `growth/.venv/bin/python growth/tests/run_video_cms.py` valida edición/publicación de clips, restauración anterior y errores de reproducción. La evidencia observada de v3 vive en [CP4](../work/features/2026-11-07-cinematic-journey/cp4-validation.md).

## Alcance y publicación posterior

Incluye tres recursos escritos descargables en Markdown, cinco películas con contexto/subtítulos/transcripciones, doce piezas planificadas y cinco correos borrador en `content/`. Se analizaron seis archivos audiovisuales; dos eran idénticos y se integró una copia. Los videos presentan visión conceptual; las capturas de Roadmap, Recursos y Agenda provienen de la demo real y están rotuladas como ejemplo. La ruta de tres salas es una propuesta de implantación, no un piloto desplegado ni con resultados medidos. La nueva instancia v3 incluye estos recursos iniciales sin sustituir el contenido editado de v2.

El contenido inicial es original y local. La captación pública permanece deshabilitada por defecto: antes de publicar hay que completar responsable y canal de privacidad, revisar el contenido editorial y configurar HTTPS, servidor WSGI, permisos del directorio privado y respaldo. [Guía de despliegue posterior](deploy/README.md). No se necesita ningún servicio de pago para esta entrega.
