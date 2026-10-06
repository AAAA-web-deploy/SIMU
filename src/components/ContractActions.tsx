import { safetyNote, siteConfig } from '../data/siteConfig.ts';
import { canUseTradeLinks } from '../lib/links.ts';
import { ActionLink } from './ActionLink.tsx';
import { CopyButton } from './CopyButton.tsx';

type ContractActionsProps = {
  copyLabel: string;
  showLabel?: boolean;
};

export function ContractActions({ copyLabel, showLabel = true }: ContractActionsProps) {
  const explorerLive = canUseTradeLinks(siteConfig.contractAddress, siteConfig.etherscanUrl);
  const swapLive = canUseTradeLinks(siteConfig.contractAddress, siteConfig.uniswapUrl);

  return (
    <div className="contract-actions">
      {showLabel ? <p className="address-label">OFFICIAL CONTRACT ADDRESS</p> : null}
      <p className="address-value">{siteConfig.contractAddress}</p>
      <div className="button-row">
        <CopyButton value={siteConfig.contractAddress} label={copyLabel} className="btn btn-secondary" />
        <ActionLink href={siteConfig.etherscanUrl} requireContract className="btn btn-secondary">
          VIEW ON ETHERSCAN
        </ActionLink>
        <ActionLink href={siteConfig.uniswapUrl} requireContract className="btn btn-primary">
          BUY ON UNISWAP
        </ActionLink>
      </div>
      {!(explorerLive && swapLive) ? (
        <p className="pending-note">
          Explorer and swap buttons turn on when the official contract address and links are published.
        </p>
      ) : null}
      <p className="safety">{safetyNote}</p>
    </div>
  );
}
