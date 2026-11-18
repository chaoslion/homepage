import PhotoSwipeLightbox from 'photoswipe/lightbox';

class GalleryManager {
  lightbox: PhotoSwipeLightbox | null = null;

  init() {
    if (this.lightbox) {
      this.lightbox.destroy();
    }
    this.lightbox = new PhotoSwipeLightbox({
      gallery: 'div[data-pswp-gallery]',
      children: 'a[data-pswp]',
      pswpModule: () => import('photoswipe'),
      bgClickAction: 'close',
      tapAction: 'close',
    });
    // add event handlers here...
    // continue to init
    this.lightbox.init();
  }
}

export const galleryManager = new GalleryManager();
