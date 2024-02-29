/**
 * @FULLSCREEN FUNCTIONS
 *
 * @description HTML5 Video Fullscreen Modules.
 */

/**
 *  @SET FULLSCREEN STATE CALLBACK FUNCTION
 *  @description Set the video container's fullscreen state.
 *  @description Set the fullscreen button's 'data-state' which allows the correct button image to be set via CSS.
 *  @function setFullscreenData()
 *
 */
let setFullscreenData = function (state) {
  videoContainer.setAttribute("data-fullscreen", !!state);
  fullscreen.setAttribute("data-state", !!state ? "exit-fullscreen" : "enter-fullscreen");
};

/**
 *  @IS FULLSCREEN MODE CALLBACK FUNCTION
 *  @desciption Checks if the document is currently in fullscreen mode.
 *  @function isFullScreen
 */
let isFullScreen = function () {
  return !!(document.fullscreenElement || document.webkitFullscreenElement);
};

/**
 *  @EXIT FULLSCREEN MODE CALLBACK FUNCTION
 *  @description Exits fullscreen mode. Can only be called on document.
 *  @function ExitFullScreen
 */
let ExitFullScreen = function () {
  return !!(document.exitFullscreen() || document.webkitCancelFullScreen());
};

/**
 *  @REQUEST FULLSCREEN MODE CALLBACK FUNCTION
 *  @description Requests fullscreen mode.
 *  @function RequestFullScreen()
 */
let RequestFullScreen = function () {
  return !!(
    videoContainer.requestFullscreen() ||
    videoContainer.webkitEnterFullScreen()
  );
};

/**
 *  @FULLSCREEN HANDLER CALLBACK FUNCTION
 *  
 *  @description Handles fullscreen options. RequestFullScreen() can be called on document, but the * specific element is used to ensure the element's children, the custom controls, go * fullscreen.
 *  @function handleFullscreen()
 */
let handleFullscreen = function () {
  if (isFullScreen()) {
    ExitFullScreen();
    setFullscreenData(false);
  } else {
    RequestFullScreen();
  }
  setFullscreenData(true);
};

/**
 *  @SET FULLSCREEN DATA FUNCTION CLICK EVENT
 *  
 *  @description Listen for fullscreen change events (from other controls, e.g. right clicking on the video itself).
 *  @function fullScreenChange()
 */
function fullScreenChange() {
  setFullscreenData(!!document.fullscreenElement);
}

/**
 *  @WEBKIT SET FULLSCREEN DATA FUNCTION CLICK EVENT
 *  
 *  @description Needed for webkit browsers).
 *  @function webkitfullScreenChange() webkit browsers.
 */
function webkitfullScreenChange() {
  setFullscreenData(!!document.webkitIsFullScreen);
}

/**
 * @EXPORT AS ES MODULES
 *
 * @description ES modules exported for use in Codepen, codesandbox JS.
 */

export {
  setFullscreenData,
  isFullScreen,
  ExitFullScreen,
  RequestFullScreen,
  handleFullscreen,
  fullScreenChange,
  webkitfullScreenChange
};
