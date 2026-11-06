<script lang="ts">
  import Chat from './Chat.svelte';

  interface Props {
    question: string;
  }

  let { question }: Props = $props();
</script>

<Chat
  class="chat-end"
  avatarClass="avatar-placeholder"
  bubbleClass="chat-bubble-primary"
  name="You"
  status="Delivered"
>
  {#snippet avatar()}
    <div class="bg-primary text-primary-content w-10 rounded-full">
      <span class="text-3xl">Y</span>
    </div>
  {/snippet}
  <div class="prose text-primary-content text-sm leading-relaxed">
    {question}
  </div>
</Chat>
