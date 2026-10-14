# Visual blueprint — scene lock

## Story arc in 8 seconds, not a long text story
Load → **eyes** → **normal black MIWO** → **whale dream** → **blue costume** → **living ocean**. First visit should surprise, but never delay access to token/community links unnecessarily. Loading only when genuine; intro can be skipped.

## Scene composition at desktop ~1440×900
1. **Eyes**: uniform near-black. Two cream ovals with tiny traveling pupils at screen center, occupying ~25–35% width. No logo, no whale suit, no gradient ocean visible yet. Subtle eyebrows, blink.
2. **Reveal**: warm spotlight upper center, black MIWO full-body in center. Front-facing, tie fully visible. Scene background almost black. One short friendly caption `Meet MIWO.` from left/bottom.
3. **Dream**: scene lightens lavender→peach; the normal character near lower-left and huge dream whale upper right, thought bubble independent. Gentle stars. Caption in DOM `Someday... I'll be a whale.`
4. **Costume**: water splash ripple passes; swap sprites via cross-fade. Whale tail briefly moves separately; black face remains visible.
5. **Ocean hero**: 3D spatial illustration achieved with 2D layers: large MIWO foreground (left/center), distant whale above water right, pastel sky and sea SVG, wave foreground, drifting small bubbles; title is big and not over character. Friendly buoy controls.
6. **The moods**: descend into underwater blues; eight reaction bubbles drift at slightly different depths/speeds; click one to show actual user-supplied art at large size, an idiomatic one-line joke, and `Make this meme` link to workshop.
7. **Treasure hatch**: contract/community appears as an ocean artifact's popover, not detached rectangular crypto cards.
8. **Postcard**: restrained peaceful end with original `Someday... I'll be a whale!` reference at ~280–340 CSS px on desktop, ~230–280px mobile (it is a small extracted asset).

## Mandatory transition behavior
- Fade backgrounds independently; do not simply swap a full-width hero image.
- Character motion through transform/squash/stretch (CSS), water through looping SVG translation/wave shape, small bubbles through staggered lightweight CSS animations, whales through slow parallax transform.
- Eye-only stage must visibly precede normal mascot and whale costume.
- Keep MIWO on scene to make it feel continuous. Artboards in `/references` are art direction **not CSS layout templates**.

## Design tokens
| Purpose | Color |
| --- | --- |
| Eye ivory | `#FFF7E6` |
| MIWO black | `#15131B` |
| Tie lavender | `#BAA1EA` |
| Whale blue | `#369BE8` |
| Daylight sky | `#DCF5FF` |
| Sea | `#2F9CCF` |
| Dream blush | `#FFD7CE` |
| Ocean midnight | `#091A33` |
| Deep highlight | `#90E6F1` |
| Chart red/green (decorative only) | `#FE777A` / `#5FDEAA` |

Typography: rounded, charismatic display face with legible fallback. Use real text not image lettering. No packaged font files. Large title may tilt by 1–2° but should never sacrifice legibility.

## Mobile rules
- 360–430 CSS px base, no horizontal scroll.
- Intro max ~4.5s if auto-played on mobile, prominent skip, reveal keeps entire eye/face in view.
- Primary button close to thumb reach. Whale mode visible above first fold or within one simple swipe.
- Bubble interaction uses one or two large floating targets visible at a time, not eight tiny bubbles crammed together.
- Token and social buttons always accessible via compact floating nav; don't bury launch info behind narrative.

## Respect user-specific approvals
- The previously selected brand-board logo/cinematic banner/Someday poster are references. Do not change them into a different artistic style.
- The rest of the original character/reaction assets remain exact user-supplied files.
- Avoid generic card/dashboard layout or static posters stacked section by section.
- Avoid overselling the whale as a verified large investor; the whole joke is a tiny trader *pretending* to be a whale.
