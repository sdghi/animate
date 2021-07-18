import { Watcher, Gallery } from '../../lib';

const heroGallery = new Gallery('.hero-gallery', {
  itemSelector: '.hero-gallery__item',
  start: 0,
});

const heroGalleryNext = new Watcher('.hero-gallery__next');
const heroGalleryPrev = new Watcher('.hero-gallery__previous');

heroGalleryNext.click(() => {
  const current = heroGallery.getCurrent().element;
  const next = heroGallery.getNext().element;
  current.setAttribute('data-state', 'hidden');
  next.setAttribute('data-state', 'visible');
  heroGallery.next();
});

heroGalleryPrev.click(() => {
  const current = heroGallery.getCurrent().element;
  const prev = heroGallery.getPrevious().element;
  current.setAttribute('data-state', 'hidden');
  prev.setAttribute('data-state', 'visible');
  heroGallery.previous();
});
