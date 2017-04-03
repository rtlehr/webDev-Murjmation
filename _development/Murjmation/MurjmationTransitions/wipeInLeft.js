/**
 * show the element from the right of the element to the left 
 *
 * @method wipeInLeft
 */

Transitions.prototype.wipeInLeft = function() {


	this.configure.inLeft = (this.configure.elemWidth + this.configure.elemLeft);

	this.configure.inWidth = 0;

	this.configure.inMurjnationLeft = (0 - this.configure.elemWidth);

	$(this.configure.currentElement).css({
		overflow: "hidden"
	});

};
