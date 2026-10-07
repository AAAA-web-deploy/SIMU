import { assetUrl } from '../utils/assetUrl.ts';
import { displayTicker } from '../lib/launch.ts';
import type { TokenConfig } from '../types/token.ts';
import {
  ChartIcon,
  CopyButton,
  DocIcon,
  EthIcon,
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
              width={1254}
              height={1254}
              alt=""
            />
          </span>
          <h1>
            {token.name} · {ticker}
          </h1>
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
          <ExternalControl href={token.xUrl} className="chip round-chip">
            <XIcon />
            <span className="sr-only">X</span>
          </ExternalControl>
        </nav>
      </header>
      <div className="home-stage">
        <img
          className="home-banner"
          src={assetUrl(token.assets.banner)}
          width={2172}
          height={724}
          alt={`${token.name} ${ticker}. Same SuperIntelligence. Different hands. The edge is how you use it.`}
        />
        <img
          className="home-compare"
          src={assetUrl(token.assets.home)}
          width={2172}
          height={724}
          alt="Without SI Musashi guidance, the crowd copies the signal and leaves the judgment to SI. With SI Musashi guidance, they question the answer, add context, and make the decision. Same SuperIntelligence. Different hands."
        />
      </div>
      <div className="home-actions">
        <button type="button" className="story-launch" onClick={() => onOpen('story')}>
          <span className="story-face">
            <img src={assetUrl(token.logo)} alt="" width={72} height={72} />
          </span>
          Read the full story
          <span aria-hidden="true">›</span>
        </button>
        <button type="button" className="ghost-launch" onClick={() => onOpen('details')}>
          <DocIcon /> Token information
        </button>
        <span className="v-rule" aria-hidden="true" />
        <button type="button" className="text-launch" onClick={() => onOpen('club')}>
          Community
        </button>
        <span className="action-icons">
          <ExternalControl href={token.telegramUrl} className="icon-chip">
            <TelegramIcon />
            <span className="sr-only">Telegram</span>
          </ExternalControl>
          <ExternalControl href={token.xUrl} className="icon-chip">
            <XIcon />
            <span className="sr-only">X</span>
          </ExternalControl>
          <ExternalControl href={token.chartUrl} className="action-chart">
            <ChartIcon /> Chart
          </ExternalControl>
        </span>
      </div>
      <footer className="home-foot">
        <div className="home-foot-links">
          <p>
            <EthIcon /> {ticker} · {token.chainName}
          </p>
          <span className="v-rule" aria-hidden="true" />
          <p className="contract-line">
            <span className="contract-label">Contract:</span>
            <span className="contract-slot">
              <FittedText text={contractText} />
            </span>
          </p>
          <CopyButton canCopy={Boolean(address)} state={copyState} onCopy={onCopy} className="foot-copy">
            <span className="sr-only">Copy contract address</span>
          </CopyButton>
          <span className="v-rule" aria-hidden="true" />
          <ExternalControl href={token.chartUrl} className="meta-link">
            <ChartIcon /> Chart
          </ExternalControl>
          <span className="v-rule" aria-hidden="true" />
          <ExternalControl href={token.telegramUrl} className="meta-link">
            <TelegramIcon /> Telegram
          </ExternalControl>
          <span className="v-rule" aria-hidden="true" />
          <ExternalControl href={token.xUrl} className="meta-link">
            <XIcon /> X
          </ExternalControl>
        </div>
        <p className="home-note">Comparison from the fictional story.</p>
      </footer>
    </div>
  );
}
