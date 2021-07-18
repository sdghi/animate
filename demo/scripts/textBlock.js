import { Watcher, flip, animateHeightAuto } from '../../lib';

const textBlockSection = new Watcher('.text-block');
const box = document.querySelector('.box');

textBlockSection.scroll(
  'enter',
  (el) => {
    animateHeightAuto(
      el,
      () => {
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
      {
        duration: 400,
      }
    );
  },
  { rootMargin: '-50%' }
);
