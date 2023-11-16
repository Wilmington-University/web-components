/* 
  @see {@link https://web.dev/media-mobile-web-video-playback/
  @see {@link https://googlesamples.github.io/web-fundamentals/fundamentals/media/mobile-web-video-playback.html
  @see {@link https://github.com/googlesamples/web-fundamentals/tree/gh-pages/fundamentals/media/mobile-web-video-playback.html
*/
import { getID } from "utils.js";

(function () {
  "use strict";

  /** 
    DECLARE CONTAINER, BUTTONS AND OTHER ELEMENT CONSTANTS
   */

  const videoContainer = getID(`videoContainer`),
    video = getID(`video-hero`),
    videoPoster = getID(`videoPoster`),
    videoControls = getID(`video-controls`),
    playpause = getID(`playpause`),
    stop = getID(`stop`),
    mute = getID(`mute`),
    volumeControl = getID(`vol-control`),
    progress = getID(`progress`),
    progressBar = getID(`progress-bar`),
    videoCurrentTime = getID(`videoCurrentTime`),
    videoDuration = getID(`videoDuration`),
    fullscreen = getID(`fullScreen`),
    subtitles = getID(`subtitles`);

  /**
   * Hide the default video controls.
   *
   * @type Boolean
   * @default false
   */
  video.controls = false;

  /**
   * Display the user defined video controls
   *
   * @type {HTMLElement}
   * @return {String}
   */
  videoControls.setAttribute("data-state", "visible");

  /**
   *
   * Set the video container's fullscreen state.Set the fullscreen button's 'data-state' which allows the correct button image to be set via CSS.
   *
   */

  let setFullscreenData = function (state) {
    videoContainer.setAttribute("data-fullscreen", !!state);
    fullscreen.setAttribute(
      "data-state",
      !!state ? "exit-fullscreen" : "enter-fullscreen"
    );
  };

  /**
   *
   * Checks if the document is currently in fullscreen mode
   *
   */
  let isFullScreen = function () {
    return !!(document.fullscreenElement || document.webkitFullscreenElement);
  };

  /**
   *
   * Exits fullscreen mode. Can only be called on document
   *
   */
  let ExitFullScreen = function () {
    return !!(document.exitFullscreen() || document.webkitCancelFullScreen());
  };

  /**
   *
   * Requests fullscreen mode.
   *
   */

  let RequestFullScreen = function () {
    return !!(
      videoContainer.requestFullscreen() ||
      videoContainer.webkitEnterFullScreen()
    );
  };

  /**
   *
   * Fullscreen event handler Callback function.
   *
   */

  let handleFullscreen = function () {
    if (isFullScreen()) {
      ExitFullScreen();
      setFullscreenData(false);
    } else {
      // ...otherwise enter fullscreen mode
      // (Note: can be called on document, but here the specific element is used as it will also ensure that the element's children, e.g. the custom controls, go fullscreen also)
      RequestFullScreen();
    }
    setFullscreenData(true);
  };

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
      playpause.classList.add("muh");
      playpause.focus();
    }
    setVolume();
  });

  // Wait for the video's meta data to be loaded, then set the progress bar's max value to the duration of the video
  // video.addEventListener("loadedmetadata", function () {
  //   console.log("metadata");
  //   progress.setAttribute("max", video.duration);
  //   videoDuration.textContent = secondsToTimeCode(video.duration);
  //   videoCurrentTime.textContent = secondsToTimeCode(video.currentTime);
  //   progressBar.style.transform = `scaleX(${
  //     video.currentTime / video.duration
  //   })`;
  // });

  // Changes the button state of certain button's so the correct visuals can be displayed with CSS
  let changeButtonState = function (type) {
    // Play/Pause button
    if (type == "playpause") {
      if (video.paused) {
        playpause.setAttribute("data-state", "play");
        playpause.setAttribute("aria-label", "Video paused");
      } else if (video.ended) {
        playpause.setAttribute("data-state", "play");
        playpause.setAttribute("aria-label", "Video ended");
        video.currentTime = 0;
      } else {
        playpause.setAttribute("data-state", "pause");
        playpause.setAttribute("aria-label", "Video playing");
      }
    }
    // Mute button
    else if (type == "mute") {
      mute.setAttribute("data-state", video.muted ? "unmute" : "mute");
      mute.setAttribute("aria-label", "Video muted");
    }
  };

  // Add event listeners for video specific events
  // video.addEventListener(
  //   "play",
  //   function () {
  //     changeButtonState("playpause");
  //   },
  //   false
  // );
  // video.addEventListener(
  //   "pause",
  //   function () {
  //     changeButtonState("playpause");
  //   },
  //   false
  // );

  // Add events for all buttons
  // call event.stopPropagation() to prevent parent handlers (e.g. video controls) from being notified of the click event.
  playpause.addEventListener("click", function (e) {
    e.stopPropagation();
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });

  // The Media API has no 'stop()' function, so pause the video and reset its time and the progress bar
  stop.addEventListener("click", function (e) {
    video.pause();
    video.currentTime = 0;
    progress.value = 0;
    if (video.poster !== null) {
      video.setAttribute("preload", "none");
      video.setAttribute("poster", videoPoster.src);
    }
    // video.poster = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/280px-PNG_transparency_demonstration_1.png";
    //video.poster.show();
    // Update the play/pause button's 'data-state' which allows the correct button image to be set via CSS
    changeButtonState("playpause");
    //video.poster = "https://assets.codepen.io/702340/poster-img.jpg";
  });

  //   video.onloadeddata = function() {
  //  document.getElementById('videoPoster').style.display = 'none';
  // };

  mute.addEventListener("click", function (e) {
    video.muted = !video.muted;
    changeButtonState("mute");
  });

  fullscreen.addEventListener("click", function (e) {
    e.stopPropagation();
    handleFullscreen();
  });

  // https://web.dev/media-mobile-web-video-playback/
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

  // React to the user clicking within the progress bar
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
  for (var i = 0; i < video.textTracks.length; i++) {
    video.textTracks[i].mode = "hidden";
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
      for (var i = 0; i < video.textTracks.length; i++) {
        // For the 'subtitles-off' button, the first condition will never match so all will subtitles be turned off
        if (video.textTracks[i].language == lang) {
          video.textTracks[i].mode = "showing";
          this.setAttribute("data-state", "active");
        } else {
          video.textTracks[i].mode = "hidden";
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
    for (var i = 0; i < video.textTracks.length; i++) {
      subtitlesMenu.appendChild(
        createMenuItem(
          "subtitles-" + video.textTracks[i].language,
          video.textTracks[i].language,
          video.textTracks[i].label
        )
      );
    }
    videoContainer.appendChild(subtitlesMenu);
  }
  subtitles.addEventListener("click", function (e) {
    if (subtitlesMenu) {
      subtitlesMenu.style.display =
        subtitlesMenu.style.display == "block" ? "none" : "block";
    }
  });

  // function keyboardHandle(e) {
  //   switch (e.key) {
  //     case "ArrowLeft":
  //       Rewind();
  //       break;
  //     case "ArrowRight":
  //       Forward();
  //       break;
  //     case "Space":
  //       alert("right");
  //       break;
  //     case "m":
  //       video.muted = !video.muted;
  //       changeButtonState("mute");
  //       break;
  //     case "f":
  //       handleFullscreen();
  //       break;
  //   }
  // }
  // document.addEventListener("keydown", keyboardHandle, false);

  /** Prefers reduced motion **/
  let motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  motionQuery.addListener(viewportMotion);
  viewportMotion(motionQuery);

  function viewportMotion(motionQuery) {
    if (motionQuery.matches) {
      changeButtonState("playpause");
    }
  }

  const skipTime = 5;
  // REWIND CALLBACK FUNCTION
  function Rewind(e) {
    video.currentTime = Math.max(video.currentTime - skipTime, 0);
  }

  // FORWARD CALLBACK FUNCTION
  function Forward(e) {
    video.currentTime = Math.min(video.currentTime + skipTime, video.duration);
  }

  // https://www.codespeedy.com/html5-player-volume-control-key/
  function setVolume(e) {
    /*
     * Get the volume of audio#player and multiply it by 10 so
     * it's a whole number which is easier to increment.
     */
    var audio_vol;
    switch (event.key) {
      case "ArrowUp":
        event.preventDefault();
        audio_vol = video.volume;
        if (audio_vol != 1) {
          try {
            video.volume = audio_vol + 0.3;
          } catch (err) {
            video.volume = 1;
          }
        }

        break;
      case "ArrowDown":
        event.preventDefault();
        audio_vol = video.volume;
        if (audio_vol != 0) {
          try {
            video.volume = audio_vol - 0.3;
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
      case "ArrowLeft" || "J":
        Rewind();
        break;
      case "ArrowRight" || "L":
        Forward();
        break;
      case "Space" || "K":
        clickPlayPause;
        break;
      case "m":
        video.muted = !video.muted;
        changeButtonState("mute");
        break;
      case "f":
        handleFullscreen();
        break;
      default:
        setVolume();
    }
    e.preventDefault();
  }

  // Listen for fullscreen change events (from other controls, e.g. right clicking on the video itself)
  function fullScreenChange() {
    setFullscreenData(!!document.fullscreenElement);
  }

  function webkitfullScreenChange() {
    setFullscreenData(!!document.webkitIsFullScreen);
  }

  document.addEventListener("keydown", keyboardHandle, false);
  document.addEventListener("fullscreenchange", fullScreenChange);
  document.addEventListener("onwebkitfullscreenchange", webkitfullScreenChange);

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

/*
https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide

Example 3: Detecting autoplay failure as a fallback
*/
const video = document.getElementById("video-hero");
video.addEventListener("play", handleFirstPlay, false);

let hasPlayed = false;
function handleFirstPlay(event) {
  if (!hasPlayed) {
    hasPlayed = true;
    console.log("first");
    // alert("first");
    // Remove listener so this only gets called once.
    const vid = event.target;
    vid.removeEventListener("play", handleFirstPlay);

    // Start whatever you need to do after first playback has started

    // TO-DO toggle poster image here.
    //video.poster = "https://assets.codepen.io/702340/poster-img.jpg";
    alert("data play");
    // playpause.setAttribute("data-state", "play");
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
