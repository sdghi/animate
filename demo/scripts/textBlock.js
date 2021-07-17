import { Watcher, flip } from '../../lib';

const textBlockSection = new Watcher('.text-block');
const box = document.querySelector('.box');

textBlockSection.scroll(
  'enter',
  (el) => {
    flip(
      box,
      () => {
        const flipInner = document.querySelector('.text-block__inner');

        flipInner.classList.add('reverse');
      },
      {
        duration: 2000,
        done: () => {
          console.log('finished');
        },
      }
    );
  },
  { rootMargin: '-50%' }
);
