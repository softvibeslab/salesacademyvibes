#!/usr/bin/env bash
set -euo pipefail
GROWTH_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
GROWTH_PYTHON="${GROWTH_PYTHON:-$GROWTH_ROOT/growth/.venv/bin/python}"
GROWTH_DATA="${SA_GROWTH_DATA_ROOT:-$HOME/Library/Application Support/SalesAcademyGrowth}"
if [ ! -x "$GROWTH_PYTHON" ]; then
  echo "Falta el entorno Python. Sigue los dos pasos de instalación en growth/README.md."
  exit 1
fi
cd "$GROWTH_ROOT"
if [ "$#" -eq 0 ]; then set -- serve; fi
exec "$GROWTH_PYTHON" -m growth.server.cli --data-root "$GROWTH_DATA" "$@"
