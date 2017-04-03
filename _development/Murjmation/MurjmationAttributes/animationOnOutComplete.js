/**
 * Transition an element(s) when the element this attribute is on completes it's OUT transition
 * Multiple elements can be transitioned with a comma seperated list (i.e. ID,ID2,ID3...)
 * 
 * format: mm-animationOnOutComplete="ID,ID2,ID3..."
 *
 * Sample page: XXXXX.html
 *
 * @method animationOnOutComplete
 */

FormatCourse.prototype.animationOnOutComplete = function(t) {

	//Check to see if the attribute lives on the element
	var onOutComp = $(this.currentElement).attr("mm-animationOnOutComplete");

	//If the attribute does live on the element
	if (typeof onOutComp !== typeof undefined && onOutComp !== false) {

		//Save the element list in the current element object
		this.currentPage.elements[this.currentPage.elements.length - 1].setAnimateOnOutComplete(onOutComp);

		this.murjmation.utils.showMessage("   Animation on out complete set to: " + this.currentPage.elements[this.currentPage.elements.length - 1].getAnimateOnOutComplete(), 2);

	}

}
