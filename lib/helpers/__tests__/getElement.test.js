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
});
