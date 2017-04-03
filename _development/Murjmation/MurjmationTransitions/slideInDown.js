/**
 * Slide the element in down from the top of the "screen" DIV 
 *
 * @method slideInDown
 */

Transitions.prototype.slideInDown = function() {

	this.configure.inTop = (0 - this.configure.elemHeight);
	this.configure.outTop = this.configure.elemTop;

};
