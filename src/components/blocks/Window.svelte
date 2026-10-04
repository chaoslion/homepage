<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ClassValue } from 'svelte/elements';

  import { Card } from '#/components/ui';

  interface Props {
    class?: ClassValue;
    id?: string;
    title: Snippet;
    children: Snippet;
  }

  let { id, title, class: className, children }: Props = $props();
</script>

<Card {id} class={['overflow-hidden', className]}>
  <div class="border-accent border-b-3 px-2 py-1 select-none">
    {@render title()}
  </div>
  {@render children()}
</Card>
