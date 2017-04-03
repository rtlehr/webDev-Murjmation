/**
 * Add a mouse sound when the cursor clicks on an element
 *
 * Sample page: XXXXX.html
 *
 * @method MM_onClickNavigateTo
 */

FormatCourse.prototype.onClickNavigateTo = function() {

	//console.log("onClickNavigateTo");

	//add navigation to an element
	var navTo = $(this.currentElement).attr("mm-onClickNavigateTo");

	if (typeof navTo !== typeof undefined && navTo !== false) {

		var elemPath = this.murjmation.utils.getDomPosition(this.currentElement);
		$(elemPath).addClass("handCursor");

		$(elemPath).click(function() {
			window.murjmation.gotoPageName(navTo);
		});

	}

}
