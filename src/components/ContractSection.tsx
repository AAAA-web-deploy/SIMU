import { siteConfig } from '../data/siteConfig.ts';
import { ContractActions } from './ContractActions.tsx';

export function ContractSection() {
  return (
    <section className="section contract-feature" aria-labelledby="contract-title">
      <div className="container">
        <div className="contract-slab">
          <h2 id="contract-title">ONE TOKEN. ONE CONTRACT.</h2>
          <p className="ticker-glow">{siteConfig.ticker}</p>
          <ContractActions copyLabel="COPY CONTRACT" showLabel={false} />
        </div>
      </div>
    </section>
  );
}
