/**
 * Add a javascript callback when a sound starts to play
 *
 * Sample page: XXXXX.html
 *
 * @method MM_addStartSound
 */

FormatCourse.prototype.addTimeScale = function(t) {

	//console.log("addTimeScale");

	var attrin = $(this.currentElement).attr(t);

	if (t === "mm-intimescale") {
		if (typeof attrin !== typeof undefined && attrin !== false) {

			this.currentPage.elements[this.currentPage.elements.length - 1].setInTimeScale($(this.currentElement).attr(t));

		}
	} else {
		if (typeof attrin !== typeof undefined && attrin !== false) {

			this.currentPage.elements[this.currentPage.elements.length - 1].setOutTimeScale($(this.currentElement).attr(t));

		}
	}

}
