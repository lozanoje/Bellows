import * as MusicStreaming from '../config.js';
import {StreamingServiceApi} from './StreamingServiceApi.js'
import { YouTubePlayer } from './YouTubePlayer.js';

export class YouTubeApi extends StreamingServiceApi
{

	constructor()
	{
		super('youtube');
		this.players = {};
	}

	initialize()
	{
		window.onYouTubeIframeAPIReady = this.onYoutubeApiReady.bind(this);

		// Load the YouTube iFrame Player API code asynchronously
		MusicStreaming.log("Attaching YouTube API");
		this.attachApi("https://www.youtube.com/iframe_api");
	}

	async onYoutubeApiReady()
	{
		MusicStreaming.log("YouTubeApi ready");
		await this.markLoaded();
	}

	setPlayerAt(playerId, player)
	{
		this.players[playerId] = player;
	}

	getPlayerAt(playerId)
	{
		return this.players[playerId];
	}

	getSupportedUrlFormats()
	{
		return [
			// User Provided
			/^youtube\/([^\s&]{11})$/,
			// Long links, extracts video id
			/https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([^\s&]{11}).*/,
			// short links, extracts video id
			/https?:\/\/(?:www\.)?youtu\.be\/([^\s&]{11}).*/
		];
	}

	matchUrlAgainstSupported(url)
	{
		return url !== undefined ? this.getSupportedUrlFormats().map(r => url.trim().match(r)).find(match => match !== null) : undefined;
	}

	extractSourceIdFromUrl(url)
	{
		const regexMatch = this.matchUrlAgainstSupported(url);
		return regexMatch !== undefined && regexMatch !== null ? regexMatch[1] : undefined;
	}

	findOrCreatePlayer(ownerId, sound)
	{
		let player = this.getPlayerAt(`youtube-player-${ownerId}-${sound._id}`);
		if (player === null || player === undefined)
		{
			player = new YouTubePlayer(ownerId, sound._id, sound.flags.streamingId);
			
			$('body').append(`<div class="yt-player"><div id="${player.playerId}"></div></div>`);

			player.setSourceId(sound.flags.streamingId);
			player.setLoop(sound.repeat);
			player.setVolume(sound.volume * game.settings.get("core", "globalPlaylistVolume"));
			player.ensurePlaying(sound.playing);
		}
		return player;
	}

	cleanupPlayer(ownerId, sound) 
	{
		let playerId = `youtube-player-${ownerId}-${sound._id}`;
		let player = this.getPlayerAt(playerId);
		if (player) {
			player.delete();
			this.setPlayerAt(playerId, undefined);
		}
	}

}
