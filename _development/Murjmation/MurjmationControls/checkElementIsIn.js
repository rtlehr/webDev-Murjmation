/**
	 * Rwturns the inOut status of current page elements
	 *
	 * @method checkElementIsIn
	 * @param elemName (String) Name of element to check the status of
	 * @return getIsIn (bool) - isIn status of the element
	 */

	Murjmation.prototype.checkElementIsIn = function(elemName) {
		
		//get the elements of the current page
		var e = this.currentGroup.pages[(this.currentPageNum - 1)].elements;

		//Loop thru the elements
		for (var count = 0; count < e.length; count++) {

			//Check which elements isIn values are equal to inOut
			if (e[count].getName() === elemName) {

				//return the inOutArray
				return e[count].getIsIn();

			}

		}
		
	}