/**
 * Remove ALL onClick sounds from an element
 *
 * @method removeOnClickSound
 * @param elemName - Name of the element to be used
 * @param pageName - Name of page element lives in (optional)
 */

Murjmation.prototype.removeOnClickSound = function(elemName, pageName) {

	var a = this.getElementOnPage(elemName, pageName);

	$(a).unbind('click.sound');

};
