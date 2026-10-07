import { assetUrl } from '../utils/assetUrl.ts';

const sideArt = [
  '/assets/simu/side/01-ask-why.png',
  '/assets/simu/side/02-add-context.png',
  '/assets/simu/side/03-know-when-to-wait.png',
  '/assets/simu/side/04-block-the-noise.png',
  '/assets/simu/side/05-check-twice.png',
  '/assets/simu/side/06-change-your-angle.png',
  '/assets/simu/side/07-learn-from-misses.png',
  '/assets/simu/side/08-your-call.png',
] as const;

function Rail({ direction }: { direction: 'up' | 'down' }) {
  const tiles = [...sideArt, ...sideArt];
  return (
    <div className={`side-rail side-rail-${direction}`} aria-hidden="true">
      <div className="side-track">
        {tiles.map((src, index) => (
          <span className="side-tile" key={`${src}-${index}`}>
            <img src={assetUrl(src)} alt="" width={1254} height={1254} />
          </span>
        ))}
      </div>
    </div>
  );
}

export function SideRails() {
  return (
    <>
      <Rail direction="up" />
      <Rail direction="down" />
    </>
  );
}
