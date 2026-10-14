import { useState } from 'react';
import { SPRITES, spriteById } from '../config/sprites';
import { renderMemePng, sanitizeCaption } from '../lib/memeCanvas';
import styles from './MemeWorkshop.module.css';

type Props = {
  spriteId: string;
  onSprite: (id: string) => void;
};

export function MemeWorkshop({ spriteId, onSprite }: Props) {
  const [raw, setRaw] = useState('');
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const sprite = spriteById(spriteId);
  const caption = sanitizeCaption(raw);

  const copyCaption = async () => {
    if (!caption) {
      setStatus('Write a short caption first.');
      return;
    }
    try {
      await navigator.clipboard.writeText(caption);
      setStatus('Caption copied.');
    } catch {
      setStatus('Could not copy. Select the caption and copy it manually.');
    }
  };

  const download = async () => {
    if (!caption) {
      setStatus('Write a short caption first.');
      return;
    }
    setBusy(true);
    setStatus('Drawing your meme...');
    try {
      const blob = await renderMemePng(sprite.src, caption);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'micro-panic-miwo.png';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1500);
      setStatus('Meme saved to your device. Nothing was uploaded.');
    } catch {
      setStatus('Could not create the PNG. Try another sprite.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <section id="workshop" className={styles.dock} aria-labelledby="workshop-title">
      <div className={styles.plank}>
        <header>
          <h2 id="workshop-title">MAKE YOUR MIWO MOMENT</h2>
          <p>Pick a face, write a line, save a square PNG. It stays on your device.</p>
        </header>
        <div className={styles.layout}>
          <div className={styles.controls}>
            <fieldset>
              <legend>Sprite</legend>
              <div className={styles.picker}>
                {SPRITES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={item.id === spriteId ? styles.picked : ''}
                    aria-pressed={item.id === spriteId}
                    onClick={() => onSprite(item.id)}
                  >
                    <img src={item.src} alt={item.alt} width={200} height={200} loading="lazy" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </fieldset>
            <label htmlFor="caption">Caption</label>
            <textarea
              id="caption"
              maxLength={80}
              value={raw}
              autoComplete="off"
              placeholder="Whale dreams. Micro wallet."
              onChange={(event) => {
                setRaw(event.target.value);
                setStatus('');
              }}
            />
            <p className={styles.count}>{raw.length}/80</p>
            <div className={styles.actions}>
              <button type="button" className={styles.download} onClick={() => void download()} disabled={busy}>
                DOWNLOAD MEME
              </button>
              <button type="button" className={styles.copy} onClick={() => void copyCaption()}>
                Copy caption
              </button>
            </div>
            <p className={styles.status} role="status">{status}</p>
          </div>
          <figure className={styles.frame} aria-label="Meme preview">
            <div className={styles.paper}>
              <img src={sprite.src} alt="" />
              <figcaption>{caption || 'Your caption lands here.'}</figcaption>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
