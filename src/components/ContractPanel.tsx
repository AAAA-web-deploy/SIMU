import { useState } from 'react';
import { copyExactText } from '../lib/clipboard.ts';
import type { ContractView } from '../lib/view.ts';
import { TextLink } from './TextLink.tsx';

export function ContractPanel({ contract, network }: { contract: ContractView; network: string }) {
  const [status, setStatus] = useState('');

  async function onCopy() {
    if (!contract.address || !contract.copyEnabled) return;
    const copied = await copyExactText(contract.address);
    setStatus(copied ? 'Copied' : 'Copy failed. Select the address and copy it manually.');
  }

  return (
    <div className="contract-panel">
      <p className="contract-kicker">Contract</p>
      <dl className="contract-dl">
        <div>
          <dt>Network</dt>
          <dd>{network}</dd>
        </div>
        <div>
          <dt>Address</dt>
          <dd>
            {contract.address ? <span className="address">{contract.address}</span> : contract.message}
          </dd>
        </div>
      </dl>
      <div className="contract-actions">
        {contract.copyEnabled && contract.address ? (
          <button type="button" className="button button--small" onClick={() => void onCopy()}>
            Copy address
          </button>
        ) : null}
        {contract.etherscanUrl ? (
          <TextLink href={contract.etherscanUrl} external>
            View on Etherscan
          </TextLink>
        ) : null}
      </div>
      <p className="copy-status" role="status">
        {status}
      </p>
    </div>
  );
}
