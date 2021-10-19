/**
 * @param el Element thats scroll percentage is being watched
 * @param cb Callback function that has a reference to the scroll percentage
 */

export function percentScrolled(el: HTMLElement, cb: CallableFunction) {
  function watch() {
    const elRect = el.getBoundingClientRect();

    const distanceScrolled = Math.abs(elRect.top);
    const deltaTop = distanceScrolled / elRect.height;
    const percentScrolled = deltaTop * 100;

    cb(percentScrolled);
  }

  document.addEventListener("scroll", watch);
}
