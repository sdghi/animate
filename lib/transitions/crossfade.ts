import { runFLIP, getElement } from '@/helpers';
import { FLIPOptions, Selector } from '@/types';

/**
 *
 * @param first Selector of first element
 * @param last Selector of last element
 * @param cb Callback function that has access to the last element
 * @param options FLIP animaiton options
 */

export function crossfade(
	first: Selector,
	last: Selector,
	cb: CallableFunction,
	options: FLIPOptions
) {
	const firstEl = getElement(first);
	const firstRect = firstEl.getBoundingClientRect();
	// @ts-ignore
	firstEl.style.visibility = 'hidden';

	const lastEl = getElement(last);
	const lastRect = lastEl.getBoundingClientRect();

	cb(lastEl);

	runFLIP(firstRect, lastRect, lastEl, options);
}
