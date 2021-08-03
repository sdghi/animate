import { Selector } from '../types';
import { getElement } from '../helpers';

function setState(element: Element, transitionName: string, state: string) {
  element.setAttribute(`data-${transitionName}`, state);
}

export function mount(el: Selector) {
  const element = getElement(el);

  const transitionName = element.getAttribute('data-transition');

  // Remove inline styles previously set from the transitionend
  element.removeAttribute('style');

  const { clientHeight, clientWidth } = element;

  element.removeAttribute('aria-hidden');

  //@ts-ignore
  element.style = `
    visibility: visible;
    height: ${clientHeight}px;
    width: ${clientWidth}px;
  `;

  setState(element, transitionName, 'enter');

  element.addEventListener('transitionend', () => {
    //@ts-ignore
    element.style = `
    visibility: visible;
    height: ${clientHeight}px;
    width: ${clientWidth}px;
    `;
  });
}

export function unmount(el: Selector) {
  const element = getElement(el);

  const transitionName = element.getAttribute('data-transition');

  if (element)
    // Remove inline styles previously set from the transitionend
    element.removeAttribute('style');

  setState(element, transitionName, 'exit');

  element.setAttribute('aria-hidden', 'true');

  element.addEventListener('transitionend', () => {
    //@ts-ignore
    element.style = `
    visibility: hidden;
    height: 0px;
    width: 0px;
    padding: 0px;
    `;
  });
}

export function toggleMounting(el: Selector) {
  const element = getElement(el);
  const transitionName = element.getAttribute('data-transition');

  const transitionAttribute = element.getAttribute(`data-${transitionName}`);

  // Run the opposite of the current state
  if (!transitionAttribute || transitionAttribute === 'enter') {
    unmount(el);
  } else {
    mount(el);
  }
}
