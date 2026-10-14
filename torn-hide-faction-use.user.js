// ==UserScript==
// @name         Torn - Hide "Use another from faction"
// @namespace    torn.hide-fac-use
// @version      1.1
// @description  Hides the "Use another from faction" button that appears in the items menu after using an item. Display-only change - does not click, use or automate anything.
// @author       DwergBerg
// @license      MIT
// @match        https://www.torn.com/*
// @run-at       document-start
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/DwergBerg/torn-hide-faction-use/main/torn-hide-faction-use.user.js
// @updateURL    https://raw.githubusercontent.com/DwergBerg/torn-hide-faction-use/main/torn-hide-faction-use.user.js
// ==/UserScript==

(function () {
  'use strict';

  const CSS = 'a.next-act[data-fac="1"] { display: none !important; }';

  function inject() {
    const style = document.createElement('style');
    style.id = 'hide-fac-use';
    style.textContent = CSS;
    (document.head || document.documentElement).appendChild(style);
  }

  // Inject as early as possible; re-inject if Torn rebuilds <head>.
  inject();
  new MutationObserver(() => {
    if (!document.getElementById('hide-fac-use')) inject();
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
