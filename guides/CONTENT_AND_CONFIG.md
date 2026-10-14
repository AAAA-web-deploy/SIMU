# Copy canon / content — approved vs illustrative

**Approved facts:** Token name MICRO PANIC. Ticker $MIWO. Character is a tiny trader dreaming of becoming a whale. Original black round sprite is bare / no whale outfit initially, then appears with blue whale costume. Slogan `Micro Bag. Whale-Sized Feelings.`

**Approved creative messages:**
- `I can't move the market. The market moves me.`
- `Whales move millions. MIWO moves emotionally.`
- `Someday... I'll be a whale!`
- `Whale dreams. Micro wallet.`
- `GO FULL WHALE`
- `BAG: STILL MICRO`

**Scene-ready short copy:**
- Loading: `OPENING MIWO'S LITTLE WORLD...`
- Eyes: preferably no text; only subtle tap/skip control.
- Reveal: `Meet MIWO.`
- Dream: `Someday... I'll be a whale.`
- Costume: `WHALE MODE: ON`
- Hero: `MICRO PANIC` / `$MIWO` / `Micro Bag. Whale-Sized Feelings.`
- Ocean waves: `Whales move the market. MIWO moves emotionally.`
- Mood bubble area: `HOW MICRO ARE YOUR FEELINGS TODAY?`
- Meme maker: `MAKE YOUR MIWO MOMENT`
- Bag hatch: `THE BAG` / `MICRO PANIC` / `$MIWO`
- Crew: `JOIN THE POD` / `TELEGRAM` / `X`
- Footer: `Still a micro bag. Still dreaming big.`

**Moods + editable one-liners (jokes, not performance claims):**
- Calm confidence: `I have a plan. Please don't ask about it.`
- Temptation: `Just one little buy. What could happen?`
- Suspicion: `The whale bought. Why am I nervous?`
- Embarrassment: `I called the bottom. Again.`
- Relief: `Sold for peace. Still checking.`
- Delight: `Up forty cents. Practically institutional.`
- Patience: `No position. Infinite opinions.`
- Exaggerated focus: `Micro bag. Full-screen emotions.`

The cartoon `$8` portfolio is a made-up character gag, not a price/portfolio claim or guaranteed return. A meme user can edit it. Charts are decorative until a legitimate provider URL is configured.

## Config contract
Implement `src/config/site.ts` from `snippets/site-config.example.ts`, not hard-coded ad hoc links. Blank means unknown and **must not** cause a clickable `#` link or silent fake success.
- `chainId`: `1` for Ethereum mainnet only as project intent, not a claim of deployment.
- `contractAddress`: `''` until provided; valid address means `0x` plus 40 hexadecimal characters.
- `telegramUrl`, `xUrl`, `chartUrl`, `tradeUrl`: `''` until real official links supplied.
- `totalSupply`, `taxes`, `lpBurned`, `ownershipRenounced`: do not display while unknown.
- No fake price charts, holder counts, trending stats or verified token security claims.
