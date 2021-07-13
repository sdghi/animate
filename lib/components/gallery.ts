import { Selector } from '../types';
import { getElement, getAllElements, loop } from '../helpers';

interface GalleryOptions {
	itemSelector: string;
	nextSelector: string;
	previousSelector: string;
	start: number;
}

const options: GalleryOptions = {
	itemSelector: '.gallery__item',
	nextSelector: '.gallery__next',
	previousSelector: '.gallery__previous',
	start: 0,
};

export class Gallery {
	el: Selector;
	options: GalleryOptions;
	items: NodeList;
	currentIndex: number;

	constructor(el: Selector, galleryOptions = options) {
		this.el = getElement(el);
		this.options = galleryOptions;
		this.items = getAllElements(galleryOptions.itemSelector);
		this.currentIndex = galleryOptions.start;
	}

	node() {
		return this.el;
	}

	getIndex() {
		return this.currentIndex;
	}

	getCurrent() {
		return this.items[this.currentIndex];
	}

	next(cb: CallableFunction) {
		this.currentIndex = loop([0, this.items.length - 1]).inc(
			this.currentIndex,
			1
		);

		cb(this.currentIndex);
	}

	previous(cb: CallableFunction) {
		this.currentIndex = loop([0, this.items.length - 1]).dec(
			this.currentIndex,
			1
		);

		cb(this.currentIndex);
	}

	log() {
		console.log({
			el: this.el,
			options: this.options,
			items: this.items,
		});
	}
}
