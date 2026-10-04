<script lang="ts">
  import type { GetImageResult } from 'astro';

  import {
    Anchor,
    Icon,
    Image,
    NavMenuItem,
    SocialList,
  } from '#/components/ui';
  import type { NavLink, SocialLink } from '#/types/site';
  import { siteConfig } from '#content';

  interface Props {
    avatar: GetImageResult;
    url: URL;
  }
  let { avatar, url }: Props = $props();
  const navLinks = siteConfig.navLinks.filter(
    (item: NavLink) => item.location === 'footer',
  );
  const navLinksSecondary = siteConfig.navLinks.filter(
    (item: NavLink) => item.location === 'footer-secondary',
  );
</script>

{#snippet footerBio()}
  <div class="flex flex-col gap-3 max-md:items-center">
    <div class="flex items-end gap-4">
      <div class="avatar">
        <div class="w-40 rounded-full">
          <Image src={avatar} label="Avatar" />
        </div>
      </div>
      <div>
        <div class="text-base-content text-xl font-bold">
          {siteConfig.author}
        </div>
        <div class="text-base-content/75 text-xl">
          {siteConfig.authorDescription}
        </div>
      </div>
    </div>
    <div class="flex items-center gap-4">
      <SocialList listClass="menu menu-horizontal rounded-box">
        {#snippet itemFn(item: SocialLink)}
          <Anchor href={item.href} aria={item.label}>
            <Icon name={item.icon} class="size-6" />
          </Anchor>
        {/snippet}
      </SocialList>
    </div>
  </div>
{/snippet}

{#snippet footerMenu()}
  <ul
    class="menu menu-horizontal bg-base-200 rounded-box w-full items-start justify-evenly lg:justify-end lg:gap-12"
  >
    <li>
      <h2 class="menu-title text-base-content">Updates</h2>
      <ul>
        {#each navLinks as item}
          <li>
            <NavMenuItem nav={item} {url} />
          </li>
        {/each}
      </ul>
    </li>
    <li>
      <h2 class="menu-title text-base-content">Policies</h2>
      <ul>
        {#each navLinksSecondary as item}
          <li>
            <NavMenuItem nav={item} {url} />
          </li>
        {/each}
      </ul>
    </li>
  </ul>
{/snippet}

<div class="flex flex-col items-center justify-between gap-4 md:flex-row">
  <div class="flex w-full flex-col gap-4">
    {@render footerBio()}
  </div>
  {@render footerMenu()}
</div>
