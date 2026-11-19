<script lang="ts">
  import type { ClassValue } from 'svelte/elements';

  import { Anchor, Icon } from '#/components/ui';
  import { iconFlex } from '#/lib/css';
  import { siteConfig } from '#content';
  import type { BuildInfoMap } from '#plugins-vite';

  interface Props {
    class?: ClassValue;
    id: string;
    infos: BuildInfoMap;
  }
  const { id, infos, class: className }: Props = $props();

  const infoHistoryMerged = $derived(
    Object.entries(infos)
      .flatMap(
        ([repository, repo]) =>
          repo.history.map((item) => ({
            ...item,
            repository: repository,
          })) ?? [],
      )
      .toSorted(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
  );
  const releaseColorCodes: Record<string, string> = {
    site: 'text-primary',
    content: 'text-secondary',
  };
</script>

<div class={['flex flex-col gap-2', className]}>
  {#each infoHistoryMerged as item, index}
    {@const repoUrl = siteConfig.build.repoUrl(item.repository, item.name)}
    {@const date = new Date(item.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })}
    <div class="collapse-arrow bg-base-100 border-base-300 collapse border">
      <input type="radio" name={`changelog-${id}`} checked={index === 0} />
      <div class="collapse-title text-lg font-semibold">
        <div class="flex items-center gap-2">
          {item.name} &mdash;
          <span class={releaseColorCodes[item.repository] ?? 'text-success'}
            >{item.repository}</span
          >
        </div>
      </div>
      <div class="collapse-content">
        <ul class="flex list-none flex-col gap-2">
          <li>
            <span class={iconFlex()}>
              <Icon name="mdi--clock-outline" size="lg" />
              {date}
            </span>
          </li>
          {#if repoUrl}
            <li>
              <Anchor href={repoUrl} class={['link link-primary', iconFlex()]}>
                <Icon name="mdi--code" size="lg" />
                {item.hash_short}
              </Anchor>
            </li>
          {/if}
        </ul>
        <div class="text-sm">
          <pre>{item.message}</pre>
        </div>
      </div>
    </div>
  {/each}
</div>
