/**
 * Join a root-relative asset path with Vite's base.
 * A leading slash is stripped so the base is not applied twice.
 * `siteUrl` is a separate public origin and is not added here.
 */
export function resolveAssetUrl(path: string, baseUrl: string): string {
  const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const relative = path.replace(/^\/+/, '');
  const basePath = base.replace(/^\/+/, '');
  const normalized =
    basePath && relative.startsWith(basePath) ? relative.slice(basePath.length) : relative;
  return `${base}${normalized}`;
}

export function assetUrl(path: string): string {
  const base = (import.meta as unknown as { env: { BASE_URL: string } }).env.BASE_URL;
  return resolveAssetUrl(path, base);
}

export function assetFilename(path: string): string {
  const parts = path.split('/');
  return parts[parts.length - 1] || path;
}
