/**
 * Add an onClick to an element
 *
 * Sample page: addOnClickCallback.html
 *
 * @method addMouseOverSound
 * @param {String} elemName - Name of the element to be used
 * @param {String} callback - javascript function to call (Function MUST live in the window scope) You can add params to the callback by adding (param1,param1,...) after the call back name
 * @param {String} pageName - Name of page element lives in (optional)
 **/

Murjmation.prototype.addOnClickCallback = function(elemName, callback, pageName) {

	//Gets the DOM path of the element
	var a = this.getElementOnPage(elemName, pageName);

	//Add the CSS to turn pointer into the handCursor
	if (!$(a).hasClass("handCursor")) {

		$(a).addClass("handCursor");

	}

	//Creates a refernce to the Murjmation class
	var _this = this;

	//Attach the call back to the element
	$(a).bind("click.callback", function() {

		_this.utils.callFunction(a, callback);

	});

};
