# CURSOR AGENT — BUILD MICRO PANIC ($MIWO) FROM THIS PACKAGE

You are implementing an original production-quality cryptocurrency meme-token website inside the **current folder**. READ and inspect the actual files in `/assets`, `/references`, `/guides`, and `ASSET_ATLAS_PREVIEW.jpg` BEFORE creating page components. All included artwork is available locally. Do not ask the user to reupload files.

## Non-negotiable identity
- **Name: MICRO PANIC**. **Ticker: $MIWO** (NOT $MPANIC; NOT $MICRO; NOT literal “Meme” as the name).
- Canonical slogan: **Micro Bag. Whale-Sized Feelings.**
- MIWO is a tiny black, round, slightly textured creature with huge asymmetric cream eyes, thin limbs, small curly tuft and lavender necktie. His ambitions are whale-sized; his wallet is micro. The blue whale suit is a **costume**, not a body transformation.
- Humor: whale-sized imagination versus tiny financial exposure. On green candles he feels legendary, on red candles his feelings become enormous; relatable to small/frequent meme traders in both up and down markets.
- The **Department of Unnecessary Panic** is an optional one-button joke, NOT a complex government-lore site. The site story is visual and short.

## Approved art source hierarchy
1. Exact appearance of original unclothed MIWO: `assets/characters/miwo_original_nocostume.webp` (PNG master in same folder).
2. Exact appearance wearing whale costume: `assets/characters/miwo_whale_costume.webp` (PNG master in same folder).
3. Reaction art: all eight files in `assets/reactions/*.webp`.
4. No-letter circular logo: `assets/logo/miwo_logo_no_text_selected.png`.
5. Motion layers: `assets/backgrounds/*.svg` and `assets/effects/*.svg`.
6. Selected “Someday...” illustration: `assets/posters/someday_ill_be_a_whale_reference.webp` (native-small reference; show as scrapbook art at limited size).
7. Selected color, shapes and mood from `references/01_APPROVED_VISUAL_SELECTION_BOARD.png`. Cinematic eyes→reveal→dream→costume rhythm from `references/02_APPROVED_EYES_DREAM_COSTUME_SEQUENCE.png`.
8. Remaining moodboards are **inspiration**, NEVER to paste full into the UI.

## Pixel-composition checkpoints
Open `references/targets/HERO_DESKTOP_COMPOSITION_WIREFRAME.jpg` and `HERO_MOBILE_COMPOSITION_WIREFRAME.jpg` for ONLY the broad relative scale/placements of character, title, subtitle and main CTA on each viewport. **Their simple flat SVG style is NOT approved final visual quality.** These *wireframes* were assembled from the exact character sprites and the flat SVG ocean; they are **only placement guides**. Their flat/pale vector appearance is intentionally BELOW the final art-quality bar. Use the rich painterly textures and luminous water of `references/01_APPROVED_VISUAL_SELECTION_BOARD.png` and `references/02_APPROVED_EYES_DREAM_COSTUME_SEQUENCE.png` as the **visual-quality target**, layering subtle texture, illustrated wave detail and atmospheric effects without pasting whole board images. For the site implement them as separate DOM/SVG layers, **NOT by embedding the target JPEG**.

## Absolute negative constraints
**Do not** implement a generic Home/Story/Tokenomics/Community stack, template cards, a generic blue crypto dashboard, a static wall of imported images, fake charts or market data, broken/inert CTAs, invented contract addresses, invented supply/tax/LP claims, or a copied mockup pasted as a giant hero image. **Do not** make MIWO wear the costume in the dark eyes/reveal sequence. **Do not** bake the name into the letter-free logo or modify the original mascot's anatomy. No rotating banner carousel.

## Core concept: THE WHALE ILLUSION
Make ONE cohesive interactive ocean: dark stage → eyes-only → normal MIWO → whimsical dream → costume on → daylight ocean and waves → immersive underwater moods → personal meme maker → tiny bag/crew popovers. The environment should feel like it changes, not like the user is navigating conventional pages. The illustration layers animate independently (water, small bubbles, whale silhouette, character, captions).

### Precise scene contract and transitions
Use a short cinematic first-visit intro orchestrated by a small React state machine (`loading`, `eyes`, `reveal`, `dream`, `suit`, `ocean`), not by magic scroll selectors. Offer a clear visible `SKIP INTRO` and keyboard accessibility. Store a short-lived session flag, not persistent forced reload. Make content still usable if animation fails.

