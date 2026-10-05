import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { assetSize, assets } from '../config/assets.ts';
import { token } from '../config/token.ts';
import { copyExactText } from '../lib/clipboard.ts';
import { isComingSoonAddress, shortenAddress } from '../lib/token.ts';
import { TradeLink } from './Brand.tsx';
import { Reveal } from './Reveal.tsx';

const facts = [
  ['Name', token.name],
  ['Ticker', token.symbol],
  ['Network', token.network],
  ['Standard', token.standard],
];

export function ContractAddress({ address }: { address: string }) {
  const [copied, setCopied] = useState(false);

  if (isComingSoonAddress(address)) {
    return <p className="font-grotesk text-sm font-bold tracking-[0.14em] text-gold-bright uppercase">Contract address: Coming soon</p>;
  }

  async function onCopy() {
    const ok = await copyExactText(address);
    if (!ok) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <p className="font-grotesk text-sm font-bold tracking-[0.12em] uppercase">
        <span className="text-muted">Contract address: </span>
        <span aria-hidden="true">{shortenAddress(address)}</span>
        <span className="sr-only">{address}</span>
      </p>
      <button type="button" className="btn btn-ghost min-h-10 px-3" onClick={onCopy} aria-label="Copy contract address">
        {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}

export function TokenCard() {
  return (
    <section id="token" className="scroll-mt-24 bg-secondary px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="text-center">
          <img
            src={assets.logo}
            alt="Circular Super Intelligence Intern badge with the mascot and the $SIINTERN ticker."
            width={assetSize.logo.width}
            height={assetSize.logo.height}
            loading="lazy"
            decoding="async"
            className="mx-auto w-64 max-w-full object-contain drop-shadow-[0_0_40px_rgba(255,182,41,0.28)] sm:w-80"
          />
        </Reveal>
        <Reveal>
          <p className="kicker">The token</p>
          <h2 className="display mt-3 text-4xl sm:text-6xl">
            One intern.
            <span className="mt-2 block">One token.</span>
            <span className="mt-2 block">Unlimited mistakes.</span>
          </h2>
          <div className="glass-panel mt-8 rounded-3xl p-6">
            <dl className="grid gap-4 sm:grid-cols-2">
              {facts.map(([label, value]) => (
                <div key={label}>
                  <dt className="font-grotesk text-xs font-bold tracking-[0.16em] text-muted uppercase">{label}</dt>
                  <dd className={`mt-1 text-xl ${label === 'Ticker' ? 'gold-text font-display text-3xl' : 'text-ink'}`}>{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 border-t border-white/10 pt-5">
              <ContractAddress address={token.contractAddress} />
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <TradeLink href={token.uniswapUrl}>Buy on Uniswap</TradeLink>
            <TradeLink href={token.dexscreenerUrl}>View Dexscreener</TradeLink>
            <TradeLink href={token.etherscanUrl}>Etherscan</TradeLink>
            <TradeLink href={token.dextoolsUrl}>Dextools</TradeLink>
          </div>
        </Reveal>
      </div>
      <Reveal className="mx-auto mt-12 max-w-7xl">
        <img
          src={assets.bannerWide}
          alt="Super Intelligence Intern banner with the mascot, a laptop, and the $SIINTERN ticker."
          width={assetSize.bannerWide.width}
          height={assetSize.bannerWide.height}
          loading="lazy"
          decoding="async"
          className="h-auto w-full rounded-3xl object-cover object-center"
        />
      </Reveal>
    </section>
  );
}
