/**
 * Used to stop a sound 
 * if "currentSound" is sent then whatever sound is currently playing will be stoped
 *
 * @method togglePlay
 * @param {string} soundName - the sound name to use (optional)
 */

Murjmation.prototype.stopSound = function(soundName) {

	//Check to see if the string "mm-currentSound" is sent, if so, then toggle whatever the current sound is
	if (soundName == undefined || soundName == null) {

		//make soundName = to the current sound
		soundName = this.currentSound;

	}

	//stop the sound
	this.sounds[soundName].stop();

};
