<script lang="ts">
  import type { GetImageResult } from 'astro';
  import { onMount, type Snippet } from 'svelte';

  import { Image } from '#/components/ui';
  import { siteConfig } from '#content';

  interface Props {
    authorAvatar?: GetImageResult;
    status?: string;
    children: Snippet;
  }

  let { authorAvatar, status = undefined, children }: Props = $props();

  function slideInOnVisible(node: HTMLElement) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.remove(
            'opacity-0',
            '-translate-x-4',
            'translate-x-4',
            'translate-y-4',
          );
          node.classList.add('opacity-100', 'translate-y-0', 'translate-x-0');
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -50px 0px' },
    );

    observer.observe(node);
    return {
      destroy() {
        observer.disconnect();
      },
    };
  }

  const name = $derived(
    authorAvatar !== undefined ? siteConfig.authorName : 'You',
  );
  let currentTimeElement: HTMLTimeElement;

  onMount(() => {
    currentTimeElement.textContent = new Date().toDateString();
  });
</script>

<div
  use:slideInOnVisible
  class={[
    'chat font-mono transition-all duration-500',
    authorAvatar !== undefined
      ? 'chat-start translate-y-4 opacity-0'
      : 'chat-end translate-y-4 opacity-0',
  ]}
>
  {#if authorAvatar !== undefined}
    <div class="chat-image avatar avatar-online max-sm:hidden">
      <div class="w-10 rounded-full">
        <Image src={authorAvatar} label="Author Avatar" />
      </div>
    </div>
  {:else}
    <div class="chat-image avatar avatar-placeholder max-sm:hidden">
      <div class="bg-neutral text-neutral-content w-10 rounded-full">
        <span class="text-3xl">Y</span>
      </div>
    </div>
  {/if}
  <div class="chat-header">
    {name}
    <time bind:this={currentTimeElement} class="text-xs opacity-50"></time>
  </div>
  <div
    class={[
      'chat-bubble md:max-w-4/5',
      authorAvatar !== undefined
        ? 'chat-bubble-primary'
        : 'chat-bubble-secondary',
    ]}
  >
    <div
      class={[
        'prose',
        authorAvatar !== undefined
          ? 'text-primary-content prose-p:text-primary-content prose-strong:text-primary-content prose-ul:marker:text-primary-content prose-a:text-primary-content'
          : 'text-secondary-content prose-p:text-secondary-content',
      ]}
    >
      {@render children()}
    </div>
  </div>
  <div class="chat-footer opacity-75">{status ?? 'Delivered'}</div>
</div>
