<script lang="ts">
  import { actions } from 'astro:actions';
  import type { z } from 'astro/zod';
  import type { ClassValue } from 'svelte/elements';

  import type { ContactMailSchema } from '#/data/actions';
  import { anchorInline } from '#/lib/css';

  import Action from './Action.svelte';
  import Anchor from './Anchor.svelte';

  interface Props {
    type?: z.infer<typeof ContactMailSchema>;
    anchorClass?: ClassValue;
    text?: string;
  }
  const { type = 'author', anchorClass, text }: Props = $props();

  let contactPromise = $derived(actions.getContactMail(type));
</script>

<Action promise={contactPromise}>
  {#snippet actionFn(mail)}
    <Anchor href={`mailto:${mail}`} class={[anchorClass ?? anchorInline()]}>
      {text ?? mail}
    </Anchor>
  {/snippet}
</Action>
