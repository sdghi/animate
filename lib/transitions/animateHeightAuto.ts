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
  cb: CallableFunction = () => null,
  options: WAAPIOptions = defaultOptions
) {
  const el = getElement(element);

  const beforeHeight = el.clientHeight;

  cb();

  const afterHeight = el.clientHeight;

  transformHeightDeltas(el, beforeHeight, afterHeight, options);
}

/**
 * Transform the height an element based on the delatas of two height
 * @param element Animated element
 * @param beforeHeight Starting height
 * @param afterHeight Ending height
 * @param options WAAPI options for the animation
 */
export function transformHeightDeltas(
  element: Element,
  beforeHeight: number,
  afterHeight: number,
  options: WAAPIOptions = defaultOptions
) {
  element.animate(
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
