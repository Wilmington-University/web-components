/**
 * @HELPER FUNCTIONS
 *
 * @description Helper functions to make life easier.
 */

/**
 * @DOCUMENT READY
 *
 * @description Helper function that executes when document is loaded.
 * @example     readyDoc( addClassMS() );
 */

function readyDoc(fn) {
  document.addEventListener("DOMContentLoaded", () => {
    fn();
  });
}

/**
 * @GETELEMENTBYID
 *
 * @description Helper function for selecting the matching element only, context is optional
 * @example     getID("foo");
 */

var getID = (selector, context) => (context || document).getElementById(selector);

/**
 * @QUERYSELECTOR
 *
 * @description Helper function for selecting the first matching element only, context is optional
 * @example     QS(".foo");
 */

var QS = (selector, context) => (context || document).querySelector(selector);

/**
 * @ADDCLASS
 * @HASCLASS
 * @REMOVECLASS
 * @TOGGLECLASS
 *
 * @description Helper function for adding, removing, toggling or checking existence of class for matching element only.
 * @example     addClass(el, 'foo');
 */

var addClass = (el, className) => el.classList.add(className),
  hasClass = (el, className) => el.classList.contains(className),
  removeClass = (el, className) => el.classList.remove(className),
  toggleClass = (el, className) => el.classList.toggle(className);

let AC = (el, className) => el.classList.add(className);
let HC = (el, className) => el.classList.contains(className);
let RC = (el, className) => el.classList.remove(className);
let TC = (el, className) => el.classList.toggle(className);

/**
 * @OPEN LINK IN NEW TAB
 *
 * @description Helper function for opening all links in new tabs.
 *
 */
var cpOpenLinkTab = function () {
  const links = document.querySelectorAll(
    "a[href^='https://'], a[href^='http://']"
  );
  const host = window.location.hostname;
  const isInternalLink = (link) => new URL(link).hostname === host;
  links.forEach((link) => {
    if (isInternalLink(link)) return;
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener");
  });
};
/**
 * @EXPORT AS ES MODULES
 *
 * @description ES modules exported for use in Codepen, codesandbox JS.
 */

export {
  readyDoc,
  getID,
  QS,
  addClass,
  hasClass,
  removeClass,
  toggleClass,
  AC,
  HC,
  RC,
  TC,
  cpOpenLinkTab
};
