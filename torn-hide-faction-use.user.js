// ==UserScript==
// @name         Torn - Hide "Use another from faction"
// @namespace    torn.hide-fac-use
// @version      1.3
// @description  Hides the "Use another from faction" button in the items menu. Toggle directly on the items page - works in Tampermonkey, Violentmonkey and Torn PDA. Display-only - does not click, use or automate anything.
// @author       DwergBerg
// @license      MIT
// @match        https://www.torn.com/*
// @run-at       document-end
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/DwergBerg/torn-hide-faction-use/main/torn-hide-faction-use.user.js
// @updateURL    https://raw.githubusercontent.com/DwergBerg/torn-hide-faction-use/main/torn-hide-faction-use.user.js
// ==/UserScript==

(function () {
  'use strict';

  var CSS_ID = 'hide-fac-use';
  var TOGGLE_ID = 'hide-fac-use-toggle';
  var STORE_KEY = 'hide-fac-use.hide';
  var HIDE_CSS = 'a.next-act[data-fac="1"] { display: none !important; }';

  // Hidden by default. No GM_* storage: Torn PDA does not implement the GM API,
  // so state is kept in localStorage (supported everywhere, including PDA).
  var hiding = (function () {
    try { return localStorage.getItem(STORE_KEY) !== '0'; } catch (e) { return true; }
  })();

  function saveHiding(v) {
    try { localStorage.setItem(STORE_KEY, v ? '1' : '0'); } catch (e) {}
  }

  function apply() {
    var style = document.getElementById(CSS_ID);
    if (hiding && !style) {
      style = document.createElement('style');
      style.id = CSS_ID;
      style.textContent = HIDE_CSS;
      (document.head || document.documentElement).appendChild(style);
    } else if (!hiding && style) {
      style.remove();
    }
    var box = document.getElementById(TOGGLE_ID + '-box');
    if (box) box.checked = hiding;
  }

  function onItemsPage() {
    if (/[?&]page=items/.test(location.search)) return true;
    return !!document.querySelector('.items-cont, #inventory-root, ul.items-list, .items-list');
  }

  function mountToggle() {
    if (document.getElementById(TOGGLE_ID) || !onItemsPage()) return;
    var host = document.querySelector('#inventory-root, .items-cont, #mainContainer') || document.body;

    var wrap = document.createElement('label');
    wrap.id = TOGGLE_ID;
    wrap.style.cssText =
      'display:inline-flex;align-items:center;gap:6px;margin:6px;padding:4px 10px;' +
      'background:#161616;border:1px solid #444;border-radius:4px;color:#ccc;' +
      'font-size:12px;font-family:Arial,sans-serif;cursor:pointer;user-select:none;';

    var box = document.createElement('input');
    box.type = 'checkbox';
    box.id = TOGGLE_ID + '-box';
    box.checked = hiding;

    var text = document.createElement('span');
    text.textContent = 'Hide "use another from faction"';

    box.addEventListener('change', function () {
      hiding = box.checked;
      saveHiding(hiding);
      apply();
    });

    wrap.appendChild(box);
    wrap.appendChild(text);

    if (host === document.body) {
      // Could not find the items container - pin the checkbox to the corner instead.
      wrap.style.position = 'fixed';
      wrap.style.bottom = '10px';
      wrap.style.right = '10px';
      wrap.style.zIndex = '99999';
    }
    host.appendChild(wrap);
  }

  var scheduled = false;
  function tick() {
    apply();
    mountToggle();
  }
  function scheduleTick() {
    if (scheduled) return;
    scheduled = true;
    setTimeout(function () { scheduled = false; tick(); }, 150);
  }

  tick();
  new MutationObserver(scheduleTick).observe(document.documentElement, { childList: true, subtree: true });
})();
