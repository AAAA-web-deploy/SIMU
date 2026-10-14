# MICRO PANIC ($MIWO) — CURSOR READY PACKAGE

**One package, one build prompt, original character assets, a production asset atlas, and reference boards.**

## Use this package
1. Extract this ZIP into an empty folder; open **that folder** in Cursor.
2. Open `CURSOR_MASTER_PROMPT.md`, copy its full contents into Cursor Agent, and ask Cursor to implement it in this folder.
3. The prompt explicitly instructs Cursor to inspect `/assets`, `/references`, and the guide files before writing UI code. It should **not** ask you to upload the included files again.
4. Review the site against `guides/ACCEPTANCE_CHECKLIST.md`. Enter actual token contract / Telegram / X destinations in `src/config/site.ts` only after they are known.
5. Use `ASSET_ATLAS_PREVIEW.jpg` to confirm the source art. It is a reference sheet **not** a target page layout.

## New layout targets
- `references/targets/HERO_DESKTOP_COMPOSITION_WIREFRAME.jpg` and `HERO_MOBILE_COMPOSITION_WIREFRAME.jpg` show approximate **placement wireframes** at two sizes; their simplified SVG backdrop is NOT the final art-quality target. Cursor must render the same separate art layers and **live HTML text/buttons**, not render these target JPEGs as sections.
- `assets/banner/MIWO_SOCIAL_BANNER_3x1_2880x960.jpg` is an actual 3:1 static asset for sharing/social headers (not the interactive website hero).

## What is approved
- Token name **MICRO PANIC**, ticker **$MIWO** (not $MPANIC, $MIWO is final).
- Approved central joke: **Micro Bag. Whale-Sized Feelings.**
- Original black round character with cream eyes and lavender tie, **without whale costume at first**.
- Dream sequence → character puts on blue whale costume → immersive interactive ocean.
- Logo has **NO lettering**. Name/ticker appear prominently as actual website text.
- Selected circular-logo look, 3:1 banner visual direction, selected “Someday... I'll be a whale!” concept, other reaction illustrations.
- Main interaction **GO FULL WHALE**: illusion grows while micro wallet never changes.
- Microcap traders can make/share *their own MIWO memes*; client-only PNG export.

## What is intentionally NOT included as independently approved production art
The selected logo/banner/Someday image originally appeared in a **composite visual board**. Native-quality independent source images for those three board panels weren't attached. The package includes faithfully extracted board crops as `..._reference.webp` (and a no-text circular-logo crop), **not a misleading promise of 2880×960 source art**. Cursor must rebuild the banner scene from separate character artwork and SVG layers. Do NOT stretch a board crop as an enormous hero backdrop. The Someday poster may appear as a smaller scrapbook panel.

The earlier `index(1).html` mentioned 18 PNG images; only nine original mascot/reaction PNGs were actually supplied. This package uses those nine plus the later whale-costume artwork and approved reference boards. It does not invent the nine missing image files.

## Why the files are divided into groups
- `assets/characters`: production-transparent MIWO sprites, with full-resolution master PNG and optimized WebP copies.
- `assets/reactions`: 8 user-supplied transparent emotional reaction images, PNG masters + web-ready WebPs.
- `assets/logo`: selected round, no-text logo. The 900px variant was **upscaled from the small board crop**, not natively high-res.
- `assets/backgrounds` + `assets/effects`: individual vector layers for animation; actual webpage must position/animate them independently.
- `assets/posters`: approved-board crops for smaller references, plus optional prior poster artwork.
- `references`: original visual boards, **never display these as complete site sections**.
- `guides`: narrative, storyboard, exact asset placements, design rules, acceptance tests.
- `snippets`: optional reusable React component and token config shape.

## Technology requested
**React + Vite + TypeScript + CSS**. No 3D engine. Build working responsive site with real interactions; avoid giant JavaScript animations and unverified external data.

## Required placeholders
No contract address, DEX pair, official X, or Telegram URLs were provided in this conversation. Keep these fields blank and buttons gracefully disabled until you supply them. Do not invent token supply, tax, LP burn, renunciation status, price, or live trade activity.

## Note on visual fidelity
This package significantly reduces ambiguity and avoids relying on a single flattened moodboard, but no external code-generation system can guarantee a pixel-perfect interpretation. Your review of Cursor's local preview against the included storyboard is still the final approval gate.
