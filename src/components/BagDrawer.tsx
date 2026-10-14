import { useState } from 'react';
import { MIWO_SITE, isUsableUrl, isValidEthAddress, networkLabel } from '../config/site';
import { Dialog } from './Dialog';
import styles from './BagDrawer.module.css';

type Props = { onClose: () => void };

export function BagDrawer({ onClose }: Props) {
  const address = MIWO_SITE.contractAddress;
  const valid = isValidEthAddress(address);
  const chart = isUsableUrl(MIWO_SITE.chartUrl) ? MIWO_SITE.chartUrl : '';
  const trade = isUsableUrl(MIWO_SITE.tradeUrl) ? MIWO_SITE.tradeUrl : '';
  const [copied, setCopied] = useState('');
  const [showChart, setShowChart] = useState(false);

  const copy = async () => {
    if (!valid) return;
    try {
      await navigator.clipboard.writeText(address);
      setCopied('Copied.');
    } catch {
      setCopied('Could not copy. Select the address and copy it manually.');
    }
  };

  return (
    <Dialog labelledBy="bag-title" onClose={onClose}>
      <div className={styles.sheet}>
      <p className={styles.kicker}>THE BAG</p>
      <h2 id="bag-title">{MIWO_SITE.tokenName}</h2>
      <p className={styles.ticker}>${MIWO_SITE.ticker}</p>
      <p className={styles.slogan}>{MIWO_SITE.slogan}</p>
      <dl>
        <div>
          <dt>Network</dt>
          <dd>
            {networkLabel(MIWO_SITE.chainId)}
            <small>Configured as the intended network. Not a deployment receipt.</small>
          </dd>
        </div>
        <div>
          <dt>Contract</dt>
          <dd>
            {valid ? <code>{address}</code> : 'Contract address coming soon'}
            <button type="button" onClick={() => void copy()} disabled={!valid}>
              COPY CA
            </button>
            <span role="status">{copied}</span>
          </dd>
        </div>
        <div>
          <dt>Chart</dt>
          <dd>
            {chart ? (
              showChart ? (
                <iframe
                  src={chart}
                  title="Chart from the configured provider"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <button type="button" onClick={() => setShowChart(true)}>
                  Show chart
                </button>
              )
            ) : (
              'Chart link coming soon'
            )}
          </dd>
        </div>
        <div>
          <dt>Trade</dt>
          <dd>
            {trade ? (
              <a href={trade} target="_blank" rel="noreferrer noopener">
                Open trade link
              </a>
            ) : (
              'Trade link coming soon'
            )}
          </dd>
        </div>
      </dl>
      <p className={styles.fine}>
        Supply, taxes, liquidity, and ownership are not shown because they have not been provided.
      </p>
      <button type="button" className={styles.close} onClick={onClose}>
        Close the bag
      </button>
      </div>
    </Dialog>
  );
}
