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

- `contractAddress: 'COMING_SOON'` shows **Contract address: Coming soon**. Do not put a sample address here.
- Link fields set to `#` render as disabled **Coming soon** actions.
- Liquidity, ownership, and tax strings are displayed exactly as written. Leave them as `Coming Soon` until they are real public facts.

## Deploy

Static site. No backend, wallet, or API key.

Pushes to `main` build `dist` and publish with GitHub Pages (`.github/workflows/pages.yml`). `public/CNAME` is still `nwdog.world` from the previous project. Change it only when this site has its own domain.
