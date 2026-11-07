"""Behavioral acceptance tests. Always use isolated temporary state."""
import copy
import io
import json
import sqlite3
import tempfile
import unittest
import uuid
from pathlib import Path
from datetime import datetime, timedelta, timezone
from unittest.mock import patch
from werkzeug.security import check_password_hash
from jinja2 import DictLoader
from growth.server.app import create_app, create_staff, reset_staff_password
from growth.server.store import database, purge_expired_data
from growth.tests.test_media import photo, pdf

OWNER_PASSWORD = 'Owner-test-only-739!'
EDITOR_PASSWORD = 'Editor-test-only-284!'


def seed():
    return {
        'hero': {'eyebrow': 'Sales Academy', 'title': 'Entrenar con método', 'description': 'Ruta propuesta para tres salas.', 'primaryLabel': 'Diagnosticar mi sala'},
        'seo': {'title': 'Sales Academy', 'description': 'Recursos y demo.'},
        'sections': {k: 'Texto editorial aprobado' for k in ['problemTitle','problemBody','practiceTitle','practiceBody','stagesTitle','stagesBody','ctaTitle','ctaBody']},
        'faqs': [{'question':'¿Es una demo?', 'answer':'Demostración con datos de ejemplo.'}],
        'resources': [{
            'id': 'before-tour', 'slug': 'antes-del-tour', 'title': 'Antes del tour', 'excerpt': 'Guía de preparación',
            'body': [{'type':'heading','text':'Preparación'}, {'type':'paragraph','text':'Confirma tu próximo paso.'}, {'type':'list','items':['Practica','Revisa']}],
            'type':'template','role':'rep','topic':'practice','level':'start','coverId':None,'attachments':[],
            'externalMediaUrl':'','duration':'3 min','status':'published','evidenceLabel':'Recurso original','sourceNote':'Sales Academy','reviewedAt':'2026-11-07'
        }]
    }


