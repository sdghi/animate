/**
 * @jest-environment jsdom
 */
const { loop } = require('../loop');

describe('Loop', () => {
	const testArr = ['this', 'is', 'a', 'test'];
	const loopValues = [0, testArr.length - 1];

	test('Can increment by 1', () => {
		const index = loop(loopValues).inc(0, 1);
		expect(index).toBe(1);
	});

	test('Value will go to the first index if increment value is more than length', () => {
		const index = loop(loopValues).inc(3, 1);
		expect(index).toBe(loopValues[0]);
	});

	test('Can increment by a value other than 1', () => {
		const index = loop(loopValues).inc(0, 2);
		expect(index).toBe(2);
	});

	test('Can decrement by 1', () => {
		const index = loop(loopValues).dec(2, 1);
		expect(index).toBe(1);
	});

	test('Value will go to the last index if decrement value is less than the starting index', () => {
		const index = loop(loopValues).dec(0, 1);
		expect(index).toBe(loopValues[1]);
	});

	test('Can decrement by a value other than 1', () => {
		const index = loop(loopValues).dec(3, 2);
		expect(index).toBe(1);
	});
});
