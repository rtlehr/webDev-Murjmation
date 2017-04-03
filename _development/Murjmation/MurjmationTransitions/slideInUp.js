/**
 * Slide the element in down from the bottom of the "screen" DIV 
 *
 * @method slideInUp
 */

Transitions.prototype.slideInUp = function() {

	this.configure.inTop = this.configure.pageHeight;

	this.configure.outTop = this.configure.elemTop;

};
