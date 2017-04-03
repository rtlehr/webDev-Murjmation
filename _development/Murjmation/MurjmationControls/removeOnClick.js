/**
 * Remove ALL onClick that might be on a div 
 *
 * @method removeOnClick
 * @param {string} elemName - Name of the element to be used
 * @param {string} pageName - Name of page element lives in (optional)
 */

Murjmation.prototype.removeOnClick = function(elemName, pageName) {

	//Get the DOM path to the element to add the sound too.
	var a = this.getElementOnPage(elemName, pageName);

	//remove the click
	$(a).unbind('click');

	//remove any sounds associated with this element
	this.removeMouseSound(elemName, pageName);

	//remove the handCoursor CSS
	this.removeHandCursorCSS(elemName, pageName);

};
