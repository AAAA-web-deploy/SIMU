/**
 * Single source for token facts and official links.
 * Leave unknown values as the placeholders below. Do not invent an address,
 * a tax, a liquidity figure, an ownership status, or a trading URL.
 */
export const token = {
  name: 'Super Intelligence Intern',
  symbol: '$SIINTERN',
  contractAddress: 'COMING_SOON',
  network: 'Ethereum',
  standard: 'ERC-20',
  uniswapUrl: '#',
  etherscanUrl: '#',
  dexscreenerUrl: '#',
  dextoolsUrl: '#',
  telegramUrl: 'https://t.me/nigthwatchdog',
  twitterUrl: '#',
  liquidityStatus: 'Coming Soon',
  ownershipStatus: 'Coming Soon',
  buyTax: 'Coming Soon',
  sellTax: 'Coming Soon',
} as const;

export type TokenConfig = typeof token;
