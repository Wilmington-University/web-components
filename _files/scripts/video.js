/* 
@see 
    https://web.dev/media-mobile-web-video-playback/
    https://googlesamples.github.io/web-fundamentals/fundamentals/media/mobile-web-video-playback.html
    https://github.com/googlesamples/web-fundamentals/tree/gh-pages/fundamentals/media/mobile-web-video-playback.html
*/
import {
  getID,
  QS,
  AC,
  RC,
  TC
} from "_files/scripts/utils.js";

(function () {
  "use strict";

  /**
   *  DECLARE CONTAINER, BUTTONS AND OTHER ELEMENT CONSTANTS
   */
  const videoContainer = getID(`videoContainer`),
    video = getID(`video-hero`),
    videoPoster = getID(`videoPoster`),
    videoControls = getID(`video-controls`),
    playpause = getID(`playpause`),
    restart = getID(`restart`),
    mute = getID(`mute`),
    volumeControl = getID(`vol-control`),
    progress = getID(`progress`),
    progressBar = getID(`progress-bar`),
    videoCurrentTime = getID(`videoCurrentTime`),
    videoDuration = getID(`videoDuration`),
    fullscreen = getID(`fullScreen`),
    textTracks = video.textTracks,
    subtitles = getID(`subtitles`);

  /**
   *  *Hide the default video controls.
   *
   *  @type Boolean
   *  @default false
   */
  video.controls = false;

  /**
   *  *Display the user defined video controls
   *
   *  @type {HTMLElement}
   *  @return {String}
   */
  videoControls.setAttribute("data-state", "visible");

  /**
   *  *WINDOW LOAD EVENT CALLBACK FUNCTION
   *  *Sets the play and mute data states when the widow is finished loading.
   *  @callback
   *
   */

  let setLoadStates = () => {
    if (video.muted) {
      console.log("muted");
      mute.setAttribute(`data-state`, "unmute");
      mute.setAttribute(`aria-label`, "Audio is off.");
    } else {
      console.log("not muted");
      mute.setAttribute(`aria-label`, "Audio is on.");
      mute.setAttribute(`data-state`, "mute");
    }
    if (video.play) {
      console.log("playing");
      playpause.setAttribute(`aria-label`, "Video is playing.");
      playpause.setAttribute(`data-state`, "pause");
      playpause.focus();
    }
    setVolume;
  };

  /**
   *  *WINDOW LOAD EVENT FUNCTION
   *  *Calls setLoadStates
   *
   */
  window.addEventListener("load", () => {
    setLoadStates;
  });

  /**
   * *VIDEO LOADMETADATA EVENT CALLBACK FUNCTION
   * *Wait for the video's meta data to be loaded, then set the progress bar's max value to the duration of the video.
   * @callback
   *
   */
  let loadedMetaData = () => {
    console.log("metadata");
    progress.setAttribute("max", video.duration);
    videoDuration.textContent = secondsToTimeCode(video.duration);
    videoCurrentTime.textContent = secondsToTimeCode(video.currentTime);
    progressBar.style.transform = `scaleX(${video.currentTime / video.duration
      })`;
  };

  /**
   * *VIDEO LOADMETADATA EVENT FUNCTION
   * *Calls loadedMetaData
   *
   */
  video.addEventListener("loadedmetadata", () => {
    loadedMetaData();
  });

  /**
   *  *FULLSCREEN FUNCTIONS
   *
   *  HTML5 Video Fullscreen Modules.
   */

  /**
   *  * SET FULLSCREEN STATE CALLBACK FUNCTION
   *  Set the video container's fullscreen state.
   *  Set the fullscreen button's 'data-state' which allows the correct button image to be set via CSS.
   *  @callback
   *  @param  state
   *  @param  label
   *
   */
  let setFullscreenData = (state, label) => {
    videoContainer.setAttribute("data-fullscreen", !!state);
    fullscreen.setAttribute(
      `data-state`,
      !!state ? "exit-fullscreen" : "enter-fullscreen"
    );
    fullscreen.setAttribute(
      `aria-label`,
      !!state ? "Video is fullscreen." : "Video is normal size."
    );
  };

  /**
   *  * IS FULLSCREEN MODE CALLBACK FUNCTION
   *  Checks if the document is currently in fullscreen mode.
   *  @callback
   */
  let isFullScreen = () => {
    return !!(document.fullscreenElement || document.webkitFullscreenElement);
  };

  /**
   *  * EXIT FULLSCREEN MODE CALLBACK FUNCTION
   *  Exits fullscreen mode. Can only be called on document.
   *  @callback
   */
  let ExitFullScreen = function () {
    return !!(document.exitFullscreen() || document.webkitCancelFullScreen());
  };

  /**
   *  * REQUEST FULLSCREEN MODE CALLBACK FUNCTION
   *  * Requests fullscreen mode.
   *  @callback
   */
  let RequestFullScreen = () => {
    return !!(
      videoContainer.requestFullscreen() ||
      videoContainer.webkitEnterFullScreen()
    );
  };

  /**
   *  * FULLSCREEN HANDLER CALLBACK FUNCTION
   *  * Handles fullscreen options. RequestFullScreen() can be called on document, but the * specific element is used to ensure the element's children, the custom controls, go * fullscreen.
   *  @callback
   */
  let handleFullscreen = () => {
    if (isFullScreen()) {
      ExitFullScreen();
      setFullscreenData(false);
    } else {
      RequestFullScreen();
    }
    setFullscreenData(true);
  };

  /**
   *  * SET FULLSCREEN DATA FUNCTION CLICK EVENT
   *
   *  * Listen for fullscreen change events (from other controls, e.g. right clicking on the video itself).
   *  @callback
   */
  let fullScreenChange = () => {
    setFullscreenData(!!document.fullscreenElement);
  };

  /**
   *  * WEBKIT SET FULLSCREEN DATA FUNCTION CLICK EVENT
   *
   *  * Needed for webkit browsers).
   *  @callback
   */
  let webkitfullScreenChange = () => {
    setFullscreenData(!!document.webkitIsFullScreen);
  };

  /*
   *  FULLSCREEN BUTTON CLICK EVENT
   *  Calls the handle fullscreen function for fullscreen options.
   *
   *  The webkitEnterFullscreen() method can be invoked only in response to a user action, such as clicking a button. You cannot invoke in response to a load event.
   *
   * @see https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/ControllingMediaWithJavaScript/ControllingMediaWithJavaScript.html#//apple_ref/doc/uid/TP40009523-CH3-SW1
   *
   * @typedef {object} ClickEvent
   */
  fullscreen.addEventListener("click", (e) => {
    e.stopPropagation();
    handleFullscreen();
  });

  subtitles.addEventListener("click", () => {
    setTimeout(() => QS(".subtitles-menu").focus(), 1);
  });

  /*
   *  SECONDS TO TIMECODE CONVERSION FUNCTION
   *  Converts video time from seconds to timecode.
   * @see {@link https://web.dev/media-mobile-web-video-playback/}
   */
  function secondsToTimeCode(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return [h, m > 9 ? m : "0" + m, s > 9 ? s : "0" + s]
      .filter(Boolean)
      .join(":");
  }
  // As the video is playing, update the progress bar
  //   video.addEventListener("timeupdate", function () {
  //     // For mobile browsers, ensure that the progress element's max attribute is set
  //     if (!progress.getAttribute("max"))
  //       progress.setAttribute("max", video.duration);

  //     videoCurrentTime.textContent = secondsToTimeCode(video.currentTime);
  //     progressBar.style.transform = `scaleX(${
  //       video.currentTime / video.duration
  //     })`;

  //     progress.value = video.currentTime;
  //     progressBar.style.width =
  //       Math.floor((video.currentTime / video.duration) * 100) + "%";
  //   });

  /*
   *  PROGRESS() FUNCTION CLICK EVENT
   *  React to the user clicking within the progress bar.
   */
  progress.addEventListener("click", function (e) {
    //var pos = (e.pageX  - this.offsetLeft) / this.offsetWidth; // Also need to take the parent into account here as .controls now has position:relative
    var pos =
      (e.pageX - (this.offsetLeft + this.offsetParent.offsetLeft)) /
      this.offsetWidth;
    video.currentTime = pos * video.duration;
  });

  // Listen for fullscreen change events (from other controls, e.g. right clicking on the video itself)

  //   document.addEventListener("fullscreenchange", function (e) {
  //     setFullscreenData(!!document.fullscreenElement);
  //   });

  //   document.addEventListener("onwebkitfullscreenchange", function () {
  //     setFullscreenData(!!document.webkitIsFullScreen);
  //   });

  // Turn off all subtitles
  for (const textTrack of textTracks) {
    textTrack.mode = "hidden";
  }

  // Creates and returns a menu item for the subtitles language menu
  var subtitleMenuButtons = [];
  var createMenuItem = function (id, lang, label) {
    var listItem = document.createElement("li");
    var button = listItem.appendChild(document.createElement("button"));
    button.setAttribute("id", id);
    button.className = "subtitles-button";
    if (lang.length > 0) button.setAttribute("lang", lang);
    button.value = label;
    button.setAttribute("data-state", "inactive");
    button.appendChild(document.createTextNode(label));
    button.addEventListener("click", function (e) {
      // Set all buttons to inactive
      subtitleMenuButtons.map(function (v, i, a) {
        subtitleMenuButtons[i].setAttribute("data-state", "inactive");
      });
      // Find the language to activate
      var lang = this.getAttribute("lang");
      for (const textTrack of textTracks) {
        // For the 'subtitles-off' button, the first condition will never match so all will subtitles be turned off
        if (textTrack.language == lang) {
          textTrack.mode = "showing";
          this.setAttribute("data-state", "active");
        } else {
          textTrack.mode = "hidden";
        }
      }
      subtitlesMenu.style.display = "none";
    });
    subtitleMenuButtons.push(button);
    return listItem;
  };
  // Go through each one and build a small clickable list, and when each item is clicked on, set its mode to be "showing" and the others to be "hidden"
  var subtitlesMenu;
  if (video.textTracks) {
    var df = document.createDocumentFragment();
    var subtitlesMenu = df.appendChild(document.createElement("ul"));
    subtitlesMenu.className = "subtitles-menu";
    subtitlesMenu.appendChild(createMenuItem("subtitles-off", "", "Off"));
    for (const textTrack of textTracks) {
      subtitlesMenu.appendChild(
        createMenuItem(
          "subtitles-" + textTrack.language,
          textTrack.language,
          textTrack.label
        )
      );
    }
    videoContainer.appendChild(subtitlesMenu);
  }
  subtitles.addEventListener("click", subtitlesCallback, false);

  // function subtitlesCallback(e) {
  //   if (subtitlesMenu) {
  //     subtitlesMenu.style.display =
  //       subtitlesMenu.style.display == "block" ? "none" : "block";
  //   }
  // }

  /*
   * @see https://stackoverflow.com/questions/72006912/add-focus-to-pop-up-modal-on-click-for-tabbing-accessibility-javascript
   */
  function subtitlesCallback(e) {
    let subTitlesOffButton = document.querySelector("#subtitles-off");
    if (subtitlesMenu) {
      setTimeout(() => subTitlesOffButton.focus(), 1);
      //TC(subtitlesMenu, "active");
      subtitlesMenu.style.display =
        subtitlesMenu.style.display == "block" ? "none" : "block";
    }
  }

  function loadMetaData() {
    progress.setAttribute(`max`, video.duration);
    videoDuration.textContent = secondsToTimeCode(video.duration);
    videoCurrentTime.textContent = secondsToTimeCode(video.currentTime);
    progressBar.style.transform = `scaleX(${video.currentTime / video.duration
      })`;
  }

  function timeUpdate() {
    // For mobile browsers, ensure that the progress element's max attribute is set
    if (!progress.getAttribute(`max`))
      progress.setAttribute(`max`, video.duration);
    videoCurrentTime.textContent = secondsToTimeCode(video.currentTime);
    videoDuration.textContent = secondsToTimeCode(video.duration);
    progressBar.style.transform = `scaleX(${video.currentTime / video.duration
      })`;
    progress.value = video.currentTime;
    progressBar.style.width =
      Math.floor((video.currentTime / video.duration) * 100) + `%`;
  }

  /**
   * CHANGE MUTE BUTTON STATE CALLBACK FUNCTION
   * Changes the button state of the mute button so the correct icons and accessible labels can be displayed.
   *
   * @var changeButtonState
   *
   */
  let changeButtonState = function (type) {
    if (type == "mute") {
      mute.setAttribute("data-state", video.muted ? "unmute" : "mute");
      mute.setAttribute(
        "aria-label",
        video.muted ? "Audio is off." : "Audio is on."
      );
    }
  };

  let playPauseEvent = function () {
    e.stopPropagation();
    if (video.paused) {
      video.play();
      TC(videoPoster, "hide");
    } else {
      video.pause();
    }
  };
  /**
   * CHANGE PLAY/PAUSE BUTTON STATES CALLBACK FUNCTION
   * Changes the button state of the play/pause button so the correct icons and accessible labels can be displayed.
   *
   * @var changeButtonState
   *
   */
  video.addEventListener("playing", () => {
    playpause.setAttribute("data-state", "pause");
    playpause.setAttribute("aria-label", "Video is playing.");
    AC(videoPoster, "hide");
  });

  video.addEventListener("pause", () => {
    playpause.setAttribute("data-state", "play");
    playpause.setAttribute("aria-label", "Video is paused.");
  });

  video.addEventListener("ended", () => {
    playpause.setAttribute("data-state", "play");
    video.currentTime = 0;
    RC(videoPoster, "hide");
  });

  /**
   *  PLAY/PAUSE BUTTON CLICK EVENT
   *  call event.stopPropagation() to prevent parent handlers (e.g. video controls) from being notified of the click event.
   *
   */
  // Add events for all buttons
  playpause.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (video.paused) {
      video.play();
      TC(videoPoster, "hide");
    } else {
      video.pause();
    }
  });

  function Play(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();
    if (video.paused) {
      video.play();
      TC(videoPoster, "hide");
    } else {
      video.pause();
    }
  }
  /*
   *  RESTART BUTTON CLICK EVENT
   *  The Media API has no 'restart()' function, so pause the video and reset its time, poster image and the progress bar.
   */

  restart.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    Restart(e);
  });

  function Restart() {
    video.pause();
    video.currentTime = 0;
    progress.value = 0;
    if (
      video.poster !== null &&
      videoPoster.classList.contains("hide") !== true
    ) {
      video.setAttribute("preload", "");
      video.setAttribute("poster", videoPoster.src);
    } else {
      TC(videoPoster, "hide");
    }
  }

  /*
   *  MUTE BUTTON CLICK EVENT
   *  Calls changeButtonState() which changes button icon when invoked.
   */
  mute.addEventListener("click", (e) => {
    video.muted = !video.muted;
    changeButtonState("mute");
  });

  /**
   *  REDUCE MOTION QUERY EVENT AND CALLBACK FUNCTION
   *  An accessibility option for users who prefer reduced motion.
   *  Calls viewport motion function via the matches property.
   *  Updates the play/pause icon.
   * @see https://gist.github.com/vanaf1979/b0d10bbf6a5bb4b4a92958aa25a7b36f#file-vanilla-redued-motion-js
   */
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  motionQuery.addEventListener("change", viewportMotion);

  viewportMotion(motionQuery);

  function viewportMotion(motionQuery) {
    if (motionQuery.matches) {
      changeButtonState("playpause");
    }
  }

  /**
   *  REWIND CALLBACK FUNCTION
   *  Set the current time when invoked.
   */
  const skipTime = 5;
  function Rewind(e) {
    video.currentTime = Math.max(video.currentTime - skipTime, 0);
  }

  /**
   *  FORWARD CALLBACK FUNCTION
   *  Set the current time when invoked.
   */
  function Forward(e) {
    video.currentTime = Math.min(video.currentTime + skipTime, video.duration);
  }

  /**
   *  SET VOLUME CALLBACK FUNCTION
   *  Set the video volume via keyboard when invoked.
   * Get the volume of audio#player and multiply it by 10 so
   * it's a whole number which is easier to increment.
   *
   *  @see https://www.codespeedy.com/html5-player-volume-control-key/
   */
  let setVolume = function (e) {
    const currentVolume = Math.floor(video.volume * 10) / 10;

    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        if (currentVolume < 1) {
          try {
            video.volume += 0.2;
          } catch (err) {
            video.volume = 1;
          }
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        if (currentVolume > 0) {
          try {
            video.volume -= 0.2;
          } catch (err) {
            video.volume = 0;
          }
        }
        break;
    }
  };

  // https://www.codespeedy.com/html5-player-volume-control-key/
  // function setVolume(e) {
  //   /*
  //    * Get the volume of audio#player and multiply it by 10 so
  //    * it's a whole number which is easier to increment.
  //    */
  //   var audio_vol;
  //   switch (event.key) {
  //     case "ArrowUp":
  //       event.preventDefault();
  //       audio_vol = video.volume;
  //       if (audio_vol != 1) {
  //         try {
  //           video.volume = audio_vol + 0.3;
  //         } catch (err) {
  //           video.volume = 1;
  //         }
  //       }
  //       break;
  //     case "ArrowDown":
  //       event.preventDefault();
  //       audio_vol = video.volume;
  //       if (audio_vol != 0) {
  //         try {
  //           video.volume = audio_vol - 0.3;
  //         } catch (err) {
  //           video.volume = 0;
  //         }
  //       }
  //       break;
  //   }
  // }

  /** DOCUMENT EVENTS **/
  function keyboardHandle(e) {
    switch (e.key) {
      case "ArrowLeft" || "J":
        Rewind(e);
        break;
      case "ArrowRight" || "L":
        Forward();
        break;
      case "p":
        Play(e);
        break;
      case "r":
        e.preventDefault();
        Restart(e);
        break;
      case "m":
        e.preventDefault();
        video.muted = !video.muted;
        changeButtonState("mute");
        break;
      case "f":
        e.preventDefault();
        handleFullscreen(e);
        break;
      case "c":
        e.preventDefault();
        subtitlesCallback(e);
        break;
      default:
        setVolume(e);
    }
    //e.preventDefault();
  }

  document.addEventListener("keydown", keyboardHandle, false);
  document.addEventListener("fullscreenchange", fullScreenChange);
  document.addEventListener("onwebkitfullscreenchange", webkitfullScreenChange);
  video.addEventListener("loadedmetadata", loadMetaData);
  video.addEventListener("timeupdate", timeUpdate);
  //video.addEventListener("play", playChangeButton, false);
  video.addEventListener("pause", pauseChangeButton, false);

  function playChangeButton() {
    changeButtonState(`playpause`);
  }

  function pauseChangeButton() {
    changeButtonState(`playpause`);
  }

  function clickPlayPause(e) {
    e.stopPropagation();
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }
})();

/**
 * DETECTING AUTOPLAY FAILURE AS A FALLBACK
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide}
 */
const video = document.getElementById("video-hero");
video.addEventListener("play", handleFirstPlay, false);

let hasPlayed = false;
function handleFirstPlay(event) {
  if (!hasPlayed) {
    hasPlayed = true;
    console.log("handleFirstPlay");
    // Remove listener so this only gets called once.
    const vid = event.target;
    vid.removeEventListener("play", handleFirstPlay);

    // Start whatever you need to do after first playback has started
  }
}

let startPlayPromise = video.play();

if (startPlayPromise !== undefined) {
  startPlayPromise
    .then(() => {
      // Start whatever you need to do only after playback
      // has begun.
      //changeButtonState("playpause");
      playpause.setAttribute("data-state", "pause");
    })
    .catch((error) => {
      if (error.name === "NotAllowedError") {
        showPlayButton(video);
      } else {
        // Handle a load or playback error
      }
    });
}
