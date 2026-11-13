<script lang="ts">
  import Chat from './Chat.svelte';

  interface Props {
    question: string;
    slug: string;
    delivered?: boolean;
  }

  let { question, slug, delivered = false }: Props = $props();
</script>

<Chat
  class="chat-end"
  avatarClass="avatar-placeholder"
  bubbleClass="chat-bubble-primary max-w-3xl leading-relaxed xl:text-lg"
  name="You"
  status={delivered ? 'Delivered' : undefined}
  id={slug}
>
  {#snippet avatar()}
    <div class="bg-primary text-primary-content w-10 rounded-full">
      <span class="text-3xl">Y</span>
    </div>
  {/snippet}
  {question}
</Chat>
