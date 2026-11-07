"""Initial additive deployment on the authorized VPS; run as root.

Requires prepared venv, certificate and operations files. Refuses to replace an
existing current release, service template or owner access file.
"""
import argparse
import grp
import hashlib
import json
from pathlib import Path
import pwd
import shutil
import subprocess
import tarfile
import time
from urllib.request import urlopen

parser = argparse.ArgumentParser()
parser.add_argument('--sha256', required=True)
args = parser.parse_args()
base = Path('/srv/salesacademy-cloud')
ops = base / 'operations'
archive = ops / 'runtime.tar.gz'
release = base / 'releases/20261107-versions-01'
current = base / 'current'
service = Path('/etc/systemd/system/salesacademy-cloud@.service')
if current.exists() or current.is_symlink() or release.exists() or service.exists():
    raise SystemExit('Existing deployment detected; initial installer will not replace it.')
if hashlib.sha256(archive.read_bytes()).hexdigest() != args.sha256:
    raise SystemExit('Archive hash mismatch')
release.mkdir(mode=0o755)
with tarfile.open(archive, 'r:gz') as bundle:
    bundle.extractall(release, filter='data')
manifest = json.loads((release/'release-manifest.json').read_text())
for item in manifest['files']:
    path = release/item['path']
    if not path.is_relative_to(release) or hashlib.sha256(path.read_bytes()).hexdigest() != item['sha256']:
        raise SystemExit('Release manifest verification failed')
print(f"Verified {len(manifest['files'])} release files.")
current.symlink_to(release)
env_root = Path('/etc/salesacademy-cloud');env_root.mkdir(mode=0o750)
state_root = Path('/var/lib/salesacademy-cloud');state_root.mkdir(mode=0o755)
for n in range(1,6):
    user = f'sa-cloud-v{n}'
    try:
        pwd.getpwnam(user)
        raise SystemExit('Dedicated service user already exists; inspect before reuse.')
    except KeyError:
        subprocess.run(['useradd','--system','--user-group','--no-create-home','--shell','/usr/sbin/nologin',user],check=True)
    state = state_root/f'v{n}';state.mkdir(mode=0o700)
    shutil.chown(state,user=user,group=user)
    env = env_root/f'v{n}.env'
    env.write_text(f'SA_GROWTH_DATA_ROOT={state}\nSA_PORT={18480+n}\n')
    env.chmod(0o600)
subprocess.run([str(base/'venv/bin/python'),str(ops/'bootstrap_owners.py')],check=True)
shutil.copyfile(ops/service.name,service)
subprocess.run(['systemctl','daemon-reload'],check=True)
for n in range(1,6):
    subprocess.run(['systemctl','enable','--now',f'salesacademy-cloud@v{n}.service'],check=True)
for n in range(1,6):
    ready = False
    for attempt in range(30):
        try:
            with urlopen(f'http://127.0.0.1:{18480+n}/growth-api/health',timeout=2) as response:
                ready = response.status == 200 and json.load(response).get('ok') is True
            if ready:break
        except OSError:pass
        time.sleep(.5)
    if not ready:raise SystemExit(f'v{n} did not become healthy; HTTPS not enabled')
    print(f'v{n} healthy on private loopback.')
vhost = Path('/etc/nginx/sites-available/salesacademy-cloud.conf')
shutil.copyfile(vhost,ops/'vhost-before-https.conf')
shutil.copyfile(ops/'salesacademy-cloud-https.conf',vhost)
checked = subprocess.run(['nginx','-t'])
if checked.returncode:
    shutil.copyfile(ops/'vhost-before-https.conf',vhost)
    raise SystemExit('Invalid HTTPS config; restored previous vhost, no reload.')
subprocess.run(['systemctl','reload','nginx'],check=True)
print('All five versions and index are live over HTTPS.')
