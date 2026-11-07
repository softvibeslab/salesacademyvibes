const {chromium}=require('/Users/rogergv/Documents/SoftvibesLab/SalesAcademyVibes/vcsAcademyMobile/node_modules/playwright');
const fs=require('node:fs/promises');
const path=require('node:path');
(async()=>{
const folder=path.resolve('work/features/2026-11-07-ai-vsl/evidence');
const browser=await chromium.launch({headless:true});
const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'no-preference'});
const blocked=[],errors=[],requests=[];
await context.route('**/*',route=>{const r=route.request(); if(!['GET','HEAD'].includes(r.method())){blocked.push({method:r.method(),url:r.url()});return route.abort();}return route.continue();});
const refs=[['v3','http://salesacademy.localhost:4188/descubre/'],['v4','http://simulacion.localhost:4189/growth-assets/scenarios/index.html']];
const results=[];
for(const [key,url] of refs){
 const page=await context.newPage();page.on('pageerror',e=>errors.push({key,message:e.message}));page.on('request',r=>requests.push({key,method:r.method(),url:r.url()}));
 const response=await page.goto(url,{waitUntil:'networkidle'});
 await page.screenshot({path:path.join(folder,`${key}-overview-desktop.png`)});
 const item={key,url,status:response.status(),title:await page.title(),headings:await page.locator('h1,h2').allTextContents(),navigation:await page.locator('nav a').evaluateAll(els=>els.map(e=>({label:e.textContent.trim(),href:e.getAttribute('href')}))),videos:await page.locator('video').evaluateAll(els=>els.map(e=>({src:e.getAttribute('src')||e.querySelector('source')?.getAttribute('src'),controls:e.controls,autoplay:e.autoplay,preload:e.preload,poster:e.poster,paused:e.paused,captionTracks:e.querySelectorAll('track').length}))),scenes:await page.locator('article.scenario').count(),chapters:await page.locator('[data-chapter]').count()};
 if(key==='v3'){
   await page.locator('[data-chapter="practice"]').scrollIntoViewIfNeeded();await page.waitForTimeout(350);await page.screenshot({path:path.join(folder,'v3-practice-stage.png')});
   item.stageState=await page.locator('[data-journey]').evaluate(e=>({active:e.dataset.active,enhanced:e.classList.contains('journey-enhanced')}));
 }else{
   await page.locator('#objection-practice').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(folder,'v4-practice-scene.png')});
 }
 await page.setViewportSize({width:390,height:844});await page.goto(url,{waitUntil:'networkidle'});await page.screenshot({path:path.join(folder,`${key}-overview-mobile.png`)});
 item.mobileOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
 results.push(item);await page.close();
}
await fs.writeFile(path.join(folder,'references-inspection.json'),JSON.stringify({readOnly:true,results,blocked,errors,mp4Requested:requests.filter(x=>/\.mp4(?:$|\?)/.test(x.url))},null,2));
console.log(JSON.stringify({references:results.map(r=>({key:r.key,status:r.status,videos:r.videos.length,chapters:r.chapters,scenes:r.scenes,mobileOverflow:r.mobileOverflow})),blockedWrites:blocked.length,errors,mp4Requested:requests.filter(x=>/\.mp4(?:$|\?)/.test(x.url)).length}));
await browser.close();
})().catch(error=>{console.error(error);process.exit(1)});
