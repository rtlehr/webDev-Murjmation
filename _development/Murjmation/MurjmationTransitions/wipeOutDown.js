/**
 * hide the element from the top of the element to the bottom 
 *
 * @method wipeOutDown
 */

Transitions.prototype.wipeOutDown = function() {

	this.configure.outHeight = 0;

	this.configure.outTop = (this.configure.elemHeight + this.configure.elemTop);

	this.configure.outMurjnationTop = (0 - this.configure.elemHeight);

	$(this.configure.currentElement).css({
		overflow: "hidden"
	});

};
