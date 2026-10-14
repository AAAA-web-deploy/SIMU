import { art } from '../assets';
import styles from './FloatNav.module.css';

type Props = {
  introActive: boolean;
  onSkip: () => void;
  onCrew: () => void;
  onBag: () => void;
  onMeme: () => void;
};

export function FloatNav({ introActive, onSkip, onCrew, onBag, onMeme }: Props) {
  return (
    <div className={`${styles.bar} ${introActive ? styles.withSkip : ''}`}>
      <a className={styles.logo} href="#ocean" aria-label="MICRO PANIC, back to the surface">
        <img src={art.logo} alt="" width={369} height={377} />
      </a>
      <nav className={styles.nav} aria-label="Crew and bag">
        <button type="button" onClick={onCrew}>CREW</button>
        <button type="button" onClick={onBag}>THE BAG</button>
        <button type="button" onClick={onMeme}>MAKE MEME</button>
      </nav>
      {introActive && (
        <button type="button" className={styles.skip} onClick={onSkip}>
          SKIP INTRO
        </button>
      )}
    </div>
  );
}
