import { runFLIP } from './runFLIP';

type LayoutCallback = (parent: Element, child: Element) => void;

export function animateLayout(
	parent: string,
	childrenQueryString: string,
	cb: LayoutCallback
) {
	const parentEl = document.querySelector(parent);
	const parentRect = parentEl.getBoundingClientRect();

	const childElements = parentEl.querySelectorAll(childrenQueryString);

	childElements.forEach((child) => {
		const childFirstRect = child.getBoundingClientRect();
		cb(parentEl, child);
		const childSecondRect = child.getBoundingClientRect();
		runFLIP(childFirstRect, childSecondRect, child);
	});
}
