import { Selector } from './../types';
import { getElement } from './getElement';

/**
 * Returns an object of deltas between two rects
 * @param first First rect
 * @param last Last rect
 * @returns Object of deltas
 */

export function getDeltasFromRects(firstRect: DOMRect, lastRect: DOMRect) {
  // Deltas
  const dx = firstRect.left - lastRect.left;
  const dy = firstRect.top - lastRect.top;
  let dh = firstRect.height / lastRect.height;
  let dw = firstRect.width / lastRect.width;

  return {
    dx,
    dy,
    dh,
    dw,
  };
}

/**
 * Returns an object of deltas between two elements
 * @param first First element
 * @param last Last Element
 * @returns Object of deltas
 */
export function getDeltasFromElements(first: Selector, last: Selector) {
  const firstRect = getElement(first).getBoundingClientRect();
  const lastRect = getElement(last).getBoundingClientRect();

  return getDeltasFromRects(firstRect, lastRect);
}
