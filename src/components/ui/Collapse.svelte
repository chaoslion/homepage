<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ClassValue } from 'svelte/elements';

  interface Props {
    class?: ClassValue;
    titleClass?: ClassValue;
    contentClass?: ClassValue;
    title: Snippet;
    children: Snippet;
  }
  const {
    titleClass,
    title,
    contentClass,
    children,
    class: className,
  }: Props = $props();
</script>

<div class={['bg-base-100 collapse ', className]}>
  <input type="checkbox" />
  <div class={['collapse-title', titleClass]}>
    {@render title()}
  </div>
  <div class={['collapse-content', contentClass]}>
    {@render children()}
  </div>
</div>
