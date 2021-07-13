import { Selector } from '../types';

/**
 *
 * @param el A string or DOM node
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

export function getAllElements(
	el: string,
	parent: HTMLElement | Document = document
) {
	if (typeof el === 'string') {
		return parent.querySelectorAll(el);
	}
	return el;
}
