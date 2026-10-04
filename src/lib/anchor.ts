export function isHrefExternal(href: string): boolean {
  return href.startsWith('http://') || href.startsWith('https://');
}

export function isHrefFile(href: string): boolean {
  return href.startsWith('file://');
}

export function replaceHrefFile(href: string): string {
  return href.replace('file://', '/static/');
}

export function isAnchorStaticDownload(href: string): boolean {
  return href.startsWith('/static/');
}

export function isAnchorAstroReload(href: string): boolean {
  return href.startsWith('!');
}

export function getAnchorHrefLabel(href: string): string {
  if (isAnchorStaticDownload(href)) {
    const filename = href.split('/').pop();
    return filename ?? href;
  }
  return href;
}

export function parseAnchor(href: string): {
  href: string;
  attrs: Record<string, string>;
} {
  if (isHrefExternal(href))
    return { href, attrs: { target: '_blank', rel: 'noopener noreferrer' } };
  if (isHrefFile(href))
    return {
      href: replaceHrefFile(href),
      attrs: { download: '' },
    };
  if (isAnchorAstroReload(href))
    return { href: href.slice(1), attrs: { 'data-astro-reload': '' } };
  return { href, attrs: {} };
}
