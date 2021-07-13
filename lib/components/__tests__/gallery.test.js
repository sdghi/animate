/**
 * @jest-environment jsdom
 */

const { Gallery } = require('../gallery');

describe('Gallery', () => {
	const body = `<div className="gallery">
			<div class="gallery__item">1</div>
			<div class="gallery__item">2</div>
			<div class="gallery__item">3</div>
		</div>`;

	test('It should have a DOM Element', () => {
		document.body.innerHTML = body;

		const galleryElement = document.querySelector('.gallery');

		const stringGallery = new Gallery('.gallery');
		const domGallery = new Gallery(galleryElement);

		expect(stringGallery.node()).toEqual(galleryElement);
		expect(domGallery.node()).toEqual(galleryElement);
	});

	test('Next should increment the current index', () => {
		document.body.innerHTML = body;

		const gallery = new Gallery('.gallery');

		gallery.next(() => {});

		expect(gallery.getIndex()).toBe(1);
	});

	test('Previous should decrement the current index', () => {
		document.body.innerHTML = body;

		const gallery = new Gallery('.gallery');

		gallery.previous(() => {});

		expect(gallery.getIndex()).toBe(2);
	});

	test('getCurrent should return the current element', () => {
		document.body.innerHTML = body;

		const gallery = new Gallery('.gallery');
		const galleryItems = document.querySelectorAll('.gallery__item');

		// Look for gallery items at index 1
		gallery.next(() => {});

		expect(gallery.getCurrent()).toEqual(galleryItems[1]);
	});

	// TODO: Previous and Next cb should have access to the currentIndex and current element
});
