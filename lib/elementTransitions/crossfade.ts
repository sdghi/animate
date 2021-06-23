import { runFLIP } from './runFLIP';
import { FLIPOptions } from '../types';

export function crossfade(
	first,
	last,
	cb,
	options: FLIPOptions = {
		duration: 300,
		easing: 'ease-in-out',
		direction: 'forwards',
	}
) {
	const firstEl = document.querySelector(first);
	const firstRect = firstEl.getBoundingClientRect();
	first.style.visibility = 'hidden';

	cb();

	const lastEl = document.querySelector(last);
	const lastRect = lastEl.getBoundingClientRect();

	runFLIP(firstRect, lastRect, lastRect, options);
}
