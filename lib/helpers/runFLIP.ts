import { getDeltasFromRects } from './getDeltas';

/**
 * Calculate delta values and animate between them using FLIP
 * @param firstRect DOMRect values of the first position
 * @param lastRect DOMRect values of the last position
 * @param el Element that will be animated
 * @param options FLIP options
 */

export function runFLIP(
  firstRect,
  lastRect,
  el: Element,
  options: FLIPOptions = {
    duration: 300,
    easing: 'ease-in-out',
    direction: 'forwards',
    scale: true,
  }
) {
  const { dx, dy, dh, dw } = getDeltasFromRects(firstRect, lastRect);

  const animateFlip = el.animate(
    [
      {
        transformOrigin: 'top left',
        transform: `translate3d(${dx}px, ${dy}px, 0)  scale(${dw}, ${dh})`,
      },
      {
        transformOrigin: 'top left',
        transform: 'none',
      },
    ],
    {
      duration: options.duration,
      easing: options.easing,
      fill: 'both',
    }
  );

  if (options.direction === 'reverse') {
    animateFlip.reverse();
  } else {
    animateFlip.play();
  }

  if (options.done) {
    // @ts-ignore
    animateFlip.onfinish = options.done;
  }
}
