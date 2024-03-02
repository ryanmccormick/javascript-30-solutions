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
