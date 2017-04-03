	/**
	 * Play a sound
	 *
	 * @method playSound
	 * @param {string} soundName - name of sound to play
	 * @param {string} callback - name of the callback that will capture the duration of the sound that has played
	 */

	Murjmation.prototype.playSound = function(soundName, callback) {

		//Set the current sound to the sound playing
		this.currentSound = soundName;

		//Set the function to be called during the suration of the sound
		this.sounds[soundName].play(callback);

	};
