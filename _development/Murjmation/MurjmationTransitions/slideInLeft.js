/**
 * Slide the element in down from the right of the "screen" DIV 
 *
 * @method slideInLeft
 */

Transitions.prototype.slideInLeft = function() {

	this.configure.inLeft = this.configure.pageWidth;
	this.configure.outLeft = this.configure.elemLeft;

};
