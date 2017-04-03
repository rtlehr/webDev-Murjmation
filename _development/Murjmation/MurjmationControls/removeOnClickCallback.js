/**
 * Remove ALL onClick callbacks that might be on a div 
 *
 * @method removeOnClickCallback
 * @param {string} elemName - Name of the element to be used
 * @param {string} pageName - Name of page element lives in (optional)
 */

Murjmation.prototype.removeOnClickCallback = function(elemName, pageName) {

	//Get the DOM path to the element to add the sound too.
	var a = this.getElementOnPage(elemName, pageName);

	//remove function callback click
	$(a).unbind('click.callback');

};
