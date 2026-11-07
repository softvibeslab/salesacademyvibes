import assert from 'node:assert/strict';

export async function checkCMS({browser,page,context,base,evidence,check}){
 const password=process.env.GROWTH_E2E_PASSWORD;
 async function login(p,username){
  await p.goto('/cms/');await p.getByLabel('Usuario',{exact:true}).fill(username);
  await p.getByLabel('Contraseña',{exact:true}).fill(password);
  await p.getByRole('button',{name:/Entrar al CMS/}).click();
  await p.getByRole('heading',{name:'Una buena sala empieza aquí.',exact:true}).waitFor();
 }
 async function nav(label){await page.getByRole('navigation',{name:'Módulos del CMS'}).getByRole('button',{name:label,exact:true}).click();}
 async function publicHeading(){
  const reader=await context.newPage();
  try{await reader.goto('/descubre/');return (await reader.getByRole('heading',{level:1}).innerText()).replace(/\s+/g,' ').trim();}
  finally{await reader.close();}
 }
 async function publish(){
  page.once('dialog',d=>d.accept());
  const response=page.waitForResponse(r=>r.url().endsWith('/cms/api/publish')&&r.request().method()==='POST');
  await page.getByRole('button',{name:'Publicar cambios',exact:true}).click();
  assert.equal((await response).status(),200);
  await page.locator('#cms-status.success').waitFor();
 }
 let originalTitle,initialPublication,mediaId;
 await check('CMS: cuenta individual, borrador, vista previa y publicación real',async()=>{
  await login(page,'e2e-owner');
  assert.equal(await page.locator('[data-diagnostic-rate]').textContent(),'Sin datos');
  await page.screenshot({path:`${evidence}/screenshots/cms-desktop.png`});
  const draft=await (await context.request.get('/cms/api/draft')).json();
  originalTitle=draft.document.hero.title;initialPublication=draft.publishedRevision;
  await nav('Landing');await page.getByLabel('Título principal',{exact:true}).fill('Entrenamiento claro para cada sala.');
  await page.getByRole('button',{name:'Guardar landing',exact:true}).click();
  await page.locator('#cms-status.success').waitFor();
  assert.equal(await publicHeading(),originalTitle);
  const preview=await context.newPage();await preview.goto('/cms/preview/');
  assert.equal(await preview.getByRole('heading',{level:1}).textContent(),'Entrenamiento claro para cada sala.');
  assert.equal((await context.request.get('/cms/preview/')).headers()['cache-control'],'no-store');
  await preview.close();await publish();
  assert.equal(await publicHeading(),'Entrenamiento claro para cada sala.');
 });
 await check('CMS: biblioteca, validación de archivo y derechos editoriales',async()=>{
  await nav('Medios');await page.getByRole('button',{name:'Subir archivo +',exact:true}).click();
  await page.getByLabel('Archivo',{exact:false}).first().setInputFiles({name:'invalid.svg',mimeType:'image/svg+xml',buffer:Buffer.from('<svg></svg>')});
  await page.getByLabel('Título del archivo').fill('Ficha editorial de prueba');
  await page.getByLabel('Texto alternativo').fill('Punto gráfico de una prueba sintética.');
  await page.getByLabel('Origen y procedencia').fill('Imagen sintética creada únicamente para QA local.');
  let response=page.waitForResponse(r=>r.url().endsWith('/cms/api/media')&&r.request().method()==='POST');
  await page.getByRole('button',{name:'Subir y guardar',exact:true}).click();assert.equal((await response).status(),415);
  await page.locator('#cms-status.error').waitFor();
  await page.locator('input[type=file]').setInputFiles({name:'qa.png',mimeType:'image/png',buffer:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=','base64')});
  response=page.waitForResponse(r=>r.url().endsWith('/cms/api/media')&&r.request().method()==='POST');
  await page.getByRole('button',{name:'Subir y guardar',exact:true}).click();assert.equal((await response).status(),201);
  await page.getByRole('heading',{name:'Cada archivo, con contexto.',exact:true}).waitFor();
  const data=await (await context.request.get('/cms/api/media')).json();mediaId=data.items[0].id;
  await page.getByRole('button',{name:'Editar detalles →',exact:true}).click();
  await page.getByLabel('Derechos de uso').selectOption('approved');await page.getByLabel('Revisión editorial').selectOption('approved');
  await page.getByRole('button',{name:'Guardar detalles',exact:true}).click();await page.locator('#cms-status.success').waitFor();
  assert.equal((await (await context.request.get('/cms/api/media')).json()).items[0].rightsStatus,'approved');
 });
 await check('CMS: crear recurso por bloques y publicar portada y adjunto',async()=>{
  await nav('Recursos');await page.getByRole('button',{name:'Crear recurso +',exact:true}).click();
  await page.getByLabel('Título',{exact:true}).fill('Rutina sintética de verificación');
  await page.getByLabel('Dirección del recurso').fill('qa-rutina');
  await page.getByLabel('Descripción breve').fill('Un recurso de prueba local para verificar el recorrido editorial completo.');
  await page.getByLabel('Párrafo',{exact:true}).fill('Describe una práctica observable, acuerda un acompañamiento y registra el siguiente paso. Este contenido es sintético y solo se utiliza para comprobar el editor.');
  await page.getByRole('button',{name:'+ Tabla',exact:true}).click();
  await page.getByRole('textbox',{name:'Fila 1, columna 1',exact:true}).fill('Acción');
  await page.getByRole('textbox',{name:'Fila 1, columna 2',exact:true}).fill('Practicar una apertura');
  await page.getByLabel('Portada').selectOption(mediaId);
  await page.getByRole('checkbox',{name:/Ficha editorial de prueba/}).check();
  await page.getByLabel('Estado en el borrador').selectOption('published');
  await page.getByRole('button',{name:'Guardar recurso',exact:true}).click();await page.locator('#cms-status.success').waitFor();
  assert.equal((await context.request.get('/mediahub/qa-rutina/')).status(),404);
  await publish();
  const anonymous=await browser.newContext({baseURL:base});const reader=await anonymous.newPage();
  await reader.goto('/mediahub/qa-rutina/');await reader.getByRole('heading',{name:'Rutina sintética de verificación',exact:true}).waitFor();
  assert.equal(await reader.getByRole('table').count(),1);
  assert.equal((await anonymous.request.get(`/media/${mediaId}/web`)).headers()['content-type'],'image/webp');
  // Originals hide their existence from anonymous visitors, as specified by the API.
  assert.equal((await anonymous.request.get(`/media/${mediaId}/original`)).status(),404);
  for(const a of await reader.locator(`a[href^="/media/${mediaId}/"]`).all()) assert.equal((await anonymous.request.get(await a.getAttribute('href'))).status(),200);
  await anonymous.close();
 });
 await check('CMS: conflicto entre editores conserva cambios locales',async()=>{
  const other=await context.newPage();await other.goto('/cms/');
  await other.getByRole('navigation',{name:'Módulos del CMS'}).getByRole('button',{name:'Landing',exact:true}).click();
  await other.getByLabel('Título principal',{exact:true}).fill('Cambio concurrente sin perder.');
  await nav('Landing');await page.getByLabel('Título principal',{exact:true}).fill('Primera revisión guardada.');
  await page.getByRole('button',{name:'Guardar landing',exact:true}).click();await page.locator('#cms-status.success').waitFor();
  const conflict=other.waitForResponse(r=>r.url().endsWith('/cms/api/draft')&&r.request().method()==='PUT');
  await other.getByRole('button',{name:'Guardar landing',exact:true}).click();assert.equal((await conflict).status(),409);
  await other.locator('#cms-status.warn').waitFor();assert.equal(await other.getByLabel('Título principal',{exact:true}).inputValue(),'Cambio concurrente sin perder.');
  other.on('dialog',d=>d.accept());await other.close();
 });
 await check('CMS: bandeja real y seguimiento sin envío externo',async()=>{
  await nav('Solicitudes');await page.getByText('qa@example.invalid',{exact:true}).waitFor();
  await page.getByLabel('Estado de qa@example.invalid',{exact:true}).selectOption('qualified');
  await page.getByRole('button',{name:'Guardar estado',exact:true}).click();await page.locator('#cms-status.success').waitFor();
  assert.equal((await (await context.request.get('/cms/api/demo-requests')).json()).items[0].status,'qualified');
 });
 await check('CMS: restauración a borrador sin cambiar sitio ni solicitudes',async()=>{
  const before=await (await context.request.get('/descubre/')).text();await nav('Publicaciones');
  const original=page.locator('.publication-item').filter({has:page.getByText('Publicación '+initialPublication,{exact:true})});
  page.once('dialog',d=>d.accept());await original.getByRole('button',{name:'Recuperar como borrador',exact:true}).click();
  await page.locator('#cms-status.success').waitFor();
  assert.equal((await (await context.request.get('/cms/api/draft')).json()).document.hero.title,originalTitle);
  assert.equal(await (await context.request.get('/descubre/')).text(),before);
  assert.equal((await (await context.request.get('/cms/api/demo-requests')).json()).items.length,1);
 });
 await check('CMS: usuarios y permisos editor comprobados por servidor',async()=>{
  await nav('Usuarios');await page.getByRole('button',{name:'Crear usuario +',exact:true}).click();
  await page.getByLabel('Nombre de usuario').fill('qa-content');await page.getByLabel('Contraseña inicial').fill(password);
  await page.getByRole('button',{name:'Crear cuenta',exact:true}).click();await page.locator('#cms-status.success').waitFor();
  assert.ok((await (await context.request.get('/cms/api/users')).json()).items.some(u=>u.username==='qa-content'));
  const editorContext=await browser.newContext({baseURL:base}),editor=await editorContext.newPage();
  await login(editor,'e2e-editor');assert.equal(await editor.getByRole('button',{name:'Publicar cambios',exact:true}).isVisible(),false);
  assert.equal(await editor.getByRole('navigation',{name:'Módulos del CMS'}).getByRole('button',{name:'Usuarios',exact:true}).count(),0);
  assert.equal((await editorContext.request.get('/cms/api/users')).status(),403);
  assert.equal((await editorContext.request.get('/cms/api/demo-requests')).status(),403);
  const session=await (await editorContext.request.get('/cms/api/session')).json();
  assert.equal((await editorContext.request.post('/cms/api/publish',{headers:{'X-CSRF-Token':session.csrf},data:{revision:1}})).status(),403);
  await editorContext.close();
 });
 await check('CMS móvil: navegación, formularios y cierre de sesión',async()=>{
  await page.setViewportSize({width:390,height:844});await nav('Inicio');
  await page.getByRole('heading',{name:'Una buena sala empieza aquí.',exact:true}).waitFor();
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.screenshot({path:`${evidence}/screenshots/cms-mobile.png`});
  await nav('Landing');assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.getByLabel('Título principal',{exact:true}).focus();
  await page.keyboard.press('ControlOrMeta+A');await page.keyboard.insertText('Edición desde móvil, guardada.');
  await page.getByRole('button',{name:'Guardar landing',exact:true}).focus();await page.keyboard.press('Enter');
  await page.locator('#cms-status.success').waitFor();
  assert.equal((await (await context.request.get('/cms/api/draft')).json()).document.hero.title,'Edición desde móvil, guardada.');
  await page.getByRole('button',{name:'Cerrar sesión',exact:true}).click();await page.getByLabel('Usuario',{exact:true}).waitFor();
  assert.equal((await context.request.get('/cms/api/draft')).status(),401);
 });
}
