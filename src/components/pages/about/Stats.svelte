<script lang="ts">
  import { Card, Grid } from '#/components/ui';
  import type { Stat } from '#/types/site';

  interface Props {
    stats: Stat[];
  }
  const { stats }: Props = $props();
</script>

<Grid layout="grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6" class="items-stretch">
  {#each stats as stat}
    <Card>
      <div class="card-body p-3 sm:p-4">
        <div class="flex flex-col items-center justify-center text-center">
          <div class="text-base-content/80 text-sm">{stat.label}</div>
          <div class="text-3xl">{stat.value}</div>
          <div class="text-base-content/80 text-sm italic">
            {stat.description}
          </div>
        </div>
      </div>
    </Card>
  {/each}
</Grid>
