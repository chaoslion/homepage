import type { Attachment } from 'svelte/attachments';
import Typed, { type TypedOptions } from 'typed.js';
import TypeIt from 'typeit';

export function typeItTerminalLine(
  strings: string[],
  speed: number = 35,
): Attachment<HTMLElement> {
  return (element: HTMLElement) => {
    const instance = new TypeIt(element, {
      speed,
      deleteSpeed: 40,
      waitUntilVisible: false,
      loop: true,
      lifeLike: true,
      html: false,
      cursor: true,
      cursorChar: '▋',
    });
    strings.forEach((str, i) => {
      instance.type(str).pause(1250).delete();
      if (i < strings.length - 1) instance.pause(300);
    });
    instance.go();
    return () => {
      instance.destroy();
    };
  };
}

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
