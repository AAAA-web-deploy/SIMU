import type { ReactNode } from 'react';
import { token } from '../config/token.ts';
import { isPlaceholderLink } from '../lib/token.ts';

export function IconX({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M14.7 10.4 22.2 2h-1.8l-6.5 7.3L8.3 2H2l7.9 11.2L2 22h1.8l7-7.8L15.6 22H22l-7.3-11.6Zm-2.5 2.8-.8-1.1L4.6 3.5h2.8l5.2 7.3.8 1.1 6.8 9.6h-2.8l-5.2-7.3Z" />
    </svg>
  );
}

export function IconTelegram({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M21.6 4.3 2.9 11.4c-1.3.5-1.2 1.2-.2 1.5l4.8 1.5 11.2-7.1c.5-.3 1-.1.6.3l-9.1 8.2-.4 4.7c.6 0 .8-.2 1.1-.6l2.5-2.4 5.1 3.8c.9.5 1.6.2 1.8-.9l3.2-15.1c.4-1.4-.5-2-1.9-1.5Z" />
    </svg>
  );
}

export function BuyLink({ className = '', children = 'Buy $SIINTERN' }: { className?: string; children?: ReactNode }) {
  const live = !isPlaceholderLink(token.uniswapUrl);
  if (live) {
    return (
      <a className={`btn btn-gold ${className}`} href={token.uniswapUrl} target="_blank" rel="noreferrer noopener">
        {children}
      </a>
    );
  }
  return (
    <a className={`btn btn-gold ${className}`} href="#token">
      {children}
    </a>
  );
}

type SocialProps = {
  href: string;
  label: string;
  className?: string;
  quiet?: boolean;
  children: ReactNode;
};

export function SocialLink({ href, label, className = '', quiet = false, children }: SocialProps) {
  const live = !isPlaceholderLink(href);
  if (!live) {
    return (
      <button type="button" className={className} disabled title={`${label} coming soon`}>
        {children}
        {quiet ? <span className="sr-only">{label} coming soon</span> : <span className="text-[0.65rem] tracking-[0.14em]">Coming soon</span>}
      </button>
    );
  }
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer noopener" aria-label={label}>
      {children}
    </a>
  );
}

type TradeProps = {
  href: string;
  children: ReactNode;
};

export function TradeLink({ href, children }: TradeProps) {
  const live = !isPlaceholderLink(href);
  if (!live) {
    return (
      <button type="button" className="btn btn-ghost w-full" disabled>
        {children}
        <span className="text-[0.65rem] tracking-[0.16em] text-gold-bright">Coming soon</span>
      </button>
    );
  }
  return (
    <a className="btn btn-ghost w-full" href={href} target="_blank" rel="noreferrer noopener">
      {children}
    </a>
  );
}
