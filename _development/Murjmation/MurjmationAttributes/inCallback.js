/**
 * Add a javascript callback when a sound starts to play
 *
 * Sample page: XXXXX.html
 *
 * @method MM_inCallback
 */

FormatCourse.prototype.inCallback = function() {

	var attrin = $(this.currentElement).attr("mm-inCallback");

	if (typeof attrin !== typeof undefined && attrin !== false) {

		this.currentPage.elements[this.currentPage.elements.length - 1].setInCallback($(this.currentElement).attr("mm-inCallback"));

	}


}
