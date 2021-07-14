interface MediaQueryCallbacks {
	true?: CallableFunction;
	false?: CallableFunction;
}

/**
 *
 * @param mediaQueryString Media Query String that follow Window.matchMedia() api
 * @param callbacks An object containing a true and false callback
 */

export function screen(
	mediaQueryString: string,
	callbacks: MediaQueryCallbacks
) {
	const mql = window.matchMedia(mediaQueryString);

	mql.addEventListener('change', (e) => {
		if (e.matches && callbacks.true) {
			return callbacks.true();
		} else if (callbacks.false) {
			return callbacks.false();
		}
	});
}
