const { Watcher, watchHeightChange } = humdinger;

const homeScrollWatcher = new Watcher('.home__scroll__illustration');
const scrollElements = document.querySelectorAll('[data-scroll]');

scrollElements.forEach((el) => {
  const element = new Watcher(el);

  element.scroll(
    'enter',
    () => {
      el.setAttribute('data-in-view', true);
    },
    {
      threshold: 1,
    }
  );
});

homeScrollWatcher.scroll(
  'enter',
  (el) => {
    el.setAttribute('data-in-view', true);
  },
  {
    threshold: 0.5,
  }
);

homeScrollWatcher.scroll(
  'exit',
  (el) => {
    el.removeAttribute('data-in-view');
  },
  {
    threshold: 0,
  }
);

const detailElements = document.querySelectorAll('details');

detailElements.forEach((el) => {
  watchHeightChange(el).observe();
});
