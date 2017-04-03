/**
 * Slide the element right outside the "screen" DIV from it's original spot
 *
 * @method slideOutRight
 */

Transitions.prototype.slideOutRight = function() {

	this.configure.inLeft = this.configure.elemLeft;
	this.configure.outLeft = this.configure.pageWidth;

};
