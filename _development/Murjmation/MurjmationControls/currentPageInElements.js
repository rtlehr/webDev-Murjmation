/**
	 * Rwturns the inOut status of current page elements
	 *
	 * @method currentPageInElemets
	 * @param inOut (bool) true = returns elements that are IN, false = returns elements that are OUT
	 * @return inOutArray - array of requested page element objects
	 */

	Murjmation.prototype.currentPageInElements = function(inOut) {

		//create the array to hold the class of tje elements asked for
		var inOutArray = [];

		//If inOut is not a bool, then make it equal to true
		if (inOut !== true || inOut !== false) {

			inOut = true;

		}

		//get the elements of the current page
		var e = this.currentGroup.pages[(this.currentPageNum - 1)].elements;

		//Loop thru the elements
		for (var count = 0; count < e.length; count++) {

			//Check which elements isIn values are equal to inOut
			if (e[count].getIsIn() === inOut) {

				//Push the class of the element into inOutArray
				inOutArray.push(e[count]);

			}

		}

		//return the inOutArray
		return inOutArray;

	};