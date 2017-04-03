/**
 * Transition an element(s) when the element this attribute is on completes it's IN transition
 * Multiple elements can be transitioned with a comma seperated list (i.e. ID,ID2,ID3...)
 * 
 * format: mm-animationOnInComplete="ID,ID2,ID3..."
 *
 * Sample page: XXXXX.html
 *
 * @method animationOnInComplete
 */

FormatCourse.prototype.animationOnInComplete = function() {

	//Check to see if the attribute lives on the element
	var onInComp = $(this.currentElement).attr("mm-animationOnInComplete");

	//If the attribute does live on the element
	if (typeof onInComp !== typeof undefined && onInComp !== false) {

		//Save the element list in the current element object
		this.currentPage.elements[this.currentPage.elements.length - 1].setAnimateOnInComplete(onInComp);

		this.murjmation.utils.showMessage("   Animation on in complete set to: " + this.currentPage.elements[this.currentPage.elements.length - 1].getAnimateOnInComplete(), 2);

	}


}
