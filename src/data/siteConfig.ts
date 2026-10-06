export const siteConfig = {
  name: 'SI is Here',
  ticker: '$SIHERE',
  network: 'Ethereum',
  contractAddress: '[CONTRACT_ADDRESS]',
  totalSupply: '[TOTAL_SUPPLY]',
  buyTax: '[BUY_TAX]',
  sellTax: '[SELL_TAX]',
  liquidityStatus: '[LIQUIDITY_STATUS]',
  ownershipStatus: '[OWNERSHIP_STATUS]',
  xUrl: '[X_URL]',
  telegramUrl: '[TELEGRAM_URL]',
  etherscanUrl: '[ETHERSCAN_URL]',
  uniswapUrl: '[UNISWAP_URL]',
} as const;

export const safetyNote =
  'Always verify the official contract address before swapping. Never trust contract addresses posted by unofficial accounts.';

export const disclaimer =
  '$SIHERE is a community-driven meme token. Cryptocurrency is volatile and involves significant risk. Nothing on this website constitutes financial advice or a guarantee of future value. Always verify official links and contract addresses before interacting with any token.';
