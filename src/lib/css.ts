import type { HeadingName } from '#/types/components';

export const headingClasses: Record<HeadingName, string> = {
  h1: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight',
  h2: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight',
  h3: 'text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-normal',
  h4: 'text-base sm:text-lg md:text-xl lg:text-2xl font-semibold tracking-normal',
  h5: 'text-sm sm:text-base md:text-lg lg:text-xl font-semibold tracking-normal',
  h6: 'text-xs sm:text-sm md:text-base lg:text-lg font-medium tracking-wide',
};

export function iconFlex() {
  return 'inline-flex gap-1 items-center';
}

export function anchorTerminal() {
  return 'flex items-center w-full hover:bg-primary hover:text-primary-content';
}

export function anchorInline() {
  return `link link-hover link-primary`;
}

export function anchorInlineIcon() {
  return `${iconFlex()} ${anchorInline()}`;
}
