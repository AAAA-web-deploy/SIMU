// Verified public details only. Leave a field blank until it is real.
// Blank socials render as inactive controls. A blank contract cannot be copied.
// Do not add supply, tax, liquidity, or ownership fields here — unknown data stays off the page.

export const MIWO_SITE = {
  tokenName: 'MICRO PANIC',
  ticker: 'MIWO',
  slogan: 'Micro Bag. Whale-Sized Feelings.',
  chainId: 1, // Ethereum mainnet is the intended network, not a deployment receipt.
  contractAddress: '',
  telegramUrl: '',
  xUrl: '',
  chartUrl: '',
  tradeUrl: '',
} as const;

export const isValidEthAddress = (v: string) => /^0x[a-fA-F0-9]{40}$/.test(v);

export const isUsableUrl = (v: string) => {
  try {
    const u = new URL(v);
    return u.protocol === 'https:' || u.protocol === 'http:';
  } catch {
    return false;
  }
};

export function networkLabel(chainId: number): string {
  if (chainId === 1) return 'Ethereum mainnet';
  return `Chain ID ${chainId}`;
}
