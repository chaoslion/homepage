<script lang="ts">
  import type { Page } from 'astro';

  import { Anchor, Icon } from '#/components/ui';
  import type { UrlPart } from '#/types/layouts';

  interface Props {
    urlParts: UrlPart[];
    page?: Page;
  }

  let { urlParts, page }: Props = $props();
</script>

<div class="breadcrumbs font-mono text-sm">
  <ul>
    <li>
      <Anchor href="/" aria="Home">
        <Icon name="mdi--home-outline" class="size-5 opacity-25" />
      </Anchor>
    </li>
    {#each urlParts as item, index}
      <li>
        {#if index < urlParts.length - 1}
          <Anchor href={item.href} class="opacity-25">{item.label}</Anchor>
        {:else}
          {#if page !== undefined && page.currentPage > 1}
            page {page.currentPage} / {page.lastPage}
          {:else}
            {item.label}
          {/if}
        {/if}
      </li>
    {/each}
  </ul>
</div>
