const ETHEREUM_ADDRESS = /^0x[0-9a-fA-F]{40}$/;

export function isEthereumAddress(value: string | null | undefined): value is string {
  return typeof value === 'string' && ETHEREUM_ADDRESS.test(value);
}

export function isHttpsUrl(value: string | null | undefined): value is string {
  if (typeof value !== 'string' || value.trim() === '') return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname !== '';
  } catch {
    return false;
  }
}

export function canBuy(address: string | null, buyUrl: string | null): boolean {
  return isEthereumAddress(address) && isHttpsUrl(buyUrl);
}

export function canOpenChart(chartUrl: string | null): boolean {
  return isHttpsUrl(chartUrl);
}

export function liveHttpsUrl(value: string | null): string | null {
  return isHttpsUrl(value) ? value : null;
}

export function displayTicker(ticker: string): string {
  return ticker.startsWith('$') ? ticker : `$${ticker}`;
}

export function fillTemplate(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}
