import { Watcher, animateLayout } from '../../lib';

const cardsSection = new Watcher('.cards');

cardsSection.scroll('enter', () => {
  console.log('entered');
  animateLayout(
    '.cards',
    '.cards__card',
    (parent) => {
      parent.classList.add('flex');
    },
    { duration: 2000 }
  );
});
