<script lang="ts">
  import { Icon } from '#/components/ui';
  import type { TechCategoryItem } from '#/types/site';

  interface Props {
    stack: Record<string, TechCategoryItem>;
  }
  const { stack }: Props = $props();
</script>

<ul
  class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical"
>
  {#each Object.entries(stack) as [category, item], index}
    <li>
      {#if index > 0}
        <hr class="bg-accent" />
      {/if}

      <div class="timeline-middle text-primary">
        <Icon name={item.icon} size="lg" class="md:mx-2" />
      </div>

      <div
        class={[
          'mb-6',
          index % 2 === 0 ? 'timeline-start md:text-end' : 'timeline-end',
        ]}
      >
        <span class="text-primary mb-1 block font-mono text-sm italic">
          {item.label ?? category}
        </span>

        <div
          class={[
            'flex flex-wrap gap-1.5',
            { 'md:justify-end': index % 2 === 0 },
          ]}
        >
          {#each item.techs as tech}
            <span
              class="badge bg-base-100 text-base-content border-base-content/20 rounded-box border px-2.5 py-2 font-mono text-xs shadow-sm"
            >
              {tech}
            </span>
          {/each}
        </div>
      </div>

      {#if index < Object.entries(stack).length - 1}
        <hr class="bg-accent" />
      {/if}
    </li>
  {/each}
</ul>
