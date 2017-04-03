/**
 * hide the element from the right of the element to the left 
 *
 * @method wipeOutLeft
 */

Transitions.prototype.wipeOutLeft = function() {

	this.configure.outWidth = 0;

	$(this.configure.currentElement).css({
		overflow: "hidden"
	});

};
