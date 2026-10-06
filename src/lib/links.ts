const PLACEHOLDER = /^\[[^\]]+\]$/;

export function isPlaceholder(value: string) {
  const trimmed = value.trim();
  return trimmed.length === 0 || trimmed === '#' || PLACEHOLDER.test(trimmed);
}

export function isExternalUrl(value: string) {
  return /^https?:\/\//i.test(value.trim());
}

export function isLiveUrl(value: string) {
  return isExternalUrl(value) && !isPlaceholder(value);
}

export function isRealAddress(value: string) {
  return /^0x[a-fA-F0-9]{40}$/.test(value.trim());
}

export function canUseTradeLinks(address: string, url: string) {
  return isRealAddress(address) && isLiveUrl(url);
}
