# Torn - Hide "Use another from faction"

A tiny userscript for [Torn City](https://www.torn.com) that hides the **"Use another from faction"** link that appears in the items menu after you use an item (meds, boosters, drugs).

- Uses a single CSS rule targeting `a.next-act[data-fac="1"]` (the attribute Torn puts on the faction-armory variant of that link).
- Your personal "Use another" link is untouched; using items from the faction armory page itself still works.
- Display-only: it hides a button, it does not click, use or automate anything (compliant with Torn's scripting rules).
- No GM API usage - works in Tampermonkey, Violentmonkey and Torn PDA.

Also available on Greasy Fork.

## Usage

The script hides the button by default. On the items page you will see a small checkbox:

> ☐ Hide "use another from faction"

Uncheck it to show the faction button (e.g. during wars), check it to hide it again. The change applies instantly (no reload) and is remembered in this browser. If the checkbox cannot find its usual spot, it pins itself to the bottom-right corner of the items page instead.

## Install

**Option 1 - Greasy Fork (recommended)**  
Search for the script on [greasyfork.org](https://greasyfork.org) and click Install.

**Option 2 - Direct from GitHub (requires Tampermonkey/Violentmonkey, or add to Torn PDA's userscripts)**  
Open the raw file and Tampermonkey will offer to install it:  
https://raw.githubusercontent.com/DwergBerg/torn-hide-faction-use/main/torn-hide-faction-use.user.js

## License

[MIT](https://opensource.org/licenses/MIT) - free to modify and redistribute.
