<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ClassValue } from 'svelte/elements';

  import { slideInOnVisible } from '#/lib/actions';

  interface Props {
    avatar: Snippet;
    class: ClassValue;
    avatarClass: ClassValue;
    bubbleClass: ClassValue;
    children: Snippet;
    name: string;
    status?: string;
    id?: string;
  }

  let {
    avatar,
    class: className,
    avatarClass,
    bubbleClass,
    children,
    name,
    status = undefined,
    id = undefined,
  }: Props = $props();
</script>

<div
  {id}
  use:slideInOnVisible
  class={[
    'chat',
    className,
    'translate-y-4 opacity-0 motion-safe:transition-all motion-safe:duration-500',
  ]}
>
  <div class={['chat-image max-sm:hidden', 'avatar', avatarClass]}>
    {@render avatar()}
  </div>
  <div class="chat-header text-sm">
    {name}
  </div>
  <div class={['chat-bubble w-fit max-w-[85%]', bubbleClass]}>
    {@render children()}
  </div>
  {#if status !== undefined}
    <div class="chat-footer text-sm opacity-80">{status}</div>
  {/if}
</div>
