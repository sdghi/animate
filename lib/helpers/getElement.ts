/**
 * Return the DOM element using either a string or selector
 * @param el A string or DOM node
 * @param parent Parent to run querySelector defaults to document
 * @returns DOM Element
 */
export function getElement(
  el: Selector,
  parent: HTMLElement | Document = document
) {
  if (typeof el === 'string') {
    return parent.querySelector(el);
  }
  return el;
}

/**
 * Return a NodeList using either a string or selector
 * @param el A string or DOM node
 * @param parent Parent to run querySelectorAll defaults to document
 * @returns NodeList
 */
export function getAllElements(
  el: string,
  parent: HTMLElement | Document = document
) {
  if (typeof el === 'string') {
    return parent.querySelectorAll(el);
  }
  return el;
}
