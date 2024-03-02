// using an IIFE encapsulate and initialize my code below.
// global and docRef are aliases to the window and document that are
// passed into the IIFE params at the very bottom.
(function (global, docRef) {
  'use strict';

  // Base suggestion box template for reset purposes.
  const baseSuggestionTemplate = `
        <li>Filter for a city</li>
        <li>or a state</li>
      `;

  // Rest endpoint where we get city data.
  const endpoint =
    'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

  // City list container.
  let cities = [];
  // placeholder for runtime.
  // this can also be used for cleanup purposes,
  // look at the return statement of the initTypeaheadRuntime
  // function below.
  let typeaheadRuntime = undefined;

  /**
   * Main entry point.
   */
  function init() {
    // gets elements and initializes event listeners
    typeaheadRuntime = initTypeaheadRuntime();
    // load city data
    loadCities();
  }

  init();
  //////

  /**
   * Init typeahead functionality.
   * Grabs all relevant page elements and attaches event listeners.
   */
  function initTypeaheadRuntime() {
    // grab all relevent elements.
    const { searchInput, suggestions } = getElements();

    // init event listeners.
    searchInput.addEventListener('change', displayMatches);
    searchInput.addEventListener('keyup', displayMatches);

    // returns a cleanup function as best practice.
    // on init, this result is assigned to the variable on the top
    // called typeaheadRuntime. We don't use this in this example, but
    // if there were a need to clean up event listeners to prevent memory
    // leaks, a developer would just have to run typeaheadRuntime(), and
    // all event listeners would be removed.
    return function () {
      searchInput.removeEventListener('change', displayMatches);
      searchInput.removeEventListener('keyup', displayMatches);
    };
  }

  /**
   * This method is run on every change and keyup event triggered by the
   * search input element. The input text is pushed off to the findMatches method
   * to get a list of places that match the input on city or state and then
   * rendered out to the page for display.
   */
  function displayMatches() {
    const { suggestions } = getElements();
    const matchList = findMatches(this.value, cities);

    // If the match list length is 0, then
    // reset the suggestion box template and
    // bail out to prevent
    if (!matchList.length) {
      suggestions.innerHTML = baseSuggestionTemplate;
    } else {
      // Set the suggestion box to display matches
      // based on the provided search text.
      suggestions.innerHTML = matchList.map((place) => generateResultBody(place, this.value)).join('');
    }
  }

  /**
   * Generates an HTML Template for each result from the filtered
   * results list.
   */
  function generateResultBody(place, searchValue) {
    const matcher = searchValueMatcherFactory(searchValue);
    // Highlight matching text within the results for city and state.
    const cityName = place.city.replace(matcher, `<span class="hl">${searchValue}</span>`);
    const stateName = place.state.replace(matcher, `<span class="hl">${searchValue}</span>`);

    return `
        <li>
          <span class="name">${cityName}, ${stateName}</span>
          <span class="population">${numberWithCommas(place.population)}</span>
        </li>
      `;
  }

  /**
   * This method is run by the displayMatches method above. The purpose
   * of this method is to work with the list of cities we retrieved from the rest
   * endpoint when the application was loaded. In here, we filter the list down
   * to places that match input text on the city or state fields and return it back
   * to the displayMatches method for further processing.
   */
  function findMatches(wordToMatch, cities) {
    if (!wordToMatch) {
      return [];
    }

    const matcher = searchValueMatcherFactory(wordToMatch);
    return cities.filter((place) => {
      return place.city.match(matcher) || place.state.match(matcher);
    });
  }

  /**
   * Using the rest service, reach out to a URL
   * endpoint to get a list of cities. After we
   * retrieve the data, we assign it to the cities
   * variable declared at the top, and finally return
   * the response as a best practice.
   */
  function loadCities() {
    restGet(endpoint).then((response) => {
      cities = response;
      return response;
    });
  }

  /**
   * Grab all the elements we need to interact with on the page
   */
  function getElements() {
    const searchInput = docRef.querySelector('.search');
    const suggestions = docRef.querySelector('.suggestions');

    return {
      searchInput,
      suggestions,
    };
  }

  /**
   * Creates and returns a Regex text matcher
   */
  function searchValueMatcherFactory(value) {
    return new RegExp(value, 'gi');
  }

  // UTILS
  ////////////////////
  /**
   * Formats a number to have commas
   * Example: 100000000 => 100,000,000
   */
  function numberWithCommas(value) {
    if (Intl && Intl.NumberFormat) {
      // uses Intl API if supported
      const formatter = new Intl.NumberFormat('en-US');
      return formatter.format(value);
    } else {
      // uses a regex replace implementation
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }

  /**
   * Simple REST GET service that utilizes the browser fetch API.
   */
  function restGet(url) {
    return fetch(url).then((response) => {
      return response.json();
    });
  }
})(window, document);
