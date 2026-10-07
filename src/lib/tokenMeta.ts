import type { TokenConfig } from '../types/token.ts';
import { resolveAssetUrl } from '../utils/assetUrl.ts';
import { displayTicker } from './launch.ts';

export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function publicAssetUrl(siteUrl: string, assetPath: string): string {
  const root = siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`;
  return new URL(assetPath.replace(/^\/+/, ''), root).href;
}

function meta(name: string, content: string): string {
  return `<meta name="${escapeHtml(name)}" content="${escapeHtml(content)}" />`;
}

function property(name: string, content: string): string {
  return `<meta property="${escapeHtml(name)}" content="${escapeHtml(content)}" />`;
}

export function renderTokenHead(token: TokenConfig, baseUrl: string): string {
  const title = token.pageTitle;
  const description = token.metadataDescription;
  const imageAlt = `${token.name} (${displayTicker(token.ticker)})`;
  const favicon = resolveAssetUrl(token.favicon, baseUrl);
  const appleIcon = resolveAssetUrl(token.logo, baseUrl);
  const firstImage = resolveAssetUrl(token.evolution[0]?.image ?? token.logo, baseUrl);
  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    meta('description', description),
    meta('theme-color', token.theme.background),
    `<link rel="icon" type="image/png" href="${escapeHtml(favicon)}" />`,
    `<link rel="apple-touch-icon" href="${escapeHtml(appleIcon)}" />`,
    `<link rel="preload" as="image" href="${escapeHtml(firstImage)}" />`,
    property('og:title', title),
    property('og:description', description),
    property('og:type', 'website'),
    meta('twitter:card', 'summary_large_image'),
    meta('twitter:title', title),
    meta('twitter:description', description),
  ];

  if (token.siteUrl) {
    const pageUrl = token.siteUrl;
    const imageUrl = publicAssetUrl(token.siteUrl, token.socialPreview);
    tags.push(
      `<link rel="canonical" href="${escapeHtml(pageUrl)}" />`,
      property('og:url', pageUrl),
      property('og:image', imageUrl),
      property('og:image:width', '2172'),
      property('og:image:height', '724'),
      property('og:image:alt', imageAlt),
      meta('twitter:image', imageUrl),
      meta('twitter:image:alt', imageAlt),
    );
  } else {
    tags.push(
      '<!-- Set siteUrl in src/config/token.json before production so canonical and absolute social image URLs can be emitted. -->',
    );
  }

  return tags.join('\n    ');
}