**00 Loading, ~0.7–1.6s:** black-indigo screen, small lavender line filling smoothly, a brief tiny eye blink. Actual asset readiness controls progression; don't fake a hard 10-second loading screen. Prefer an immediate skip for returning session visitors.

**01 Eyes-only, ~1.0s:** near-black background `intro_void.svg`. Only two oversized cream-colored eyes, small white brows and mobile pupils—no suit/body/text at first. Use the included vector eyes as visual proportions, but render eyes/pupils in DOM/inline SVG so pupils glance left→right→up and blink. A little playful, NOT horror. Include low-motion alternative.

**02 Full-body reveal, ~1.3s:** warm soft spotlight lifts. The original black creature from `miwo_original_nocostume.webp` fades and pops into view from bottom while the eye-only layer fades out; the transition must align faces. MIWO waves and has a little surprised squash/stretch. On-screen lettering appears separately: `Meet MIWO.` The original lavender tie must be visible.

**03 Whale dream, ~1.5s:** he looks up; a dreamy cloud/bubble appears, revealing a gigantic gentle whale from `dream_sky_whale.svg`, with a few thought bubbles. Keep unclothed MIWO visible. Small, heartfelt line: `Someday... I'll be a whale.` Use `someday_ill_be_a_whale_reference.webp` later as a small treasured postcard, **not as a full-screen flattened transition**.

**04 Costume transform, ~0.8s:** bright blue wave-splash/whale-tail swoop masks a crossfade to the **transparent whale-costume MIWO sprite**. Do not just use a suddenly switched full-page background. MIWO's eyes and tie remain recognizable. On-screen subtitle: `Whale mode: ON.`

**05 Interactive ocean / main hero:** transition out of darkness into an illustrated bright-day ocean. Use `ocean_surface.svg` behind the transparent whale-costumed MIWO. Layer waves/bubbles/whale silhouette independently. Large responsive typographic title `MICRO PANIC`; smaller ` $MIWO`; subtitle `Micro Bag. Whale-Sized Feelings.` Main CTA: `GO FULL WHALE`. On desktop character and typography share the hero, but the character must remain visually dominant. Do not display a large static rectangle/image collage.

### Main interaction — GO FULL WHALE (real, visible state change)
A single satisfying button with hover/tap/keyboard effect. When clicked: a distant whale scales up temporarily and a wave swells, MIWO's confidence goes to 100, sky warms/brightens, bubbles burst; after 2–3s the fantasy settles. A playful wallet label remains **`BAG: STILL MICRO`** through the entire effect. Users may repeat it without reloading. Reduced-motion users get a static immediate state swap. Make the function perform these actions, not a dead button.

### From ocean surface to underwater
Use 2–3 pinned-feeling BUT naturally scrollable transitions using layers; DO NOT hijack scroll or force horizontal scrolling, especially on mobile. As the user moves downward, bright surface deepens into luminous underwater twilight (`ocean_depth.svg`). Keep one recurring floating MIWO/whale tail element as spatial continuity. Candle shapes briefly float as wave-crests; the charts are decorative, not live or deceptively real market data.

### Emotional bubbles: the meme wall without the wall
Instead of tiles/cards, 6–8 floating discoverable bubbles trigger reaction art popovers and a tiny one-line trader joke. Use each actual `/assets/reactions` image (not repeated AI remakes) and position bubbles as a loose illustrated constellation, with distinct large tap targets and desktop keyboard-focus handling. The original no-costume character may reappear here: costume is not mandatory in every scene.
Moods: calm_confidence, temptation, suspicion, embarrassment, relief, delight, patience, exaggerated_focus. Sample copy in `guides/CONTENT_AND_CONFIG.md`.

### MIWO MEME WORKSHOP (real, not an inert mockup)
In a creative 'underwater doodle dock', let visitor select 8 reaction sprites + both character sprites, type a short caption, preview it in a drawn ocean paper frame, and press `DOWNLOAD MEME` to export a working square PNG using canvas **client-side**. Use 1080x1080, text wrapping, safe margins, origin-clean local assets, handle transparent alpha. Bonus `Copy caption` works. No login/wallet required. On narrow screens make controls easy to tap. Limit text, sanitize user input, show validation/feedback. Do not claim upload/publish functionality.

