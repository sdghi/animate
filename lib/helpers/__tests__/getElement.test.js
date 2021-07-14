/**
 * @jest-environment jsdom
 */

const { getElement } = require('../getElement');

describe('Get Element', () => {
	test('Accepts a string or element', () => {
		document.body.innerHTML = `
			<div class="test">Test Element</div>
		`;

		const testElement = document.querySelector('.test');

		expect(getElement('.test')).toEqual(testElement);
		expect(getElement(testElement)).toEqual(testElement);
	});

	test('Can select an element from a parent other than Document', () => {
		document.body.innerHTML = `
			<div class="parent">
				<h2 class="heading"></h2>
			</div>
		`;

		const parentElement = document.querySelector('.parent');
		const testElement = parentElement.querySelector('.heading');

		expect(getElement('.heading', parentElement)).toEqual(testElement);
	});
});
