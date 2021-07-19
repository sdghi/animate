/**
 * @jest-environment jsdom
 */

const { getDeltasFromElements, getDeltasFromRects } = require('../getDeltas');
const { getElement } = require('../getElement');

describe('getDeltasFromElements', () => {
  const body = `
    <div class="element-one">Element One</div>
    <div class="element-two">Element Two</div>
  `;
  test('Running getDeltasFromElements should return an object of deltas between two elements', () => {
    document.body.innerHTML = body;

    const firstElement = getElement('.element-one');
    const lastElement = document.querySelector('.element-two');

    const firstRect = firstElement.getBoundingClientRect();
    const lastRect = lastElement.getBoundingClientRect();

    // Deltas
    const dx = firstRect.left - lastRect.left;
    const dy = firstRect.top - lastRect.top;
    let dh = firstRect.height / lastRect.height;
    let dw = firstRect.width / lastRect.width;

    const testDeltas = { dx, dy, dh, dw };

    const deltas = getDeltasFromElements('.element-one', lastElement);

    expect(deltas).toEqual(testDeltas);
  });

  test('Running getDeltasFromRects should return an object of deltas between two DOMRects', () => {
    document.body.innerHTML = body;

    const firstElement = getElement('.element-one');
    const lastElement = document.querySelector('.element-two');

    const firstRect = firstElement.getBoundingClientRect();
    const lastRect = lastElement.getBoundingClientRect();

    // Deltas
    const dx = firstRect.left - lastRect.left;
    const dy = firstRect.top - lastRect.top;
    let dh = firstRect.height / lastRect.height;
    let dw = firstRect.width / lastRect.width;

    const testDeltas = { dx, dy, dh, dw };

    const deltas = getDeltasFromRects(firstRect, lastRect);

    expect(deltas).toEqual(testDeltas);
  });
});
