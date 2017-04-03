/**
 * Slide the element up outside the "screen" DIV from it's original spot
 *
 * @method slideOutUp
 */

Transitions.prototype.slideOutUp = function() {

	this.configure.inTop = this.configure.elemTop;
	this.configure.outTop = (0 - this.configure.elemHeight);

};
