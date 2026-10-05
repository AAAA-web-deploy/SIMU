import { token } from '../config/token.ts';
import { isComingSoonAddress, shortenAddress } from '../lib/token.ts';
import { Reveal } from './Reveal.tsx';

function contractValue(address: string): string {
  return isComingSoonAddress(address) ? 'Coming Soon' : shortenAddress(address);
}

export function TransparencyPanel() {
  const rows = [
    ['Contract', contractValue(token.contractAddress)],
    ['Liquidity status', token.liquidityStatus],
    ['Ownership status', token.ownershipStatus],
    ['Buy tax', token.buyTax],
    ['Sell tax', token.sellTax],
  ];

  return (
    <section className="px-5 py-16 md:px-8 md:py-24" aria-labelledby="verify-heading">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 id="verify-heading" className="display text-4xl sm:text-6xl">
            Verify. Don't trust.
          </h2>
          <div className="mt-5 max-w-2xl space-y-3 text-lg text-muted">
            <p>Crypto moves fast.</p>
            <p>Verify contract information, liquidity status, permissions and trading conditions yourself using public blockchain tools.</p>
          </div>
          <dl className="mt-8 divide-y divide-white/10 overflow-hidden rounded-3xl border border-white/10">
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
