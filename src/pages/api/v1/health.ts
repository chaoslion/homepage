import type { APIRoute } from 'astro';

export const prerender = false;
export const GET = (async (_) => {
  return Response.json(
    {
      success: true,
      timestamp: new Date().toISOString(),
    },
    { status: 200 },
  );
}) satisfies APIRoute;
