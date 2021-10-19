const {
  Watcher,
  watchHeightChange,
  flip,
  Gallery,
  percentScrolled,
} = humdinger;

const homeScrollWatcher = new Watcher(".home__scroll__illustration");
const scrollElements = document.querySelectorAll("[data-scroll]");

scrollElements.forEach((el) => {
  const element = new Watcher(el);

  element.scroll(
    "enter",
    () => {
      el.setAttribute("data-in-view", true);
    },
    {
      threshold: 1,
    }
  );
});

homeScrollWatcher.scroll(
  "enter",
  (el) => {
    el.setAttribute("data-in-view", true);
  },
  {
    threshold: 0.5,
  }
);

homeScrollWatcher.scroll(
  "exit",
  (el) => {
    el.removeAttribute("data-in-view");
  },
  {
    threshold: 0,
  }
);

const detailElements = document.querySelectorAll("details");

detailElements.forEach((el) => {
  watchHeightChange(el).observe();
});

// Home Hero
const homeHero = new Watcher(".home__hero");

percentScrolled(homeHero.el, (scrollPerc) => {
  console.log(scrollPerc);
  if (Math.floor(scrollPerc) === 50) {
    console.log("above 50");
  }
});

// Home Gallery
const homeGallery = new Gallery(".home__gallery", {
  itemSelector: ".home__gallery__items__item",
  start: 0,
  timer: 5000,
  timerFn: nextSlide,
});

const galleryNavButtons = document.querySelectorAll(
  ".home__gallery__nav__button"
);

const galleryItemsWrapper = homeGallery
  .node()
  .querySelector(".home__gallery__items");

galleryNavButtons.forEach((button, index) => {
  const navButton = new Watcher(button);

  navButton.click(() => {
    goToSlide(index);
  });
});

function nextSlide() {
  const next = homeGallery.getNext().element;
  const currentIndex = homeGallery.currentIndex;

  galleryItemsWrapper.scrollTo({
    top: 0,
    left: next.getBoundingClientRect().width * currentIndex,
  });

  updateButton();
  homeGallery.next();
}

function goToSlide(index) {
  const nextItem = homeGallery.getItem(index);

  galleryItemsWrapper.scrollTo({
    top: 0,
    left: nextItem.element.getBoundingClientRect().width * nextItem.index,
  });

  homeGallery.currentIndex = index;
  updateButton();
}

function updateButton() {
  galleryNavButtons.forEach((button, index) => {
    if (index === homeGallery.currentIndex) {
      button.setAttribute("data-current", "true");
    } else {
      button.setAttribute("data-current", "false");
    }
  });
}

homeGallery.initTimer();
