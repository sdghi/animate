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

  public node() {
    return this.el;
  }

  public getItems() {
    return this.items;
  }

  public getIndex() {
    return this.currentIndex;
  }

  public getCurrent() {
    return { index: this.currentIndex, element: this.items[this.currentIndex] };
  }

  public getNext() {
    const nextIndex = loop([0, this.items.length - 1]).inc(
      this.currentIndex,
      1
    );

    return { index: nextIndex, element: this.items[nextIndex] };
  }

  public getPrevious() {
    const previousIndex = loop([0, this.items.length - 1]).dec(
      this.currentIndex,
      1
    );

    return { index: previousIndex, element: this.items[previousIndex] };
  }

  public getItem(index: number) {
    return { index, element: this.items[index] };
  }

  public next(cb?: CallableFunction) {
    this.currentIndex = loop([0, this.items.length - 1]).inc(
      this.currentIndex,
      1
    );

    if (cb) {
      cb(this.currentIndex);
    }
  }

  public previous(cb?: CallableFunction) {
    this.currentIndex = loop([0, this.items.length - 1]).dec(
      this.currentIndex,
      1
    );

    if (cb) {
      cb(this.currentIndex);
    }
  }

  public log() {
    console.log({
      el: this.el,
      options: this.options,
      items: this.items,
      currentIndex: this.currentIndex,
      currentItem: this.items[this.currentIndex],
    });
  }
}
