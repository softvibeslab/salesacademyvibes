/** Export labelled editorial compositions from the local HTML, preserving raw app PNGs. */
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {resolve} from 'node:path';

const require = createRequire(import.meta.url);
const {chromium} = require(process.env.GROWTH_PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.GROWTH_E2E_URL;
assert.match(base || '', /^http:\/\/(?:127\.0\.0\.1|localhost|[a-z0-9-]+\.localhost):\d+$/);
const root = resolve('work/features/2026-11-07-room-scenarios');
const evidenceRoot = resolve(process.env.GROWTH_SCENARIO_FEATURE || root);
const output = resolve('growth/site/assets/scenarios/compositions');
const storyboard = JSON.parse(await readFile(`${root}/evidence/video/scenario-storyboard.json`, 'utf8'));
await mkdir(output, {recursive:true});
const browser = await chromium.launch({headless:true});
try {
  const page = await browser.newPage({viewport:{width:1600,height:1000},deviceScaleFactor:1,reducedMotion:'reduce'});
  const response = await page.goto(`${base}/growth-assets/scenarios/index.html`);
  assert.equal(response.status(),200);
  await page.evaluate(async () => {
    document.body.classList.add('export-mode');
    for (const img of document.images) img.loading = 'eager';
    await Promise.all([...document.images].map(img => img.decode()));
    await document.fonts.ready;
  });
  const results=[];
  for (const scene of storyboard.scenarios) {
    const element=page.locator(`article.scenario#${scene.id}`);
    const name=`${String(scene.order).padStart(2,'0')}-${scene.id}.png`;
    const bounds=await element.boundingBox();
    assert.equal(bounds.width,1600);
    assert.equal(bounds.height,1000);
    assert.match(await element.innerText(),/Simulación de uso/i);
    const bytes=await element.screenshot({path:`${output}/${name}`,animations:'disabled'});
    results.push({id:scene.id,file:name,width:1600,height:1000,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex'),classification:'Composición editorial: captura real de demo + fotografía IA + relato ficticio'});
  }
  await mkdir(`${evidenceRoot}/evidence`, {recursive:true});
  await writeFile(`${evidenceRoot}/evidence/compositions.json`,JSON.stringify({createdAt:new Date().toISOString(),method:'Local HTML rendered with Chromium at DPR1; raw screenshots remain unchanged',items:results},null,2));
  console.log(JSON.stringify({exported:results.length,folder:output,bytes:results.reduce((n,r)=>n+r.bytes,0)}));
} finally {await browser.close();}
