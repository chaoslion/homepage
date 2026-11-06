<script lang="ts">
  import { onMount, type Snippet } from 'svelte';
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
  }

  let {
    avatar,
    class: className,
    avatarClass,
    bubbleClass,
    children,
    name,
    status = undefined,
  }: Props = $props();
  let currentTimeElement: HTMLTimeElement;
  onMount(() => {
    currentTimeElement.textContent = new Date().toDateString();
  });
</script>

<div
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
  <div class="chat-header">
    {name}
    <time bind:this={currentTimeElement} class="text-xs opacity-50"></time>
  </div>
  <div class={['chat-bubble md:max-w-4/5', bubbleClass]}>
    {@render children()}
  </div>
  {#if status !== undefined}
    <div class="chat-footer opacity-75">{status}</div>
  {/if}
</div>
