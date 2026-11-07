"""Apply the reviewed advisor patch to V5, keeping prior releases and private state."""
from pathlib import Path
import argparse
import hashlib
import json
import os
import shutil
import sqlite3
import subprocess
import tarfile
import time
from urllib.request import urlopen

parser=argparse.ArgumentParser()
parser.add_argument('--sha256',required=True)
args=parser.parse_args()
base=Path('/srv/salesacademy-cloud');ops=base/'operations'
archive=ops/'sales-advisor-05.tar.gz'
digest=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
if digest(archive)!=args.sha256:raise SystemExit('Archive hash mismatch')
client_env=Path('/etc/salesacademy-advisor/client.env')
if not client_env.is_file() or client_env.stat().st_mode&0o077:raise SystemExit('Private advisor client configuration is not ready')
with urlopen('http://127.0.0.1:18642/health',timeout=3) as response:
 if not json.load(response).get('ok'):raise SystemExit('Advisor bridge not healthy')
stage=ops/'sales-advisor-05';stage.mkdir(mode=0o700)
with tarfile.open(archive,'r:gz') as bundle:bundle.extractall(stage,filter='data')
patch=json.loads((stage/'patch.json').read_text())
allowed_prefixes=('v5/growth/server/','v5/growth/site/','v5/growth/content/')
for item in patch['files']:
 name=item['path'];path=Path(name)
 if path.is_absolute() or '..' in path.parts or not (name.startswith(allowed_prefixes) or name=='v5/growth/openapi.json'):
  raise SystemExit('Unexpected path')
 if digest(stage/name)!=item['sha256']:raise SystemExit('Candidate hash mismatch')
current=base/'current';previous=current.resolve()
if previous!=base/'releases'/patch['parentRelease']:raise SystemExit('Current release changed')
manifest=json.loads((previous/'release-manifest.json').read_text())
for record in manifest['files']:
 if digest(previous/record['path'])!=record['sha256']:raise SystemExit('Existing release drift')
for item in patch['files']:
 old=previous/item['path']
 if item['beforeSha256'] is None:
  if old.exists():raise SystemExit('New path already exists')
 elif not old.exists() or digest(old)!=item['beforeSha256']:raise SystemExit('Patch baseline mismatch')
release=base/'releases'/patch['name']
if release.exists():raise SystemExit('Release already exists')
required_bytes=sum((previous/item['path']).stat().st_size for item in manifest['files'])
if shutil.disk_usage(base).free < required_bytes + 128*1024*1024:raise SystemExit('Insufficient release disk space')
shutil.copytree(previous,release)
for item in patch['files']:
 target=release/item['path'];target.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(stage/item['path'],target)
 record=next((r for r in manifest['files'] if r['path']==item['path']),None)
 if record is None:
  record={'path':item['path']};manifest['files'].append(record)
 record.update(sha256=item['sha256'],bytes=item['bytes'],previousSha256=item['beforeSha256'],modifiedBy=patch['name'])
manifest.update(parentRelease=previous.name,patch=patch)
(release/'release-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2,sort_keys=True)+'\n')
for record in manifest['files']:
 if digest(release/record['path'])!=record['sha256']:raise SystemExit('Release verification failed')
backup=ops/'advisor-05-private-backup';backup.mkdir(mode=0o700)
source=sqlite3.connect('file:/var/lib/salesacademy-cloud/v5/growth.sqlite?mode=ro',uri=True)
target=sqlite3.connect(backup/'growth.sqlite');source.backup(target);target.close();source.close();(backup/'growth.sqlite').chmod(0o600)
dropin_dir=Path('/etc/systemd/system/salesacademy-cloud@v5.service.d');dropin_dir.mkdir(exist_ok=True)
dropin=dropin_dir/'advisor.conf'
if dropin.exists():raise SystemExit('Advisor drop-in already exists; inspect before replace')
service=Path('/etc/systemd/system/salesacademy-advisor-retention.service')
timer=Path('/etc/systemd/system/salesacademy-advisor-retention.timer')
if service.exists() or timer.exists():raise SystemExit('Retention unit already exists')
if current.resolve()!=previous:raise SystemExit('Current release changed during preparation')
dropin.write_text('[Service]\nEnvironmentFile=/etc/salesacademy-advisor/client.env\n')
service.write_text('''[Unit]
Description=Sales Academy V5 private data retention
[Service]
Type=oneshot
User=sa-cloud-v5
Group=sa-cloud-v5
WorkingDirectory=/srv/salesacademy-cloud/current/v5
Environment=PYTHONDONTWRITEBYTECODE=1
ExecStart=/srv/salesacademy-cloud/venv/bin/python -m growth.server.cli --data-root /var/lib/salesacademy-cloud/v5 purge-expired
UMask=0077
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/var/lib/salesacademy-cloud/v5
''')
timer.write_text('''[Unit]
Description=Periodic retention for Sales Academy V5
[Timer]
OnBootSec=2min
OnUnitActiveSec=5min
AccuracySec=30s
[Install]
WantedBy=timers.target
''')
def command(*items):
 result=subprocess.run(items,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
 if result.returncode:raise RuntimeError('Service operation failed: '+items[0])
def activate(path):
 pending=base/'current-advisor-pending';pending.symlink_to(path);os.replace(pending,current)
 command('systemctl','restart','salesacademy-cloud@v5.service')
try:
 command('systemctl','daemon-reload');activate(release)
 ready=False
 for _ in range(30):
  try:
   with urlopen('http://127.0.0.1:18485/growth-api/advisor/session',timeout=3) as response:ready=json.load(response).get('enabled') is True
   if ready:break
  except OSError:pass
  time.sleep(.3)
 if not ready:raise RuntimeError('Advisor not enabled on V5')
 with urlopen('http://127.0.0.1:18485/growth-assets/advisor.mjs',timeout=3) as response:live=hashlib.sha256(response.read()).hexdigest()
 if live!=next(i['sha256'] for i in patch['files'] if i['path'].endswith('/advisor.mjs')):raise RuntimeError('Live asset mismatch')
 command('systemctl','enable','--now',timer.name)
except Exception:
 dropin.unlink(missing_ok=True);service.unlink(missing_ok=True);timer.unlink(missing_ok=True)
 command('systemctl','daemon-reload');activate(previous)
 raise
result={'release':str(release),'previousRelease':str(previous),'changedFiles':[i['path'] for i in patch['files']],
        'manifestSha256':digest(release/'release-manifest.json'),'databaseChange':'Additive advisor tables; private SQLite backup remains only on VPS',
        'cmsContentImported':False,'restart':'salesacademy-cloud@v5.service','retentionTimer':timer.name,
        'rollback':'Disable retention timer, remove advisor drop-in, daemon-reload, atomically restore current to previousRelease, restart only V5. Preserve private DB; advisor tables are additive.'}
(ops/'sales-advisor-deploy.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps(result,indent=2))
