interface ObserverOptions {
	root?: Element;
	rootMargin?: string;
	threshold?: number;
}

const defaultObserverOptions: ObserverOptions = {
	root: null,
	rootMargin: '0px',
	threshold: 1.0,
};

export class Watcher {
	el: Element;

	constructor(element: string) {
		this.el = document.querySelector(element);
	}

	log() {
		console.log('element:', this.el);
	}

	scroll(event: string, cb, options: ObserverOptions = defaultObserverOptions) {
		let observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				const ratio = entry.intersectionRatio;
				if (event === 'enter') {
					if (entry.isIntersecting) {
						this.scrollEnter(cb);
					}
				}
				if (event === 'exit') {
					if (ratio === 0) {
						this.scrollExit(cb);
					}
				}
			});
		}, options);

		observer.observe(this.el);
	}

	scrollExit(cb) {
		cb(this.el);
	}

	scrollEnter(cb) {
		cb(this.el);
	}

	click(cb) {
		this.el.addEventListener('click', (event: Event) => {
			cb(this.el, event);
		});
	}
}
