import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.GROWTH_PLAYWRIGHT_MODULE||'playwright');
const base=process.env.GROWTH_E2E_URL;
assert.match(base||'',/^http:\/\/127\.0\.0\.1:\d+$/,'Only isolated loopback services may be tested');
const evidence=process.env.GROWTH_EVIDENCE_DIR||'work/features/2026-11-07-growth-mediahub/evidence';
const seed=JSON.parse(await readFile(new URL('../content/seed.json',import.meta.url),'utf8'));
await mkdir(`${evidence}/screenshots`,{recursive:true});
const browser=await chromium.launch({headless:true});
const results=[],errors=[];
async function check(name,run){await run();results.push({name,passed:true});console.log(`PASS ${name}`);}
const context=await browser.newContext({baseURL:base,viewport:{width:1440,height:1000}});
const page=await context.newPage();page.setDefaultTimeout(10000);
page.on('pageerror',e=>errors.push(e.message));
const events=[];page.on('request',r=>{if(r.url().endsWith('/growth-api/events'))events.push(r.postDataJSON());});
try{
 await check('Landing, consentimiento opcional y separación del producto',async()=>{
  assert.equal((await page.goto('/descubre/')).status(),200);
  await page.getByRole('heading',{level:1}).waitFor();
  assert.equal((await page.getByRole('heading',{level:1}).innerText()).replace(/\s+/g,' ').trim(),seed.hero.title);
  assert.match(await page.locator('main').innerText(),/tres salas/i);
  await page.getByRole('button',{name:'Solo lo necesario',exact:true}).click();
  assert.equal(events.length,0);
  for(const path of ['/','/ops/','/copiloto/','/api/']) assert.equal((await context.request.get(path)).status(),404);
  assert.equal((await context.request.get('/cms/api/draft')).status(),401);
  await page.screenshot({path:`${evidence}/screenshots/landing-desktop.png`});
 });
 await check('Lectura pública completa sin JavaScript y descarga real',async()=>{
  const nojs=await browser.newContext({baseURL:base,javaScriptEnabled:false});
  const p=await nojs.newPage();
  await p.goto('/descubre/');assert.ok((await p.getByRole('heading',{level:1}).textContent()).length>20);
  assert.equal(await p.locator('#demo-form').getAttribute('method'),'post');
  assert.equal(await p.getByRole('button',{name:'Solicitar una demo',exact:true}).isDisabled(),true);
  await p.goto('/mediahub/antes-del-tour/');assert.ok((await p.locator('main').innerText()).length>1000);
  const response=await nojs.request.get('/mediahub/antes-del-tour/descargar/');assert.equal(response.status(),200);
  assert.match(response.headers()['content-disposition'],/attachment/);assert.ok((await response.text()).length>1000);
  await nojs.close();
 });
 await check('Mediahub filtrado, estado vacío y recursos reales',async()=>{
  await page.goto('/mediahub/');await page.getByLabel('Para quién').selectOption('director');
  await page.getByRole('button',{name:'Filtrar',exact:true}).click();
  const directorCount=seed.resources.filter(r=>r.status==='published' && r.role==='director').length;
  assert.match(await page.getByRole('status').first().textContent(),new RegExp(`${directorCount} recurso`));
  await page.getByLabel('Buscar un recurso').fill('inexistente-simulado');await page.getByRole('button',{name:'Filtrar',exact:true}).click();
  await page.getByRole('heading',{name:'No encontramos un recurso con esos filtros.'}).waitFor();
  await page.getByRole('link',{name:'Ver todos los recursos',exact:true}).click();
  assert.match(await page.getByRole('status').first().textContent(),new RegExp(`${seed.resources.filter(r=>r.status==='published').length} recursos disponibles`));
 });
 await check('Diagnóstico sin contacto, respuestas desconocidas, empates y enlaces válidos',async()=>{
  await page.goto('/descubre/diagnostico/');
  await page.getByRole('button',{name:'Siguiente →',exact:true}).click();
  assert.match(await page.getByRole('alert').textContent(),/Elige una respuesta/);
  for(let i=0;i<6;i++){
   await page.getByRole('radio',{name:'No lo sé',exact:true}).check();
   await page.getByRole('button',{name:i===5?'Ver mi orientación ↗':'Siguiente →',exact:true}).click();
  }
  await page.getByRole('heading',{name:'Acordar lo esencial.',exact:true}).waitFor();
  assert.match(await page.locator('#diagnostic-result').innerText(),/Prioridades compartidas/);
  assert.match(await page.locator('#diagnostic-result').innerText(),/6 respuestas/);
  for(const link of await page.locator('.result-links a').all()) assert.equal((await context.request.get(await link.getAttribute('href'))).status(),200);
  assert.equal(events.length,0);
  await page.screenshot({path:`${evidence}/screenshots/diagnostic-result.png`});
  await page.getByRole('button',{name:'Volver a responder',exact:true}).click();
  assert.equal(await page.getByRole('radio',{checked:true}).count(),0);
 });
 await check('Medición con permiso, propiedades permitidas y retirada',async()=>{
  await page.goto('/descubre/');await page.getByRole('button',{name:'Preferencias de medición',exact:true}).click();
  const sent=page.waitForResponse(r=>r.url().endsWith('/growth-api/events'));
  await page.getByRole('button',{name:'Permitir medición',exact:true}).click();assert.equal((await sent).status(),202);
  const event=events.at(-1);assert.equal(event.event,'landing_viewed');assert.ok(!('email' in event));assert.ok(!('answers' in event));
  const viewed=page.waitForResponse(r=>r.url().endsWith('/growth-api/events'));
  await page.goto('/mediahub/antes-del-tour/');assert.equal((await viewed).status(),202);
  assert.equal(events.at(-1).resourceId,'before-tour');
  await page.getByRole('button',{name:'Preferencias de medición',exact:true}).click();await page.getByRole('button',{name:'Solo lo necesario',exact:true}).click();
  const count=events.length;await page.goto('/mediahub/antes-del-tour/');await page.getByRole('heading',{level:1}).waitFor();assert.equal(events.length,count);
 });
 await check('Solicitud voluntaria almacenada con consentimiento separado',async()=>{
  await page.goto('/descubre/#demo');await page.getByLabel('Correo de contacto').fill('qa@example.invalid');
  await page.getByLabel('Tu rol').selectOption('director');await page.getByLabel('Salas de tu equipo').selectOption('three');
  await page.getByLabel('¿Qué quieres revisar?').selectOption('pilot');await page.getByLabel(/Acepto que se utilice/).check();
  assert.equal(await page.getByLabel(/Quiero recibir novedades/).isChecked(),false);
  const response=page.waitForResponse(r=>r.url().endsWith('/growth-api/demo-requests')&&r.request().method()==='POST');
  await page.getByRole('button',{name:'Solicitar una demo',exact:true}).click();assert.equal((await response).status(),201);
  await page.locator('#demo-status.success').waitFor();assert.match(await page.locator('#demo-status').textContent(),/Recibimos tu solicitud/);
 });
 await check('Vistas móviles 360/390 sin desbordamiento ni controles cortados',async()=>{
  for(const width of [360,390]){
   await page.setViewportSize({width,height:844});
   for(const [name,url] of [['landing','/descubre/'],['hub','/mediahub/'],['diagnostic','/descubre/diagnostico/'],['resource','/mediahub/piloto-en-tres-salas/'],['analysis','/descubre/analisis/']]){
    await page.goto(url);await page.getByRole('heading',{level:1}).waitFor();
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${name} ${width} overflow`);
    await page.screenshot({path:`${evidence}/screenshots/${name}-mobile-${width}.png`});
   }
  }
  await page.setViewportSize({width:1440,height:1000});
 });
 if(process.env.GROWTH_E2E_PUBLIC_ONLY!=='1'){
  const {checkCMS}=await import('./e2e-cms.mjs');
  await checkCMS({browser,page,context,base,evidence,check});
 }
 assert.deepEqual(errors,[],'No page runtime errors');
 await writeFile(`${evidence}/e2e-results.json`,JSON.stringify({ok:true,scope:process.env.GROWTH_E2E_PUBLIC_ONLY==='1'?'public':'full',results,errors},null,2));
}catch(error){
 await page.screenshot({path:`${evidence}/screenshots/e2e-failure.png`,fullPage:true}).catch(()=>{});
 await writeFile(`${evidence}/e2e-results.json`,JSON.stringify({ok:false,results,error:String(error),errors},null,2));
 throw error;
}finally{await browser.close();}
