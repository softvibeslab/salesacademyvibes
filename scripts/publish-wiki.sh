#!/usr/bin/env bash
# Push docs/wiki/ to the GitHub wiki. GitHub creates that git repo only after
# the first page is saved in the browser:
# https://github.com/softvibeslab/salesacademyvibes/wiki
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/docs/wiki"
DEST="$(mktemp -d "${TMPDIR:-/tmp}/salesacademy-wiki.XXXX")"
cleanup() { rm -rf "$DEST"; }
trap cleanup EXIT

if ! git ls-remote https://github.com/softvibeslab/salesacademyvibes.wiki.git >/dev/null 2>&1; then
  echo "El wiki git todavía no existe. Abre https://github.com/softvibeslab/salesacademyvibes/wiki, guarda la primera página (Home) y vuelve a correr este script." >&2
  exit 1
fi

git clone --depth 1 https://github.com/softvibeslab/salesacademyvibes.wiki.git "$DEST"
rsync -a --delete --exclude .git "$SRC/" "$DEST/"
git -C "$DEST" add -A
if git -C "$DEST" diff --cached --quiet; then
  echo "Wiki al día."
  exit 0
fi
git -C "$DEST" commit -m "Update Sales Academy wiki."
git -C "$DEST" push origin HEAD
echo "Wiki publicado: https://github.com/softvibeslab/salesacademyvibes/wiki"
