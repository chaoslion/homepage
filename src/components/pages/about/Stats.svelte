<script lang="ts">
  import type { ClassValue } from 'svelte/elements';

  import { Heading } from '#/components/ui';
  import Card from '#/components/ui/Card.svelte';
  import Grid from '#/components/ui/Grid.svelte';
  import { siteConfig } from '#content';

  interface Props {
    firstPostDate: Date;
    tagCount: number;
  }
  const { firstPostDate, tagCount }: Props = $props();
  const stats = $derived(siteConfig.stats(firstPostDate, tagCount));
</script>

<Grid>
  {#each stats as stat}
    <Card class="max-sm:mx-auto max-sm:w-fit">
      <div class="card-body">
        <div class="flex flex-col items-center justify-center">
          <di class="text-base-content/75 text-sm">{stat.label}</di>
          <div class="text-4xl">{stat.value()}</div>
          <di class="text-base-content/75 text-sm italic">{stat.description}</di
          >
        </div>
      </div>
    </Card>
  {/each}
</Grid>

<!-- <div class={['stats stats-vertical md:stats-horizontal shadow', className]}>
  {#each stats as stat}
    <div class="stat place-items-center">
      <div class="stat-title">{stat.label}</div>
      <div class="stat-value">
        {stat.value()}
      </div>
      <div class="stat-desc">{stat.description}</div>
    </div>
  {/each}
</div> -->
