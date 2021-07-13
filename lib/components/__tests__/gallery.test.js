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

	test('Running getCurrent() after next() should return the current element', () => {
		document.body.innerHTML = body;

		const gallery = new Gallery('.gallery');
		const galleryItems = document.querySelectorAll('.gallery__item');

		// Look for gallery items at index 1
		gallery.next(() => {});

		const nextItem = { index: 1, ...galleryItems[1] };

		expect(gallery.getCurrent()).toEqual(nextItem);
	});

	test('Running getCurrent() after previous() should return the current element', () => {
		document.body.innerHTML = body;

		const gallery = new Gallery('.gallery');
		const galleryItems = document.querySelectorAll('.gallery__item');

		// Look for gallery items at the last index
		gallery.previous(() => {});

		const previousItem = { index: 2, ...galleryItems[2] };

		expect(gallery.getCurrent()).toEqual(previousItem);
	});

	test('Running getNext() should return the next element', () => {
		document.body.innerHTML = body;

		const gallery = new Gallery('.gallery');
		const galleryItems = document.querySelectorAll('.gallery__item');

		const nextItem = { index: 1, ...galleryItems[1] };

		expect(gallery.getNext()).toEqual(nextItem);
	});

	test('Running getPrevious() should return the previous element', () => {
		document.body.innerHTML = body;

		const gallery = new Gallery('.gallery');
		const galleryItems = document.querySelectorAll('.gallery__item');

		gallery.next(() => {});
		const previousItem = { index: 0, ...galleryItems[0] };

		expect(gallery.getPrevious()).toEqual(previousItem);
	});
});
