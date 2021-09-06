import { Watcher, Gallery } from '../../lib';

const heroGallery = new Gallery('.hero-gallery', {
  itemSelector: '.hero-gallery__item',
  start: 0,
  timer: 5000,
  timerFn: nextSlide,
});

const heroGalleryNext = new Watcher('.hero-gallery__next');
const heroGalleryPrev = new Watcher('.hero-gallery__previous');

function nextSlide() {
  const current = heroGallery.getCurrent().element;
  const next = heroGallery.getNext().element;
  current.setAttribute('data-state', 'hidden');
  next.setAttribute('data-state', 'visible');
  heroGallery.next();
}

function previousSlide() {
  const current = heroGallery.getCurrent().element;
  const prev = heroGallery.getPrevious().element;
  current.setAttribute('data-state', 'hidden');
  prev.setAttribute('data-state', 'visible');
  heroGallery.previous();
}

heroGallery.initTimer(() => {
  nextSlide();
});

heroGalleryNext.click(() => {
  heroGallery.resetTimer();
  nextSlide();
});

heroGalleryPrev.click(() => {
  heroGallery.resetTimer();
  previousSlide();
});
