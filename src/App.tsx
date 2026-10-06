import { useEffect } from 'react';
import type { CSSProperties } from 'react';
import { token as defaultToken } from './config/token.ts';
import { memeStatValue } from './config/validateToken.ts';
import { EvolutionHero } from './components/EvolutionHero.tsx';
import { Header, SocialLinks } from './components/Header.tsx';
import { HowToBuy } from './components/HowToBuy.tsx';
import { TokenActions } from './components/TokenActions.tsx';
import { displayTicker } from './lib/launch.ts';
import type { TokenConfig } from './types/token.ts';

function themeStyle(config: TokenConfig): CSSProperties {
  return {
    '--bg': config.theme.background,
    '--accent': config.theme.accent,
    '--secondary': config.theme.secondary,
    '--text': config.theme.text,
    '--muted': config.theme.muted,
  } as CSSProperties;
}

export default function App({ config = defaultToken }: { config?: TokenConfig }) {
  useEffect(() => {
    document.title = config.pageTitle;
  }, [config.pageTitle]);

  return (
    <div className="page" style={themeStyle(config)}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header token={config} />
      <main id="main">
        <EvolutionHero token={config} />
        <section className="intro" aria-labelledby="token-name">
          <h1 id="token-name">{config.name}</h1>
          <p className="ticker">{displayTicker(config.ticker)}</p>
          <p className="tagline">{config.tagline}</p>
          <p className="description">{config.description}</p>
        </section>
        <TokenActions token={config} />
        <section className="stats" aria-labelledby="stats-heading">
          <h2 id="stats-heading">{config.strings.statsHeading}</h2>
          <dl className="stat-row">
            {config.memeStats.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{memeStatValue(stat, config.evolution.length)}</dd>
              </div>
            ))}
          </dl>
          <p className="stats-note">{config.strings.statsNote}</p>
        </section>
        <HowToBuy token={config} />
      </main>
      <footer className="footer">
        <SocialLinks token={config} className="social social-footer" label="Footer social" />
        <p>{config.footerNote}</p>
      </footer>
    </div>
  );
}
