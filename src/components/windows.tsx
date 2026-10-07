import { useCallback, useLayoutEffect, useRef, useState, type RefObject } from 'react';
import { assetUrl } from '../utils/assetUrl.ts';
import { displayTicker } from '../lib/launch.ts';
import type { MarketLink, TokenConfig } from '../types/token.ts';
import {
  BookIcon,
  ChartIcon,
  CloseIcon,
  CopyButton,
  ExternalControl,
  FittedText,
  HomeIcon,
  PeopleIcon,
  SwapIcon,
  TelegramIcon,
  XIcon,
} from './controls.tsx';

export type PanelId = 'story' | 'details' | 'club';
export type CopyState = 'idle' | 'copied' | 'failed';

type WindowProps = {
  token: TokenConfig;
  panel: PanelId;
  address: string | null;
  copyState: CopyState;
  onCopy: () => void;
  onOpen: (panel: PanelId) => void;
  onClose: () => void;
};

const PANEL_LABEL: Record<PanelId, string> = {
  story: 'Full story',
  details: 'Token details',
  club: 'Musashi Club',
};

export function ContentWindow(props: WindowProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const body = bodyRef.current;
    if (body) {
      body.scrollTop = 0;
      body.scrollLeft = 0;
    }
    closeRef.current?.focus();
  }, [props.panel]);

  return (
    <div
      className={`window window-${props.panel}`}
      role="dialog"
      aria-modal="true"
      aria-label={PANEL_LABEL[props.panel]}
      data-panel={props.panel}
    >
      {props.panel === 'story' ? (
        <StoryPanel {...props} bodyRef={bodyRef} closeRef={closeRef} />
      ) : null}
      {props.panel === 'details' ? (
        <DetailsPanel {...props} bodyRef={bodyRef} closeRef={closeRef} />
      ) : null}
      {props.panel === 'club' ? <ClubPanel {...props} bodyRef={bodyRef} closeRef={closeRef} /> : null}
    </div>
  );
}

function CloseButton({
  onClose,
  buttonRef,
}: {
  onClose: () => void;
  buttonRef: RefObject<HTMLButtonElement | null>;
}) {
  return (
    <button ref={buttonRef} type="button" className="close-button" onClick={onClose}>
      <CloseIcon /> Close
    </button>
  );
}

function LaunchLinks({
  token,
  address,
  copyState,
  onCopy,
  onClose,
}: WindowProps) {
  return (
    <>
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
      <button type="button" className="text-button" onClick={onClose}>
        <HomeIcon /> Back to homepage
      </button>
    </>
  );
}

function StoryPanel({
  token,
  onClose,
  bodyRef,
  closeRef,
}: WindowProps & {
  bodyRef: RefObject<HTMLDivElement | null>;
  closeRef: RefObject<HTMLButtonElement | null>;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [mode, setMode] = useState<'read' | 'fit'>('read');
  const [zoom, setZoom] = useState(1);

  const layout = useCallback(() => {
    const frame = bodyRef.current;
    const img = imgRef.current;
    if (!frame || !img || !img.naturalWidth || frame.clientWidth < 20) return;
    const desktop = window.matchMedia('(min-width: 900px)').matches;
    const ratio = img.naturalWidth / img.naturalHeight;
    const portrait = img.naturalHeight >= img.naturalWidth;
    const fitWidth = Math.max(frame.clientWidth, 1);
    const fitHeight = fitWidth / ratio;
    let width = fitWidth;
    let height = fitHeight;
    if (mode === 'read' && !portrait && desktop) {
      height = Math.max(frame.clientHeight, 1) * 3;
      width = height * ratio;
    } else if (mode === 'read' && !portrait) {
      width = Math.max(fitWidth * 2.4, 880);
      height = width / ratio;
    }
    width *= zoom;
    height *= zoom;
    img.style.width = `${width}px`;
    img.style.height = `${height}px`;
  }, [bodyRef, mode, zoom]);

  useLayoutEffect(() => {
    layout();
    const frame = bodyRef.current;
    if (!frame || typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(() => layout());
    observer.observe(frame);
    return () => observer.disconnect();
  }, [bodyRef, layout]);

  return (
    <>
      <div className="window-toolbar toolbar-story">
        <div className="zoom-controls" aria-label="Story zoom">
          <button type="button" onClick={() => setZoom((value) => Math.max(0.4, value / 1.25))}>
            Zoom out
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('fit');
              setZoom(1);
            }}
          >
            Fit width
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('read');
              setZoom((value) => Math.min(3, value * 1.25));
            }}
          >
            Zoom in
          </button>
        </div>
        <CloseButton onClose={onClose} buttonRef={closeRef} />
      </div>
      <div className="window-body story-body" ref={bodyRef}>
        <img
          ref={imgRef}
          className="story-image"
          src={assetUrl(token.assets.story)}
          width={1024}
          height={1536}
          alt="SI Musashi story. A trader buys a SuperIntelligence tool, then the same signal becomes a crowded entry. Everyone has SI. Skill makes the difference. He asks why, adds his own context, and decides. Same SI. Different hands."
          draggable={false}
          onLoad={layout}
        />
      </div>
    </>
  );
}

