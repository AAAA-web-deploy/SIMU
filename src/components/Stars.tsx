const STARS = Array.from({ length: 18 }, (_, index) => ({
  left: `${(index * 47) % 100}%`,
  top: `${(index * 29 + 6) % 100}%`,
  delay: `${(index % 7) * 0.45}s`,
  duration: `${12 + (index % 5) * 2}s`,
  size: index % 5 === 0 ? '3px' : '2px',
}));

export function Stars() {
  return (
    <div className="stars" aria-hidden="true">
      {STARS.map((star) => (
        <span
          key={`${star.left}-${star.top}`}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            ['--delay' as string]: star.delay,
            ['--duration' as string]: star.duration,
          }}
        />
      ))}
    </div>
  );
}
