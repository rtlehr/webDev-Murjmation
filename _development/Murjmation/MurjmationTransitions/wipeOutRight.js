/**
 * hide the element from the left of the element to the right 
 *
 * @method wipeOutRight
 */

Transitions.prototype.wipeOutRight = function() {

	this.configure.outWidth = 0;
	this.configure.outLeft = (this.configure.elemWidth + this.configure.elemLeft);

	this.configure.outMurjnationLeft = (0 - this.configure.elemWidth);

	$(this.configure.currentElement).css({
		overflow: "hidden"
	});

};
