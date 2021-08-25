import { transformHeightDeltas, defaultOptions } from './animateHeightAuto';

const config = {
  attributes: true,
  childList: true,
  subtree: true,
  characterData: true,
};

/**
 * Watch and animate height changes using the Mutation Observer
 * @param element Element that is being watched for height change
 * @param cb Callback that can be run after the height change
 * @returns Mutation Observer observer and disconect functions
 */

interface WatchChangeOptions extends WAAPIOptions {
  subtree?: boolean;
  childList?: boolean;
  attributes?: boolean;
  attributeFilter?: [string];
  attributeOldValue?: boolean;
  charaterData?: boolean;
  characterDataOldValue?: boolean;
}

export function watchHeightChange(
  element,
  cb: CallableFunction,
  options: WatchChangeOptions = { ...defaultOptions, ...config }
) {
  let beforeHeight = element.clientHeight;

  const observerCallback = (mutations) => {
    for (const mutation of mutations) {
      const afterHeight = element.clientHeight;
      transformHeightDeltas(element, beforeHeight, afterHeight, options);
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
