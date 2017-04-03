/**
 * Slide the element in down from the left of the "screen" DIV 
 *
 * @method slideInRight
 */

Transitions.prototype.slideInRight = function() {

	this.configure.inLeft = (0 - this.configure.elemWidth);
	this.configure.outLeft = this.configure.elemLeft;

};
