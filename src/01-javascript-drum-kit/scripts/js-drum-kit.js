// using an IIFE encapsulate and initialize my drum kit code below.
// global and docRef are aliases to the window and document that are
// passed into the IIFE params at the very bottom.
(function (global, docRef) {
  'use strict';

  /**
   * Main entrypoint to the drumkit code.
   */
  function init() {
    // init keydown listener
    initKeydownListener();
  }

  // this makes the init function operate
  // as the main entrypoint.
  init();
  /////////

  /**
   * Initialize keydown listener.
   */
  function initKeydownListener() {
    window.addEventListener('keydown', keyDownHandler);
  }

  /**
   * Handle keydown events.
   */
  function keyDownHandler(event) {
    // check to see if there is an audio element on the page with a selector that
    // matches the keycode of the pressed key. We use string interpolation here, make sure the selector format
    // translates to something like `audio[data-key="65"]`. The quotes around "65" are important.
    const audioEl = docRef.querySelector(`audio[data-key="${event.keyCode}"]`);

    // Get the corresponding key element for styling purposes.
    const keyEl = docRef.querySelector(`.key[data-key="${event.keyCode}"]`);

    // bail out if there is no associated audio element.
    // the query selector will return null when an audio element does not exist.
    if (!audioEl) return;

    // Play the sound.
    playSound(audioEl, keyEl);
  }

  /**
   * Play a sound based on the keypress behavior
   */
  function playSound(audioEl, keyEl) {
    // add the tra
    initKeyTransitionListener(keyEl);
    audioEl.currentTime = 0;
    audioEl.play();

    // Because the key element is used for styling purposes
    // only, we don't need a hard check above to avoid playing a sound.
    if (keyEl) {
      keyEl.classList.add('playing');
    }
  }

  /**
   * Encapsulate transitionend event handler behavior.
   *
   * Explanation:
   * This will attach a listener to a single key when pressed, execute the behavior
   * of removing the style, and then it cleans up and removes the event handler from
   * the key element.
   *
   * Sidebar:
   * The video does a good job of getting you there by setting an event handler
   * on each of the elements from the start, but because it is setting an event handler one time, the
   * behavior falls out of sync when pressing and holding a key. As a result, because of timing, a 'playing'
   * style can get stuck on an element.
   */
  function initKeyTransitionListener(keyEl) {
    // if the keyEl is null, an attempt to set a listener will result in an error.
    if (!keyEl) return;
    function handleKeyTransitionEnd() {
      this.classList.remove('playing');
      // remove the event listener from the keyEl element
      // after it has finished executing. Without this, there will be
      // a memory leak where a new listener is attached to a single key every
      // time it is pressed.
      keyEl.removeEventListener('transitionend', handleKeyTransitionEnd);
    }

    // Adds the event listener to the key element.
    keyEl.addEventListener('transitionend', handleKeyTransitionEnd);
  }
})(window, document);
