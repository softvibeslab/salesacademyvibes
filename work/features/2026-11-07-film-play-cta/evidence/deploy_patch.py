"""Apply the reviewed film playback controls to a new release; preserve state."""
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
archive = ops / 'film-play-04.tar.gz'
expected_archive = '23700e42937b255e6722b2e3803e221305c0a2b231160774b80b6240fa71f369'
allowed = {'v5/growth/site/assets/media-player.css', 'v5/growth/site/templates/macros.html', 'v5/growth/site/assets/media-player.mjs'}
digest = lambda path: hashlib.sha256(path.read_bytes()).hexdigest()
if digest(archive) != expected_archive:
    raise SystemExit('Patch archive hash mismatch')
stage = ops / 'film-play-04'
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
    if digest(previous/item['path']) != item['beforeSha256'] or digest(stage/item['path']) != item['sha256']:
        raise SystemExit('Stylesheet baseline or candidate hash mismatch')
release = base/'releases'/patch['name']
if release.exists():
    raise SystemExit('Candidate release already exists')
shutil.copytree(previous, release)
for item in patch['files']:
    shutil.copyfile(stage/item['path'], release/item['path'])
    record = next(x for x in manifest['files'] if x['path'] == item['path'])
    record.update(sha256=item['sha256'], bytes=item['bytes'], previousSha256=item['beforeSha256'], modifiedBy=patch['name'])
manifest.update(parentRelease=previous.name, patch=patch)
(release/'release-manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2, sort_keys=True)+'\n')
for record in manifest['files']:
    if digest(release/record['path']) != record['sha256']:
        raise SystemExit('Candidate release verification failed')


def activate(target):
    link = base/'current-film-play-pending'
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
            with urlopen('http://127.0.0.1:18485/growth-assets/media-player.mjs', timeout=3) as response:
                live = hashlib.sha256(response.read()).hexdigest()
            ready = live == next(x['sha256'] for x in patch['files'] if x['path'].endswith('/media-player.mjs'))
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
(ops/'film-play-deploy.json').write_text(json.dumps(result, indent=2))
print(json.dumps(result, indent=2))
