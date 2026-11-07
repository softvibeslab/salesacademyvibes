# CP3 · Plan de implementación

Repo Paths: cp2-spec.md ↔ growth/deploy/versions/ ↔ growth/dist/*.zip.

T01-test: comprobar que el release no existe y escribir pruebas de selección segura, traversal y exclusión de privados; observar RED. T01-impl: constructor de release, wrapper HTTPS, manifiesto y configuración aislada; observar GREEN.
T02: índice estático responsive con enlaces explícitos a las cinco versiones y galería. Excepcion TDD: composición HTML/CSS puramente visual; revisión real de enlaces, teclado y geometría después de construir.
T03: subir release mínimo, crear venv, estados privados, cuentas y cinco servicios. Agregar DNS y vhost HTTP, emitir TLS y activar configuración definitiva solo tras nginx -t.
T04: verificar todas las rutas públicas, media, CMS y aislamiento; comprobar .art y .pro; capturas y evidencias sin secretos.
T05: TRUST5, gobernanza estricta, URLs finales y rollback documentado.

No se modifica el código histórico de las cinco versiones. El wrapper adapta únicamente el contexto HTTPS del proxy y la configuración de producción.

## Estado ejecutado

T01–T05 completados: release y servicios publicados, HTTPS validado, índice y CMS comprobados, TRUST5 y gobernanza ejecutados. Las credenciales permanecen privadas en el VPS; su entrega local quedó separada por el rechazo de revisión automática documentado en CP4/CP5.
