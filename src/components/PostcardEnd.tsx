import { useState } from 'react';
import { art } from '../assets';
import styles from './PostcardEnd.module.css';

type Props = {
  onReplay: () => void;
  note: string;
};

export function PostcardEnd({ onReplay, note }: Props) {
  const [heard, setHeard] = useState(false);
  const [panic, setPanic] = useState(false);

  return (
    <footer id="dream" className={styles.end}>
      <div className={styles.wood}>
        <img
          className={styles.card}
          src={art.someday}
          alt="Small postcard: MIWO in a whale costume riding a whale, lettered Someday I'll be a whale"
          width={325}
          height={506}
          loading="lazy"
        />
      </div>
      <button type="button" className={styles.dream} onClick={() => setHeard(true)}>
        Still a micro bag. Still dreaming big.
      </button>
      {heard && <p role="status">Someday.</p>}
      <div className={styles.tools}>
        <button type="button" onClick={onReplay}>Replay intro</button>
        <button
          type="button"
          onClick={() => setPanic(true)}
        >
          Department of Unnecessary Panic
        </button>
      </div>
      {panic && (
        <p className={styles.panic} role="status">
          Panic filed. No action required. Bag remains micro.
        </p>
      )}
      {note && <p role="status">{note}</p>}
      <p className={styles.fine}>
        MICRO PANIC is a meme. Nothing here is financial advice, a price, or a promise.
        Contract, chart, and social links stay quiet until they are real.
      </p>
      <img className={styles.logo} src={art.logo} alt="" width={72} height={72} loading="lazy" />
    </footer>
  );
}
