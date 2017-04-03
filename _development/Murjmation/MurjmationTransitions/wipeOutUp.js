/**
 * hide the element from the bottom of the element to the top 
 *
 * @method wipeOutUp
 */

Transitions.prototype.wipeOutUp = function() {

	this.configure.outHeight = 0;

	$(this.configure.currentElement).css({
		overflow: "hidden"
	});

};
