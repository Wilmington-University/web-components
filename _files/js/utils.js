/**
 * @HELPER FUNCTIONS
 *
 * @description Helper functions to make life easier.
 */

/**
 * @namespace Ready
 *
 * @example
 * // Runs function on document ready event
 * readyDoc( addClassMS() );
 */

function readyDoc(fn) {
  document.addEventListener("DOMContentLoaded", () => {
    fn();
  });
}

/**
 * @GETELEMENTBYID
 *
 * Helper function for selecting the matching element only, context is optional
 * 
 * @example     getID("foo");
 */

let getID = (elem, context) => (context || document).getElementById(elem);

/**
 * @QUERYSELECTOR
 *
 * Helper function for selecting the first matching element only, context is optional
 * 
 * @example     QS(".foo");
 */

let QS = (elem, context) => (context || document).querySelector(elem);

/**
 * @namespace Classes
 */
/**
 * @typedef {Object} Classes.Add
 * @memberOf Classes
 * 
 * @see https://barker.codes/blog/an-addclass-helper-function/
 * @see https://gist.github.com/kieranbarker/8645fa081f7030857e4df812d0e2e044
 * 
 * @example     AC("#some-element", "new-class");
 */

/**
 * Add a class to an element
 * @param {Object|String} elem - A reference to an element or a CSS selector string.
 * @param {String}        className - The class name
 */
function AC(elem, className) {
  if (elem instanceof Element) {
    elem.classList.add(className);
  } else if (typeof elem === "string") {
    document.querySelector(elem).classList.add(className);
  }
}

/**
 * @typedef {Object} Classes.Remove
 * @memberOf Classes
 * 
 * @example RC("#some-element", "new-class");
 */

/**
 * Remove a class from an element
 * @param {Object|String} elem - A reference to an element or a CSS selector string.
 * @param {String}        className - The class name
 */
function RC(elem, className) {
  if (elem instanceof Element) {
    elem.classList.remove(className);
  } else if (typeof elem === "string") {
    document.querySelector(elem).classList.remove(className);
  }
}

/**
 * @typedef {Object} Classes.Has
 * @memberOf Classes
 * 
 * @example     HC("#some-element", "new-class");
 */

/**
 * Element has a class
 * @param {Object|String} elem - A reference to an element or a CSS selector string.
 * @param {String}        className - The class name
 */
function HC(elem, className) {
  if (elem instanceof Element) {
    elem.classList.add(className);
  } else if (typeof elem === "string") {
    document.querySelector(elem).classList.contains(className);
  }
}

/**
 * @typedef {Object} Classes.Toggle
 * @memberOf Classes
 * 
 * @example     TC("#some-element", "new-class");
 */

/**
 * Add a class to an element
 * @param {Object|String} elem - A reference to an element or a CSS selector string.
 * @param {String}        className - The class name
 */
function TC(elem, className) {
  if (elem instanceof Element) {
    elem.classList.add(className);
  } else if (typeof elem === "string") {
    document.querySelector(elem).classList.toggle(className);
  }
}


/**
 * @typedef {Object} Classes.Add, Classes.Remove
 * @memberOf Classes
 * 
 * @see   https://gomakethings.com/how-to-create-vanilla-javascript-helper-functions-to-add-and-remove-classes-from-multiple-elements/
 * @example     
 *  1. Define selector variable. (let p = document.querySelectorAll('p');)
 *  2. addClass(p, 'color-blue', 'text-bold');
 *  3. removeClass(p, 'color-purple');
 * 
 */

/**
 * Add/Remove a class(es) to ALL specific elements
 * 
 * @param {Object|String} elem - A reference to an element or a CSS selector string.
 * @param {String}        className - The class name
 */
// Get all paragraph elements


function ACM(elems, ...classes) {
  // Add the .color-blue class
  for (let elem of elems) {
    elem.classList.add(...classes);
  }
}

function RCM(elems, ...classes) {
  for (let elem of elems) {
    elem.classList.remove(...classes);
  }
}


/**
 * @EXPORT AS ES MODULES
 *
 * ES modules exported for use in Codepen, codesandbox JS.
 */

export {
  readyDoc,
  getID,
  QS,
  AC,
  HC,
  RC,
  TC,
  ACM,
  RCM
};
