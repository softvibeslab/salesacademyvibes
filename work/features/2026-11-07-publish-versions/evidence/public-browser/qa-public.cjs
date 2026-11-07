const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('/Users/rogergv/Documents/SoftvibesLab/SalesAcademyVibes/vcsAcademyMobile/node_modules/playwright');
const evidence = __dirname;
const origin = 'https://salesacademy.softvibes.cloud';
const report = { startedAt: new Date().toISOString(), tlsValidation: true, cmsLogin: false, whatsappActivated: false, dnsOverride: false, checks: [], issues: [] };
let browser;
function save() { fs.writeFileSync(path.join(evidence, 'results.json'), JSON.stringify(report, null, 2)); }
function observe(page) {
 const log = { consoleErrors: [], pageErrors: [], httpErrors: [], failedRequests: [], expectedAborts: [] };
 page.on('console', message => { if (message.type() === 'error') log.consoleErrors.push(message.text()); });
 page.on('pageerror', error => log.pageErrors.push(error.message));
 page.on('response', response => { if (response.status() >= 400) log.httpErrors.push({ status: response.status(), url: response.url() }); });
 page.on('requestfailed', request => { const entry = { url: request.url(), error: request.failure()?.errorText }; (entry.error?.includes('ERR_ABORTED') ? log.expectedAborts : log.failedRequests).push(entry); });
 return log;
}
async function inspect(page) {
 return page.evaluate(() => ({ title: document.title, width: innerWidth, scrollWidth: document.documentElement.scrollWidth, horizontalOverflow: document.documentElement.scrollWidth > innerWidth, h1: [...document.querySelectorAll('h1')].map(el => el.textContent.trim()), imageCount: document.images.length, loadedImages: [...document.images].filter(img => img.complete && img.naturalWidth > 0).length, brokenImages: [...document.images].filter(img => img.complete && img.naturalWidth === 0 && img.getAttribute('src')).map(img => img.src), localhostLinks: [...document.querySelectorAll('[href], [src]')].map(el => el.getAttribute('href') || el.getAttribute('src')).filter(url => /localhost|127\.0\.0\.1/.test(url)), scriptCount: document.scripts.length, whatsappTargets: [...document.querySelectorAll('a[href*="wa.me"]')].map(el => el.href), mainCount: document.querySelectorAll('main').length }));
}
async function scrollAll(page) {
 await page.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * .85) { scrollTo(0, y); await new Promise(resolve => setTimeout(resolve, 90)); } });
 await page.waitForTimeout(500);
}
async function run(name, fn) {
 try { const data = await fn(); report.checks.push({ name, ...data }); if (data.geometry?.horizontalOverflow || data.geometry?.brokenImages.length || data.geometry?.localhostLinks.length || data.log?.pageErrors.length || data.log?.httpErrors.length || data.log?.failedRequests.length) report.issues.push({ name, reason: 'See geometry/network fields' }); }
 catch (error) { report.issues.push({ name, error: error.message }); }
 save();
 process.stdout.write(name + ' complete\n');
}
(async () => {
 browser = await chromium.launch({ headless: true });
 let context = await browser.newContext({ ignoreHTTPSErrors: false });
 let probe = await context.newPage();
 try {
  const response = await probe.goto(origin, { waitUntil: 'domcontentloaded', timeout: 20000 });
  report.defaultDNS = { status: response.status(), securityDetails: await response.securityDetails() };
 } catch (error) {
  report.defaultDNS = { error: error.message };
  if (!/ERR_NAME_NOT_RESOLVED|ERR_DNS|NXDOMAIN/.test(error.message)) throw error;
  await browser.close();
  report.dnsOverride = true;
  report.dnsOverrideReason = 'Local resolver returned NXDOMAIN; map only the authorized hostnames to 76.13.231.12, while preserving HTTPS certificate validation.';
  browser = await chromium.launch({ headless: true, args: ['--host-resolver-rules=MAP salesacademy.softvibes.cloud 76.13.231.12, MAP *.salesacademy.softvibes.cloud 76.13.231.12'] });
  context = await browser.newContext({ ignoreHTTPSErrors: false });
  probe = await context.newPage();
  const response = await probe.goto(origin, { waitUntil: 'domcontentloaded', timeout: 30000 });
  report.mappedDNS = { status: response.status(), securityDetails: await response.securityDetails() };
 }
 await context.close(); save();
 for (const width of [1440, 390]) {
  await run('index-' + width, async () => {
   const ctx = await browser.newContext({ viewport: { width, height: 900 }, javaScriptEnabled: false, ignoreHTTPSErrors: false });
   const page = await ctx.newPage(); const log = observe(page);
   const response = await page.goto(origin, { waitUntil: 'networkidle' });
   await page.screenshot({ path: path.join(evidence, 'index-' + width + '.png'), fullPage: true });
   await page.keyboard.press('Tab');
   const skipFocused = await page.locator('.skip').evaluate(el => el === document.activeElement);
   const geometry = await inspect(page);
   const versionLinks = await page.locator('a[href$="/descubre/"]').evaluateAll(links => links.map(link => link.href));
   const result = { status: response.status(), noJavaScript: true, skipFocused, versionLinks, geometry, log };
   await ctx.close(); return result;
  });
 }
 for (let version = 1; version <= 5; version++) {
  await run('version-' + version + '-navigation', async () => {
   const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ignoreHTTPSErrors: false });
   const page = await ctx.newPage(); const log = observe(page);
   await page.goto(origin, { waitUntil: 'networkidle' });
   const destination = 'https://v' + version + '.salesacademy.softvibes.cloud/descubre/';
   await page.locator('a[href="' + destination + '"]').click();
   await page.waitForURL(destination); await page.waitForLoadState('networkidle');
   await scrollAll(page);
   const geometry = await inspect(page);
   await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(200);
   await page.screenshot({ path: path.join(evidence, 'v' + version + '-desktop-hero.png') });
   const result = { finalURL: page.url(), geometry, log };
   await ctx.close(); return result;
  });
 }
 for (const width of [1440, 390]) {
  await run('v5-experience-' + width, async () => {
   const ctx = await browser.newContext({ viewport: { width, height: 900 }, isMobile: width < 700, hasTouch: width < 700, ignoreHTTPSErrors: false });
   const page = await ctx.newPage(); const log = observe(page);
   const response = await page.goto('https://v5.salesacademy.softvibes.cloud/descubre/', { waitUntil: 'networkidle' });
   await page.screenshot({ path: path.join(evidence, 'v5-' + width + '-hero.png') });
   const video = page.locator('[data-vsl] video');
   const before = await video.evaluate(el => ({ paused: el.paused, autoplay: el.autoplay, controls: el.controls, preload: el.preload, captions: [...el.querySelectorAll('track')].map(track => ({ src: track.src, language: track.srclang, default: track.default })) }));
   await video.scrollIntoViewIfNeeded();
   await video.evaluate(async el => { el.muted = true; await el.play(); });
   await page.waitForFunction(() => document.querySelector('[data-vsl] video').currentTime > 1, null, { timeout: 30000 });
   const playback = await video.evaluate(el => { const data = { duration: el.duration, currentTime: el.currentTime, videoWidth: el.videoWidth, videoHeight: el.videoHeight, readyState: el.readyState, error: el.error?.message ?? null, captionsLoaded: [...el.textTracks].map(track => ({ language: track.language, mode: track.mode, cues: track.cues?.length ?? 0 })) }; el.pause(); return data; });
   await page.screenshot({ path: path.join(evidence, 'v5-' + width + '-vsl.png') });
   const states = [];
   for (const id of ['start', 'method', 'practice', 'coaching', 'scale']) {
    await page.locator('#' + id).scrollIntoViewIfNeeded();
    await page.waitForTimeout(220);
    states.push(await page.locator('[data-journey]').evaluate((el, requested) => ({ requested, active: el.dataset.active, enhanced: el.classList.contains('journey-enhanced'), reduced: el.classList.contains('journey-reduced'), progress: el.style.getPropertyValue('--journey-progress') }), id));
    if (id === 'practice') await page.screenshot({ path: path.join(evidence, 'v5-' + width + '-practice.png') });
   }
   const toggle = page.locator('[data-motion-toggle]');
   await toggle.scrollIntoViewIfNeeded(); await toggle.click();
   const reducedMotion = await page.locator('[data-journey]').evaluate(el => ({ reduced: el.classList.contains('journey-reduced'), enhanced: el.classList.contains('journey-enhanced'), button: el.querySelector('[data-motion-toggle]').getAttribute('aria-pressed') }));
   await scrollAll(page);
   const geometry = await inspect(page);
   const galleryLink = await page.locator('a[href="/growth-assets/scenarios/index.html"]').first().getAttribute('href');
   await page.locator('a[href="/growth-assets/scenarios/index.html"]').first().click();
   await page.waitForURL('**/growth-assets/scenarios/index.html'); await page.waitForLoadState('networkidle');
   const galleryNavigation = page.url();
   await page.screenshot({ path: path.join(evidence, 'gallery-' + width + '-hero.png') });
   await page.locator('.chapter-index a[href="#objection-practice"]').click(); await page.waitForTimeout(1300);
   const galleryAnchor = await page.evaluate(() => ({ hash: location.hash, active: document.querySelector('.chapter-index [aria-current="step"]')?.getAttribute('href'), progress: document.querySelector('[data-progress]')?.textContent }));
   await page.screenshot({ path: path.join(evidence, 'gallery-' + width + '-practice.png') });
   await scrollAll(page);
   const galleryGeometry = await inspect(page);
   const counts = { scenarios: await page.locator('article.scenario').count(), captures: await page.locator('.catalog-card').count() };
   await page.locator('#catalogo').scrollIntoViewIfNeeded(); await page.waitForTimeout(300);
   await page.screenshot({ path: path.join(evidence, 'gallery-' + width + '-catalog.png') });
   const originals = [];
   for (const link of await page.locator('.catalog-card').evaluateAll(links => links.map(link => link.href))) { const asset = await ctx.request.get(link); originals.push({ url: link, status: asset.status(), contentType: asset.headers()['content-type'] }); }
   const result = { status: response.status(), before, playback, states, reducedMotion, galleryLink, galleryNavigation, galleryAnchor, counts, originals, geometry, galleryGeometry, log };
   await ctx.close(); return result;
  });
 }
 await browser.close(); report.finishedAt = new Date().toISOString(); save();
 process.stdout.write(JSON.stringify({ checks: report.checks.length, issues: report.issues, dnsOverride: report.dnsOverride, evidence }, null, 2));
})().catch(async error => { report.issues.push({ fatal: error.message }); save(); if (browser) await browser.close(); process.exitCode = 1; console.error(error); });
