<script lang="ts">
  import { dateString } from '#/lib/helper';
  import type { PostsCollectionItem } from '#/types/collections';

  interface Props {
    post: PostsCollectionItem;
  }

  let { post }: Props = $props();
</script>

<div class="card-actions text-xs">
  <span class="mr-auto">{dateString(post.date)}</span>
  <span>{post.readingTime.text}</span>
</div>
