/** Public post-deploy smoke: at most two synthetic model turns; never saves a lead. */
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.GROWTH_PLAYWRIGHT_MODULE||'playwright');
const base='https://v5.salesacademy.softvibes.cloud';
const evidence=process.env.GROWTH_EVIDENCE_DIR||'work/features/2026-11-07-sales-advisor/evidence/public';
await mkdir(evidence,{recursive:true});
const report={base,startedAt:new Date().toISOString(),results:[],errors:[],inferenceRequests:0,leadRequests:0,whatsappRequests:0,cmsLogin:false};
const browser=await chromium.launch({headless:true});
const contexts=[];
const save=()=>writeFile(`${evidence}/results.json`,JSON.stringify(report,null,2));
async function check(name,work){try{const details=await work();report.results.push({name,passed:true,...details});console.log(`PASS ${name}`);}catch(e){report.results.push({name,passed:false,error:String(e)});throw e;}finally{await save();}}
try{
 for(const width of [1440,390]){
  const context=await browser.newContext({baseURL:base,viewport:{width,height:1000},serviceWorkers:'block',reducedMotion:'reduce'});contexts.push(context);
  const page=await context.newPage();page.setDefaultTimeout(12000);page.on('pageerror',e=>report.errors.push(e.message));
  await context.route('https://wa.me/**',route=>{report.whatsappRequests++;return route.abort();});
  await context.route('**/growth-api/advisor/leads',route=>{report.leadRequests++;return route.abort();});
  await context.route('**/growth-api/advisor/messages',route=>{report.inferenceRequests++;assert.ok(report.inferenceRequests<=2,'No more than two public inference requests');return route.continue();});
  await check(`Public advisor opens without overflow or consent collision at ${width}px`,async()=>{
   const response=await page.goto('/descubre/',{waitUntil:'networkidle'});assert.equal(response.status(),200);
   const launcher=page.locator('[data-advisor-open]');await launcher.waitFor({state:'visible'});
   const geometry=await launcher.evaluate(el=>{const b=el.getBoundingClientRect(),panel=document.querySelector('#consent-panel'),c=panel&&!panel.hidden?panel.getBoundingClientRect():null;return{inside:b.left>=0&&b.right<=innerWidth&&b.bottom<=innerHeight,overlap:!!c&&b.left<c.right&&b.right>c.left&&b.top<c.bottom&&b.bottom>c.top,overflow:document.documentElement.scrollWidth>innerWidth};});
   assert.equal(geometry.inside,true);assert.equal(geometry.overlap,false);assert.equal(geometry.overflow,false);
   const sessionResponse=page.waitForResponse(r=>r.url().endsWith('/advisor/session'));
   await launcher.click();const responseData=await (await sessionResponse).json();assert.equal(responseData.enabled,true);assert.ok(responseData.csrf);
   await page.screenshot({path:`${evidence}/advisor-open-${width}.png`});
   return {geometry};
  });
  await check(`Hermes answers one real synthetic question with published resources at ${width}px`,async()=>{
   const question='¿Cómo puede Sales Academy ayudar a practicar objeciones en una sala y qué recurso publicado recomiendas?';
   await page.locator('#sa-advisor-message').fill(question);
   const next=page.waitForResponse(r=>r.url().endsWith('/advisor/messages'),{timeout:50000});
   await page.getByRole('button',{name:'Enviar pregunta',exact:true}).click();const response=await next;
   assert.equal(response.status(),200);const data=await response.json();assert.equal(typeof data.reply,'string');assert.ok(data.reply.length>40);
   assert.doesNotMatch(data.reply,/no está disponible|respuesta no llegó|hermes-no-configurado/i);
   assert.ok(data.resources.length>0);for(const resource of data.resources)assert.match(resource.url,/^\/mediahub\/[a-z0-9-]+\/$/);
   const bubble=page.locator('.advisor-message-assistant').filter({hasText:data.reply});await bubble.waitFor();
   assert.equal(await page.locator('[data-advisor-retry]').isVisible(),false);
   await page.screenshot({path:`${evidence}/advisor-reply-${width}.png`});
   return {reply:data.reply,resources:data.resources,remainingTurns:data.remainingTurns};
  });
  await check(`Future preference and edited WhatsApp summary need no saved lead at ${width}px`,async()=>{
   await page.getByRole('button',{name:'Coordinar demo',exact:true}).click();const form=page.locator('#sa-advisor-demo-form');
   await form.locator('[name=role]').selectOption('leader');await form.locator('[name=roomCountBucket]').selectOption('2-3');
   await form.locator('[name=need]').fill('Explorar práctica de objeciones: solicitud sintética de revisión.');
   const future=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Cancun',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(Date.now()+2*86400000));
   await form.locator('[name=preferredDate]').fill(future);await form.locator('[name=preferredTime]').fill('11:00');await form.locator('[name=timezone]').selectOption('America/Cancun');
   await page.getByRole('button',{name:'Preparar mi solicitud',exact:true}).click();const summary=page.locator('#sa-advisor-summary');await summary.waitFor({state:'visible'});
   assert.match(await summary.inputValue(),/11:00 \(America\/Cancun\)/);
   const edited=`Solicitud sintética de revisión: explorar práctica de objeciones. Preferencia ${future} a las 11:00, America/Cancun; por confirmar.`;
   await summary.fill(edited);const url=new URL(await page.locator('[data-advisor-whatsapp]').getAttribute('href'));
   assert.equal(url.origin,'https://wa.me');assert.equal(url.pathname,'/529843163268');assert.ok(url.searchParams.get('text').includes(edited));assert.match(url.searchParams.get('text'),/pendiente de confirmación/);
   assert.equal(await page.locator('#sa-advisor-contact-consent').isChecked(),false);assert.equal(report.leadRequests,0);assert.equal(report.whatsappRequests,0);
   await page.screenshot({path:`${evidence}/advisor-request-${width}.png`});
   await page.keyboard.press('Escape');assert.equal(await page.locator('[data-advisor-open]').evaluate(el=>document.activeElement===el),true);
   return {preferredDate:future,timezone:'America/Cancun',leadSaved:false};
  });
  await check(`The launcher leaves an overlapping playing VSL unobstructed at ${width}px`,async()=>{
   const consent=page.getByRole('button',{name:'Solo lo necesario',exact:true});if(await consent.isVisible())await consent.click();
   const video=page.locator('[data-vsl] video');await video.evaluate(el=>{const b=el.getBoundingClientRect();window.scrollBy({top:b.bottom-innerHeight+8,behavior:'instant'});});
   await page.locator('[data-vsl] [data-video-play]').click();await page.waitForFunction(()=>{const v=document.querySelector('[data-vsl] video');return !v.paused&&v.currentTime>.15;});
   const launcher=page.locator('[data-advisor-open]');const overlaps=await launcher.evaluate(el=>{const b=el.getBoundingClientRect(),v=document.querySelector('[data-vsl] video').getBoundingClientRect();return b.left<v.right&&b.right>v.left&&b.top<v.bottom&&b.bottom>v.top;});
   if(overlaps)assert.equal(await launcher.isVisible(),false);await video.evaluate(el=>el.pause());await launcher.waitFor({state:'visible'});
   return {overlaps};
  });
  for(const path of ['/mediahub/','/growth-assets/scenarios/index.html'])await check(`The advisor remains available on ${path} at ${width}px`,async()=>{const response=await page.goto(path,{waitUntil:'networkidle'});assert.equal(response.status(),200);assert.equal(await page.locator('[data-advisor-open]').isVisible(),true);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);});
 }
 assert.equal(report.inferenceRequests,2);assert.equal(report.leadRequests,0);assert.equal(report.whatsappRequests,0);assert.deepEqual(report.errors,[]);report.ok=true;
}catch(e){report.ok=false;report.error=String(e);throw e;}finally{report.finishedAt=new Date().toISOString();await save();await Promise.all(contexts.map(c=>c.close()));await browser.close();}
