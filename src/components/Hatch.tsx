import styles from './Hatch.module.css';

type Props = { onOpen: () => void };

export function Hatch({ onOpen }: Props) {
  return (
    <section id="hatch" className={styles.hatch} aria-labelledby="hatch-title">
      <div className={styles.water}>
        <button type="button" className={styles.buoy} onClick={onOpen}>
          <span className={styles.float} aria-hidden="true">
            <span className={styles.ring} />
            <span className={styles.body} />
          </span>
          <span id="hatch-title">Open the bag</span>
        </button>
        <p>Known details only. The little hatch does not invent a contract.</p>
      </div>
    </section>
  );
}
