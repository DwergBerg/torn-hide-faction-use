// ==UserScript==
// @name         Torn - Hide "Use another from faction"
// @namespace    torn.hide-fac-use
// @version      1.2
// @description  Hides the "Use another from faction" button in the items menu. Toggle it from the userscript manager menu (e.g. during wars). Display-only change - does not click, use or automate anything.
// @author       DwergBerg
// @license      MIT
// @match        https://www.torn.com/*
// @run-at       document-start
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @downloadURL  https://raw.githubusercontent.com/DwergBerg/torn-hide-faction-use/main/torn-hide-faction-use.user.js
// @updateURL    https://raw.githubusercontent.com/DwergBerg/torn-hide-faction-use/main/torn-hide-faction-use.user.js
// ==/UserScript==

(function () {
  'use strict';

  const CSS = 'a.next-act[data-fac="1"] { display: none !important; }';
  const STYLE_ID = 'hide-fac-use';

  // Hidden by default; the setting persists across sessions in this browser.
  let hiding = GM_getValue('hiding', true);

  function apply() {
    const style = document.getElementById(STYLE_ID);
    if (hiding && !style) {
      const el = document.createElement('style');
      el.id = STYLE_ID;
      el.textContent = CSS;
      (document.head || document.documentElement).appendChild(el);
    } else if (!hiding && style) {
      style.remove();
    }
  }

  function menuLabel() {
    return hiding
      ? '✅ ON - hiding "Use another from faction" (click to show)'
      : '⚔️ OFF - showing "Use another from faction" (click to hide)';
  }

  let menuId;
  function registerMenu() {
    if (typeof GM_registerMenuCommand !== 'function') return; // e.g. managers without menu support
    if (menuId !== undefined && typeof GM_unregisterMenuCommand === 'function') {
      GM_unregisterMenuCommand(menuId);
    }
    menuId = GM_registerMenuCommand(menuLabel(), () => {
      hiding = !hiding;
      GM_setValue('hiding', hiding);
      apply();
      registerMenu();
    });
  }

  apply();
  registerMenu();

  // Re-inject if Torn rebuilds <head>.
  new MutationObserver(apply).observe(document.documentElement, { childList: true, subtree: true });
})();
