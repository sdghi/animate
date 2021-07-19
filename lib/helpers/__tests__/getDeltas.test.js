/**
 * @jest-environment jsdom
 */

const { getDeltas } = require('../getDeltas');
const { getElement } = require('../getElement');

describe('getDeltas', () => {
  const body = `
    <div class="element-one">Element One</div>
    <div class="element-two">Element Two</div>
  `;
  test('It should return an object of deltas between two elements', () => {
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

    const deltas = getDeltas('.element-one', lastElement);

    expect(deltas).toEqual(testDeltas);
  });
});
