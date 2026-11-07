"""Run only on the VPS as root after reviewing and uploading these files."""
from pathlib import Path
import grp
import json
import os
import pwd
import secrets
import shutil
import subprocess

BASE=Path('/opt/salesacademy-advisor')
STATE=Path('/var/lib/salesacademy-advisor')
ETC=Path('/etc/salesacademy-advisor')
PROFILE=STATE/'.hermes/profiles/sales-academy-advisor'
UNIT=Path('/etc/systemd/system')
PYTHON='/opt/salesacademy-advisor/venv/bin/python'


def command(args, cwd=None):
    subprocess.run(args,check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL,cwd=cwd)


def private_file(path,text,mode=0o600):
    path.write_text(text)
    path.chmod(mode)


def main():
    if os.geteuid()!=0:raise SystemExit('Root required on the VPS')
    try:
        user=pwd.getpwnam('sa-advisor')
        if user.pw_dir!=str(STATE):raise SystemExit('Unexpected service account')
    except KeyError:
        command(['useradd','--system','--user-group','--home-dir',str(STATE),'--create-home','--shell','/usr/sbin/nologin','sa-advisor'])
        user=pwd.getpwnam('sa-advisor')
    STATE.mkdir(exist_ok=True);STATE.chmod(0o700);os.chown(STATE,user.pw_uid,user.pw_gid)
    BASE.mkdir(mode=0o755,exist_ok=True)
    ETC.mkdir(mode=0o750,exist_ok=True);ETC.chmod(0o750);os.chown(ETC,0,user.pw_gid)
    # The existing Hermes interpreter points inside /root. Copy only its
    # standard Python distribution; never weaken /root permissions or run the
    # public advisor as root. Existing dependency files stay read-only.
    python_base=Path('/usr/local/lib/hermes-agent/venv/bin/python').resolve().parent.parent
    if not (BASE/'python').exists():shutil.copytree(python_base,BASE/'python',symlinks=True)
    if not Path(PYTHON).exists():command([str(BASE/'python/bin/python3.11'),'-m','venv','--without-pip',str(BASE/'venv')])
    site=BASE/'venv/lib/python3.11/site-packages'
    (site/'hermes-shared.pth').write_text('/usr/local/lib/hermes-agent/venv/lib/python3.11/site-packages\n')
    source=Path(__file__).parent
    for name in ['bridge.py','worker.py','refresh_provider.py','SOUL.md']:
        shutil.copyfile(source/name,BASE/name);(BASE/name).chmod(0o644)
    if not PROFILE.exists():
        command(['runuser','-u','sa-advisor','--',PYTHON,'/usr/local/lib/hermes-agent/hermes','profile','create','sales-academy-advisor','--no-skills','--no-alias','--description','Asesor público de Sales Academy: conocimiento aprobado, sin herramientas ni memoria compartida.'],cwd=STATE)
    if not PROFILE.is_dir():raise SystemExit('Profile creation failed')
    import yaml
    source_config=yaml.safe_load(Path('/root/.hermes/config.yaml').read_text())
    model=source_config['model']['default']
    if source_config['model']['provider']!='openai-codex':raise SystemExit('Provider changed; review required')
    config={'model':{'default':model,'provider':'openai-codex','base_url':'https://chatgpt.com/backend-api/codex','max_tokens':1200},
      'agent':{'max_iterations':1,'reasoning_effort':'low'},'memory':{'memory_enabled':False,'user_profile_enabled':False,'provider':'','flush_min_turns':0},
      'sessions':{'write_json_snapshots':False},'platform_toolsets':{'api_server':[],'cli':[]},'mcp_servers':{},'hooks':{}}
    private_file(PROFILE/'config.yaml',yaml.safe_dump(config,sort_keys=False))
    shutil.copyfile(BASE/'SOUL.md',PROFILE/'SOUL.md');(PROFILE/'SOUL.md').chmod(0o600)
    for name in ['config.yaml','SOUL.md']:
        os.chown(PROFILE/name,user.pw_uid,user.pw_gid)
    # Two environment files share only the dedicated bridge token. Provider
    # credentials live separately and are never copied to the Cloud backend.
    token_file=ETC/'bridge.env'
    if token_file.exists():
        line=token_file.read_text().strip()
        if not line.startswith('ADVISOR_BRIDGE_KEY='):raise SystemExit('Unexpected existing key file')
        token=line.split('=',1)[1]
    else:token=secrets.token_urlsafe(48)
    private_file(token_file,'ADVISOR_BRIDGE_KEY='+token+'\n')
    private_file(ETC/'client.env','ADVISOR_ENABLED=1\nADVISOR_HERMES_URL=http://127.0.0.1:18642/chat\nADVISOR_HERMES_KEY='+token+'\n')
    bridge_unit=f'''[Unit]
Description=Sales Academy public advisor isolated Hermes bridge
After=network-online.target salesacademy-advisor-credential.service
Wants=network-online.target
Requires=salesacademy-advisor-credential.service
[Service]
Type=simple
User=sa-advisor
Group=sa-advisor
WorkingDirectory={BASE}
Environment=HERMES_HOME={PROFILE}
Environment=ADVISOR_PROFILE_HOME={PROFILE}
Environment=ADVISOR_PROVIDER_FILE={ETC}/provider.json
Environment=PYTHONUNBUFFERED=1
EnvironmentFile={ETC}/bridge.env
ExecStart={PYTHON} {BASE}/bridge.py
Restart=on-failure
RestartSec=3
UMask=0077
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths={STATE}
RestrictAddressFamilies=AF_INET AF_INET6 AF_UNIX
MemoryMax=1G
TasksMax=100
[Install]
WantedBy=multi-user.target
'''
    credential_unit=f'''[Unit]
Description=Refresh minimal Sales Academy inference credential inside VPS
After=network-online.target
[Service]
Type=oneshot
User=root
WorkingDirectory=/root
Environment=HERMES_HOME=/root/.hermes
ExecStart={PYTHON} {BASE}/refresh_provider.py
UMask=0077
TimeoutStartSec=60
NoNewPrivileges=true
PrivateTmp=true
'''
    timer='''[Unit]
Description=Maintain short-lived Sales Academy inference credential
[Timer]
OnBootSec=60
OnUnitActiveSec=300
Persistent=true
Unit=salesacademy-advisor-credential.service
[Install]
WantedBy=timers.target
'''
    private_file(UNIT/'salesacademy-advisor.service',bridge_unit,0o644)
    private_file(UNIT/'salesacademy-advisor-credential.service',credential_unit,0o644)
    private_file(UNIT/'salesacademy-advisor-credential.timer',timer,0o644)
    command(['systemctl','daemon-reload'])
    command(['systemctl','start','salesacademy-advisor-credential.service'])
    command(['systemctl','enable','--now','salesacademy-advisor-credential.timer'])
    command(['systemctl','enable','salesacademy-advisor.service'])
    command(['systemctl','restart','salesacademy-advisor.service'])
    print(json.dumps({'profile':str(PROFILE),'bridge':'http://127.0.0.1:18642/chat','clientEnv':str(ETC/'client.env'),'service':'salesacademy-advisor.service','existingGatewayChanged':False,'secretValuesPrinted':False}))


if __name__=='__main__':main()
