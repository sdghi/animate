export function screen(breakpoint, cb) {
	window.addEventListener('resize', (e) => {
		const currentWidth = e.target.innerWidth;
		const operator = breakpoint.split(/[0-9]/)[0];
		const targetWidth = breakpoint.match(/\d+/g);

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
