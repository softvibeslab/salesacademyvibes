"""Apply the reviewed Meet & Greet assets and templates to a new release; preserve state."""
from pathlib import Path
import hashlib
import json
import os
import shutil
import subprocess
import tarfile
import time
from urllib.request import urlopen

base = Path('/srv/salesacademy-cloud')
ops = base / 'operations'
archive = ops / 'meet-greet-03.tar.gz'
expected_archive = 'a2f1ed447bb072bcb9f0095b20254921123e2aaf22a61cc8e167a8be2ca45b5d'
allowed = {'v5/growth/site/assets/scenarios/screens/16-meet-greet-retouched.png', 'v5/growth/site/assets/scenarios/scenarios.css', 'v5/growth/site/assets/ai-journey.css', 'v5/growth/site/assets/scenarios/screens/16-meet-greet-retouched.webp', 'v5/growth/site/assets/scenarios/compositions/02-meet-greet.png', 'v5/growth/site/templates/landing.html', 'v5/growth/site/assets/scenarios/index.html', 'v5/growth/site/assets/scenarios/screens/16-meet-greet-original.png'}
digest = lambda path: hashlib.sha256(path.read_bytes()).hexdigest()
if digest(archive) != expected_archive:
    raise SystemExit('Patch archive hash mismatch')
stage = ops / 'meet-greet-03'
stage.mkdir(mode=0o700)
with tarfile.open(archive, 'r:gz') as bundle:
    bundle.extractall(stage, filter='data')
patch = json.loads((stage/'patch.json').read_text())
if {item['path'] for item in patch['files']} != allowed:
    raise SystemExit('Unexpected patch file selection')
current = base / 'current'
previous = current.resolve()
if previous != base/'releases'/patch['parentRelease']:
    raise SystemExit('Current release changed; inspect before proceeding')
manifest = json.loads((previous/'release-manifest.json').read_text())
for record in manifest['files']:
    if digest(previous/record['path']) != record['sha256']:
        raise SystemExit('Existing release has changed; refusing to replace it')
for item in patch['files']:
    old = previous/item['path']
    baseline_ok = digest(old) == item['beforeSha256'] if item['beforeSha256'] is not None else not old.exists()
    if not baseline_ok or digest(stage/item['path']) != item['sha256']:
        raise SystemExit('Baseline or candidate hash mismatch')
release = base/'releases'/patch['name']
if release.exists():
    raise SystemExit('Candidate release already exists')
shutil.copytree(previous, release)
for item in patch['files']:
    shutil.copyfile(stage/item['path'], release/item['path'])
    record = next((x for x in manifest['files'] if x['path'] == item['path']), None)
    if record is None:
        record = {'path': item['path'], 'sourcePath': item['source'], 'addedBy': patch['name']}
        manifest['files'].append(record)
    record.update(sha256=item['sha256'], bytes=item['bytes'], previousSha256=item['beforeSha256'], modifiedBy=patch['name'])
manifest.update(parentRelease=previous.name, patch=patch)
(release/'release-manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2, sort_keys=True)+'\n')
for record in manifest['files']:
    if digest(release/record['path']) != record['sha256']:
        raise SystemExit('Candidate release verification failed')


def activate(target):
    link = base/'current-meet-greet-pending'
    link.symlink_to(target)
    os.replace(link, current)
    subprocess.run(['systemctl', 'restart', 'salesacademy-cloud@v5.service'], check=True)


if current.resolve() != previous:
    raise SystemExit('Current release changed during preparation')
try:
    activate(release)
    ready = False
    for _ in range(30):
        try:
            with urlopen('http://127.0.0.1:18485/growth-assets/ai-journey.css', timeout=3) as response:
                live = hashlib.sha256(response.read()).hexdigest()
            ready = live == next(x['sha256'] for x in patch['files'] if x['path'].endswith('/ai-journey.css'))
            if ready:
                break
        except OSError:
            pass
        time.sleep(.3)
    if not ready:
        raise RuntimeError('New CSS did not become live')
except Exception:
    activate(previous)
    raise
result = {'previousRelease': str(previous), 'release': str(release), 'changedFiles': sorted(allowed),
          'manifestSha256': digest(release/'release-manifest.json'), 'restart': 'salesacademy-cloud@v5.service',
          'privateStateChanged': False, 'rollback': 'Atomically point current to previousRelease and restart only salesacademy-cloud@v5.service.'}
(ops/'meet-greet-deploy.json').write_text(json.dumps(result, indent=2))
print(json.dumps(result, indent=2))
