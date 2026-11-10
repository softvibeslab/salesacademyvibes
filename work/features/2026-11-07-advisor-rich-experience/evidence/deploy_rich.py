"""Apply reviewed V5 rich-advisor files and the matching brief Hermes identity."""
from pathlib import Path
import argparse,hashlib,json,os,shutil,subprocess,tarfile,tempfile,time
from urllib.request import urlopen

parser=argparse.ArgumentParser();parser.add_argument('--sha256',required=True);args=parser.parse_args()
if os.geteuid()!=0:raise SystemExit('Root required to preserve service ownership')
base=Path('/srv/salesacademy-cloud');ops=base/'operations';archive=ops/'advisor-rich-07.tar.gz'
digest=lambda path:hashlib.sha256(path.read_bytes()).hexdigest()
allowed={'v5/growth/server/advisor.py','v5/growth/openapi.json','v5/growth/site/assets/advisor.mjs','v5/growth/site/assets/advisor.css'}
if digest(archive)!=args.sha256:raise SystemExit('Archive hash mismatch')
stage=ops/'advisor-rich-07';stage.mkdir(mode=0o700)
with tarfile.open(archive,'r:gz') as bundle:bundle.extractall(stage,filter='data')
patch=json.loads((stage/'patch.json').read_text());profile=json.loads((stage/'profile-patch.json').read_text())
if patch.get('name')!='20261107-advisor-rich-07' or patch.get('parentRelease')!='20261107-advisor-links-06':raise SystemExit('Unexpected release lineage')
if {item['path'] for item in patch['files']}!=allowed:raise SystemExit('Unexpected runtime patch')
profiles=[Path('/var/lib/salesacademy-advisor/.hermes/profiles/sales-academy-advisor/SOUL.md'),Path('/opt/salesacademy-advisor/SOUL.md')]
if any(digest(path)!=profile['beforeSha256'] for path in profiles):raise SystemExit('Hermes identity changed before patch')
if digest(stage/'profile/SOUL.md')!=profile['sha256']:raise SystemExit('Candidate identity mismatch')
current=base/'current';previous=current.resolve()
if previous!=base/'releases'/patch['parentRelease']:raise SystemExit('Active release changed')
manifest=json.loads((previous/'release-manifest.json').read_text())
for record in manifest['files']:
 if digest(previous/record['path'])!=record['sha256']:raise SystemExit('Existing release drift')
for item in patch['files']:
 if digest(previous/item['path'])!=item['beforeSha256'] or digest(stage/item['path'])!=item['sha256']:raise SystemExit('Patch baseline/candidate mismatch')
release=base/'releases'/patch['name']
if release.exists():raise SystemExit('Release already exists')
required_bytes=sum((previous/item['path']).stat().st_size for item in manifest['files'])
if shutil.disk_usage(base).free<required_bytes+128*1024*1024:raise SystemExit('Insufficient release disk space')
shutil.copytree(previous,release)
for item in patch['files']:
 shutil.copyfile(stage/item['path'],release/item['path'])
 record=next(r for r in manifest['files'] if r['path']==item['path'])
 record.update(sha256=item['sha256'],bytes=item['bytes'],previousSha256=item['beforeSha256'],modifiedBy=patch['name'])
manifest.update(parentRelease=previous.name,patch=patch)
(release/'release-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2,sort_keys=True)+'\n')
for record in manifest['files']:
 if digest(release/record['path'])!=record['sha256']:raise SystemExit('Candidate release mismatch')
backup=ops/'advisor-rich-07-profile-before.md';backup.write_bytes(profiles[0].read_bytes());backup.chmod(0o600)
def identity(data):
 errors=[]
 for path in profiles:
  try:
   stat=path.stat();fd,name=tempfile.mkstemp(prefix='.soul-',dir=path.parent)
   try:
    with os.fdopen(fd,'wb') as handle:handle.write(data);handle.flush();os.fsync(handle.fileno())
    os.chown(name,stat.st_uid,stat.st_gid);os.chmod(name,stat.st_mode&0o777);os.replace(name,path)
   finally:
    if os.path.exists(name):os.unlink(name)
  except Exception as error:errors.append(f'{path}: {error}')
 if errors:raise RuntimeError('; '.join(errors))
def activate(target):
 link=base/'current-advisor-rich-pending';link.symlink_to(target);os.replace(link,current)
 subprocess.run(['systemctl','restart','salesacademy-cloud@v5.service'],check=True)
if current.resolve()!=previous:raise SystemExit('Release changed during preparation')
try:
 identity((stage/'profile/SOUL.md').read_bytes());activate(release)
 ready=False
 for _ in range(30):
  try:
   with urlopen('http://127.0.0.1:18485/growth-api/advisor/session',timeout=3) as response:
    data=json.load(response);ready=data.get('enabled') is True and isinstance(data.get('suggestions'),list) and isinstance(data.get('resources'),list)
   if ready:break
  except OSError:pass
  time.sleep(.3)
 if not ready:raise RuntimeError('Rich advisor not ready')
 for asset in ('advisor.mjs','advisor.css'):
  with urlopen(f'http://127.0.0.1:18485/growth-assets/{asset}',timeout=3) as response:live=hashlib.sha256(response.read()).hexdigest()
  if live!=next(i['sha256'] for i in patch['files'] if i['path'].endswith('/'+asset)):raise RuntimeError('Live frontend mismatch')
 with urlopen('http://127.0.0.1:18642/health',timeout=3) as response:health=json.load(response)
 if health.get('ok') is not True or health.get('profile')!='sales-academy-advisor':raise RuntimeError('Hermes bridge not ready')
except Exception:
 try:identity(backup.read_bytes())
 finally:activate(previous)
 raise
result={'release':str(release),'previousRelease':str(previous),'changedFiles':sorted(allowed),'profileSha256':profile['sha256'],
        'profileBackup':str(backup),'manifestSha256':digest(release/'release-manifest.json'),'databaseSchemaChanged':False,'modelCredentialsChanged':False,
        'restart':'salesacademy-cloud@v5.service','rollback':'Restore both SOUL files atomically from profileBackup preserving permissions, point current to previousRelease, restart V5 only.'}
(ops/'advisor-rich-deploy.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
