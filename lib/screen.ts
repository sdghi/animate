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
	window.addEventListener('resize', (e: Event) => {
		runMediaQuery(mediaQueryString, callbacks, e);
	});

	window.addEventListener('load', (e) => {
		runMediaQuery(mediaQueryString, callbacks, e);
	});
}

/**
 *
 * @param mediaQueryString Media Query String that follow Window.matchMedia() api
 * @param callbacksAn An object containing a true and false callback
 * @param event The event passed down from addEventListener()
 */
function runMediaQuery(
	mediaQueryString,
	callbacks: MediaQueryCallbacks,
	event: Event
) {
	const mql = window.matchMedia(mediaQueryString);

	if (mql.matches) {
		callbacks.true(event);
	} else {
		callbacks.false(event);
	}
}
