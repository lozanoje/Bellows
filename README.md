# Bellows
---

* **Author**: casualchameleon (discord: casualchameleon#6618), temportalflux (discord: temportalflux#3142)
* **Version**: 0.2.0
* **Foundry VTT Compatibility**: Tested on 0.6.6 and 0.7.5
* **System Compatibility (If applicable)**: n/a
* **Module Requirement(s)**: n/a
* **Module Conflicts**: no known conflicts, but its plausible that any modules change the playlist or ambient sound data could conflict
* **Translation Support**: Playlist import is localised at the moment, but nothing else.

## Link(s) to Module
* https://github.com/casualchameleon/Bellows
* https://raw.githubusercontent.com/casualchameleon/Bellows/master/module.json

## Description
This is a fork of temportalflux's MusicAssist module which is now unmaintained. It aims to add support for youtube tracks and playlists, allowing users to grab their favorite youtube soundtracks and save them as tracks in FVTT. These tracks are played back on each user's computer according to the normal playlist controls. This does require an internet connection to work properly, as it streams the video and just plays the audio.

Not all tracks and playlists are supported, as the YouTube author needs to enable embedding for Bellows to be able to play it.



## Installation
Import the [module.json](https://raw.githubusercontent.com/casualchameleon/Bellows/master/module.json) as you would any other module. The contents of the module directory should look similar to this github repository's root.

## Features

The current feature set includes:
- Playlist tracks can be imported from a youtube url such as `https://www.youtube.com/watch?v=_2xHCZSqpi4`
- Ambient Sound objects can be marked as streaming sounds with the same functionality as streamed playlist tracks (these are unable to fade however)
- YouTube Playlist imports