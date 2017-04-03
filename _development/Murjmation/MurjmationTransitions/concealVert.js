/**
 * transition the element closed from the top and bottom to the center of the element 
 *
 * @method concealVert
 */

Transitions.prototype.concealVert = function() {

	this.configure.outTop = (this.configure.elemTop + (this.configure.elemHeight * 0.5));

	this.configure.outHeight = 0;

	this.configure.outMurjnationTop = (0 - (this.configure.elemHeight / 2));

	$(this.configure.currentElement).css({
		overflow: "hidden"
	});

};
