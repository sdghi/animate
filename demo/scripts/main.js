import { Watcher, screen, flip, crossfade } from '../../lib';

const textBlockSection = new Watcher('.text-block');

// Have access the event of window.addEventListener
screen('>768', () => console.log('below tablet'));

textBlockSection.scroll(
	'enter',
	(el) => {
		flip(
			'.box',
			() => {
				const flipInner = document.querySelector('.text-block__inner');

				flipInner.classList.add('reverse');
			},
			{
				duration: 2000,
				done: () => {
					console.log('finished');
				},
			}
		);
	},
	{ rootMargin: '-50%' }
);

screen('<=768', (e) => {
	const galleryImages = document.querySelectorAll('.image-gallery__image');
	const featuredElement = document.querySelector('.image-gallery__featured');

	galleryImages.forEach((image, i) => {
		const currentSrc = image.getAttribute('src');
		image.addEventListener('click', () => {
			crossfade(
				`.image-gallery__image[data-key="${i + 1}"]`,
				'.image-gallery__featured',
				(el) => {
					el.style.visibility = 'visible';
					el.setAttribute('data-current', i + 1);
					el.setAttribute('src', currentSrc);
				}
			);
		});
	});

	featuredElement.addEventListener('click', () => {
		const currentIndex = featuredElement.getAttribute('data-current');

		crossfade(
			'.image-gallery__featured',
			`.image-gallery__image[data-key="${currentIndex}"]`,
			(el) => {
				el.style.visibility = 'visible';
			},
			{ duration: 400 }
		);
	});
});
