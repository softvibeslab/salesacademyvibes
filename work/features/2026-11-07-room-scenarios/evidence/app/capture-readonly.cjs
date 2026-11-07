/** Real unmodified browser captures. Only UI navigation; no form submission. */
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || '/Users/rogergv/Documents/SoftvibesLab/SalesAcademyVibes/vcsAcademyMobile/node_modules/playwright');
const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const OUTPUT = __dirname;
const BASE = 'https://salesacademy.softvibes.art/';
const captures = [
 {id:'01-today-mobile', title:'Home: jornada de sala', actions:[], observed:['Presentaciones','Tours de hoy'], context:'Vista inicial; Ana, Sala Norte; la propia app presenta metas de ejemplo.'},
 {id:'02-calendar-mobile', title:'Calendario de tours', actions:['[data-go="calendario"]'], observed:['Calendario','Los tours los asigna el jefe de sala'], context:'Calendario visible de Ana sin cambiar fechas ni tours.'},
 {id:'03-roadmap-mobile', title:'Roadmap: 11 pasos', actions:['[data-go="roadmap"]'], observed:['11 pasos','5. Renovar el pacto'], context:'Progreso de ejemplo:4 de11módulos.'},
 {id:'04-discovery-mobile', title:'Paso4: Descubrimiento', actions:['[data-go="roadmap"]','[data-go="modulo"][data-id="4"]'], observed:['Descubrimiento','El presupuesto está en sus palabras.'], context:'Guion y checklist reales; no se ejecuta el paso en Copiloto.'},
 {id:'05-negotiation-mobile', title:'Paso10: Precio y negociación', actions:['[data-go="roadmap"]','[data-go="modulo"][data-id="10"]'], observed:['Precio y negociación'], context:'Lección de la demo; no se ejecuta ni cambia progreso.'},
 {id:'06-tour-preparation-mobile', title:'Preparar mi tour', actions:['[data-go="resources"]','[data-open="skill"][data-id="SK-14"]'], observed:['Preparar mi tour','Sin apellidos ni datos reales.'], context:'Plantilla con ejemplo nativo: una pareja de jubilados. No se envía.'},
 {id:'07-objection-practice-mobile', title:'Practicar objeción', actions:['[data-go="resources"]','[data-open="skill"][data-id="SK-13"]'], observed:['Practicar objeción','La respuesta va al manager.'], context:'Vista previa nativa: tiempo. No se genera respuesta ni se envía al manager.'},
 {id:'08-price-objection-mobile', title:'Biblioteca: objeción de dinero', actions:['[data-go="resources"]','[data-open="lib"][data-id="LIB-02"]'], observed:['Objeción de dinero','Guion de la sala de ejemplo.'], context:'Guion de ejemplo ya publicado. No se consulta al Copiloto.'},
 {id:'09-after-tour-mobile', title:'Después del tour', actions:['[data-go="resources"]','[data-open="skill"][data-id="SK-15"]'], observed:['Después del tour','Qué aprendiste'], context:'Plantilla visible; no es un reporte generado ni feedback de un tour real.'},
 {id:'10-monthly-goal-mobile', title:'Meta del mes', actions:['[data-go="resources"]','[data-open="skill"][data-id="SK-09"]'], observed:['Meta del mes','Ejemplo de volumen.'], context:'Valor de ejemplo nativo60000; no se edita ni guarda. No es una hojaSMART.'},
 {id:'11-weekly-progress-mobile', title:'Perfil: esta semana', actions:['[data-go="perfil"]','[data-act="range-semana"]'], observed:['Rendimiento','Sala de ejemplo'], context:'Cambio de filtro visual semanal; cifras demostrativas, no resultados de implementación.'},
 {id:'12-copilot-mobile', title:'Copiloto: pantalla inicial', actions:['[data-go="coach"]'], observed:[], iframe:true, context:'Chat visible en estado inicial, sin escribir ni enviar mensajes. SalaS1, rolRep por defecto.'},
 {id:'13-today-desktop', title:'Home en escritorio', actions:[], observed:['Presentaciones'], desktop:true, context:'Layout real al ampliar viewport; no se rediseñó para escritorio.'},
 {id:'14-roadmap-desktop', title:'Roadmap en escritorio', actions:['[data-go="roadmap"]'], observed:['11 pasos'], desktop:true, context:'Layout real al ampliar viewport.'},
 {id:'15-room-board-desktop', title:'Tablero de sala: jefe de sala', url:BASE+'ops/', actions:[], observed:['Tablero de sala','Jorge ve solo Sala Norte.'], desktop:true, context:'Vista pública inicial de jefe de sala; ninguna acción de asignar, editar, quitar o resultado.'}
];
(async()=>{
 const browser = await chromium.launch({headless:true});
 let manifest={source:BASE,capturedAt:new Date().toISOString(),classification:'Capturas reales de una demo; los relatos de casos se mantienen fuera de estas imágenes.',captureMethod:'Playwright Chromium, viewport screenshot, deviceScaleFactor1. No CSS injection, no overlays, no edits.',safety:'Only GET/HEAD permitted; all other HTTP methods aborted. No credentials, messages, or operational actions.',items:[]};
 try{
  const ids = process.env.CAPTURE_IDS?.split(',');
  if(ids) manifest=JSON.parse(await fs.readFile(path.join(OUTPUT,'capture-manifest.json'),'utf8'));
  for(const spec of captures.filter(item=>!ids||ids.includes(item.id))){
   const viewport=spec.desktop?{width:1240,height:900}:{width:390,height:844};
   const context=await browser.newContext({viewport,deviceScaleFactor:1});
   const blocked=[];
   await context.route('**/*',route=>{
    const request=route.request();
    if(['GET','HEAD'].includes(request.method())) return route.continue();
    blocked.push({method:request.method(),url:request.url()}); return route.abort();
   });
   const page=await context.newPage(); page.setDefaultTimeout(15000);
   await page.goto(spec.url||BASE,{waitUntil:'networkidle'});
   for(const selector of spec.actions) await page.locator(selector).first().click();
   for(const copy of spec.observed) await page.getByText(copy,{exact:false}).first().waitFor({state:'visible'});
   if(spec.iframe){
    const frame=page.frameLocator('iframe').first();
    await frame.getByText('Hola. Soy tu copiloto en la sala S1.',{exact:false}).waitFor({state:'visible'});
    const child=page.frames().find(f=>f.url().includes('/copiloto/'));
    await child.evaluate(()=>document.fonts.ready);
   }
   await page.evaluate(()=>document.fonts.ready);
   await page.evaluate(()=>window.scrollTo(0,0));
   await page.mouse.move(viewport.width-1,viewport.height-1);
   const png=path.join(OUTPUT,spec.id+'.png');
   await page.screenshot({path:png,fullPage:false});
   const dom={url:page.url(),title:await page.title(),bodyText:await page.locator('body').innerText(),controls:await page.locator('button,a,input,textarea,select,iframe').evaluateAll(es=>es.map(e=>({tag:e.tagName,text:e.innerText,value:e.value,href:e.getAttribute('href'),src:e.getAttribute('src'),attributes:[...e.attributes].filter(a=>a.name.startsWith('data-')||['id','type','placeholder'].includes(a.name)).map(a=>[a.name,a.value])}))),frames:[]};
   for(const frame of page.frames()) if(frame!==page.mainFrame()) dom.frames.push({url:frame.url(),bodyText:await frame.locator('body').innerText().catch(()=>''),title:await frame.title().catch(()=>'')});
   await fs.writeFile(path.join(OUTPUT,spec.id+'.dom.json'),JSON.stringify(dom,null,2));
   const bytes=await fs.readFile(png);
   manifest.items=manifest.items.filter(item=>item.id!==spec.id);
   manifest.items.push({...spec,url:page.url(),viewport,deviceScaleFactor:1,screenshot:spec.id+'.png',dom:spec.id+'.dom.json',sha256:crypto.createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length,blockedRequests:blocked,documentDimensions:await page.evaluate(()=>({width:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,viewportWidth:innerWidth,viewportHeight:innerHeight}))});
   manifest.items.sort((a,b)=>a.id.localeCompare(b.id));
   console.log(spec.id,bytes.length,'bytes',blocked.length,'blocked requests');
   await context.close();
   await fs.writeFile(path.join(OUTPUT,'capture-manifest.json'),JSON.stringify(manifest,null,2));
  }
 }finally{await browser.close()}
})();
