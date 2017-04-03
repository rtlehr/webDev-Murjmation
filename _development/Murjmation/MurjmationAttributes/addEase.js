/**
 * Add a javascript callback when a sound starts to play
 *
 * Sample page: XXXXX.html
 *
 * @method MM_addEase
 */

FormatCourse.prototype.addEase = function(t) {

	// console.log("addEase");

	var attrin = $(this.currentElement).attr(t);

	if (typeof attrin !== typeof undefined && attrin !== false) {
		this.stopText += ",\"ease\":\"" + $(this.currentElement).attr(t) + "\"";
	} else {
		this.stopText += ",\"ease\":\"" + this.murjmation.getDefaultEase() + "\"";
	}

}
