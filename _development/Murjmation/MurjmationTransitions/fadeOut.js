/**
 * Fade the element out from alpha 1 to alpha 0 
 *
 * @method fadeOut
 */

Transitions.prototype.fadeOut = function() {

	this.configure.inAlpha = 1;
	this.configure.outAlpha = 0;

};
