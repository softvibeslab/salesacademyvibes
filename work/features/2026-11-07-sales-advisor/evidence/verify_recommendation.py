"""One synthetic public inference; no lead creation or external messages."""
from urllib.request import Request, build_opener, HTTPCookieProcessor
from http.cookiejar import CookieJar
import json
from pathlib import Path
import time
import uuid
base='https://v5.salesacademy.softvibes.cloud'
client=build_opener(HTTPCookieProcessor(CookieJar()))
with client.open(base+'/growth-api/advisor/session',timeout=15) as r:session=json.load(r)
assert session['enabled'] and session['messages']==[]
message='¿Qué es Sales Academy y cómo ayuda a un líder de sala? Si recomiendas un recurso publicado, menciona su título exacto.'
body=json.dumps({'message':message,'requestId':str(uuid.uuid4())}).encode()
start=time.monotonic()
request=Request(base+'/growth-api/advisor/messages',data=body,headers={'Content-Type':'application/json','Origin':base,'X-Advisor-CSRF':session['csrf']},method='POST')
with client.open(request,timeout=45) as r:result=json.load(r)
assert result['reply'] and result['resources']
normalize=lambda text:' '.join(text.casefold().split())
mentioned=[x for x in result['resources'] if normalize(x['title']) in normalize(result['reply'])]
assert mentioned,'Expected cited published resource among provided links'
assert result['resources'][0] in mentioned,'Cited published resource must precede query-only matches'
checks=[]
for resource in result['resources']:
 assert resource['url'].startswith('/mediahub/')
 with client.open(base+resource['url'],timeout=15) as r:checks.append({'url':resource['url'],'status':r.status})
 assert checks[-1]['status']==200
report={'ok':True,'modelCalls':1,'seconds':round(time.monotonic()-start,2),'question':message,'reply':result['reply'],'resources':result['resources'],'resourceChecks':checks,'leadsCreated':0,'whatsappOpened':False}
Path(__file__).with_name('recommendation-public.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'ok':True,'modelCalls':1,'citedFirst':mentioned[0]['title'],'resources':len(checks)}))
