import { Gem, Globe, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Reveal } from './Reveal.tsx';

const cards: { title: string; copy: string[]; icon: LucideIcon; index: string }[] = [
  {
    index: '01',
    title: 'AI → SI',
    icon: Sparkles,
    copy: [
      'Artificial Intelligence became one of the biggest cultural narratives on the planet.',
      'The next question is obvious:',
      'What comes after AI?',
    ],
  },
  {
    index: '02',
    title: 'ETHEREUM',
    icon: Gem,
    copy: [
      'Ethereum gave the internet programmable ownership, tokens, smart contracts and onchain communities.',
      'SIHERE brings the Super Intelligence meme onchain.',
    ],
  },
  {
    index: '03',
    title: 'INTERNET CULTURE',
    icon: Globe,
    copy: [
      'Technology becomes culture. Culture becomes memes. Memes become communities.',
      'SIHERE belongs to the internet.',
    ],
  },
];

export function WhyNow() {
  return (
    <section className="section why" aria-labelledby="why-title">
      <div className="container">
        <Reveal>
          <h2 id="why-title">EVERY ERA GETS A MEME.</h2>
        </Reveal>
        <div className="why-grid">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title} delay={index * 0.08}>
                <article className="glass-card">
                  <span className="card-index" aria-hidden="true">
                    {card.index}
                  </span>
                  <Icon aria-hidden="true" />
                  <h3>{card.title}</h3>
                  {card.copy.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
