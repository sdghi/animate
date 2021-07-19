import { Selector } from './../types';
import { getElement } from './getElement';

/**
 * Returns and object of deltas between two elements
 * @param first
 * @param last
 * @returns Object
 */

export function getDeltas(first: Selector, last: Selector) {
  const firstRect = getElement(first).getBoundingClientRect();
  const lastRect = getElement(last).getBoundingClientRect();

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
