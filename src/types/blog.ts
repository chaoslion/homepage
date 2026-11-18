import type { GetImageResult } from 'astro';

import type { Link } from '#/types/generic';

export type AdditionalPostSectionType = 'resources' | 'related' | 'series';

export interface TreeLinkItem {
  link: Link;
  depth: number;
}

export interface GalleryImageProps {
  original: GetImageResult;
  preview: GetImageResult;
}
