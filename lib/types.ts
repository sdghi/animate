export interface FLIPOptions {
	duration?: number;
	easing?: string;
	direction?: string;
	scale?: boolean;
	done?: CallableFunction;
}

export type Selector = string | HTMLElement | Element;