### Treasure Hatch: real token details, no fabricated data
Create a playful anchor object (small buoy, shell or treasure hatch) that opens a clean **accessible modal/drawer** showing:
- `MICRO PANIC` and `$MIWO` as confirmed known details.
- `Ethereum mainnet` ONLY if launch chain is intentionally specified by site config, otherwise use config-controlled label.
- contract address from `src/config/site.ts`: blank until user provides it; if absent show `Contract address coming soon` with copy disabled. If valid 0x + 40 hex chars then offer `COPY CA`.
- `Chart` / `Trade` only when actual URL supplied; lazily embed real chart after click. Never fake a candlestick or a price widget as live market data.
- DO NOT guess total supply, taxes, liquidity lock/burn, owner-renounce status, verified status, ticker collision clearance, celebrity endorsement, guarantees, or token performance.

### Crew, links and persistent access
Use a floating minimal `CREW` / `THE BAG` / `MAKE MEME` nav system (not generic full-width header lists). Telegram/X links are config-driven; if blank, clearly inactive/not launched, not href="#". Preserve accessible text labels. Tiny tokens and links must be reachable from start without watching the full intro; show a small top/right skip + an always-discoverable menu. Mobile uses small fixed nav with generous tap areas and no obscuring the mascot.

### Ending emotional beat
As the ocean darkens at the far end, show the **small approved `Someday... I'll be a whale!` postcard** pinned to driftwood, like a reminder of MIWO's dream. Allow a small one-line interaction: `Still a micro bag. Still dreaming big.` Include a replay-intro control and minimal footer/link disclosures. This is a moment, NOT a full separate conventional Story page.

## Visual and technical standards
- Art style: soft 2D illustrations + subtle grain, bold outlined features, pastel daylight blue, navy midnight, lavender tie, ivory eyes. Art stays source-faithful. Keep black mascot readable against both bright and dark environments.
- Palette and spacing in `guides/VISUAL_BLUEPRINT.md`. Text should be real HTML/CSS, never embedded into site hero as part of the reference collage. Logo MUST contain no letters.
- Desktop 1440x900: spacious editorial hero, 55% composition for character/sea, 45% expressive title/interactions; do not cover his eyes or whale fin. Mobile 360x780: vertically staged reveal, same animations but shorter; no 3D canvas requirement, no horizontal overflow.
- Stack: React + Vite + TypeScript, standard CSS modules/plain CSS. You may use light animation library only if justified; prefer transform/opacity/IntersectionObserver/requestAnimationFrame; respect `prefers-reduced-motion`.
- WebP character sources, SVG layers. Keep source originals untouched. Preload only critical intro/hero assets; lazy-load reaction sprites and optional posters. Limit decorative background DOM nodes (e.g. <40 bubbles); avoid heavy video, Lottie and WebGL. `loading=lazy` where appropriate, responsive sizes, alt text, no console errors.
- Accessibility: skip intro, skip-to-content, focus traps and ESC in dialogs, buttons work with keyboard, text contrast and labels, reduced-motion mode.
- Metadata: title `MICRO PANIC ($MIWO) — Micro Bag. Whale-Sized Feelings.`; original OG image ideally drawn/exported from hero; never accidentally use reference collage as social thumbnail.

## Build deliverables
Implement complete site in this folder (not just a plan). Include `README.md` with setup commands and where to set real URLs, plus clean comments for changing scene timings/graphics. `npm install && npm run dev` should work. If packages are missing, install them; do not create unused boilerplate components. Ensure `npm run build` succeeds and manually inspect the design at desktop and mobile widths using available tooling. If browser screenshot tooling exists, capture both and cross-check them against the reference boards and `guides/ACCEPTANCE_CHECKLIST.md`.

## Priority when time / tool limits exist
1. Correct faithful original/no-costume → whale-costume introduction (critical).
2. High-quality actual composited ocean hero and `GO FULL WHALE` interaction (critical).
3. Genuine token/community controls and no fabricated data (critical).
4. Reaction bubble exploration + working meme export.
5. Small refined decorative effects.
Never trade 1–3 for decorative effects. If something can't be done safely, keep a graceful clearly labeled non-live state, NOT a fake function.

Before writing code, silently audit relevant assets. After work, give the user a short summary of implemented interactions and any incomplete optional placeholders, not a proposal asking for further design prompts.
