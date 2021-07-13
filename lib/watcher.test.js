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

test('Click should run a callback', () => {
	document.body.innerHTML = `
	<button class="test-element">Click me</button>
	<h3 class="name"></h3>
	`;

	const testElement = document.querySelector('.test-element');
	const name = document.querySelector('.name');
	const testName = 'test name';

	const watcher = new Watcher('.test-element');

	watcher.click(() => {
		name.innerHTML = testName;
	});

	testElement.click();

	expect(name.innerHTML).toBe(testName);
});
