/**
 * Add a javascript callback when a sound starts to play
 *
 * Sample page: XXXXX.html
 *
 * @method MM_addDelay
 */

FormatCourse.prototype.addDelay = function(t) {

	//if there is a callback add it to the object
	var attrout = $(this.currentElement).attr(t);

	if (typeof attrout !== typeof undefined && attrout !== false) {

		this.stopText += ",\"delay\":\"" + $(this.currentElement).attr(t) + "\"";

	} else {
		this.stopText += ",\"delay\":0";
	}

}
