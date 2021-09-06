import {
  mount,
  unmount,
  toggleMounting,
  Watcher,
  animateHeightAuto,
} from '../../lib';

const toggleShow = new Watcher('.toggle__show');
const toggleHide = new Watcher('.toggle__hide');
const toggleState = new Watcher('.toggle__state');
const toggleElement = document.querySelector('.toggle__element');

toggleShow.click(() => {
  animateHeightAuto('.toggle', () => {
    mount(toggleElement);
  });
});

toggleHide.click(() => {
  animateHeightAuto('.toggle', () => {
    unmount(toggleElement);
  });
});

toggleState.click(() => {
  animateHeightAuto('.toggle', () => {
    toggleMounting(toggleElement);
  });
});

toggleShow.click(() => {
  animateHeightAuto('.toggle', () => {
    mount(toggleElement);
  });
});

toggleHide.click(() => {
  animateHeightAuto('.toggle', () => {
    unmount(toggleElement);
  });
});

toggleState.click(() => {
  animateHeightAuto('.toggle', () => {
    toggleMounting(toggleElement);
  });
});
