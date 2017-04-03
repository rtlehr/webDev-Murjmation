/**
 * Remove ALL mouse over and out sounds from an element
 *
 * @method removeMouseSound
 * @param {string} elemName - Name of the element to be used
 * @param {string} pageName - Name of page element lives in (optional)
 */

Murjmation.prototype.removeMouseSound = function(elemName, pageName) {

	//Get the DOM path to the element to add the sound too.
	var a = this.getElementOnPage(elemName, pageName);

	//remove mouseover sound
	$(a).unbind('mouseover.sound');

	//remove mouseout sound
	$(a).unbind('mouseout.sound');

	//remove mouse click sound
	$(a).unbind('click.sound');

};
