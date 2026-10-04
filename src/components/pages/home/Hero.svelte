<script lang="ts">
  import type { GetImageResult, ImageMetadata } from 'astro';

  import { Heading, HeadingFlip, Image } from '#/components/ui';
  import Anchor from '#/components/ui/Anchor.svelte';
  import { siteConfig } from '#content';

  interface Props {
    profilePicture: GetImageResult;
  }
  const { profilePicture }: Props = $props();
</script>

<div class="hero bg-base-100 py-4">
  <div class="hero-content flex-col gap-8 lg:flex-row-reverse lg:gap-16">
    <Anchor href="/about" class="aura aura-gold duration-15000">
      <Image
        src={profilePicture}
        label="Author Picture"
        class="rounded-box aspect-square max-w-55 object-cover shadow-xl sm:max-w-xs lg:max-w-sm"
      />
    </Anchor>
    <div class="text-center lg:text-left">
      <HeadingFlip
        tag="h1"
        title="Building Things That"
        variants={siteConfig.heroTitleBuildingVariants}
      />
      <Heading tag="h2">Fixing Things That Don't.</Heading>
      <p class="py-6 text-xl">
        Welcome! I`m Alex. I spend my days writing production-grade code,
        architecting systems, and navigating the messy reality of software
        engineering. This blog is where I share practical insights, hard-learned
        lessons, and honest takes on computer science and software development.
      </p>
      <a href="/about" class="btn btn-primary">Who's Writing This?</a>
    </div>
  </div>
</div>
