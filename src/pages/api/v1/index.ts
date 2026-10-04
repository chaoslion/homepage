import type { APIRoute } from 'astro';

import { siteConfig } from '#content';

export const prerender = false;

export const GET = (async (_) => {
  return Response.json({
    success: 'true',
    author: siteConfig.author,
    build: siteConfig.build,
  });
}) satisfies APIRoute;
