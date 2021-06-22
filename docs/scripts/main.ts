import { Watcher } from '../../lib';

const test = new Watcher('.hero__heading');

test.scrollEnter(() => console.log('scroll entered'));
