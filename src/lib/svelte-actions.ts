import type { Action } from 'svelte/action';

export const slideInOnVisible: Action<HTMLElement> = (node) => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        node.classList.remove(
          'opacity-0',
          '-translate-x-4',
          'translate-x-4',
          'translate-y-4',
        );
        node.classList.add('opacity-100', 'translate-y-0', 'translate-x-0');
        observer.disconnect();
      }
    },
    { rootMargin: '0px 0px -50px 0px' },
  );

  observer.observe(node);
  return {
    destroy() {
      observer.disconnect();
    },
  };
};
