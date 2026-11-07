"""Public advisor acceptance: synthetic visitors and an injected model client only."""
import copy
import json
import tempfile
import time
import unittest
import uuid
from concurrent.futures import ThreadPoolExecutor
from contextlib import contextmanager
from threading import Event
from unittest.mock import patch
from datetime import datetime, timedelta, timezone
from pathlib import Path
from urllib.parse import parse_qs, urlparse

from growth.server.app import create_app, create_staff
from growth.server.store import database, digest, encode, purge_expired_data
from growth.tests.test_backend import seed


class AdvisorAcceptance(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.root = Path(self.tmp.name)
        self.calls = []
        def model(messages):
            self.calls.append(copy.deepcopy(messages))
            return 'Puedes practicar antes del tour. La demo se coordina con Chris.'
        self.config = dict(DATA_ROOT=str(self.root), TESTING=True, COOKIE_SECURE=False,
                           RATE_LIMIT_ENABLED=False, PUBLIC_CONTACT_ENABLED=False,
                           ADVISOR_ENABLED=True, ADVISOR_CLIENT=model, SEED_DOCUMENT=seed())
        self.app = create_app(self.config)
        self.client = self.app.test_client()

    def tearDown(self):
        self.tmp.cleanup()

    def session(self, client=None):
        client = client or self.client
        response = client.get('/growth-api/advisor/session')
        self.assertEqual(response.status_code, 200, response.text)
        self.assertEqual(response.json['enabled'], True)
        return {'X-Advisor-CSRF': response.json['csrf']}

    def chat(self, message='¿Cómo preparo el tour?', client=None, headers=None, request_id=None):
        client = client or self.client
        return client.post('/growth-api/advisor/messages', json={
            'message': message, 'requestId': request_id or str(uuid.uuid4())},
            headers=headers or self.session(client))

    def lead(self, **changes):
        value = dict(requestId=str(uuid.uuid4()), name='Persona de prueba', contact='qa@example.invalid',
                     role='leader', roomCountBucket='2-3', teamSize='12', need='Practicar objeciones',
                     timeframe='Este mes', preferredDate=(datetime.now(timezone.utc)+timedelta(days=3)).date().isoformat(),
                     preferredTime='10:30', timezone='America/Cancun', summary='Solicito una demo para entrenamiento.',
                     contactConsent=True, privacyVersion='2026-11-07-advisor')
        value.update(changes)
        return value

    def test_session_cookie_is_separate_no_inference_and_csrf_origin_required(self):
        h = self.session()
        self.assertEqual(self.calls, [])
        cookie = self.client.get_cookie('sa_advisor_session')
        self.assertTrue(cookie.http_only)
        self.assertEqual(cookie.same_site, 'Strict')
        payload = {'message':'Hola', 'requestId':str(uuid.uuid4())}
        self.assertEqual(self.client.post('/growth-api/advisor/messages', json=payload).status_code, 403)
        self.assertEqual(self.client.post('/growth-api/advisor/messages', json=payload, headers={**h,'Origin':'https://evil.invalid'}).status_code, 403)
        self.assertEqual(self.client.get('/growth-api/advisor/session').headers['Cache-Control'], 'no-store')
        self.assertIsNone(self.client.get_cookie('sa_growth_session'))

    def test_real_contract_reply_resources_and_idempotency(self):
        h = self.session(); rid = str(uuid.uuid4())
        response = self.chat(headers=h, request_id=rid)
        self.assertEqual(response.status_code, 200, response.text)
        self.assertEqual(response.json['requestId'], rid)
        self.assertEqual(response.json['remainingTurns'], 19)
        self.assertEqual(response.json['resources'][0]['url'], '/mediahub/antes-del-tour/')
        self.assertEqual(self.chat(headers=h, request_id=rid).json, response.json)
        self.assertEqual(len(self.calls), 1)
        self.assertEqual(self.chat('Otra pregunta', headers=h, request_id=rid).status_code, 409)

    def test_visitors_never_share_history_or_idempotent_responses(self):
        self.assertEqual(self.chat('Mi código sintético es TURQUESA-42').status_code, 200)
        other = self.app.test_client(); h = self.session(other)
        self.assertEqual(other.get('/growth-api/advisor/session').json['messages'], [])
        self.assertEqual(self.chat('¿Cómo funciona?', client=other, headers=h).status_code, 200)
        self.assertNotIn('TURQUESA-42', json.dumps(self.calls[-1]))
        self.assertIn('TURQUESA-42', json.dumps(self.client.get('/growth-api/advisor/session').json['messages']))

    def test_only_current_published_knowledge_is_sent_to_model(self):
        with database(self.root, True) as con:
            doc = seed(); doc['hero']['title'] = 'BORRADOR-PRIVADO-909'
            con.execute('UPDATE draft SET document=?', (json.dumps(doc),))
        self.assertEqual(self.chat().status_code, 200)
        self.assertNotIn('BORRADOR-PRIVADO-909', json.dumps(self.calls[-1]))
        self.assertIn('Confirma tu próximo paso', json.dumps(self.calls[-1], ensure_ascii=False))
        with database(self.root, True) as con:
            doc = seed(); doc['faqs'][0]['answer'] = 'PUBLICADO-ACTUAL-808'
            con.execute('UPDATE publications SET document=? WHERE id=1', (json.dumps(doc),))
        self.chat('Nueva pregunta')
        self.assertIn('PUBLICADO-ACTUAL-808', json.dumps(self.calls[-1]))

    def test_relevant_resource_at_end_of_large_catalog_is_in_context(self):
        doc=seed(); example=doc['resources'][0]
        doc['resources']=[]
        for index in range(12):
            resource=copy.deepcopy(example)
            resource.update(id=f'resource-{index}',slug=f'recurso-{index}',title=f'Recurso {index}',
                            body=[{'type':'paragraph','text':'Contenido general. '*250}])
            doc['resources'].append(resource)
        doc['resources'][-1].update(title='Practicar ZAFIRO',excerpt='Caso ZAFIRO',
                                   body=[{'type':'paragraph','text':'FINAL-RESOURCE-RELEVANT-123'}])
        with database(self.root,True) as con:
            con.execute('UPDATE publications SET document=? WHERE id=1',(encode(doc),))
        response=self.chat('Necesito practicar ZAFIRO')
        self.assertEqual(response.status_code,200)
        self.assertIn('FINAL-RESOURCE-RELEVANT-123',json.dumps(self.calls[-1]))
        self.assertEqual(response.json['resources'][0]['url'],'/mediahub/recurso-11/')

    def test_resources_prioritize_published_title_named_by_reply_over_query_matches(self):
        doc=seed(); example=doc['resources'][0]
        doc['resources']=[]
        for index in range(3):
            resource=copy.deepcopy(example)
            resource.update(id=f'practice-{index}',slug=f'practica-{index}',
                            title=f'Práctica previa {index}',excerpt='Práctica previa para el tour')
            doc['resources'].append(resource)
        named=copy.deepcopy(example)
        named.update(id='coaching-next',slug='coaching-y-agentes',
                     title='Coaching y agentes de IA: el siguiente paso',excerpt='Una guía para líderes')
        private=copy.deepcopy(example)
        private.update(id='private',slug='guia-privada',title='Guía privada',status='draft')
        doc['resources'].extend([named,private])
        with database(self.root,True) as con:
            con.execute('UPDATE publications SET document=? WHERE id=1',(encode(doc),))
        self.app.config['ADVISOR_CLIENT']=lambda messages: (
            'Te recomiendo COACHING   Y AGENTES DE IA:\n EL SIGUIENTE PASO. '
            'Guía privada en https://example.invalid/recurso-inventado también aparece en este fixture sintético.')
        response=self.chat('Quiero práctica previa para el tour')
        self.assertEqual(response.status_code,200,response.text)
        resources=response.json['resources']
        self.assertEqual(resources[0],{'title':named['title'],'url':'/mediahub/coaching-y-agentes/'})
        self.assertEqual(len(resources),3)
        self.assertEqual(len({resource['url'] for resource in resources}),3)
        self.assertNotIn('guia-privada',encode(resources))
        self.assertNotIn('example.invalid',encode(resources))

    def test_request_completed_before_lease_is_not_inferred_twice(self):
        h=self.session();rid=str(uuid.uuid4());message='Pregunta concurrente'
        token_hash=digest(self.client.get_cookie('sa_advisor_session').value)
        result={'reply':'Respuesta ya terminada','resources':[],'requestId':rid,'remainingTurns':19}
        injected=[]
        @contextmanager
        def completion_before_lock(root,write=False):
            # Another worker finishes after the optimistic lookup, before this worker's lock.
            if write and not injected:
                injected.append(True)
                with database(root,True) as con:
                    con.execute('INSERT INTO advisor_replies VALUES(?,?,?,?)',(token_hash,rid,digest(message),encode(result)))
                    con.execute('UPDATE advisor_sessions SET turns=1 WHERE token_hash=?',(token_hash,))
            with database(root,write) as con:
                yield con
        with patch('growth.server.advisor.database',completion_before_lock):
            response=self.chat(message,headers=h,request_id=rid)
        self.assertEqual(response.status_code,200,response.text)
        self.assertEqual(response.json,result)
        self.assertEqual(self.calls,[])

    def test_invalid_input_or_client_tools_never_reach_model(self):
        h = self.session()
        for payload in ({'message':'x'*1201,'requestId':str(uuid.uuid4())},
                        {'message':'','requestId':str(uuid.uuid4())},
                        {'message':'hola','requestId':'bad'},
                        {'message':'hola','requestId':str(uuid.uuid4()),'tools':['shell']}):
            self.assertEqual(self.client.post('/growth-api/advisor/messages',json=payload,headers=h).status_code,400)
        self.assertEqual(self.calls, [])

    def test_model_failure_releases_lease_and_can_retry(self):
        def failing(messages):
            raise TimeoutError('DO-NOT-LEAK-TRANSPORT-DETAILS')
        self.app.config['ADVISOR_CLIENT'] = failing
        h = self.session(); rid = str(uuid.uuid4())
        bad = self.chat(headers=h,request_id=rid)
        self.assertEqual(bad.status_code,503)
        self.assertNotIn('DO-NOT-LEAK',bad.text)
        self.app.config['ADVISOR_CLIENT'] = self.config['ADVISOR_CLIENT']
        self.assertEqual(self.chat(headers=h,request_id=rid).status_code,200)

    def test_daily_and_session_budgets_stop_inference(self):
        self.app.config['ADVISOR_DAILY_LIMIT'] = 1
        self.assertEqual(self.chat().status_code,200)
        self.assertEqual(self.chat('Otra pregunta').status_code,429)
        self.assertEqual(len(self.calls),1)
        self.app.config['ADVISOR_DAILY_LIMIT'] = 200
        with database(self.root,True) as con:
            con.execute('UPDATE advisor_sessions SET turns=20')
        self.assertEqual(self.chat('Tope de sesión').status_code,429)
        self.assertEqual(len(self.calls),1)

    def test_global_concurrency_is_bounded_and_capacity_recovers(self):
        gate = Event(); started = Event(); counter = []
        def waiting(messages):
            counter.append(1)
            if len(counter) == 2:
                started.set()
            gate.wait(5)
            return 'Respuesta de prueba.'
        self.app.config['ADVISOR_CLIENT'] = waiting
        clients = [self.app.test_client() for _ in range(3)]
        headers = [self.session(client) for client in clients]
        with ThreadPoolExecutor(max_workers=2) as pool:
            work = [pool.submit(self.chat, f'Pregunta {index}', clients[index], headers[index]) for index in range(2)]
            try:
                self.assertTrue(started.wait(3))
                self.assertEqual(self.chat('Tercera',clients[2],headers[2]).status_code,429)
                self.assertEqual(len(counter),2)
            finally:
                gate.set()
            self.assertTrue(all(future.result().status_code == 200 for future in work))
        self.assertEqual(self.chat('Ahora sí',clients[2],headers[2]).status_code,200)

    def test_rate_limit_blocks_abuse_and_secure_cookie_in_production(self):
        config={**self.config, 'RATE_LIMIT_ENABLED':True, 'COOKIE_SECURE':True}
        app=create_app(config);client=app.test_client()
        response=client.get('/growth-api/advisor/session',base_url='https://example.invalid')
        self.assertIn('Secure', response.headers['Set-Cookie'])
        h={'X-Advisor-CSRF':response.json['csrf']}
        for _ in range(30):
            response=client.post('/growth-api/advisor/messages',base_url='https://example.invalid',json={'message':'Pregunta','requestId':str(uuid.uuid4())},headers=h)
        response=client.post('/growth-api/advisor/messages',base_url='https://example.invalid',json={'message':'Una más','requestId':str(uuid.uuid4())},headers=h)
        self.assertEqual(response.status_code,429)
        self.assertEqual(response.json['error']['code'],'rate_limited')

    def test_session_expiration_cannot_reveal_old_history(self):
        h=self.session();self.chat('Texto efímero',headers=h)
        with database(self.root,True) as con:
            con.execute('UPDATE advisor_sessions SET expires=1')
        self.assertEqual(self.chat('No reutilizar',headers=h).status_code,401)
        self.assertEqual(self.client.get('/growth-api/advisor/session').json['messages'],[])

    def test_lead_consent_pending_status_and_replay(self):
        h = self.session(); payload = self.lead()
        denied = self.client.post('/growth-api/advisor/leads',json={**payload,'contactConsent':False},headers=h)
        self.assertEqual(denied.status_code,400)
        response = self.client.post('/growth-api/advisor/leads',json=payload,headers=h)
        self.assertEqual(response.status_code,201,response.text)
        self.assertEqual(response.json['status'],'pending_confirmation')
        self.assertIn('https://wa.me/529843163268?text=',response.json['whatsappUrl'])
        replay = self.client.post('/growth-api/advisor/leads',json=payload,headers=h)
        self.assertEqual(replay.status_code,200)
        self.assertEqual(replay.json['id'],response.json['id'])
        self.assertEqual(self.client.post('/growth-api/advisor/leads',json={**payload,'summary':'Cambiado'},headers=h).status_code,409)
        self.assertFalse(self.app.config['PUBLIC_CONTACT_ENABLED'])

    def test_whatsapp_uses_only_reviewed_summary_without_reintroducing_removed_contact(self):
        h=self.session()
        payload=self.lead(name='Nombre quitado',contact='removed@example.invalid',
                          summary='Quiero conocer Sales Academy. Prefiero acordar el horario por aquí.')
        response=self.client.post('/growth-api/advisor/leads',json=payload,headers=h)
        self.assertEqual(response.status_code,201)
        message=parse_qs(urlparse(response.json['whatsappUrl']).query)['text'][0]
        self.assertIn(payload['summary'],message)
        self.assertNotIn(payload['contact'],message)
        self.assertNotIn(payload['name'],message)
        self.assertNotIn(payload['preferredDate'],message)

    def test_date_timezone_and_shape_validation(self):
        h = self.session()
        for change in ({'preferredDate':'2020-01-01'}, {'preferredTime':'25:01'},
                       {'timezone':'Unknown/Island'}, {'preferredDate':''},
                       {'summary':'x'*1501}, {'roomCountBucket':'500'},
                       {'privacyVersion':'old'}, {'status':'confirmed'}):
            response=self.client.post('/growth-api/advisor/leads',json=self.lead(**change),headers=h)
            self.assertEqual(response.status_code,400,(change,response.text))
        self.assertEqual(self.client.post('/growth-api/advisor/leads',json=self.lead(preferredDate='',preferredTime=''),headers=h).status_code,201)

    def test_owner_only_leads_metrics_and_followup(self):
        h = self.session()
        lead=self.client.post('/growth-api/advisor/leads',json=self.lead(),headers=h).json
        self.assertEqual(self.client.get('/cms/api/advisor-leads').status_code,401)
        create_staff(self.root,'owner','Owner-test-only-739!')
        create_staff(self.root,'editor','Editor-test-only-284!','editor')
        owner = self.app.test_client(); auth=owner.post('/cms/api/login',json={'username':'owner','password':'Owner-test-only-739!'}).json
        headers={'X-CSRF-Token':auth['csrf']}
        response=owner.get('/cms/api/advisor-leads');self.assertEqual(response.status_code,200)
        self.assertEqual(response.json['items'][0]['id'],lead['id'])
        self.assertNotIn('requestId',response.text)
        changed=owner.patch('/cms/api/advisor-leads',json={'id':lead['id'],'status':'qualified'},headers=headers)
        self.assertEqual(changed.status_code,200);self.assertEqual(changed.json['item']['status'],'qualified')
        self.assertEqual(owner.patch('/cms/api/advisor-leads',json={'id':lead['id'],'status':'confirmed'},headers=headers).status_code,400)
        metrics=owner.get('/cms/api/advisor-metrics').json
        self.assertEqual(metrics,{'sessions':1,'messages':0,'leads':1,'pendingConfirmation':0,'qualified':1})
        editor=self.app.test_client();editor.post('/cms/api/login',json={'username':'editor','password':'Editor-test-only-284!'})
        self.assertEqual(editor.get('/cms/api/advisor-leads').status_code,403)
        self.assertEqual(editor.get('/cms/api/advisor-metrics').status_code,403)

    def test_expired_sessions_and_leads_are_purged_without_editorial_changes(self):
        h = self.session();self.chat(headers=h)
        self.client.post('/growth-api/advisor/leads',json=self.lead(),headers=h)
        with database(self.root,True) as con:
            con.execute('UPDATE advisor_sessions SET expires=1')
            con.execute("UPDATE advisor_leads SET updated_at='2020-01-01T00:00:00+00:00'")
        purge_expired_data(self.root)
        with database(self.root) as con:
            self.assertEqual(con.execute('SELECT COUNT(*) FROM advisor_sessions').fetchone()[0],0)
            self.assertEqual(con.execute('SELECT COUNT(*) FROM advisor_leads').fetchone()[0],0)
            self.assertEqual(con.execute('SELECT COUNT(*) FROM publications').fetchone()[0],1)

    def test_disabled_advisor_does_not_invoke_model(self):
        self.app.config['ADVISOR_ENABLED'] = False
        response=self.client.get('/growth-api/advisor/session')
        self.assertEqual(response.status_code,200)
        self.assertEqual(response.json['enabled'],False)
        self.assertEqual(self.calls,[])
        self.assertEqual(self.client.post('/growth-api/advisor/messages',json={'message':'hola','requestId':str(uuid.uuid4())},headers={'X-Advisor-CSRF':response.json['csrf']}).status_code,503)


if __name__ == '__main__':
    unittest.main()
