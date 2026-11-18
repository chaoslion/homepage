<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children: Snippet;
  }
  const { children, class: className, ...rest }: Props = $props();
</script>

<div {...rest} class={['card card-border bg-base-100 shadow-sm', className]}>
  {@render children()}
</div>
