/**
 * Add a mouse sound when the cursor clicks on an element
 *
 * Sample page: XXXXX.html
 *
 * @method MM_onClickCallback
 */

FormatCourse.prototype.onClickCallback = function() {

	//console.log("onClickCallback");

	//add javascript callback function to an element
	var callBack = $(this.currentElement).attr("mm-onClickCallback");

	if (typeof callBack !== typeof undefined && callBack !== false) {

		var elemPath = this.murjmation.utils.getDomPosition(this.currentElement);

		$(elemPath).addClass("handCursor");

		$(elemPath).bind("click.callback", function() {

			window.murjmation.utils.callFunction(elemPath, callBack);

		});

	}

}
