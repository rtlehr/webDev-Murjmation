/**
 * Add popUp functionality to an element
 *
 * Sample page: XXXXX.html
 *
 * @method MM_onClickShowPopUp
 */

FormatCourse.prototype.onClickShowPopUp = function() {

	// console.log("onClickShowPopUp");

	var showPopUp = $(this.currentElement).attr("mm-onClickShowPopUp");

	if (typeof showPopUp !== typeof undefined && showPopUp !== false) {

		var elemPath = this.murjmation.utils.getDomPosition(this.currentElement);

		$(elemPath).addClass("handCursor");

		$(elemPath).bind("click.popup", function() {

			window.murjmation.showPopUp(showPopUp);

		});

	}

}
