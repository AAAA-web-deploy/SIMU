import type { TokenConfig } from '../types/token.ts';

export function HowToBuy({ token }: { token: TokenConfig }) {
  return (
    <section className="how" aria-labelledby="howto-heading">
      <h2 id="howto-heading">{token.strings.howToBuyHeading}</h2>
      <ol className="steps">
        {token.howToBuy.map((step) => (
          <li key={step.title}>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
