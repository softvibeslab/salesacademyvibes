import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {mkdir, writeFile, readFile} from 'node:fs/promises';
const require = createRequire(import.meta.url);
const {chromium} = require(process.env.GROWTH_PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.GROWTH_E2E_URL;
assert.match(base || '', /^http:\/\/127\.0\.0\.1:\d+$/);
const evidence = process.env.GROWTH_EVIDENCE_DIR || 'work/features/2026-11-07-cinematic-journey/evidence';
await mkdir(`${evidence}/screenshots`, {recursive:true});
const browser = await chromium.launch({headless:true});
const context = await browser.newContext({baseURL:base, viewport:{width:1440,height:1000}, reducedMotion:'no-preference'});
const page = await context.newPage(); page.setDefaultTimeout(10000);
const results = [], errors = [], mediaRequests = [];
page.on('pageerror', error => errors.push(error.message));
page.on('request', request => {if (/\.mp4(?:$|\?)/.test(request.url())) mediaRequests.push(request.url());});
async function check(name, fn) {await fn(); results.push({name,passed:true}); console.log(`PASS ${name}`);}
try {
  await check('A continuous five-chapter journey is present before media playback', async () => {
    await page.goto('/descubre/');
    assert.equal(await page.locator('[data-journey]').count(), 1, 'The cinematic journey must exist');
    assert.equal(await page.locator('[data-chapter]').count(), 5);
    await page.getByRole('button',{name:'Solo lo necesario',exact:true}).click();
    await page.waitForFunction(() => document.querySelector('[data-journey]').classList.contains('journey-enhanced'));
    assert.deepEqual(mediaRequests, [], 'No MP4 request before choosing a film');
    await page.screenshot({path:`${evidence}/screenshots/cinematic-desktop.png`});
  });
  await check('Forward and reverse scrolling update the same scene and native anchors', async () => {
    for (const id of ['method','practice','coaching','scale','method']) {
      await page.locator(`[data-chapter="${id}"]`).scrollIntoViewIfNeeded();
      await page.waitForFunction(id => document.querySelector('[data-journey]').dataset.active === id, id);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      await page.screenshot({path:`${evidence}/screenshots/chapter-${id}.png`});
    }
    const stage = page.locator('[data-journey-stage]');
    assert.equal(await stage.count(), 1, 'One persistent stage across the journey');
  });
  await check('A manual motion preference and the system preference keep a linear readable version', async () => {
    await page.locator('[data-motion-toggle]').click();
    assert.equal(await page.locator('[data-journey]').evaluate(el=>el.classList.contains('journey-enhanced')),false);
    assert.equal(await page.locator('[data-motion-toggle]').getAttribute('aria-pressed'),'true');
    await page.reload();
    assert.equal(await page.locator('[data-journey]').evaluate(el=>el.classList.contains('journey-enhanced')),false);
    await page.locator('[data-motion-toggle]').click();
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.waitForFunction(()=>!document.querySelector('[data-journey]').classList.contains('journey-enhanced'));
    for(const chapter of await page.locator('[data-chapter]').all()) assert.ok((await chapter.innerText()).length>70);
    await page.emulateMedia({reducedMotion:'no-preference'});
  });
  await check('All five full films have local captions, native controls and defer transfer', async () => {
    const videos = page.locator('video');
    assert.equal(await videos.count(),5);
    for(const video of await videos.all()) {
      assert.equal(await video.getAttribute('preload'),'none');
      assert.ok(await video.evaluate(el=>el.controls && !el.autoplay && el.playsInline));
      assert.equal(await video.locator('track[kind="captions"][srclang="es"]').count(),1);
    }
    await videos.first().scrollIntoViewIfNeeded();
    assert.deepEqual(mediaRequests,[], 'Scrolling to films must not start MP4 transfer');
    const first = videos.first();
    await first.focus(); await page.keyboard.press('Space');
    await page.waitForFunction(()=>{const v=document.querySelector('video');return !v.paused && v.currentTime>0.1;});
    await first.press('Space');
    await page.waitForFunction(()=>document.querySelector('video').paused);
    assert.ok(mediaRequests.length >= 1);
    const caption = await first.locator('track').getAttribute('src');
    const response = await context.request.get(caption);
    assert.equal(response.status(),200); assert.match(await response.text(),/^WEBVTT/);
    await page.screenshot({path:`${evidence}/screenshots/film-player.png`});
  });
  await check('Mobile and no-JavaScript keep films, cases and readable content', async () => {
    for (const width of [360,390,720]) {
      await page.setViewportSize({width,height:844}); await page.goto('/descubre/');
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
      assert.equal(await page.locator('[data-journey]').evaluate(el=>el.classList.contains('journey-enhanced')),false);
      assert.equal(await page.locator('[data-chapter]').count(),5);
      await page.screenshot({path:`${evidence}/screenshots/cinematic-${width}.png`});
    }
    const nojs=await browser.newContext({baseURL:base,javaScriptEnabled:false,viewport:{width:390,height:844}});
    const p=await nojs.newPage();await p.goto('/descubre/');
    assert.equal(await p.locator('[data-chapter]').count(),5);
    assert.equal(await p.locator('video[controls]').count(),5);
    assert.equal(await p.locator('[data-journey]').evaluate(el=>el.classList.contains('journey-enhanced')),false);
    assert.equal(await p.locator('#demo-form').getAttribute('method'),'post');
    assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    await nojs.close();
  });
  assert.deepEqual(errors,[]);
  await writeFile(`${evidence}/cinematic-results.json`,JSON.stringify({ok:true,results,errors,mediaRequests},null,2));
} catch(error) {
  await page.screenshot({path:`${evidence}/screenshots/cinematic-failure.png`,fullPage:true}).catch(()=>{});
  await writeFile(`${evidence}/cinematic-results.json`,JSON.stringify({ok:false,results,error:String(error),errors},null,2));
  throw error;
} finally {await browser.close();}
