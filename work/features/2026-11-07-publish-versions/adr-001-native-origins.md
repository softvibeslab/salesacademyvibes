# ADR-001 · Subdominios y procesos independientes

Estado: aceptado para la publicación autorizada. Las cinco versiones usan rutas absolutas y el mismo namespace Python. Publicarlas bajo prefijos exigiría reescribir HTML, JS y documentos editoriales, además de cookies y redirects.

Se eligen v1..v5.salesacademy.softvibes.cloud con procesos, usuarios de servicio y estado separados. El dominio padre ofrece un índice y alias /vN/. Así el contenido conserva sus hashes y su contrato original sin CORS ni iframes. Coste: seis registros DNS y certificado SAN, cinco workers de memoria moderada. El VPS tiene ~2.45GB disponibles y24GB libres en el chequeo previo.

ProxyFix confía en un salto local y Nginx reemplaza los headers reenviados. El runtime se extrae por lista permitida de ZIPs verificados. Los datos no viajan con el release. Un certificado *.softvibes.cloud no cubre estos subdominios anidados; se emite certificado dedicado con los seis nombres.
