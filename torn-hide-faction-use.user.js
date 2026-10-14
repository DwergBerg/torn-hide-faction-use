// ==UserScript==
// @name         Torn - Hide "Use another from faction"
// @namespace    torn.hide-fac-use
// @version      1.4
// @description  Hides the "Use another from faction" button that appears after using an item. Small toggle in the top-right corner of the item-use popup. Works in Tampermonkey, Violentmonkey and Torn PDA. Display-only - does not click, use or automate anything.
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

  // Walk up from the faction link to the popup container:
  // a small dialog-sized box (wide enough for the message, tall enough to
  // contain message + buttons, but smaller than a page-sized overlay).
  function findPopup(link) {
    var el = link;
    for (var i = 0; i < 8 && el.parentElement; i++) {
      el = el.parentElement;
      var r = el.getBoundingClientRect();
      if (r.width >= 260 && r.width <= 800 && r.height >= 110) return el;
    }
    return null;
  }

  function mountToggle() {
    var link = document.querySelector('a.next-act[data-fac="1"]');
    if (!link) return;
    var container = findPopup(link);
    if (!container || container.querySelector('#' + TOGGLE_ID)) return;

    if (window.getComputedStyle(container).position === 'static') {
      container.style.position = 'relative';
    }

    // Top-right corner of the popup, next to the X button - deliberately far
    // from the action links so it cannot be hit accidentally.
    var wrap = document.createElement('label');
    wrap.id = TOGGLE_ID;
    wrap.style.cssText =
      'position:absolute;top:8px;right:34px;z-index:9999;' +
      'display:inline-flex;align-items:center;gap:4px;padding:2px 6px;' +
      'background:rgba(22,22,22,0.8);border:1px solid #444;border-radius:4px;' +
      'color:#ccc;font-size:11px;font-family:Arial,sans-serif;cursor:pointer;user-select:none;';
    wrap.title = 'Show/hide the "Use another from faction" option';

    var box = document.createElement('input');
    box.type = 'checkbox';
    box.id = TOGGLE_ID + '-box';
    box.checked = hiding;
    box.style.accentColor = '#4caf50';

    var text = document.createElement('span');
    text.textContent = 'hide faction use';

    box.addEventListener('change', function () {
      hiding = box.checked;
      saveHiding(hiding);
      apply();
    });

    wrap.appendChild(box);
    wrap.appendChild(text);
    container.appendChild(wrap);
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
