/**
 * Add an Mouse Over sound
 *
 * Sample page: addMouseOverSound.html
 *
 * @method addMouseOverSound
 * @param {String} elemName - Name of the element to be used
 * @param {String} soundName - Name of the sound to be used
 * @param {String} pageName - Name of page element lives in (optional)
 **/

Murjmation.prototype.addMouseOverSound = function(elemName, soundName, pageName) {

	//Get the DOM path to the element to add the sound too.
	var a = this.getElementOnPage(elemName, pageName);

	//Attach the sound
	$(a).bind("mouseover.sound", function() {
		window.murjmation.playSound(soundName);
	});

};
