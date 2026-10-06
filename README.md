# Super Intelligence Intern

Single-page site for Super Intelligence Intern ($SIINTERN), a fictional Ethereum meme-token about an enthusiastic intern who should not have production access.

The character and story are entertainment. The project is not affiliated with Tesla, SpaceX, xAI, the Ethereum Foundation, or any person shown or referenced in the art.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
npm run typecheck
npm test
```

## Token facts

Edit `src/config/token.ts`. Unknown values stay as placeholders:

- `contractAddress: 'COMING_SOON'` shows **Coming Soon..**. Do not put a sample address here.
- Link fields set to `#` render as disabled **Coming soon** actions.
- Liquidity, ownership, and tax strings are displayed exactly as written.

## Deploy

Static site. No backend, wallet, or API key.

Pushes to `main` build `dist` and publish with GitHub Pages (`.github/workflows/pages.yml`). The public site is [https://siintern.site/](https://siintern.site/). `public/CNAME` is `siintern.site`, and the workflow builds with `VITE_BASE=/`.
