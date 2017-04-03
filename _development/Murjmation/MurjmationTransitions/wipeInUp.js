/**
 * show the element from the bottom of the element to the top 
 *
 * @method wipeInUp
 */

Transitions.prototype.wipeInUp = function() {

	this.configure.inHeight = 0;
	this.configure.inTop = (this.configure.elemHeight + this.configure.elemTop);

	this.configure.inMurjnationTop = (0 - this.configure.elemHeight);

	$(this.configure.currentElement).css({
		overflow: "hidden"
	});

};
