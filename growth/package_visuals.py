"""Build a lightweight image kit without runtime state or duplicate web assets."""
import hashlib
import json
from pathlib import Path
import zipfile

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'growth/site/assets/scenarios'
FEATURE = ROOT / 'work/features/2026-11-07-ai-vsl'
GENERATION = ROOT / 'work/features/2026-11-07-room-scenarios'
OUTPUT = ROOT / 'growth/dist/salesacademy-escenarios-ia-v5.zip'


def main():
    payloads = {}
    for folder, destination in [('screens', '01-capturas-reales'),
                                ('compositions', '02-escenarios'),
                                ('scenes', '03-fotos-ilustrativas')]:
        for path in sorted((ASSETS / folder).iterdir()):
            if path.is_file() and path.suffix in {'.png', '.webp'}:
                payloads[f'{destination}/{path.name}'] = path.read_bytes()
    payloads['prompts-fotografias.json'] = (GENERATION / 'image-prompts.json').read_bytes()
    payloads['LEEME.md'] = '''# Sales Academy · Pantallas y escenas de uso

15 capturas reales de https://salesacademy.softvibes.art/ (7 de noviembre de 2026),
6 composiciones de agentes IA de 1600×1000 y 3 fotografías ilustrativas generadas.

01-capturas-reales conserva los PNG originales, con datos de ejemplo de la demo.
02-escenarios combina esas pantallas con fotografías, diálogos ficticios y preguntas
propuestas al agente IA. No representa respuestas obtenidas de un sistema operativo.
03-fotos-ilustrativas contiene versiones WebP de fotos generadas con image_gen;
no son fotografías de clientes ni evidencia de una implementación real.
Los prompts de generación están incluidos. Los originales PNG de las fotos,
análisis completo, web, CMS y evidencia viven en salesacademy-ai-vsl-v5.zip.

La jornada ficticia: 08:45 intención; 09:10 preparación; 10:10 descubrimiento;
12:20 práctica de objeción; 15:30 coaching; 16:30 siguiente aprendizaje.
Las horas y los personajes Ana/Jorge/Elena/Diego pertenecen al relato; los valores
de las pantallas no fueron alterados ni representan resultados de esas personas.

Vista local (requiere el servidor activo):
http://agentes.localhost:4190/growth-assets/scenarios/index.html

Cada archivo visual se puede abrir por separado. El manifiesto contiene su SHA256.
'''.encode()
    entries = [{'path': name, 'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest()}
               for name, data in payloads.items()]
    payloads['manifest.json'] = json.dumps({'files': entries}, ensure_ascii=False, indent=2).encode()
    OUTPUT.parent.mkdir(exist_ok=True)
    with zipfile.ZipFile(OUTPUT, 'w', compression=zipfile.ZIP_DEFLATED) as archive:
        for name, data in payloads.items():
            archive.writestr(name, data)
    with zipfile.ZipFile(OUTPUT) as archive:
        assert archive.testzip() is None
        for entry in entries:
            assert hashlib.sha256(archive.read(entry['path'])).hexdigest() == entry['sha256']
    result = {'archive': OUTPUT.name, 'files': len(payloads), 'bytes': OUTPUT.stat().st_size,
              'sha256': hashlib.sha256(OUTPUT.read_bytes()).hexdigest(), 'verified': True}
    (FEATURE / 'evidence/visual-kit.json').write_text(json.dumps(result, indent=2) + '\n')
    print(json.dumps(result, indent=2))


if __name__ == '__main__':
    main()
