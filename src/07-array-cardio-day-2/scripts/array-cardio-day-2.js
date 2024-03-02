(function (global, docRef) {
  'use strict';

  function init() {
    runIsOnePersonAtLeast19OrOlder();
    runIsEveryone19OrOlder();
    runFindCommentWithSpecificId();
    runDeleteCommentWithSpecificId();
  }

  init();
  //////

  /**
   * Array.prototype.some()
   * Is at least one person 19 or older?
   */
  function runIsOnePersonAtLeast19OrOlder() {
    const currentYear = new Date().getFullYear();

    const result = getPeopleData().some((person) => {
      const age = currentYear - person.year;
      return age >= 19;
    });

    console.log(`EXERCISE 1: Determine if at least one person is age 19 or older.`);
    console.log('Is at least one person 19 or older?', result ? 'YES' : 'NO');
  }

  /**
   * Array.prototype.every()
   * Is everyone 19 or older?
   */
  function runIsEveryone19OrOlder() {
    const currentYear = new Date().getFullYear();

    const result = getPeopleData().every((person) => {
      const age = currentYear - person.year;
      return age >= 19;
    });
    console.log('\n-----------------------------\n');
    console.log(`EXERCISE 2: Determine if everyone is age 19 or older.`);
    console.log('Is everyone 19 or older?', result ? 'YES' : 'NO');
  }

  /**
   * Array.prototype.find()
   * Find is like filter, but instead returns just the one you are looking for
   * find the comment with the ID of 823423
   */
  function runFindCommentWithSpecificId() {
    const targetId = 823423;
    const result = getCommentData().find((comment) => comment.id === targetId);

    console.log('\n-----------------------------\n');
    console.log(`EXERCISE 3: Find comment with ID: ${targetId}`);
    console.log(`Comment with ID: ${targetId}:\n`, result ? fmtJSON(result) : 'NOT FOUND');
  }

  /**
   * Array.prototype.findIndex()
   * Find the comment with this ID
   * delete the comment with the ID of 823423
   */
  function runDeleteCommentWithSpecificId() {
    const targetId = 823423;
    const finderFn = function (comment) {
      return comment.id === targetId;
    };

    const result = getCommentData().find(finderFn);

    console.log('\n-----------------------------\n');
    console.log(`EXERCISE 4: Find and remove comment with ID: ${targetId}`);
    console.log(`Step 1: Find comment with ID: ${targetId}:\n`, result ? fmtJSON(result) : 'NOT FOUND');
    console.log('Step 2: Delete comment with ID');
    const resultsWithCommentRemoved = getCommentData().filter((comment) => {
      return comment.id !== targetId;
    });

    const newResult = resultsWithCommentRemoved.find(finderFn);
    console.log(
      `Step 3: Find comment with ID: ${targetId} after delete:\n`,
      newResult ? fmtJSON(newResult) : 'NOT FOUND',
    );
  }

  function getPeopleData() {
    return [
      { name: 'Wes', year: 1988 },
      { name: 'Kait', year: 1986 },
      { name: 'Irv', year: 1970 },
      { name: 'Lux', year: 2015 },
    ];
  }

  function getCommentData() {
    return [
      { text: 'Love this!', id: 523423 },
      { text: 'Super good', id: 823423 },
      { text: 'You are the best', id: 2039842 },
      { text: 'Ramen is my fav food ever', id: 123523 },
      { text: 'Nice Nice Nice!', id: 542328 },
    ];
  }

  function fmtJSON(obj) {
    try {
      return JSON.stringify(obj, null, 2);
    } catch (exception) {
      return obj;
    }
  }
})(window, document);
