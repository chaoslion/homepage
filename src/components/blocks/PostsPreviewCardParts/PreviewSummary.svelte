<script lang="ts">
  import type { PostsCollectionItem } from '#/types/collections';

  interface Props {
    post: PostsCollectionItem;
  }

  let { post }: Props = $props();
</script>

<p class="text-base-content/75 mt-2 leading-relaxed">
  {post.summary}
</p>
