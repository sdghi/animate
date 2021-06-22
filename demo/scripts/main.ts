import { Watcher, screen } from '../../lib';

const test = new Watcher('.hero__heading');

// Have access the event of window.addEventListener
screen('<=768', (e) => console.log('above tablet', e));
screen('>768', () => console.log('below tablet'));

test.scroll('enter', () => {
	console.log('is enter');
});

// Have access to DOM element of the Watcher
test.scroll('exit', (el) => {
	console.log('is exit', el);
});

test.click((el, e) => {
	alert('clicked');
	console.log('clicked', el, e);
});
