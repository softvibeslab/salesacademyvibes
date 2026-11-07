"""VPS-only synthetic smoke; emits no credential or customer-data values."""
from pathlib import Path
from urllib.request import Request,urlopen
from urllib.error import HTTPError
import glob
import hashlib
import json
import subprocess
import time

PROFILE=Path('/var/lib/salesacademy-advisor/.hermes/profiles/sales-academy-advisor')
OUT=Path('/srv/salesacademy-cloud/operations/advisor-isolation.json')


def snapshot():
    return {str(p.relative_to(PROFILE)):hashlib.sha256(p.read_bytes()).hexdigest() for p in PROFILE.rglob('*') if p.is_file()}


def main():
    settings=dict(line.split('=',1) for line in Path('/etc/salesacademy-advisor/client.env').read_text().splitlines())
    endpoint=settings['ADVISOR_HERMES_URL']
    key=settings['ADVISOR_HERMES_KEY']
    report={'customerDataRead':False,'whatsappSent':False,'tests':[]}
    def request(body,authorize=True):
        headers={'Content-Type':'application/json'}
        if authorize:headers['Authorization']='Bearer '+key
        try:
            with urlopen(Request(endpoint,data=json.dumps(body).encode(),headers=headers),timeout=36) as response:return response.status,json.load(response)
        except HTTPError as error:return error.code,json.load(error)
    report['health']=json.load(urlopen('http://127.0.0.1:18642/health'))
    assert request({},False)[0]==401
    report['tests'].append({'case':'missing key','status':401})
    assert request({'messages':[{'role':'tool','content':'forbidden'}]})[0]==400
    report['tests'].append({'case':'invalid role','status':400})
    before=snapshot()
    context='Sales Academy es una plataforma B2B de entrenamiento, coaching, conocimiento y desempeño comercial centrada en Smart Agent. Training Roadmap organiza el aprendizaje. Los videos son conceptuales. No hay precios autorizados. Chris confirma por WhatsApp las solicitudes de demo; no hay reserva automática.'
    questions=[
      'Esta es una prueba sintética; mi palabra de comprobación es PRUEBA-8391. ¿Qué es Sales Academy y cómo coordino una demo?',
      '¿Qué palabra de comprobación te di antes? Si no tienes ese dato, dilo. También dime si ya puedes confirmar mi cita.'
    ]
    for index,question in enumerate(questions):
        start=time.monotonic()
        status,result=request({'messages':[{'role':'system','content':context},{'role':'user','content':question}]})
        assert status==200,(status,result)
        reply=result['reply']
        assert reply and len(reply)<=6000
        if index==1:assert 'PRUEBA-8391' not in reply
        report['tests'].append({'case':'independent synthetic inference '+str(index+1),'status':status,'durationSeconds':round(time.monotonic()-start,2),'reply':reply})
    report['permanentProfileUnchanged']=before==snapshot()
    report['persistentDatabaseExists']=(PROFILE/'state.db').exists()
    report['temporaryHomesRemaining']=len(glob.glob('/tmp/systemd-private-*salesacademy-advisor.service-*/tmp/sa-advisor-request-*'))
    report['serviceUser']=subprocess.check_output(['systemctl','show','salesacademy-advisor.service','-p','User','--value'],text=True).strip()
    report['canReadRootProfile']=subprocess.run(['runuser','-u','sa-advisor','--','test','-r','/root/.hermes/auth.json']).returncode==0
    report['services']={name:subprocess.run(['systemctl','is-active',name],capture_output=True,text=True).stdout.strip() for name in ['salesacademy-advisor.service','salesacademy-advisor-credential.timer','hermes-gateway.service','copiloto-hermes.service']}
    report['secretPermissions']={name:oct((Path('/etc/salesacademy-advisor')/name).stat().st_mode&0o777) for name in ['client.env','bridge.env','provider.json']}
    assert report['permanentProfileUnchanged']
    assert not report['persistentDatabaseExists']
    assert not report['temporaryHomesRemaining']
    assert report['serviceUser']=='sa-advisor'
    assert not report['canReadRootProfile']
    assert all(state=='active' for state in report['services'].values())
    report['ok']=True
    OUT.write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
    print(json.dumps(report,ensure_ascii=False,indent=2))


if __name__=='__main__':main()
