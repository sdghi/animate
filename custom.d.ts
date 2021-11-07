interface FLIPOptions {
	duration?: number;
	easing?: string;
	direction?: string;
	scale?: boolean;
	done?: CallableFunction;
}

type Selector = string | HTMLElement | Element;

interface WAAPIOptions {
	duration: number;
	easing: string;
	fill?: "forwards";
}

interface GalleryOptions {
	itemSelector: string;
	start: number;
	timer?: number;
	timerFn?: any;
}
