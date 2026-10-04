import type { GetImageResult } from 'astro';
import type { RenderResult } from 'astro:content';
import type { ReadTimeResults } from 'reading-time';

export interface ResourceCollectionItem {
  id: string;
  href: string;
  label: string;
  forceListing: boolean;
}

export interface SeriesCollectionItem {
  id: string;
  href: string;
  title: string;
  description: string;
}

export interface TagsCollectionItem {
  id: string;
  href: string;
  title: string;
}

export interface CategoriesCollectionItem {
  description: string;
  href: string;
  icon: string;
  id: string;
  title: string;
}

export interface CategoriesCollectionPosts {
  category: CategoriesCollectionItem;
  posts: number;
  readingTimeSum: number;
}

export interface TagsCollectionPosts {
  tag: TagsCollectionItem;
  posts: number;
}

export interface SeriesCollectionPosts {
  series: SeriesCollectionItem;
  posts: number;
}

export interface BlogPostContent {
  artifact: RenderResult;
  resourcesConsumed: string[];
  externalLinksConsumed: Record<string, string>;
  hashProduced: Set<string>;
}

export interface PostsCollectionItem {
  category: CategoriesCollectionItem;
  content: () => Promise<BlogPostContent>;
  cover: GetImageResult;
  date: Date;
  dateFinal: Date;
  href: string;
  id: string;
  isLegacy: boolean;
  isUpdated: boolean;
  readingTime: ReadTimeResults;
  series?: SeriesCollectionItem;
  slug: string;
  slugName: string;
  summary: string;
  summaryShort: string;
  tags: TagsCollectionItem[];
  title: string;
  sticky: boolean;
}
