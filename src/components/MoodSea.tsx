import { art } from '../assets';
import { REACTIONS } from '../config/sprites';
import { Dialog } from './Dialog';
import styles from './MoodSea.module.css';

type Props = {
  activeId: string | null;
  onOpen: (id: string) => void;
  onClose: () => void;
  onMake: (id: string) => void;
};

export function MoodSea({ activeId, onOpen, onClose, onMake }: Props) {
  const active = REACTIONS.find((sprite) => sprite.id === activeId) ?? null;

  return (
    <section id="feelings" className={styles.sea} aria-labelledby="feelings-title">
      <img className={styles.depth} src={art.oceanDepth} alt="" />
      <div className={styles.caustics} aria-hidden="true" />
      <header className={styles.head}>
        <h2 id="feelings-title">HOW MICRO ARE YOUR FEELINGS TODAY?</h2>
        <p>Tap a bubble. Each one is a real MIWO face.</p>
      </header>
      <div className={styles.field}>
        {REACTIONS.map((sprite, index) => (
          <div
            key={sprite.id}
            className={styles.slot}
            style={{ ['--x' as string]: sprite.x, ['--y' as string]: sprite.y, animationDelay: `${index * 0.35}s` }}
          >
            <button type="button" className={styles.bubble} onClick={() => onOpen(sprite.id)}>
              <span className={styles.orb}>
                <img src={sprite.src} alt="" width={800} height={800} loading="lazy" />
              </span>
              <span className={styles.name}>{sprite.label}</span>
            </button>
          </div>
        ))}
      </div>
      {active && (
        <Dialog labelledBy="mood-title" onClose={onClose} panelClassName={styles.moodPanel}>
          <div className={styles.mood}>
            <img src={active.src} alt={active.alt} width={800} height={800} />
            <div>
              <h3 id="mood-title">{active.label}</h3>
              <p className={styles.joke}>{active.line}</p>
              <div className={styles.row}>
                <button type="button" className={styles.make} onClick={() => onMake(active.id)}>
                  Make this meme
                </button>
                <button type="button" className={styles.close} onClick={onClose}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </section>
  );
}
