import * as MusicStreaming from '../config.js'

export class StreamingServiceApi
{

	constructor(key)
	{
		this.key = key;
	}

	get allApiSettings()
	{
		return game.settings.get(MusicStreaming.name, 'streamingApis');
	}

	isReady()
	{
		return this.allApiSettings[this.key].ready;
	}

	getId() { return this.key; }

	initialize() {}

	async initSettings(settings)
	{
		settings[this.key] = { ready: false };
	}

	async modifySettings(modify)
	{
		const allSettings = this.allApiSettings;
		modify(allSettings[this.key]);
		await game.settings.set(MusicStreaming.name, 'streamingApis', allSettings);
	}

	// Attaches a script such that it will be loaded asynchronously
	attachApi(source)
	{
		let apiLoadScript = document.createElement('script');
		apiLoadScript.type = 'text/javascript';
		//solve annoying 302 errors for certain users by including the YT api code as a string
		apiLoadScript.appendChild(document.createTextNode("if (!window['YT']) {var YT = {loading: 0,loaded: 0};}if (!window['YTConfig']) {var YTConfig = {'host': 'http://www.youtube.com'};}if (!YT.loading) {YT.loading = 1;(function(){var l = [];YT.ready = function(f) {if (YT.loaded) {f();} else {l.push(f);}};window.onYTReady = function() {YT.loaded = 1;for (var i = 0; i < l.length; i++) {try {l[i]();} catch (e) {}}};YT.setConfig = function(c) {for (var k in c) {if (c.hasOwnProperty(k)) {YTConfig[k] = c[k];}}};var a = document.createElement('script');a.type = 'text/javascript';a.id = 'www-widgetapi-script';a.src = 'https://s.ytimg.com/yts/jsbin/www-widgetapi-vflJFa_jA/www-widgetapi.js';a.async = true;var c = document.currentScript;if (c) {var n = c.nonce || c.getAttribute('nonce');if (n) {a.setAttribute('nonce', n);}}var b = document.getElementsByTagName('script')[0];b.parentNode.insertBefore(a, b);})();}"));
		$(document).find('head').append(apiLoadScript);
	}

	async markLoaded()
	{
		await this.modifySettings(settings => {
			settings.ready = true;
		});
		console.log(game.settings.get(MusicStreaming.name, 'streamingApis'));
		Hooks.call(`${MusicStreaming.name}:apiLoaded`, {
			api: this.key
		});
	}

	extractSourceIdFromUrl(url)
	{
		return undefined;
	}

	supportsUrl(url)
	{
		return this.extractSourceIdFromUrl(url) !== undefined;
	}

	findOrCreatePlayer(ownerId, soundId, streamingId)
	{
		return undefined;
	}

	cleanupPlayer(ownerId, soundId)
	{
		return undefined;
	}

}
