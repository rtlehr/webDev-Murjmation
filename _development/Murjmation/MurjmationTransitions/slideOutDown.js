/**
 * Slide the element down outside the "screen" DIV from it's original spot
 *
 * @method slideOutDown
 */

Transitions.prototype.slideOutDown = function() {

	this.configure.inTop = this.configure.elemTop;

	this.configure.outTop = this.configure.pageHeight;

};
