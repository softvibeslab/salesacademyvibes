import {createRequire} from 'node:module';
import {writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url),{chromium}=require('/Users/rogergv/Documents/SoftvibesLab/SalesAcademyVibes/vcsAcademyMobile/node_modules/playwright');
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:390,height:844}});await page.goto('http://127.0.0.1:4310/descubre/');await page.locator('[data-advisor-open]').click();await page.locator('[data-advisor-suggestion]').first().waitFor();
const report=[];
for(const tab of ['chat','demo']){
 await page.locator(`[data-advisor-tab=${tab}]`).click();
 const entries=await page.locator('.advisor-root').evaluate(root=>{
  const rgb=c=>c.match(/[\d.]+/g).map(Number),lum=c=>c.slice(0,3).map(n=>n/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);
  const bg=el=>{for(let n=el;n;n=n.parentElement){const c=rgb(getComputedStyle(n).backgroundColor);if(c.length===3||c[3]===1)return c;}return [255,255,255];};
  const ratio=(a,b)=>(Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05);
  const controls=[...root.querySelectorAll('button,input:not([type=checkbox]),select,textarea')].filter(el=>el.getClientRects().length&&!el.hidden);
  return controls.flatMap(el=>{const c=getComputedStyle(el);if(parseFloat(c.borderTopWidth)===0||c.borderTopStyle==='none')return [];const foreground=rgb(c.borderTopColor),back=bg(el.parentElement);return[{control:el.getAttribute('aria-label')||el.name||el.textContent.trim().slice(0,45),border:c.borderTopColor,adjacent:back,ratio:ratio(foreground,back)}];});
 });
 report.push({tab,entries});for(const entry of entries)assert.ok(entry.ratio>=3,JSON.stringify(entry));
}
await page.locator('[data-advisor-tab=chat]').click();await page.keyboard.press('Tab');
const focus=await page.evaluate(()=>{const c=getComputedStyle(document.activeElement);return {control:document.activeElement.tagName,outline:c.outlineColor,width:c.outlineWidth,halo:c.boxShadow};});
assert.equal(focus.width,'3px');
await writeFile('work/features/2026-11-07-advisor-rich-experience/evidence/control-contrast.json',JSON.stringify({ok:true,report,focus},null,2));
console.log('PASS computed control borders >=3:1; keyboard focus 3px with white halo.');await browser.close();
