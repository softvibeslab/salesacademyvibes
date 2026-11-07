/** Real-media behavior for the prominent play control; no CMS or outbound CTA use. */
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {mkdir, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';

const require = createRequire(import.meta.url);
const {chromium} = require(process.env.GROWTH_PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.GROWTH_E2E_URL || 'http://127.0.0.1:4191';
const redOnly = process.env.FILM_PLAY_RED_ONLY === '1';
assert.match(base, /^(?:http:\/\/(?:127\.0\.0\.1|localhost|[a-z0-9-]+\.localhost):\d+|https:\/\/v5\.salesacademy\.softvibes\.cloud)$/);
const evidence = resolve(process.env.GROWTH_EVIDENCE_DIR || 'work/features/2026-11-07-film-play-cta/evidence/browser');
await mkdir(evidence, {recursive:true});
const report = {base, redOnly, startedAt:new Date().toISOString(), results:[], errors:[], cmsLogin:false, whatsappOpened:false};
const browser = await chromium.launch({headless:true});
const contexts = [];
const save = () => writeFile(`${evidence}/film-play-results.json`, JSON.stringify(report,null,2));
async function check(name, work) {
  try {const details = await work(); report.results.push({name,passed:true,...details}); console.log(`PASS ${name}`);}
  catch(error) {report.results.push({name,passed:false,error:String(error)}); throw error;}
  finally {await save();}
}
async function session(width=1440, options={}) {
  const context=await browser.newContext({baseURL:base,viewport:{width,height:1000},serviceWorkers:'block',...options});
  contexts.push(context);
  await context.route('https://wa.me/**', route=>route.abort());
  const page=await context.newPage(); page.setDefaultTimeout(10000);
  page.on('pageerror', error=>report.errors.push(error.message));
  const mp4=[]; context.on('request',request=>{if(/\.mp4(?:$|\?)/.test(request.url()))mp4.push(request.url());});
  return {context,page,mp4};
}
async function open(page, path='/descubre/') {
  const response=await page.goto(path,{waitUntil:'networkidle'});
  assert.equal(response.status(),200);
  const consent=page.getByRole('button',{name:'Solo lo necesario',exact:true});
  if(await consent.isVisible().catch(()=>false))await consent.click();
}
const playerFor = page=>page.locator('[data-vsl] [data-film-player]');
// Poll from the harness: browser requestAnimationFrame is unavailable in the no-JS case.
async function waitUntil(predicate,message) {
  const deadline=Date.now()+10000;
  while(Date.now()<deadline) {
    if(await predicate())return;
    await new Promise(resolve=>setTimeout(resolve,50));
  }
  assert.fail(message);
}
async function waitPlaying(page,selector='[data-vsl] video') {
  const initialTime=await page.locator(selector).evaluate(video=>video.currentTime);
  await waitUntil(()=>page.locator(selector).evaluate((video,initialTime)=>{
    const button=video?.closest('[data-film-player]')?.querySelector('[data-video-play]');
    return video&&!video.paused&&video.currentTime>initialTime+.05&&(!button||button.hidden);
  },initialTime),'The video must advance after activation and hide its play overlay');
}
async function waitPaused(page) {
  await waitUntil(()=>page.locator('[data-vsl] video').evaluate(video=>video.paused),'Native pause must stop playback');
}

try {
  const first=await session();
  await check('The conceptual films expose prominent semantic play buttons before media transfer',async()=>{
    await open(first.page);
    const controls=first.page.locator('[data-video-play]');
    assert.equal(await controls.count(),await first.page.locator('[data-film-player]').count(),'Every conceptual film must have a prominent play button; the requested control is absent');
    assert.ok(await controls.count()>0,'A prominent play control must exist');
    for(const button of await controls.all()) {
      assert.equal(await button.evaluate(el=>el.tagName),'BUTTON');
      assert.equal(await button.getAttribute('type'),'button');
      assert.ok(await button.isVisible(),'A paused film must offer its play button');
      assert.match((await button.getAttribute('aria-label'))||await button.innerText(),/película|reproducir/i);
    }
    assert.deepEqual(first.mp4,[],'No MP4 is requested before a playback gesture');
    return {players:await controls.count(),initialMp4Requests:first.mp4.length};
  });
  if(!redOnly) {
    for(const width of [1440,390]) {
      const {context,page,mp4}=width===1440?first:await session(width);
      await check(`A real click starts audible captioned playback with usable focus at ${width}px`,async()=>{
        if(width!==1440)await open(page);
        const player=playerFor(page),button=player.locator('[data-video-play]'),video=player.locator('video');
        await player.evaluate(el=>el.scrollIntoView({block:'center',behavior:'instant'}));
        assert.deepEqual(mp4,[]);
        const geometry=await button.evaluate(el=>{
          const b=el.getBoundingClientRect(),v=el.closest('[data-film-player]').querySelector('video').getBoundingClientRect();
          return {button:{x:b.x,y:b.y,width:b.width,height:b.height,bottom:b.bottom},video:{x:v.x,y:v.y,width:v.width,height:v.height,bottom:v.bottom},overflow:document.documentElement.scrollWidth>innerWidth};
        });
        assert.ok(geometry.button.width>=44&&geometry.button.height>=44);
        assert.equal(geometry.overflow,false);
        assert.ok(geometry.button.bottom<geometry.video.bottom-25,'Overlay must not cover the native bottom controls');
        await page.screenshot({path:`${evidence}/play-ready-${width}.png`});
        await button.click(); await waitPlaying(page);
        assert.equal(await button.isVisible(),false,'The CTA leaves the playing image unobstructed');
        assert.equal(await video.evaluate(el=>document.activeElement===el),true,'Keyboard focus transfers to native video controls');
        const state=await video.evaluate(el=>({muted:el.muted,volume:el.volume,controls:el.controls,autoplay:el.autoplay,playsInline:el.playsInline,duration:el.duration,captions:[...el.textTracks].map(t=>({language:t.language,mode:t.mode,cues:t.cues?.length||0}))}));
        assert.equal(state.muted,false);assert.ok(state.volume>0);assert.equal(state.controls,true);assert.equal(state.autoplay,false);assert.equal(state.playsInline,true);
        assert.ok(state.captions.some(t=>t.language==='es'&&t.mode==='showing'&&t.cues>0));
        await page.screenshot({path:`${evidence}/play-running-${width}.png`});
        await video.press('Space'); await waitPaused(page);await button.waitFor({state:'visible'});assert.equal(await button.isVisible(),true);
        return {geometry,state};
      });
      await check(`Enter and Space resume the film, and end-of-film offers replay at ${width}px`,async()=>{
        const player=playerFor(page),button=player.locator('[data-video-play]'),video=player.locator('video');
        await button.focus();await page.keyboard.press('Enter');await waitPlaying(page);
        assert.equal(await button.isVisible(),false);
        await video.press('Space');await waitPaused(page);await button.waitFor({state:'visible'});await button.focus();await page.keyboard.press('Space');await waitPlaying(page);
        await video.evaluate(el=>{el.currentTime=el.duration-.08;});
        await page.waitForFunction(()=>document.querySelector('[data-vsl] video').ended);
        await button.waitFor({state:'visible'});assert.equal(await button.isVisible(),true);await button.click();await waitPlaying(page);
        assert.ok(await video.evaluate(el=>el.currentTime<5&&!el.ended));
        await video.evaluate(el=>el.pause());await button.waitFor({state:'visible'});
      });
      await check(`Native controls remain operable after a pause at ${width}px`,async()=>{
        const player=playerFor(page),video=player.locator('video');await video.focus();await page.keyboard.press('Space');await waitPlaying(page);
        assert.equal(await player.locator('[data-video-play]').isVisible(),false);
        await video.press('Space');await waitPaused(page);
      });
    }
    await check('Starting another film pauses the first and restores its play control',async()=>{
      const {page}=await session();await open(page);
      const all=page.locator('[data-film-player]');
      await all.nth(0).locator('[data-video-play]').click();await waitPlaying(page);
      await all.nth(1).locator('[data-video-play]').click();
      await page.waitForFunction(()=>{const v=[...document.querySelectorAll('[data-film-player] video')];return v[0].paused&&!v[1].paused&&v[1].currentTime>.1;});
      await all.nth(0).locator('[data-video-play]').waitFor({state:'visible'});
      assert.equal(await all.nth(0).locator('[data-video-play]').isVisible(),true);
      await all.nth(1).locator('video').evaluate(el=>el.pause());
    });
    await check('MediaHub uses the same working prominent control',async()=>{
      const {page,mp4}=await session();await open(page);
      const route=await page.locator('.ai-vsl-transcript').getAttribute('href');await open(page,route);
      assert.deepEqual(mp4,[]);const button=page.locator('[data-video-play]');assert.equal(await button.count(),1);
      await button.click();await waitPlaying(page,'[data-film-player] video');assert.equal(await button.isVisible(),false);
      await page.locator('video').evaluate(el=>el.pause());return {route};
    });
    await check('Reduced motion disables decorative animation while keeping the CTA',async()=>{
      const {page}=await session(390,{reducedMotion:'reduce'});await open(page);
      const button=playerFor(page).locator('[data-video-play]');assert.equal(await button.isVisible(),true);
      const animations=await button.evaluate(el=>[el,...el.querySelectorAll('*')].flatMap(n=>['','::before','::after'].map(p=>getComputedStyle(n,p).animationName)));
      assert.ok(animations.every(name=>name==='none'),'No decorative animation under prefers-reduced-motion');
      return {animations};
    });
    await check('Without JavaScript native playback stays available and enhanced CTA stays hidden',async()=>{
      const {page,mp4}=await session(390,{javaScriptEnabled:false});await open(page);
      const player=playerFor(page),button=player.locator('[data-video-play]'),video=player.locator('video');
      assert.equal(await button.isVisible(),false);assert.equal(await video.evaluate(el=>el.controls),true);assert.deepEqual(mp4,[]);
      await video.focus();await page.keyboard.press('Space');await waitPlaying(page);await video.press('Space');await waitPaused(page);
    });
    await check('A media download failure exposes retry and successful retry clears recovery state',async()=>{
      const {context,page}=await session();const pattern='**/films/smart-agent.mp4*';await context.route(pattern,route=>route.abort());
      await open(page);const player=playerFor(page),button=player.locator('[data-video-play]');await button.click();
      await player.locator('[data-video-error]').waitFor({state:'visible'});await player.locator('[data-video-retry]').waitFor({state:'visible'});
      await context.unroute(pattern);await player.locator('[data-video-retry]').click();await waitPlaying(page);
      assert.equal(await player.locator('[data-video-error]').isVisible(),false);assert.equal(await button.isVisible(),false);
      await player.locator('video').evaluate(el=>el.pause());
    });
    assert.deepEqual(report.errors,[],'No uncaught browser errors');
  }
  report.ok=true;report.finishedAt=new Date().toISOString();await save();
} catch(error) {
  report.ok=false;report.error=String(error);report.finishedAt=new Date().toISOString();await save();
  throw error;
} finally {
  await Promise.all(contexts.map(context=>context.close()));await browser.close();
}
