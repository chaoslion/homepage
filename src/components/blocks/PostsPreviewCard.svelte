<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ClassValue } from 'svelte/elements';

  import { Card } from '#/components/ui';

  interface Props {
    class?: ClassValue;
    bare?: boolean;
    image?: Snippet;
    children: Snippet;
  }

  let { class: className, bare = false, image, children }: Props = $props();
</script>

{#snippet content()}
  {@render image?.()}
  <div class="card-body">
    {@render children()}
  </div>
{/snippet}

{#if bare}
  <div class={['card w-full', className]}>
    {@render content()}
  </div>
{:else}
  <Card class={['mx-auto h-full w-full', className]}>
    {@render content()}
  </Card>
{/if}
