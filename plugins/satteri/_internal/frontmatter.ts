import { BlogPluginDataKey } from './constants';
import { BlogLinkResourceWrappedRE } from './constants-link';
import type { BlogLinkResourceProps, BlogPluginData } from './types';

export function getFrontmatter(ctx: any): BlogPluginData {
  ctx.data.astro.frontmatter[BlogPluginDataKey] ??= {
    externalLinksConsumed: {} as Record<string, string>,
    hashConsumed: [] as string[],
    hashProduced: [] as string[],
    resourcesConsumed: [] as string[],
  } satisfies BlogPluginData;

  return ctx.data.astro.frontmatter[BlogPluginDataKey] as BlogPluginData;
}

export function trackHashProduced(frontmatter: BlogPluginData, id: string) {
  if (!frontmatter.hashProduced.includes(id)) {
    frontmatter.hashProduced.push(id);
  }
}

export function trackHashConsumed(frontmatter: BlogPluginData, id: string) {
  if (!frontmatter.hashConsumed.includes(id)) {
    frontmatter.hashConsumed.push(id);
  }
}

export function trackExternalLinkConsumed(
  frontmatter: BlogPluginData,
  href: string,
  label: string,
) {
  if (!frontmatter.externalLinksConsumed[href]) {
    frontmatter.externalLinksConsumed[href] = label;
  }
}

export function trackGlobalResourceConsumed(
  frontmatter: BlogPluginData,
  resourceId: string,
) {
  if (
    !frontmatter.resourcesConsumed.find(
      (item) => item.localeCompare(resourceId) === 0,
    )
  ) {
    frontmatter.resourcesConsumed.push(resourceId);
  }
}

export function resolveResourceFromMatch(
  _node: any,
  _ctx: any,
  frontmatter: BlogPluginData,
  match: any,
  track: boolean,
): BlogLinkResourceProps {
  const [, resourceId] = match as [string, string];
  if (track) {
    trackGlobalResourceConsumed(frontmatter, resourceId);
  }
  return { resourceId };
}

export function trackResourceFromMatch(
  node: any,
  ctx: any,
  frontmatter: BlogPluginData,
  match: any,
): BlogLinkResourceProps {
  return resolveResourceFromMatch(node, ctx, frontmatter, match, true);
}

export function parseAndTrackResource(
  node: any,
  ctx: any,
  frontmatter: BlogPluginData,
  resourceHref: string,
): BlogLinkResourceProps | undefined {
  const resourceHrefMatch = resourceHref.match(BlogLinkResourceWrappedRE);
  if (!resourceHrefMatch) {
    return undefined;
  }
  return trackResourceFromMatch(node, ctx, frontmatter, resourceHrefMatch);
}
