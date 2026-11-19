<script lang="ts">
  import { Grid } from '#/components/ui';
  import type { PostsCollectionItem } from '#/types/collections';

  import PostsPreviewCardSticky from './PostsPreviewCardSticky.svelte';

  interface Props {
    posts: PostsCollectionItem[];
    limit: number;
  }
  let { posts, limit }: Props = $props();
</script>

<Grid>
  {#each posts
    .filter((post) => post.sticky)
    .slice(0, limit) as post (post.slug)}
    <PostsPreviewCardSticky {post} />
  {/each}
</Grid>
