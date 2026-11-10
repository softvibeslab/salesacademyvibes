// Local contract integration: the real UI controller talks to the real API.
// This never accepts a remote base URL and never uses production credentials.
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { randomBytes, randomUUID, scryptSync } from 'node:crypto';
import { mkdtempSync, writeFileSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { TourRegistration, registrationMarkup, registrationPayload, preparationPrompt } from '../tour-registration.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const state = mkdtempSync(path.join(tmpdir(), 'tour-contract-'));
const port = 22000 + Math.floor(Math.random() * 2000);
const base = `http://127.0.0.1:${port}`;
const password = randomBytes(24).toString('base64url');
const salt = randomBytes(24);
const credentials = path.join(state, 'credentials.json');
writeFileSync(credentials, JSON.stringify({ users: { ana: {
  version: randomUUID(), salt: salt.toString('hex'),
  hash: scryptSync(password, salt, 32, { N:16384,r:8,p:1 }).toString('hex'), n:16384,r:8,p:1,
} } }), { mode:0o600 });
let child, cookie = '';
async function request(route, { method = 'GET', body, signal } = {}) {
  const response = await fetch(base + route, { method, signal,
    headers: { Cookie:cookie, Origin:base, 'Content-Type':'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) throw Object.assign(new Error(data.error), { status:response.status, ...data });
  if (route === '/api/login') cookie = response.headers.get('set-cookie').split(';')[0];
  return data;
}
async function start() {
  child = spawn('python3', [path.join(root,'server/ops_api.py')], {
    env: { ...process.env, OPS_DATA:path.join(state,'ops.json'), OPS_PORT:String(port),
      OPS_COOKIE_SECURE:'0', OPS_AUTH_MODE:'private', OPS_PRIVATE_CREDENTIALS_FILE:credentials,
      OPS_TOUR_REGISTRATION_ENABLED:'1', OPS_TOUR_REGISTRATION_MODE:'private', OPS_TIME_ZONE:'America/Cancun' },
    stdio:['ignore','ignore','inherit'],
  });
  for (let i=0;i<60;i++) {
    try { await request('/api/health'); return; } catch { await new Promise(resolve=>setTimeout(resolve,50)); }
  }
  throw new Error('The local API did not start.');
}
async function stop() {
  if (!child || child.exitCode !== null) return;
  const stopped = new Promise(resolve=>child.once('exit',resolve)); child.kill(); await stopped;
}
try {
  await start();
  const { user } = await request('/api/login', { method:'POST', body:{username:'ana',password} });
  const capabilities = await request('/api/tour-registrations/capabilities');
  assert.equal(capabilities.canRegister,true);
  const controller = new TourRegistration({ request });
  controller.setSession(user,capabilities); controller.start(capabilities.operationalDate);
  controller.choose('survey');
  const fixture = path.resolve(root,'../../work/features/2026-11-08-tour-registration/fixtures/survey-demo.png');
  controller.setPhoto({ image:readFileSync(fixture).toString('base64'),mime:'image/png' });
  await controller.preview();
  assert.equal(controller.state.step,'form');
  for (const [key,value] of Object.entries({primaryName:'Visitante QA',companionName:'Pareja QA',start:'18:30',end:'19:30',language:'es',notes:'Contexto sintético privado'})) controller.update(key,value);
  assert.equal(controller.review(),true); controller.setReview(true);
  const payload = registrationPayload(controller.state.draft,user);
  await Promise.all([controller.submit(),controller.submit()]);
  assert.equal(controller.state.step,'success',controller.state.error);
  const saved = controller.state.saved;
  assert.match(saved.visit.lead,/^Lead #\d{4}$/);
  assert.equal(saved.visit.result,undefined);
  assert.equal(controller.state.draft.primaryName,'');
  assert.match(registrationMarkup(controller.state),/Tour listo/);
  const replay = await request('/api/tour-registrations',{method:'POST',body:payload});
  assert.equal(replay.visit.id,saved.visit.id);
  const list = await request(`/api/tour-registrations?date=${capabilities.operationalDate}`);
  assert.equal(list.registrations.length,1);
  for (const route of ['/api/tours',`/api/context?today=${capabilities.operationalDate}`]) {
    const json = JSON.stringify(await request(route));
    assert.doesNotMatch(json,/Visitante QA|Pareja QA|Contexto sintético privado/);
  }
  assert.doesNotMatch(preparationPrompt(saved.registration),/Visitante QA|Pareja QA|Contexto sintético privado/);
  const conflict = new TourRegistration({request}); conflict.setSession(user,capabilities); conflict.start(capabilities.operationalDate); conflict.choose('manual');
  for (const [key,value] of Object.entries({primaryName:'Otra pareja QA',start:'18:45',end:'19:45'})) conflict.update(key,value);
  conflict.review(); conflict.setReview(true); await conflict.submit();
  assert.equal(conflict.state.errorCode,'schedule_conflict');
  assert.equal(conflict.state.draft.primaryName,'Otra pareja QA');
  await stop(); await start();
  await request('/api/login',{method:'POST',body:{username:'ana',password}});
  const persisted = await request(`/api/tour-registrations/${saved.visit.id}`);
  assert.equal(persisted.registration.visitors.primaryName,'Visitante QA');
  await request('/api/logout',{method:'POST',body:{}});
  await conflict.detail(saved.visit.id);
  assert.equal(conflict.state.user,null);
  assert.equal(conflict.state.draft.primaryName,'');
  assert.equal(conflict.state.saved,null);
  console.log('PASS controller ↔ real API: survey/manual, review, double submit, replay, conflict recovery, privacy, restart, expiry.');
} finally {
  await stop(); rmSync(state,{recursive:true,force:true});
}
