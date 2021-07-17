import { Selector } from '../types';
import { getElement, getAllElements, loop } from '../helpers';

interface GalleryOptions {
  itemSelector: string;
  start: number;
}

export class Gallery {
  el: any;
  options: GalleryOptions;
  items: NodeList;
  currentIndex: number;

  constructor(el: Selector, galleryOptions: GalleryOptions) {
    this.options = galleryOptions;
    this.el = getElement(el);
    this.items = getAllElements(galleryOptions.itemSelector, this.el);
    this.currentIndex = this.options.start;
  }

  node() {
    return this.el;
  }

  getItems() {
    return this.items;
  }

  getIndex() {
    return this.currentIndex;
  }

  getCurrent() {
    return { index: this.currentIndex, ...this.items[this.currentIndex] };
  }

  getNext() {
    const nextIndex = loop([0, this.items.length - 1]).inc(
      this.currentIndex,
      1
    );

    return { index: nextIndex, ...this.items[nextIndex] };
  }

  getPrevious() {
    const previousIndex = loop([0, this.items.length - 1]).dec(
      this.currentIndex,
      1
    );

    return { index: previousIndex, ...this.items[previousIndex] };
  }

  getItem(index: number) {
    return { index, ...this.items[index] };
  }

  next(cb: CallableFunction) {
    this.currentIndex = loop([0, this.items.length - 1]).inc(
      this.currentIndex,
      1
    );

    if (cb) {
      cb(this.currentIndex);
    }
  }

  previous(cb: CallableFunction) {
    this.currentIndex = loop([0, this.items.length - 1]).dec(
      this.currentIndex,
      1
    );

    if (cb) {
      cb(this.currentIndex);
    }
  }

  log() {
    console.log({
      el: this.el,
      options: this.options,
      items: this.items,
    });
  }
}
