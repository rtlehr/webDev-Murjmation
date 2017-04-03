/**
 * Add onClick transition other elements
 *
 * Sample page: addOnClickAnimateElement.html
 *
 * @method addMouseOverSound
 * @param {String} elemName - Name of the element to be used
 * @param {String} elemAnim - Element to animate
 * @param {String} pageName - Name of page element lives in (optional)
 **/

Murjmation.prototype.addOnClickAnimateElement = function(elemName, elemAnim, pageName) {

	//Get the DOM path to the element to add the sound too.
	var a = this.getElementOnPage(elemName, pageName);

	//Add the CSS to turn pointer into the handCursor
	if (!$(a).hasClass("handCursor")) {

		$(a).addClass("handCursor");

	}

	//Attach the function to animate the element 
	$(a).bind("click.animate", function() {

		window.murjmation.animateElement(elemAnim);

	});

};
