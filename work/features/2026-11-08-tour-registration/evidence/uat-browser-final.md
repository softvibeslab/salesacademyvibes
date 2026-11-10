# UAT de navegador · 2026-11-10

Ejecutada por el coordinador mediante CUA en Chrome de macOS. App local `http://127.0.0.1:4197/`, API real Python en modo privado, store y credenciales sintéticos fuera del repositorio. No se usaron datos de visitantes reales.

| Flujo observado | Resultado |
|---|---|
| Login privado de Ana | Acceso individual correcto; se rechazó guardar la clave en Chrome |
| Nuevo tour → captura manual → resumen → confirmación → agenda | Una visita sintética, Lead #5425, visible en la fecha elegida, pendiente y sin resultado de venta |
| Formulario a 360×800 y 390×800 | Campos, fecha, inicio/fin y CTA visibles sin desbordamiento horizontal; desplazamiento permite recorrer contenido; contexto opcional cerrado |
| Formulario a 1440×900 | Dos columnas legibles, navegación lateral y acciones accesibles |
| Selector nativo abierto durante más de 15 segundos | Se reprodujo pérdida de archivo antes del fix; con módulos `20261110tour2`, el mismo fixture aparece en vista previa al seleccionar |
| Usar esta foto con OCR ausente en la máquina local | Aviso claro; formulario editable y foto para comparar; ningún tour creado automáticamente |
| Navegación por teclado después de lectura | Tab alcanza Cambiar foto con contorno dorado visible; campos tienen nombres accesibles |

Fixture: `fixtures/survey-demo.png`, exclusivamente datos ficticios. El OCR real instalado en el VPS se comprobó por separado en `ocr-vps-synthetic.json`; no confundir el fallback local con ausencia del motor productivo.

La primera repetición tras el fix cargó módulos de caché anteriores. Se incrementó la versión de índice/imports a `20261110tour2`; después pasó la selección real. El fix y RED→GREEN están en `photo-uat-fix.md`.

Límites: revisión móvil mediante emulación de viewport, no cámara física iOS/Android; no garantiza reconocimiento de manuscritos. Las validaciones de permisos, expiración, conflictos, idempotencia y persistencia tienen evidencia automatizada separada. La consola local mostró 401 previo al login y 404 del Copiloto externo no servido por este arnés; no se observó excepción JavaScript del registro.

## Gate operacional

La aprobación «Crear accesos privados para las cuentas actuales y guardar las claves fuera del sitio» está vigente. UAT anterior y `backup-activation-review.md` revisados antes de activar: permisos 0700/0600, timer activo, respaldos de release solo de código, sin jobs locales de backup del store identificados; política estándar del proveedor con rotación inferior a 30 días. No se alteran backups remotos. El máximo de 31 días aplica al almacén activo; la edad de una copia se cuenta desde su captura. Tras cualquier restauración, ejecutar limpieza de registros antes de reabrir el servicio privado. No se acredita inventario individual de snapshots del proveedor.
