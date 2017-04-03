/**
 * Remove ALL onClick animate that might be on a div 
 *
 * @method removeOnClickAnimation
 * @param {string} elemName - Name of the element to be used
 * @param {string} pageName - Name of page element lives in (optional)
 */

Murjmation.prototype.removeOnClickAnimation = function(elemName, pageName) {

	//Get the DOM path to the element to add the sound too.
	var a = this.getElementOnPage(elemName, pageName);

	//remove the click animation
	$(a).unbind('click.animate');

};
