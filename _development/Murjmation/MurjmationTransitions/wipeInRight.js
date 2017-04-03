/**
 * show the element from the left of the element to the right 
 *
 * @method wipeInRight
 */

Transitions.prototype.wipeInRight = function() {

	this.configure.inWidth = 0;

	this.configure.outWidth = this.configure.elemWidth;

	this.configure.inLeft = this.configure.elemLeft;

	this.configure.outLeft = this.configure.elemLeft;

	$(this.configure.currentElement).css({
		overflow: "hidden"
	});

};
