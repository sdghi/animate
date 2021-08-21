# Humdinger 🙈🙉🙊

A toolkit for rapidly building interactive websites

## Get Started

`npm install humdinger`

## Features

- [Watcher](#Watcher)
- [Element Transitions](#element-transitions)
- [Gallery](#gallery)
- [Combining features](#combining-features)

## Project Roadmap

- [Features](https://github.com/sdghi/animate/labels/enhancement)
- [Report A Bug](https://github.com/sdghi/animate/issues?q=is%3Aissue+is%3Aopen+label%3Abug)

## Watcher

The `Watcher` allows you "watch" for certain events on a specific element and run callbacks based on that event.

Here are the events available through the `Watcher`

**Methods**

- [log](#log)
- [node](#node)
- [click](#click)
- [scroll](#scroll)

### Log

Will log the current element being watched

```js
const el = new Watcher('.el');

// Will console.log() the el
el.log();
```

### Node

Will return the current element being watched

```js
const el = new Watcher('.el');

const elementNode = el.node();
```

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
import { Watcher } from 'humdinger';
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
import { Watcher } from 'humdinger';

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
- [Animate Height Auto](#animate-height-auto)
- [Watch Height Change](#watch-height-change)
- [Mounting](#mounting)

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

### Animate Height Auto

The `animateHeightAuto` function watches for changes to an element and animates the height.

```js
animateHeightAuto(el, cb, options);
```

`animateHeightAuto` has 2 arguments

1. `el` - The element that's height will change
2. `cb` - A callback function to adjust the layout
3. `options` - Animation options for the height
   - `duration` (Number) - Duration of animation in milliseconds
   - `easing` (String) - Ease of animation

**Usage**

HTML

```html
<div class="dropdown">
  <div class="dropdown__item">
    <button class="dropdown__toggle">Item 1</button>
    <p class="dropdown__content">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate, omnis
      numquam. Cumque quae dolore sint debitis a deleniti ipsa nostrum?
    </p>
  </div>
  <div class="dropdown__item">
    <button class="dropdown__toggle">Item 2</button>
    <p class="dropdown__content">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate, omnis
      numquam. Cumque quae dolore sint debitis a deleniti ipsa nostrum?
    </p>
  </div>
  <div class="dropdown__item">
    <button class="dropdown__toggle">Item 3</button>
    <p class="dropdown__content">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate, omnis
      numquam. Cumque quae dolore sint debitis a deleniti ipsa nostrum?
    </p>
  </div>
</div>
```

JS

```js
import { Watcher, animateHeightAuto } from 'humdinger';

const dropdownItems = document.querySelectorAll('.dropdown__item');

dropdownItems.forEach((item) => {
  const toggleEl = item.querySelector('.dropdown__toggle');
  const dropdownToggle = new Watcher(toggleEl);
  const dropdownContent = item.querySelector('.dropdown__content');

  dropdownToggle.click(() => {
    animateHeightAuto(item, () => {
      dropdownContent.classList.toggle('open');
    });
  });
});
```

CSS

```css
.dropdown {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.dropdown__toggle {
  padding: 30px 50px;
  width: 100%;
}

.dropdown__content {
  --border: 1px solid black;
  background: white;
  border-left: var(--border);
  border-right: var(--border);
  border-bottom: var(--border);
  font-size: 4em;
  display: none;
  padding: 20px;

  &.open {
    display: block;
  }
}
```

### Watch Height Change

The `watchHeightChange` function uses the Mutation Observer to animate changes within an element's height. It's useful to use when a height change is not happening within a callback. For example a tabbed section using `details` and `summary`.

```js
watchHeightChange(el, cb);
```

`animateHeightAuto` has 2 arguments

1. `el` - The element being watched
2. `cb` - A callback function that is executed after the height change. It has access to an object of the following properties
   - `mutation` - the mutation from the observer
   - `element` - the DOM element being animated
   - `beforeHeight` - the element height before the change
   - `afterHeight` - the element height after the change

**Usage**

JS

```js
import { watchHeightChange } from 'humdinger';

import { watchHeightChange } from '../../lib';

const tabElement = document.querySelector('.css-tabbable__tab');

watchHeightChange(tabElement, ({ afterHeight }) =>
  console.log(`Height has changed to ${afterHeight}`)
).observe();
```

HTML

```html
<section class="css-tabbable">
  <details class="css-tabbable__tab">
    <summary class="css-tabbable__tab__toogle">Toggle Me</summary>
    <div class="css-tabbable__tab__content">
      This is the inner content of the tabbable section
    </div>
  </details>
</section>
```

### Mounting

The mounting functions handles showing and hiding elements, allowing users to run css animation during the process.

- `mount` - When you want show an element
- `unmount` - When you want to hide an element
- `toggleMounting` - When you want to toggle the mounting of an element

Each of the functions take an `element` as an argument.

**Initialization**

1. Create an element with a `data-transition` attribute, the value you pass here will be used in the css animation.

HTML

```html
<div class="element" data-transition="fade">Animate Me</div>
```

2. Use on of the mounting functions to animate the element

```js
const element = document.querySelector('.element');

mount(element);
```

3. Running the mounting functions will take the elements `data-transition` attribute and add a data attribute with the value and current state. Use css to animate between the states

CSS

```css
/* data-transition="fade" will create the data-fade attribute */

/* 'mount' will create the 'enter' */
[data-fade='enter'] {
  opacity: 1;
  transition: opacity 0.4s linear;
}

/* 'unmount' will create the 'exit' */
[data-fade='exit'] {
  opacity: 0;
  transition: opacity 0.4s linear;
}
```

**Usage**

HTML

```html
<button class="toggle__show">Show</button>
<button class="toggle__hide">Hide</button>
<div class="toggle__element" data-transition="fade-up">
  <h2>This is the toggle element</h2>
  <p>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus, maiores
    at! Quia illum ipsum, minus ratione totam reprehenderit. Totam, dolorum.
    Dicta dolores sint totam animi non a labore accusamus hic.
  </p>
</div>
```

JS

```js
import { mount, unmount, Watcher } from 'humdinger';

const toggleShow = new Watcher('.toggle__show');
const toggleHide = new Watcher('.toggle__hide');
const toggleElement = document.querySelector('.toggle__element');

toggleShow.click(() => {
  mount(toggleElement);
});

toggleHide.click(() => {
  unmount(toggleElement);
});
```

CSS

```css
[data-fade-up='enter'] {
  opacity: 1;
  transform: translateY(0px);
  transition: opacity 0.3s linear, transform 0.4s ease-in;
}

[data-fade-up='exit'] {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s linear, transform 0.4s ease-out;
}
```

## Gallery

Handy Class for building image galleries.

**Initialization**

1. Import the `Gallery` class

```js
import { Gallery } from 'humdinger';
```

2. Configure: The `Gallery` class takes two arguments

- `element` - a string or DOM element that contains the gallery
- `options` - configuration options for the gallery
  - `itemSelector` - a selector for the items in the gallery element
  - `start` - the starting index of the gallery

```js
// Gallery(element, options)

const gallery = new Gallery('.gallery', {
  itemSelector: '.gallery__item',
  start: 0,
});
```

**Methods**

- `node`- returns the gallery element
- `getItems` - gets all items elements that are queried from the itemSelector option
- `getIndex` - gets the current active index
- `getCurrent` - returns the active items and index
- `getNext` - returns the next item and index
- `getPrevious` - returns the previous item and index
- `getItem` - returns and items at a certain index
- `next` - increments the current index (automatically loops)
- `previous` - decrements the current index (automatically loops)
- `log` - logs the gallery element, options, items, currentIndex and currentItem

**Usage**

HTML

```html
<section class="hero-gallery">
  <div class="hero-gallery__item" data-state="visible">
    <img src="img/image-1.jpeg" alt="" class="hero-gallery__item__image" />
  </div>
  <div class="hero-gallery__item" data-state="hidden">
    <img src="img/image-2.jpeg" alt="" class="hero-gallery__item__image" />
  </div>
  <button class="hero-gallery__previous">previous</button>
  <button class="hero-gallery__next">next</button>
</section>
```

JS

```js
import { Watcher, Gallery } from 'humdinger';

const heroGallery = new Gallery('.hero-gallery', {
  itemSelector: '.hero-gallery__item',
  start: 0,
});

const heroGalleryNext = new Watcher('.hero-gallery__next');
const heroGalleryPrev = new Watcher('.hero-gallery__previous');

heroGalleryNext.click(() => {
  const current = heroGallery.getCurrent().element;
  const next = heroGallery.getNext().element;
  current.setAttribute('data-state', 'hidden');
  next.setAttribute('data-state', 'visible');
  heroGallery.next();
});

heroGalleryPrev.click(() => {
  const current = heroGallery.getCurrent().element;
  const prev = heroGallery.getPrevious().element;
  current.setAttribute('data-state', 'hidden');
  prev.setAttribute('data-state', 'visible');
  heroGallery.previous();
});
```

CSS

```css
.hero-gallery {
  height: 60vh;
  position: relative;
}

.hero-gallery__item {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: opacity 0.3s linear;

  &[data-state='visible'] {
    opacity: 1;
  }
}

.hero-gallery__item img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.hero-gallery__previous,
.hero-gallery__next {
  --spacing: 2%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.hero-gallery__previous {
  left: var(--spacing);
}

.hero-gallery__next {
  right: var(--spacing);
}
```

## Combining Features

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
