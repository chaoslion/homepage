<script lang="ts">
  import type { GetImageResult } from 'astro';
  import type { Attachment } from 'svelte/attachments';
  import type { ClassValue } from 'svelte/elements';

  interface Props {
    src: GetImageResult;
    label: string;
    class?: ClassValue;
  }
  const { src: image, label, class: className }: Props = $props();

  function removeSkeleton(): Attachment<HTMLImageElement> {
    return (element: HTMLImageElement) => {
      const onLoad = () => element.classList.remove('skeleton');
      const onError = () => element.classList.remove('text-transparent');
      if (element.complete) {
        if (element.naturalWidth > 0) onLoad();
        else onError();
      }
      element.addEventListener('load', onLoad);
      element.addEventListener('error', onError);
      return () => {
        element.removeEventListener('load', onLoad);
        element.removeEventListener('error', onError);
      };
    };
  }
</script>

<img
  src={image.src}
  alt={label}
  class={['skeleton text-transparent', className]}
  srcset={image.srcSet.values.length > 0 ? image.srcSet.attribute : undefined}
  {...image.attributes}
  {@attach removeSkeleton()}
/>
