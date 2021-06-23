/**
 *
 * @param element Selector of the first element
 * @param cb An optional function that can be run to switch the layout between the first and last
 * @param options An object that has access to duration, easing and playState
 */

interface Options {
	duration?: number;
	easing?: string;
	direction?: string;
}

export function flip(
	element: string,
	cb,
	options: Options = {
		duration: 300,
		easing: 'ease-in-out',
		direction: 'forwards',
	}
) {
	const el = document.querySelector(element);
	const firstRect = el.getBoundingClientRect();

	cb(el);

	const lastRect = el.getBoundingClientRect();

	// Deltas
	const dy = firstRect.top - lastRect.top;
	const dx = firstRect.left - lastRect.left;
	const dh = firstRect.height / lastRect.height;
	const dw = firstRect.width / lastRect.width;

	const animateFlip = el.animate(
		[
			{
				transformOrigin: 'top left',
				transform: `translate3d(${dx}px, ${dy}px, 0) scale(${dw}, ${dh})`,
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
}
