<script lang="ts">
  import { actions } from 'astro:actions';
  import type { Snippet } from 'svelte';
  import type { ClassValue } from 'svelte/elements';

  import type { SocialLink } from '#/types/site';

  import Action from './Action.svelte';

  interface Props {
    listClass?: ClassValue;
    itemFn: Snippet<[SocialLink]>;
  }
  const { listClass, itemFn }: Props = $props();

  let contactPromise = actions.getContactSocial({});
</script>

<Action promise={contactPromise}>
  {#snippet actionFn(socialLinks)}
    <ul class={listClass}>
      {#each socialLinks as item}
        <li>
          {@render itemFn(item)}
        </li>
      {/each}
    </ul>
  {/snippet}
</Action>
