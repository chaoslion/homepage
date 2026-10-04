import type { APIRoute } from 'astro';

import { getBlogPostsCollectionSorted } from '#/data/blog';
import { shufflePostsCollection } from '#/data/blog-tools';

export const prerender = false;

const postsCollection = await getBlogPostsCollectionSorted();

export const GET = (async (context) => {
  shufflePostsCollection(postsCollection);
  if (postsCollection.length === 0) {
    return context.redirect('/posts', 307);
  }

  const [firstPost, ..._restPosts] = postsCollection;

  return context.redirect(firstPost.href, 307);
}) satisfies APIRoute;
