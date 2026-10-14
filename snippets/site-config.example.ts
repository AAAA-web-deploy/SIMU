// Copy to src/config/site.ts and only fill with verified official values.
export const MIWO_SITE = {
  tokenName: 'MICRO PANIC',
  ticker: 'MIWO',
  slogan: 'Micro Bag. Whale-Sized Feelings.',
  chainId: 1, // Ethereum mainnet is intended; NOT a deployment confirmation
  contractAddress: '',
  telegramUrl: '',
  xUrl: '',
  chartUrl: '',
  tradeUrl: '',
} as const;

export const isValidEthAddress = (v: string) => /^0x[a-fA-F0-9]{40}$/.test(v);
export const isUsableUrl = (v: string) => {
  try { const u = new URL(v); return u.protocol === 'https:' || u.protocol === 'http:'; }
  catch { return false; }
};
