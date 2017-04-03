/**
 * Fade the element in from 0 alpha to 1 alpha 
 *
 * @method fadeIn
 */

Transitions.prototype.fadeIn = function() {

	this.configure.inAlpha = 0;
	this.configure.outAlpha = 1;

};
