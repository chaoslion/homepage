<script lang="ts">
  import { Image } from '#/components/ui';
  import type { PostsCollectionItem } from '#/types/collections';

  interface Props {
    post: PostsCollectionItem;
  }

  let { post }: Props = $props();
</script>

<Image
  src={post.cover}
  label={post.title}
  class="aspect-2/1 w-full object-cover ease-in-out group-hover:scale-110 motion-safe:transition-transform motion-safe:duration-250"
/>
