<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ClassValue } from 'svelte/elements';

  interface Props {
    children: Snippet;
    class?: ClassValue;
    supportsSearchIndex?: boolean;
  }

  let { class: className, children, supportsSearchIndex = false }: Props = $props();
</script>

<div
  class={['px-4 lg:px-8', className]}
  data-rangefind-ignore={!supportsSearchIndex || undefined}
>
  {@render children()}
</div>
