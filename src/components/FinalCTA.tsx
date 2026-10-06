import { siteConfig } from '../data/siteConfig.ts';
import { asset } from '../lib/assets.ts';
import { BuyLink } from './ActionLink.tsx';
import { Stars } from './Stars.tsx';

export function FinalCTA() {
  return (
    <section className="final-cta" aria-labelledby="final-title">
      <img
        className="final-bg"
        src={asset('sihere-footer-background.png')}
        alt=""
        width={1800}
        height={690}
        loading="lazy"
      />
      <div className="final-shade" />
      <Stars />
      <div className="container final-copy">
        <h2 id="final-title">
          AI HAD ITS TURN.
          <br />
          SI IS HERE.
        </h2>
        <p className="ticker-glow">{siteConfig.ticker}</p>
        <div className="hero-actions">
          <BuyLink className="btn btn-primary">BUY {siteConfig.ticker}</BuyLink>
          <a className="btn btn-secondary" href="#community">
            JOIN THE COMMUNITY
          </a>
        </div>
        <p className="status-line">Welcome to the next intelligence meme.</p>
      </div>
    </section>
  );
}
