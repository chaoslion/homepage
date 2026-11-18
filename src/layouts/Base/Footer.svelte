<script lang="ts">
  import { Anchor, Icon } from '#/components/ui';
  import { iconFlex } from '#/lib/css';
  import { siteConfig } from '#content';

  const currentYear = new Date().getFullYear();
</script>

<div class="flex flex-col items-center justify-between gap-4 lg:flex-row">
  <div class="text-center">
    {siteConfig.description} &mdash;
    <cite class="text-accent">
      {#if siteConfig.description_href}
        <Anchor href={siteConfig.description_href}
          >{siteConfig.description_credits}</Anchor
        >
      {:else}
        {siteConfig.description_credits}
      {/if}
    </cite>
  </div>

  <div class={iconFlex()}>
    <Icon name="mdi--copyright" size="md" />
    {`${currentYear} ${siteConfig.author}`}
  </div>
</div>
