import { animateOn, Watcher, animateHeightAuto } from '../../lib';

const toggleShow = new Watcher('.toggle__show');
const toggleHide = new Watcher('.toggle__hide');
const toggleElement = document.querySelector('.toggle__element');

toggleShow.click(() => {
  animateHeightAuto('.toggle', () => {
    animateOn('mount', toggleElement);
  });
});

toggleHide.click(() => {
  animateHeightAuto('.toggle', () => {
    animateOn('unmount', toggleElement);
  });
});
