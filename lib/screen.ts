/**
 *
 * @param breakpoint Operator and pixel value of screen width (ex: '>500')
 * @param cb	Callback function to run if the breakpoint is active
 */

export function screen(breakpoint: string, cb) {
	window.addEventListener('resize', (e: Event) => {
		const currentWidth: number = e.target.innerWidth;
		const operator: string = breakpoint.split(/[0-9]/)[0];
		const targetWidth: number = parseInt(breakpoint.match(/\d+/g)[0]);

		// Render out the correct event based on the operator
		if (operator === '>=') {
			if (targetWidth >= currentWidth) {
				cb(e);
			}
		} else if (operator === '<=') {
			if (targetWidth <= currentWidth) {
				cb(e);
			}
		} else if (operator === '>') {
			if (targetWidth > currentWidth) {
				cb(e);
			}
		} else if (operator === '<') {
			if (targetWidth < currentWidth) {
				cb(e);
			}
		} else if (operator === '=') {
			if (currentWidth === targetWidth) {
				cb(e);
			}
		}
	});
}
