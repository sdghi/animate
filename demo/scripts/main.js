import { Watcher, flip, crossfade, animateLayout, screen } from '../../lib';

const textBlockSection = new Watcher('.text-block');
const box = document.querySelector('.box');

textBlockSection.scroll(
	'enter',
	(el) => {
		flip(
			box,
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

// const cardsSection = new Watcher('.cards');

// cardsSection.scroll('enter', () => {
// 	console.log('entered');
// 	animateLayout(
// 		'.cards',
// 		'.cards__card',
// 		(parent) => {
// 			parent.classList.add('flex');
// 		},
// 		{ duration: 2000 }
// 	);
// });
