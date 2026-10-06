import type { ReactNode } from 'react';
import { siteConfig } from '../data/siteConfig.ts';
import { canUseTradeLinks, isLiveUrl } from '../lib/links.ts';

type ActionLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  requireContract?: boolean;
  'aria-label'?: string;
};

export function ActionLink({
  href,
  className,
  children,
  requireContract = false,
  'aria-label': ariaLabel,
}: ActionLinkProps) {
  const enabled = requireContract
    ? canUseTradeLinks(siteConfig.contractAddress, href)
    : isLiveUrl(href);

  if (!enabled) {
    return (
      <button type="button" className={className} disabled aria-label={ariaLabel} title="Official link coming soon">
        {children}
      </button>
    );
  }

  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
      {children}
    </a>
  );
}

type BuyLinkProps = {
  className?: string;
  children: ReactNode;
};

export function BuyLink({ className, children }: BuyLinkProps) {
  const live = canUseTradeLinks(siteConfig.contractAddress, siteConfig.uniswapUrl);

  if (!live) {
    return (
      <a className={className} href="#how-to-buy">
        {children}
      </a>
    );
  }

  return (
    <a className={className} href={siteConfig.uniswapUrl} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
