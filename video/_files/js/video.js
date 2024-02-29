/* 
@see 
    https://web.dev/media-mobile-web-video-playback/
    https://googlesamples.github.io/web-fundamentals/fundamentals/media/mobile-web-video-playback.html
    https://github.com/googlesamples/web-fundamentals/tree/gh-pages/fundamentals/media/mobile-web-video-playback.html
*/
import { getID, AC, RC, TC } from "../../../assets/js/utils/helpers.js";
import * as FSM from "./module.fullscreen.js";

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
   *  Hide the default video controls.
   *
   *  @type Boolean
   *  @default false
   */
  video.controls = false;

  /**
   *  Display the user defined video controls
   *
   *  @type {HTMLElement}
   *  @return {String}
   */
  videoControls.setAttribute("data-state", "visible");

  /**
   *  WINDOW LOAD EVENT FUNCTION
   *  Sets the play and mute data states when the widow is finished loading.
   *
   */
  window.addEventListener("load", function () {
    if (video.muted) {
      console.log("muted");
      mute.setAttribute("data-state", "unmute");
    } else {
      console.log("not muted");
      mute.setAttribute("data-state", "mute");
    }
    if (video.play) {
      console.log("playing");
      playpause.setAttribute("aria-label", "Video is playingLOAD.");
      playpause.setAttribute("data-state", "pause");
      playpause.focus();
    }
    setVolume();
  });

  // Wait for the video's meta data to be loaded, then set the progress bar's max value to the duration of the video
  /** video.addEventListener("loadedmetadata", function () {
  //   console.log("metadata");
  //   progress.setAttribute("max", video.duration);
  //   videoDuration.textContent = secondsToTimeCode(video.duration);
  //   videoCurrentTime.textContent = secondsToTimeCode(video.currentTime);
  //   progressBar.style.transform = `scaleX(${
  //     video.currentTime / video.duration
  //   })`;
  // });
*/
  /**
   *  CHANGE BUTTON STATES CALLBACK FUNCTION
   *  Changes the button state of play/pause/mute button's so the correct icons and accessible labels can be displayed.
   *
   */
  let changeButtonState = function (type) {
    // if (type == "playpause") {
    //   if (video.paused) {
    //     playpause.setAttribute("data-state", "play");
    //     playpause.setAttribute("aria-label", "Video paused");
    //   } else if (video.ended) {
    //     playpause.setAttribute("data-state", "play");
    //     playpause.setAttribute("aria-label", "Video ended");
    //     video.currentTime = 0;
    //     AC(videoPoster, 'hide');
    //   } else {
    //     playpause.setAttribute("data-state", "pause");
    //     playpause.setAttribute("aria-label", "Video playing");
    //   }
    // }
    if (type == "mute") {
      mute.setAttribute("data-state", video.muted ? "unmute" : "mute");
      mute.setAttribute("aria-label", "Video is muted.");
    }
  };

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
    e.stopPropagation();
    if (video.paused) {
      video.play();
      TC(videoPoster, "hide");
    } else {
      video.pause();
    }
  });

  /*
   *  RESTART BUTTON CLICK EVENT
   *  The Media API has no 'restart()' function, so pause the video and reset its time, poster image and the progress bar.
   */
  restart.addEventListener("click", (e) => {
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
    changeButtonState("playpause");
  });

  //   video.onloadeddata = function() {
  //  document.getElementById('videoPoster').style.display = 'none';
  // };

  /*
   *  MUTE BUTTON CLICK EVENT
   *  Calls changeButtonState() which changes button icon when invoked.
   */
  mute.addEventListener("click", (e) => {
    video.muted = !video.muted;
    changeButtonState("mute");
  });

  /*
   *  FULLSCREEN BUTTON CLICK EVENT
   *  Calls the handle fullscreen function for fullscreen options.
   *  The webkitEnterFullscreen() method can be invoked only in response to a user action, such as clicking a button. You cannot invoke webkitEnterFullscreen() in response to a load event, for example.
   * @see {@link https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/ControllingMediaWithJavaScript/ControllingMediaWithJavaScript.html#//apple_ref/doc/uid/TP40009523-CH3-SW1}
   */
  fullscreen.addEventListener("click", (e) => {
    e.stopPropagation();
    FSM.handleFullscreen();
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

  function subtitlesCallback(e) {
    if (subtitlesMenu) {
      subtitlesMenu.style.display =
        subtitlesMenu.style.display == "block" ? "none" : "block";
    }
  }
  /**
   *  REDUCE MOTION QUERY EVENT AND CALLBACK FUNCTION
   *  An accessibility option for users who prefer reduced motion.
   *  Calls viewport motion function via the matches property.
   *  Updates the play/pause icon.
   */
  let motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  motionQuery.addListener(viewportMotion);
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
   *
   *  @see {@link https://www.codespeedy.com/html5-player-volume-control-key/}
   */
  function setVolume(e) {
    var audioVol;
    switch (event.key) {
      case "ArrowUp":
        event.preventDefault();
        audioVol = video.volume;
        if (audioVol != 1) {
          try {
            video.volume = audioVol + 0.3;
          } catch (err) {
            video.volume = 1;
          }
        }

        break;
      case "ArrowDown":
        event.preventDefault();
        audioVol = video.volume;
        if (audioVol != 0) {
          try {
            video.volume = audioVol - 0.3;
          } catch (err) {
            video.volume = 0;
          }
        }

        break;
    }
  }

  /** DOCUMENT EVENTS **/
  function keyboardHandle(e) {
    switch (e.key) {
      case "ArrowLeft":
        Rewind();
        break;
      case "ArrowRight":
        Forward();
        break;
      case "Space":
        alert("right");
        break;
      case "m":
        video.muted = !video.muted;
        changeButtonState("mute");
        break;
      case "f":
        handleFullscreen();
        break;
    }
  }
  document.addEventListener("keydown", keyboardHandle, false);
  document.addEventListener("fullscreenchange", FSM.fullScreenChange);
  document.addEventListener(
    "onwebkitfullscreenchange",
    FSM.webkitfullScreenChange
  );

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

  video.addEventListener("loadedmetadata", loadMetaData);
  video.addEventListener("timeupdate", timeUpdate);
  video.addEventListener("play", playChangeButton, false);
  video.addEventListener("pause", pauseChangeButton, false);
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

// let obj = {
//   handleEvent(event) {
//     alert(event.type + " at " + event.currentTarget);
//   }
// };

// video.addEventListener("click", obj);
