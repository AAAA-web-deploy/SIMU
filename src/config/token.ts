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
  telegramUrl: 'https://t.me/siintern_eth',
  twitterUrl: 'https://x.com/siintern_eth',
  liquidityStatus: 'Burnt',
  ownershipStatus: 'Renounced',
  buyTax: '0%',
  sellTax: '0%',
} as const;

export type TokenConfig = typeof token;
