import { Stars } from './Stars.tsx';

export function MemeStatement() {
  return (
    <section className="meme-statement" aria-labelledby="meme-title">
      <Stars />
      <p className="meme-watermark" aria-hidden="true">
        SI
      </p>
      <div className="container meme-copy">
        <p className="meme-ai">AI: “I CAN ANSWER YOUR QUESTION.”</p>
        <p className="meme-down" aria-hidden="true">
          ↓
        </p>
        <p className="meme-si">SI: “I ALREADY KNEW YOU&apos;D ASK.”</p>
        <h2 id="meme-title">SI IS HERE.</h2>
      </div>
    </section>
  );
}
