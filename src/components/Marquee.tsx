const items = [
  'Super Intelligence',
  '$SIINTERN',
  'AI',
  'Robots',
  'Rockets',
  'Robotaxis',
  'Ethereum',
  'Memes',
  'Coffee',
  'Bad decisions',
];

export function Marquee() {
  const line = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-gold/30 bg-secondary py-3" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <p key={copy} className="flex shrink-0 items-center gap-4 px-3 font-grotesk text-sm font-bold tracking-[0.22em] text-gold uppercase">
            {line.map((item, index) => (
              <span key={`${copy}-${item}-${index}`} className="flex items-center gap-4">
                {item}
                <span className="text-blue-bright">•</span>
              </span>
            ))}
          </p>
        ))}
      </div>
    </div>
  );
}
