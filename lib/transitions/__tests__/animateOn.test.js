/**
 * @jest-environment jsdom
 */

const { animateOn } = require('../animateOn');

describe('animateOn', () => {
  const body = `
    <div class="element" data-transition="fade">Animate Me</div>
  `;

  test('Running unmount should add aria-hidden="true" to the element', () => {
    document.body.innerHTML = body;

    const element = document.querySelector('.element');

    animateOn('unmount', element);

    expect(element.getAttribute('aria-hidden')).toEqual('true');
  });

  test('Running mount will remove "aria-hidden" from the element', () => {
    document.body.innerHTML = `
      <div class="element" aria-hidden="true" data-transition="fade">Element</div>
    `;

    const element = document.querySelector('.element');

    animateOn('mount', element);

    expect(element.hasAttribute('aria-hidden')).toEqual(false);
  });
});
