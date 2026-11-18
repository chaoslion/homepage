<script lang="ts">
  import type { PostsCollectionItem } from '#/types/collections';

  import PostsPreviewCard, {
    cardMeta,
    cardSummary,
    cardTags,
    cardTime,
  } from './PostsPreviewCard.svelte';

  interface Props {
    post: PostsCollectionItem;
  }

  let { post }: Props = $props();
</script>

<PostsPreviewCard>
  {@render cardMeta(post)}
  {@render cardTime(post)}
  {@render cardSummary(post)}
  {@render cardTags(post, false)}
</PostsPreviewCard>
