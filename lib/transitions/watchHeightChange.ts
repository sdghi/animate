import { transformHeightDeltas } from './animateHeightAuto';

const config = { attributes: true, childList: true, subtree: true };

/**
 * Watch and animate height changes using the Mutation Observer
 * @param element Element that is being watched for height change
 * @param cb Callback that can be run after the height change
 * @returns Mutation Observer observer and disconect functions
 */

export function watchHeightChange(element, cb: CallableFunction) {
  let beforeHeight = element.clientHeight;

  const observerCallback = (mutations) => {
    for (const mutation of mutations) {
      const afterHeight = element.clientHeight;
      transformHeightDeltas(element, beforeHeight, afterHeight);
      beforeHeight = afterHeight;

      if (cb) {
        cb({ mutation, element, beforeHeight, afterHeight });
      }
    }
  };

  const observer = new MutationObserver(observerCallback);

  return {
    observe: () => observer.observe(element, config),
    disconnect: () => observer.disconnect(),
  };
}
