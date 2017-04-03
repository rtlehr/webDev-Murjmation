/**
 * show the element from the top of the element to the bottom 
 *
 * @method wipeInDown
 */

Transitions.prototype.wipeInDown = function() {

	this.configure.inHeight = 0;

	$(this.configure.currentElement).css({
		overflow: "hidden"
	});

};
