<script lang="ts">
  import { onMount } from 'svelte';

  import { Icon } from '#/components/ui';
  import { iconFlex } from '#/lib/css';
  import { siteConfig } from '#content';

  let currentYear: number | undefined = undefined;
  onMount(() => {
    currentYear = new Date().getFullYear();
  });
</script>

<div class="flex flex-col items-center justify-between gap-4 lg:flex-row">
  <div class="text-center">
    {siteConfig.description} &mdash;
    <cite class="text-accent">
      {#if siteConfig.description_href}
        <a href={siteConfig.description_href}
          >{siteConfig.description_credits}</a
        >
      {:else}
        {siteConfig.description_credits}
      {/if}
    </cite>
  </div>

  <div class={iconFlex()}>
    {`${currentYear} - ${siteConfig.copyright}`}
    <Icon name="mdi--copyright" class="size-5" />
  </div>
</div>
