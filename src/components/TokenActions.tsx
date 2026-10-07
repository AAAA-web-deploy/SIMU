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

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <rect x="8" y="3" width="13" height="13" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <rect x="3" y="8" width="13" height="13" rx="2" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function UnavailableAction({ label }: { label: string }) {
  return (
    <button type="button" className="action is-unavailable" disabled>
      {label}
    </button>
  );
}

export function TokenActions({ token, copyText = copyExactText, copiedDurationMs = 2000 }: Props) {
  const trimmedAddress = token.contractAddress?.trim() ?? '';
  const address = isEthereumAddress(trimmedAddress) ? trimmedAddress : null;
  const buyHref = canBuy(token.buyUrl) ? token.buyUrl : null;
  const chartHref = canOpenChart(token.chartUrl) ? token.chartUrl : null;
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed' | 'empty'>('idle');

  useEffect(() => {
    if (copyState !== 'copied') return undefined;
    const timer = window.setTimeout(() => setCopyState('idle'), copiedDurationMs);
    return () => window.clearTimeout(timer);
  }, [copyState, copiedDurationMs]);

  async function onCopy() {
    if (!address) {
      setCopyState('empty');
      return;
    }
    const ok = await copyText(address);
    setCopyState(ok ? 'copied' : 'failed');
  }

  return (
    <section className="panel" aria-labelledby="contract-heading">
      <h2 id="contract-heading">{token.strings.contractHeading}</h2>
      <div className="contract-row">
        {address ? (
          <p id="contract-address" className="address" onClick={() => void onCopy()}>
            {address}
          </p>
        ) : (
          <p id="contract-note" className="address is-pending">
            {token.strings.contractPending}
          </p>
        )}
        <button
          type="button"
          className="copy"
          onClick={() => void onCopy()}
          aria-label={copyState === 'copied' ? token.strings.copied : token.strings.copy}
          aria-describedby={address ? undefined : 'contract-note'}
        >
          <CopyIcon />
        </button>
      </div>
      <p className={copyState === 'idle' ? 'sr-only' : 'copy-status'} aria-live="polite">
        {copyState === 'copied'
          ? token.strings.copied
          : copyState === 'failed'
            ? token.strings.copyFailed
            : copyState === 'empty'
              ? token.strings.contractPending
              : ''}
      </p>
      <div className="actions">
        {buyHref ? (
          <a className="action action-buy" href={buyHref} target="_blank" rel="noopener noreferrer">
            {token.strings.buy}
          </a>
        ) : (
          <UnavailableAction label={token.strings.buy} />
        )}
        {chartHref ? (
          <a className="action action-chart" href={chartHref} target="_blank" rel="noopener noreferrer">
            {token.strings.chart}
          </a>
        ) : (
          <UnavailableAction label={token.strings.chart} />
        )}
      </div>
    </section>
  );
}
