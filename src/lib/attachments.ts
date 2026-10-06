import type { Attachment } from 'svelte/attachments';
import Typed, { type TypedOptions } from 'typed.js';

export function typedTerminalLine(
  strings: string[],
  backDelay: number = 1250,
): Attachment<HTMLSpanElement> {
  return (element: HTMLSpanElement) => {
    const typedOptions: TypedOptions = {
      strings: strings,
      backSpeed: 40,
      autoInsertCss: false,
      typeSpeed: 35,
      backDelay: backDelay,
      smartBackspace: false,
      loop: true,
      showCursor: true,
      cursorChar: '▋',
      contentType: 'text',
    };
    const instance = new Typed(element, typedOptions);
    return () => {
      instance.destroy();
    };
  };
}
