// using an IIFE encapsulate and initialize my code below.
// global and docRef are aliases to the window and document that are
// passed into the IIFE params at the very bottom.
(function (global, docRef) {
  'use strict';

  /**
   * Main entrypoint
   */
  function init() {
    // Add listeners to input elements.
    initControlChangeListeners();
  }

  init();
  ////////

  /**
   * Grab all input elements on the page and assign listeners.
   */
  function initControlChangeListeners() {
    // Grab all input elements.
    const inputs = docRef.querySelectorAll('.controls input');

    // Iterate over the nodelist of input elements
    inputs.forEach((input) => {
      // Standard input change event listener.
      input.addEventListener('change', handleUpdate);

      // added mousemove listener to apply changes while actively updating
      // input elements. Without this, changes would only apply after
      // letting go of the mouse button.
      input.addEventListener('mousemove', handleUpdate);
    });
  }

  /**
   * Run this code when an event triggers an update.
   */
  function handleUpdate() {
    // Sizing unit information attached as a data attribute
    // to the input element data-sizing="px"
    const suffix = this.dataset.sizing || '';

    // Grab the input element name
    const propertyName = `--${this.name}`;

    // Calculate the new value with proper unit sizing.
    const newValue = `${this.value}${suffix}`;

    // Because the base style information is set on the document :root
    // in css, this will update the root style variables on the document element
    // which override the stylesheet.
    docRef.documentElement.style.setProperty(propertyName, newValue);
  }
})(window, document);
