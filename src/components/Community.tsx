import { siteConfig } from '../data/siteConfig.ts';
import { asset } from '../lib/assets.ts';
import { ActionLink } from './ActionLink.tsx';
import { Reveal } from './Reveal.tsx';

export function Community() {
  return (
    <section className="section community" id="community" aria-labelledby="community-title">
      <div className="container community-grid">
        <Reveal>
          <div className="community-copy">
            <h2 id="community-title">SI ISN&apos;T COMING ALONE.</h2>
            <p>
              Every great internet movement begins with people repeating one idea until the entire
              timeline recognizes it.
            </p>
            <p>Our idea is very simple.</p>
            <p className="community-line">SI IS HERE.</p>
            <p>Make memes. Create art. Share the message. Join the community.</p>
            <p>The SI era belongs to everyone.</p>
            <div className="button-row">
              <ActionLink href={siteConfig.telegramUrl} className="btn btn-primary">
                JOIN TELEGRAM
              </ActionLink>
              <ActionLink href={siteConfig.xUrl} className="btn btn-secondary">
                FOLLOW ON X
              </ActionLink>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <figure className="community-figure">
            <img
              src={asset('sihere-community.png')}
              alt="The crowned SI mascot stands with a crowd of astronauts under Ethereum flags and a luminous Earth."
              width={1500}
              height={820}
              loading="lazy"
            />
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
