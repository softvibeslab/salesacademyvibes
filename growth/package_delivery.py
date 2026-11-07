"""Package reviewed source and evidence; never include runtime data or credentials."""
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
import zipfile

REPO = Path(__file__).resolve().parents[1]
FEATURES = (
    REPO / 'work/features/2026-11-07-growth-mediahub',
    REPO / 'work/features/2026-11-07-growth-visual-v2',
    REPO / 'work/features/2026-11-07-cinematic-journey',
    REPO / 'work/features/2026-11-07-room-scenarios',
    REPO / 'work/features/2026-11-07-ai-vsl',
)
OUTPUT = REPO / 'growth/dist'
EXCLUDED = {'node_modules', '.venv', '__pycache__', 'dist', '.git'}
EXTENSIONS = {'.py', '.sh', '.md', '.json', '.html', '.css', '.mjs', '.cjs', '.svg', '.png', '.txt', '.yml', '.mp4', '.webp', '.vtt', '.jpg'}


def main():
    OUTPUT.mkdir(exist_ok=True)
    sources = []
    for folder in (REPO / 'growth', *FEATURES):
        for path in folder.rglob('*'):
            relative = path.relative_to(REPO)
            if path.is_symlink() or not path.is_file() or set(relative.parts) & EXCLUDED:
                continue
            if path.name in {'e2e-failure.png', 'cinematic-failure.png', 'failure.png'} or '-frame-' in path.name or path.parent.name.endswith('-dense'):
                continue
            if path.suffix in EXTENSIONS or path.name == '.gitignore':
                sources.append(path)
    sources.append(REPO / 'work/stories/2026-11-07-growth-mediahub.md')
    entries = []
    archive_path = OUTPUT / 'salesacademy-ai-vsl-v5.zip'
    with zipfile.ZipFile(archive_path, 'w', compression=zipfile.ZIP_DEFLATED) as archive:
        for path in sorted(sources):
            content = path.read_bytes()
            relative = str(path.relative_to(REPO))
            archive.writestr('salesacademy-growth/' + relative, content)
            entries.append({'path': relative, 'bytes': len(content),
                            'sha256': hashlib.sha256(content).hexdigest()})
    with zipfile.ZipFile(archive_path) as archive:
        if archive.testzip() is not None:
            raise RuntimeError('Archive integrity check failed')
    digest = hashlib.sha256(archive_path.read_bytes()).hexdigest()
    manifest = {'createdAt': datetime.now(timezone.utc).isoformat(), 'archive': archive_path.name,
                'sha256': digest, 'bytes': archive_path.stat().st_size, 'files': entries,
                'containsRuntimeData': False}
    (OUTPUT / 'delivery-manifest-v5.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2))
    print(json.dumps({'archive': str(archive_path), 'files': len(entries),
                      'bytes': archive_path.stat().st_size, 'sha256': digest}, indent=2))


if __name__ == '__main__':
    main()
