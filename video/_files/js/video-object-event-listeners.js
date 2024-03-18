// video object event llisteners


function playingButtonUpdates() {
  playpause.setAttribute("data-state", "pause");
  playpause.setAttribute("aria-label", "Video is playing.");
  AC(videoPoster, "hide");
}

function pauseButtonUpdates() {
  playpause.setAttribute("data-state", "play");
  playpause.setAttribute("aria-label", "Video is paused.");
}


function endedButtonUpdates() {
  playpause.setAttribute("data-state", "play");
  video.currentTime = 0;
  RC(videoPoster, "hide");
}


video.addEventListener("loadedmetadata", loadMetaData);
video.addEventListener("timeupdate", timeUpdate);
video.addEventListener("play", handleFirstPlay, false);
video.addEventListener("playing", playingButtonUpdates, false);
video.addEventListener("pause", pauseButtonUpdates, false);
video.addEventListener("ended", endedButtonUpdates, false);