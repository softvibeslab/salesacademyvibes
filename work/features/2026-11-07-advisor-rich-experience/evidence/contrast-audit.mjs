import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),{chromium}=require('/Users/rogergv/Documents/SoftvibesLab/SalesAcademyVibes/vcsAcademyMobile/node_modules/playwright');
const browser=await chromium.launch({headless:true}),report=[];
try{
 for(const width of [1440,390,360]){
  const page=await browser.newPage({viewport:{width,height:900}});await page.goto('http://127.0.0.1:4310/descubre/',{waitUntil:'networkidle'});await page.locator('[data-advisor-open]').click();await page.locator('[data-advisor-suggestion]').first().waitFor();
  for(const tab of ['chat','demo']){
   await page.locator(`[data-advisor-tab=${tab}]`).click();await page.keyboard.press('Tab');
   const rows=await page.locator('.advisor-dialog').evaluate(root=>{
    const rgb=c=>c.match(/[\d.]+/g).map(Number),lum=c=>c.slice(0,3).map(n=>n/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((s,n,i)=>s+n*[.2126,.7152,.0722][i],0);
    const bg=el=>{for(let n=el;n;n=n.parentElement){const c=rgb(getComputedStyle(n).backgroundColor);if(c.length===3||c[3]===1)return c;}return[255,255,255];};
    const ratio=(a,b)=>(Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05);
    return [...root.querySelectorAll('button,input:not([type=checkbox]),select,textarea,.advisor-composer,fieldset')].filter(el=>el.getClientRects().length&&!el.disabled).map(el=>{
     const style=getComputedStyle(el),row={element:el.tagName,label:el.getAttribute('aria-label')||el.textContent.slice(0,40),border:style.borderTopColor,borderRatio:parseFloat(style.borderTopWidth)?ratio(rgb(style.borderTopColor),bg(el.parentElement)):null};
     if(el.matches('button,input,textarea,select')){el.focus();const focused=getComputedStyle(el);row.focus=focused.outlineStyle;row.focusRatio=ratio(rgb(focused.outlineColor),bg(el.parentElement));}return row;
    });
   });
   for(const r of rows){if(r.borderRatio!==null)assert.ok(r.borderRatio>=3,JSON.stringify({width,tab,...r}));if(r.focus){assert.equal(r.focus,'solid');assert.ok(r.focusRatio>=3,JSON.stringify({width,tab,...r}));}}
   report.push({width,tab,rows});
  }await page.close();
 }
 await writeFile('work/features/2026-11-07-advisor-rich-experience/evidence/contrast-controls.json',JSON.stringify(report,null,2));console.log('PASS border and keyboard focus ≥3:1 at 1440/390/360');
}finally{await browser.close();}
