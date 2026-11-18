import { galleryManager } from './gallery';
import { spinnerManager } from './spinner.svelte';
import { themeManager } from './theme.svelte';

const ASTRO_EVENTS = ['after-swap', 'before-preparation', 'page-load'];

export async function siteInit() {
  // run immediately on initial page load
  themeManager.init();
  ASTRO_EVENTS.forEach((event) => {
    document.addEventListener(`astro:${event}`, () => {
      switch (event) {
        case 'after-swap':
          // run after view transition
          themeManager.applyFromStorage();
          break;
        case 'before-preparation':
          // run before view transition
          spinnerManager.show();
          break;
        case 'page-load':
          // run everytime page finishes loading
          spinnerManager.hide();
          galleryManager.init();
          break;
      }
    });
  });
}
