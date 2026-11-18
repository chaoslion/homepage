import type { ClassValue } from 'svelte/elements';

export interface FileTreeContent {
  paths: string[];
}

export type IconSize = 'sm' | 'md' | 'lg';

export type HeadingName = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingFancySubtitleProps {
  title: string;
  label?: string;
}

export interface HeadingFancyProps {
  title: string;
  class?: ClassValue;
  id?: string;
  tag?: HeadingName;
  subtitle?: HeadingFancySubtitleProps;
}

export type CodeBlockAttribution = Record<'author' | 'source', string>;
