import { ArrowLeftRight, Link2, Sparkles, Wallet } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { siteConfig } from '../data/siteConfig.ts';
import { asset } from '../lib/assets.ts';
import { ContractActions } from './ContractActions.tsx';
import { Reveal } from './Reveal.tsx';

const steps: { n: string; title: string; copy: string; icon: LucideIcon }[] = [
  {
    n: '01',
    title: 'GET ETH',
    icon: Wallet,
    copy: 'Purchase ETH from a trusted exchange and transfer it to your Ethereum wallet.',
  },
  {
    n: '02',
    title: 'CONNECT YOUR WALLET',
    icon: Link2,
    copy: 'Use a compatible Ethereum wallet and connect only through the official SIHERE links.',
  },
  {
    n: '03',
    title: `SWAP ETH FOR ${siteConfig.ticker}`,
    icon: ArrowLeftRight,
    copy: 'Open the official swap link, verify the contract address, choose the amount of ETH you want to swap and confirm the transaction.',
  },
  {
    n: '04',
    title: 'WELCOME TO SI',
    icon: Sparkles,
    copy: `Your ${siteConfig.ticker} tokens will appear in your wallet after the transaction confirms.`,
  },
];

export function HowToBuy() {
  return (
    <section className="section buy" id="how-to-buy" aria-labelledby="buy-title">
      <div className="container">
        <Reveal>
          <h2 id="buy-title">ENTER THE SI ERA</h2>
        </Reveal>
        <div className="buy-layout">
          <Reveal>
            <figure className="buy-figure">
              <img
                src={asset('sihere-how-to-buy.png')}
                alt="The SI king beside a glowing path of wallet, swap, and Ethereum steps."
                width={1400}
                height={761}
                loading="lazy"
              />
            </figure>
          </Reveal>
          <ol className="steps">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <li key={step.n} className="step">
                  <div className="step-top">
                    <span className="step-no">{step.n}</span>
                    <Icon aria-hidden="true" />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </li>
              );
            })}
          </ol>
        </div>
        <Reveal>
          <div className="contract-panel">
            <ContractActions copyLabel="COPY" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
