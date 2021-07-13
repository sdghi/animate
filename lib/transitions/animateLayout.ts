import { FLIPOptions, Selector } from '../types';
import { runFLIP, getElement } from '../helpers';

type LayoutCallback = (parent: Element) => void;

/**
 *
 * @param parent Query string for the parent
 * @param childrenQueryString Query string for all animatable child elements
 * @param cb Callback function to handle the layout change
 */
export function animateLayout(
	parent: Selector,
	childrenQueryString: string,
	cb: LayoutCallback,
	options: FLIPOptions
) {
	const parentEl = getElement(parent);

	const childElements = parentEl.querySelectorAll(childrenQueryString);

	// Calculate all the DOMRects of the children with the first loop
	let firstRects = [];

	Array.from(childElements).map((child) => {
		const firstRect = child.getBoundingClientRect();
		firstRects.push(firstRect);
	});

	cb(parentEl);

	// Run FLIP after the layout change to calculate the second DOMRect
	childElements.forEach((child, i) => {
		const secondRect = child.getBoundingClientRect();
		runFLIP(firstRects[i], secondRect, child, options);
	});
}
