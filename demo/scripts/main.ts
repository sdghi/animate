import { Watcher, screen, flip } from '../../lib';

const test = new Watcher('.hero__heading');

// Have access the event of window.addEventListener
screen('<=768', (e) => console.log('above tablet', e));
screen('>768', () => console.log('below tablet'));

test.scroll(
	'enter',
	() => {
		console.log('is enter');
		flip(
			'.box',
			(el) => {
				el.classList.add('right');
			},
			{ duration: 400 }
		);
	},
	{ rootMargin: '-250px' }
);

// Have access to DOM element of the Watcher
test.scroll('exit', (el) => {
	console.log('is exit', el);
});

test.click((el, e) => {
	console.log('clicked', el, e);
});
