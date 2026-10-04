import { BlogPostInternalLinkTypes } from './constants';

export type BlogPostInternalLinkType =
  (typeof BlogPostInternalLinkTypes)[number];

export type BlogLinkType =
  | 'internalResource'
  | 'internalWiki'
  | 'internalPost'
  | 'internalHash'
  | 'external';

interface LinkPropsCommon {
  label?: string;
}

export interface BlogLinkProps extends LinkPropsCommon {
  href: string;
}

export interface BlogLinkResourceProps {
  resourceId: string;
}

export interface BlogLinkPropsInternalResource
  extends LinkPropsCommon, BlogLinkResourceProps {}
export interface BlogLinkPropsInternalPost extends LinkPropsCommon {
  slug: string;
  hashTarget?: string;
  hashType?: BlogPostInternalLinkType;
  hashId?: string;
}
export interface BlogLinkInternalPostHash {
  target: string;
  id: string;
  type: BlogPostInternalLinkType;
}

export interface BlogLinkPropsInternalPostHash
  extends LinkPropsCommon, BlogLinkInternalPostHash {}

export interface BlogFigureProps {
  label: string;
  id?: string;
}

export interface BlogFigureResourceProps
  extends BlogFigureProps, BlogLinkResourceProps {}

export interface BlogQuoteProps extends BlogLinkPropsInternalResource {}

export interface BlogCodeBlockProps {
  id?: string;
  label?: string;
}

// only use basic datatypes because we cross boundary from satteri to astro
export interface BlogPluginData {
  resourcesConsumed: string[];
  externalLinksConsumed: Record<string, string>;
  hashConsumed: string[];
  hashProduced: string[];
}
