// FTD instalar-app: detección de «ya instalada» y modo del botón en cualquier dispositivo.
import assert from "node:assert/strict";
import { isStandalone, isIOS, installMode, INSTALL_HELP } from "../install.js";

const mm = (standalone) => (q) => ({ matches: standalone && q === "(display-mode: standalone)" });

// Ya instalada: modo standalone (Android/escritorio) o navigator.standalone (iOS).
assert.equal(isStandalone({ matchMedia: mm(true), navigator: {} }), true);
assert.equal(isStandalone({ matchMedia: mm(false), navigator: { standalone: true } }), true);
assert.equal(isStandalone({ matchMedia: mm(false), navigator: {} }), false);
assert.equal(isStandalone({}), false, "sin matchMedia no truena");

// iOS: iPhone/iPad, y iPad con iPadOS que se anuncia como Mac con pantalla táctil.
assert.equal(isIOS("Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) Safari", 5), true);
assert.equal(isIOS("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari", 5), true);
assert.equal(isIOS("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari", 0), false);
assert.equal(isIOS("Mozilla/5.0 (Linux; Android 15) Chrome/130", 5), false);

// Modo del botón.
assert.equal(installMode({ standalone: true, canPrompt: true, ios: false }), "hidden");
assert.equal(installMode({ installed: true, canPrompt: false, ios: false }), "hidden");
assert.equal(installMode({ canPrompt: true, ios: false }), "prompt");
assert.equal(installMode({ canPrompt: false, ios: true }), "ios");
assert.equal(installMode({ canPrompt: false, ios: false }), "manual");

// Cada modo visible tiene instrucciones en español.
assert.match(INSTALL_HELP.ios, /Compartir/);
assert.match(INSTALL_HELP.ios, /pantalla de inicio/);
assert.match(INSTALL_HELP.manual, /menú del navegador/);

console.log("install ok");
