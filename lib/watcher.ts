export class Watcher {
	constructor(element) {
		this.el = document.querySelector(element);
	}

	log() {
		console.log('element:', this.el);
	}

	scroll(event: string, cb, options = {}) {
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
		cb();
	}

	scrollEnter(cb) {
		cb();
	}
}
