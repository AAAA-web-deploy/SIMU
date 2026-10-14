import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { token as defaultToken } from './config/token.ts';
import { copyExactText } from './lib/clipboard.ts';
import { isEthereumAddress } from './lib/launch.ts';
import type { TokenConfig } from './types/token.ts';
import { HomePage } from './components/HomePage.tsx';
import { SideRails } from './components/SideRails.tsx';
import { ContentWindow, type CopyState, type PanelId } from './components/windows.tsx';

function themeStyle(config: TokenConfig): CSSProperties {
  return {
    '--bg': config.theme.background,
    '--accent': config.theme.accent,
    '--secondary': config.theme.secondary,
    '--text': config.theme.text,
    '--muted': config.theme.muted,
  } as CSSProperties;
}

type CopyText = (value: string) => Promise<boolean>;

export default function App({
  config = defaultToken,
  copyText = copyExactText,
}: {
  config?: TokenConfig;
  copyText?: CopyText;
}) {
  const [panel, setPanel] = useState<PanelId | null>(null);
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const address = isEthereumAddress(config.contractAddress?.trim() ?? '')
    ? config.contractAddress!.trim()
    : null;
  const contractText = address ?? config.strings.contractPending;

  useEffect(() => {
    document.title = config.pageTitle;
  }, [config.pageTitle]);

  useEffect(() => {
    if (copyState !== 'copied') return undefined;
    const timer = window.setTimeout(() => setCopyState('idle'), 1600);
    return () => window.clearTimeout(timer);
  }, [copyState]);

  const locked = panel !== null;

  useEffect(() => {
    if (!locked) return undefined;
    const y = window.scrollY;
    const { style } = document.body;
    const previous = {
      position: style.position,
      top: style.top,
      left: style.left,
      right: style.right,
      width: style.width,
    };
    style.position = 'fixed';
    style.top = `-${y}px`;
    style.left = '0';
    style.right = '0';
    style.width = '100%';
    document.documentElement.classList.add('overlay-open');
    return () => {
      style.position = previous.position;
      style.top = previous.top;
      style.left = previous.left;
      style.right = previous.right;
      style.width = previous.width;
      document.documentElement.classList.remove('overlay-open');
      window.scrollTo(0, y);
    };
  }, [locked]);

  useEffect(() => {
    if (!locked) return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPanel(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [locked]);

  async function onCopy() {
    const ok = await copyText(contractText);
    setCopyState(ok ? 'copied' : 'failed');
  }

  function openPanel(next: PanelId) {
    setPanel(next);
  }

  return (
    <div className="site" style={themeStyle(config)}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SideRails />
      <main id="main" inert={locked ? true : undefined}>
        <HomePage
          token={config}
          address={contractText}
          copyState={copyState}
          onCopy={() => void onCopy()}
          onOpen={openPanel}
        />
      </main>
      <p className={copyState === 'failed' ? 'copy-error' : 'sr-only'} aria-live="polite">
        {copyState === 'copied' ? config.strings.copied : copyState === 'failed' ? config.strings.copyFailed : ''}
      </p>
      {panel ? (
        <div className="scrim">
          <ContentWindow
            key={panel}
            token={config}
            panel={panel}
            address={contractText}
            copyState={copyState}
            onCopy={() => void onCopy()}
            onOpen={openPanel}
            onClose={() => setPanel(null)}
          />
        </div>
      ) : null}
    </div>
  );
}
