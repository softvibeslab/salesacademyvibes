const fs=require('node:fs');
const path=require('node:path');
const {chromium}=require('/Users/rogergv/Documents/SoftvibesLab/SalesAcademyVibes/vcsAcademyMobile/node_modules/playwright');
const report=[];
(async()=>{
 const browser=await chromium.launch({headless:true});
 for(const width of [360,390]){
  const context=await browser.newContext({viewport:{width,height:900},ignoreHTTPSErrors:false});
  await context.route('https://salesacademy.softvibes.cloud/styles.css',route=>route.fulfill({status:200,contentType:'text/css',body:fs.readFileSync('/Users/rogergv/Documents/SoftvibesLab/SalesAcademyVibes/growth/deploy/versions/index/styles.css')}));
  const page=await context.newPage();await page.goto('https://salesacademy.softvibes.cloud/',{waitUntil:'networkidle'});
  await page.locator('.featured-art').scrollIntoViewIfNeeded();
  const result=await page.evaluate(()=>{
   const phone=document.querySelector('.screen-frame').getBoundingClientRect();
   const rect=r=>({x:r.x,y:r.y,right:r.right,bottom:r.bottom,width:r.width,height:r.height});
   const lines=[];
   for(const selector of ['.art-annotation','.featured-art figcaption']){
    const walker=document.createTreeWalker(document.querySelector(selector),NodeFilter.SHOW_TEXT);
    while(walker.nextNode()){
     const node=walker.currentNode;if(!node.textContent.trim())continue;
     const range=document.createRange();range.selectNodeContents(node);
     for(const r of range.getClientRects())lines.push({selector,text:node.textContent.trim(),rect:rect(r),overlap:Math.min(r.right,phone.right)-Math.max(r.x,phone.x)>1&&Math.min(r.bottom,phone.bottom)-Math.max(r.y,phone.y)>1});
    }
   }
   return {width:innerWidth,phone:rect(phone),lines,collisions:lines.filter(x=>x.overlap)};
  });
  report.push(result);await page.screenshot({path:path.join(__dirname,`candidate-index-text-${width}.png`)});await context.close();
 }
 await browser.close();fs.writeFileSync(path.join(__dirname,'index-text-geometry.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report.map(x=>({width:x.width,collisions:x.collisions.length}))));
 if(report.some(x=>x.collisions.length))process.exitCode=1;
})().catch(e=>{console.error(e);process.exit(1)});
