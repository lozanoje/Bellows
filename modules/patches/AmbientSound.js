import { overrideFunc } from './patcher.js';
import { getApi } from '../apis/index.js';

AmbientSound.prototype.findOrCreatePlayer = function() {
	if (this.data.flags.bIsStreamed && this.data.flags.streamingApi !== undefined)
	{
		return getApi(this.data.flags.streamingApi).findOrCreatePlayer(
			this.scene.id, this.id, this.data.flags.streamingId
		);
	}
	return undefined;
};

AmbientSound.prototype.cleanupPlayer = function () {
	if (this.data.flags.bIsStreamed && this.data.flags.streamingApi !== undefined)
	{
		getApi(this.data.flags.streamingApi).cleanupPlayer(
			this.scene.id, this.id
		);
	}
}


overrideFunc(AmbientSound.prototype, '_onUpdate', function(
	super_onUpdate, data
)
{
	console.log("_onUpdate called");
	super_onUpdate.call(this, data);
	const changed = new Set(Object.keys(data));
	// NOTE: If more APIs are ever added, its possible that if the streamingApi changes,
	// the player for the previous API will be left hanging
	if (this.data.flags.bIsStreamed && (
		changed.has('streamingApi') || changed.has('streamingId')
	))
	{
		this.findOrCreatePlayer().setSourceId(this.data.flags.streamingId);
	}
});

overrideFunc(AmbientSound.prototype, 'play', function(
	super_play,
	isAudible, volume
)
{
	console.log("play called");
	if (!this.data.flags.bIsStreamed)
	{
		super_play.call(this, isAudible, volume);
		return;
	}

	let player = this.findOrCreatePlayer();
	console.log(isAudible);
	if (isAudible) {
		if (!player.hasPlayer()) {
			player.setSourceId(this.data.flags.streamingId);
		}
		player.setLoop(true);
	  player.setVolume(
			(volume || this.data.volume)
			* game.settings.get("core", "globalAmbientVolume")
		);
		
		if (!player.isPlaying()) {
			player.startPlaying();
		}
	} else {
		if (player.isPlaying()) {
			player.stopPlaying();
		}
	}
});

overrideFunc(AmbientSound.prototype, '_onDelete', function(
	super_onDelete
)
{
	super_onDelete.call(this);
	if (this.data.flags.bIsStreamed)
	{
		this.cleanupPlayer();
	}
});


