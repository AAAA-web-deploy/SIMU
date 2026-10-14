# Visual & functional acceptance checklist

## Overall direction
- [ ] The site looks like one changing illustrated ocean, NOT stacked banner / cards / static images.
- [ ] Desktop and mobile hero broadly match `references/targets/HERO_DESKTOP_COMPOSITION_WIREFRAME.jpg` and `HERO_MOBILE_COMPOSITION_WIREFRAME.jpg` in composition, with moving layers rather than flattened JPGs.
- [ ] Logo is circular and **has no lettering** (asset-level), while MICRO PANIC and $MIWO appear naturally as live text on site.
- [ ] Original black MIWO looks like the exact uploaded source; outfit is ONLY shown after dream/transformation stage.
- [ ] No reference collage is rendered wholesale anywhere in the actual site.

## Introduction
- [ ] A genuine, short loading view exists; returning visitor can skip it.
- [ ] Eyes move independently on black **before** normal character appears.
- [ ] Full original no-costume body is fully revealed with lavender tie.
- [ ] Whale appears as a dream (not an actual transformed character).
- [ ] Costume enters via a moving splash/swoop mask; does not simply flash-cut to unrelated hero.
- [ ] The transition looks good at 1440×900 and 390×844; no clipped eyes/legs.
- [ ] `Skip intro` works with mouse, touch and keyboard. `prefers-reduced-motion` avoids flashing.

## Ocean interaction
- [ ] Real `GO FULL WHALE` action visibly swells ocean/whale/MIWO confidence.
- [ ] `BAG: STILL MICRO` remains unchanged during Whale Mode.
- [ ] Ocean background, wave, and character move as **separate** layers.
- [ ] Page can be scrolled normally on mobile; animations do not trap scroll.
- [ ] Deep ocean mood area displays the 8 original reactions through interactive bubbles.
- [ ] Small `Someday... I'll be a whale!` reference displayed as a postcard near the end, not a pixelated full-screen hero.

## Meme maker
- [ ] User can select all original eight reactions + 2 MIWO forms.
- [ ] User can type a caption, see real image/caption preview, and download a valid 1080×1080 PNG.
- [ ] Buttons never do nothing; accessibility and feedback are implemented.
- [ ] No user login/wallet connection required for basic meme creation.

## Token & safety
- [ ] No invented contract address, trade link, price chart, supply, tax, LP burn or renunciation claim.
- [ ] When CA missing, copy button disabled/hidden and truthful message shown.
- [ ] When real CA configured, copy button copies exact address and confirmation appears.
- [ ] Social URLs disabled until actual official URLs are configured.
- [ ] Chart/trading area lazy and real-provider only; no demo chart pretending to be live.

## Technical QA
- [ ] `npm install` and `npm run dev` work from project root.
- [ ] `npm run build` succeeds.
- [ ] No JS console errors, missing images, animation errors or broken tabs.
- [ ] No horizontal overflow at 360px width.
- [ ] Full character remains readable over ocean and dark backgrounds.
- [ ] Responsive layouts checked at 360×780, 390×844, 768×1024, 1440×900.
- [ ] Decorative images are lazy-loaded except initial necessary assets; no huge video/WebGL.
- [ ] Focus visibility, accessible modal/escape, contrast and reduced-motion support.
- [ ] Test opening directly from a deep route or page refresh if app uses client routing.
