/**
 * Add a mouse sound when the cursor moves on, then off an element
 *
 * Sample page: XXXXX.html
 *
 * @method MM_onMouseOutPlay
 */

FormatCourse.prototype.onMouseOutPlay = function() {

	//console.log("onMouseOutPlay");

	//add javascript function to an element
	var onMouseoutPlay = $(this.currentElement).attr("mm-onMouseOutPlay");

	if (typeof onMouseoutPlay !== typeof undefined && onMouseoutPlay !== false) {

		var elemPath = this.murjmation.utils.getDomPosition(this.currentElement);

		$(elemPath).bind("mouseout.sound", function() {

			window.murjmation.playSound(onMouseoutPlay);

		});

	}

}
