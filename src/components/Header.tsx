import type { TokenConfig } from '../types/token.ts';
import { assetUrl } from '../utils/assetUrl.ts';
import { displayTicker, liveHttpsUrl } from '../lib/launch.ts';

type SocialProps = {
  token: TokenConfig;
  className?: string;
  label: string;
  icons?: boolean;
};

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.7 10.3 22.2 2h-1.8l-6.5 7.2L8.6 2H2.2l7.9 11.1L2.2 22h1.8l6.9-7.7L15.4 22h6.4l-7.1-11.7Zm-2.4 2.7-.8-1.1L4.6 3.3h2.7l5.1 7 .8 1.1 6.6 9.2h-2.7l-5.4-7.6Z"
      />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21.5 4.4 18.7 19c-.2 1-.8 1.2-1.6.8l-4.4-3.3-2.1 2c-.2.2-.4.4-.9.4l.3-4.6 8.4-7.6c.4-.3-.1-.5-.6-.2L7.3 13.1 2.8 11.7c-1-.3-1-.9.2-1.4L20.1 3.5c.8-.3 1.6.2 1.4.9Z"
      />
    </svg>
  );
}

export function SocialLinks({ token, className, label, icons = false }: SocialProps) {
  const xUrl = liveHttpsUrl(token.xUrl);
  const telegramUrl = liveHttpsUrl(token.telegramUrl);
  if (!xUrl && !telegramUrl) return null;

  return (
    <nav className={className} aria-label={label}>
      {xUrl ? (
        <a href={xUrl} target="_blank" rel="noopener noreferrer" aria-label={token.strings.socialX}>
          {icons ? <XIcon /> : token.strings.socialX}
        </a>
      ) : null}
      {telegramUrl ? (
        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={token.strings.socialTelegram}
        >
          {icons ? <TelegramIcon /> : token.strings.socialTelegram}
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
      <SocialLinks token={token} className="social social-header" label="Social" icons />
    </header>
  );
}
