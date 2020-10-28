# Bellows
---

* **Author**: casualchameleon (discord: casualchameleon#6618), temportalflux (discord: temportalflux#3142)
* **Version**: 0.3.2
* **Foundry VTT Compatibility**: Tested on 0.6.6 and 0.7.5
* **System Compatibility (If applicable)**: n/a
* **Module Requirement(s)**: n/a
* **Module Conflicts**: no known conflicts, but its plausible that any modules change the playlist or ambient sound data could conflict
* **Translation Support**: Playlist import is localised at the moment, but nothing else.

## Link(s) to Module
* https://github.com/casualchameleon/Bellows
* https://raw.githubusercontent.com/casualchameleon/Bellows/master/module.json

## Description
This is a fork of temportalflux's [MusicAssist](https://github.com/temportalflux/MusicAssist) module which is not actively maintained. It aims to add support for youtube tracks and playlists, allowing users to grab their favorite youtube soundtracks and save them as tracks in FVTT. These tracks are played back on each user's computer according to the normal playlist controls. This does require an internet connection to work properly, as it streams the video and just plays the audio.

Not all tracks and playlists are supported, as the YouTube author needs to enable embedding for Bellows to be able to play it.



## Installation
Import the [module.json](https://raw.githubusercontent.com/casualchameleon/Bellows/master/module.json) as you would any other module. The contents of the module directory should look similar to this github repository's root.

## Features

The current feature set includes:
- Playlist tracks can be imported from a youtube url such as `https://www.youtube.com/watch?v=_2xHCZSqpi4`
- Ambient Sound objects can be marked as streaming sounds with the same functionality as streamed playlist tracks (these are unable to fade however)
- YouTube Playlist imports

## Demonstration
Many thanks to [Sunamon](https://github.com/Sunamon) and [OrbitalBliss](https://github.com/OrbitalBliss) for putting together a demonstration of Bellows' basic features.
[![Bellows Demonstration](https://img.youtube.com/vi/Z9A0Hq6BR8Y/0.jpg)](https://youtu.be/Z9A0Hq6BR8Y)

## Known Issues
- In Firefox, audio may not play in certain scenarios due to autoplay restrictions. You can fix this by clicking the autoplay button in the url bar and allowing it for your Foundry VTT site. Each player using Firefox will need to do this for it to work. Chromium based browsers don't have this issue.

![image](https://user-images.githubusercontent.com/1485053/97107921-03e8ff80-16c2-11eb-8695-59da5c368a19.png)
