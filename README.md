# SI is Here

Single-page site for **SI is Here ($SIHERE)**, an independent Ethereum meme about the cultural shift from Artificial Intelligence to Super Intelligence.

The project is not an AI company and is not affiliated with the Ethereum Foundation, any AI lab, or any public figure.

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

## Editable values

Update `src/data/siteConfig.ts`. Bracketed values stay unpublished:

- Trade buttons stay disabled until `contractAddress` is a real `0x` address and the matching URL is an `https` link.
- `BUY $SIHERE` scrolls to How to Buy until the Uniswap link is live.
- Social buttons stay visible and disabled until their URLs are real.

## Deploy

Static site. No backend, wallet connection, or purchase flow.

Pushes to `main` build `dist` and publish with GitHub Pages at `https://jackmiller825.github.io/SIHERE/`.
