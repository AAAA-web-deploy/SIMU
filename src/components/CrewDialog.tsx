import { MIWO_SITE, isUsableUrl } from '../config/site';
import { Dialog } from './Dialog';
import styles from './CrewDialog.module.css';

type Props = { onClose: () => void };

export function CrewDialog({ onClose }: Props) {
  return (
    <Dialog labelledBy="crew-title" onClose={onClose}>
      <div className={styles.crew}>
        <h2 id="crew-title">JOIN THE POD</h2>
        <p>The pod gathers when the links are real.</p>
        <LinkOrQuiet label="Telegram" url={MIWO_SITE.telegramUrl} />
        <LinkOrQuiet label="X" url={MIWO_SITE.xUrl} />
        <button type="button" className={styles.close} onClick={onClose}>
          Close
        </button>
      </div>
    </Dialog>
  );
}

function LinkOrQuiet({ label, url }: { label: string; url: string }) {
  if (isUsableUrl(url)) {
    return (
      <a className={styles.link} href={url} target="_blank" rel="noreferrer noopener">
        {label}
        <span className="vh"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <button type="button" className={styles.quiet} disabled>
      {label}
      <span>Not launched</span>
    </button>
  );
}
