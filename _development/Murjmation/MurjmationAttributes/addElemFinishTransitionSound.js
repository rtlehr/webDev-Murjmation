/**
 * Add a sound and callback (optional) when an element finishes transitioning IN or OUT
 * 
 * format: mm-inFinishedSound="SOUND NAME,SOUND CALLBACK"
 * SOUND CALLBACK is optional
 *
 * Sample page: XXXXX.html
 *
 * @method addFinishSound
 * @param inOut {string} which Attribute to use options "mm-inFinishedSound" or "mm-outFinishedSound"
 */

FormatCourse.prototype.addElemFinishTransitionSound = function(inOut) {

	//define the array that holds the attribite values
	var s = [];

	//Check if an attribute exists on the element
	var attrin = $(this.currentElement).attr(inOut);

	//If the attribute vaule is for the IN sound
	if (inOut === "mm-inFinishedSound") {

		//Check the vaule of attrin
		if (typeof attrin !== typeof undefined && attrin !== false) {

			//Split the attribute value to get the sound name and the sound callback
			s = attrin.split(",");

			//Add the sound name into the element class
			this.currentPage.elements[this.currentPage.elements.length - 1].setInFinishedSound(s[0]);

			//check if there is a callback
			if (s.length === 2) {

				//If there is a callback put it into the element class
				this.currentPage.elements[this.currentPage.elements.length - 1].setInFinishedSoundCallback(s[1]);

			}

		}

	} else {

		//Check the vaule of attrin
		if (typeof attrin !== typeof undefined && attrin !== false) {

			s = attrin.split(",");

			//Add the sound name into the element class
			this.currentPage.elements[this.currentPage.elements.length - 1].setOutFinishedSound(s[0]);

			//check if there is a callback
			if (s.length === 2) {

				//If there is a callback put it into the element class
				this.currentPage.elements[this.currentPage.elements.length - 1].setOutFinishedSoundCallback(s[1]);

			}

		}

	}

}
