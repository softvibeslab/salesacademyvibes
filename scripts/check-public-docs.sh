#!/usr/bin/env bash
# Fail if public docs expose infrastructure details: public IPv4 addresses or
# private key file names. README.md and docs/ are published (GitHub, Pages, wiki).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

TARGETS=(README.md docs)
IPV4='\b([0-9]{1,3}\.){3}[0-9]{1,3}\b'
KEY_NAME='[A-Za-z0-9_.-]*(_ed25519|_rsa|_ecdsa|id_ed25519|id_rsa|\.pem)\b'
# Loopback and documentation-only ranges are fine to mention.
ALLOWED_IP='^(127\.|0\.0\.0\.0|192\.0\.2\.|198\.51\.100\.|203\.0\.113\.)'

found=0
while IFS= read -r line; do
  ip="$(printf '%s\n' "$line" | grep -oE "$IPV4" | grep -vE "$ALLOWED_IP" || true)"
  if [ -n "$ip" ]; then
    echo "IP publica: $line"
    found=1
  fi
done < <(grep -rnE "$IPV4" "${TARGETS[@]}" || true)

while IFS= read -r line; do
  echo "Nombre de llave: $line"
  found=1
done < <(grep -rnE "$KEY_NAME" "${TARGETS[@]}" || true)

if [ "$found" -ne 0 ]; then
  echo "FALLA: la documentacion publica expone detalles de infraestructura." >&2
  exit 1
fi
echo "OK: README.md y docs/ sin IP publica ni nombres de llave."
