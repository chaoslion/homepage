import type { APIContext, APIRoute } from 'astro';
import rss from '@astrojs/rss';

import { getBlogPostsCollectionSorted } from '#/data/blog';
import type { PostsCollectionItem } from '#/types/collections';
import { siteConfig } from '#content';

export const GET = (async (context: APIContext) => {
  const postsCollection = await getBlogPostsCollectionSorted();
  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site || 'localhost',
    stylesheet: '/static/rss.xsl',
    trailingSlash: false,
    items: postsCollection.slice(0, 10).map((post: PostsCollectionItem) => ({
      title: post.title,
      pubDate: post.date,
      description: post.summary,
      link: `/posts/${post.slug}`,
    })),
  });
}) satisfies APIRoute;
