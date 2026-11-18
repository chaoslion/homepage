<script lang="ts">
  import { Grid } from '#/components/ui';
  import type { PostsCollectionItem } from '#/types/collections';

  import PostsPreviewCardSingle from './PostsPreviewCardSingle.svelte';

  interface Props {
    posts: PostsCollectionItem[];
  }
  let { posts }: Props = $props();
</script>

<Grid>
  {#each posts as post (post.slug)}
    <PostsPreviewCardSingle {post} />
  {/each}
</Grid>
