<script lang="ts">
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

<Grid layout="grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6" class="items-stretch">
  {#each stats as stat}
    <Card class="min-w-0">
      <div class="card-body p-3 sm:p-4">
        <div class="flex flex-col items-center justify-center text-center">
          <div class="text-base-content/80 text-sm">{stat.label}</div>
          <div class="text-3xl">{stat.value()}</div>
          <div class="text-base-content/80 text-sm italic">
            {stat.description}
          </div>
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
