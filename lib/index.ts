export class Watcher {
	constructor(element) {
		this.el = document.querySelector(element);
	}

	log() {
		console.log('element:', this.el);
	}

	scrollEnter(cb) {
		cb();
	}
}
