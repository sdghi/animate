import { FLIPOptions } from '../types';

export function runFLIP(
	firstRect,
	lastRect,
	el: Element,
	options: FLIPOptions = {
		duration: 300,
		easing: 'ease-in-out',
		direction: 'forwards',
		scale: true,
	}
) {
	// Deltas
	const dy = firstRect.top - lastRect.top;
	const dx = firstRect.left - lastRect.left;
	let dh = firstRect.height / lastRect.height;
	let dw = firstRect.width / lastRect.width;

	console.log(firstRect.height, lastRect.height, dh, dw);

	const animateFlip = el.animate(
		[
			{
				transformOrigin: 'top left',
				transform: `translate3d(${dx}px, ${dy}px, 0)  scale(${dw}, ${dh})`,
			},
			{
				transformOrigin: 'top left',
				transform: 'none',
			},
		],
		{
			duration: options.duration,
			easing: options.easing,
			fill: 'both',
		}
	);

	if (options.direction === 'reverse') {
		animateFlip.reverse();
	} else {
		animateFlip.play();
	}

	if (options.done) {
		// @ts-ignore
		animateFlip.onfinish = options.done;
	}
}
