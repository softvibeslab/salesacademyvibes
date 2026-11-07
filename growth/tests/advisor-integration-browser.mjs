/** Full browser/Flask/SQLite flow. The runner injects a deterministic model. */
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.GROWTH_PLAYWRIGHT_MODULE||'playwright');
const base=process.env.GROWTH_E2E_URL;
assert.match(base,/^http:\/\/127\.0\.0\.1:\d+$/);
const evidence=process.env.GROWTH_EVIDENCE_DIR||'work/features/2026-11-07-sales-advisor/evidence/integration';
await mkdir(evidence,{recursive:true});
const report={startedAt:new Date().toISOString(),base,results:[],errors:[],syntheticData:true,whatsappOpened:false};
const browser=await chromium.launch({headless:true});
const contexts=[];
async function check(name,work){try{await work();report.results.push({name,passed:true});console.log(`PASS ${name}`);}catch(e){report.results.push({name,passed:false,error:String(e)});throw e;}}
async function context(width=390){const ctx=await browser.newContext({baseURL:base,viewport:{width,height:900}});contexts.push(ctx);await ctx.route('https://wa.me/**',r=>r.abort());const page=await ctx.newPage();page.setDefaultTimeout(12000);page.on('pageerror',e=>report.errors.push(e.message));return{ctx,page};}
try{
 const visitor=await context();let leadId;
 await check('Real session cookie and CSRF support the conversation without CMS login',async()=>{
  await visitor.page.goto('/descubre/',{waitUntil:'networkidle'});
  await visitor.page.locator('[data-advisor-open]').click();
  await visitor.page.locator('#sa-advisor-message').fill('¿Cómo ayuda Sales Academy a practicar objeciones?');
  const reply=visitor.page.waitForResponse(r=>r.url().endsWith('/advisor/messages'));
  await visitor.page.getByRole('button',{name:'Enviar pregunta',exact:true}).click();
  const res=await reply;assert.equal(res.status(),200);const data=await res.json();assert.ok(data.reply.length>20);
  await visitor.page.locator('.advisor-message-assistant').filter({hasText:data.reply}).waitFor();
  const cookie=(await visitor.ctx.cookies()).find(c=>c.name==='sa_advisor_session');assert.ok(cookie);assert.equal(cookie.httpOnly,true);assert.equal(cookie.sameSite,'Strict');
  report.reply=data.reply;
 });
 await check('Consented request is persisted with pending confirmation and an editable WhatsApp summary',async()=>{
  await visitor.page.getByRole('button',{name:'Coordinar demo',exact:true}).click();
  const form=visitor.page.locator('#sa-advisor-demo-form');
  await form.locator('[name=name]').fill('Persona de prueba');await form.locator('[name=contact]').fill('prueba@example.invalid');
  await form.locator('[name=role]').selectOption('leader');await form.locator('[name=roomCountBucket]').selectOption('2-3');
  await form.locator('[name=teamSize]').fill('24 representantes simulados');await form.locator('[name=need]').fill('Práctica de objeciones');
  await form.locator('[name=timeframe]').fill('Próximo mes');await form.locator('[name=timezone]').selectOption('America/Cancun');
  await visitor.page.getByRole('button',{name:'Preparar mi solicitud',exact:true}).click();
  await visitor.page.locator('#sa-advisor-summary').fill('Solicitud sintética de prueba: tres salas. <script>window.leaked=true</script>');
  const wa=new URL(await visitor.page.locator('[data-advisor-whatsapp]').getAttribute('href'));assert.equal(wa.pathname,'/529843163268');assert.match(wa.searchParams.get('text'),/Solicitud sintética/);
  await visitor.page.locator('#sa-advisor-contact-consent').check();
  const saved=visitor.page.waitForResponse(r=>r.url().endsWith('/advisor/leads'));
  await visitor.page.getByRole('button',{name:'Guardar solicitud para seguimiento',exact:true}).click();
  const response=await saved;assert.equal(response.status(),201);const body=await response.json();assert.equal(body.status,'pending_confirmation');leadId=body.id;
  await visitor.page.locator('#sa-advisor-save-status').filter({hasText:leadId}).waitFor();
  report.leadId=leadId;
  await visitor.page.screenshot({path:`${evidence}/visitor-request.png`});
 });
 await check('A second visitor has no access to the first visitor conversation',async()=>{
  const other=await context();await other.page.goto('/mediahub/',{waitUntil:'networkidle'});
  const response=other.page.waitForResponse(r=>r.url().endsWith('/advisor/session'));
  await other.page.locator('[data-advisor-open]').click();const data=await (await response).json();assert.deepEqual(data.messages,[]);
  assert.equal(await other.page.locator('#sa-advisor-messages').innerText().then(t=>t.includes('¿Cómo ayuda Sales Academy')),false);
 });
 async function login(page,user){await page.goto('/cms/',{waitUntil:'networkidle'});await page.getByLabel('Usuario',{exact:true}).fill(user);await page.getByLabel('Contraseña',{exact:true}).fill(process.env.GROWTH_E2E_PASSWORD);await page.getByRole('button',{name:'Entrar al CMS'}).click();await page.locator('#cms-shell').waitFor({state:'visible'});}
 await check('Owner sees the real consented lead, escaped summary and updates follow-up',async()=>{
  const owner=await context(1440);await login(owner.page,'e2e-owner');await owner.page.getByRole('button',{name:'Asesor IA',exact:false}).click();
  const row=owner.page.locator('.cms-table tbody tr').filter({hasText:leadId});await row.waitFor();
  assert.match(await row.innerText(),/Solicitud sintética de prueba/);assert.match(await row.innerText(),/<script>/);
  assert.equal(await owner.page.evaluate(()=>window.leaked),undefined);
  assert.equal(await row.locator('select').inputValue(),'pending_confirmation');await row.locator('select').selectOption('qualified');
  const updated=owner.page.waitForResponse(r=>r.url().endsWith('/cms/api/advisor-leads')&&r.request().method()==='PATCH');
  await row.getByRole('button',{name:'Guardar seguimiento'}).click();assert.equal((await updated).status(),200);
  await owner.page.locator('#cms-status').filter({hasText:'Seguimiento del asesor actualizado'}).waitFor();
  assert.equal(await owner.page.locator('.cms-table tbody tr').filter({hasText:leadId}).locator('select').inputValue(),'qualified');
  await owner.page.screenshot({path:`${evidence}/cms-advisor-owner.png`});
 });
 await check('Editor cannot see or read advisor leads',async()=>{
  const editor=await context();await login(editor.page,'e2e-editor');assert.equal(await editor.page.locator('#cms-nav [data-page=advisor]').count(),0);
  const res=await editor.ctx.request.get(base+'/cms/api/advisor-leads');assert.equal(res.status(),403);
 });
 assert.deepEqual(report.errors,[]);report.ok=true;
}catch(e){report.ok=false;report.error=String(e);throw e;}finally{report.finishedAt=new Date().toISOString();await writeFile(`${evidence}/results.json`,JSON.stringify(report,null,2));await Promise.all(contexts.map(c=>c.close()));await browser.close();}
