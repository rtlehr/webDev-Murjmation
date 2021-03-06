/**
 * Run an elements OUT transition
 * more than one elemnt can be animated, elements must be seperated with a "," ex. elem1,elem2,elem3
 *
 * @method animateElementOut
 * @param elemName - Name of the element(s) to be used
 */

Murjmation.prototype.animateElementOut = function(elemName) {

	//Split the elements to animate
	var e = elemName.split(",");

	//Get the current page
	var currPage = this.currentGroup.pages[(this.currentPageNum - 1)];

	//Loop thru the elements to be transitioned
	for (var count = 0; count < e.length; count++) {

		//Loop thru the pages elements
		for (var count2 = 0; count2 < currPage.elements.length; count2++) {

			//If the element.getname() matched the elemName
			if (currPage.elements[count2].getName() == e[count]) {

				//Make sure the element is in the OUT start location before moving it
				this.animation.setElementToEndLocation(currPage.elements[count2]);

				//Animate the elements OUT transition
				this.animation.animateElementOut(currPage.elements[count2]);

				//Break the loop
				break;

			}

		}

	}

};
