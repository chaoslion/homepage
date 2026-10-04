import path from 'node:path';
import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';
import {
  getCollection,
  getEntries,
  getEntry,
  render,
  type CollectionEntry,
} from 'astro:content';
import string from '@poppinss/string';
import getReadingTime from 'reading-time';

import { isHrefFile, replaceHrefFile } from '#/lib/anchor';
import {
  type BlogPostContent,
  type CategoriesCollectionItem,
  type PostsCollectionItem,
  type ResourceCollectionItem,
  type SeriesCollectionItem,
  type TagsCollectionItem,
} from '#/types/collections';
import { siteConfig } from '#content';
import { BlogPluginDataKey, type BlogPluginData } from '#plugins-satteri';

const postCoverImagesFallback = import.meta.glob<ImageMetadata>(
  '#/assets/unsplash/*.jpg',
  { import: 'default' },
);

let blogPostCollectionMap: Map<string, PostsCollectionItem> | null = null;

const PostBodyReadingTimeStripRegex = [
  // code blocks
  /^```(\w*)\r?\n([\s\S]*?)\r?\n```$/gm,
  // math inline
  /(?<!\\)\$((?:\\\$|[^$\n])+?)(?<!\\)\$/,
];

function getResourceCollectionItem(
  i: CollectionEntry<'blog-resources'>,
): ResourceCollectionItem {
  const finalHref = isHrefFile(i.data.href)
    ? replaceHrefFile(i.data.href)
    : i.data.href;
  return {
    id: i.id,
    href: finalHref,
    label: i.data.label ?? string.titleCase(i.id),
    forceListing: i.data.forceListing,
  };
}

function getSeriesCollectionItem(
  i: CollectionEntry<'blog-series'>,
): SeriesCollectionItem {
  return {
    id: i.id,
    title: i.data.title ?? string.titleCase(i.id),
    href: `/explore/series-${i.id}`,
    description: i.data.description,
  };
}

function getCategoriesCollectionItem(
  i: CollectionEntry<'blog-categories'>,
): CategoriesCollectionItem {
  return {
    id: i.id,
    description: i.data.description,
    icon: i.data.icon,
    title: i.data.title ?? string.titleCase(i.id),
    href: `/explore/category-${i.id}`,
  };
}

function getTagsCollectionItem(
  i: CollectionEntry<'blog-tags'>,
): TagsCollectionItem {
  return {
    id: i.id,
    title: i.data.title ?? string.titleCase(i.id),
    href: `/explore/tag-${i.id}`,
  };
}

export async function getResourcesCollection(): Promise<
  Map<string, ResourceCollectionItem>
> {
  const collection = await getCollection('blog-resources');
  return collection.reduce((map, item) => {
    map.set(item.id, getResourceCollectionItem(item));
    return map;
  }, new Map<string, ResourceCollectionItem>());
}

export async function getResourcesCollectionItem(
  id: string,
): Promise<ResourceCollectionItem> {
  const collection = await getResourcesCollection();
  if (!collection.has(id)) {
    throw new Error(`Resource Collection item not found: ${id}`);
  }
  return collection.get(id)!;
}

export async function getSeriesCollection(): Promise<SeriesCollectionItem[]> {
  const collection = await getCollection('blog-series');
  return collection
    .toSorted((l, r) => l.id.localeCompare(r.id))
    .map(getSeriesCollectionItem);
}

export async function getCategoriesCollection(): Promise<
  CategoriesCollectionItem[]
> {
  const collection = await getCollection('blog-categories');
  return collection
    .toSorted((l, r) => l.id.localeCompare(r.id))
    .map(getCategoriesCollectionItem);
}

export async function getTagsCollection(): Promise<TagsCollectionItem[]> {
  const collection = await getCollection('blog-tags');
  return collection
    .toSorted((l, r) => l.id.localeCompare(r.id))
    .map(getTagsCollectionItem);
}

async function renderBlogPostCollection(
  item: CollectionEntry<'blog-posts'>,
): Promise<BlogPostContent> {
  const postArtifact = await render(item);
  const blogPluginData: BlogPluginData | undefined = postArtifact
    .remarkPluginFrontmatter[BlogPluginDataKey] as BlogPluginData | undefined;

  const hashProduced = new Set<string>(blogPluginData?.hashProduced ?? []);
  // const labelsConsumed = new Set<string>(
  //   blogPluginData.labelsConsumed,
  // );

  return {
    artifact: postArtifact,
    resourcesConsumed: blogPluginData?.resourcesConsumed ?? [],
    externalLinksConsumed: blogPluginData?.externalLinksConsumed ?? {},
    hashProduced: hashProduced,
  };
}

export async function getBlogPostsCollection(): Promise<
  Map<string, PostsCollectionItem>
