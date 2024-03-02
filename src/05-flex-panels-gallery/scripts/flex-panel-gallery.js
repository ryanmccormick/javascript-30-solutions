// using an IIFE encapsulate and initialize my code below.
// global and docRef are aliases to the window and document that are
// passed into the IIFE params at the very bottom.
(function (global, docRef) {
  'use strict';

  function init() {
    initGallery();
  }

  init();
  /////////

  function initGallery() {
    const panels = docRef.querySelectorAll('.panel');
    panels.forEach((panel) => panel.addEventListener('click', toggleOpen));
    panels.forEach((panel) => panel.addEventListener('transitionend', toggleActive));
  }

  function toggleOpen() {
    this.classList.toggle('open');
  }

  function toggleActive(event) {
    if (event.propertyName.includes('flex')) {
      this.classList.toggle('open-active');
    }
  }
})(window, document);
