/**
 * Show a popUp and close all other popUps
 *
 * @method showPopUp
 * @param {string} elemName - Name of the popUp to be used
 */

Murjmation.prototype.showPopUp = function(elemName) {

	//Get all the page elements that are IN
	var isInElements = this.currentPageInElements(true);

	//Show the pop-up
	this.animateElement(elemName);

	//Loop thru all IN elements
	for (var count = 0; count < isInElements.length; count++) {

		//Check to see is element has the CSS style isPopUp 
		if ($(isInElements[count].getDom()).hasClass("isPopUp")) {

			//if element has isPopUp and is IN, then animate it out
			this.animateElement(isInElements[count].getName());

		}

	}

};