> {
  if (!blogPostCollectionMap) {
    blogPostCollectionMap = new Map<string, PostsCollectionItem>();
    const categoriesCollection = await getCategoriesCollection();
    const coversFallback = await Promise.all(
      Object.entries(postCoverImagesFallback).map(async ([p, loader]) => ({
        path: p,
        image: await loader(),
      })),
    );

    const coversFallbackByCategory: Record<
      string,
      { index: number; covers: ImageMetadata[] }
    > = Object.fromEntries(
      categoriesCollection.map((category) => [
        category.id,
        {
          index: 0,
          covers: coversFallback
            .filter(({ path: imagePath }) =>
              path.basename(imagePath).startsWith(category.id),
            )
            .map(({ image }) => image),
        },
      ]),
    );

    for (const item of await getCollection('blog-posts')) {
      const [postDateYear, postDateMonth, postDateDay] = item.id.split('-', 3);

      const postDate = new Date(
        `${postDateYear}-${postDateMonth}-${postDateDay}T13:37:24`,
      );

      const categoryCollectionItem = await getEntry(item.data.category);
      if (categoryCollectionItem === undefined) {
        throw new Error(`Category not found: ${item.data.category.id}`);
      }
      const taxCategory = getCategoriesCollectionItem(categoryCollectionItem);

      const tagsCollectinItem = await getEntries(item.data.tags);
      tagsCollectinItem.forEach((tag, index) => {
        if (tag === undefined) {
          throw new Error(`Tag not found: ${item.data.tags[index].id}`);
        }
      });
      const taxTags = tagsCollectinItem.map(getTagsCollectionItem);

      let taxSeries: SeriesCollectionItem | undefined;
      if (item.data.series) {
        const seriesCollectionItem = await getEntry(item.data.series);
        if (seriesCollectionItem === undefined) {
          throw new Error(`Series not found: ${item.data.series.id}`);
        }
        taxSeries = getSeriesCollectionItem(seriesCollectionItem);
      }

      // get next cover by category id, round robin
      const categoryCoversFallbackIndex =
        coversFallbackByCategory[taxCategory.id].index;
      const categoryCoversFallback =
        coversFallbackByCategory[taxCategory.id].covers[
          categoryCoversFallbackIndex
        ];
      coversFallbackByCategory[taxCategory.id].index =
        (categoryCoversFallbackIndex + 1) %
        coversFallbackByCategory[taxCategory.id].covers.length;
      // force 2/1 ratio
      const coverWidth = Math.ceil(siteConfig.posts.previewCoverWidth / 2) * 2;
      const coverImage = await getImage({
        src: item.data.cover ?? categoryCoversFallback,
        format: 'webp',
        width: coverWidth,
        height: coverWidth / 2,
        fit: 'cover',
      });

      // strip code blocks for reading time calculation
      const body = PostBodyReadingTimeStripRegex.reduce(
        (currentText, pattern) => {
          return currentText.replace(pattern, '');
        },
        item.body ?? '',
      );

      blogPostCollectionMap.set(item.id, {
        category: taxCategory,
        content: async () => renderBlogPostCollection(item),
        cover: coverImage,
        date: postDate,
        dateFinal: item.data.date ?? postDate,
        href: `/posts/${item.id}`,
        id: item.id,
        isLegacy: postDate < siteConfig.posts.legacyCutoff,
        isUpdated: item.data.date !== undefined,
        readingTime: getReadingTime(body, {
          wordsPerMinute: siteConfig.posts.readingSpeedAverage,
        }),
        series: taxSeries,
        slug: item.id,
        slugName: item.id.slice(11),
        sticky: item.data.sticky,
        summary: item.data.summary,
        summaryShort: string.excerpt(
          item.data.summary,
          siteConfig.posts.maxSummary,
          {
            completeWords: true,
          },
        ),
        tags: taxTags,
        title: item.data.title,
      });
    }
  }
  return blogPostCollectionMap;
}

export async function getBlogPostsCollectionSorted(
  newestFirst?: boolean,
  limit?: number,
): Promise<PostsCollectionItem[]> {
  const collection = await getBlogPostsCollection();
  const collectionItems: PostsCollectionItem[] = [...collection]
    .map(([_, item]) => item)
    .toSorted((l, r) => {
      // compare dates
      const dateDiff =
        (newestFirst ?? true)
          ? r.date.getTime() - l.date.getTime()
          : l.date.getTime() - r.date.getTime();
      if (dateDiff !== 0) {
        return dateDiff;
      }
      // compare titles
      return l.title.localeCompare(r.title);
    });
  if (limit !== undefined) {
    return collectionItems.slice(0, limit);
  }
  return collectionItems;
}

export function getPostsRelatedCollection(
  collection: PostsCollectionItem[],
  post: PostsCollectionItem,
  limit?: number,
): PostsCollectionItem[] {
  const postTags: string[] = post.tags.map((tag) => tag.id);
  const siblings = collection.filter((sibling) => sibling.id !== post.id);
  const isSameSeries = (sibling: PostsCollectionItem) =>
    post.series !== undefined &&
    sibling.series !== undefined &&
    sibling.series.id === post.series.id;

  const related = siblings
    .filter((sibling) => !isSameSeries(sibling))
    .map((sibling) => {
      const sameCategory = sibling.category.id === post.category.id;
      const siblingTags = sibling.tags.map((tag) => tag.id);
      const commonTags = postTags.filter((postTag) =>
        siblingTags.includes(postTag),
      ).length;
      return { sibling, sameCategory, commonTags };
    })
    .filter((item) => item.sameCategory || item.commonTags > 0)
    .sort((a, b) =>
      a.sameCategory !== b.sameCategory
        ? Number(b.sameCategory) - Number(a.sameCategory)
        : b.commonTags - a.commonTags,
    )
    .map((item) => item.sibling);
  return related.slice(0, limit);
}

export function filterPostsCollectionByCategory(
  collection: PostsCollectionItem[],
  category: CategoriesCollectionItem,
): PostsCollectionItem[] {
  return collection.filter(
    (post: PostsCollectionItem) => post.category.id === category.id,
  );
}

export function filterPostsCollectionByTag(
  collection: PostsCollectionItem[],
  tagItem: TagsCollectionItem,
): PostsCollectionItem[] {
  return collection.filter((post: PostsCollectionItem) =>
    post.tags.map((i) => i.id).includes(tagItem.id),
  );
}

export function filterPostsCollectionBySeries(
  collection: PostsCollectionItem[],
  seriesItem: SeriesCollectionItem,
): PostsCollectionItem[] {
  return collection.filter(
    (post: PostsCollectionItem) =>
      post.series !== undefined && post.series.id === seriesItem.id,
  );
}
