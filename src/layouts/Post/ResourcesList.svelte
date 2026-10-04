<script lang="ts">
  import { getAnchorHrefLabel } from '#/lib/anchor';
  import type { ResourceCollectionItem } from '#/types/collections';

  import AnchorResource from './AnchorResource.svelte';

  interface Props {
    resources: ResourceCollectionItem[];
  }
  let { resources }: Props = $props();
  const padStart = $derived(`${resources.length}`.length);

  function filterResources(item: ResourceCollectionItem): boolean {
    const url = new URL(item.href, 'http://localhost');
    return url.pathname.length > 1 || item.forceListing;
  }
</script>

<ul class="list bg-base-100">
  {#each resources.filter(filterResources) as item, index}
    <li class="list-row">
      <div class="text-4xl font-thin tabular-nums opacity-30">
        {String(index + 1).padStart(padStart, '0')}
      </div>
      <div>
        <div>{item.label}</div>
        <AnchorResource resource={item} label={getAnchorHrefLabel(item.href)} />
      </div>
    </li>
  {/each}
</ul>
