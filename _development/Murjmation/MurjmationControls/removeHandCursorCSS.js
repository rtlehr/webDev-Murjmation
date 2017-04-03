/**
 * Remove the handCursor CSS from and element
 *
 * @method removeHandCursorCSS
 * @param {string} elemName - Name of the element to be used
 * @param {string} pageName - Name of page element lives in (optional)
 */

Murjmation.prototype.removeHandCursorCSS = function(elemName, pageName) {

	//Get the DOM path to the element to add the sound too.
	var a = this.getElementOnPage(elemName, pageName);

	//Check if the element has the "handCursor" class on it
	if ($(a).hasClass("handCursor")) {

		//remove the "handCursor" class
		$(a).removeClass("handCursor");

	}

};
