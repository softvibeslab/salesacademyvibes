import test from 'node:test';
import assert from 'node:assert/strict';
import { TourRegistration, registrationMarkup } from '../tour-registration.js';
import { opsRequest } from '../ops-api.js';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
function model() { const c = new TourRegistration({ uuid: () => '22222222-2222-4222-8222-222222222222' }); c.setSession({ id: 'ana', role: 'rep', roomId: 'norte' }, { enabled: true, canRegister: true, mode: 'demo', operationalDate: '2026-11-06' }); c.start(); return c; }
test('choice names both paths and exposes demo notice', () => {
  const html = registrationMarkup(model().state, { roomLabel: 'Sala Demo', userLabel: 'Ana Demo' });
  assert.match(html, /Foto del survey/); assert.match(html, /Ingresar información/); assert.match(html, /Datos de ejemplo/);
});
test('manual form has associated labels, safe escaping and progressive disclosure', () => {
  const c = model(); c.choose('manual'); c.update('primaryName', '<script>bad</script>'); const html = registrationMarkup(c.state, {});
  for (const name of ['primaryName', 'companionName', 'date', 'start', 'end']) { assert.match(html, new RegExp(`for="tr-${name}"`)); assert.match(html, new RegExp(`id="tr-${name}"`)); }
  assert.doesNotMatch(html, /<script>bad/); assert.match(html, /&lt;script&gt;/); assert.match(html, /<details[^>]*>/); assert.doesNotMatch(html, /<details[^>]* open/); assert.match(html, /Revisar resumen/);
});
test('summary requires explicit confirmation and separate final action', () => {
  const c = model(); c.choose('manual'); for (const [k,v] of Object.entries({primaryName:'Ana Demo',date:'2026-11-06',start:'10:30',end:'11:30'})) c.update(k,v); c.review();
  const html = registrationMarkup(c.state, {}); assert.match(html, /Revisé la información/); assert.match(html, /Registrar tour/); assert.match(html, /Editar/);
});
test('structured API errors are preserved and abort signal passes through', async () => {
  const original = globalThis.fetch; let seen; const controller = new AbortController();
  globalThis.fetch = async (_path, opts) => { seen = opts; return { ok:false, status:409, json:async () => ({ok:false, code:'schedule_conflict', error:'Revisa horario', fields:{start:'Ocupado'}}) }; };
  try { await assert.rejects(opsRequest('/api/tour-registrations', { method:'POST', body:{}, signal:controller.signal }), error => error.status === 409 && error.code === 'schedule_conflict' && error.fields.start === 'Ocupado'); assert.equal(seen.signal, controller.signal); } finally { globalThis.fetch = original; }
});
test('logout clears the local session before a slow network revocation completes', async () => {
  const source = readFileSync(new URL('../agenda.js', import.meta.url), 'utf8');
  const code = source.slice(source.indexOf('async function logout() {'), source.indexOf('/* ---------- Evidencia'));
  let finish, cleared = false;
  const context = vm.createContext({ opsRequest: () => new Promise(resolve=>{ finish=resolve; }), tours: {visits:[{id:'private'}],ready:true}, signedOut: () => {cleared=true;} });
  vm.runInContext(code, context); const pending = vm.runInContext('logout()', context);
  try { assert.equal(cleared, true); } finally { finish?.({}); await pending; }
});
