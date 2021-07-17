import { WAAPIOptions } from '../types';

const defaultOptions: WAAPIOptions = {
  duration: 300,
  easing: 'cubic-bezier(0.46,0.03,0.52,0.96)',
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
