import { assetUrl } from '../utils/assetUrl.ts';
import { displayTicker } from '../lib/launch.ts';
import type { TokenConfig } from '../types/token.ts';
import {
  ChartIcon,
  CopyButton,
  DocIcon,
  ExternalControl,
  FittedText,
  TelegramIcon,
  XIcon,
} from './controls.tsx';
import type { CopyState, PanelId } from './windows.tsx';

type Props = {
  token: TokenConfig;
  address: string | null;
  copyState: CopyState;
  onCopy: () => void;
  onOpen: (panel: PanelId) => void;
};

export function HomePage({ token, address, copyState, onCopy, onOpen }: Props) {
  const contractText = address ?? token.strings.contractPending;
  const ticker = displayTicker(token.ticker);

  return (
    <div className="home-frame">
      <header className="home-bar">
        <div className="home-brand">
          <span className="home-logo-frame">
            <img
              className="home-logo"
              src={assetUrl(token.logo)}
              width={1024}
              height={1024}
              alt=""
            />
          </span>
          <div className="home-brand-copy">
            <h1>
              {token.name} · {ticker}
            </h1>
            <p className="contract-line">
              <span className="contract-label">Contract:</span>
              <span className="contract-slot">
                <FittedText text={contractText} />
              </span>
            </p>
          </div>
        </div>
        <div className="home-tools">
          <div className="home-actions">
            <button type="button" className="story-launch" onClick={() => onOpen('story')}>
              Read the full story
              <span aria-hidden="true">›</span>
            </button>
            <button type="button" className="ghost-launch" onClick={() => onOpen('details')}>
              <DocIcon /> Token information
            </button>
            <button type="button" className="text-launch" onClick={() => onOpen('club')}>
              Community
            </button>
          </div>
          <nav className="home-nav" aria-label="Primary">
            <ExternalControl href={token.chartUrl} className="chip">
              <ChartIcon /> Chart
            </ExternalControl>
            <CopyButton canCopy={Boolean(address)} state={copyState} onCopy={onCopy} className="chip">
              Copy CA
            </CopyButton>
            <ExternalControl href={token.telegramUrl} className="chip">
              <TelegramIcon /> Telegram
            </ExternalControl>
            <ExternalControl href={token.xUrl} className="chip">
              <XIcon /> X
            </ExternalControl>
          </nav>
        </div>
      </header>
      <img
        className="home-banner"
        src={assetUrl(token.assets.banner)}
        width={1024}
        height={341}
        alt={`${token.name} ${ticker}. Same SuperIntelligence. Different hands. The edge is how you use it.`}
      />
      <img
        className="home-compare"
        src={assetUrl(token.assets.home)}
        width={1024}
        height={341}
        alt="Without SI Musashi guidance, the crowd copies the signal and leaves the judgment to SI. With SI Musashi guidance, they question the answer, add context, and make the decision. Same SuperIntelligence. Different hands."
      />
      <footer className="home-foot">
        <p>
          <EthereumMark /> {ticker} · {token.chainName}
        </p>
        <p>Comparison from the fictional story.</p>
      </footer>
    </div>
  );
}

function EthereumMark() {
  return (
    <svg className="eth-mark" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#8b7cff"
        d="M12 1.5 5 12.2l7 4.1 7-4.1L12 1.5Zm0 16.2-7-4.1L12 22.5l7-8.9-7 4.1Z"
      />
    </svg>
  );
}
