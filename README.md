# SDG Animate 🙈🙉🙊

A toolkit for rapidly building interactive websites

## Get Started

`npm install @sdg/animate`

## Features

- [Watcher](#Watcher)
- [FLIP](#FLIP)
- [Crossfade](#Crossfade)

## Project Roadmap

- [Features](https://github.com/sdghi/animate/labels/enhancement)
- [Report A Bug](https://github.com/sdghi/animate/issues)

## Watcher

The `Watcher` allows you "watch" for certain events on a specific element and run callbacks based on that event.

Here are the events available through the `Watcher`

- [click](#click)
- [scroll](#scroll)

### Click

Run callbacks after click events.

**Callback**

Each callback has access to the following properties

```js
button.click((el) => {
	// The clicked element
	console.log(el);
});
```

- `el` - The clicked element

**Usage**

HTML

```html
<button>Click me to change the content</button>
```

JS

```js
import { Watcher } from '@sdg/animate';
const button = new Watcher('button');

button.click((el) => {
	el.innerHTML = 'New Name';
});
```

### Scroll

Scroll uses the Intersection Observer under the hood, to allow you to run callbacks based off certain scroll events.

**Events**

- `enter` - When an element enters the observer view
- `exit` - When an element leaves the observer view

**Callback**

Each callback has access to the following properties

```js
const scrollWatcher('.element');

scrollWatcher.scroll('enter', (el => {
  // Will log the DOM element of '.element'
  console.log(el);
})
```

- `el` - The element that is being observed

**Observer Options**

Customize the Intersection Observer options. Values can be changed in an object after the callback.

```js
// Default options
{
	root: null,
	rootMargin: '0px',
	threshold: 1.0
}
```

**Usage**

Html

```html
<div class="scroll-element">I am a scroll element</div>
```

CSS

```css
.scroll-element {
	opacity: 0;
}

.scroll-element[data-state='visible'] {
	opacity: 1;
	transition: opacity 0.2s;
}
```

JS

```js
import { Watcher } from '@sdg/animate';

// You can also pass a DOM Element into the watcher
const scrollEl = document.querySelector('.scroll-element');
const scrollWatcher = new Watcher(scrollEl);

scrollWatcher.scroll(
	'enter',
	(el) => {
		el.setAttribute('data-state', 'visible');
	},
	{
		threshold: 0.5,
	}
);

scrollWatcher.scroll('exit', (el) => {
	el.setAttribute('data-state', 'hidden');
});
```
