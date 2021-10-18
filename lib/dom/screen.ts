export class Screen {
  width: string;
  options: any;
  running: any;

  constructor(width: string, options) {
    this.width = width;
    this.running = null;
    this.options = options;
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => this.watchMedia());

    window.addEventListener('resize', () => this.watchMedia());
  }

  watchMedia() {
    if (window.matchMedia(this.width).matches) {
      this.running = this.options.true;
    } else {
      if (this.options.false) {
        this.running = this.options.false;
      } else {
        this.running = null;
      }
    }

    if (this.running) {
      this.running();
    } else {
      return;
    }
  }
}
