import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {mkdir, writeFile} from 'node:fs/promises';

const require = createRequire(import.meta.url);
const {chromium} = require(process.env.GROWTH_PLAYWRIGHT_MODULE || 'playwright');
const baseURL = process.env.GROWTH_E2E_URL;
assert.match(baseURL || '', /^http:\/\/(?:127\.0\.0\.1|localhost|[a-z0-9-]+\.localhost):\d+$/);
const evidence = process.env.GROWTH_EVIDENCE_DIR || 'work/features/2026-11-07-room-scenarios/evidence/browser';
await mkdir(evidence, {recursive: true});
const browser = await chromium.launch({headless: true});
const context = await browser.newContext({baseURL, viewport: {width: 1440, height: 1000}});
const page = await context.newPage();
const results = [], errors = [], writes = [], external = [];
page.on('pageerror', error => errors.push(error.message));
page.on('request', request => {
  if (!['GET', 'HEAD'].includes(request.method())) writes.push(request.url());
  if (new URL(request.url()).origin !== new URL(baseURL).origin) external.push(request.url());
});
const route = '/growth-assets/scenarios/index.html';
const ids = ['daily-intention', 'tour-preparation', 'needs-discovery', 'objection-practice', 'leader-coaching', 'learning-close'];
async function check(name, fn) {await fn(); results.push({name, passed: true}); console.log(`PASS ${name}`);}
try {
  await check('Six scenarios, fifteen original captures and the supplied retouched screen are available', async () => {
    const response = await page.goto(route);
    assert.equal(response.status(), 200, 'The scenario gallery must exist');
    assert.deepEqual(await page.locator('article.scenario').evaluateAll(elements => elements.map(el => el.id)), ids);
    assert.equal(await page.locator('.catalog-card').count(), 16);
    for (const scene of await page.locator('article.scenario').all()) {
      assert.ok((await scene.locator('h2').innerText()).length > 10);
      // textContent checks semantic labels independently of CSS uppercase presentation.
      assert.match(await scene.textContent(), /Simulación de uso/);
      if (await scene.getAttribute('id') === 'tour-preparation') {
        assert.match(await scene.textContent(), /retocada/i);
        assert.equal(await scene.locator('a[href$="16-meet-greet-original.png"]').count(), 1);
      } else {
        assert.match(await scene.textContent(), /Captura de la demo/);
      }
      assert.match(await scene.textContent(), /Siguiente decisión/);
      assert.equal(await scene.locator('.screen-original').count(), 1);
      assert.equal(await scene.locator('a[download]').count(), 1);
    }
    for (const img of await page.locator('img').all()) {
      assert.ok((await img.getAttribute('alt')).length > 5);
      const path = await img.getAttribute('src');
      const response = await context.request.get(new URL(path, `${baseURL}${route}`).href);
      assert.equal(response.status(), 200, `Image must resolve: ${path}`);
    }
  });
  await check('Native chapter navigation works in both directions with visible keyboard focus', async () => {
    await page.locator('.chapter-index a[href="#objection-practice"]').click();
    await page.waitForFunction(() => location.hash === '#objection-practice');
    await page.locator('#objection-practice .scenario-next').click();
    assert.equal(new URL(page.url()).hash, '#leader-coaching');
    await page.locator('#leader-coaching .scenario-prev').click();
    assert.equal(new URL(page.url()).hash, '#objection-practice');
    // Switch to keyboard modality before checking the native :focus-visible heuristic.
    await page.keyboard.press('Tab');
    await page.locator('#objection-practice .scenario-next').focus();
    assert.equal(await page.locator('#objection-practice .scenario-next').evaluate(el => el.matches(':focus-visible')), true);
    await page.keyboard.press('Enter');
    assert.equal(new URL(page.url()).hash, '#leader-coaching');
    await page.waitForFunction(() => document.querySelector('.chapter-index [aria-current="step"]')?.hash === '#leader-coaching');
  });
  await check('Responsive layouts and reduced motion keep every scene readable', async () => {
    for (const width of [360, 390, 1440]) {
      await page.setViewportSize({width, height: 1000});
      await page.goto(route);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `No overflow at ${width}`);
      assert.equal(await page.locator('article.scenario:visible').count(), 6);
      await page.screenshot({path: `${evidence}/gallery-${width}.png`});
    }
    await page.emulateMedia({reducedMotion: 'reduce'});
    assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
    assert.equal(await page.locator('article.scenario:visible').count(), 6);
  });
  await check('No-JavaScript provides all stories, screenshots and native next links', async () => {
    const nojs = await browser.newContext({baseURL, javaScriptEnabled: false, viewport: {width: 390, height: 844}});
    const p = await nojs.newPage();
    await p.goto(route);
    assert.equal(await p.locator('article.scenario:visible').count(), 6);
    await p.locator('#daily-intention .scenario-next').click();
    assert.equal(new URL(p.url()).hash, '#tour-preparation');
    assert.equal(await p.locator('.catalog-card').count(), 16);
    assert.equal(await p.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    await nojs.close();
  });
  await check('Export mode preserves the complete story in a 1600 by 1000 composition', async () => {
    await page.setViewportSize({width: 1600, height: 1000});
    await page.goto(route);
    await page.evaluate(() => document.body.classList.add('export-mode'));
    for (const scene of await page.locator('article.scenario').all()) {
      const box = await scene.boundingBox();
      assert.equal(box.width, 1600);
      assert.equal(box.height, 1000);
      assert.equal(await scene.evaluate(el => el.scrollHeight > el.clientHeight), false, `Composition must not clip: ${await scene.getAttribute('id')}`);
    }
    await page.locator('#daily-intention').screenshot({path: `${evidence}/export-sample.png`});
  });
  await check('The gallery makes no remote requests or operational writes', async () => {
    assert.deepEqual(writes, []);
    assert.deepEqual(external, []);
    assert.deepEqual(errors, []);
  });
  await writeFile(`${evidence}/results.json`, JSON.stringify({ok: true, results, errors, writes, external}, null, 2));
} catch (error) {
  await page.screenshot({path: `${evidence}/failure.png`, fullPage: true}).catch(() => {});
  await writeFile(`${evidence}/results.json`, JSON.stringify({ok: false, results, error: String(error), errors, writes, external}, null, 2));
  throw error;
} finally {await browser.close();}
