import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { token } from '../config/token.ts';
import { copyExactText } from '../lib/clipboard.ts';
import { isComingSoonAddress, shortenAddress } from '../lib/token.ts';
import { Reveal } from './Reveal.tsx';

export function ContractAddress({ address }: { address: string }) {
  const [copied, setCopied] = useState(false);

  if (isComingSoonAddress(address)) {
    return <span>Coming Soon..</span>;
  }

  async function onCopy() {
    const ok = await copyExactText(address);
    if (!ok) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <span className="inline-flex flex-wrap items-center justify-end gap-3">
      <span aria-hidden="true">{shortenAddress(address)}</span>
      <span className="sr-only">{address}</span>
      <button type="button" className="btn btn-ghost min-h-10 px-3" onClick={onCopy} aria-label="Copy contract address">
        {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
        {copied ? 'Copied' : 'Copy'}
      </button>
    </span>
  );
}

const rows = [
  ['Liquidity status', token.liquidityStatus],
  ['Ownership status', token.ownershipStatus],
  ['Buy tax', token.buyTax],
  ['Sell tax', token.sellTax],
] as const;

export function TokenCard() {
  return (
    <section id="token" className="scroll-mt-24 bg-secondary px-5 py-20 md:px-8 md:py-28" aria-labelledby="tokenomics-heading">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2 id="tokenomics-heading" className="display text-4xl sm:text-6xl">
            Tokenomics
          </h2>
          <dl className="mt-8 divide-y divide-white/10 overflow-hidden rounded-3xl border border-white/10">
            <div className="grid gap-1 bg-panel/70 px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-center">
              <dt className="font-grotesk text-xs font-bold tracking-[0.16em] text-muted uppercase">Contract Address</dt>
              <dd className="font-grotesk text-lg font-bold text-gold-bright">
                <ContractAddress address={token.contractAddress} />
              </dd>
            </div>
            {rows.map(([label, value]) => (
              <div key={label} className="grid gap-1 bg-panel/70 px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-center">
                <dt className="font-grotesk text-xs font-bold tracking-[0.16em] text-muted uppercase">{label}</dt>
                <dd className="font-grotesk text-lg font-bold text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
