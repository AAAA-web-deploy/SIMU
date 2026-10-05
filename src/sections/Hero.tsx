import { DISCLOSURE } from '../config/content.ts';
import { logoFull } from '../config/assets.ts';
import { useOnScreen } from '../lib/useOnScreen.ts';
import { buildTokenView } from '../lib/view.ts';
import { ContractPanel } from '../components/ContractPanel.tsx';
import { CtaLink } from '../components/CtaLink.tsx';
import { Picture } from '../components/Picture.tsx';

export function Hero() {
  const view = buildTokenView();
  const [artRef, artVisible] = useOnScreen<HTMLDivElement>();

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">NIGHT WATCH DOG · $NWDOG</p>
          <h1 id="hero-title">SMALL DOG. BIG NIGHT SHIFT.</h1>
          <p className="lede">
            Meet the self-appointed chief safety officer of the robotaxi future. Oversized goggles. Serious patrol
            energy. An unreasonable number of snack breaks.
          </p>
          <p className="support">An independent Ethereum meme project.</p>
          <div className="cta-row">
            <CtaLink cta={view.primaryCta} />
            <CtaLink cta={view.secondaryCta} className="button--ghost" />
          </div>
          <ContractPanel contract={view.contract} network={view.networkLabel} />
          {view.chainProblem ? <p className="support">{view.chainProblem}</p> : null}
          <p className="disclosure">{DISCLOSURE}</p>
        </div>
        <div className="hero-art" ref={artRef} data-paused={artVisible ? 'false' : 'true'}>
          <div className="sky" aria-hidden="true">
            <span className="moon" />
            <span className="star star-a" />
            <span className="star star-b" />
            <span className="star star-c" />
          </div>
          <div className="sticker">
            <figure className="comic-frame">
              <div className="frame-media">
                <Picture
                  avif={logoFull.avif}
                  webp={logoFull.webp}
                  fallback={logoFull.png}
                  alt={logoFull.alt}
                  width={logoFull.width}
                  height={logoFull.height}
                  priority
                  className="mascot-float"
                />
                <span className="glint" aria-hidden="true" />
              </div>
              <figcaption className="dispatch">Priority one: get every good boy home.</figcaption>
            </figure>
            <p className="nv-tag" aria-hidden="true">
              NV-07 · lamp row
            </p>
          </div>
          <p className="patrol-extra" aria-hidden="true">
            Snack stop scheduled. This is a comic, not a dispatch desk.
          </p>
        </div>
      </div>
      <div className="hero-road" aria-hidden="true" />
    </section>
  );
}
