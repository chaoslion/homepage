<script lang="ts">
  import type { PostsCollectionItem } from '#/types/collections';

  import PostsPreviewCard from './PostsPreviewCard.svelte';
  import {
    PreviewMeta,
    PreviewSummary,
    PreviewTags,
    PreviewTime,
  } from './PostsPreviewCardParts';

  interface Props {
    post: PostsCollectionItem;
  }

  let { post }: Props = $props();
</script>

<PostsPreviewCard>
  <PreviewMeta {post} />
  <PreviewTime {post} />
  <PreviewSummary {post} />
  <PreviewTags {post} />
</PostsPreviewCard>
