import { assetUrl } from '../utils/assetUrl.ts';

const sideArt = [
  '/assets/simu/side/01-show-me.jpg',
  '/assets/simu/side/02-zoom-out.jpg',
  '/assets/simu/side/03-no-rush.jpg',
  '/assets/simu/side/04-mute-it.jpg',
  '/assets/simu/side/05-check-twice.jpg',
  '/assets/simu/side/06-new-angle.jpg',
  '/assets/simu/side/07-my-bad.jpg',
  '/assets/simu/side/08-your-call.jpg',
  '/assets/simu/side/09-again.jpg',
  '/assets/simu/side/10-nice-move.jpg',
] as const;

function Rail({ direction }: { direction: 'up' | 'down' }) {
  const tiles = [...sideArt, ...sideArt];
  return (
    <div className={`side-rail side-rail-${direction}`} aria-hidden="true">
      <div className="side-track">
        {tiles.map((src, index) => (
          <span className="side-tile" key={`${src}-${index}`}>
            <img src={assetUrl(src)} alt="" width={1024} height={1024} />
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
