<script lang="ts">
  import { Grid } from '#/components/ui';
  import type { PostsCollectionItem } from '#/types/collections';

  import PostsPreviewCardMulti from './PostsPreviewCardMulti.svelte';
  import PostsPreviewCardSingle from './PostsPreviewCardSingle.svelte';

  interface Props {
    posts: PostsCollectionItem[];
    limit: number;
  }
  let { posts, limit }: Props = $props();

  const postsBySeriesBurst = $derived.by(() => {
    const result: PostsCollectionItem[][] = [];
    for (const post of posts.filter((post) => !post.sticky)) {
      const prev = result.at(-1);
      const sameSeries =
        !!post.series && prev?.[0]!.series?.id === post.series.id;
      if (sameSeries) prev!.push(post);
      else result.push([post]);
    }
    return result;
  });
</script>

<Grid>
  {#each postsBySeriesBurst.slice(0, limit) as group (group[0]!.slug)}
    {#if group.length === 1}
      <PostsPreviewCardSingle post={group[0]!} />
    {:else}
      <PostsPreviewCardMulti posts={group} />
    {/if}
  {/each}
</Grid>
