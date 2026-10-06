import { disclaimer, siteConfig } from '../data/siteConfig.ts';
import { asset } from '../lib/assets.ts';
import { ActionLink } from './ActionLink.tsx';

const pageLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Story', href: '#story' },
  { label: 'How to Buy', href: '#how-to-buy' },
  { label: 'Tokenomics', href: '#tokenomics' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Community', href: '#community' },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <img
        className="footer-bg"
        src={asset('sihere-footer-background.png')}
        alt=""
        width={1800}
        height={690}
        loading="lazy"
      />
      <div className="footer-shade" />
      <div className="container footer-inner">
        <div className="footer-brand">
          <p>
            {siteConfig.name} — {siteConfig.ticker}
          </p>
          <p>The meme for the Super Intelligence era.</p>
        </div>
        <nav className="footer-links" aria-label="Footer">
          {pageLinks.map((link) => (
            <a key={link.href} className="text-link" href={link.href}>
              {link.label}
            </a>
          ))}
          <ActionLink href={siteConfig.xUrl} className="text-link">
            X
          </ActionLink>
          <ActionLink href={siteConfig.telegramUrl} className="text-link">
            Telegram
          </ActionLink>
          <ActionLink href={siteConfig.etherscanUrl} requireContract className="text-link">
            Etherscan
          </ActionLink>
        </nav>
        <p className="disclaimer">{disclaimer}</p>
      </div>
    </footer>
  );
}
