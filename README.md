# Torn - Hide "Use another from faction"

A tiny userscript for [Torn City](https://www.torn.com) that hides the **"Use another from faction"** link that appears in the items menu after you use an item (meds, boosters, drugs).

- Uses a single CSS rule targeting `a.next-act[data-fac="1"]` (the attribute Torn puts on the faction-armory variant of that link).
- Your personal "Use another" link is untouched; using items from the faction armory page itself still works.
- Display-only: it hides a button, it does not click, use or automate anything (compliant with Torn's scripting rules).

Also available on Greasy Fork.

## Usage

The script hides the button by default. Use the toggle in your userscript manager (Tampermonkey/Violentmonkey icon) to temporarily show it - handy during wars when you want quick access to faction meds:

- **✅ ON - hiding "Use another from faction" (click to show)** - button is hidden (default)
- **⚔️ OFF - showing "Use another from faction" (click to hide)** - button is visible

The toggle applies immediately (no page reload needed) and is remembered across sessions in this browser.

## Install

**Option 1 - Greasy Fork (recommended)**  
Search for the script on [greasyfork.org](https://greasyfork.org) and click Install.

**Option 2 - Direct from GitHub (requires Tampermonkey/Violentmonkey)**  
Open the raw file and Tampermonkey will offer to install it:  
https://raw.githubusercontent.com/DwergBerg/torn-hide-faction-use/main/torn-hide-faction-use.user.js

## License

[MIT](https://opensource.org/licenses/MIT) - free to modify and redistribute.
