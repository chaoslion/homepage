<script lang="ts">
  import { anchorInline } from '#/lib/css';
  import type { CategoriesCollectionPosts } from '#/types/collections';

  interface Props {
    posts: CategoriesCollectionPosts[];
    totalPosts: number;
  }
  let { posts, totalPosts }: Props = $props();

  const postsSorted = $derived(posts.toSorted((a, b) => b.posts - a.posts));
</script>

<div class="overflow-x-auto">
  <table class="table-zebra table">
    <thead>
      <tr class="text-xs tracking-widest uppercase">
        <th>name</th>
        <th>description</th>
        <th class="max-md:hidden">posts</th>
        <th class="max-lg:hidden">blog coverage [%]</th>
        <th class="max-lg:hidden">~reading time [min]</th>
      </tr>
    </thead>

    <tbody>
      {#each postsSorted as item, index}
        {@const pct = Math.round((item.posts / totalPosts) * 100)}
        <tr>
          <td>
            <a
              href={item.category.href}
              class={[anchorInline(), 'font-bold underline-offset-2']}
            >
              {item.category.title}
            </a>
          </td>

          <td class="max-w-xs">
            {item.category.description}
          </td>
          <td class="tabular-nums max-md:hidden">
            {item.posts}
          </td>

          <td class="max-lg:hidden">
            <progress class="progress" value={pct} max="100"></progress>
          </td>

          <td class="tabular-nums max-lg:hidden">
            {Math.round(item.readingTimeSum)}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