function DetailsPanel({
  token,
  address,
  copyState,
  onCopy,
  onOpen,
  onClose,
  bodyRef,
  closeRef,
}: WindowProps & {
  bodyRef: RefObject<HTMLDivElement | null>;
  closeRef: RefObject<HTMLButtonElement | null>;
}) {
  const contractText = address ?? token.strings.contractPending;
  const stepClass = ['step-orange', 'step-purple', 'step-blue'];

  return (
    <>
      <div className="window-toolbar toolbar-details">
        <div className="toolbar-brand">
          <img src={assetUrl(token.assets.portrait)} alt="" width={36} height={36} />
          <span>
            {token.name} · {displayTicker(token.ticker)}
          </span>
        </div>
        <div className="toolbar-actions">
          <LaunchLinks
            token={token}
            address={address}
            copyState={copyState}
            onCopy={onCopy}
            onClose={onClose}
            onOpen={onOpen}
            panel="details"
          />
          <CloseButton onClose={onClose} buttonRef={closeRef} />
        </div>
      </div>
      <div className="window-body" ref={bodyRef}>
        <div
          className="token-sheet"
          style={{ backgroundImage: `url("${assetUrl(token.assets.tokenBackground)}")` }}
        >
          <div className="token-title-space">
            <p className="sr-only">$SIMU details. Token information and how to buy.</p>
          </div>
          <div className="token-top">
            <img
              className="portrait"
              src={assetUrl(token.assets.portrait)}
              width={1254}
              height={1254}
              alt="SI Musashi with two blades and an Ethereum diamond."
            />
            <div className="identity">
              <h2>{token.name}</h2>
              <p className="identity-ticker">{displayTicker(token.ticker)}</p>
              <h3>Contract address</h3>
              <div className="address-row">
                <div className="address-field" id="contract-address">
                  <FittedText text={contractText} />
                </div>
                <CopyButton
                  canCopy={Boolean(address)}
                  state={copyState}
                  onCopy={onCopy}
                  className="copy-mark"
                >
                  <span className="sr-only">Copy</span>
                </CopyButton>
              </div>
              <h3 className="market-heading">Market links</h3>
              <div className="market-row">
                {token.markets.map((market) => (
                  <MarketCard key={market.name} market={market} />
                ))}
              </div>
            </div>
            <div className="stat-grid">
              <StatCard src="/assets/simu/stats/lp-burn.png" label={token.lpBurn.label} />
              <StatCard src="/assets/simu/stats/ownership.png" label={token.ownership.label} />
              <StatCard src="/assets/simu/stats/total-supply.png" label="TOTAL SUPPLY" />
              <StatCard src="/assets/simu/stats/contract-verified.png" label="CONTRACT VERIFIED" />
              <article className="tax tax-buy">
                <p className="tax-kicker">
                  <img className="stat-mark" src={assetUrl('/assets/simu/stats/tax-buy.png')} alt="" width={64} height={64} />
                  {token.buyTax.label}
                </p>
                <p className="tax-value">{token.buyTax.value}</p>
              </article>
              <article className="tax tax-sell">
                <p className="tax-kicker">
                  <img className="stat-mark" src={assetUrl('/assets/simu/stats/tax-sell.png')} alt="" width={64} height={64} />
                  {token.sellTax.label}
                </p>
                <p className="tax-value">{token.sellTax.value}</p>
              </article>
            </div>
          </div>
          <section className="how-to-buy" aria-labelledby="how-to-buy-heading">
            <h2 id="how-to-buy-heading">How to buy</h2>
            <div className="buy-row">
              {token.howToBuy.map((step, index) => (
                <article key={step.body} className={`buy-step ${stepClass[index] ?? ''}`}>
                  <span>{step.title}</span>
                  <p>{step.body}</p>
                </article>
              ))}
              <ExternalControl href={token.buyUrl} className="swap-step">
                <SwapIcon />
                <span>
                  Swap on DEX
                  {livePending(token.buyUrl) ? ' (Pending)' : ''}
                </span>
              </ExternalControl>
            </div>
          </section>
          <div className="sheet-actions">
            <button type="button" className="sheet-story" onClick={() => onOpen('story')}>
              <BookIcon /> Read the full story <span aria-hidden="true">→</span>
            </button>
            <button type="button" className="sheet-club" onClick={() => onOpen('club')}>
              <PeopleIcon /> Visit Musashi Club <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function livePending(url: string | null): boolean {
  return !url || !/^https:\/\//i.test(url);
}

const marketMarks: Record<string, string> = {
  DEXScreener: '/assets/simu/markets/dexscreener.png',
  DEXTools: '/assets/simu/markets/dextools.png',
  Etherscan: '/assets/simu/markets/etherscan.png',
};

function MarketCard({ market }: { market: MarketLink }) {
  const mark = marketMarks[market.name];
  return (
    <ExternalControl href={market.url} className="market-card">
      {mark ? <img className="market-mark" src={assetUrl(mark)} alt="" width={64} height={64} /> : null}
      <span>{market.name}</span>
    </ExternalControl>
  );
}

function StatCard({ src, label }: { src: string; label: string }) {
  return (
    <article className="proof">
      <h3>
        <img className="stat-mark" src={assetUrl(src)} alt="" width={64} height={64} />
        {label}
      </h3>
    </article>
  );
}

function ClubPanel({
  token,
  address,
  copyState,
  onCopy,
  onOpen,
  onClose,
  bodyRef,
  closeRef,
}: WindowProps & {
  bodyRef: RefObject<HTMLDivElement | null>;
  closeRef: RefObject<HTMLButtonElement | null>;
}) {
  return (
    <>
      <div className="window-toolbar toolbar-club">
        <button type="button" className="text-button" onClick={onClose}>
          {displayTicker(token.ticker)}
        </button>
        <LaunchLinks
          token={token}
          address={address}
          copyState={copyState}
          onCopy={onCopy}
          onClose={onClose}
          onOpen={onOpen}
          panel="club"
        />
        <CloseButton onClose={onClose} buttonRef={closeRef} />
      </div>
      <div className="window-body" ref={bodyRef}>
        <div className="club-art">
          <img
            src={assetUrl(token.assets.club)}
            width={1672}
            height={941}
            alt="Musashi Club. Same SuperIntelligence. Everyone swings differently. Orange asks what SI might be missing. Blue gives it limits first. Green is waiting on yesterday's best move. Violet says that deserves a meme. What's your style?"
          />
          <div className="club-actions">
            <div className="club-socials">
              <ExternalControl href={token.telegramUrl} className="club-telegram">
                <TelegramIcon />
                <span>
                  <strong>Telegram</strong>
                  Join the conversation
                </span>
                <span aria-hidden="true">→</span>
              </ExternalControl>
              <ExternalControl href={token.xUrl} className="club-x">
                <XIcon />
                <span>
                  <strong>X</strong>
                  Follow the updates
                </span>
                <span aria-hidden="true">→</span>
              </ExternalControl>
            </div>
            <div className="club-jumps">
              <button type="button" onClick={() => onOpen('details')}>
                {displayTicker(token.ticker)} Details
              </button>
              <button type="button" onClick={() => onOpen('story')}>
                Read the full story. <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
