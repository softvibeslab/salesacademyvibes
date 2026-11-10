import test from 'node:test';
import assert from 'node:assert/strict';
import { TourRegistration, validateDraft, registrationPayload, imageBodyFits, preparationPrompt } from '../tour-registration.js';

const caps = { enabled: true, canRegister: true, mode: 'private', operationalDate: '2026-11-10', timeZone: 'America/Cancun', ocrAvailable: true };
const user = { id: 'rep_a', role: 'rep', roomId: 'sala_a', name: 'Asesor Demo' };
function setup(request = async () => ({}), revoke = () => {}) {
  const c = new TourRegistration({ request, revokeObjectURL: revoke, uuid: () => '11111111-1111-4111-8111-111111111111' });
  c.setSession(user, caps); c.start(); c.choose('manual'); return c;
}
function valid(c) { c.update('primaryName', 'Ana Demo'); c.update('date', '2026-11-10'); c.update('start', '10:30'); c.update('end', '11:30'); }
test('uses operational date and starts with optional context closed', () => {
  const c = setup(); assert.equal(c.state.draft.date, caps.operationalDate); assert.equal(c.state.draft.primaryName, ''); assert.equal(c.state.optionalOpen, false);
});
test('validates required name, real dates, clock order and optional contact', () => {
  const errors = validateDraft({ primaryName: '', companionName: '', date: '2026-02-30', start: '11:30', end: '10:30', language: '', interests: [], notes: '', contactType: 'email', contactValue: 'bad' });
  for (const field of ['primaryName', 'date', 'end', 'contactValue']) assert.ok(errors[field], field);
  const c = setup(); valid(c); assert.deepEqual(validateDraft(c.state.draft), {});
});
test('manual capture maps only contract fields and never assigns another rep', () => {
  const c = setup(); valid(c); c.update('companionName', 'Luis Demo'); c.setReview(true);
  const payload = registrationPayload(c.state.draft, user);
  assert.deepEqual(payload.visitors, { primaryName: 'Ana Demo', companionName: 'Luis Demo' });
  assert.equal(payload.contact, null); assert.equal(payload.reviewConfirmed, true); assert.equal('repId' in payload, false); assert.equal('roomId' in payload, false);
});
test('late OCR never overwrites a human correction and manual values survive switching', async () => {
  let resolve; const c = setup(() => new Promise(r => { resolve = r; }));
  c.choose('survey'); c.setPhoto({ image: 'YQ==', mime: 'image/jpeg', url: 'blob:one' });
  const pending = c.preview(); c.update('primaryName', 'Ana corregida');
  resolve?.({ candidates: { primaryName: { value: 'Ana OCR', source: 'survey', state: 'review' }, language: { value: 'es', source: 'survey', state: 'review' } }, warnings: [] });
  await pending; assert.equal(c.state.draft.primaryName, 'Ana corregida'); assert.equal(c.state.draft.language, 'es');
  c.choose('manual'); assert.equal(c.state.draft.primaryName, 'Ana corregida');
});
test('logout revokes photo and ignores inflight preview from previous user', async () => {
  let resolve; const revoked = []; const c = setup(() => new Promise(r => { resolve = r; }), url => revoked.push(url));
  c.setPhoto({ image: 'YQ==', mime: 'image/jpeg', url: 'blob:private' }); const pending = c.preview();
  c.setSession(null, caps); resolve?.({ candidates: { primaryName: { value: 'Ana OCR', source: 'survey', state: 'review' } } }); await pending;
  assert.equal(c.state.user, null); assert.equal(c.state.photo, null); assert.equal(c.state.draft.primaryName, ''); assert.deepEqual(revoked, ['blob:private']);
});
test('saving requires review, blocks double click and succeeds once', async () => {
  let resolve; const calls = []; const c = setup((url, options) => { calls.push({ url, options }); return new Promise(r => { resolve = r; }); }); valid(c);
  await c.submit(); assert.equal(calls.length, 0); assert.ok(c.state.errors.reviewConfirmed);
  c.setReview(true); const first = c.submit(); const second = c.submit();
  assert.equal(calls.length, 1); assert.equal(calls[0].url, '/api/tour-registrations'); assert.equal(calls[0].options.actor, undefined);
  resolve?.({ visit: { id: 'v-new', lead: 'Lead #8001' }, registration: { tourId: 'v-new', date: '2026-11-10', visitors: { primaryName: 'Ana Demo' } } }); await Promise.all([first, second]);
  assert.equal(c.state.step, 'success'); assert.equal(c.state.saved.visit.id, 'v-new'); assert.equal(c.state.photo, null);
});
test('409 and network retries preserve draft and the same request id', async () => {
  const calls = []; const c = setup(async (_url, { body }) => { calls.push(body); throw Object.assign(new Error('Horario ocupado'), { status: 409, code: 'schedule_conflict', fields: { start: 'Revisa el horario' } }); }); valid(c); c.setReview(true);
  await c.submit(); await c.submit(); assert.equal(calls.length, 2); assert.equal(calls[0].requestId, calls[1].requestId); assert.equal(c.state.draft.primaryName, 'Ana Demo'); assert.equal(c.state.errors.start, 'Revisa el horario'); assert.equal(c.state.busy, false);
});
test('401 clears draft and photo, disabled capabilities prevent requests', async () => {
  let count = 0; const c = setup(async () => { count++; throw Object.assign(new Error('Sesión vencida'), { status: 401 }); }); valid(c); c.setReview(true); c.setPhoto({ image: 'YQ==', mime: 'image/jpeg', url: 'blob:expired' }); await c.submit();
  assert.equal(c.state.user, null); assert.equal(c.state.draft.primaryName, ''); assert.equal(c.state.photo, null);
  c.setSession(user, { ...caps, enabled: false }); c.start(); valid(c); c.setReview(true); await c.submit(); assert.equal(count, 1);
});
test('preparation exposes only a valid anonymous reference', () => {
  const prompt = preparationPrompt({ lead: 'Lead #8123', visitors: { primaryName: 'Nombre privado' }, contact: { value: 'private@example.invalid' }, notes: 'privado' });
  assert.match(prompt, /Lead #8123/); assert.doesNotMatch(prompt, /Nombre|private@|privado/); assert.doesNotMatch(preparationPrompt({ lead: 'Nombre privado' }), /Nombre privado/);
});
test('image envelope respects both decoded and 2MB JSON limits', () => {
  assert.equal(imageBodyFits('a'.repeat(2_000_000), 'image/jpeg'), false);
  assert.equal(imageBodyFits('a'.repeat(1_900_000), 'image/jpeg'), true);
});
test('permission loss clears already held private data', async () => {
  const c = setup(async () => { throw Object.assign(new Error('Permiso cambiado'), {status:403}); }); valid(c); c.setReview(true); c.setPhoto({image:'YQ==',mime:'image/jpeg',url:'blob:denied'}); await c.submit();
  assert.equal(c.state.draft.primaryName, ''); assert.equal(c.state.photo, null); assert.equal(c.state.capabilities.canRegister, false);
});
test('a slower detail cannot replace the most recently selected tour', async () => {
  const pending = []; const c = setup(() => new Promise(resolve=>pending.push(resolve)));
  const first = c.detail('a'); const second = c.detail('b');
  pending[1]({registration:{tourId:'b'}}); await second; pending[0]({registration:{tourId:'a'}}); await first;
  assert.equal(c.state.saved.registration.tourId, 'b');
});
test('starting a fresh capture does not inherit a previous private detail context', async () => {
  const c = setup(async () => ({registration:{tourId:'old',repId:'other'}})); await c.detail('old'); c.start('2026-11-11');
  assert.equal(c.state.saved, null);
});
test('phone contact needs 7 to 15 digits, not only spacing and punctuation', () => {
  const c = setup(); valid(c); c.update('contactType','phone'); c.update('contactValue','--- ---');
  assert.ok(validateDraft(c.state.draft).contactValue);
});
