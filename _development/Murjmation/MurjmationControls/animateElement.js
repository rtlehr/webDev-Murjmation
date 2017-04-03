/**
 * Used to animate an element
 * If the element only has a mm-animin tag, then this will play it everytime it's called
 * If the element has both the mm-animin and mm-animout tag, then this will loop between them
 * more than one elemnt can be animated, elements must be seperated with a "," ex. elem1,elem2,elem3
 *
 *
 * Sample page: animateElement.html
 *
 * @method animateElement
 * @param {string} elemName - Name of the element(s) to be used
 */

Murjmation.prototype.animateElement = function(elemName) {

	//Split the elements to animate
	var e = elemName.split(",");

	//Loop thru the elements to be transitioned
	for (var count = 0; count < e.length; count++) {

		//Get the current page
		var currPage = this.currentGroup.pages[(this.currentPageNum - 1)];

		//Loop thru all the elements on the current page
		for (var countCount = 0; countCount < currPage.elements.length; countCount++) {
			//Check if the current element on the page is to be animated
			if (e[count] === currPage.elements[countCount].getName()) {
				//Check to see if the element is IN or OUT (If it's IN, then playe the OUT transition)
				if (currPage.elements[countCount].getIsIn() && currPage.elements[countCount].outStopPosition !== null) {

					this.animateElementOut(currPage.elements[countCount].getName());

				}
				//else play the IN transition
				else {

					this.animateElementIn(currPage.elements[countCount].getName());

				}

				//Stop the loop
				break;

			}

		}

	}

};
