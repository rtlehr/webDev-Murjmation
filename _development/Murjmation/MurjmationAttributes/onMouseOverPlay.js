/**
 * Add a mouse sound when the cursor moves over an element
 *
 * Sample page: XXXXX.html
 *
 * @method MM_onMouseOverPlay
 */

FormatCourse.prototype.onMouseOverPlay = function() {

	//console.log("onMouseOverPlay");

	var onMouseoverPlay = $(this.currentElement).attr("mm-onMouseOverPlay");

	if (typeof onMouseoverPlay !== typeof undefined && onMouseoverPlay !== false) {

		var elemPath = this.murjmation.utils.getDomPosition(this.currentElement);

		$(elemPath).bind("mouseover.sound", function() {
			window.murjmation.playSound(onMouseoverPlay);
		});

	}

}
