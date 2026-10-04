import { BlogPostInternalLinkTypes } from './constants';
import type { BlogLinkType } from './types';

const BlogLinkIdentifierRE = /([a-zA-Z0-9][a-zA-Z0-9-_]*)/;
export const BlogLinkResourceRE = BlogLinkIdentifierRE;
export const BlogLinkResourceWrappedRE = new RegExp(
  `^${BlogLinkIdentifierRE.source}$`,
);
export const BlogLinkPostHashRE = new RegExp(
  `((${BlogPostInternalLinkTypes.join('|')})-${BlogLinkIdentifierRE.source})`,
);
export const BlogLinkWikiRE = new RegExp(
  `(${BlogLinkIdentifierRE.source}:)?(.+)`,
);
export const BlogLinkPostRE = new RegExp(
  `${BlogLinkIdentifierRE.source}(?:#${BlogLinkPostHashRE.source})?`,
);

export const BlogLinkTypeMap: Record<BlogLinkType, RegExp> = {
  internalResource: new RegExp(`^res://${BlogLinkResourceRE.source}$`),
  internalWiki: new RegExp(`^wiki://${BlogLinkWikiRE.source}$`),
  internalPost: new RegExp(`^post://${BlogLinkPostRE.source}$`),
  internalHash: new RegExp(`^#${BlogLinkPostHashRE.source}$`),
  external: new RegExp(`^https?://.+$`),
} as const;
