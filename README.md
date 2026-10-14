# Torn - Hide "Use another from faction"

A tiny userscript for [Torn City](https://www.torn.com) that hides the **"Use another from faction"** link that appears in the items menu after you use an item (meds, boosters, drugs).

- Uses a single CSS rule targeting `a.next-act[data-fac="1"]` (the attribute Torn puts on the faction-armory variant of that link).
- Your personal "Use another" link is untouched; using items from the faction armory page itself still works.
- Display-only: it hides a button, it does not click, use or automate anything (compliant with Torn's scripting rules).

Also available on Greasy Fork.

## Install

**Option 1 - Greasy Fork (recommended)**  
Search for the script on [greasyfork.org](https://greasyfork.org) and click Install.

**Option 2 - Direct from GitHub (requires Tampermonkey/Violentmonkey)**  
Open the raw file and Tampermonkey will offer to install it:  
https://raw.githubusercontent.com/DwergBerg/torn-hide-faction-use/main/torn-hide-faction-use.user.js

## License

[MIT](https://opensource.org/licenses/MIT) - free to modify and redistribute.
