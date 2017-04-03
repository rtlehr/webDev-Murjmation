/**
 * Add a sound and callback (optional) when an element starts to transition IN or OUT
 * 
 * format: mm-inStartSound="SOUND NAME,SOUND CALLBACK"
 * SOUND CALLBACK is optional
 *
 * Sample page: XXXXX.html
 *
 * @method MM_addStartSound
 * @param {string} inOut which Attribute to use options "mm-inStartSound" or "mm-outStartSound"
 */

FormatCourse.prototype.addElemStartTransitionSound = function(inOut) {

	//define the array that holds the attribite values
	var s = [];

	//Check if an attribute exists on the element
	var attrin = $(this.currentElement).attr(inOut);

	//If the attribute vaule is for the IN sound
	if (inOut === "mm-inStartSound") {

		//Check the vaule of attrin
		if (typeof attrin !== typeof undefined && attrin !== false) {

			//Split the attribute value to get the sound name and the sound callback
			s = attrin.split(",");

			//Add the sound name into the element class
			this.currentPage.elements[this.currentPage.elements.length - 1].setInStartSound(s[0]);

			//check if there is a callback
			if (s.length === 2) {

				//If there is a callback put it into the element class
				this.currentPage.elements[this.currentPage.elements.length - 1].setInStartSoundCallback(s[1]);

			}

		}

	} else {

		//Check the vaule of attrin
		if (typeof attrin !== typeof undefined && attrin !== false) {

			//Split the attribute value to get the sound name and the sound callback
			s = attrin.split(",");

			//Add the sound name into the element class
			this.currentPage.elements[this.currentPage.elements.length - 1].setOutStartSound(s[0]);

			//check if there is a callback
			if (s.length === 2) {

				//If there is a callback put it into the element class
				this.currentPage.elements[this.currentPage.elements.length - 1].setOutStartSoundCallback(s[1]);

			}

		}

	}

}
