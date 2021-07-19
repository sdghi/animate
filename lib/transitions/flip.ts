import { getElement, runFLIP } from '../helpers';
import { FLIPOptions, Selector } from '../types';

/**
 * Animate an element using FLIP
 * @param element Selector of the first element
 * @param cb An optional function that can be run to switch the layout between the first and last
 * @param options An object that has access to duration, easing and playState
 */

export function flip(
  element: Selector,
  cb: CallableFunction,
  options: FLIPOptions
) {
  const el = getElement(element);
  const firstRect = el.getBoundingClientRect();

  cb(el);

  const lastRect = el.getBoundingClientRect();

  runFLIP(firstRect, lastRect, el, options);
}
