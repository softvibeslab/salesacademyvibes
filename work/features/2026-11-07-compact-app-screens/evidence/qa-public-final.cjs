const fs=require('node:fs'),path=require('node:path');
const {chromium}=require('/Users/rogergv/Documents/SoftvibesLab/SalesAcademyVibes/vcsAcademyMobile/node_modules/playwright');
const candidates=JSON.parse(fs.readFileSync(path.join(__dirname,'candidate-results.json'))).pages;
const urls={index:'https://salesacademy.softvibes.cloud/',landing:'https://v5.salesacademy.softvibes.cloud/descubre/',gallery:'https://v5.salesacademy.softvibes.cloud/growth-assets/scenarios/index.html'};
const report={startedAt:new Date().toISOString(),cssIntercepted:false,tlsValidated:true,checks:[],issues:[]};
(async()=>{
 const browser=await chromium.launch({headless:true});
 for(const width of [390,1440])for(const type of ['index','landing','gallery']){
  const context=await browser.newContext({viewport:{width,height:900},ignoreHTTPSErrors:false});
  const page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
  const response=await page.goto(urls[type],{waitUntil:'networkidle'});
  if(await page.locator('[data-consent="denied"]').isVisible())await page.locator('[data-consent="denied"]').click();
  await page.evaluate(async()=>{for(const img of document.images)img.loading='eager';await Promise.all([...document.images].map(img=>img.decode().catch(()=>{})));scrollTo({top:0,behavior:'instant'});});
  const result=await page.evaluate(type=>{
   const widths=selector=>[...document.querySelectorAll(selector)].filter(el=>{const r=el.getBoundingClientRect();return r.width&&r.height}).map(el=>parseFloat(getComputedStyle(el).width));
   return {width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,phones:widths(type==='index'?'.screen-frame':type==='landing'?'.ai-device,.ai-inline-device':'.product-screen'),vsl:widths('.ai-vsl-frame'),imagesLoaded:[...document.images].every(img=>img.complete&&img.naturalWidth>0)};
  },type);
  const expected=candidates.find(x=>x.candidate&&x.width===width&&x.type===type);
  result.matchesCandidate=JSON.stringify(result.phones)===JSON.stringify(expected.initial.phones.map(p=>p.width))&&JSON.stringify(result.vsl)===JSON.stringify(expected.initial.vsl.map(p=>p.width));
  if(type==='index'&&width===390){await page.locator('.featured-art').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(__dirname,'public-final-index-390.png')});}
  if(type==='landing'&&width===1440){await page.locator('#practice').evaluate(el=>scrollTo({top:scrollY+el.getBoundingClientRect().top+el.getBoundingClientRect().height*.5-innerHeight*.5,behavior:'instant'}));await page.waitForTimeout(250);result.activeChapter=await page.locator('[data-journey]').getAttribute('data-active');await page.screenshot({path:path.join(__dirname,'public-final-landing-1440-practice.png')});}
  const entry={type,status:response.status(),errors,...result};report.checks.push(entry);
  if(entry.status!==200||entry.errors.length||entry.overflow||!entry.imagesLoaded||!entry.matchesCandidate||(entry.activeChapter&&entry.activeChapter!=='practice'))report.issues.push(entry);
  await context.close();console.log(`${width} ${type}: ${entry.matchesCandidate?'candidate matched':'MISMATCH'}`);
 }
 await browser.close();report.finishedAt=new Date().toISOString();fs.writeFileSync(path.join(__dirname,'public-final.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({checks:report.checks.length,issues:report.issues.length}));if(report.issues.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exit(1)});
