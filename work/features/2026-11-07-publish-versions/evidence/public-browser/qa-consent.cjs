const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('/Users/rogergv/Documents/SoftvibesLab/SalesAcademyVibes/vcsAcademyMobile/node_modules/playwright');
(async () => {
 const browser = await chromium.launch({ headless: true });
 const results = [];
 try {
  for (const width of [1440,390]) {
   const context = await browser.newContext({ viewport:{width,height:900}, isMobile:width<700,hasTouch:width<700,ignoreHTTPSErrors:false });
   const page=await context.newPage();
   await page.goto('https://v5.salesacademy.softvibes.cloud/descubre/',{waitUntil:'networkidle'});
   await page.getByRole('button',{name:'Solo lo necesario',exact:true}).click();
   const panelHidden=await page.locator('#consent-panel').isHidden();
   await page.screenshot({path:path.join(__dirname,'v5-'+width+'-hero-necessary.png')});
   await page.locator('[data-vsl]').screenshot({path:path.join(__dirname,'v5-'+width+'-vsl-necessary.png')});
   await page.locator('#practice').scrollIntoViewIfNeeded(); await page.waitForFunction(() => [...document.querySelectorAll('#practice img')].every(img => img.complete && img.naturalWidth > 0), null, {timeout:15000}); await page.waitForTimeout(200);
   await page.screenshot({path:path.join(__dirname,'v5-'+width+'-practice-necessary.png')});
   const preference=await page.evaluate(()=>localStorage.getItem('sa.growth.consent'));
   results.push({width,panelHidden,preference});
   await context.close();
  }
  fs.writeFileSync(path.join(__dirname,'consent-results.json'),JSON.stringify(results,null,2));
  process.stdout.write(JSON.stringify(results,null,2));
 } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1});
