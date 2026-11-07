const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const { chromium } = require('/Users/rogergv/Documents/SoftvibesLab/SalesAcademyVibes/vcsAcademyMobile/node_modules/playwright');
const evidence = __dirname;
const base = process.env.MEET_GREET_BASE || 'http://127.0.0.1:4191';
const published = base.startsWith('https://');
const root = path.resolve(evidence, '../../../..');
const report = { startedAt: new Date().toISOString(), base, published, cmsLogin: false, whatsappOpened: false, checks: [], issues: [] };
const save = () => fs.writeFileSync(path.join(evidence, published?'public-qa.json':'local-qa.json'), JSON.stringify(report,null,2));
const rect = e => { const r=e.getBoundingClientRect(); return {x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom}; };
function observe(page){const errors=[]; page.on('pageerror', e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});return errors;}
async function images(page){ await page.evaluate(async()=>{for(const im of document.images) im.loading='eager';await Promise.all([...document.images].map(im=>im.decode().catch(()=>{})));await document.fonts.ready;}); }
async function inspect(page, target){return page.evaluate(({target})=>{const rr=e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom};}; const el=document.querySelector(target); const image=el?.querySelector('img[src*="16-meet"]'); const cap=el?.querySelector('.product-screen figcaption') || el?.querySelector('figcaption'); return {overflow:document.documentElement.scrollWidth>innerWidth,retouchedImages:[...document.images].filter(x=>x.src.includes('16-meet-greet-retouched')).map(im=>({loaded:im.complete&&im.naturalWidth>0,src:im.src,naturalWidth:im.naturalWidth,naturalHeight:im.naturalHeight,width:im.clientWidth,height:im.clientHeight})),target:el&&rr(el),image:image&&rr(image),caption:cap&&rr(cap),captionText:cap?.innerText,chapters:document.querySelectorAll('[data-chapter]').length,catalog:document.querySelectorAll('.catalog-card').length, originalLinks:[...document.querySelectorAll('a[href*="16-meet-greet-original"]')].map(a=>a.href),active:document.querySelector('.ai-continuous')?.dataset.active,retouchedLabel:document.querySelector('.ai-retouched-label')&&getComputedStyle(document.querySelector('.ai-retouched-label')).display,originalLabel:document.querySelector('.ai-original-label')&&getComputedStyle(document.querySelector('.ai-original-label')).display,phoneWidths:[...document.querySelectorAll('.ai-device,.ai-inline-device,.product-screen')].filter(el=>el.getBoundingClientRect().width>0).map(el=>parseFloat(getComputedStyle(el).width))};},{target});}
(async()=>{const browser=await chromium.launch({headless:true});try{
 for(const width of (published?[390,1440]:[390,980,1440])){
  for(const type of ['landing','gallery']){
   const context=await browser.newContext({viewport:{width,height:1000},ignoreHTTPSErrors:false});const page=await context.newPage();const errors=observe(page);await page.route('https://wa.me/**',route=>route.abort());
   const route=type==='landing'?'/descubre/':'/growth-assets/scenarios/index.html';const response=await page.goto(base+route,{waitUntil:'networkidle'});assert.equal(response.status(),200);await images(page);
   const consent=page.getByRole('button',{name:'Solo lo necesario',exact:true});if(await consent.count()&&await consent.isVisible())await consent.click();
   if(type==='landing'){
    await page.locator('#method').scrollIntoViewIfNeeded(); await page.waitForTimeout(350);
    if(width>=980){await page.evaluate(()=>{const el=document.querySelector('#method');window.scrollTo(0,scrollY+el.getBoundingClientRect().top+innerHeight*.18);});await page.waitForTimeout(600);}
   }else{await page.locator('.chapter-index a[href="#tour-preparation"]').click();await page.waitForTimeout(500);}
   const metrics=await inspect(page,type==='landing'?'#method .ai-inline-scene':'#tour-preparation .scene-visual');
   assert.equal(metrics.overflow,false); assert.ok(metrics.retouchedImages.every(im=>im.loaded));assert.ok(metrics.originalLinks.length>=1);
   if(type==='landing'){assert.equal(metrics.chapters,5);if(width>=980){assert.equal(metrics.active,'method');assert.equal(metrics.retouchedLabel,'inline');assert.equal(metrics.originalLabel,'none');}}
   else{assert.equal(metrics.catalog,16);assert.match(metrics.captionText,/retocada/i);assert.equal(new URL(page.url()).hash,'#tour-preparation');}
   assert.equal(errors.length,0);await page.screenshot({path:path.join(evidence,`${published?'public':'local'}-${type}-${width}.png`)});
   report.checks.push({type,width,metrics,errors});save();await context.close();
  }
 }
 const context=await browser.newContext({viewport:{width:1600,height:1000},reducedMotion:'reduce'});const page=await context.newPage();await page.goto(base+'/growth-assets/scenarios/index.html');await images(page);
 if(!published){
  await page.evaluate(()=>document.body.classList.add('export-mode'));
  const scene=page.locator('#tour-preparation');const box=await scene.boundingBox();assert.equal(box.width,1600);assert.equal(box.height,1000);
  const layout=await scene.evaluate(el=>({height:el.clientHeight,scrollHeight:el.scrollHeight,text:el.textContent,rect:el.getBoundingClientRect().toJSON(),textBottom:Math.max(...[...el.querySelectorAll('h2,p,figcaption,.scenario-source,.scenario-footer')].map(x=>x.getBoundingClientRect().bottom))}));
  assert.ok(layout.scrollHeight<=layout.height,'Export must not clip vertically');assert.match(layout.text,/retocada/i);assert.ok(layout.textBottom<=layout.rect.bottom+1,'Export text must fit');
  const destination=path.join(root,'growth/site/assets/scenarios/compositions/02-meet-greet.png');fs.mkdirSync(path.dirname(destination),{recursive:true});const bytes=await scene.screenshot({path:destination,animations:'disabled'});
  report.composition={path:destination,width:1600,height:1000,bytes:bytes.length,sha256:crypto.createHash('sha256').update(bytes).digest('hex'),classification:'Composición editorial: captura aportada con presentación retocada, escena generada y relato ficticio',layout};save();
 }
 if(published){report.assets=[];for(const relative of ['screens/16-meet-greet-original.png','screens/16-meet-greet-retouched.png','screens/16-meet-greet-retouched.webp','compositions/02-meet-greet.png']){const url=base+'/growth-assets/scenarios/'+relative;const response=await context.request.get(url);assert.equal(response.status(),200);const bytes=await response.body();report.assets.push({url,status:response.status(),bytes:bytes.length,sha256:crypto.createHash('sha256').update(bytes).digest('hex')});}save();}
 await context.close();report.finishedAt=new Date().toISOString();save();console.log(JSON.stringify({checks:report.checks.length,issues:report.issues,composition:report.composition?.path}));
}catch(error){report.issues.push(error.stack);save();throw error;}finally{await browser.close();}})();
