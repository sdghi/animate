import { watchHeightChange } from '../../lib';

const wrapperElement = document.querySelector('.add-dom');
const addBtn = document.querySelector('.add-dom__add');
const clearBtn = document.querySelector('.add-dom__clear');
const domElement = document.querySelector('.add-dom__element');

watchHeightChange(wrapperElement, () => {}, {
  duration: 300,
  ease: 'ease-in-out',
}).observe();

addBtn.addEventListener('click', () => {
  const clonedElement = domElement.cloneNode(true);
  wrapperElement.appendChild(clonedElement);
});

clearBtn.addEventListener('click', () => {
  const elements = wrapperElement.querySelectorAll('.add-dom__element');

  elements.forEach((el, i) => {
    if (i !== 0) el.style.display = 'none';
  });
});
