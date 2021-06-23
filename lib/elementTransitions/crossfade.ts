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
	firstEl.style.visibility = 'hidden';
	const firstRect = firstEl.getBoundingClientRect();

	const lastEl = document.querySelector(last);
	const lastRect = lastEl.getBoundingClientRect();
	cb(lastEl);

	runFLIP(firstRect, lastRect, lastEl, options);
}
