"""Validate source artifacts; this is a narrow artifact check, not a penetration test."""
import ast
import json
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT.parent))
from jinja2 import Environment, FileSystemLoader
from growth.server.content import validate_document


def main():
    problems = []
    seed = json.loads((ROOT / 'content/seed.json').read_text())
    validate_document(seed)
    environment = Environment(loader=FileSystemLoader(ROOT / 'site/templates'), autoescape=True)
    for name in environment.list_templates():
        environment.get_template(name)
    source_files = []
    for folder in ('server', 'site', 'content'):
        for path in (ROOT / folder).rglob('*'):
            if not path.is_file() or '__pycache__' in path.parts:
                continue
            source_files.append(path)
            if path.suffix == '.py':
                ast.parse(path.read_text())
            if path.suffix.lower() in {'.sqlite', '.db', '.pem', '.key'} or path.name.startswith('.env'):
                problems.append(f'Archivo privado dentro de código: {path.relative_to(ROOT)}')
            if path.suffix in {'.py', '.mjs', '.html', '.json', '.md', '.css'}:
                content = path.read_text()
                if re.search(r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|sk-[A-Za-z0-9]{24,}|ghp_[A-Za-z0-9]{30,}', content):
                    problems.append(f'Patrón de secreto: {path.relative_to(ROOT)}')
    for path in (ROOT / 'site/templates').glob('*.html'):
        # Only complete literal attribute URLs can be resolved statically.
        # Jinja macro paths are verified after rendering by browser tests.
        urls = re.findall(r'''(?:src|href|poster)\s*=\s*["'](/growth-assets/[^"']+)["']''', path.read_text())
        for url in urls:
            if '{{' in url or '{%' in url:
                continue
            asset = url.removeprefix('/growth-assets/')
            if not (ROOT / 'site/assets' / asset).is_file():
                problems.append(f'Asset faltante: {asset}')
    api = json.loads((ROOT / 'openapi.json').read_text())
    if not api.get('openapi', '').startswith('3.') or not api.get('paths'):
        problems.append('OpenAPI sin versión/rutas')
    print(json.dumps({'ok': not problems, 'sourceFiles': len(source_files),
                      'resources': len(seed['resources']), 'apiPaths': len(api['paths']),
                      'problems': problems}, ensure_ascii=False, indent=2))
    return int(bool(problems))


if __name__ == '__main__':
    raise SystemExit(main())
