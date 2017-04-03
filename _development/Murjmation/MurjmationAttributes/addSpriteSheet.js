/**
 * Add a javascript callback when a sound starts to play
 *
 * Sample page: XXXXX.html
 *
 * @method MM_addDelay
 */

FormatCourse.prototype.addSpriteSheet = function() {

	var spriteSheet = $(this.currentElement).attr("mm-spriteSheet");

	if (typeof spriteSheet !== typeof undefined && spriteSheet !== false) {

		var sS = spriteSheet.split(",");

		//copy the html from the <div>
		var h = $(this.currentElement).children(0).html();

		//Add the new <div>
		$(this.currentElement).children(0).html("<div style='position: absolute; overflow:hidden;' id='MurjmationInternalAnimatedSpriteSheetDiv'>" + h + "</div>");

		$(this.currentElement).children(0).children(0).children(0).css("position", "absolute");
		
		murjmation.spriteSheets[sS[0]].playAnimation(murjmation.getElementOnPage($(this.currentElement).attr("id"), this.currentPage.getName()), sS[1]);

	}


}
