// TODO: REFACTOR SCREEN TO CHECK USE MATCH MEDIA
// REVIEW TO SEE IF THIS IS A NECESSARY FEATURE

/**
 *
 * @param breakpoint Operator and pixel value of screen width (ex: '>500')
 * @param cb	Callback function to run if the breakpoint is active
 */
export function screen(breakpoint: string, cb: CallableFunction) {
	const operator: string = breakpoint.split(/[0-9]/)[0];
	const targetWidth: number = parseInt(breakpoint.match(/\d+/g)[0]);

	let resizeTimer;

	window.addEventListener('resize', (e: Event) => {
		const currentWidth: number = e.target.innerWidth;

		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(
			init(currentWidth, targetWidth, operator, cb, e),
			250
		);
	});

	window.addEventListener('load', (e) => {
		const currentWidth: number = window.innerWidth;
		return init(currentWidth, targetWidth, operator, cb, e);
	});
}

/**
 *
 * @param currentWidth Current width of the screen
 * @param targetWidth	Target breakpoint width
 * @param operator Comparison operator
 * @param cb Callback function
 */
function init(
	currentWidth: number,
	targetWidth: number,
	operator: string,
	cb: CallableFunction,
	event: Event
) {
	// Render out the correct event based on the operator
	if (operator === '>=') {
		if (targetWidth >= currentWidth) {
			return cb(event);
		}
	} else if (operator === '<=') {
		if (targetWidth <= currentWidth) {
			return cb(event);
		}
	} else if (operator === '>') {
		if (targetWidth > currentWidth) {
			return cb(event);
		}
	} else if (operator === '<') {
		if (targetWidth < currentWidth) {
			return cb(event);
		}
	} else if (operator === '=') {
		if (currentWidth === targetWidth) {
			return cb(event);
		}
	}
}
