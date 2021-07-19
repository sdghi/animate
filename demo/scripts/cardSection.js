import { Watcher, animateLayout } from '../../lib';

const cardsSection = new Watcher('.cards');

cardsSection.scroll('enter', () => {
  animateLayout(
    '.cards__inner',
    '.cards__card',
    (parent) => {
      parent.classList.add('reverse');
    },
    { scale: false, duration: 2000 }
  );
});

cardsSection.scroll('exit', () => {
  animateLayout(
    '.cards__inner',
    '.cards__card',
    (parent) => {
      parent.classList.add('reverse');
    },
    { scale: false, duration: 2000 }
  );
});
