/**
 * @jest-environment jsdom
 */

const { Watcher } = require('./watcher');

test('Should create a new class with element', () => {
	document.body.innerHTML = `<button class="test-element">Click me</button>`;

	const testElement = document.querySelector('.test-element');
	const watcher = new Watcher('.test-element');

	expect(watcher.node()).toEqual(testElement);
});
