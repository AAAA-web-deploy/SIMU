import { siteConfig } from '../data/siteConfig.ts';
import { asset } from '../lib/assets.ts';
import { Reveal } from './Reveal.tsx';

export function TransitionStory() {
  return (
    <section className="section story" id="story" aria-labelledby="story-title">
      <div className="container">
        <Reveal>
          <h2 id="story-title">AI WAS THE PROLOGUE. SI IS THE STORY.</h2>
          <div className="story-copy">
            <p>For years, the world talked about AI.</p>
            <ul className="chant">
              <li>AI wrote.</li>
              <li>AI generated.</li>
              <li>AI traded.</li>
              <li>AI automated.</li>
            </ul>
            <p>But intelligence does not stop evolving.</p>
            <p>
              {siteConfig.ticker} represents the next internet meme: the transition from Artificial
              Intelligence to Super Intelligence.
            </p>
            <p>AI asked for prompts. SI already knows why you&apos;re here.</p>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <figure className="story-figure">
            <img
              src={asset('sihere-ai-to-si-transition.png')}
              alt="A small AI robot points toward the crowned SI king holding a glowing SI crystal."
              width={1500}
              height={719}
              loading="lazy"
            />
          </figure>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="era-track" role="group" aria-label="Progression from AI to AGI to Super Intelligence">
            <span className="era-shine" aria-hidden="true" />
            <span>AI</span>
            <span className="era-arrow" aria-hidden="true">
              →
            </span>
            <span className="era-mid">AGI</span>
            <span className="era-arrow" aria-hidden="true">
              →
            </span>
            <span className="era-final">SI</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
