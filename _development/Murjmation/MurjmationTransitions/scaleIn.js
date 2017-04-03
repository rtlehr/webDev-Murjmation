/**
 * Scale the element in (from the center of the element) from scale 0 to scale 1 
 *
 * @method scaleIn
 */

Transitions.prototype.scaleIn = function() {

	this.configure.inScale = 0;
	this.configure.outScale = 1;

};
