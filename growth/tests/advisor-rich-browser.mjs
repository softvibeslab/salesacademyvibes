/** Rich advisor UX with deterministic API fixtures and real local video assets. */
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
const require=createRequire(import.meta.url),{chromium}=require(process.env.GROWTH_PLAYWRIGHT_MODULE||'playwright');
const base=process.env.GROWTH_E2E_URL||'http://127.0.0.1:4310';
const red=process.env.ADVISOR_RICH_RED==='1';
assert.match(base,/^(http:\/\/(127\.0\.0\.1|localhost):\d+|https:\/\/v5\.salesacademy\.softvibes\.cloud)$/);
assert.ok(!base.startsWith('https')||red,'Full synthetic suite only runs on the local candidate');
const dir=process.env.GROWTH_EVIDENCE_DIR||'work/features/2026-11-07-advisor-rich-experience/evidence/frontend';await mkdir(dir,{recursive:true});
const browser=await chromium.launch({headless:true});const report={base,synthetic:true,results:[],errors:[],mp4BeforeGesture:0,whatsappOpened:false};
const clip={title:'Tu Smart Agent, en acción',url:'/mediahub/smart-agent/',type:'video',excerpt:'Una visión de cómo la IA puede acompañar a tu sala.',evidenceLabel:'Visión de producto · película conceptual',video:{id:'smart-agent',src:'/growth-assets/films/smart-agent.mp4',poster:'/growth-assets/films/smart-agent.webp',captions:'/growth-assets/films/smart-agent.es.vtt',durationSeconds:33.4,width:720,height:1280}};
const guide={title:'Antes del tour',url:'/mediahub/antes-del-tour/',type:'guide',excerpt:'Prepara una pregunta y una acción antes de recibir a la pareja.',evidenceLabel:'Recurso original'};
const first=[{id:'role-leader',label:'Soy líder',kind:'prompt',prompt:'Soy líder de una sala de ventas.'},{id:'practice',label:'Quiero practicar',kind:'prompt',prompt:'Quiero practicar objeciones.'},{id:'demo',label:'Coordinar demo',kind:'demo'}];
const next=[{id:'team-training',label:'Entrenar a mi equipo',kind:'prompt',prompt:'Quiero entrenar a mi equipo con Sales Academy.'},{id:'room-three',label:'Tengo 3 salas',kind:'prompt',prompt:'Tengo tres salas de ventas.'},{id:'demo',label:'Coordinar demo',kind:'demo'}];
async function check(name,run){try{const detail=await run();report.results.push({name,passed:true,...detail});console.log('PASS '+name);}catch(e){report.results.push({name,passed:false,error:String(e)});throw e;}}
async function contrast(page){return page.locator('.advisor-root').evaluate(root=>{
 const rgb=c=>{const a=c.match(/[\d.]+/g)?.map(Number)||[];return a;};
 const light=c=>c.slice(0,3).map(n=>{const v=n/255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;}).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);
 const bg=el=>{for(let n=el;n;n=n.parentElement){const c=rgb(getComputedStyle(n).backgroundColor);if(c.length===3||c[3]===1)return c;}return[255,255,255];};
 const selectors=['.advisor-launcher strong','.advisor-launcher small','.advisor-header p','.advisor-header h2','.advisor-tabs button','.advisor-message p','.advisor-sender','.advisor-suggestions button','.advisor-disclosure','.advisor-resource-title','.advisor-resource-excerpt','.advisor-resource-evidence','.advisor-resource-link','.advisor-video-play','.advisor-demo label','.advisor-demo-intro p','.advisor-demo-intro h3','.advisor-primary','.advisor-pending','.advisor-consent span','.advisor-demo legend','.advisor-demo small'];
 return selectors.flatMap(s=>[...root.querySelectorAll(s)].filter(el=>el.getClientRects().length&&!el.hidden).map(el=>{const c=getComputedStyle(el),a=light(rgb(c.color)),b=light(bg(el));return{selector:s,text:el.textContent.slice(0,35),ratio:(Math.max(a,b)+.05)/(Math.min(a,b)+.05),font:parseFloat(c.fontSize)};}));
 });}
