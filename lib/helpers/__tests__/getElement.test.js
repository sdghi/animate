/**
 * @jest-environment jsdom
 */

const { getElement, getAllElements } = require('../getElement');

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

describe('Get All Elements', () => {
	test('Accepts a string or element', () => {
		document.body.innerHTML = `
			<div class="test">Test Element</div>
		`;

		const testElement = document.querySelectorAll('.test');

		expect(getAllElements('.test')).toEqual(testElement);
		expect(getAllElements(testElement)).toEqual(testElement);
	});

	test('Returns a nodelist of elements', () => {
		document.body.innerHTML = `
		<div class="test">Test Element 1</div>
		<div class="test">Test Element 2</div>
		<div class="test">Test Element 3</div>
		`;

		const allElements = document.querySelectorAll('.test');

		expect(getAllElements('.test')).toEqual(allElements);
	});

	test('Can select an element from a parent other than Document', () => {
		document.body.innerHTML = `
		<div class="parent">
			<div class="test">Test Element 1</div>
			<div class="test">Test Element 2</div>
			<div class="test">Test Element 3</div>
		</div>
		`;
		const parentElement = document.querySelector('.parent');
		const testElements = parentElement.querySelectorAll('.test');

		expect(getAllElements('.test', parentElement)).toEqual(testElements);
	});
});
