/**
 *
 * @param el A string or DOM node
 */
export function getElement(el: string | Element) {
	if (typeof el === 'string') {
		return document.querySelector(el);
	}
	return el;
}
