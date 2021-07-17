import { Watcher, animateHeightAuto } from '../../lib';

const dropdownItems = document.querySelectorAll('.dropdown__item');

dropdownItems.forEach((item) => {
  const toggleEl = item.querySelector('.dropdown__toggle');
  const dropdownToggle = new Watcher(toggleEl);
  const dropdownContent = item.querySelector('.dropdown__content');

  dropdownToggle.click(() => {
    animateHeightAuto(item, () => {
      dropdownContent.classList.toggle('open');
    });
  });
});
