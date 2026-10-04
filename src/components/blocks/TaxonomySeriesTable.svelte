<script lang="ts">
  import { anchorInline } from '#/lib/css';
  import type { SeriesCollectionPosts } from '#/types/collections';

  interface Props {
    posts: SeriesCollectionPosts[];
  }
  let { posts }: Props = $props();

  const postsSorted = $derived(posts.toSorted((a, b) => b.posts - a.posts));
</script>

<div class="overflow-x-auto">
  <table class="table-zebra table">
    <thead>
      <tr class="text-xs tracking-widest uppercase">
        <th>name</th>
        <th>description</th>
        <th class="max-md:hidden">posts</th>
      </tr>
    </thead>

    <tbody>
      {#each postsSorted as item}
        <tr>
          <td>
            <a
              href={item.series.href}
              class={[anchorInline(), 'font-bold underline-offset-2']}
            >
              {item.series.title}
            </a>
          </td>

          <td class="max-w-xs">
            {item.series.description}
          </td>
          <td class="tabular-nums max-md:hidden">
            {item.posts}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
