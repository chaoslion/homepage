<script lang="ts">
  import Chat from './Chat.svelte';

  interface Props {
    question: string;
    slug: string;
  }

  let { question, slug }: Props = $props();
</script>

<Chat
  class="chat-end"
  avatarClass="avatar-placeholder"
  bubbleClass="chat-bubble-primary"
  name="You"
  id={slug}
>
  {#snippet avatar()}
    <div class="bg-primary text-primary-content w-10 rounded-full">
      <span class="text-3xl">Y</span>
    </div>
  {/snippet}
  <p class="leading-relaxed">
    {question}
  </p>
</Chat>
