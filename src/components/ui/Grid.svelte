<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ClassValue } from 'svelte/elements';

  interface Props {
    children: Snippet;
    tight?: boolean;
    class?: ClassValue;
  }
  const { children, tight = false, class: className }: Props = $props();
</script>

<div
  class={[
    'grid gap-4 lg:gap-6',
    tight
      ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    className,
  ]}
>
  {@render children()}
</div>
