/**
 * Slide the element left outside the "screen" DIV from it's original spot
 *
 * @method slideOutLeft
 */

Transitions.prototype.slideOutLeft = function() {

	this.configure.inLeft = this.configure.elemLeft;

	this.configure.outLeft = (0 - this.configure.elemWidth);


};
