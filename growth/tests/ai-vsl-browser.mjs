import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {mkdir, writeFile} from 'node:fs/promises';
const require = createRequire(import.meta.url);
const {chromium} = require(process.env.GROWTH_PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.GROWTH_E2E_URL;
assert.match(base || '', /^http:\/\/(?:127\.0\.0\.1|localhost|[a-z0-9-]+\.localhost):\d+$/);
const evidence = process.env.GROWTH_EVIDENCE_DIR || 'work/features/2026-11-07-ai-vsl/evidence/browser';
await mkdir(evidence, {recursive:true});
const message = 'Hola, quiero conocer los agentes de IA de Sales Academy y agendar una demo para mi sala de ventas.';
const ids = ['start','method','practice','coaching','scale'];
const results = [], errors = [], mediaRequests = [], interceptedWhatsApp = [], geometry = [], motion = [];
let initialBudget = null, deferredBudget = null;
const browser = await chromium.launch({headless:true});
const context = await browser.newContext({baseURL:base,viewport:{width:1440,height:1000},reducedMotion:'no-preference',serviceWorkers:'block'});
// Fulfil before network: this suite never opens a real WhatsApp conversation.
await context.route('https://wa.me/**', async route => {
  interceptedWhatsApp.push(route.request().url());
  await route.fulfill({status:200,contentType:'text/html',body:'<!doctype html><title>QA local</title><p>Enlace interceptado antes de salir a WhatsApp.</p>'});
});
context.on('request', request => {if (/\.mp4(?:$|\?)/.test(request.url())) mediaRequests.push(request.url());});
context.on('page', page => page.on('pageerror', error => errors.push(error.message)));
const page = await context.newPage(); page.setDefaultTimeout(10000);
function verifyWhatsApp(href) {
  assert.ok(href?.startsWith('https://wa.me/'), 'The demo CTA must explicitly point to WhatsApp');
  const url = new URL(href);
  assert.equal(url.hostname,'wa.me'); assert.equal(url.pathname,'/529843163268');
  assert.deepEqual([...url.searchParams.keys()],['text']);
  assert.equal(url.searchParams.get('text'),message,'Only the generic campaign text may be sent to WhatsApp');
  assert.equal(url.hash,'');
}
async function denyOptional(target = page) {
  const button = target.getByRole('button',{name:'Solo lo necesario',exact:true});
  if (await button.isVisible().catch(()=>false)) await button.click();
}
async function check(name, fn) {await fn();results.push({name,passed:true});console.log(`PASS ${name}`);}
async function diagnosticCheck() {
  await page.goto('/descubre/diagnostico/'); await denyOptional();
  for (let i=0;i<6;i++) {
    await page.getByRole('radio',{name:'Está definido y se aplica',exact:true}).check();
    await page.getByRole('button',{name:i===5?'Ver mi orientación ↗':'Siguiente →',exact:true}).click();
  }
  await page.locator('#diagnostic-result').waitFor({state:'visible'});
  verifyWhatsApp(await page.locator('#diagnostic-result .result-bottom a').getAttribute('href'));
}
async function vslPresence() {
  const response = await page.goto('/descubre/',{waitUntil:'networkidle'});
  assert.equal(response.status(),200);
  assert.equal(await page.locator('[data-vsl]').count(),1,'The requested VSL must be featured in the hero');
  assert.equal(await page.locator('video source[src="/growth-assets/films/smart-agent.mp4"]').count(),1,'The featured film must not be duplicated in the collection');
  const first = page.locator('video').first();
  assert.equal(await first.evaluate(el=>!!el.closest('[data-vsl]')),true);
  const visual = await page.locator('[data-vsl]').boundingBox();
  const journey = await page.locator('[data-journey]').boundingBox();
  assert.ok(visual.y<1000 && visual.y<journey.y,'The VSL must be discoverable before the long journey');
}
async function budgetSnapshot() {
  return page.evaluate(()=>{
    const items=[...performance.getEntriesByType('navigation'),...performance.getEntriesByType('resource')].map(e=>({url:new URL(e.name).pathname,encodedBodySize:e.encodedBodySize||0,transferSize:e.transferSize||0,kind:e.entryType}));
    const nonVideo=items.filter(e=>!e.url.endsWith('.mp4'));
    return {nonVideoEncodedBytes:nonVideo.reduce((n,e)=>n+e.encodedBodySize,0),nonVideoTransferBytes:nonVideo.reduce((n,e)=>n+e.transferSize,0),mp4EncodedBytes:items.filter(e=>e.url.endsWith('.mp4')).reduce((n,e)=>n+e.encodedBodySize,0),items};
  });
}
async function stageSnapshot(label) {
  const value=await page.evaluate(()=>{
    const root=document.querySelector('[data-journey]');
    const rect=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom}};
    const effectiveOpacity=e=>{let value=1;for(let p=e;p&&p!==root;p=p.parentElement){const s=getComputedStyle(p);if(s.display==='none'||s.visibility==='hidden')return 0;value*=Number(s.opacity)}return value};
    const read=selector=>[...root.querySelectorAll(selector)].map(e=>({src:e.getAttribute('src'),opacity:effectiveOpacity(e),transform:getComputedStyle(e).transform,rect:rect(e)}));
    const copy=root.querySelector(`[data-chapter="${root.dataset.active}"] .journey-copy`);
    return {active:root.dataset.active,copy:copy?rect(copy):null,photos:read('.ai-scene-world'),screens:read('.ai-product-screen'),frames:read('.ai-room-scene, .ai-device'),overflow:document.documentElement.scrollWidth>innerWidth};
  });
  assert.equal(value.overflow,false,`No horizontal overflow at ${label}`);
  assert.ok(value.copy,`The active chapter must have copy at ${label}`);
  for (const frame of value.frames.filter(e=>e.opacity>.08&&e.rect.width>0&&e.rect.height>0)) {
    const overlapX=Math.min(value.copy.right,frame.rect.right)-Math.max(value.copy.x,frame.rect.x);
    const overlapY=Math.min(value.copy.bottom,frame.rect.bottom)-Math.max(value.copy.y,frame.rect.y);
    assert.ok(overlapX<=1||overlapY<=1,`Visual frame must not cover text at ${label}; overlap ${overlapX.toFixed(1)}×${overlapY.toFixed(1)}`);
  }
  geometry.push({label,...value}); return value;
}
try {
  if (process.env.AI_VSL_RED_ONLY === '1') {
    for(const [name,fn] of [['Completed diagnostic uses the generic WhatsApp CTA',diagnosticCheck],['Requested VSL is featured once before the journey',vslPresence]]) {
      try {await fn();results.push({name,passed:true});} catch(error) {results.push({name,passed:false,error:String(error)});}
    }
    assert.ok(results.every(r=>r.passed),'New campaign requirements are absent in the preserved version');
  } else {
    await check('The hero features the requested film exactly once without automatic media transfer',async()=>{
      await vslPresence();
      initialBudget=await budgetSnapshot();
      assert.deepEqual(mediaRequests,[],'No MP4 request is allowed before a playback action');
      assert.equal(initialBudget.mp4EncodedBytes,0);
      for(const video of await page.locator('video').all()) {
        assert.equal(await video.getAttribute('preload'),'none');
        assert.ok(await video.evaluate(el=>el.controls&&!el.autoplay&&el.playsInline));
        assert.equal(await video.locator('track[kind="captions"][srclang="es"]').count(),1);
      }
      assert.equal(await page.locator('video').count(),5);
      await page.screenshot({path:`${evidence}/hero-desktop.png`});
      await denyOptional();
      const cta=page.locator('.hero-actions .button').first();
      verifyWhatsApp(await cta.getAttribute('href'));
      assert.ok((await cta.boundingBox()).height>=44);
      await page.keyboard.press('Tab');await cta.focus();
      assert.equal(await cta.evaluate(el=>el.matches(':focus-visible')),true);
    });
    await check('Photos and real screens change with five continuous chapters in both directions',async()=>{
      assert.equal(await page.locator('[data-chapter]').count(),5);
      assert.equal(await page.locator('[data-journey-stage]').count(),1);
      assert.ok(await page.locator('[data-journey-stage] .ai-scene-world').count()>=3);
      assert.ok(await page.locator('[data-journey-stage] .ai-product-screen').count()>=5);
      await page.waitForFunction(()=>document.querySelector('[data-journey]').classList.contains('journey-enhanced'));
      for(const id of [...ids,'practice','method']) {
        await page.locator(`[data-chapter="${id}"]`).scrollIntoViewIfNeeded();
        await page.waitForFunction(id=>document.querySelector('[data-journey]').dataset.active===id,id);
        await page.waitForTimeout(280);
        motion.push(await stageSnapshot(id));
        await page.screenshot({path:`${evidence}/chapter-${id}.png`});
      }
      const dominant = images => {
        const highest = Math.max(...images.map(image=>image.opacity));
        assert.ok(highest>.05,'A contextual photo or real interface must remain visible');
        return images.filter(image=>image.opacity===highest).map(image=>image.src).join('|');
      };
      assert.ok(new Set(motion.map(s=>dominant(s.screens))).size>=4,'The visible real interface must change across the journey');
      assert.ok(new Set(motion.map(s=>dominant(s.photos))).size>=3,'The visible room photograph must change across the journey');
      assert.ok(new Set(motion.map(s=>JSON.stringify(s.frames.map(x=>x.transform)))).size>1,'Scroll progress must change the visual transforms');
      for(const width of [980,1440]) {
        await page.setViewportSize({width,height:1000});
        for(let i=1;i<ids.length;i++) {
          const y=await page.locator(`[data-chapter="${ids[i]}"]`).evaluate(el=>el.getBoundingClientRect().top+scrollY);
          for(const fraction of [.25,.5,.75]) {
            await page.evaluate(y=>scrollTo(0,y),y-1000*fraction);
            await page.waitForTimeout(280);await stageSnapshot(`${width}-${ids[i]}-transition-${fraction}`);
          }
        }
      }
      assert.deepEqual(mediaRequests,[],'Scrolling must not request MP4 media');
      deferredBudget=await budgetSnapshot();
    });
    await check('Manual and system motion preferences preserve a complete linear story',async()=>{
      await page.locator('[data-motion-toggle]').click();
      assert.equal(await page.locator('[data-journey]').evaluate(el=>el.classList.contains('journey-enhanced')),false);
      await page.reload();
      assert.equal(await page.locator('[data-motion-toggle]').getAttribute('aria-pressed'),'true');
      await page.locator('[data-motion-toggle]').click();
      await page.emulateMedia({reducedMotion:'reduce'});
      await page.waitForFunction(()=>!document.querySelector('[data-journey]').classList.contains('journey-enhanced'));
      assert.equal(await page.locator('[data-chapter]:visible').count(),5);
      for(const chapter of await page.locator('[data-chapter]').all()) assert.ok((await chapter.textContent()).length>100);
      await page.emulateMedia({reducedMotion:'no-preference'});
    });
    await check('Mobile and no-JavaScript retain scenes, native VSL and WhatsApp contact',async()=>{
      for(const width of [360,390,1440]) {
        await page.setViewportSize({width,height:1000});await page.goto('/descubre/');
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
        assert.equal(await page.locator('[data-chapter]:visible').count(),5);
        verifyWhatsApp(await page.locator('.hero-actions .button').first().getAttribute('href'));
        await page.screenshot({path:`${evidence}/hero-${width}.png`});
        if(width<980) {
          assert.equal(await page.locator('[data-journey]').evaluate(el=>el.classList.contains('journey-enhanced')),false);
          await page.locator('[data-chapter="practice"]').scrollIntoViewIfNeeded();
          await page.waitForFunction(()=>[...document.querySelectorAll('[data-chapter="practice"] .ai-inline-scene img')].every(img=>img.complete&&img.naturalWidth>0));
          await page.screenshot({path:`${evidence}/practice-${width}.png`});
        }
      }
      const nojs=await browser.newContext({baseURL:base,javaScriptEnabled:false,viewport:{width:390,height:844}});
      const p=await nojs.newPage();await p.goto('/descubre/');
      assert.equal(await p.locator('[data-chapter]:visible').count(),5);
      assert.equal(await p.locator('[data-vsl] video[controls]').count(),1);
      assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
      verifyWhatsApp(await p.locator('.hero-actions .button').first().getAttribute('href'));
      assert.equal(await p.locator('[data-journey]').evaluate(el=>el.classList.contains('journey-enhanced')),false);
      await p.screenshot({path:`${evidence}/hero-nojs.png`});await nojs.close();
    });
    await check('Every public campaign surface uses the same safe WhatsApp destination',async()=>{
      for(const route of ['/descubre/','/mediahub/','/descubre/diagnostico/','/mediahub/un-dia-en-la-sala/','/descubre/analisis/','/growth-assets/scenarios/index.html']) {
        const response=await page.goto(route);assert.equal(response.status(),200);
        const links=page.locator('a[href^="https://wa.me/"]');assert.ok(await links.count()>0,`${route} must offer the campaign CTA`);
        for(const link of await links.all()) verifyWhatsApp(await link.getAttribute('href'));
      }
      await page.goto('/descubre/');await denyOptional();
      const cta=page.locator('.hero-actions .button').first();
      if(await cta.getAttribute('target')==='_blank') {
        const popupPromise=context.waitForEvent('page');await cta.click();const popup=await popupPromise;
        await popup.waitForLoadState();await popup.close();
      } else {await cta.click();await page.waitForURL('https://wa.me/**');}
      assert.equal(interceptedWhatsApp.length,1,'The destination must be intercepted before any real WhatsApp request');
      verifyWhatsApp(interceptedWhatsApp[0]);
    });
    await check('The featured VSL plays and pauses by keyboard with working local captions',async()=>{
      await page.goto('/descubre/');await denyOptional();
      const video=page.locator('[data-vsl] video');await video.scrollIntoViewIfNeeded();await video.focus();await page.keyboard.press('Space');
      await page.waitForFunction(()=>{const v=document.querySelector('[data-vsl] video');return !v.paused&&v.currentTime>.1;});
      await video.press('Space');await page.waitForFunction(()=>document.querySelector('[data-vsl] video').paused);
      const caption=await context.request.get(await video.locator('track').getAttribute('src'));
      assert.equal(caption.status(),200);assert.match(await caption.text(),/^WEBVTT/);
      await page.screenshot({path:`${evidence}/vsl-playing.png`});
    });
    await check('A failed VSL download exposes recovery and retry restores native playback',async()=>{
      const failContext=await browser.newContext({baseURL:base,viewport:{width:1440,height:1000},reducedMotion:'reduce'});
      const failed=await failContext.newPage();
      const pattern='**/films/smart-agent.mp4*';await failContext.route(pattern,route=>route.abort());
      await failed.goto('/descubre/');await denyOptional(failed);
      const video=failed.locator('[data-vsl] video');await video.focus();await failed.keyboard.press('Space');
      await failed.locator('[data-vsl] [data-video-error]').waitFor({state:'visible'});
      await failContext.unroute(pattern);
      await failed.locator('[data-vsl] [data-video-retry]').click();
      await failed.waitForFunction(()=>{const v=document.querySelector('[data-vsl] video');return !v.paused&&v.currentTime>.1;});
      assert.equal(await failed.locator('[data-vsl] [data-video-error]').isVisible(),false);
      await video.evaluate(el=>el.pause());await failContext.close();
    });
    await check('Completed diagnostic keeps answers private and uses the generic WhatsApp CTA',diagnosticCheck);
    assert.deepEqual(errors,[]);
  }
  await writeFile(`${evidence}/ai-vsl-results.json`,JSON.stringify({ok:true,results,errors,interceptedWhatsApp,initialBudget,deferredBudget,mediaRequests,geometry,limitations:'Local Chromium. ResourceTiming reports initial and scroll-loaded bytes; no field Core Web Vitals claim. WhatsApp route fulfilled locally before network; no message sent.'},null,2));
} catch(error) {
  await page.screenshot({path:`${evidence}/ai-vsl-failure.png`,fullPage:true}).catch(()=>{});
  await writeFile(`${evidence}/ai-vsl-results.json`,JSON.stringify({ok:false,results,error:String(error),errors,interceptedWhatsApp,initialBudget,deferredBudget,mediaRequests,geometry},null,2));
  throw error;
} finally {await browser.close();}
