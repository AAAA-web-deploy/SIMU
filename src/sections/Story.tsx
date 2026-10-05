import { buildTokenView } from '../lib/view.ts';
import { TextLink } from '../components/TextLink.tsx';

const PANELS = [
  {
    kicker: '01',
    title: 'The city went quiet',
    copy: 'The future got self-driving cars. Lamps stayed on, traffic got strange, and the small creatures in the road still needed someone ridiculous enough to care.',
  },
  {
    kicker: '02',
    title: 'He took the shift',
    copy: 'A Shiba in a safety vest decided the job was his. Goggles down. Paw out. Chief safety officer, self-appointed, with an unreasonable number of snack breaks.',
  },
  {
    kicker: '03',
    title: 'The watch clocks in',
    copy: 'Memes, drawings, and whoever shows up. That is the patrol. Make art of him. Pass it on. Nobody has to buy anything to take part.',
  },
] as const;

export function Story() {
  const view = buildTokenView();
  return (
    <section className="section section--ink" id="story" aria-labelledby="story-title">
      <div className="wrap">
        <p className="eyebrow">Story</p>
        <h2 id="story-title">THE NIGHT SHIFT FOUND ITS DOG.</h2>
        <p className="pull">Every good boy deserves a safe ride.</p>
        <div className="comic-row">
          {PANELS.map((panel) => (
            <article key={panel.kicker} className={`comic-card comic-card--${panel.kicker}`}>
              <p className="kicker">{panel.kicker}</p>
              <h3>{panel.title}</h3>
              <p>{panel.copy}</p>
            </article>
          ))}
        </div>
        <details className="source-note">
          <summary>What inspired the character?</summary>
          <div>
            <p>
              On {view.source?.dateLabel ?? 'October 3, 2026'},{' '}
              {view.source?.publisher ?? 'a news report'} wrote about Elon Musk discussing Tesla trying to stop
              robotaxis from hitting cats at night. Night Watch Dog is a fictional character playing with that
              headline. He is not Musk&apos;s dog, and he is not a Tesla product.
            </p>
            <p>This project does not operate robotaxis or provide road-safety technology.</p>
            {view.source ? (
              <p>
                <TextLink href={view.source.href} external>
                  {view.source.dateLabel} {view.source.publisher} article
                </TextLink>
              </p>
            ) : (
              <p>A source link is not published.</p>
            )}
          </div>
        </details>
      </div>
    </section>
  );
}
