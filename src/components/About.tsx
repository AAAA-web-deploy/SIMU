import { siteConfig } from '../data/siteConfig.ts';
import { asset } from '../lib/assets.ts';
import { Reveal } from './Reveal.tsx';

export function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container about-grid">
        <Reveal className="about-visual">
          <img
            src={asset('sihere-about-story.png')}
            alt="The crowned SI mascot looks toward a futuristic crystal city beneath a giant Ethereum diamond."
            width={1500}
            height={793}
            loading="lazy"
          />
        </Reveal>
        <Reveal delay={0.08}>
          <div className="about-copy">
            <h2 id="about-title">THE ARRIVAL OF SUPER INTELLIGENCE</h2>
            <p>SI is Here is an Ethereum meme token built around one simple idea:</p>
            <p className="about-emphasis">AI is no longer the final boss.</p>
            <p>
              Technology keeps evolving, models keep improving, autonomous systems keep getting smarter,
              and the internet keeps searching for the next great narrative.
            </p>
            <p>{siteConfig.ticker} turns that transition into a community-driven meme.</p>
            <p>No complicated lore required. No 100-page manifesto.</p>
            <p>Just one message:</p>
            <blockquote>
              <p>AI had its era.</p>
              <p>SI is here.</p>
            </blockquote>
            <p className="ticker-glow">{siteConfig.ticker}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
