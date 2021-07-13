import { Selector } from '../types';

/**
 *
 * @param el A string or DOM node
 */
export function getElement(el: Selector) {
	if (typeof el === 'string') {
		return document.querySelector(el);
	}
	return el;
}
