import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { TourRegistration } from '../tour-registration.js';

// A native file chooser completes later. Replacing sheets.innerHTML detaches
// its old input; that element can no longer bubble change to the phone.
function harness() {
  let opened;
  const received = [];
  const inputs = [];
  class Input extends EventTarget {
    constructor() { super(); this.files = []; this.value = ''; this.dataset = {}; inputs.push(this); }
    click() { opened = this; }
    remove() { this.parent = null; }
    select(file) {
      this.files = [file]; this.value = 'C:\\fakepath\\survey.png';
      this.dispatchEvent(new Event('change'));
      if (this.parent === 'sheets') received.push(file); // Existing delegated change handler.
    }
  }
  const phone = {
    querySelector: () => inputs.find(input => input.parent === 'sheets'),
    querySelectorAll: () => inputs.filter(input => input.parent === 'phone'),
    append: input => { input.parent = 'phone'; },
  };
  const repaint = () => {
    for (const input of inputs) if (input.parent === 'sheets') input.remove();
    const input = new Input(); input.parent = 'sheets';
  };
  const registration = new TourRegistration({onChange:repaint});
  const user = {id:'ana',role:'rep',roomId:'norte'};
  const caps = {enabled:true,canRegister:true,mode:'private'};
  registration.setSession(user,caps); registration.choose('survey');
  const source = readFileSync(new URL('../agenda.js',import.meta.url),'utf8');
  const start = source.includes('function openSurveyPicker(') ? source.indexOf('function openSurveyPicker(') : source.indexOf('async function runRegistration(');
  const code = source.slice(start,source.indexOf('const sheets = document.createElement'));
  const context = vm.createContext({phone,document:{createElement:()=>new Input()},registration,
    registrationPhotoToken:0,readRegistrationFields:()=>{},pickSurvey:file=>received.push(file)});
  vm.runInContext(code,context);
  return {context,registration,user,caps,received,opened:()=>opened};
}

test('file selection survives session polling while the native chooser is open', async () => {
  const h=harness(); await vm.runInContext("runRegistration('pick')",h.context);
  const chooser=h.opened();
  h.registration.setSession({...h.user},{...h.caps}); // The 15-second session check repaints the sheet.
  const file={name:'survey.png',type:'image/png'}; chooser.select(file);
  assert.deepEqual(h.received,[file]);
  assert.equal(chooser.value,'','The native input releases its raw file reference after selection.');
});

test('a file chosen after session expiry is discarded without normalization', async () => {
  const h=harness(); await vm.runInContext("runRegistration('camera')",h.context);
  const chooser=h.opened(); h.registration.setSession(null,h.caps);
  chooser.select({name:'private-survey.png',type:'image/png'});
  assert.deepEqual(h.received,[]);
  assert.equal(chooser.value,'');
});
