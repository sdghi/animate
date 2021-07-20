import { Selector } from './../types';
import { WAAPIOptions } from '../types';
import { getElement } from '../helpers';

const defaultOptions: WAAPIOptions = {
  duration: 150,
  easing: 'linear',
};

/**
 * Animate the height of an element during layout changes
 * @param el Animating element
 * @param cb Callback function that adjusts layout
 * @param options WAAPI options for that animation
 */
export function animateHeightAuto(
  element: Selector,
  cb: CallableFunction,
  options = defaultOptions
) {
  const el = getElement(element);

  const beforeHeight = el.clientHeight;

  cb();

  const afterHeight = el.clientHeight;

  el.animate(
    [
      {
        transformOrigin: 'top left',
        height: beforeHeight + 'px',
      },
      {
        transformOrigin: 'top left',
        height: afterHeight + 'px',
      },
    ],
    options
  );
}
