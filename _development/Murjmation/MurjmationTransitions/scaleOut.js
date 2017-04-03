/**
 * Scale the element in (from the center of the element) from scale 1 to scale 0 
 *
 * @method scaleOut
 */

Transitions.prototype.scaleOut = function() {

	this.configure.inScale = 1;
	this.configure.outScale = 0;

};
