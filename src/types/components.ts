import type { GetImageResult } from 'astro';
import type { ClassValue } from 'svelte/elements';

import type { Link } from './site';

export interface FileTreeContent {
  paths: string[];
}

export type HeadingName = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingFancyProps {
  title: string;
  subtitle?: string;
  preposition?: 'in' | 'on' | 'by' | 'with';
  class?: ClassValue;
  id?: string;
  tag?: HeadingName;
}

export interface GalleryImageProps {
  original: GetImageResult;
  preview: GetImageResult;
}

export interface TreeLinkItem {
  link: Link;
  depth: number;
}

export type CodeBlockAttribution = Record<'author' | 'source', string>;
