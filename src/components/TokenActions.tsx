import { useEffect, useState } from 'react';
import { copyExactText } from '../lib/clipboard.ts';
import { canBuy, canOpenChart, isEthereumAddress } from '../lib/launch.ts';
import type { TokenConfig } from '../types/token.ts';

type CopyText = (value: string) => Promise<boolean>;

type Props = {
  token: TokenConfig;
  copyText?: CopyText;
  copiedDurationMs?: number;
};

function UnavailableAction({ label, soon }: { label: string; soon: string }) {
  return (
    <button type="button" className="action is-unavailable" disabled>
      <span>{label}</span> <span className="soon">{soon}</span>
    </button>
  );
}

export function TokenActions({ token, copyText = copyExactText, copiedDurationMs = 2000 }: Props) {
  const address = isEthereumAddress(token.contractAddress) ? token.contractAddress : null;
  const buyHref = canBuy(token.contractAddress, token.buyUrl) ? token.buyUrl : null;
  const chartHref = canOpenChart(token.chartUrl) ? token.chartUrl : null;
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');

  useEffect(() => {
    if (copyState !== 'copied') return undefined;
    const timer = window.setTimeout(() => setCopyState('idle'), copiedDurationMs);
    return () => window.clearTimeout(timer);
  }, [copyState, copiedDurationMs]);

  async function onCopy() {
    if (!address) return;
    const ok = await copyText(address);
    setCopyState(ok ? 'copied' : 'failed');
  }

  return (
    <section className="panel" aria-labelledby="contract-heading">
      <h2 id="contract-heading">{token.strings.contractHeading}</h2>
      {address ? (
        <p id="contract-address" className="address">
          {address}
        </p>
      ) : (
        <p id="contract-note">{token.strings.contractPending}</p>
      )}
      <button
        type="button"
        className="copy"
        onClick={() => void onCopy()}
        disabled={!address}
        aria-describedby={address ? undefined : 'contract-note'}
      >
        {copyState === 'copied' ? token.strings.copied : token.strings.copy}
      </button>
      <p className={copyState === 'failed' ? 'copy-status' : 'sr-only'} aria-live="polite">
        {copyState === 'copied'
          ? token.strings.copied
          : copyState === 'failed'
            ? token.strings.copyFailed
            : ''}
      </p>
      <div className="actions">
        {buyHref ? (
          <a className="action action-buy" href={buyHref} target="_blank" rel="noopener noreferrer">
            {token.strings.buy}
          </a>
        ) : (
          <UnavailableAction label={token.strings.buy} soon={token.strings.comingSoon} />
        )}
        {chartHref ? (
          <a className="action action-chart" href={chartHref} target="_blank" rel="noopener noreferrer">
            {token.strings.chart}
          </a>
        ) : (
          <UnavailableAction label={token.strings.chart} soon={token.strings.comingSoon} />
        )}
      </div>
    </section>
  );
}
