<script lang="ts">
  import { iconFlex } from '#/lib/css';
  import type { NavLink } from '#/types/site';
  import { siteConfig } from '#content';

  import Icon from './Icon.svelte';

  interface Props {
    nav: NavLink;
    url: URL;
  }
  const { nav, url }: Props = $props();
</script>

<a
  href={nav.link.href}
  class={[
    iconFlex(),
    { 'menu-active': url.pathname.startsWith(nav.link.href) },
  ]}
>
  <Icon name={nav.icon} class={siteConfig.navIconClass} />
  {nav.link.label}
</a>
