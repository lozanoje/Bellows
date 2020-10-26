import { overrideFunc } from './patcher.js';
import { applyStreamingSoundConfig } from './SoundConfig.js';

Hooks.on('renderAmbientSoundConfig', (sender, html, data) =>
{
	applyStreamingSoundConfig(sender, html, data.object);
});

overrideFunc(AmbientSoundConfig.prototype, '_updateObject', function(super_updateObject, evt, formData, etc)
{
	if (!game.user.isGM) throw "You do not have the ability to configure an AmbientSound object.";

	if (!formData.streamed)
	{
		super_updateObject.call(this, evt, formData, etc);
		return;
	}
	
	formData.path = 'invalid.mp3';
	formData.flags = {
		bIsStreamed: formData.streamed,
		streamingApi: $(evt.target).find('span[name="api"]').text(),
		streamingId: formData.url,
	};

	if ( this.object.id ) {
		formData["id"] = this.object.id;
		this.object.update(formData);
	}
	else this.object.constructor.create(formData);
});
