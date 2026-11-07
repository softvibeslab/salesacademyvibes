/** Public advisor UI. All inference and knowledge selection stay on the server. */
const roles={rep:'Representante',leader:'Líder',director:'Dirección',other:'Otro rol'};
const rooms={'1':'1 sala','2-3':'2–3 salas','4+':'4 o más salas',unknown:'Por definir'};
export function buildSummary(v){
 const lines=[v.name&&`Nombre: ${v.name}`,`Rol: ${roles[v.role]||'Por definir'}`,`Salas: ${rooms[v.roomCountBucket]||'Por definir'}`,v.teamSize&&`Equipo: ${v.teamSize}`,v.need&&`Necesidad: ${v.need}`,v.timeframe&&`Plazo: ${v.timeframe}`,v.contact&&`Contacto: ${v.contact}`];
 lines.push(v.preferredDate&&v.preferredTime?`Horario preferido: ${v.preferredDate} a las ${v.preferredTime} (${v.timezone}). Por confirmar con Chris.`:'Fecha y horario: por acordar con Chris.');
 return lines.filter(Boolean).join('\n').slice(0,1500);
}
export function buildWhatsAppUrl(summary){
 return `https://wa.me/529843163268?text=${encodeURIComponent(`Hola Chris, quiero coordinar una demo de Sales Academy.\n\n${String(summary).slice(0,1500)}\n\nSolicitud pendiente de confirmación contigo.`)}`;
}
export function safeResourceUrl(value){return typeof value==='string'&&/^\/mediahub\/[a-z0-9]+(?:-[a-z0-9]+)*\/$/.test(value)?value:null;}
export function appointmentError(v,now=new Date()){
 if(Boolean(v.preferredDate)!==Boolean(v.preferredTime))return 'Indica fecha y hora juntas, o deja ambas vacías para acordarlas con Chris.';
 try{
  const parts=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:v.timezone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(now).map(p=>[p.type,p.value]));
  const current=`${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  if(v.preferredDate&&`${v.preferredDate}T${v.preferredTime}`<=current)return 'Elige una fecha y hora futuras en la zona seleccionada, o déjalas vacías para acordarlas con Chris.';
 }catch{return 'Selecciona una zona horaria válida.';}
 return '';
}

function mountAdvisor(){
 if(document.body.dataset.preview==='true'||document.querySelector('[data-advisor-open]'))return;
 const root=document.createElement('div');root.className='advisor-root';
 root.innerHTML=`
 <button class="advisor-launcher" type="button" data-advisor-open aria-haspopup="dialog" aria-controls="sa-advisor-dialog" aria-expanded="false"><span class="advisor-mark" aria-hidden="true">✦</span><span><strong>Pregunta a Sales Academy</strong><small>Tu asesor con IA</small></span><span class="advisor-launch-arrow" aria-hidden="true">↗</span></button>
 <dialog class="advisor-dialog" id="sa-advisor-dialog" aria-labelledby="sa-advisor-title">
  <div class="advisor-shell">
   <header class="advisor-header"><span class="advisor-mark" aria-hidden="true">✦</span><div><p>SALES ACADEMY · ASISTENTE IA</p><h2 id="sa-advisor-title">Tu siguiente paso, claro.</h2></div><button type="button" class="advisor-close" data-advisor-close aria-label="Cerrar asesor">×</button></header>
   <div class="advisor-tabs" role="group" aria-label="Qué quieres hacer"><button type="button" data-advisor-tab="chat" aria-pressed="true">Conversar</button><button type="button" data-advisor-tab="demo" aria-pressed="false">Coordinar demo <span aria-hidden="true">↗</span></button></div>
   <section class="advisor-chat" id="sa-advisor-chat" aria-label="Conversación con el asesor">
    <div class="advisor-messages" id="sa-advisor-messages" role="log" aria-label="Mensajes" aria-live="polite" aria-relevant="additions text"><article class="advisor-message advisor-message-assistant"><span class="advisor-sender">ASESOR IA</span><p>Soy el asesor IA de Sales Academy. Puedo explicarte la plataforma, explorar tu caso y ayudarte a coordinar una demo con Chris.</p></article><div class="advisor-suggestions"><button type="button" data-advisor-prompt="¿Qué es Sales Academy y cómo ayuda a mi equipo?">Conocer la plataforma</button><button type="button" data-advisor-prompt="Ayúdame a explorar un caso de uso para mi sala de ventas.">Ver mi caso de uso</button><button type="button" data-advisor-prompt="Quiero un plan para implementar Sales Academy en mi sala. ¿Por dónde empiezo?">Plan para mi sala</button><button type="button" data-advisor-demo>Agendar demo con Chris ↗</button></div></div>
    <div class="advisor-chat-feedback"><p id="sa-advisor-chat-status" role="status"></p><button type="button" class="advisor-text-button" data-advisor-retry hidden>Reintentar pregunta</button><a href="https://wa.me/529843163268?text=Hola%20Chris%2C%20quiero%20conocer%20Sales%20Academy." target="_blank" rel="noopener noreferrer" data-advisor-fallback hidden>Hablar con Chris por WhatsApp ↗</a></div>
    <form class="advisor-composer" id="sa-advisor-chat-form"><label class="advisor-sr-only" for="sa-advisor-message">Tu pregunta sobre Sales Academy</label><textarea id="sa-advisor-message" name="message" rows="2" maxlength="1200" placeholder="Cuéntame qué quieres mejorar en tu sala…" required></textarea><button type="submit" aria-label="Enviar pregunta"><span aria-hidden="true">↑</span></button></form>
    <p class="advisor-disclosure">Conversación disponible durante 1 hora; borrado automático periódico. IA mediante Hermes y OpenAI. Evita datos de clientes. <a href="/descubre/privacidad/" target="_blank" rel="noopener noreferrer">Privacidad</a></p>
   </section>
   <section class="advisor-demo" id="sa-advisor-demo" aria-label="Solicitud de demo" hidden>
    <div class="advisor-demo-intro"><p class="advisor-eyebrow">CON CHRIS · POR WHATSAPP</p><h3>Una demo para tu contexto.</h3><p>Comparte lo que sea útil. Revisarás el mensaje antes de abrir WhatsApp; la fecha se acuerda con Chris.</p></div>
    <form id="sa-advisor-demo-form" class="advisor-demo-form">
     <div class="advisor-field-row"><label>Tu nombre <span>(opcional)</span><input name="name" autocomplete="given-name" maxlength="80" /></label><label>Tu rol<select name="role"><option value="other">Selecciona tu rol</option value="rep">Representante</option><option value="leader">Líder</option><option value="director">Dirección</option></select></label></div>
     <div class="advisor-field-row"><label>Salas<select name="roomCountBucket"><option value="unknown">Por definir</option><option value="1">1 sala</option><option value="2-3">2–3 salas</option><option value="4+">4 o más salas</option></select></label><label>Tamaño del equipo<input name="teamSize" maxlength="60" placeholder="Ej. 20 representantes" /></label></div>
     <label>¿Qué quieres mejorar?<textarea name="need" rows="2" maxlength="600" placeholder="Preparación, práctica, coaching, conocimiento…"></textarea></label><button type="button" class="advisor-text-button" data-advisor-use-question hidden>Usar mi última pregunta como punto de partida</button>
     <div class="advisor-field-row"><label>¿Para cuándo?<input name="timeframe" maxlength="120" placeholder="Ej. Este mes" /></label><label>Contacto <span>(opcional)</span><input name="contact" autocomplete="off" maxlength="120" placeholder="Correo o WhatsApp" /></label></div>
     <fieldset><legend>Tu horario preferido <span>(opcional)</span></legend><div class="advisor-field-row"><label>Fecha<input type="date" name="preferredDate" /></label><label>Hora<input type="time" name="preferredTime" /></label></div><label>Zona horaria<select name="timezone"><option value="America/Cancun">Cancún · Caribe mexicano</option><option value="America/Mexico_City">Ciudad de México</option><option value="America/Tijuana">Tijuana</option><option value="America/Hermosillo">Hermosillo</option><option value="America/New_York">Este de EE. UU.</option><option value="America/Los_Angeles">Pacífico de EE. UU.</option><option value="America/Bogota">Bogotá</option><option value="Europe/Madrid">Madrid</option></select></label><small>Deja fecha y hora vacías si prefieres acordarlas en la conversación.</small></fieldset>
     <p id="sa-advisor-form-status" class="advisor-form-status" role="status"></p><button type="submit" class="advisor-primary">Preparar mi solicitud <span aria-hidden="true">→</span></button>
    </form>
    <section class="advisor-review" id="sa-advisor-review" hidden><p class="advisor-eyebrow">REVISA ANTES DE COMPARTIR</p><label for="sa-advisor-summary">Tu resumen editable</label><textarea id="sa-advisor-summary" rows="7" maxlength="1500"></textarea><a class="advisor-primary" data-advisor-whatsapp target="_blank" rel="noopener noreferrer">Coordinar mi demo con Chris <span aria-hidden="true">↗</span></a><p class="advisor-pending">Pendiente de confirmación. WhatsApp abre tu mensaje; tú decides si lo envías.</p><label class="advisor-consent"><input type="checkbox" id="sa-advisor-contact-consent" /><span>También quiero guardar esta solicitud en Sales Academy para que Chris pueda darle seguimiento. <a href="/descubre/privacidad/" target="_blank" rel="noopener noreferrer">Ver privacidad</a>.</span></label><button type="button" class="advisor-secondary" data-advisor-save hidden>Guardar solicitud para seguimiento</button><p id="sa-advisor-save-status" role="status"></p></section>
   </section>
  </div>
 </dialog>`;
 document.body.append(root);
 const $=s=>root.querySelector(s),dialog=$('dialog'),launcher=$('[data-advisor-open]'),message=$('#sa-advisor-message'),feed=$('#sa-advisor-messages'),chatStatus=$('#sa-advisor-chat-status'),retry=$('[data-advisor-retry]'),fallback=$('[data-advisor-fallback]');
 const demoForm=$('#sa-advisor-demo-form'),review=$('#sa-advisor-review'),summary=$('#sa-advisor-summary'),wa=$('[data-advisor-whatsapp]'),save=$('[data-advisor-save]'),consent=$('#sa-advisor-contact-consent');
 let session=null,sessionPromise=null,busy=false,pending=null,prepared=null,pendingLead=null,restored=false,lastQuestion='';
 const uuid=()=>crypto.randomUUID();
 async function api(path,payload){
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),45000);
  try{
   const response=await fetch('/growth-api/advisor/'+path,{method:payload?'POST':'GET',credentials:'same-origin',headers:payload?{'Content-Type':'application/json','X-Advisor-CSRF':session?.csrf||''}:{},body:payload?JSON.stringify(payload):undefined,signal:controller.signal});
   const data=await response.json();if(!response.ok){const error=new Error(data.error?.message||'No se pudo completar la solicitud. Puedes reintentar.');error.status=response.status;throw error;}return data;
  }catch(error){if(error.name==='AbortError'||error.message==='Failed to fetch')throw new Error('La conexión tardó más de lo esperado. Puedes reintentar o hablar con Chris.');throw error;}finally{clearTimeout(timer);}
 }
 function addMessage(role,text,resources=[]){
  const article=document.createElement('article');article.className='advisor-message advisor-message-'+(role==='user'?'user':'assistant');
  const sender=document.createElement('span');sender.className='advisor-sender';sender.textContent=role==='user'?'TÚ':'ASESOR IA';
  const body=document.createElement('p');body.textContent=text;article.append(sender,body);
  for(const resource of resources){const url=safeResourceUrl(resource.url);if(!url)continue;const link=document.createElement('a');link.href=url;link.textContent=resource.title+' ↗';link.target='_blank';link.rel='noopener noreferrer';link.className='advisor-resource';article.append(link);}
  feed.append(article);feed.scrollTop=feed.scrollHeight;
 }
 async function ensureSession(){
  if(session)return session;if(sessionPromise)return sessionPromise;
  sessionPromise=api('session').then(data=>{
   session=data;if(!restored&&Array.isArray(data.messages)){for(const m of data.messages)if(['user','assistant'].includes(m.role)&&typeof m.content==='string'){addMessage(m.role,m.content);if(m.role==='user')lastQuestion=m.content;}restored=true;$('[data-advisor-use-question]').hidden=!lastQuestion;}
   if(!data.enabled){chatStatus.textContent='El asesor está en pausa. Puedes preparar tu solicitud o hablar con Chris.';fallback.hidden=false;}
   return data;
  }).finally(()=>{sessionPromise=null;});return sessionPromise;
 }
 function tab(which){
  $('#sa-advisor-chat').hidden=which!=='chat';$('#sa-advisor-demo').hidden=which!=='demo';
  root.querySelectorAll('[data-advisor-tab]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.advisorTab===which)));
  if(which==='chat')message.focus();else demoForm.querySelector('input').focus();
 }
 launcher.addEventListener('click',()=>{
  dialog.showModal();launcher.setAttribute('aria-expanded','true');document.documentElement.classList.add('advisor-open');
  message.focus();ensureSession().catch(e=>{chatStatus.textContent=e.message;fallback.hidden=false;});
 });
 function close(){dialog.close();}
 $('[data-advisor-close]').addEventListener('click',close);
 dialog.addEventListener('close',()=>{launcher.setAttribute('aria-expanded','false');document.documentElement.classList.remove('advisor-open');launcher.focus();});
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();}});
 root.querySelectorAll('[data-advisor-tab]').forEach(b=>b.addEventListener('click',()=>tab(b.dataset.advisorTab)));
 $('[data-advisor-demo]').addEventListener('click',()=>tab('demo'));
 function loading(value){busy=value;$('#sa-advisor-chat-form button').disabled=value;message.disabled=value;retry.disabled=value;root.querySelectorAll('[data-advisor-prompt]').forEach(b=>b.disabled=value);feed.setAttribute('aria-busy',String(value));}
 async function send(text,repeating=false){
  if(busy||!text.trim())return;loading(true);retry.hidden=true;chatStatus.textContent='Buscando la mejor orientación para tu sala…';
  if(!repeating){pending={message:text.trim().slice(0,1200),requestId:uuid()};lastQuestion=pending.message;$('[data-advisor-use-question]').hidden=false;addMessage('user',pending.message);message.value='';}
  try{
   const current=await ensureSession();if(!current.enabled){session=null;throw new Error('El asesor está en pausa. Puedes reintentar más tarde o hablar con Chris.');}
   const data=await api('messages',pending);if(typeof data.reply!=='string')throw new Error('La respuesta no llegó completa. Puedes reintentar.');
   addMessage('assistant',data.reply,Array.isArray(data.resources)?data.resources:[]);pending=null;
   chatStatus.textContent=data.remainingTurns===0?'Has llegado al límite de esta conversación. Puedes coordinar tu demo con Chris.':'';
  }catch(e){if([401,403].includes(e.status))session=null;chatStatus.textContent=e.message;retry.hidden=false;fallback.hidden=false;}finally{loading(false);}
 }
 $('#sa-advisor-chat-form').addEventListener('submit',e=>{e.preventDefault();send(message.value);});
 message.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();send(message.value);}});
 root.querySelectorAll('[data-advisor-prompt]').forEach(b=>b.addEventListener('click',()=>send(b.dataset.advisorPrompt)));
 retry.addEventListener('click',()=>{if(pending)send(pending.message,true);});
 const zone=demoForm.elements.timezone;
 try{const local=Intl.DateTimeFormat().resolvedOptions().timeZone;if(local){if(!Array.from(zone.options).some(o=>o.value===local)){const o=new Option(local+' · tu dispositivo',local);zone.append(o);}zone.value=local;}}catch{}
 demoForm.addEventListener('input',()=>{review.hidden=true;prepared=null;pendingLead=null;consent.checked=false;save.hidden=true;$('#sa-advisor-save-status').textContent='';});
 $('[data-advisor-use-question]').addEventListener('click',()=>{demoForm.elements.need.value=lastQuestion.slice(0,600);demoForm.elements.need.dispatchEvent(new Event('input',{bubbles:true}));demoForm.elements.need.focus();});
 demoForm.addEventListener('submit',e=>{
  e.preventDefault();const values=Object.fromEntries(new FormData(demoForm));const error=appointmentError(values);$('#sa-advisor-form-status').textContent=error;if(error)return;
  prepared=values;summary.value=buildSummary(values);wa.href=buildWhatsAppUrl(summary.value);review.hidden=false;pendingLead=null;$('#sa-advisor-save-status').textContent='';summary.focus();
 });
 summary.addEventListener('input',()=>{wa.href=buildWhatsAppUrl(summary.value);pendingLead=null;$('#sa-advisor-save-status').textContent='';});
 consent.addEventListener('change',()=>{save.hidden=!consent.checked;});
 save.addEventListener('click',async()=>{
  if(!consent.checked||!prepared)return;save.disabled=true;const status=$('#sa-advisor-save-status');status.textContent='Guardando tu solicitud…';
  try{
   await ensureSession();const payload={...prepared,summary:summary.value,contactConsent:true,privacyVersion:'2026-11-07-advisor'};
   const fingerprint=JSON.stringify(payload);if(!pendingLead||pendingLead.fingerprint!==fingerprint)pendingLead={fingerprint,requestId:uuid()};
   const data=await api('leads',{...payload,requestId:pendingLead.requestId});
   if(!data.received||!data.id||data.status!=='pending_confirmation')throw new Error('No pudimos confirmar el guardado. Puedes reintentar.');
   status.textContent=`Solicitud guardada · referencia ${data.id}. La demo sigue pendiente de confirmación con Chris.`;
  }catch(e){if([401,403].includes(e.status))session=null;status.textContent=e.message+' Puedes continuar por WhatsApp sin guardar.';}finally{save.disabled=false;}
 });
 const consentPanel=document.querySelector('#consent-panel');
 function avoidConsent(){
  let offset=20;if(consentPanel&&!consentPanel.hidden){const c=consentPanel.getBoundingClientRect(),b=launcher.getBoundingClientRect();if(b.right>c.left&&b.left<c.right)offset=Math.max(20,innerHeight-c.top+12);}
  launcher.style.bottom=`calc(${offset}px + env(safe-area-inset-bottom, 0px))`;
  const b=launcher.getBoundingClientRect();
  const overlapsPlayingFilm=[...document.querySelectorAll('video')].some(video=>{if(video.paused||video.ended)return false;const v=video.getBoundingClientRect();return b.left<v.right&&b.right>v.left&&b.top<v.bottom&&b.bottom>v.top;});
  launcher.style.visibility=overlapsPlayingFilm?'hidden':'visible';
 }
 if(consentPanel){new MutationObserver(avoidConsent).observe(consentPanel,{attributes:true,attributeFilter:['hidden']});new ResizeObserver(avoidConsent).observe(consentPanel);}
 let layoutQueued=false;
 function queueLayout(){if(layoutQueued)return;layoutQueued=true;requestAnimationFrame(()=>{layoutQueued=false;avoidConsent();});}
 addEventListener('resize',queueLayout,{passive:true});addEventListener('scroll',queueLayout,{passive:true});
 for(const event of ['play','pause','ended'])document.addEventListener(event,queueLayout,true);
 avoidConsent();
}
if(typeof document!=='undefined')mountAdvisor();
