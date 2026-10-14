# MICRO PANIC ($MIWO)

A single scrolling ocean for MICRO PANIC. The opening plays eyes, the original uncostumed MIWO, a whale dream, then the blue costume. After that the daylight ocean, feeling bubbles, meme workshop, and bag hatch are one continuous scene.

## Setup

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Where to put real links

Edit `src/config/site.ts` only after the values are official:

- `contractAddress` — leave `''` until you have a real `0x` plus 40 hex characters. Then **COPY CA** works.
- `telegramUrl` and `xUrl` — leave `''` until the pod is launched. Blank links stay disabled.
- `chartUrl` and `tradeUrl` — leave `''` until a real provider URL exists. The chart iframe loads only after a click.
- `chainId` — `1` means the intended network label is Ethereum mainnet. That is not a deployment receipt.

Do not add supply, tax, liquidity, or ownership claims. The page does not show them.

## Scene timings and graphics

- Intro lengths: `src/config/timings.ts` (`DESKTOP_TIMINGS`, `MOBILE_TIMINGS`, `WHALE_MODE_MS`).
- Hero layers (sky, ocean plate, waves, distant whale, costume sprite): `src/components/OceanHero.tsx` and `OceanHero.module.css`.
- Character and background files stay in `/assets`. The site imports the web-ready copies and does not rewrite the masters.

Returning visitors in the same tab skip the intro via `sessionStorage` (`miwo-intro-seen`). **Replay intro** at the bottom plays it again. Reduced motion skips the animated opening.
