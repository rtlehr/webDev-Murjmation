/**
 * Used to Play/Pause a sound 
 * if "currentSound" is sent then whatever sound is currently playing will be toggled
 *
 * @method togglePlay
 * @param {string} soundName - the sound name to use (optional)
 */

Murjmation.prototype.togglePlayPauseSound = function(soundName) {

	//Check to see if the string "mm-currentSound" is sent, if so, then toggle whatever the current sound is
	if (soundName == undefined || soundName == null) {
		//if there was no soundName then make soundName = to the currentSound
		soundName = this.currentSound;
	}

	//toggle the play/pause of the sound
	this.sounds[soundName].togglePlay();

};
