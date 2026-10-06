import { useState } from 'react';
import { copyExactText } from '../lib/clipboard.ts';

type CopyButtonProps = {
  value: string;
  label: string;
  className?: string;
};

export function CopyButton({ value, label, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState('');

  async function onCopy() {
    const didCopy = await copyExactText(value);
    setCopied(didCopy);
    setStatus(didCopy ? 'Contract address copied.' : 'Could not copy the contract address.');
    window.setTimeout(() => {
      setCopied(false);
      setStatus('');
    }, 1800);
  }

  return (
    <span className="copy-wrap">
      <button type="button" className={className} onClick={onCopy}>
        {copied ? 'COPIED' : label}
      </button>
      <span className="sr-only" role="status">
        {status}
      </span>
    </span>
  );
}
