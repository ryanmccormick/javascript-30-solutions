// using an IIFE encapsulate and initialize my code below.
// global and docRef are aliases to the window and document that are
// passed into the IIFE params at the very bottom.
(function (global, docRef) {
  'use strict';

  /**
   * Main entrypoint into the clock code.
   */
  function init() {
    initClockTimer();
  }

  init();
  //////////////////

  /**
   * Clock initialization.
   * Gathers all clock hand elements and passes them into the
   * clock factory function to get the clock runner.
   */
  function initClockTimer() {
    const secondHandEl = docRef.querySelector('.second-hand');
    const minuteHandEl = docRef.querySelector('.min-hand');
    const hourHandEl = docRef.querySelector('.hour-hand');

    // The use of a factory is for keeping the code tidy, this can be done several
    // different ways. I chose this approach because it is clean and I like it.
    const clockRunner = clockRunnerFactory(secondHandEl, minuteHandEl, hourHandEl);

    // Set an interval to run the clock runner function every 1000ms (1 second)
    setInterval(clockRunner, 1000);
  }

  /**
   * Returns a new function that has access to the clock hand elements passed in
   * through the factory params. The function passed back gets the current time,
   * calculates the position for the clock hands for each time it is executed, which
   * in this case is every second, and then applies the correct transition style to
   * set the position of the clock hands.
   */
  function clockRunnerFactory(secondHandEl, minHandEl, hourHandEl) {
    const MAX_SECONDS = 60;
    const MAX_MINUTES = 60;
    const MAX_HOURS = 12;
    const DEGREES_CIRCLE = 360;
    const STYLE_OFFSET = 90;

    return function () {
      // Get current time
      const now = new Date();
      const seconds = now.getSeconds();
      const minutes = now.getMinutes();
      const hours = now.getHours();

      // Get degree calculations for clock hand positioning
      const secDeg = (seconds / MAX_SECONDS) * DEGREES_CIRCLE + STYLE_OFFSET;
      const minDeg = (minutes / MAX_MINUTES) * DEGREES_CIRCLE + STYLE_OFFSET;
      const hourDeg = (hours / MAX_HOURS) * DEGREES_CIRCLE + STYLE_OFFSET;

      // Apply style transformations to clock hand elements.
      secondHandEl.style.transform = `rotate(${secDeg}deg)`;
      minHandEl.style.transform = `rotate(${minDeg}deg)`;
      hourHandEl.style.transform = `rotate(${hourDeg}deg)`;
    };
  }
})(window, document);
