<script lang="ts">
  import { Grid } from '#/components/ui';
  import type { PostsCollectionItem } from '#/types/collections';

  import PostsPreviewCard from './PostsPreviewCard.svelte';

  interface Props {
    posts: PostsCollectionItem[];
    reversed?: boolean;
  }
  let { posts, reversed = false }: Props = $props();
  const postsOrdered = $derived(reversed ? posts.toReversed() : posts);
</script>

<Grid>
  {#each postsOrdered as post}
    <PostsPreviewCard {post} embed={true} />
  {/each}
</Grid>
