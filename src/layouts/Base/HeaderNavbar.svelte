<script lang="ts">
  import Searchbar from '#/components/blocks/Searchbar.svelte';
  import WindowTerminal from '#/components/blocks/WindowTerminal.svelte';
  import WindowTerminalCommand from '#/components/blocks/WindowTerminalCommand.svelte';
  import WindowTerminalStdout from '#/components/blocks/WindowTerminalStdout.svelte';
  import {
    Anchor,
    Collapse,
    Icon,
    NavMenuItem,
    SocialList,
  } from '#/components/ui';
  import { themeManager, type ThemeState } from '#/data/theme.svelte';
  import { anchorTerminal, iconFlex } from '#/lib/css';
  import type { NavLink, SocialLink } from '#/types/site';
  import { siteConfig } from '#content';

  interface Props {
    url: URL;
  }

  const { url }: Props = $props();

  const contactCommandOutput = [
    "+ echo 'query author contact endpoints'",
    '+ curl /api/v1/contact',
  ];

  let contactModalElement: HTMLDialogElement;

  let contactModalOpen = $state(false);

  const themeIcons = Object.entries(siteConfig.themeIcons) as [
    ThemeState,
    string,
  ][];

  const navLinks = siteConfig.navLinks.filter(
    (item: NavLink) =>
      item.location === 'header' || item.location === 'header-mobile',
  );
</script>

{#snippet navMenuLabel(icon: string, label: string)}
  <span class={['select-none', iconFlex()]}>
    <Icon name={icon} class={siteConfig.navIconClass} />
    {label}
  </span>
{/snippet}

{#snippet navMenuButtonSwap(
  titleOn: string,
  titleOff: string,
  iconOn: string,
  iconOff: string,
  click: () => void,
  active: () => boolean,
)}
  <button class={iconFlex()} onclick={click}>
    <span class={['swap', 'swap-rotate', active() ? undefined : 'swap-active']}>
      <Icon name={iconOn} class="swap-on size-5" />
      <Icon name={iconOff} class="swap-off size-5" />
    </span>
    {active() ? titleOn : titleOff}
  </button>
{/snippet}

{#snippet navMenuBigContent()}
  {#each navLinks.filter((i) => i.location === 'header') as item}
    <li>
      <NavMenuItem nav={item} {url} />
    </li>
  {/each}
  <li>
    {@render navMenuButtonSwap(
      'contact.sh',
      'contact.sh',
      'mdi--account-details',
      'mdi--check',
      () => {
        contactModalElement.showModal();
        contactModalOpen = true;
      },
      () => contactModalOpen,
    )}
  </li>
  <li class={{ 'menu-disabled': themeManager.isUnknown }}>
    {#if themeManager.isUnknown}
      <button class={iconFlex()} disabled={true}>
        <span class={iconFlex()}>
          <Icon name="mdi--theme-light-dark" class={siteConfig.navIconClass} />
          thinking about a theme
        </span>
      </button>
    {:else}
      {@render navMenuButtonSwap(
        'dark.sh',
        'light.sh',
        siteConfig.themeIcons.light,
        siteConfig.themeIcons.dark,
        () => themeManager.toggle(),
        () => themeManager.isLight,
      )}
    {/if}
  </li>
{/snippet}

{#snippet navMenuSmallContent()}
  {#each navLinks as item}
    <li>
      <NavMenuItem nav={item} {url} />
    </li>
  {/each}
  <li>
    <h2 class="menu-title">
      {@render navMenuLabel('mdi--card-account-details', 'contact/')}
    </h2>
    <SocialList>
      {#snippet itemFn(item: SocialLink)}
        <Anchor href={item.href} aria={item.label} class={iconFlex()}>
          <Icon name={item.icon} class={siteConfig.navIconClass} />
          {item.label}
        </Anchor>
      {/snippet}
    </SocialList>
  </li>
  <li>
    <h2 class="menu-title">
      {@render navMenuLabel('mdi--theme-light-dark', 'theme/')}
    </h2>
    <ul>
      {#each themeIcons as [theme, icon]}
        {@const themeIsDisabled =
          (themeManager.isLight && theme === 'light') ||
          (!themeManager.isLight && theme === 'dark')}
        <li
          class={themeManager.isUnknown || themeIsDisabled
            ? 'menu-disabled'
            : undefined}
        >
          <button
            onclick={() => themeManager.switch(theme)}
            disabled={themeManager.isUnknown}
          >
            {@render navMenuLabel(icon, `${theme}.sh`)}
          </button>
        </li>
      {/each}
    </ul>
  </li>
{/snippet}

<Collapse
  class="collapse-arrow lg:hidden"
  titleClass="bg-base-200 py-1 flex items-center h-10"
  contentClass="border-b border-base-200"
>
  {#snippet title()}
    {@render navMenuLabel('mdi--menu', 'menu.sh')}
  {/snippet}
  <ul class="menu w-full font-mono">
    {@render navMenuSmallContent()}
  </ul>
  <Searchbar class="bg-base-100 px-2" inputClass="w-full" />
</Collapse>

<div class="bg-base-200 shadow-sm max-lg:hidden">
  <div class="flex flex-row items-center">
    <ul class="menu menu-horizontal font-mono">
      {@render navMenuBigContent()}
    </ul>
    <Searchbar
      class="bg-base-200 mx-2 ml-auto w-80 min-w-0"
      inputClass="w-full"
      panelClass="absolute z-40 left-0 right-0"
      enableHotkey={true}
    />
  </div>
</div>

<dialog
  bind:this={contactModalElement}
  onclose={() => (contactModalOpen = false)}
  class="modal"
>
  <div class="modal-box">
    <WindowTerminal title="Contact">
      <WindowTerminalCommand command="sh -x contact.sh" />
      {#each contactCommandOutput as line}
        <WindowTerminalStdout {line} />
      {/each}
      {#if contactModalOpen}
        <SocialList>
          {#snippet itemFn(item: SocialLink)}
            <Anchor href={item.href} aria={item.label} class={anchorTerminal()}>
              <span class={iconFlex()}>
                <Icon name={item.icon} class={siteConfig.navIconClass} />
                {item.label}
              </span>
            </Anchor>
          {/snippet}
        </SocialList>
      {/if}
    </WindowTerminal>

    <form method="dialog" class="flex justify-end p-2">
      <button class="btn btn-sm btn-primary">Got it!</button>
    </form>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>Close</button>
  </form>
</dialog>
