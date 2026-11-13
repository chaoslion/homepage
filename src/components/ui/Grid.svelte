<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ClassValue } from 'svelte/elements';

  interface Props {
    children: Snippet;
    class?: ClassValue;
    layout?: string;
  }
  const { children, class: className, layout = undefined }: Props = $props();
</script>

<div
  class={[
    'grid',
    className,
    layout ??
      'grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4',
  ]}
>
  {@render children()}
</div>