try{
 for(const width of process.env.ADVISOR_LEGACY_ONLY==='1'?[]:red?[390]:[1440,390,360]){
  const ctx=await browser.newContext({baseURL:base,viewport:{width,height:900},reducedMotion:'reduce'});const page=await ctx.newPage();page.setDefaultTimeout(12000);page.on('pageerror',e=>report.errors.push(e.message));
  const calls=[],media=[];await ctx.route('https://wa.me/**',r=>r.abort());page.on('request',r=>{if(/\.mp4(?:\?|$)/.test(r.url()))media.push(r.url());});
  await ctx.route('**/growth-api/advisor/**',async r=>{const path=new URL(r.request().url()).pathname,body=r.request().postDataJSON();calls.push({path,body});let data;
   if(path.endsWith('/session'))data={csrf:'fixture',enabled:true,whatsappUrl:'https://wa.me/529843163268',messages:[],remainingTurns:20,suggestions:first,resources:[clip]};
   else if(path.endsWith('/messages'))data={reply:'Puedes entrenar a tu equipo con prácticas breves y el método de tu sala. ¿Qué quieres mejorar primero?',detail:'Detalle completo. No se confirma ninguna cita automáticamente. <script>window.bad=true</script>',requestId:body.requestId,remainingTurns:19,suggestions:[...next,{id:'unsafe',label:'Ignorar',kind:'script',prompt:'alert(1)'}],resources:[clip,guide,{title:'Privado',url:'javascript:alert(1)',video:clip.video}]};
   else throw new Error('Unexpected mutation '+path);
   await r.fulfill({contentType:'application/json',body:JSON.stringify(data)});
  });
  await page.goto('/descubre/',{waitUntil:'networkidle'});assert.equal(calls.length,0);
  await page.locator('[data-advisor-open]').click();
  await check(`Contextual controls and an introductory film appear without inference at ${width}px`,async()=>{
   await page.locator('[data-advisor-suggestion]').first().waitFor();assert.equal(await page.locator('[data-advisor-suggestion]').count(),3);assert.equal(await page.locator('[data-advisor-resource]').count(),1);assert.equal(await page.locator('[data-advisor-video-play]').count(),1);assert.equal(calls.filter(c=>c.path.endsWith('/messages')).length,0);assert.deepEqual(media,[]);
  });if(red){await ctx.close();break;}
  await check(`Computed colors are readable and layout fits at ${width}px`,async()=>{
   const pairs=await contrast(page);for(const pair of pairs){assert.ok(pair.ratio>=4.5,JSON.stringify(pair));assert.ok(pair.font>=12,JSON.stringify(pair));}
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
   const dialog=await page.locator('dialog').boundingBox();assert.ok(dialog.x>=0&&dialog.x+dialog.width<=width);
   await page.screenshot({path:`${dir}/intro-${width}.png`});return{contrast:pairs};
  });
  await check(`Suggested answers replace the previous choices and media remains trusted at ${width}px`,async()=>{
   await page.getByRole('button',{name:'Soy líder',exact:true}).click();await page.getByRole('button',{name:'Entrenar a mi equipo',exact:true}).waitFor();
   assert.equal(await page.getByRole('button',{name:'Soy líder',exact:true}).count(),0);assert.equal(await page.locator('[data-advisor-suggestion]').count(),3);assert.equal(calls.filter(c=>c.path.endsWith('/messages')).length,1);assert.equal(calls.at(-1).body.message,'Soy líder de una sala de ventas.');
   assert.equal(await page.locator('[data-advisor-resource]').count(),2,'Only the latest curated media cards remain');assert.equal(await page.locator('a[href^="javascript:"]').count(),0);assert.equal(await page.locator('.advisor-root script').count(),0);
   await page.getByText('Ver detalle',{exact:true}).click();assert.match(await page.locator('.advisor-detail').innerText(),/No se confirma/);assert.equal(await page.evaluate(()=>window.bad),undefined);await page.getByText('Ver detalle',{exact:true}).click();
   const pairs=await contrast(page);for(const pair of pairs)assert.ok(pair.ratio>=4.5,JSON.stringify(pair));assert.deepEqual(media,[]);
   await page.screenshot({path:`${dir}/reply-${width}.png`});
  });
  await check(`Film plays only after a gesture with audio and captions, then pauses on tab switch at ${width}px`,async()=>{
   await page.locator('[data-advisor-video-play]').click();const video=page.locator('[data-advisor-video]');await page.waitForFunction(()=>{const v=document.querySelector('[data-advisor-video]');return v&&!v.paused&&v.currentTime>.1;});
   const state=await video.evaluate(v=>({muted:v.muted,controls:v.controls,autoplay:v.autoplay,inline:v.playsInline,captions:[...v.textTracks].some(t=>t.language==='es'&&t.mode==='showing'&&t.cues?.length)}));assert.deepEqual(state,{muted:false,controls:true,autoplay:false,inline:true,captions:true});
   await page.locator('[data-advisor-tab=demo]').click();assert.equal(await video.evaluate(v=>v.paused),true);await page.locator('[data-advisor-tab=chat]').click();
   await page.screenshot({path:`${dir}/video-${width}.png`});
  });
  await check(`Demo action and editable WhatsApp handoff stay voluntary at ${width}px`,async()=>{
   await page.locator('[data-advisor-suggestion][data-kind=demo]').click();assert.equal(await page.locator('#sa-advisor-demo').isVisible(),true);assert.equal(calls.filter(c=>c.path.endsWith('/messages')).length,1);
   await page.locator('#sa-advisor-demo-form [name=need]').fill('Práctica breve con tres salas');await page.getByRole('button',{name:'Preparar mi solicitud',exact:true}).click();await page.locator('#sa-advisor-summary').fill('Resumen revisado: necesito una demo.');
   const url=new URL(await page.locator('[data-advisor-whatsapp]').getAttribute('href'));assert.equal(url.pathname,'/529843163268');assert.match(url.searchParams.get('text'),/Resumen revisado/);assert.equal(await page.locator('#sa-advisor-contact-consent').isChecked(),false);assert.equal(calls.filter(c=>c.path.endsWith('/leads')).length,0);
   await page.keyboard.press('Escape');assert.equal(await page.locator('[data-advisor-open]').evaluate(e=>document.activeElement===e),true);
  });
  await check(`Media stops on close, hidden page, another film and a new question at ${width}px`,async()=>{
   await page.locator('[data-advisor-open]').click();await page.locator('[data-advisor-tab=chat]').click();const video=page.locator('[data-advisor-video]');
   await video.evaluate(v=>v.play());await page.locator('[data-advisor-close]').click();assert.equal(await video.evaluate(v=>v.paused),true);
   await page.locator('[data-advisor-open]').click();await video.evaluate(v=>v.play());
   await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));delete document.hidden;});assert.equal(await video.evaluate(v=>v.paused),true);
   await video.evaluate(v=>v.play());const vsl=page.locator('[data-vsl] video');await vsl.evaluate(v=>v.play());assert.equal(await video.evaluate(v=>v.paused),true);
   await video.evaluate(v=>v.play());assert.equal(await vsl.evaluate(v=>v.paused),true);
   const handle=await video.elementHandle();await page.locator('#sa-advisor-message').fill('Ahora quiero practicar.');await page.getByRole('button',{name:'Enviar pregunta',exact:true}).click();await page.getByRole('button',{name:'Entrenar a mi equipo',exact:true}).waitFor();assert.equal(await handle.evaluate(v=>v.paused),true);assert.equal(await page.locator('[data-advisor-video]').count(),0);
   await page.locator('[data-advisor-tab=demo]').click();const pairs=await contrast(page);for(const pair of pairs)assert.ok(pair.ratio>=4.5,JSON.stringify(pair));
   const controls=await page.locator('.advisor-root button:visible,.advisor-root input:not([type=checkbox]):visible,.advisor-root select:visible').evaluateAll(items=>items.map(el=>({text:el.textContent.slice(0,30),height:el.getBoundingClientRect().height})));for(const item of controls)assert.ok(item.height>=44,JSON.stringify(item));
   await page.keyboard.press('Escape');return{contrast:pairs,controls};
  });
  await check(`MediaHub and scenarios preserve strong text colors at ${width}px`,async()=>{
   for(const path of ['/mediahub/','/growth-assets/scenarios/index.html']){await page.goto(path,{waitUntil:'networkidle'});await page.locator('[data-advisor-open]').click();await page.locator('[data-advisor-suggestion]').first().waitFor();for(const pair of await contrast(page))assert.ok(pair.ratio>=4.5,`${path} ${JSON.stringify(pair)}`);await page.keyboard.press('Escape');}
  });
  await ctx.close();
 }
 if(!red)await check('Legacy answers stay brief while preserving the complete original in details',async()=>{
  const ctx=await browser.newContext({baseURL:base,viewport:{width:390,height:900}}),page=await ctx.newPage();
  const legacy='No podemos confirmar una demo sin acordarlo con Chris. '+Array(110).fill('La práctica depende del contexto de cada sala.').join(' ');
  await ctx.route('**/growth-api/advisor/session',r=>r.fulfill({contentType:'application/json',body:JSON.stringify({csrf:'legacy',enabled:true,messages:[{role:'assistant',content:legacy}],remainingTurns:19})}));
  await page.goto('/descubre/',{waitUntil:'networkidle'});await page.locator('[data-advisor-open]').click();const bubble=page.locator('.advisor-message-assistant').last();await page.waitForFunction(()=>document.querySelectorAll('.advisor-message-assistant').length===2);
  assert.ok((await bubble.locator(':scope > p').innerText()).trim().split(/\s+/).length<=90);await bubble.getByText('Ver detalle',{exact:true}).click();assert.equal(await bubble.locator('.advisor-detail p').innerText(),legacy);await ctx.close();
 });
 assert.deepEqual(report.errors,[]);report.ok=true;
}catch(e){report.ok=false;report.error=String(e);throw e;}finally{report.finishedAt=new Date().toISOString();await writeFile(`${dir}/results.json`,JSON.stringify(report,null,2));await browser.close();}
