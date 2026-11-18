<script lang="ts">
  import type { GetImageResult, ImageMetadata } from 'astro';

  import {
    Anchor,
    AnchorText,
    Heading,
    HeadingFlip,
    Image,
  } from '#/components/ui';
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
        title="Building things that"
        variants={siteConfig.heroTitleBuildingVariants}
      />
      <Heading tag="h2">Fixing things that don't.</Heading>
      <p class="py-6 text-xl">
        Welcome! I'm {siteConfig.authorName}, a computer engineer from Germany.
        I build resilient embedded systems, from firmware to the cloud, designed
        to run for years. Check out <AnchorText
          href="/now"
          text="what I'm doing now"
        />
        or the
        <AnchorText href="/uses" text="tools and tech I use" />. This blog is
        where I share practical insights, hard-learned lessons, and honest takes
        on embedded, systems, and software engineering.
      </p>
      <div class="flex flex-wrap items-center gap-3 max-lg:justify-center">
        <Anchor href="/about" class="btn btn-primary btn-lg"
          >More about me</Anchor
        >
      </div>
    </div>
  </div>
</div>
