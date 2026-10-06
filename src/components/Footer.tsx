import { token } from '../config/token.ts';

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-14 md:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="font-display text-2xl">Super Intelligence Intern</p>
        <p className="gold-text font-display mt-2 text-3xl">{token.symbol}</p>
      </div>
    </footer>
  );
}
