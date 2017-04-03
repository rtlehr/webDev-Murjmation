/**
 * Add sound to an element when the mouse rolls off the element 
 *
 * Sample page: addMouseoutSound.html
 *
 * @method addMouseoutSound
 * @param {String} elemName - Name of the element to be used
 * @param {String} soundName - Name of the sound to be used
 * @param {String} pageName - Name of page element lives in (optional)
 */

Murjmation.prototype.addMouseOutSound = function(elemName, soundName, pageName) {

	//Get the DOM path to the element to add the sound too.
	var a = this.getElementOnPage(elemName, pageName);

	//Add the sound to the element
	$(a).bind("mouseout.sound", function() {

		window.murjmation.playSound(soundName);

	});

};
