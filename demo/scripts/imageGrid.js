import { crossfade } from '../../lib';

const galleryImages = document.querySelectorAll('.image-gallery__image');
const featuredElement = document.querySelector('.image-gallery__featured');
const featuredContainer = document.querySelector(
  '.image-gallery__featured-container'
);

galleryImages.forEach((image, i) => {
  const currentSrc = image.getAttribute('src');
  image.addEventListener('click', () => {
    crossfade(
      `.image-gallery__image[data-key="${i + 1}"]`,
      '.image-gallery__featured',
      (el) => {
        featuredContainer.classList.add('visible');
        console.log('running crossfade');
        el.style.visibility = 'visible';
        el.setAttribute('data-current', i + 1);
        el.setAttribute('src', currentSrc);
      }
    );
  });
});

featuredContainer.addEventListener('click', () => {
  const currentIndex = featuredElement.getAttribute('data-current');

  crossfade(
    '.image-gallery__featured',
    `.image-gallery__image[data-key="${currentIndex}"]`,
    (el) => {
      featuredContainer.classList.remove('visible');
      el.style.visibility = 'visible';
    },
    { duration: 400 }
  );
});
