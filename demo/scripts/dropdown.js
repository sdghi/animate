import { Watcher, animateHeightAuto } from '../../lib';

const dropdownElement = document.querySelector('.dropdown');
const dropdownToggle = new Watcher('.dropdown__toggle');
const dropdownContent = document.querySelector('.dropdown__content');

dropdownToggle.click(() => {
  animateHeightAuto(dropdownElement, () => {
    dropdownContent.classList.toggle('open');
  });
});
