<script lang="ts">
  import type { GetImageResult } from 'astro';
  import type { Snippet } from 'svelte';

  import { Image } from '#/components/ui';
  import { siteConfig } from '#content';

  import Chat from './Chat.svelte';

  interface Props {
    avatar: GetImageResult;
    context?: string;
    children: Snippet;
  }

  let { avatar: authorAvatar, context = undefined, children }: Props = $props();
</script>

<Chat
  class="chat-start"
  avatarClass="avatar-online"
  bubbleClass="chat-bubble-neutral"
  name={siteConfig.authorName}
  status={context}
>
  {#snippet avatar()}
    <div class="w-10 rounded-full">
      <Image src={authorAvatar} label="Author Avatar" />
    </div>
  {/snippet}
  <div
    class={[
      'text-sm leading-relaxed',
      'text-neutral-content',
      'prose',
      'prose-p:text-neutral-content',
      'prose-strong:text-neutral-content',
      'prose-a:text-neutral-content',
    ]}
  >
    {@render children()}
  </div>
</Chat>
