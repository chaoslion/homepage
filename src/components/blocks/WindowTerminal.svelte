<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ClassValue } from 'svelte/elements';

  import Window from './Window.svelte';

  interface Props {
    class?: ClassValue;
    title: string;
    children: Snippet;
  }

  let { title: terminalTitle, class: className, children }: Props = $props();
</script>

<Window class={className}>
  {#snippet title()}
    <div class="custom-font-title truncate text-center text-lg">
      {terminalTitle}
    </div>
  {/snippet}
  <div class="bg-neutral text-neutral-content p-2 font-mono">
    {@render children()}
  </div>
</Window>
