import { assetUrl } from '../utils/assetUrl.ts';
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

  return (
    <div className="home-frame">
      <h1 className="sr-only">
        {token.name} {token.ticker.startsWith('$') ? token.ticker : `$${token.ticker}`}
      </h1>
      <img
        className="home-art"
        src={assetUrl(token.assets.home)}
        width={1536}
        height={1024}
        alt="SI Musashi. Same SuperIntelligence. Different hands. The edge is how you use it. Without guidance the crowd copies the signal. With guidance they question the answer, add context, and make the decision. Comparison from the fictional story."
      />
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
      <div className="home-actions">
        <button type="button" className="story-launch" onClick={() => onOpen('story')}>
          <img src={assetUrl(token.assets.portrait)} alt="" width={72} height={72} />
          Read the full story
          <span aria-hidden="true">›</span>
        </button>
        <span className="v-rule" aria-hidden="true" />
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
          <ExternalControl href={token.chartUrl} className="icon-chip">
            <ChartIcon />
            <span className="sr-only">Chart</span>
          </ExternalControl>
        </span>
      </div>
      <div className="home-meta">
        <p className="contract-line">
          <span className="contract-label">Contract:</span>
          <span className="contract-slot">
            <FittedText text={contractText} />
          </span>
        </p>
        <CopyButton canCopy={Boolean(address)} state={copyState} onCopy={onCopy} className="icon-chip">
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
    </div>
  );
}
