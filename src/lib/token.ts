export function isPlaceholderLink(url: string): boolean {
  const value = url.trim();
  return value === '' || value === '#' || value.startsWith('#');
}

export function isComingSoonAddress(address: string): boolean {
  const value = address.trim();
  return value === '' || value.toUpperCase() === 'COMING_SOON';
}

export function shortenAddress(address: string): string {
  if (address.length <= 12) return address;
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}
