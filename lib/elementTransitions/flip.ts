import { runFLIP } from './runFLIP';
import { FLIPOptions } from '../types';

/**
 *
 * @param element Selector of the first element
 * @param cb An optional function that can be run to switch the layout between the first and last
 * @param options An object that has access to duration, easing and playState
 */

export function flip(
	element: string,
	cb: CallableFunction,
	options: FLIPOptions = {
		duration: 300,
		easing: 'ease-in-out',
		direction: 'forwards',
	}
) {
	const el = document.querySelector(element);
	const firstRect = el.getBoundingClientRect();

	cb(el);

	const lastRect = el.getBoundingClientRect();

	runFLIP(firstRect, lastRect, el, options);
}
