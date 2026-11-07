/** Browser behavior with synthetic API fixtures; never sends WhatsApp messages. */
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.GROWTH_PLAYWRIGHT_MODULE||'playwright');
const base=process.env.GROWTH_E2E_URL||'http://127.0.0.1:4191';
assert.match(base,/^http:\/\/(127\.0\.0\.1|localhost):\d+$/);
const red=process.env.ADVISOR_RED_ONLY==='1';
const vslOnly=process.env.ADVISOR_VSL_ONLY==='1';
const dir=process.env.GROWTH_EVIDENCE_DIR||'work/features/2026-11-07-sales-advisor/evidence/frontend';
await mkdir(dir,{recursive:true});
const browser=await chromium.launch({headless:true});
const report={base,startedAt:new Date().toISOString(),results:[],errors:[],synthetic:true,whatsappOpened:false};
async function check(name,run){try{await run();report.results.push({name,passed:true});console.log(`PASS ${name}`);}catch(e){report.results.push({name,passed:false,error:String(e)});throw e;}}
async function playingFilmDoesNotCollide(page,width){
 await check(`A playing film keeps native controls free of the launcher at ${width}px`,async()=>{
  if(await page.locator('#sa-advisor-dialog').isVisible())await page.keyboard.press('Escape');
  const consent=page.getByRole('button',{name:'Solo lo necesario',exact:true});if(await consent.isVisible())await consent.click();
  const video=page.locator('[data-vsl] video'),launcher=page.locator('[data-advisor-open]');
  await video.evaluate(el=>{const r=el.getBoundingClientRect();window.scrollBy({top:r.bottom-innerHeight+8,behavior:'instant'});});
  await page.locator('[data-vsl] [data-video-play]').click();
  await page.waitForFunction(()=>{const v=document.querySelector('[data-vsl] video');return !v.paused&&v.currentTime>.15;});
  const overlap=await launcher.evaluate(el=>{const r=el.getBoundingClientRect(),v=document.querySelector('[data-vsl] video').getBoundingClientRect();return r.left<v.right&&r.right>v.left&&r.top<v.bottom&&r.bottom>v.top;});
  if(overlap)assert.equal(await launcher.isVisible(),false,'The floating control must not cover a playing movie');
  await video.evaluate(el=>el.pause());await launcher.waitFor({state:'visible'});
 });
}
try{
 for(const width of (red?[390]:[1440,390,360])){
  const ctx=await browser.newContext({baseURL:base,viewport:{width,height:900},reducedMotion:'reduce'});
  const page=await ctx.newPage();page.setDefaultTimeout(10000);page.on('pageerror',e=>report.errors.push(e.message));
  const calls=[];let failNext=false;
  await ctx.route('https://wa.me/**',r=>r.abort());
  await ctx.route('**/growth-api/advisor/**',async route=>{
   const req=route.request(),path=new URL(req.url()).pathname;const body=req.postDataJSON();calls.push({path,body});
   let data;
   if(path.endsWith('/session'))data={csrf:'synthetic-csrf',enabled:true,whatsappUrl:'https://wa.me/529843163268?text=Demo',messages:[],remainingTurns:20};
   else if(path.endsWith('/messages')){
    assert.equal(req.headers()['x-advisor-csrf'],'synthetic-csrf');
    if(failNext){failNext=false;return route.fulfill({status:503,contentType:'application/json',body:JSON.stringify({error:{code:'unavailable',message:'El asesor no está disponible. Puedes reintentar.'}})});}
    data={reply:'Puedes preparar a tu equipo con Training Roadmap. <img src=x onerror=alert(1)>',resources:[{title:'Antes del tour',url:'/mediahub/antes-del-tour/'},{title:'No abrir',url:'javascript:alert(1)'}],requestId:body.requestId,remainingTurns:19};
   }else if(path.endsWith('/leads')){
    assert.equal(req.headers()['x-advisor-csrf'],'synthetic-csrf');assert.equal(body.contactConsent,true);
    data={id:'synthetic-lead',status:'pending_confirmation',received:true,whatsappUrl:'https://wa.me/529843163268?text=Solicitud%20revisada'};
   }else throw new Error(path);
   await route.fulfill({contentType:'application/json',body:JSON.stringify(data)});
  });
  await page.goto('/descubre/',{waitUntil:'networkidle'});
  await check(`A voluntary advisor launcher exists at ${width}px without a chat request`,async()=>{
   assert.equal(await page.locator('[data-advisor-open]').count(),1,'The requested advisor launcher must exist');
   assert.equal(await page.locator('[data-advisor-open]').isVisible(),true);assert.equal(calls.length,0);
   const geometry=await page.locator('[data-advisor-open]').evaluate(el=>{const r=el.getBoundingClientRect(),c=document.querySelector('#consent-panel'),b=c&&!c.hidden?c.getBoundingClientRect():null;return{inViewport:r.left>=0&&r.right<=innerWidth&&r.bottom<=innerHeight,overlap:!!b&&r.bottom>b.top&&r.top<b.bottom&&r.right>b.left&&r.left<b.right};});
   assert.equal(geometry.inViewport,true);assert.equal(geometry.overlap,false);
  });
  if(red){await ctx.close();break;}
  if(vslOnly){await playingFilmDoesNotCollide(page,width);await ctx.close();continue;}
  await check(`Dialog is accessible, contained and restores keyboard focus at ${width}px`,async()=>{
   const launcher=page.locator('[data-advisor-open]');await launcher.focus();await page.keyboard.press('Enter');
   await page.locator('#sa-advisor-dialog').waitFor({state:'visible'});
   assert.equal(await page.locator('#sa-advisor-dialog').getAttribute('aria-labelledby'),'sa-advisor-title');
   assert.equal(calls.filter(c=>c.path.endsWith('/session')).length,1);
   assert.equal(calls.filter(c=>c.path.endsWith('/messages')).length,0);
   const boxes=await page.locator('#sa-advisor-dialog').evaluate(el=>{const r=el.getBoundingClientRect();return{inside:r.left>=0&&r.right<=innerWidth&&r.top>=0&&r.bottom<=innerHeight,overflow:document.documentElement.scrollWidth>innerWidth};});
   assert.equal(boxes.inside,true);assert.equal(boxes.overflow,false);
   await page.screenshot({path:`${dir}/advisor-open-${width}.png`});
   await page.keyboard.press('Escape');assert.equal(await launcher.evaluate(e=>document.activeElement===e),true);
   await launcher.click();
  });
  await check(`Chat uses safe text and approved resource links at ${width}px`,async()=>{
   await page.locator('#sa-advisor-message').fill('¿Cómo preparo a mi equipo?');await page.getByRole('button',{name:'Enviar pregunta',exact:true}).click();
   await page.locator('.advisor-message-assistant').filter({hasText:'Training Roadmap'}).waitFor();
   assert.equal(await page.locator('#sa-advisor-messages img').count(),0);
   assert.equal(await page.locator('#sa-advisor-messages a[href^="javascript:"]').count(),0);
   assert.equal(await page.locator('#sa-advisor-messages a[href="/mediahub/antes-del-tour/"]').count(),1);
   assert.equal(calls.filter(c=>c.path.endsWith('/messages')).length,1);
  });
  await check(`Request summary is editable and WhatsApp needs no lead opt-in at ${width}px`,async()=>{
   await page.getByRole('button',{name:'Coordinar demo',exact:true}).click();
   const form=page.locator('#sa-advisor-demo-form');
   await form.locator('[name=role]').selectOption('leader');await form.locator('[name=roomCountBucket]').selectOption('2-3');
   await form.locator('[name=teamSize]').fill('24 representantes');await form.locator('[name=need]').fill('Practicar objeciones con mi equipo');
   await form.locator('[name=timeframe]').fill('Este mes');await form.locator('[name=timezone]').selectOption('America/Cancun');
   await page.getByRole('button',{name:'Preparar mi solicitud',exact:true}).click();
   const summary=page.locator('#sa-advisor-summary');await summary.fill('Resumen revisado: necesito una demo para tres salas.');
   const link=page.locator('[data-advisor-whatsapp]');
   const url=new URL(await link.getAttribute('href'));assert.equal(url.hostname,'wa.me');assert.equal(url.pathname,'/529843163268');
   assert.match(url.searchParams.get('text'),/Resumen revisado/);assert.match(url.searchParams.get('text'),/pendiente|confirmar/i);
   assert.equal(await page.locator('#sa-advisor-contact-consent').isChecked(),false);
   assert.equal(calls.filter(c=>c.path.endsWith('/leads')).length,0);
   await page.screenshot({path:`${dir}/advisor-handoff-${width}.png`});
   await page.locator('#sa-advisor-contact-consent').check();await page.getByRole('button',{name:'Guardar solicitud para seguimiento',exact:true}).click();
   await page.locator('#sa-advisor-save-status').filter({hasText:'synthetic-lead'}).waitFor();
   assert.equal(calls.filter(c=>c.path.endsWith('/leads')).length,1);
   assert.match(await page.locator('#sa-advisor-save-status').innerText(),/pendiente/i);
  });
  await check(`Network recovery preserves the question and offers WhatsApp at ${width}px`,async()=>{
   await page.getByRole('button',{name:'Conversar',exact:true}).click();failNext=true;
   await page.locator('#sa-advisor-message').fill('¿Puedo ver un ejemplo?');await page.getByRole('button',{name:'Enviar pregunta',exact:true}).click();
   await page.locator('[data-advisor-retry]').waitFor({state:'visible'});assert.match(await page.locator('#sa-advisor-chat-status').innerText(),/reintentar/i);
   await page.locator('[data-advisor-retry]').click();await page.locator('[data-advisor-retry]').waitFor({state:'hidden'});
   assert.equal(calls.filter(c=>c.path.endsWith('/messages')).length,3);
  });
  await playingFilmDoesNotCollide(page,width);
  for(const path of ['/mediahub/','/descubre/diagnostico/','/growth-assets/scenarios/index.html']){
   await page.goto(path,{waitUntil:'networkidle'});assert.equal(await page.locator('[data-advisor-open]').isVisible(),true,path);
  }
  await ctx.close();
 }
 assert.deepEqual(report.errors,[]);report.ok=true;
}catch(e){report.ok=false;report.error=String(e);throw e;}finally{report.finishedAt=new Date().toISOString();await writeFile(`${dir}/results.json`,JSON.stringify(report,null,2));await browser.close();}
