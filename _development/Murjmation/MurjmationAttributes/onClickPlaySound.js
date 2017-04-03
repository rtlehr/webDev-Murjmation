/**
 * Add a sound and callback (optional) when an element is clicked
 * 
 * format: mm-onClickPlaySound="SOUND NAME,SOUND CALLBACK"
 * SOUND CALLBACK is optional
 *
 * Sample page: XXXXX.html
 *
 * @method onClickPlaySound
 */

FormatCourse.prototype.onClickPlaySound = function() {

	//Check if there is an mm-onClickPlaySound attribute
	var onClickPlay = $(this.currentElement).attr("mm-onClickPlaySound");

	//If there is an mm-onClickPlaySound sttribute
	if (typeof onClickPlay !== typeof undefined && onClickPlay !== false) {

		//Get the dom position of the element to put the sound on
		var elemPath = this.murjmation.utils.getDomPosition(this.currentElement);

		//Split the attribute to get the sound name and callback (optional)
		var s = onClickPlay.split(",");

		//If there is NO callback, then push undefined into the s array
		if (s.length < 2) {
			s.push(undefined);
		}

		//attach the handCursor CSS to the element
		$(elemPath).addClass("handCursor");

		//Bind the click to the element
		$(elemPath).bind("click.sound", function() {

			window.murjmation.playSound(s[0], s[1]);

		});

	}

}
