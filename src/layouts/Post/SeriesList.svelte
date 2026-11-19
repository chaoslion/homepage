<script lang="ts">
  import { Anchor, Icon } from '#/components/ui';
  import type { PostsCollectionItem } from '#/types/collections';

  interface Props {
    post: PostsCollectionItem;
    posts: PostsCollectionItem[];
  }
  let { post, posts }: Props = $props();
  const padStart = $derived(`${posts.length}`.length);
</script>

<ul class="list bg-base-100">
  {#each posts.toReversed() as item, index}
    {@const activeSeriesItem = item.id === post.id}
    <li
      class="list-row"
      class:border={activeSeriesItem}
      class:border-primary={activeSeriesItem}
    >
      <div class="text-4xl font-thin tabular-nums opacity-30">
        {String(index + 1).padStart(padStart, '0')}
      </div>
      <div>
        {#if !activeSeriesItem}
          <Anchor href={item.href} class="max-sm:hidden">
            <img
              class="rounded-box size-32 object-cover"
              alt={item.title}
              src={item.cover.src}
            />
          </Anchor>
        {:else}
          <img
            class="rounded-box size-32 object-cover max-sm:hidden"
            alt={item.title}
            src={item.cover.src}
          />
        {/if}
      </div>
      <div class="list-col-grow">
        <div class="text-lg">
          {#if !activeSeriesItem}
            <Anchor href={item.href} class="link link-primary">
              {item.title}
            </Anchor>
          {:else}
            {item.title}
          {/if}
        </div>
        <div class="font-semibold opacity-75">
          {item.summary}
        </div>
      </div>
      {#if !activeSeriesItem}
        <Anchor
          class="btn btn-square btn-ghost max-sm:hidden"
          href={item.href}
          aria={item.title}
        >
          <Icon name="mdi--play" size="md" />
        </Anchor>
      {/if}
    </li>
  {/each}
</ul>
