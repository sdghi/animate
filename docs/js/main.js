const { Watcher, watchHeightChange } = humdinger;

const homeScrollWatcher = new Watcher('.home__scroll__illustration');

homeScrollWatcher.scroll(
  'enter',
  (el) => {
    console.log('enter');
    el.setAttribute('data-in-view', true);
  },
  {
    threshold: 0.5,
  }
);

homeScrollWatcher.scroll(
  'exit',
  (el) => {
    console.log('exit');
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
