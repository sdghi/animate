export interface FLIPOptions {
  duration?: number;
  easing?: string;
  direction?: string;
  scale?: boolean;
  done?: CallableFunction;
}

export type Selector = string | HTMLElement | Element;

export interface WAAPIOptions {
  duration: number;
  easing: string;
  fill?: 'forwards';
}
