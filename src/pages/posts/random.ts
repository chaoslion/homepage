import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

import { shuffleCollection } from '#/data/blog-tools';

export const prerender = false;

const postIds = (await getCollection('blog-posts')).map((post) => post.id);

export const GET = (async (context) => {
  const [firstId] = shuffleCollection(postIds);
  if (firstId === undefined) {
    return context.redirect('/posts', 307);
  }

  return context.redirect(`/posts/${firstId}`, 307);
}) satisfies APIRoute;
