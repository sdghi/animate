var humdinger = (function (exports) {
    'use strict';

    /**
     * Return the DOM element using either a string or selector
     * @param el A string or DOM node
     * @param parent Parent to run querySelector defaults to document
     * @returns DOM Element
     */
    function getElement(el, parent = document) {
        if (typeof el === 'string') {
            return parent.querySelector(el);
        }
        return el;
    }
    /**
     * Return a NodeList using either a string or selector
     * @param el A string or DOM node
     * @param parent Parent to run querySelectorAll defaults to document
     * @returns NodeList
     */
    function getAllElements(el, parent = document) {
        if (typeof el === 'string') {
            return parent.querySelectorAll(el);
        }
        return el;
    }

    /**
     * Returns an object of deltas between two rects
     * @param first First rect
     * @param last Last rect
     * @returns Object of deltas
     */
    function getDeltasFromRects(firstRect, lastRect) {
        // Deltas
        const dx = firstRect.left - lastRect.left;
        const dy = firstRect.top - lastRect.top;
        let dh = firstRect.height / lastRect.height;
        let dw = firstRect.width / lastRect.width;
        return {
            dx,
            dy,
            dh,
            dw,
        };
    }

    /**
     * Calculate delta values and animate between them using FLIP
     * @param firstRect DOMRect values of the first position
     * @param lastRect DOMRect values of the last position
     * @param el Element that will be animated
     * @param options FLIP options
     */
    function runFLIP(firstRect, lastRect, el, options = {
        duration: 300,
        easing: 'ease-in-out',
        direction: 'forwards',
        scale: true,
    }) {
        const { dx, dy, dh, dw } = getDeltasFromRects(firstRect, lastRect);
        const animateFlip = el.animate([
            {
                transformOrigin: 'top left',
                transform: `translate3d(${dx}px, ${dy}px, 0)  scale(${dw}, ${dh})`,
            },
            {
                transformOrigin: 'top left',
                transform: 'none',
            },
        ], {
            duration: options.duration,
            easing: options.easing,
            fill: 'both',
        });
        if (options.direction === 'reverse') {
            animateFlip.reverse();
        }
        else {
            animateFlip.play();
        }
        if (options.done) {
            // @ts-ignore
            animateFlip.onfinish = options.done;
        }
    }

    /**
     * Loop through an array of values
     * @param values An array of the starting and last index in the loop array
     */
    function loop(values) {
        const startIndex = values[0];
        const lastIndex = values[1];
        /**
         * Increment the loop value
         * @param current Current value of the array
         * @param value Increment value
         * @returns
         */
        function inc(current, value) {
            if (current === lastIndex) {
                return startIndex;
            }
            return current + value;
        }
        /**
         * Decrement the loop value
         * @param current Current value of the array
         * @param value Decrement value
         * @returns
         */
        function dec(current, value) {
            if (current === startIndex) {
                return lastIndex;
            }
            return current - value;
        }
        return {
            inc,
            dec,
        };
    }

    // @ts-nocheck
    /**
     * RAF equivalent to setInterval
     * @param cb Callback function to run
     * @param interval Duration between running callbacks
     */
    function requestInterval(cb, interval) {
        let start = new Date().getTime();
        let handle = new Object();
        function animate() {
            let current = new Date().getTime();
            let dt = current - start;
            if (dt >= interval) {
                cb();
                start = new Date().getTime();
            }
            handle.value = requestAnimationFrame(animate);
        }
        handle.value = requestAnimationFrame(animate);
        return handle;
    }
    /**
     * RAF equivalent to clearInterval
     * @param handle The instance of the requestInterval
     */
    function clearRequestInterval(handle) {
        window.cancelAnimationFrame
            ? window.cancelAnimationFrame(handle.value)
            : window.webkitCancelAnimationFrame
                ? window.webkitCancelAnimationFrame(handle.value)
                : window.webkitCancelRequestAnimationFrame
                    ? window.webkitCancelRequestAnimationFrame(handle.value) /* Support for legacy API */
                    : window.mozCancelRequestAnimationFrame
                        ? window.mozCancelRequestAnimationFrame(handle.value)
                        : window.oCancelRequestAnimationFrame
                            ? window.oCancelRequestAnimationFrame(handle.value)
                            : window.msCancelRequestAnimationFrame
                                ? window.msCancelRequestAnimationFrame(handle.value)
                                : clearInterval(handle);
    }

    const defaultObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
    };
    class Watcher {
        constructor(element) {
            this.el = getElement(element);
        }
        log() {
            console.log('element:', this.el);
        }
        node() {
            return this.el;
        }
        scroll(event, cb, options = defaultObserverOptions) {
            let observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    const ratio = entry.intersectionRatio;
                    if (event === 'enter') {
                        if (entry.isIntersecting) {
                            this.scrollEnter(cb);
                        }
                    }
                    if (event === 'exit') {
                        if (ratio === 0) {
                            this.scrollExit(cb);
                        }
                    }
                });
            }, options);
            const runObserver = () => {
                observer.observe(this.el);
                requestAnimationFrame(runObserver);
            };
            requestAnimationFrame(runObserver);
        }
        scrollExit(cb) {
            cb(this.el);
        }
        scrollEnter(cb) {
            cb(this.el);
        }
        click(cb) {
            this.el.addEventListener('click', (event) => {
                cb(this.el, event);
            });
        }
    }

    /**
     *
     * @param mediaQueryString Media Query String that follow Window.matchMedia() api
     * @param callbacks An object containing a true and false callback
     */
    function screen(mediaQueryString, callbacks) {
        const mql = window.matchMedia(mediaQueryString);
        if (mql.matches && callbacks.true) {
            return callbacks.true();
        }
        else if (callbacks.false) {
            return callbacks.false();
        }
        mql.addEventListener('change', (e) => {
            if (e.matches && callbacks.true) {
                return callbacks.true();
            }
            else if (callbacks.false) {
                return callbacks.false();
            }
        });
    }

    /**
     * Animate an element using FLIP
     * @param element Selector of the first element
     * @param cb An optional function that can be run to switch the layout between the first and last
     * @param options An object that has access to duration, easing and playState
     */
    function flip(element, cb, options) {
        const el = getElement(element);
        const firstRect = el.getBoundingClientRect();
        cb(el);
        const lastRect = el.getBoundingClientRect();
        runFLIP(firstRect, lastRect, el, options);
    }

    /**
     * Animate between two different elements
     * @param first Selector of first element
     * @param last Selector of last element
     * @param cb Callback function that has access to the last element
     * @param options FLIP animaiton options
     */
    function crossfade(first, last, cb, options) {
        const firstEl = getElement(first);
        const firstRect = firstEl.getBoundingClientRect();
        // @ts-ignore
        firstEl.style.visibility = 'hidden';
        const lastEl = getElement(last);
        cb(lastEl);
        const lastRect = lastEl.getBoundingClientRect();
        runFLIP(firstRect, lastRect, lastEl, options);
    }

    /**
     * Animate items of an element during a layout change
     * @param parent Query string for the parent
     * @param childrenQueryString Query string for all animatable child elements
     * @param cb Callback function to handle the layout change
     */
    function animateLayout(parent, childrenQueryString, cb, options) {
        const parentEl = getElement(parent);
        const childElements = parentEl.querySelectorAll(childrenQueryString);
        // Calculate all the DOMRects of the children with the first loop
        let firstRects = [];
        Array.from(childElements).map((child) => {
            const firstRect = child.getBoundingClientRect();
            firstRects.push(firstRect);
        });
        cb(parentEl);
        // Run FLIP after the layout change to calculate the second DOMRect
        childElements.forEach((child, i) => {
            const secondRect = child.getBoundingClientRect();
            runFLIP(firstRects[i], secondRect, child, options);
        });
    }

    const defaultOptions = {
        duration: 150,
        easing: 'linear',
    };
    /**
     * Animate the height of an element during layout changes
     * @param el Animating element
     * @param cb Callback function that adjusts layout
     * @param options WAAPI options for that animation
     */
    function animateHeightAuto(element, cb = () => null, options = defaultOptions) {
        const el = getElement(element);
        const beforeHeight = el.clientHeight;
        cb();
        const afterHeight = el.clientHeight;
        transformHeightDeltas(el, beforeHeight, afterHeight, options);
    }
    /**
     * Transform the height an element based on the delatas of two height
     * @param element Animated element
     * @param beforeHeight Starting height
     * @param afterHeight Ending height
     * @param options WAAPI options for the animation
     */
    function transformHeightDeltas(element, beforeHeight, afterHeight, options = defaultOptions) {
        element.animate([
            {
                transformOrigin: 'top left',
                height: beforeHeight + 'px',
            },
            {
                transformOrigin: 'top left',
                height: afterHeight + 'px',
            },
        ], options);
    }

    function setState(element, transitionName, state) {
        element.setAttribute(`data-${transitionName}`, state);
    }
    function mount(el) {
        const element = getElement(el);
        const transitionName = element.getAttribute('data-transition');
        // Remove inline styles previously set from the transitionend
        element.removeAttribute('style');
        // Don't run if the element is already mounted
        if (!element.hasAttribute('aria-hidden') ||
            element.getAttribute('aria-hidden') === 'false')
            return;
        const { clientHeight, clientWidth } = element;
        element.removeAttribute('aria-hidden');
        //@ts-ignore
        element.style = `
    visibility: visible;
    height: ${clientHeight}px;
    width: ${clientWidth}px;
  `;
        setState(element, transitionName, 'enter');
        element.addEventListener('transitionend', () => {
            //@ts-ignore
            element.style = `
    visibility: visible;
    height: ${clientHeight}px;
    width: ${clientWidth}px;
    `;
        });
    }
    function unmount(el) {
        const element = getElement(el);
        const transitionName = element.getAttribute('data-transition');
        // Don't run if the element is already unmounted
        if (element.getAttribute('aria-hidden') === 'true')
            return;
        // Remove inline styles previously set from the transitionend
        element.removeAttribute('style');
        setState(element, transitionName, 'exit');
        element.setAttribute('aria-hidden', 'true');
        element.addEventListener('transitionend', () => {
            //@ts-ignore
            element.style = `
    visibility: hidden;
    height: 0px;
    width: 0px;
    padding: 0px;
    `;
        });
    }
    function toggleMounting(el) {
        const element = getElement(el);
        const transitionName = element.getAttribute('data-transition');
        const transitionAttribute = element.getAttribute(`data-${transitionName}`);
        // Run the opposite of the current state
        if (!transitionAttribute || transitionAttribute === 'enter') {
            unmount(el);
        }
        else {
            mount(el);
        }
    }

    const config = {
        attributes: true,
        childList: true,
        subtree: true,
        characterData: true,
    };
    function watchHeightChange(element, cb, options = Object.assign(Object.assign({}, defaultOptions), config)) {
        let beforeHeight = element.clientHeight;
        const observerCallback = (mutations) => {
            for (const mutation of mutations) {
                const afterHeight = element.clientHeight;
                transformHeightDeltas(element, beforeHeight, afterHeight, options);
                beforeHeight = afterHeight;
                if (cb) {
                    cb({ mutation, element, beforeHeight, afterHeight });
                }
            }
        };
        const observer = new MutationObserver(observerCallback);
        return {
            observe: () => observer.observe(element, config),
            disconnect: () => observer.disconnect(),
        };
    }

    const math = {
        lerp: () => console.log('lerp'),
    };

    class Gallery {
        constructor(el, galleryOptions) {
            this.options = galleryOptions;
            this.el = getElement(el);
            this.items = getAllElements(galleryOptions.itemSelector, this.el);
            this.currentIndex = this.options.start;
            this.timer;
        }
        initTimer() {
            this.timer = requestInterval(() => {
                this.options.timerFn();
            }, this.options.timer);
        }
        resetTimer(cb) {
            if (this.timer) {
                clearRequestInterval(this.timer);
                this.initTimer();
            }
            else {
                cb();
            }
        }
        node() {
            return this.el;
        }
        getItems() {
            return this.items;
        }
        getIndex() {
            return this.currentIndex;
        }
        getCurrent() {
            return { index: this.currentIndex, element: this.items[this.currentIndex] };
        }
        getNext() {
            const nextIndex = loop([0, this.items.length - 1]).inc(this.currentIndex, 1);
            return { index: nextIndex, element: this.items[nextIndex] };
        }
        getPrevious() {
            const previousIndex = loop([0, this.items.length - 1]).dec(this.currentIndex, 1);
            return { index: previousIndex, element: this.items[previousIndex] };
        }
        getItem(index) {
            return { index, element: this.items[index] };
        }
        next(cb) {
            this.currentIndex = loop([0, this.items.length - 1]).inc(this.currentIndex, 1);
            if (cb) {
                cb(this.currentIndex);
            }
        }
        previous(cb) {
            this.currentIndex = loop([0, this.items.length - 1]).dec(this.currentIndex, 1);
            if (cb) {
                cb(this.currentIndex);
            }
        }
        log() {
            console.log({
                el: this.el,
                options: this.options,
                items: this.items,
                currentIndex: this.currentIndex,
                currentItem: this.items[this.currentIndex],
            });
        }
    }

    exports.Gallery = Gallery;
    exports.Watcher = Watcher;
    exports.animateHeightAuto = animateHeightAuto;
    exports.animateLayout = animateLayout;
    exports.clearRequestInterval = clearRequestInterval;
    exports.crossfade = crossfade;
    exports.defaultOptions = defaultOptions;
    exports.flip = flip;
    exports.getAllElements = getAllElements;
    exports.getElement = getElement;
    exports.loop = loop;
    exports.math = math;
    exports.mount = mount;
    exports.requestInterval = requestInterval;
    exports.runFLIP = runFLIP;
    exports.screen = screen;
    exports.toggleMounting = toggleMounting;
    exports.transformHeightDeltas = transformHeightDeltas;
    exports.unmount = unmount;
    exports.watchHeightChange = watchHeightChange;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}));
