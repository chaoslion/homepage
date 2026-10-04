<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ClassValue } from 'svelte/elements';

  interface Props {
    class?: ClassValue;
    id?: string;
    children: Snippet;
  }
  const { children, class: className, id }: Props = $props();
</script>

<div class={['card card-border bg-base-100 shadow-sm', className]} {id}>
  {@render children()}
</div>
