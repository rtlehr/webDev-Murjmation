/**
 * Transition the element open from the center of the element to the top and bottom 
 *
 * @method revealVert
 */

Transitions.prototype.revealVert = function() {

	this.configure.inHeight = 0;

	this.configure.inTop = (this.configure.elemTop + (this.configure.elemHeight * 0.5));

	this.configure.inMurjnationTop = (0 - (this.configure.elemHeight / 2));

	$(this.configure.currentElement).css({
		overflow: "hidden"
	});


};
