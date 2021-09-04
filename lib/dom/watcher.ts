import { getElement } from '../helpers';

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

  constructor(element: Selector) {
    this.el = getElement(element);
  }

  log() {
    console.log('element:', this.el);
  }

  node() {
    return this.el;
  }

  scroll(
    event: string,
    cb: CallableFunction,
    options: ObserverOptions = defaultObserverOptions
  ) {
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

    const runObserver = () => {
      observer.observe(this.el);
      requestAnimationFrame(runObserver);
    };

    requestAnimationFrame(runObserver);
  }

  scrollExit(cb: CallableFunction) {
    cb(this.el);
  }

  scrollEnter(cb: CallableFunction) {
    cb(this.el);
  }

  click(cb: CallableFunction) {
    this.el.addEventListener('click', (event: Event) => {
      cb(this.el, event);
    });
  }
}
