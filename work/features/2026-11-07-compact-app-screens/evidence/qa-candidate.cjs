const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('/Users/rogergv/Documents/SoftvibesLab/SalesAcademyVibes/vcsAcademyMobile/node_modules/playwright');
const root = '/Users/rogergv/Documents/SoftvibesLab/SalesAcademyVibes';
const evidence = __dirname;
const overrides = {
 'https://salesacademy.softvibes.cloud/styles.css': 'growth/deploy/versions/index/styles.css',
 'https://v5.salesacademy.softvibes.cloud/growth-assets/ai-journey.css': 'growth/site/assets/ai-journey.css',
 'https://v5.salesacademy.softvibes.cloud/growth-assets/scenarios/scenarios.css': 'growth/site/assets/scenarios/scenarios.css',
};
const urls = {
 index: 'https://salesacademy.softvibes.cloud/',
 landing: 'https://v5.salesacademy.softvibes.cloud/descubre/',
 gallery: 'https://v5.salesacademy.softvibes.cloud/growth-assets/scenarios/index.html',
};
const report = { startedAt: new Date().toISOString(), tlsValidated: true, mode: 'Public baseline versus candidate CSS overrides only', whatsappOpened: false, cmsLogin: false, pages: [], comparisons: [], issues: [] };
function save() { fs.writeFileSync(path.join(evidence, 'candidate-results.json'), JSON.stringify(report, null, 2)); }
async function readyImages(page) {
 await page.evaluate(async () => {
  for (const image of document.images) image.loading = 'eager';
  await Promise.all([...document.images].map(image => Promise.race([image.decode().catch(()=>{}), new Promise(r=>setTimeout(r,10000))])));
 });
}
async function measure(page, type) {
 return page.evaluate(type => {
  const rect = element => { if (!element) return null; const r = element.getBoundingClientRect(); return r.width && r.height ? {x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom} : null; };
  const visible = el => !!rect(el);
  const size = selector => [...document.querySelectorAll(selector)].filter(visible).map(el=>({width:parseFloat(getComputedStyle(el).width),height:parseFloat(getComputedStyle(el).height),rect:rect(el)}));
  const overlap = (a,b) => { const x=rect(a),y=rect(b); if(!x||!y)return false; return Math.min(x.right,y.right)-Math.max(x.x,y.x)>1 && Math.min(x.bottom,y.bottom)-Math.max(x.y,y.y)>1; };
  const collisions=[];
  if(type==='index') {
   const frame=document.querySelector('.screen-frame');
   for(const selector of ['.art-annotation','.featured-art figcaption'])if(overlap(frame,document.querySelector(selector)))collisions.push(selector);
  }
  if(type==='landing') {
   for(const scene of document.querySelectorAll('.ai-inline-scene'))if(overlap(scene.querySelector('.ai-inline-device'),scene.querySelector('figcaption')))collisions.push('inline-caption');
  }
  if(type==='gallery')for(const scene of document.querySelectorAll('.scene-visual'))if(overlap(scene.querySelector('.product-screen figcaption'),scene.querySelector('.scene-note')))collisions.push('gallery-caption-note');
  const ratios=[...document.querySelectorAll(type==='index'?'.screen-frame img':type==='landing'?'.ai-inline-device img':'.screen-original img')].filter(visible).map(img=>({natural:img.naturalWidth/img.naturalHeight,rendered:parseFloat(getComputedStyle(img).width)/parseFloat(getComputedStyle(img).height)}));
  return { viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,overflow:document.documentElement.scrollWidth>innerWidth,collisions,phones:size(type==='index'?'.screen-frame':type==='landing'?'.ai-device, .ai-inline-device':'.product-screen'),vsl:size('.ai-vsl-frame'),photos:size(type==='index'?'.room-photo':type==='landing'?'.ai-inline-photo, .ai-room-scene':'.context-photo'),ratios,images:[...document.images].map(img=>({src:img.src,complete:img.complete,width:img.naturalWidth})),chapters:document.querySelectorAll('[data-chapter]').length };
 },type);
}
async function visit(browser,width,type,candidate) {
 const context=await browser.newContext({viewport:{width,height:900},ignoreHTTPSErrors:false});
 const interceptions=[];
 if(candidate) await context.route('**/*',async route=>{
  const file=overrides[route.request().url()];
  if(file){interceptions.push(route.request().url());await route.fulfill({status:200,contentType:'text/css',body:fs.readFileSync(path.join(root,file))});}
  else await route.continue();
 });
 const page=await context.newPage();const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
 const response=await page.goto(urls[type],{waitUntil:'networkidle'});
 if(await page.locator('[data-consent="denied"]').isVisible())await page.locator('[data-consent="denied"]').click();
 await readyImages(page);
 await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
 const result={width,type,candidate,status:response.status(),interceptions,errors,initial:await measure(page,type),chapterStates:[]};
 if(type==='landing') {
  for(const id of ['start','method','practice','coaching','scale']) {
   await page.locator('#'+id).evaluate(el=>scrollTo({top:scrollY+el.getBoundingClientRect().top+el.getBoundingClientRect().height*.5-innerHeight*.5,behavior:'instant'}));
   await page.waitForTimeout(180);
   result.chapterStates.push(await page.evaluate(requested=>{
    const journey=document.querySelector('[data-journey]'),phone=document.querySelector('.ai-device'),copy=document.querySelector('#'+requested+' .journey-copy'),label=document.querySelector('.ai-device-label');
    const rect=el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom};};
    const hit=(a,b)=>{const x=rect(a),y=rect(b);return x.width&&x.height&&y.width&&y.height&&Math.min(x.right,y.right)-Math.max(x.x,y.x)>1&&Math.min(x.bottom,y.bottom)-Math.max(x.y,y.y)>1};
    return {requested,active:journey.dataset.active,enhanced:journey.classList.contains('journey-enhanced'),phoneWidth:parseFloat(getComputedStyle(phone).width)||0,phoneCopyCollision:!!hit(phone,copy),captionCopyCollision:!!hit(label,copy)};
   },id));
   if(candidate&&id==='practice'&&[390,980,1440].includes(width))await page.screenshot({path:path.join(evidence,`candidate-landing-${width}-practice.png`)});
  }
 }
 if(candidate&&[390,1440].includes(width)) {
  if(type==='index')await page.locator('.featured-art').scrollIntoViewIfNeeded();
  if(type==='gallery')await page.locator('#objection-practice .scene-visual').scrollIntoViewIfNeeded();
  if(type!=='landing')await page.screenshot({path:path.join(evidence,`candidate-${type}-${width}.png`)});
 }
 if(type==='landing'&&candidate&&width===1440) {
  await page.locator('[data-motion-toggle]').scrollIntoViewIfNeeded();await page.locator('[data-motion-toggle]').click();await page.waitForTimeout(100);
  result.reducedMotion=await page.locator('[data-journey]').evaluate(el=>({reduced:el.classList.contains('journey-reduced'),enhanced:el.classList.contains('journey-enhanced')}));
 }
 report.pages.push(result);save();await context.close();return result;
}
function compare(before,after){
 const record={width:before.width,type:before.type,phones:[],vslUnchanged:JSON.stringify(before.initial.vsl)===JSON.stringify(after.initial.vsl),photosUnchanged:JSON.stringify(before.initial.photos)===JSON.stringify(after.initial.photos)};
 before.initial.phones.forEach((phone,i)=>{const candidate=after.initial.phones[i];if(candidate&&phone.width)record.phones.push({before:phone.width,after:candidate.width,ratio:candidate.width/phone.width});});
 if(before.type==='landing'&&before.width>=980)record.phones.push({before:before.chapterStates[2].phoneWidth,after:after.chapterStates[2].phoneWidth,ratio:after.chapterStates[2].phoneWidth/before.chapterStates[2].phoneWidth});
 if(after.status!==200||after.errors.length||after.initial.overflow||after.initial.collisions.length||after.initial.images.some(i=>!i.complete||!i.width)||!record.vslUnchanged||!record.photosUnchanged||record.phones.some(p=>p.ratio<.74||p.ratio>.81)||after.initial.ratios.some(r=>Math.abs(r.natural-r.rendered)>.002)||after.chapterStates.some(s=>s.phoneCopyCollision||s.captionCopyCollision||(s.enhanced&&s.requested!==s.active)))report.issues.push({width:before.width,type:before.type,reason:'See page metrics and comparison'});
 report.comparisons.push(record);save();
}
(async()=>{
 const browser=await chromium.launch({headless:true});
 const widths=[360,390,768,980,1440,1920];
 async function work(width){for(const type of ['index','landing','gallery']){const before=await visit(browser,width,type,false);const after=await visit(browser,width,type,true);compare(before,after);process.stdout.write(`${width} ${type} compared\n`);}}
 for(let i=0;i<widths.length;i+=2)await Promise.all(widths.slice(i,i+2).map(work));
 await browser.close();report.finishedAt=new Date().toISOString();save();console.log(JSON.stringify({comparisons:report.comparisons.length,issues:report.issues}));
})().catch(error=>{report.issues.push({fatal:error.message});save();console.error(error);process.exit(1)});
