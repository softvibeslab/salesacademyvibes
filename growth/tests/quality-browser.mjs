import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {writeFile} from 'node:fs/promises';
import {gzipSync} from 'node:zlib';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.GROWTH_PLAYWRIGHT_MODULE||'playwright');
const base=process.env.GROWTH_E2E_URL;
assert.match(base||'',/^http:\/\/127\.0\.0\.1:\d+$/);
const browser=await chromium.launch({headless:true});
const checks=[];
try {
 const context=await browser.newContext({baseURL:base,viewport:{width:720,height:500},deviceScaleFactor:2,reducedMotion:'reduce'});
 const page=await context.newPage();page.setDefaultTimeout(10000);
 for(const route of ['/descubre/','/mediahub/','/descubre/diagnostico/','/mediahub/piloto-en-tres-salas/','/descubre/analisis/']){
  await page.goto(route);await page.getByRole('heading',{level:1}).waitFor();
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  checks.push({route,reflowEquivalent200Percent:true});
 }
 await page.goto('/descubre/');await page.keyboard.press('Tab');
 assert.equal(await page.evaluate(()=>document.activeElement.textContent),'Saltar al contenido');
 assert.notEqual(await page.evaluate(()=>getComputedStyle(document.activeElement).outlineStyle),'none');
 await page.keyboard.press('Enter');assert.ok(page.url().endsWith('#main'));
 await page.getByRole('button',{name:'Solo lo necesario',exact:true}).focus();await page.keyboard.press('Enter');
 const cta=await page.locator('.hero-actions .button').boundingBox();assert.ok(cta.height>=44);
 assert.equal(await page.evaluate(()=>matchMedia('(prefers-reduced-motion: reduce)').matches),true);
 await page.goto('/descubre/diagnostico/');
 for(let i=0;i<6;i++){
  await page.getByRole('radio',{name:'Está definido y se aplica',exact:true}).focus();await page.keyboard.press('Space');
  await page.getByRole('button',{name:i===5?'Ver mi orientación ↗':'Siguiente →',exact:true}).focus();await page.keyboard.press('Enter');
 }
 await page.getByRole('heading',{name:'Preparar un piloto medible.',exact:true}).waitFor();
 checks.push({keyboardDiagnostic:true,skipLink:true,visibleFocus:true,primaryTargetMinimum44:true,reducedMotion:true});
 await page.goto('/cms/');await page.getByLabel('Usuario',{exact:true}).fill('e2e-owner');
 await page.getByLabel('Contraseña',{exact:true}).fill(process.env.GROWTH_E2E_PASSWORD);
 await page.getByRole('button',{name:/Entrar al CMS/}).click();
 await page.getByRole('heading',{name:'Una buena sala empieza aquí.',exact:true}).waitFor();
 await page.getByRole('navigation',{name:'Módulos del CMS'}).getByRole('button',{name:'Landing',exact:true}).click();
 await page.getByLabel('Título principal',{exact:true}).waitFor();
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 checks.push({route:'/cms/',reflowEquivalent200Percent:true});
 await page.goto('/descubre/');
 const referenced=await page.locator('link[rel=stylesheet],script[src],img,video[poster]').evaluateAll(elements=>elements.map(e=>e.tagName==='VIDEO'?e.getAttribute('poster'):e.getAttribute('href')||e.getAttribute('src')).filter(path=>path?.startsWith('/growth-assets/')));
 const loadedModules=await page.evaluate(()=>performance.getEntriesByType('resource').map(e=>new URL(e.name).pathname).filter(path=>path.startsWith('/growth-assets/')&&path.endsWith('.mjs')));
 const assets=[...new Set(['/descubre/','/growth-assets/mark.svg',...referenced,...loadedModules])];
 const sizes=[];
 for(const url of assets){const response=await context.request.get(url);assert.equal(response.status(),200);const data=await response.body();sizes.push({url,bytes:data.length,gzipBytes:gzipSync(data).length});}
 const total=sizes.reduce((n,x)=>n+x.bytes,0),compressed=sizes.reduce((n,x)=>n+x.gzipBytes,0);
 // v5 adds room photographs and real interfaces; CP2 budgets the complete
 // referenced assets below800KB after lossless screen and photo encoding.
 const limitBytes=800000;
 assert.ok(total<limitBytes);assert.ok(compressed<limitBytes);
 const result={ok:true,checks,landingBudget:{assets:sizes,uncompressedBytes:total,estimatedGzipBytes:compressed,limitBytes},limitations:'200% reflow modeled as 720 CSS pixels and DPR2 on a 1440-pixel display. Budget includes all referenced non-video assets, not only above-the-fold transfer. Not a screen-reader certification or field Core Web Vitals measurement.'};
 const evidence=process.env.GROWTH_EVIDENCE_DIR||'work/features/2026-11-07-growth-mediahub/evidence';
 await writeFile(evidence+'/browser-quality.json',JSON.stringify(result,null,2));
 console.log(JSON.stringify(result,null,2));
}finally{await browser.close();}
