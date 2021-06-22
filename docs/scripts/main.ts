import { Watcher, screen } from '../../lib';

const test = new Watcher('.hero__heading');

screen('<=768', () =>
	test.scroll('enter', () => {
		console.log('is enter');
	})
);
screen('>768', () =>
	test.scroll('exit', () => {
		console.log('is exit');
	})
);
