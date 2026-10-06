import { siteConfig } from '../data/siteConfig.ts';
import { asset } from '../lib/assets.ts';
import { Reveal } from './Reveal.tsx';

const stats = [
  ['Token', siteConfig.name],
  ['Ticker', siteConfig.ticker],
  ['Network', siteConfig.network],
  ['Contract', siteConfig.contractAddress],
  ['Total Supply', siteConfig.totalSupply],
  ['Buy Tax', siteConfig.buyTax],
  ['Sell Tax', siteConfig.sellTax],
  ['Liquidity', siteConfig.liquidityStatus],
  ['Ownership', siteConfig.ownershipStatus],
] as const;

export function Tokenomics() {
  return (
    <section className="section tokenomics" id="tokenomics" aria-labelledby="token-title">
      <div className="container token-layout">
        <Reveal>
          <div>
            <h2 id="token-title">SIMPLE TOKEN. BIG IDEA.</h2>
            <p>
              {siteConfig.ticker} is designed around transparent, easy-to-understand token information.
            </p>
            <p>
              The verified contract address and final token parameters will always be displayed through
              official SIHERE channels.
            </p>
            <figure className="token-figure">
              <img
                src={asset('sihere-tokenomics.png')}
                alt="Illustrative artwork of a glowing Ethereum crystal. It is not the official token allocation."
                width={1400}
                height={855}
                loading="lazy"
              />
              <figcaption>
                The crystal artwork is illustrative. Official token figures are the values beside it.
              </figcaption>
            </figure>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <ul className="stat-grid">
            {stats.map(([label, value]) => (
              <li key={label} className={label === 'Contract' ? 'stat stat-wide' : 'stat'}>
                <span>{label}</span>
                <strong>{value}</strong>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
