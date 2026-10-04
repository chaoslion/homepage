<script lang="ts">
  import type { Snippet } from 'svelte';

  import { Card } from '#/components/ui';

  interface Props {
    title: string;
    image?: Snippet;
    children: Snippet;
  }
  const { title, children, image }: Props = $props();
</script>

<Card class="mx-auto max-w-md">
  {#if image}
    <figure>
      {@render image()}
    </figure>
  {/if}
  <div class="card-body">
    <h2 class="card-title">{title}</h2>
    {@render children()}
  </div>
</Card>
