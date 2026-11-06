<script lang="ts">
  import type { ClassValue } from 'svelte/elements';

  type Variant = 'pill' | 'plain' | 'chips';

  interface Props {
    path: string;
    class?: ClassValue;
  }

  let { path, class: className }: Props = $props();
  const segments = $derived(path.split('/').map((s) => s.trim()));
  const lastIndex = $derived(segments.length - 1);
</script>

{#snippet separator()}
  <span aria-hidden="true" class="text-base-content/50 px-1 select-none"
    >&rsaquo;</span
  >
{/snippet}

<span
  class={[
    'inline-flex max-w-full flex-wrap items-center gap-x-1 gap-y-1 align-middle',
    className,
  ]}
>
  {#each segments as segment, index}
    {#if index > 0}{@render separator()}{/if}
    <kbd
      class={[
        'kbd kbd-xs h-auto max-w-full py-0.5 text-left wrap-break-word whitespace-normal',
        { 'font-bold': index === lastIndex },
      ]}>{segment}</kbd
    >
  {/each}
</span>
