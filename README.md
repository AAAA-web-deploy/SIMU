# HEFTY SUPERINTELLIGENT CHONK

Single-page site for **$HSICHONK**, an independent Ethereum meme. The page is a tap-to-evolve mascot plus a short token introduction. It does not connect a wallet, send transactions, or track visitors.

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

Images live in [`public/assets/token/`](public/assets/token/). Keep the filenames already referenced by the config. The seven evolution PNGs are full scenes; render them with `object-fit: contain`. The logo and favicon are transparent outside the circular badge. `hsichonk-banner-3x1.png` and `hsichonk-banner-1100x520.png` are for off-site sharing and are not placed on the page.

These launch values stay `null` until you have real ones:

- `contractAddress`
- `buyUrl`
- `chartUrl`
- `xUrl`
- `telegramUrl`

Buy stays disabled until `contractAddress` is `0x` plus 40 hex characters and `buyUrl` is an `https` URL. Chart stays disabled until `chartUrl` is an `https` URL. Social links stay hidden until their URLs are `https`. An invalid address is not displayed.

`siteUrl` is the public URL of this site, including the repository subpath. It is set to the GitHub Pages address so the build can emit the canonical URL and absolute social image.

The Evolution Stages statistic uses `source: "stageCount"`. The page displays `evolution.length`. If `value` is also set, it must match that length. This token has 7 stages, so the stat is 7. Intelligence and Chonk are fictional labels stored in the same list.

`chainName` is the header badge. `nativeSymbol` is the gas token (`ETH`) for whoever edits the how-to-buy copy.

Each evolution stage can set `era` and `transition`. Transitions are `flicker`, `scan`, `cyan`, `violet`, `glow`, and `halo`. The count of stages comes from `evolution.length`, including a token with one stage.

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
