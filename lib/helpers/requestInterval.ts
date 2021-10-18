// @ts-nocheck

/**
 * RAF equivalent to setInterval
 * @param cb Callback function to run
 * @param interval Duration between running callbacks
 */

export function requestInterval(cb: CallableFunction, interval: number) {
  let start = new Date().getTime();
  let handle: any = new Object();

  function animate() {
    let current = new Date().getTime();
    let dt = current - start;

    if (dt >= interval) {
      cb();
      start = new Date().getTime();
    }

    handle.value = requestAnimationFrame(animate);
  }

  handle.value = requestAnimationFrame(animate);
  return handle;
}

/**
 * RAF equivalent to clearInterval
 * @param handle The instance of the requestInterval
 */

export function clearRequestInterval(handle) {
  window.cancelAnimationFrame
    ? window.cancelAnimationFrame(handle.value)
    : window.webkitCancelAnimationFrame
    ? window.webkitCancelAnimationFrame(handle.value)
    : window.webkitCancelRequestAnimationFrame
    ? window.webkitCancelRequestAnimationFrame(
        handle.value
      ) /* Support for legacy API */
    : window.mozCancelRequestAnimationFrame
    ? window.mozCancelRequestAnimationFrame(handle.value)
    : window.oCancelRequestAnimationFrame
    ? window.oCancelRequestAnimationFrame(handle.value)
    : window.msCancelRequestAnimationFrame
    ? window.msCancelRequestAnimationFrame(handle.value)
    : clearInterval(handle);
}
