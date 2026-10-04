<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ClassValue } from 'svelte/elements';

  interface Props {
    class?: ClassValue;
    prose?: boolean;
    noFlex?: boolean;
    children: Snippet;
  }

  let {
    class: className,
    prose = false,
    noFlex = false,
    children,
  }: Props = $props();
</script>

<div
  class={[
    prose ? 'max-w-prose' : 'container',
    'mx-auto',
    { 'flex flex-col gap-6': !noFlex },
    className,
  ]}
>
  {@render children()}
</div>
