# Humdinger 🙈🙉🙊

A toolkit for rapidly building interactive websites

## Get Started

`npm install humdinger`

## Features

- [Watcher](#Watcher)
- [Element Transitions](#element-transitions)
- [Combining features](#combining-features)

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
const scrollWatcher = new Watcher('.element');

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
    el) => {
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

## Element Transitions

- [FLIP](#flip)
- [Crossfade](#crossfade)
- [Animate Layout](#animate-layout)

### FLIP

Create native-like animations using FLIP. The `flip` functions takes 3 arguments.

```js
flip(
  '.box',
  (el) => {
    console.log('The callback has access to the element', el);
  },
  {
    duration: 200,
  }
);
```

1. `element` - The selector that you would like to animate
2. `cb` - function that can be used to adjust the layout
3. `options` - an object that can be used to adjust the animation

**Options**

```js
// Default options
{
  duration: 300,
  easing: 'ease-in-out',
  direction: 'forwards',
  scale: true,
  done: () => {}
}
```

- `duration` - duration of animation in milliseconds
- `easing` - ease of the animation
- `direction` - animation direction
- `scale` - elements within the animating element will scale with it
- `done` - callback function that can be run once the animation is complete

**Usage**

HTML

```html
<div class="layout">
  <h2 class="heading">This is the heading</h2>
  <div>This is just filler content</div>
</div>
```

CSS

```css
.layout {
  display: flex;
}

.layout.reverse {
  flex-direction: row-reverse;
}
```

JS

```js
import { flip } from 'humdinger';

flip(
  '.heading',
  () => {
    // Adjust layout so '.heading' will switch positions
    document.querySelector('.layout').classList.add('.reverse');
  },
  {
    duration: 250,
    scale: false,
    done: () => {
      console.log('Animation finished');
    },
  }
);
```

### Crossfade

Seamlessly animate between two different element using crossfade. The `crossfade` function takes 4 arguments.

```js
// crossfade(first, last, cb, options)
crossfade('.first', '.last', (el) => {}, {});
```

1. `first` - The first element in the animation
2. `last` - That last element in the animation
3. `cb` - The callback function to handle layout change has access to the `last` element.
4. `options` - Options to adjust the animation

**Options**

```js
// Default options
{
  duration: 300,
  easing: 'ease-in-out',
  direction: 'forwards',
  scale: true,
  done: () => {}
}
```

- `duration` - duration of animation in milliseconds
- `easing` - ease of the animation
- `direction` - animation direction
- `scale` - elements within the animating element will scale with it
- `done` - callback function that can be run once the animation is complete

**Usage**

HTML

```html
<img src="image.jpg" class="small-image" alt="image" />
<img src="image.jpg" class="large-image" alt="image" />
```

CSS

```css
.small-image,
.large-image {
  height: var(--height, 300px);
  width: auto;
}

.large-image {
  /* Only add this to the element that will be initially hidden */
  visibility: hidden;
  --height: 600px;
}
```

JS

```js
import { crossfade } from 'humdinger';

crossfade(
  '.small-image',
  '.large-image',
  (el) => {
    el.style.visibility = 'visible';
  },
  {
    duration: 500,
  }
);
```

### Combining Features

Features can be chained together to create different interactions

**FLIP on scroll**

HTML

```html
<div class="parent">
  <div class="box"></div>
  <p>Lorem ipsum dolor</p>
</div>
```

CSS

```css
.parent {
  display: flex;
}

.parent.switch {
  flex-direction: row-reverse;
}

.box {
  height: 300px;
  width: 300px;
}
```

JS

```js
import { Watcher, flip } from 'humdinger';

const parentEl = new Watcher('.parent');

parentEl.scroll('enter', (parent) => {
  flip('.box', () => {
    parent.classList.add('switch');
  });
});
```
