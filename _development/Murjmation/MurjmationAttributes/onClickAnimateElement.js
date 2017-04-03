/**
 * Add a mouse sound when the cursor clicks on an element
 *
 * Sample page: XXXXX.html
 *
 * @method MM_onClickAnimateElement
 */

FormatCourse.prototype.onClickAnimateElement = function() {

	//console.log("onClickAnimateElement");

	var animEle = $(this.currentElement).attr("mm-onClickAnimateElement");

	if (typeof animEle !== typeof undefined && animEle !== false) {

		var elemPath = this.murjmation.utils.getDomPosition(this.currentElement);

		$(elemPath).addClass("handCursor");

		$(elemPath).bind("click.animate", function() {

			window.murjmation.animateElement(animEle);

		});

	}

}
