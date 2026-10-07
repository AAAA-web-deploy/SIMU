# SuperIntelligent Chonk

Single-page site for **$SICHONK**, an independent Ethereum meme. The page is a tap-to-evolve mascot plus a short token introduction. It does not connect a wallet, send transactions, or track visitors.

Superintelligence here is fictional lore. The project is not an AI company and is not affiliated with the Ethereum Foundation, any AI lab, or any public figure.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
npm run typecheck
npm test
```

`npm run build` typechecks with TypeScript, then writes the static site to `dist/`.

## Where to edit this token

All visible copy, colors, links, and image paths live in [`src/config/token.json`](src/config/token.json).

Images live in [`public/assets/token/`](public/assets/token/). Keep the filenames already referenced by the config. The five evolution PNGs are full scenes; render them with `object-fit: contain` inside a fixed square so the small CAT is not cropped or zoomed. The logo and favicon are transparent outside the circular badge. `sichonk-banner-3x1.png` and `sichonk-banner-1100x520.png` are for off-site sharing and are not placed on the page.

These launch values stay `null` until you have real ones:

- `contractAddress`
- `buyUrl`
- `chartUrl`

Buy stays disabled until `contractAddress` is `0x` plus 40 hex characters and `buyUrl` is an `https` URL. Chart stays disabled until `chartUrl` is an `https` URL. Social links stay hidden until their URLs are `https`. An invalid address is not displayed. `xUrl` and `telegramUrl` are set, and the header shows them as icons.

`siteUrl` is the public URL of this site. It is `https://hsichonk.site`, so the build can emit the canonical URL and absolute social image.

The Evolution Stages statistic uses `deriveFrom: "evolution.length"`. The page displays `evolution.length`. If `value` is also set, it must match that length. This token has 5 stages, so the stat is 5. Intelligence and Chonk are fictional labels stored in the same list.

`chainName` and `nativeSymbol` record the network and gas token for whoever edits the how-to-buy copy. The header does not display them.

Each evolution stage sets `addition`, `growthDescription`, `era`, and `transition`. Transitions are `none`, `pixel`, `scan`, `cyan-pulse`, and `cosmic-halo`. `transitionLabel` is the short `+FOOD` style text shown while that stage is arriving. The count of stages comes from `evolution.length`, including a token with one stage.

## Hosting and Vite base

The site base is the `VITE_BASE` environment variable, read in [`vite.config.ts`](vite.config.ts).

- Root hosting: leave it unset or set `VITE_BASE=/`.
- Repository hosting: `VITE_BASE=/repository-name/`.

Asset paths in the JSON start with `/assets/...`. The app strips that leading slash and joins `import.meta.env.BASE_URL` once. `siteUrl` is separate: it should already include the public path, and social image URLs are `siteUrl` plus the asset path.

GitHub Pages publishes this repo from [`.github/workflows/pages.yml`](.github/workflows/pages.yml). The custom domain `https://hsichonk.site` serves the site at the domain root, so the workflow sets `VITE_BASE=/`. `siteUrl` matches that address. `public/CNAME` keeps the custom domain on each deploy.

```bash
# PowerShell
$env:VITE_BASE = "/repository-name/"
npm run build
npm run preview
```

## Replace the token

1. Replace the PNGs in `public/assets/token/`, or point `evolution`, `logo`, `favicon`, and `socialPreview` at the new files.
2. Edit `src/config/token.json`: name, ticker, copy, theme colors, stages, and launch URLs.
3. Run `npm run build`.

Theme colors are CSS variables (`--bg`, `--accent`, `--secondary`, `--text`, `--muted`) applied from the config, so a new palette does not require component CSS edits.
