/**
 * transition the element closed from the left and right to the center of the element 
 *
 * @method concealHorz
 */

Transitions.prototype.concealHorz = function() {

	this.configure.outWidth = 0;

	this.configure.outLeft = (this.configure.elemLeft + (this.configure.elemWidth * 0.5));

	this.configure.outMurjnationLeft = (0 - (this.configure.elemWidth / 2));

	$(this.configure.currentElement).css({
		overflow: "hidden"
	});


};
