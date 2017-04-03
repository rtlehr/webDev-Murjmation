	/**
	 * Add a sound to an element when it is clicked (mouse down)
	 *
	 * Sample page: addOnClickSound.html
	 *
	 * @method addOnClickSound
	 * @param {String} elemName - Name of the element to be used
	 * @param {String} soundName - Name of sound to play
	 * @param {String} pageName - (optional) Name of page element lives in 
	 **/

	Murjmation.prototype.addOnClickSound = function(elemName, soundName, pageName) {

		//Gets the DOM path of the element
		var a = this.getElementOnPage(elemName, pageName);

		//Add the CSS to turn pointer into the handCursor
		if (!$(a).hasClass("handCursor")) {

			$(a).addClass("handCursor");

		}

		//Add the sound when the element is clicked
		$(a).bind("click.sound", function() {

			window.murjmation.playSound(soundName);

		});

	};
