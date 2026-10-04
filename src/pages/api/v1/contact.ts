import type { APIRoute } from 'astro';

export const prerender = false;
export const GET = (async (_) => {
  return Response.json(
    {
      success: true,
      msg: 'Oh, look at you, inspecting network requests like a pro. We see you! 👀',
    },
    { status: 200 },
  );
}) satisfies APIRoute;
