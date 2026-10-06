import type { TokenConfig } from '../types/token.ts';
import { assetUrl } from '../utils/assetUrl.ts';
import { displayTicker, liveHttpsUrl } from '../lib/launch.ts';

type SocialProps = {
  token: TokenConfig;
  className?: string;
  label: string;
};

export function SocialLinks({ token, className, label }: SocialProps) {
  const xUrl = liveHttpsUrl(token.xUrl);
  const telegramUrl = liveHttpsUrl(token.telegramUrl);
  if (!xUrl && !telegramUrl) return null;

  return (
    <nav className={className} aria-label={label}>
      {xUrl ? (
        <a href={xUrl} target="_blank" rel="noopener noreferrer">
          {token.strings.socialX}
        </a>
      ) : null}
      {telegramUrl ? (
        <a href={telegramUrl} target="_blank" rel="noopener noreferrer">
          {token.strings.socialTelegram}
        </a>
      ) : null}
    </nav>
  );
}

export function Header({ token }: { token: TokenConfig }) {
  return (
    <header className="site-header">
      <div className="brand">
        <img
          className="brand-logo"
          src={assetUrl(token.logo)}
          alt={token.strings.logoAlt}
          width={1024}
          height={1024}
        />
        <p className="wordmark">{displayTicker(token.ticker)}</p>
      </div>
      <div className="header-side">
        <p className="chain-badge" title={`${token.chainName} (${token.nativeSymbol})`}>
          {token.chainName}
        </p>
        <SocialLinks token={token} className="social social-header" label="Social" />
      </div>
    </header>
  );
}