class BackendAcceptance(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.root = Path(self.tmp.name)
        self.config = {'DATA_ROOT':str(self.root),'TESTING':True,'COOKIE_SECURE':False,'PUBLIC_CONTACT_ENABLED':True,'RATE_LIMIT_ENABLED':False,'SEED_DOCUMENT':seed()}
        self.app = create_app(self.config)
        self.app.jinja_loader = DictLoader({
            'landing.html': '{{ doc.hero.title }}{% for r in resources %}{{ r.title }}{% endfor %}',
            'hub.html': '{% for r in resources %}{{ r.title }}{% endfor %}',
            'resource.html': '{{ resource.title }}{% for b in resource.body %}{{ b.text }}{% endfor %}',
            'diagnostic.html':'Diagnóstico sin registro', 'privacy.html':'Privacidad', 'cms.html':'Iniciar sesión', 'analysis.html':'Análisis'
        })
        create_staff(self.root,'owner',OWNER_PASSWORD)
        self.client = self.app.test_client()

    def tearDown(self):
        self.tmp.cleanup()

    def login(self, client=None, username='owner', password=OWNER_PASSWORD):
        c=client or self.client
        r=c.post('/cms/api/login',json={'username':username,'password':password})
        self.assertEqual(r.status_code,200, r.get_data(as_text=True))
        return {'X-CSRF-Token':r.json['csrf']}

    def draft(self):
        r=self.client.get('/cms/api/draft'); self.assertEqual(r.status_code,200); return r.json

    def save(self,draft,headers):
        return self.client.put('/cms/api/draft',json={'document':draft['document'],'revision':draft['revision']},headers=headers)

    def request_body(self):
        return {'email':'leader@example.invalid','role':'leader','roomCountBucket':'three','need':'coaching','contactConsent':True,'marketingOptIn':False,'privacyVersion':'2026-11-07'}

    def test_authentication_csrf_and_server_roles(self):
        self.assertEqual(self.client.get('/cms/api/draft').status_code,401)
        self.assertEqual(self.client.get('/cms/preview/').status_code,401)
        h=self.login()
        cookie=self.client.get_cookie('sa_growth_session')
        self.assertTrue(cookie.http_only)
        self.assertEqual(cookie.same_site,'Strict')
        self.assertEqual(self.client.post('/cms/api/publish',json={'revision':1}).status_code,403)
        self.assertEqual(self.client.post('/cms/api/publish',json={'revision':1},headers={**h,'Origin':'https://evil.invalid'}).status_code,403)
        r=self.client.post('/cms/api/users',json={'username':'editor','password':EDITOR_PASSWORD,'role':'editor'},headers=h)
        self.assertEqual(r.status_code,201)
        editor=self.app.test_client(); eh=self.login(editor,'editor',EDITOR_PASSWORD)
        self.assertEqual(editor.get('/cms/api/demo-requests').status_code,403)
        self.assertEqual(editor.get('/cms/api/users').status_code,403)
        self.assertEqual(editor.post('/cms/api/publish',json={'revision':1},headers=eh).status_code,403)
        self.assertEqual(editor.get('/cms/api/draft').status_code,200)
        self.assertEqual(self.client.post('/cms/api/register',json={}).status_code,404)

    def test_owner_protection_and_session_revocation(self):
        h=self.login(); me=self.client.get('/cms/api/session').json['user']
        for change in ({'active':False},{'role':'editor'}):
            self.assertEqual(self.client.patch('/cms/api/users/'+str(me['id']),json=change,headers=h).status_code,409)
        r=self.client.post('/cms/api/users',json={'username':'editor','password':EDITOR_PASSWORD,'role':'editor'},headers=h)
        eid=r.json['user']['id']; ed=self.app.test_client();self.login(ed,'editor',EDITOR_PASSWORD)
        self.assertEqual(self.client.patch('/cms/api/users/'+str(eid),json={'active':False},headers=h).status_code,200)
        self.assertEqual(ed.get('/cms/api/session').status_code,401)
        reset_staff_password(self.root,'owner','Changed-test-only-987!')
        self.assertEqual(self.client.get('/cms/api/session').status_code,401)
        self.login(password='Changed-test-only-987!')

    def test_drafts_survive_restart_and_conflict_without_losing_publication(self):
        h=self.login(); d=self.draft(); d['document']['hero']['title']='Nuevo borrador privado'
        saved=self.save(d,h);self.assertEqual(saved.status_code,200)
        self.assertEqual(self.save(d,h).status_code,409)
        self.assertNotIn('Nuevo borrador privado',self.client.get('/descubre/').text)
        app2=create_app(self.config); c2=app2.test_client(); self.login(c2)
        self.assertEqual(c2.get('/cms/api/draft').json['document']['hero']['title'],'Nuevo borrador privado')
        self.assertEqual(self.client.get('/cms/preview/').headers['Cache-Control'],'no-store')
        self.assertIn('noindex',self.client.get('/cms/preview/').headers['X-Robots-Tag'])

    def test_publication_restore_is_atomic_and_does_not_revert_requests(self):
        h=self.login(); initial=self.client.get('/cms/api/revisions').json['items'][0]['id']; d=self.draft()
        d['document']['hero']['title']='Publicado nuevo'; r=self.save(d,h); self.assertEqual(r.status_code,200)
        revision=r.json['revision']; self.assertEqual(self.client.post('/cms/api/publish',json={'revision':revision-1},headers=h).status_code,409)
        r=self.client.post('/cms/api/publish',json={'revision':revision},headers=h); self.assertEqual(r.status_code,200)
        self.assertIn('Publicado nuevo',self.client.get('/descubre/').text)
        self.client.post('/growth-api/demo-requests',json=self.request_body(),headers={'Idempotency-Key':str(uuid.uuid4())})
        current=self.draft();r=self.client.post('/cms/api/restore',json={'publicationId':initial,'revision':current['revision']},headers=h)
        self.assertEqual(r.status_code,200)
        self.assertEqual(r.json['document']['hero']['title'],seed()['hero']['title'])
        self.assertIn('Publicado nuevo',self.client.get('/descubre/').text)
        self.assertEqual(len(self.client.get('/cms/api/demo-requests').json['items']),1)

    def test_schema_validation_and_stable_slug(self):
        h=self.login();d=self.draft(); bad=copy.deepcopy(d);bad['document']['hero']['unknown']='reject'
        self.assertEqual(self.save(bad,h).status_code,400)
        bad=copy.deepcopy(d);bad['document']['resources'][0]['slug']='changed-slug'
        self.assertEqual(self.save(bad,h).status_code,409)
        bad=copy.deepcopy(d);bad['document']['resources'][0]['externalMediaUrl']='https://youtube.com.evil.invalid/watch?v=abc'
        self.assertEqual(self.save(bad,h).status_code,400)
        bad=copy.deepcopy(d);bad['document']['resources'][0]['externalMediaUrl']='javascript:alert(1)'
        self.assertEqual(self.save(bad,h).status_code,400)
        bad=copy.deepcopy(d);bad['document']['resources'][0]['externalMediaUrl']='https://www.youtube.com/watch?v=abcdefghijk'
        self.assertEqual(self.save(bad,h).status_code,200)

    def test_unpublished_resources_are_private_and_filtering_is_server_side(self):
        h=self.login();d=self.draft(); new=copy.deepcopy(d['document']['resources'][0]);new.update(id='private',slug='privado',title='SECRETO-EDITORIAL',status='draft')
        r=self.client.post('/cms/api/resources',json={'resource':new,'revision':d['revision']},headers=h);self.assertEqual(r.status_code,201)
        r=self.client.post('/cms/api/publish',json={'revision':r.json['revision']},headers=h);self.assertEqual(r.status_code,200)
        anon=self.app.test_client()
        for url in ('/mediahub/','/descubre/','/mediahub/?q=SECRETO'):
            self.assertNotIn('SECRETO-EDITORIAL',anon.get(url).text)
        self.assertEqual(anon.get('/mediahub/privado/').status_code,404)
        self.assertEqual(anon.get('/mediahub/privado/descargar/').status_code,404)
        self.assertIn('Antes del tour',anon.get('/mediahub/?role=rep&topic=practice&type=template').text)
        self.assertNotIn('Antes del tour',anon.get('/mediahub/?role=director').text)
        self.assertNotIn('Antes del tour',anon.get('/mediahub/?q=notfound').text)
        dl=anon.get('/mediahub/antes-del-tour/descargar/')
        self.assertEqual(dl.status_code,200);self.assertIn('Confirma tu próximo paso',dl.text);self.assertIn('attachment',dl.headers['Content-Disposition'])
        self.assertEqual(anon.get('/').status_code,404)
        self.assertEqual(anon.get('/ops/').status_code,404)
        self.assertEqual(anon.get('/api/reset').status_code,404)

    def test_demo_request_validation_idempotency_and_disabled_contact(self):
        body=self.request_body();key=str(uuid.uuid4());headers={'Idempotency-Key':key}
        r=self.client.post('/growth-api/demo-requests',json=body,headers=headers);self.assertEqual(r.status_code,201)
        replay=self.client.post('/growth-api/demo-requests',json=body,headers=headers);self.assertEqual(replay.status_code,200);self.assertEqual(replay.json['id'],r.json['id'])
        conflict=self.client.post('/growth-api/demo-requests',json={**body,'need':'pilot'},headers=headers);self.assertEqual(conflict.status_code,409)
        for bad in ({**body,'contactConsent':False},{**body,'contactConsent':'true'},{**body,'email':'bad'},{**body,'role':'admin'},{**body,'extra':'PII'},{**body,'marketingOptIn':'yes'}):
            self.assertEqual(self.client.post('/growth-api/demo-requests',json=bad,headers={'Idempotency-Key':str(uuid.uuid4())}).status_code,400)
        self.assertEqual(self.client.post('/growth-api/demo-requests',json=body).status_code,400)
        self.app.config['PUBLIC_CONTACT_ENABLED']=False
        self.assertEqual(self.client.post('/growth-api/demo-requests',json=body,headers={'Idempotency-Key':str(uuid.uuid4())}).status_code,503)
        h=self.login();items=self.client.get('/cms/api/demo-requests').json['items'];self.assertEqual(len(items),1)
        self.assertEqual(self.client.patch('/cms/api/demo-requests',json={'id':items[0]['id'],'status':'contacted'},headers=h).status_code,200)

    def test_events_allowlist_deduplication_and_metrics_privacy(self):
        event={'eventId':str(uuid.uuid4()),'flowId':str(uuid.uuid4()),'event':'diagnostic_started','placement':'hero','consentVersion':'2026-11-07'}
        self.assertEqual(self.client.post('/growth-api/events',json=event).status_code,202)
        self.assertEqual(self.client.post('/growth-api/events',json=event).status_code,204)
        for bad in ({**event,'email':'nobody@example.invalid'},{**event,'event':'demo_requested'},{**event,'consentVersion':''},{**event,'eventId':'bad'},{**event,'resourceId':'not-a-published-slug'}):
            self.assertEqual(self.client.post('/growth-api/events',json=bad).status_code,400)
        self.assertEqual(self.client.post('/growth-api/events',data='x'*2049,content_type='application/json').status_code,413)
        self.assertEqual(self.client.get('/cms/api/metrics').status_code,401)
        self.login();metrics=self.client.get('/cms/api/metrics');self.assertEqual(metrics.status_code,200)
        self.assertEqual(metrics.json['events']['diagnostic_started'],1)
        self.assertNotIn('email',metrics.text)

    def test_rate_limits_are_enforced_and_wrong_login_is_generic(self):
        self.app.config['RATE_LIMIT_ENABLED']=True
        known=self.client.post('/cms/api/login',json={'username':'owner','password':'wrong'})
        unknown=self.client.post('/cms/api/login',json={'username':'absent','password':'wrong'})
        self.assertEqual(known.status_code,401);self.assertEqual(known.json,unknown.json)
        for _ in range(15):r=self.client.post('/cms/api/login',json={'username':'owner','password':'wrong'})
        self.assertEqual(r.status_code,429)
        self.assertIn('Retry-After',r.headers)

    def test_security_headers_content_escape_and_json_errors(self):
        r=self.client.get('/descubre/');self.assertEqual(r.status_code,200)
        self.assertEqual(r.headers['X-Content-Type-Options'],'nosniff')
        self.assertIn("default-src 'self'",r.headers['Content-Security-Policy'])
        h=self.login();d=self.draft();d['document']['hero']['title']='<script>alert(1)</script>'
        r=self.save(d,h);self.assertEqual(r.status_code,200)
        self.client.post('/cms/api/publish',json={'revision':r.json['revision']},headers=h)
        html=self.client.get('/descubre/').text
        self.assertNotIn('<script>alert',html);self.assertIn('&lt;script&gt;',html)
        r=self.client.put('/cms/api/draft',json=[],headers=h);self.assertEqual(r.status_code,400);self.assertIn('error',r.json)
        r=self.client.get('/cms/api/unknown');self.assertEqual(r.status_code,404);self.assertNotIn('Traceback',r.text)

    def test_media_routes_usages_and_failed_publication_preserve_active_snapshot(self):
        h=self.login();anon=self.app.test_client()
        meta={'title':'Portada de prueba','alt':'Representación sintética','origin':'Creación propia de prueba','rightsStatus':'pending','reviewStatus':'pending'}
        response=self.client.post('/cms/api/media',data={**meta,'file':(io.BytesIO(photo()),'cover.png')},headers=h)
        self.assertEqual(response.status_code,201,response.text);mid=response.json['item']['id']
        for variant in ('original','web','thumbnail'):
            self.assertEqual(anon.get(f'/media/{mid}/{variant}').status_code,404)
        d=self.draft(); d['document']['resources'][0]['coverId']=mid
        d['document']['hero']['title']='New snapshot must be atomic'
        d=self.save(d,h).json
        before=self.draft()['publishedRevision']
        self.assertEqual(self.client.post('/cms/api/publish',json={'revision':d['revision']},headers=h).status_code,400)
        self.assertEqual(self.draft()['publishedRevision'],before)
        self.assertNotIn('New snapshot must be atomic',anon.get('/descubre/').text)
        self.assertEqual(self.client.patch(f'/cms/api/media/{mid}',json={'rightsStatus':'approved','reviewStatus':'approved'},headers=h).status_code,200)
        self.assertEqual(self.client.post('/cms/api/publish',json={'revision':d['revision']},headers=h).status_code,200)
        image_response=anon.get(f'/media/{mid}/web')
        self.assertEqual(image_response.status_code,200)
        self.assertEqual(image_response.mimetype,'image/webp')
        image_response.close()
        self.assertEqual(anon.get(f'/media/{mid}/original').status_code,404)
        with self.client.get(f'/media/{mid}/original') as response:
            self.assertEqual(response.headers['Cache-Control'],'no-store')
        uses=self.client.get(f'/cms/api/media/{mid}/usage').json['uses']
        self.assertTrue(any(u['label']=='Publicación activa' and u['title']=='Antes del tour' for u in uses))
        self.assertEqual(self.client.patch(f'/cms/api/media/{mid}',json={'archived':True},headers=h).status_code,200)
        with anon.get(f'/media/{mid}/web') as response:self.assertEqual(response.status_code,200)
        self.assertEqual(self.client.post('/cms/api/publish',json={'revision':d['revision']},headers=h).status_code,400)
        d=self.draft(); d['document']['resources'][0]['status']='draft';d=self.save(d,h).json
        uses=self.client.get(f'/cms/api/media/{mid}/usage').json['uses']
        self.assertTrue(any(u['label']=='Borrador' for u in uses))
        self.client.post('/cms/api/publish',json={'revision':d['revision']},headers=h)
        self.assertEqual(anon.get(f'/media/{mid}/web').status_code,404)
        with self.client.get(f'/media/{mid}/web') as response:self.assertEqual(response.status_code,200)
        uses=self.client.get(f'/cms/api/media/{mid}/usage').json['uses']
        self.assertTrue(any(u['label']=='Versión retenida' for u in uses))

    def test_pdf_attachment_and_pagination_limits(self):
        h=self.login();metadata={'title':'Documento sintético','alt':'','origin':'Prueba propia','rightsStatus':'approved','reviewStatus':'approved'}
        response=self.client.post('/cms/api/media',data={**metadata,'file':(io.BytesIO(pdf()),'guide.pdf')},headers=h)
        self.assertEqual(response.status_code,201,response.text);mid=response.json['item']['id']
        d=self.draft();d['document']['resources'][0]['attachments']=[mid];d=self.save(d,h).json
        self.assertEqual(self.client.post('/cms/api/publish',json={'revision':d['revision']},headers=h).status_code,200)
        response=self.app.test_client().get(f'/media/{mid}/download')
        self.assertEqual(response.status_code,200);self.assertEqual(response.mimetype,'application/pdf')
        self.assertIn('attachment',response.headers['Content-Disposition'])
        response.close()
        for endpoint in ('resources','users','revisions','media','demo-requests'):
            self.assertEqual(self.client.get(f'/cms/api/{endpoint}?limit=51').status_code,400)
            self.assertEqual(self.client.get(f'/cms/api/{endpoint}?cursor=-1').status_code,400)

    def test_retention_removes_only_expired_records_and_preserves_editorial_data(self):
        instant=datetime.now(timezone.utc)
        stale=(instant-timedelta(days=91)).isoformat(timespec='seconds')
        recent=(instant-timedelta(days=1)).isoformat(timespec='seconds')
        for n in range(2):
            self.client.post('/growth-api/demo-requests',json=self.request_body(),headers={'Idempotency-Key':str(uuid.uuid4())})
        with database(self.root,True) as con:
            ids=[row['id'] for row in con.execute('SELECT id FROM demo_requests ORDER BY id')]
            con.execute('UPDATE demo_requests SET updated_at=? WHERE id=?',(stale,ids[0]))
            con.execute('UPDATE demo_requests SET created_at=?,updated_at=? WHERE id=?',(stale,recent,ids[1]))
            con.execute('UPDATE events SET received_at=?',(stale,))
            con.execute("INSERT INTO sessions VALUES('expired-token',1,'expired-csrf',1)")
            con.execute("INSERT INTO rate_limits VALUES('expired-key',1,1)")
            before=con.execute('SELECT COUNT(*) FROM publications').fetchone()[0]
        counts=purge_expired_data(self.root,instant)
        self.assertEqual(counts['requests'],1);self.assertEqual(counts['events'],2)
        self.assertEqual(counts['sessions'],1);self.assertEqual(counts['rateLimits'],1)
        with database(self.root) as con:
            self.assertEqual(con.execute('SELECT COUNT(*) FROM demo_requests').fetchone()[0],1)
            self.assertEqual(con.execute('SELECT COUNT(*) FROM publications').fetchone()[0],before)
            self.assertEqual(con.execute('SELECT COUNT(*) FROM users').fetchone()[0],1)

    def test_invalid_value_types_are_validation_errors(self):
        h=self.login()
        for bad_value in ([],{},True,None):
            for key in ('type','role','topic','status','externalMediaUrl','body','attachments'):
                d=self.draft();d['document']['resources'][0][key]=bad_value
                # Empty attachment array is explicitly valid.
                if key=='attachments' and bad_value==[]:continue
                self.assertEqual(self.save(d,h).status_code,400,(key,bad_value))
            request_body=self.request_body();request_body['role']=bad_value
            self.assertEqual(self.client.post('/growth-api/demo-requests',json=request_body,headers={'Idempotency-Key':str(uuid.uuid4())}).status_code,400)

    def test_password_reset_during_login_cannot_create_stale_session(self):
        def verify_then_reset(stored_hash,password):
            accepted=check_password_hash(stored_hash,password)
            reset_staff_password(self.root,'owner','Reset-during-login-981!')
            return accepted
        with patch('growth.server.app.check_password_hash',side_effect=verify_then_reset):
            response=self.client.post('/cms/api/login',json={'username':'owner','password':OWNER_PASSWORD})
        self.assertEqual(response.status_code,401)
        self.assertEqual(self.client.get('/cms/api/session').status_code,401)

    def test_analytics_resource_reference_uses_published_id(self):
        event={'eventId':str(uuid.uuid4()),'flowId':str(uuid.uuid4()),'event':'resource_viewed','placement':'resource','consentVersion':'2026-11-07','resourceId':'before-tour'}
        self.assertEqual(self.client.post('/growth-api/events',json=event).status_code,202)
        self.assertEqual(self.client.post('/growth-api/events',json={**event,'eventId':str(uuid.uuid4()),'resourceId':'antes-del-tour'}).status_code,400)

    def test_template_media_context_contains_only_referenced_safe_metadata(self):
        h=self.login()
        metadata={'title':'Imagen adjunta visible','alt':'Alt editorial autorizado','origin':'Creación sintética','rightsStatus':'approved','reviewStatus':'approved'}
        response=self.client.post('/cms/api/media',data={**metadata,'file':(io.BytesIO(photo()),'private-filename.png')},headers=h)
        self.assertEqual(response.status_code,201);mid=response.json['item']['id']
        self.client.post('/cms/api/media',data={**metadata,'title':'Archivo no referenciado','file':(io.BytesIO(photo(color='red')),'unlinked.png')},headers=h)
        template='{% for id,item in media_items|default({})|items %}{{ id }}|{{ item.title }}|{{ item.alt }}|{{ item.mime }}|{{ item.filename|default("not-exposed") }};{% endfor %}'
        self.app.jinja_loader=DictLoader({'resource.html':template,'landing.html':template})
        d=self.draft();d['document']['resources'][0]['attachments']=[mid];d=self.save(d,h).json
        self.assertNotIn('Imagen adjunta visible',self.app.test_client().get('/mediahub/antes-del-tour/').text)
        preview=self.client.get('/cms/preview/?resource=antes-del-tour')
        self.assertIn('Imagen adjunta visible',preview.text)
        self.assertIn('Alt editorial autorizado',preview.text)
        self.assertIn('image/png',preview.text)
        self.assertIn('not-exposed',preview.text)
        self.assertNotIn('Archivo no referenciado',preview.text)
        self.client.post('/cms/api/publish',json={'revision':d['revision']},headers=h)
        public=self.app.test_client().get('/mediahub/antes-del-tour/')
        self.assertIn('Imagen adjunta visible',public.text)
        self.assertNotIn('private-filename.png',public.text)
        self.assertNotIn('Archivo no referenciado',public.text)

    def test_diagnostic_metric_counts_consented_started_flows_and_intersection(self):
        self.login()
        empty=self.client.get('/cms/api/metrics').json
        self.assertEqual(empty.get('diagnostic'),{'startedFlows':0,'completedFlows':0,'completionRate':None})
        def emit(flow,event):
            payload={'eventId':str(uuid.uuid4()),'flowId':flow,'event':event,'placement':'result' if event=='diagnostic_completed' else 'hero','consentVersion':'2026-11-07'}
            response=self.client.post('/growth-api/events',json=payload)
            self.assertEqual(response.status_code,202,response.text)
            return payload['eventId']
        first,second,third,orphan,expired,unconsented=[str(uuid.uuid4()) for _ in range(6)]
        for flow in (first,second,third):emit(flow,'diagnostic_started')
        emit(first,'diagnostic_started')
        emit(first,'diagnostic_completed');emit(first,'diagnostic_completed')
        emit(orphan,'diagnostic_completed')
        emit(expired,'diagnostic_started');emit(expired,'diagnostic_completed')
        emit(unconsented,'diagnostic_started');emit(unconsented,'diagnostic_completed')
        with database(self.root,True) as con:
            old=(datetime.now(timezone.utc)-timedelta(days=31)).isoformat(timespec='seconds')
            con.execute('UPDATE events SET received_at=? WHERE flow_id=?',(old,expired))
            con.execute('UPDATE events SET consent_version=NULL WHERE flow_id=?',(unconsented,))
        metrics=self.client.get('/cms/api/metrics')
        self.assertEqual(metrics.json.get('diagnostic'),{'startedFlows':3,'completedFlows':1,'completionRate':33.33})
        self.assertNotIn(first,metrics.text)
        self.assertNotIn('flow_id',metrics.text)


if __name__=='__main__':unittest.main()
