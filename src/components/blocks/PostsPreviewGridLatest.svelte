<script lang="ts">
  import { Grid } from '#/components/ui';
  import type { PostsCollectionItem } from '#/types/collections';

  import PostsPreviewCardMulti from './PostsPreviewCardMulti.svelte';
  import PostsPreviewCardSingle from './PostsPreviewCardSingle.svelte';

  interface Props {
    /** Newest first. */
    posts: PostsCollectionItem[];
    /** Maximum number of grid cells (a carousel counts as one). */
    limit?: number;
  }
  let { posts, limit = Infinity }: Props = $props();

  // Index page "latest posts": one grid cell per post, except consecutive
  // posts of the same series, which collapse into one carousel (latest first).
  const groups = $derived.by(() => {
    const out: PostsCollectionItem[][] = [];
    for (const post of posts) {
      const prev = out.at(-1);
      const sameSeries =
        !!post.series && prev?.[0]!.series?.id === post.series.id;
      if (sameSeries) prev!.push(post);
      else out.push([post]);
    }
    return out.slice(0, limit);
  });
</script>

<Grid>
  {#each groups as group (group[0]!.slug)}
    {#if group.length === 1}
      <PostsPreviewCardSingle post={group[0]!} />
    {:else}
      <PostsPreviewCardMulti posts={group} />
    {/if}
  {/each}
</Grid>
