import {test} from 'node:test';
import assert from 'node:assert/strict';
import {buildSummary,buildWhatsAppUrl,safeResourceUrl,appointmentError} from '../site/assets/advisor.mjs';

test('review summary contains qualification and explicit pending preference',()=>{
 const s=buildSummary({name:'Ana demo',role:'leader',roomCountBucket:'2-3',teamSize:'24 reps',need:'Practicar objeciones',timeframe:'Este mes',preferredDate:'2027-01-20',preferredTime:'10:30',timezone:'America/Cancun'});
 for(const term of ['Ana demo','Líder','2–3','24 reps','Practicar objeciones','Este mes','2027-01-20','10:30','America/Cancun'])assert.ok(s.includes(term));
 assert.match(s,/confirmar/);
});
test('WhatsApp is encoded to the approved Chris number without sending',()=>{
 const u=new URL(buildWhatsAppUrl('Texto revisado & interés + detalles'));assert.equal(u.origin,'https://wa.me');assert.equal(u.pathname,'/529843163268');
 assert.match(u.searchParams.get('text'),/Texto revisado & interés \+ detalles/);assert.match(u.searchParams.get('text'),/pendiente/);
});
test('only a public local MediaHub resource may be rendered as an agent link',()=>{
 assert.equal(safeResourceUrl('/mediahub/antes-del-tour/'),'/mediahub/antes-del-tour/');
 for(const value of ['javascript:alert(1)','https://evil.example/','//evil.example','/cms/','/mediahub/../cms/','/mediahub/demo/?q=secret','/mediahub/a%2fb/'])assert.equal(safeResourceUrl(value),null);
});
test('appointment requires matching date/time and an IANA timezone',()=>{
 assert.equal(appointmentError({preferredDate:'',preferredTime:'',timezone:'America/Cancun'}),'');
 assert.ok(appointmentError({preferredDate:'2027-01-20',preferredTime:'',timezone:'America/Cancun'}));
 assert.ok(appointmentError({preferredDate:'',preferredTime:'10:30',timezone:'America/Cancun'}));
 assert.ok(appointmentError({preferredDate:'2027-01-20',preferredTime:'10:30',timezone:'Not/AZone'}));
 assert.equal(appointmentError({preferredDate:'2027-01-20',preferredTime:'10:30',timezone:'America/Cancun'}),'');
 assert.match(appointmentError({preferredDate:'2026-11-07',preferredTime:'08:00',timezone:'America/Cancun'},new Date('2026-11-07T15:00:00Z')),/futuras/);
 assert.equal(appointmentError({preferredDate:'2026-11-07',preferredTime:'11:00',timezone:'America/Cancun'},new Date('2026-11-07T15:00:00Z')),'');
});
