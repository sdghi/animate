import { watchHeightChange } from '../../lib';

const tabElement = document.querySelector('.css-tabbable__tab');

watchHeightChange(
  tabElement,
  ({ afterHeight }) => console.log(`Height has changed to ${afterHeight}`),
  { duration: 200 }
).observe();
