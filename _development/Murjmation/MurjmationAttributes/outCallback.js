/**
 * Add a mouse sound when the cursor moves over an element
 *
 * Sample page: XXXXX.html
 *
 * @method MM_outCallback
 */

FormatCourse.prototype.outCallback = function() {

	//console.log("outCallback");

	var attrin = $(this.currentElement).attr("mm-outCallback");

	if (typeof attrin !== typeof undefined && attrin !== false) {

		this.currentPage.elements[this.currentPage.elements.length - 1].setOutCallback($(this.currentElement).attr("mm-outCallback"));

	}

}
