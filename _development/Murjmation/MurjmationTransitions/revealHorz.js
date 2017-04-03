/**
 * Transition the element open from the center of the element to the left and right 
 *
 * @method revealHorz
 */

Transitions.prototype.revealHorz = function() {

	this.configure.inWidth = 0;

	this.configure.inLeft = (this.configure.elemLeft + (this.configure.elemWidth * 0.5));

	this.configure.inMurjnationLeft = (0 - (this.configure.elemWidth / 2));

	$(this.configure.currentElement).css({
		overflow: "hidden"
	});


};
