This document is intended to assist WU web developers and content creators when adding a hero video on Cascade pages. 

You can customize the <video> element’s appearance and behavior using various attributes. 

> [!IMPORTANT]
> These options  note these options are not customizable when using an ``<iframe>``.

### Required 

These attributes are required for ***ALL*** videos residing on WilmU's websites. 
 

* **ID:**

* **width and height:**  
These attributes define the video player’s dimensions on the web page. It’s always a good idea to explicitly specify the width and height for ``<video>`` elements to avoid layout flickering ([cumulative layout shift](https://web.dev/cls/)) when the video is loaded in. 
     

* **autoplay:**   
If you would like to start the video immediately (using autoplay attribute), then you should include the muted attribute as well or the user has to get interacted with the video first (click, tap, etc.). 
> [!NOTE]
> The HTML5 ``<video>`` element, in certain mobile browsers (such as Chrome and Safari), only allows playback to take place if it's initiated by a user interaction (such as tapping on the player). Here's an excerpt from [Apple's documentation](https://developer.apple.com/library/safari/#documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/AudioandVideoTagBasics/AudioandVideoTagBasics.html): 

> "Warning: To prevent unsolicited downloads over cellular networks at the user’s expense, embedded media cannot be played automatically in Safari on iOS — the user always initiates playback." 
 

* **poster:**  
Defines an image that is displayed before the video is loaded or when the video is paused. This is how you add thumbnails for your videos. 
> [!TIP]
> Image file should be in jpg format.
     

* **preload:**  
Specifies whether the video should be preloaded completely when the page loads. The possible values are "auto" (default), "metadata", and "none". Battery saving modes on some devices will default this to ‘none’ to use as few resources as possible. 
     
* **muted:**  
When the muted attribute is present, the video is muted by default. This is often used in conjunction with autoplay, for when the video is actually intended to play without sound, such as those in the background or in decorative elements like a banner.

***

### Optional 

These attributes are ***OPTIONAL*** and are approved for use on WilmU's websites 
 

* **loop**
Specifies that the video should start again from the beginning once it reaches the end. This is useful for creating looping background videos or continuous playback scenarios. 

***

#### Code example
```
<video 
  id="video-hero" 
  width="1024"
  height="576" 
  muted  
  autoplay  
  fullscreen 
  playsinline  
  preload="metadata"  
  crossorigin="anonymous" 
>  
```
### Do not use

These attributes are ***NOT APPROVED*** and should never be used on WilmU's website. 

* **controls:**  
Displays the default set of video controls (play/pause, volume, seek bar, etc.). This is hidden by default as we use a custom set of controls that provides improved accessibility features.
