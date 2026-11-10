// CP2 tour-registration v1. Private data is deliberately page-memory only.
const API = '/api/tour-registrations';
export const LANGUAGES = { '': 'Sin declarar', es: 'Español', en: 'English', otro: 'Otro' };
const EDITABLE = new Set(['primaryName', 'companionName', 'date', 'start', 'end', 'language', 'interests', 'notes', 'contactType', 'contactValue', 'repId']);
const OCR_FIELDS = ['primaryName', 'companionName', 'language', 'interests', 'notes'];
const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[ch]));
const text = value => String(value ?? '').trim();
export function validDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return false;
  const date = new Date(`${value}T12:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}
export function mondayOf(value) {
  if (!validDate(value)) return '';
  const date = new Date(`${value}T12:00:00Z`); date.setUTCDate(date.getUTCDate() - ((date.getUTCDay() + 6) % 7));
  return date.toISOString().slice(0, 10);
}
function emptyDraft(date = '', requestId = '') {
  return { requestId, source: 'manual', primaryName: '', companionName: '', date, start: '10:30', end: '11:30', language: '', interests: [], notes: '', contactType: 'phone', contactValue: '', repId: '', reviewConfirmed: false };
}
export function validateDraft(draft) {
  const errors = {};
  if (!text(draft.primaryName) || text(draft.primaryName).length > 80) errors.primaryName = 'Escribe el nombre del visitante principal (máximo 80 caracteres).';
  if (text(draft.companionName).length > 80) errors.companionName = 'Usa hasta 80 caracteres.';
  if (!validDate(draft.date)) errors.date = 'Elige una fecha válida.';
  const clock = value => /^([01]\d|2[0-3]):[0-5]\d$/.test(value || '');
  if (!clock(draft.start)) errors.start = 'Elige una hora de inicio válida.';
  if (!clock(draft.end) || (clock(draft.start) && draft.end <= draft.start)) errors.end = 'La hora de fin debe ser después del inicio.';
  if (!(draft.language in LANGUAGES)) errors.language = 'Elige un idioma de la lista.';
  if (!Array.isArray(draft.interests) || draft.interests.length > 5 || draft.interests.some(item => typeof item !== 'string' || item.length > 60)) errors.interests = 'Usa hasta cinco intereses de 60 caracteres, separados por coma.';
  if (text(draft.notes).length > 400) errors.notes = 'Usa hasta 400 caracteres.';
  if (text(draft.contactValue)) {
    if (draft.contactType === 'email' && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text(draft.contactValue)) || text(draft.contactValue).length > 254)) errors.contactValue = 'Revisa el correo compartido.';
    else if (draft.contactType === 'phone' && (!/^\+?[0-9 ()-]{7,25}$/.test(text(draft.contactValue)) || draft.contactValue.replace(/\D/g, '').length < 7 || draft.contactValue.replace(/\D/g, '').length > 15)) errors.contactValue = 'Revisa el teléfono y su código de país.';
    else if (!['email', 'phone'].includes(draft.contactType)) errors.contactType = 'Elige teléfono o correo.';
  }
  return errors;
}
export function registrationPayload(draft, user) {
  return { requestId: draft.requestId, source: draft.source, date: draft.date, start: draft.start, end: draft.end,
    visitors: { primaryName: text(draft.primaryName), companionName: text(draft.companionName) },
    preferences: { language: draft.language, interests: draft.interests.map(text).filter(Boolean), notes: text(draft.notes) },
    contact: text(draft.contactValue) ? { type: draft.contactType, value: text(draft.contactValue) } : null,
    reviewConfirmed: Boolean(draft.reviewConfirmed),
    ...(user?.role !== 'rep' && draft.repId ? { repId: draft.repId } : {}),
  };
}
export function imageBodyFits(image, mime) {
  const decoded = Math.floor(image.length * 3 / 4) - ((image.match(/=*$/) || [''])[0].length);
  return decoded <= 1_500_000 && new TextEncoder().encode(JSON.stringify({ image, mime })).length <= 2_000_000;
}
export function preparationPrompt(registration = {}) {
  const lead = /^Lead #\d{3,4}$/.test(registration.lead || '') ? ` ${registration.lead}` : '';
  return `Ayúdame a preparar el inicio de mi tour${lead}. Dame una bienvenida breve y tres preguntas para confirmar sus preferencias. No supongas información de los visitantes.`;
}
export async function normalizeSurveyPhoto(file) {
  if (!['image/jpeg', 'image/png'].includes(file?.type)) throw new Error('Elige una foto JPEG o PNG.');
  if (!file.size || file.size > 20_000_000) throw new Error('Elige una imagen de hasta 20 MB para preparar la foto.');
  let bitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
    if (!bitmap.width || !bitmap.height || bitmap.width * bitmap.height > 40_000_000) throw new Error('image');
    const canvas = document.createElement('canvas');
    let scale = Math.min(1, 2400 / Math.max(bitmap.width, bitmap.height));
    for (const quality of [0.9, 0.8, 0.68, 0.55]) {
      canvas.width = Math.max(1, Math.round(bitmap.width * scale)); canvas.height = Math.max(1, Math.round(bitmap.height * scale));
      const ctx = canvas.getContext('2d'); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height); ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      // Canvas recoding discards EXIF and applies decoded orientation.
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', quality));
      if (blob && blob.size <= 1_490_000) {
        const image = await new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result).split(',')[1] || ''); reader.onerror = reject; reader.readAsDataURL(blob); });
        if (imageBodyFits(image, 'image/jpeg')) return { image, mime: 'image/jpeg', url: URL.createObjectURL(blob), size: blob.size };
      }
      scale *= 0.85;
    }
    throw new Error('image');
  } catch { throw new Error('No se pudo preparar la foto. Elige otra imagen más pequeña o continúa manualmente.'); }
  finally { bitmap?.close?.(); }
}
function initialState() {
  return { user: null, capabilities: {}, draft: emptyDraft(), step: 'choice', optionalOpen: false, photo: null, errors: {}, error: '', errorCode: '', warnings: [], sources: {}, versions: {}, busy: false, previewing: false, saved: null, started: false, detailLoading: false };
}
export class TourRegistration {
  constructor({ request = async () => { throw new Error('Sin conexión.'); }, onChange = () => {}, onExpired = () => {}, onSaved = () => {}, uuid = () => globalThis.crypto.randomUUID(), revokeObjectURL = url => URL.revokeObjectURL(url) } = {}) {
    Object.assign(this, { request, onChange, onExpired, onSaved, uuid, revokeObjectURL });
    this.state = initialState(); this.epoch = 0; this.previewEpoch = 0; this.detailEpoch = 0; this.abort = null;
  }
  emit() { this.onChange(this.state); }
  canRegister() { return Boolean(this.state.user && this.state.capabilities.enabled && this.state.capabilities.canRegister); }
  clearPhoto() { if (this.state.photo?.url) this.revokeObjectURL(this.state.photo.url); this.state.photo = null; }
  cancelPreview() { this.previewEpoch++; this.abort?.abort(); this.abort = null; this.state.previewing = false; }
  reset({ emit = true } = {}) {
    this.epoch++; this.detailEpoch++; this.cancelPreview(); this.clearPhoto();
    const { user, capabilities } = this.state; this.state = { ...initialState(), user, capabilities };
    if (emit) this.emit();
  }
  setSession(user, capabilities = {}) {
    const changed = user?.id !== this.state.user?.id || user?.roomId !== this.state.user?.roomId || user?.role !== this.state.user?.role || capabilities.mode !== this.state.capabilities.mode;
    if (changed || !user || !capabilities.canRegister || !capabilities.enabled) this.reset({ emit: false });
    this.state.user = user; this.state.capabilities = capabilities; this.emit();
  }
  start(date) {
    this.detailEpoch++; this.state.saved = null; this.state.detailLoading = false;
    if (!this.state.started) { this.state.draft = emptyDraft(validDate(date) ? date : this.state.capabilities.operationalDate, this.uuid()); this.state.started = true; }
    this.state.step = 'choice'; this.state.error = ''; this.emit();
  }
  choose(source) {
    if (!this.canRegister()) return;
    this.cancelPreview(); this.state.draft.source = source === 'survey' ? 'survey' : 'manual'; this.state.step = source === 'survey' ? 'photo' : 'form'; this.state.error = ''; this.state.draft.reviewConfirmed = false; this.emit();
  }
  update(field, value) {
    if (!EDITABLE.has(field) || this.state.busy) return;
    this.state.draft[field] = field === 'interests' && typeof value === 'string' ? value.split(',').map(text).filter(Boolean) : value;
    this.state.versions[field] = (this.state.versions[field] || 0) + 1; this.state.sources[field] = 'manual'; delete this.state.errors[field]; this.state.draft.reviewConfirmed = false;
  }
  setReview(checked) { this.state.draft.reviewConfirmed = Boolean(checked); delete this.state.errors.reviewConfirmed; }
  setPhoto(photo) { this.cancelPreview(); this.clearPhoto(); this.state.photo = photo; this.state.draft.source = 'survey'; this.state.error = ''; this.state.warnings = []; this.emit(); }
  review() {
    this.cancelPreview(); this.state.errors = validateDraft(this.state.draft);
    if (this.state.user?.role !== 'rep' && !this.state.draft.repId) this.state.errors.repId = 'Elige el asesor del tour.';
    if (Object.keys(this.state.errors).length) { this.state.step = 'form'; this.state.error = 'Revisa los campos señalados.'; this.emit(); return false; }
    this.state.step = 'summary'; this.state.error = ''; this.state.draft.reviewConfirmed = false; this.emit(); return true;
  }
  failure(error) {
    if (error?.status === 401) { this.setSession(null, this.state.capabilities); this.onExpired(); return; }
    if (error?.status === 403) {
      this.setSession(this.state.user, { ...this.state.capabilities, canRegister: false });
      this.state.error = 'Tu sesión ya no tiene acceso a estos datos.'; return;
    }
    this.state.errorCode = error?.code || '';
    this.state.errors = error?.fields && typeof error.fields === 'object' ? normalizeFieldErrors(error.fields) : {};
    this.state.error = error?.status === 409 ? (error.code === 'registration_expired' ? 'Esta solicitud ya venció. Revisa tu agenda antes de iniciar otro registro.' : 'No se pudo confirmar. Revisa el horario y tu agenda; tu información sigue aquí.') : error?.status === 403 ? 'Tu sesión no tiene permiso para esta acción.' : error?.status === 503 ? 'El registro no está disponible por ahora. Tu información sigue aquí.' : 'No se pudo completar. Tu información sigue aquí; intenta de nuevo.';
  }
  async preview() {
    if (!this.canRegister() || !this.state.photo || this.state.previewing) return;
    const epoch = this.epoch, token = ++this.previewEpoch, versions = { ...this.state.versions };
    this.abort = new AbortController(); this.state.previewing = true; this.state.error = ''; this.emit();
    try {
      const { image, mime } = this.state.photo;
      const data = await this.request(`${API}/preview`, { method: 'POST', body: { image, mime }, signal: this.abort.signal });
      if (epoch !== this.epoch || token !== this.previewEpoch) return;
      for (const field of OCR_FIELDS) {
        const candidate = data.candidates?.[field];
        if (!candidate || (this.state.versions[field] || 0) !== (versions[field] || 0) || this.state.sources[field] === 'manual') continue;
        const value = field === 'interests' ? (Array.isArray(candidate.value) ? candidate.value.filter(v => typeof v === 'string').slice(0, 5) : []) : (typeof candidate.value === 'string' ? candidate.value : '');
        if (field === 'language' && !(value in LANGUAGES)) continue;
        this.state.draft[field] = value; this.state.sources[field] = candidate.state === 'missing' || !value?.length ? 'missing' : 'survey';
      }
      this.state.warnings = Array.isArray(data.warnings) ? data.warnings.slice(0, 5) : [];
      this.state.step = 'form'; this.state.draft.reviewConfirmed = false;
    } catch (error) { if (epoch === this.epoch && token === this.previewEpoch && error.name !== 'AbortError') this.failure(error); }
    finally { if (epoch === this.epoch && token === this.previewEpoch) { this.state.previewing = false; this.abort = null; this.emit(); } }
  }
  async submit() {
    if (!this.canRegister() || this.state.busy) return;
    this.state.errors = validateDraft(this.state.draft);
    if (!this.state.draft.reviewConfirmed) this.state.errors.reviewConfirmed = 'Confirma que revisaste los datos.';
    if (this.state.user?.role !== 'rep' && !this.state.draft.repId) this.state.errors.repId = 'Elige el asesor del tour.';
    if (Object.keys(this.state.errors).length) { this.emit(); return; }
    const epoch = this.epoch; this.state.busy = true; this.state.error = ''; this.emit();
    try {
      const data = await this.request(API, { method: 'POST', body: registrationPayload(this.state.draft, this.state.user) });
      if (epoch !== this.epoch) return;
      this.clearPhoto(); this.state.saved = data; this.state.step = 'success'; this.state.draft = emptyDraft(); this.state.started = false; this.state.sources = {}; this.state.warnings = []; this.onSaved(data);
    } catch (error) { if (epoch === this.epoch) this.failure(error); }
    finally { if (epoch === this.epoch) { this.state.busy = false; this.emit(); } }
  }
  async detail(tourId) {
    if (!this.canRegister()) return;
    const epoch = this.epoch, token = ++this.detailEpoch; this.state.step = 'detail'; this.state.saved = null; this.state.detailLoading = true; this.state.error = ''; this.emit();
    try { const data = await this.request(`${API}/${encodeURIComponent(tourId)}`); if (epoch === this.epoch && token === this.detailEpoch) this.state.saved = data; }
    catch (error) { if (epoch === this.epoch && token === this.detailEpoch) { this.failure(error); if (error.status === 404) this.state.error = 'Este tour no tiene un registro privado disponible para tu sesión.'; } }
    finally { if (epoch === this.epoch && token === this.detailEpoch) { this.state.detailLoading = false; this.emit(); } }
  }
}
function normalizeFieldErrors(fields) {
  const aliases = { 'visitors.primaryName':'primaryName', 'visitors.companionName':'companionName', 'preferences.language':'language', 'preferences.interests':'interests', 'preferences.notes':'notes', 'contact.value':'contactValue', 'contact.type':'contactType', contact:'contactValue' };
  return Object.fromEntries(Object.entries(fields).map(([key,value]) => [aliases[key] || key, typeof value === 'string' ? value : 'Revisa este campo.']));
}
function action(id, label, cls = 'line', attrs = '') { return `<button type="button" class="btn ${cls}" data-tour-action="${id}" ${attrs}>${label}</button>`; }
function warningText(warning) {
  const code = typeof warning === 'string' ? warning : warning?.code;
  const messages = { ocr_unavailable:'La lectura automática no está disponible. Puedes continuar manualmente.', ocr_timeout:'La lectura tardó demasiado. Intenta otra foto o continúa manualmente.', ocr_unreadable:'No pudimos leer bien el survey. Revisa la foto o captura los datos.', no_candidates:'No encontramos campos legibles. Puedes completar la información manualmente.' };
  return messages[code] || 'Revisa los datos sugeridos. Completa manualmente lo que falte.';
}
function field(state, key, label, { type = 'text', max, required = false, hint = '', options, textarea = false, disabled = false } = {}) {
  const value = key === 'interests' ? state.draft.interests.join(', ') : state.draft[key];
  const error = state.errors[key]; const described = [`tr-${key}-hint`, ...(error ? [`tr-${key}-error`] : [])].join(' ');
  const attrs = `id="tr-${key}" name="${key}" data-tour-field="${key}" aria-describedby="${described}" ${error ? 'aria-invalid="true"' : ''} ${required ? 'required' : ''} ${max ? `maxlength="${max}"` : ''} ${disabled ? 'disabled' : ''} autocomplete="off"`;
  const input = options ? `<select ${attrs}>${options.map(([id, name]) => `<option value="${esc(id)}" ${id === value ? 'selected' : ''}>${esc(name)}</option>`).join('')}</select>` : textarea ? `<textarea ${attrs} rows="3">${esc(value)}</textarea>` : `<input ${attrs} type="${type}" value="${esc(value)}">`;
  const source = state.sources[key]; const provenance = source === 'survey' ? 'Del survey · Revisar' : source === 'missing' ? 'No encontrado' : source === 'manual' ? 'Ingresado por ti' : '';
  return `<div class="tr-field"><label for="tr-${key}">${label}${required ? ' <span aria-hidden="true">*</span>' : ''}</label>${input}<small id="tr-${key}-hint">${esc(hint || (required ? 'Obligatorio' : 'Opcional'))}${provenance ? ` · ${esc(provenance)}` : ''}</small>${error ? `<p class="tr-error" id="tr-${key}-error">${esc(error)}</p>` : ''}</div>`;
}
function summary(data, context, editable) {
  const visitors = data.visitors || { primaryName: data.primaryName, companionName: data.companionName };
  const preferences = data.preferences || data; const contact = data.contact || (data.contactValue ? { value:data.contactValue } : null);
  return `<section class="tr-card"><div class="row-between"><h2>Visitantes</h2>${editable ? action('edit', 'Editar', 'ghost') : ''}</div><p class="tr-person">${esc(visitors.primaryName)}</p><p>${esc(visitors.companionName || 'Sin acompañante registrado')}</p></section>
    <section class="tr-card"><div class="row-between"><h2>Datos del tour</h2>${editable ? action('edit', 'Editar', 'ghost') : ''}</div><dl><dt>Fecha</dt><dd>${esc(data.date)}</dd><dt>Horario</dt><dd>${esc(data.start)}–${esc(data.end)}</dd><dt>Sala</dt><dd>${esc(context.roomLabel || data.roomId || 'Tu sala')}</dd><dt>Asesor</dt><dd>${esc(context.userLabel || data.repId || 'Tu sesión')}</dd><dt>Origen</dt><dd>${data.source === 'survey' ? 'Foto del survey' : 'Captura manual'}</dd></dl></section>
    <section class="tr-card"><h2>Contexto compartido</h2><p>Idioma: ${esc(LANGUAGES[preferences.language] || 'Sin declarar')}</p><p>${esc(preferences.interests?.join(', ') || 'Sin intereses declarados')}</p>${preferences.notes ? `<p>${esc(preferences.notes)}</p>` : ''}<p>${contact ? esc(contact.value) : 'Sin contacto compartido'}</p></section>`;
}
export function registrationMarkup(state, context = {}) {
  const { step, capabilities: caps, draft } = state;
  const notice = `<p class="tr-mode">${caps.mode !== 'private' ? 'Demo · Datos de ejemplo' : 'Registro privado · Solo tu alcance autorizado'}</p>`;
  const header = `<header class="taskbar tr-top"><button class="back" type="button" data-tour-action="exit"><span aria-hidden="true">‹</span> ${context.manager ? 'Tablero' : 'Volver'}</button><strong>${step === 'detail' ? 'Detalle del tour' : 'Nuevo tour'}</strong></header>`;
  const error = state.error ? `<div class="tr-alert" role="alert" tabindex="-1"><strong>${esc(state.error)}</strong>${state.errorCode === 'schedule_conflict' ? action('edit', 'Cambiar horario', 'ghost') : ''}</div>` : '';
  const intro = `${notice}<div class="tr-heading"><p class="eyebrow">SALES ACADEMY</p><h1>${step === 'success' ? 'Tour listo' : step === 'detail' ? 'Tu tour, en contexto' : 'Registra los datos de la pareja'}</h1><p>${step === 'success' ? 'Pendiente de iniciar. Elige cómo prepararte.' : 'Revisa la información antes de confirmar.'}</p></div>`;
  if (!caps.enabled || !caps.canRegister || !state.user) return `${header}<div class="screen tr-screen">${notice}<section class="tr-card"><h1>Nuevo tour</h1><p>El registro de visitantes todavía no está habilitado para esta sesión.</p><p>Tu agenda y el registro de resultados siguen disponibles.</p>${action('refresh', 'Comprobar disponibilidad')}${action('exit', 'Volver')}</section></div>`;
  let body = '';
  if (step === 'choice') {
    body = `<div class="tr-entry-grid"><button type="button" class="tr-entry" data-tour-action="survey"><span class="tr-entry-icon" aria-hidden="true">▣</span><strong>Foto del survey</strong><span>La lectura asistida prepara los datos para tu revisión.</span><b aria-hidden="true">→</b></button><button type="button" class="tr-entry" data-tour-action="manual"><span class="tr-entry-icon" aria-hidden="true">＋</span><strong>Ingresar información</strong><span>Registra los nombres y los datos del tour a tu ritmo.</span><b aria-hidden="true">→</b></button></div><p class="tr-note">Empieza como te resulte más fácil. El contacto y el contexto adicional son opcionales.</p>${draft.primaryName ? `<section class="tr-card"><h2>Captura en esta sesión</h2><p>Tu información sigue disponible hasta salir o recargar la página.</p>${action('edit', 'Continuar borrador')}</section>` : ''}`;
  } else if (step === 'photo') {
    body = `<section class="tr-card"><h2>Foto del survey</h2><p>Procura que se vea completo y sin reflejos. Solo JPEG o PNG.</p>${state.photo ? `<div class="tr-photo"><img src="${esc(state.photo.url)}" alt="Vista previa del survey seleccionado"></div><div class="tr-actions">${action('read', state.previewing ? 'Leyendo survey…' : 'Usar esta foto', 'gold', state.previewing ? 'disabled' : '')}${action('camera', 'Volver a tomar')}${action('pick', 'Elegir otra imagen')}</div>` : `<div class="tr-photo tr-photo-empty"><span aria-hidden="true">▣</span><p>Tu survey aparecerá aquí</p></div><div class="tr-actions">${action('camera', 'Tomar foto', 'gold')}${action('pick', 'Elegir imagen')}</div>`}<p class="tr-note">Si tu cámara no abre, elige una imagen o continúa sin foto. La imagen no se guarda con el tour.</p>${action('manual', state.previewing ? 'Cancelar lectura y capturar manualmente' : 'Continuar sin foto', 'ghost')}</section>`;
  } else if (step === 'form') {
    body = `<form id="tr-form" novalidate class="tr-layout"><aside class="tr-source"><section class="tr-card"><h2>${draft.source === 'survey' ? 'Lectura asistida del survey' : 'Captura manual'}</h2><p>${draft.source === 'survey' ? 'Estos son datos sugeridos. Tú revisas y confirmas; lo que no se leyó queda vacío.' : 'Solo necesitamos lo esencial para organizar la visita.'}</p>${state.photo ? `<img class="tr-source-image" src="${esc(state.photo.url)}" alt="Survey para comparar con los campos">` : ''}${draft.source === 'survey' ? action('survey', 'Cambiar foto') : action('survey', 'Usar foto del survey', 'ghost')}<p class="tr-note">${esc(context.userLabel || 'Asesor de tu sesión')} · ${esc(context.roomLabel || 'Sala asignada')}<br>Sala y asesor provienen de la sesión, no del survey.</p></section></aside><div class="tr-fields"><section class="tr-card"><h2>Visitantes</h2>${field(state, 'primaryName', 'Nombre del visitante principal', {max:80,required:true})}${field(state, 'companionName', 'Nombre del acompañante', {max:80,hint:'Opcional; puedes continuar sin este dato.'})}</section><section class="tr-card"><h2>Datos del tour</h2>${context.manager ? field(state, 'repId', 'Asesor', {required:true,options:[['','Elige un asesor'],...(context.reps || []).map(rep=>[rep.id,rep.name])]}) : ''}${field(state, 'date', 'Fecha', {type:'date',required:true})}<div class="tr-time-grid">${field(state, 'start', 'Inicio', {type:'time',required:true})}${field(state, 'end', 'Fin', {type:'time',required:true})}</div><p class="tr-note">Horario propuesto en ${esc(caps.timeZone || 'la zona de la sala')}. Se comprobará la disponibilidad al registrar.</p></section><details class="tr-card tr-optional" data-tour-optional ${state.optionalOpen ? 'open' : ''}><summary>Más contexto <span>(opcional)</span></summary>${field(state, 'language', 'Idioma preferido', {options:Object.entries(LANGUAGES)})}${field(state, 'interests', 'Intereses compartidos', {max:304,hint:'Hasta cinco, separados por coma. Solo lo que te compartieron.'})}${field(state, 'notes', 'Notas', {max:400,textarea:true})}${field(state, 'contactType', 'Tipo de contacto', {options:[['phone','Teléfono'],['email','Correo']]})}${field(state, 'contactValue', 'Contacto compartido', {type:draft.contactType === 'email' ? 'email' : 'tel',max:draft.contactType === 'email' ? 254 : 25,hint:'Opcional. No se envían mensajes automáticamente.'})}</details><div class="tr-actions tr-bottom"><button class="btn gold" type="submit">Revisar resumen</button>${action('keep', 'Mantener borrador durante esta sesión', 'ghost')}</div></div></form>`;
  } else if (step === 'summary') {
    body = `<div class="tr-summary">${summary(draft, context, true)}<section class="tr-card"><label class="tr-review" for="tr-review"><input id="tr-review" type="checkbox" data-tour-review ${draft.reviewConfirmed ? 'checked' : ''} ${state.busy ? 'disabled' : ''}><span>Revisé la información del tour</span></label>${state.errors.reviewConfirmed ? `<p class="tr-error" role="alert">${esc(state.errors.reviewConfirmed)}</p>` : ''}<p class="tr-note">El tour quedará pendiente de iniciar. Esto no registra una venta.</p><div class="tr-actions">${action('submit', state.busy ? 'Registrando…' : 'Registrar tour', 'gold', state.busy ? 'disabled aria-busy="true"' : '')}${action('edit', 'Volver a editar', 'line', state.busy ? 'disabled' : '')}</div></section></div>`;
  } else if (step === 'success' || step === 'detail') {
    const data = state.saved?.registration; const visit = state.saved?.visit;
    body = state.detailLoading ? '<p role="status">Cargando detalle privado…</p>' : data ? `<div class="tr-summary"><section class="tr-card tr-success"><span class="tr-success-mark" aria-hidden="true">✓</span><strong>${esc(visit?.lead || data.lead || 'Tour registrado')}</strong><p>${esc(visit?.status === 'cancelado' ? 'Cancelado' : 'Pendiente de iniciar')}</p></section>${summary(data, context, false)}<div class="tr-actions tr-bottom">${action('prepare', 'Preparar con mi agente IA', 'gold')}${action('meet', 'Abrir Meet & Greet')}${action('agenda', 'Ver en mi agenda', 'ghost')}</div><p class="tr-note">La preparación abre una pregunta general con la referencia anónima. No se comparten los nombres, contacto, foto ni notas.</p></div>` : `<section class="tr-card"><p>Los datos privados no están disponibles.</p>${action('exit','Volver a la agenda')}</section>`;
  }
  const progress = ['photo','form','summary'].includes(step) ? `<ol class="tr-progress" aria-label="Progreso"><li ${step === 'photo' ? 'aria-current="step"' : ''}>1 Capturar</li><li ${step === 'form' ? 'aria-current="step"' : ''}>2 Revisar</li><li ${step === 'summary' ? 'aria-current="step"' : ''}>3 Confirmar</li></ol>` : '';
  return `${header}<div class="screen tr-screen" data-tour-step="${esc(step)}">${intro}${progress}${error}${state.warnings.length ? `<div class="tr-warning" role="status">${state.warnings.map(item=>`<p>${esc(warningText(item))}</p>`).join('')}</div>` : ''}${body}<div class="tr-live" role="status" aria-live="polite">${state.previewing ? 'Leyendo survey. Puedes cancelar y continuar manualmente.' : ''}</div></div>`;
}
