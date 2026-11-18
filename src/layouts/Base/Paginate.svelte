<script lang="ts">
  import type { Page } from 'astro';
  import { navigate } from 'astro:transitions/client';

  import { Icon } from '#/components/ui';
  import { windowStart } from '#/lib/helper';

  type IconClass = `mdi--${string}`;
  interface Props {
    href: string;
    page: Page;
  }
  let { href, page }: Props = $props();

  const PAGES_MAX = 5;
  // 0-based start of the visible page buttons, current page centred.
  const pagesStart = $derived(
    windowStart(page.currentPage - 1, page.lastPage, PAGES_MAX),
  );

  function navigateToPage(pageNumber: number) {
    if (pageNumber === 1) {
      navigate(href);
    } else {
      navigate(`${href}/${pageNumber}`);
    }
  }
</script>

{#snippet paginateButton(
  content: IconClass | number,
  disabled: boolean,
  buttonTarget?: string,
)}
  <button
    class={['join-item btn', { 'btn-disabled': disabled }]}
    onclick={() => (buttonTarget ? navigate(buttonTarget) : {})}
    {disabled}
  >
    {#if typeof content === 'string'}
      <Icon name={content} size="md" />
    {:else}
      {content}
    {/if}</button
  >
{/snippet}

<div class="flex justify-center">
  <div class="join lg:hidden">
    {@render paginateButton(
      'mdi--chevron-double-left',
      page.url.first === undefined,
      page.url.first,
    )}
    {@render paginateButton(
      'mdi--chevron-left',
      page.url.prev === undefined,
      page.url.prev,
    )}
    <select
      class="select join-item"
      onchange={(e) => navigateToPage(Number(e.currentTarget.value))}
    >
      {#each { length: page.lastPage } as item, i}
        <option value={i + 1} selected={i + 1 === page.currentPage}
          >{i + 1}</option
        >
      {/each}
    </select>
    {@render paginateButton(
      'mdi--chevron-right',
      page.url.next === undefined,
      page.url.next,
    )}
    {@render paginateButton(
      'mdi--chevron-double-right',
      page.url.last === undefined,
      page.url.last,
    )}
  </div>

  <div class="flex items-center gap-2 max-lg:hidden">
    <div class="join">
      {@render paginateButton(
        'mdi--chevron-double-left',
        page.url.first === undefined,
        page.url.first,
      )}
      {@render paginateButton(
        'mdi--chevron-left',
        page.url.prev === undefined,
        page.url.prev,
      )}
    </div>

    <div class="join">
      {#each { length: Math.min(PAGES_MAX, page.lastPage) } as _, index}
        {@const pageIndex = pagesStart + index + 1}
        {@const hrefFromIndex = pageIndex <= 1 ? href : `${href}/${pageIndex}`}
        {@render paginateButton(
          pageIndex,
          pageIndex === page.currentPage,
          hrefFromIndex,
        )}
      {/each}
    </div>

    <div class="join">
      {@render paginateButton(
        'mdi--chevron-right',
        page.url.next === undefined,
        page.url.next,
      )}
      {@render paginateButton(
        'mdi--chevron-double-right',
        page.url.last === undefined,
        page.url.last,
      )}
    </div>
  </div>
</div>
