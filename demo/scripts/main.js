import { Watcher, screen, flip, crossfade } from '../../lib';

const flipHeading = new Watcher('.flip__heading');

// Have access the event of window.addEventListener
screen('<=768', (e) => console.log('above tablet', e));
screen('>768', () => console.log('below tablet'));

flipHeading.scroll(
	'enter',
	(el) => {
		flip(
			'.box',
			() => {
				const flipInner = document.querySelector('.flip__inner');

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
	{ rootMargin: '-250px' }
);

const galleryImages = document.querySelectorAll('.gallery-image');
const featuredImage = document.querySelector('.featured-image');

galleryImages.forEach((image, i) => {
	const currentSrc = image.getAttribute('src');
	image.addEventListener('click', () => {
		crossfade(
			`.gallery-image[data-key="${i + 1}"]`,
			'.featured-image',
			(el) => {
				el.style.visibility = 'visible';
				el.setAttribute('data-current', i + 1);
				el.setAttribute('src', currentSrc);
			}
		);
	});
});

featuredImage.addEventListener('click', () => {
	const currentIndex = featuredImage.getAttribute('data-current');

	crossfade(
		'.featured-image',
		`.gallery-image[data-key="${currentIndex}"]`,
		(el) => {
			el.style.visibility = 'visible';
		}
	);
});