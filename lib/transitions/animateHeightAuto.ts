import { WAAPIOptions } from '../types';

const defaultOptions: WAAPIOptions = {
  duration: 150,
  easing: 'linear',
};

export function animateHeightAuto(el: Element, cb: CallableFunction) {
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
    defaultOptions
  );
}
