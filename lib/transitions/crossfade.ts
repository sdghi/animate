import { runFLIP, getElement } from '../helpers';
/**
 * Animate between two different elements
 * @param first Selector of first element
 * @param last Selector of last element
 * @param cb Callback function that has access to the last element
 * @param options FLIP animaiton options
 */

export function crossfade(
  first: Selector,
  last: Selector,
  cb: CallableFunction,
  options: FLIPOptions
) {
  const firstEl = getElement(first);
  const firstRect = firstEl.getBoundingClientRect();
  // @ts-ignore
  firstEl.style.visibility = 'hidden';

  const lastEl = getElement(last);

  cb(lastEl);

  const lastRect = lastEl.getBoundingClientRect();

  runFLIP(firstRect, lastRect, lastEl, options);
}
