/**
 * Remove ALL  sounds from an element
 *
 * @method removeAllSound
 * @param {String} elemName - Name of the element to be used
 * @param {String} pageName - Name of page element lives in (optional)
 */

Murjmation.prototype.removeAllSound = function(elemName, pageName) {

	//Get the DOM path to the element to add the sound too.
	var a = this.getElementOnPage(elemName, pageName);

	//Remove all sounds
	$(a).unbind('.sound');

};
