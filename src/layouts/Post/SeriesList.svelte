<script lang="ts">
  import { Icon } from '#/components/ui';
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
      class:opacity-25={activeSeriesItem}
      class:border={activeSeriesItem}
      class:border-primary={activeSeriesItem}
    >
      <div class="text-4xl font-thin tabular-nums opacity-30">
        {String(index + 1).padStart(padStart, '0')}
      </div>
      <div>
        {#if !activeSeriesItem}
          <a href={item.href}>
            <img
              class="rounded-box size-32 object-cover"
              alt={item.title}
              src={item.cover.src}
            />
          </a>
        {:else}
          <img
            class="rounded-box size-32 object-cover"
            alt={item.title}
            src={item.cover.src}
          />
        {/if}
      </div>
      <div class="list-col-grow">
        <div class="text-lg">{item.title}</div>
        <div class="font-semibold opacity-75">
          {item.summary}
        </div>
      </div>
      {#if !activeSeriesItem}
        <a
          class="btn btn-square btn-ghost"
          href={item.href}
          aria-label={item.title}
        >
          <Icon name="mdi--play" class="size-[1.2em]" />
        </a>
      {/if}
    </li>
  {/each}
</ul>
