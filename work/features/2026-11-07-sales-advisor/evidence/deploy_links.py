"""Align recommended public resource links with the advisor answer."""
from pathlib import Path
import hashlib
import argparse
import json
import os
import shutil
import subprocess
import tarfile
import time
from urllib.request import urlopen

base = Path('/srv/salesacademy-cloud')
ops = base / 'operations'
archive = ops / 'advisor-links-06.tar.gz'
parser = argparse.ArgumentParser()
parser.add_argument('--sha256', required=True)
expected_archive = parser.parse_args().sha256
allowed = {'v5/growth/server/advisor.py', 'v5/growth/openapi.json'}
digest = lambda path: hashlib.sha256(path.read_bytes()).hexdigest()
if digest(archive) != expected_archive:
    raise SystemExit('Patch archive hash mismatch')
stage = ops / 'advisor-links-06'
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
        raise SystemExit('Advisor baseline or candidate hash mismatch')
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
    link = base/'current-advisor-links-pending'
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
            with urlopen('http://127.0.0.1:18485/growth-api/advisor/session', timeout=3) as response:
                ready = json.load(response).get('enabled') is True
            if ready:
                break
        except OSError:
            pass
        time.sleep(.3)
    if not ready:
        raise RuntimeError('Updated advisor did not become healthy')
except Exception:
    activate(previous)
    raise
result = {'previousRelease': str(previous), 'release': str(release), 'changedFiles': sorted(allowed),
          'manifestSha256': digest(release/'release-manifest.json'), 'restart': 'salesacademy-cloud@v5.service',
          'privateStateChanged': False, 'rollback': 'Atomically point current to previousRelease and restart only salesacademy-cloud@v5.service.'}
(ops/'advisor-links-deploy.json').write_text(json.dumps(result, indent=2))
print(json.dumps(result, indent=2))
