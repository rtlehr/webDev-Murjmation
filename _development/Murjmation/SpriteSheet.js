/**
 * @author       Ross Lehr <itsme@rosslehr.com>
 * @copyright    2014 Ross Lehr
 */

/**
 * Controls all loading of the pages
 *
 * @class SpriteSheet
 */

(function(window) {

	SpriteSheet = function(murjmation, spriteSheetFile, spriteSheetName) {

		/**
		 * Reference to the main webmation class
		 * 
		 * @property webmation
		 * @type {Class}
		 */

		this.murjmation = murjmation;

		/**
		 * Reference to the main webmation class
		 * 
		 * @property sheet
		 * @type {String}
		 */

		this.spriteSheetFile = spriteSheetFile

		/**
		 * Holds the animations for this sheet
		 * 
		 * @property animations
		 * @type {array}
		 */

		this.animations = [];

		/**
		 * Holds the timer that change frames
		 * 
		 * @property playingAnimationTimer
		 * @type {timer}
		 */

		this.playingAnimationTimer = null;

		/**
		 * holds the name of the current animation being played
		 * 
		 * @property currentAnimation
		 * @type {String}
		 */

		this.currentAnimation = "";

		/**
		 * Holds the name of the sprite sheet
		 * 
		 * @property spriteSheetName
		 * @type {String}
		 */

		this.spriteSheetName = spriteSheetName;

		/**
		 * Holds the frames of the animation to be played
		 * 
		 * @property frameArrayCount
		 * @type {Array}
		 */

		this.frameArrayCount = [];

		/**
		 * Holds the name of the element the animation lives in
		 * 
		 * @property elemname
		 * @type {String}
		 */

		this.elemName = "";

		/**
		 * holds the number of the frame in the animation being shown
		 * 
		 * @property count
		 * @type {number}
		 */

		this.count = 0;

		/**
		 * The DIV the sprite sheet lives in
		 * 
		 * @property spriteSheetDiv
		 * @type {String}
		 */

		this.spriteSheetDiv = "";

		/**
		 * The sprite sheet image
		 * 
		 * @property spriteSheetImage
		 * @type {String}
		 */

		this.spriteSheetImage = "";

		/**
		 * The name of the animation to play
		 * 
		 * @property animationToPlay
		 * @type {String}
		 */

		this.animationToPlay = "";

		/**
		 * Javascript function to call everytime the animation has played thru
		 * 
		 * @property animationEndCallback
		 * @type {String}
		 */

		this.animationEndCallback = null;

		this.init();

	};

	/**
	 * Load the JOSN for the sprite sheet
	 *
	 * @method init
	 */

	SpriteSheet.prototype.init = function() {

		//Reference to this class
		var _this = this;

		//load the JSON for the sprite sheet
		$.getJSON(this.spriteSheetFile, function(data) {

				//Save the JSON data to be referenced later
				_this.sheet = data;

			})
			.fail(function() {

				console.log("error");

			});

	};

	/**
	 * Add an animation for the sprite sheet 
	 *
	 * @method addSheet
	 * @param {string} name = name of the animation
	 * @param {Array} frames = Frames of the sprite sheet to play
	 * @param {Number} fps = The number of frames to play per second
	 * @param {boolean} loop = loop the animation or not (true = loop, false = play once)
	 * @param {string} endCallback = Javascript callback to called each time the animation plays thru (optional)
	 */
	SpriteSheet.prototype.addAnimation = function(name, frames, fps, loop, endCallback) {

		//Save the information in the animations array
		this.animations[name] = {
			"frames": frames,
			"fps": fps,
			"loop": loop,
			"endCallback": endCallback
		};

	}

	/**
	 * Play an animation that was not defined in the orginal set up 
	 *
	 * @method playNewAnimation
	 * @param {string} name = name of the animation
	 * @param {Array} frames = Frames of the sprite sheet to play
	 * @param {Number} fps = The number of frames to play per second
	 * @param {boolean} loop = loop the animation or not (true = loop, false = play once)
	 * @param {string} endCallback = Javascript callback to called each time the animation plays thru (optional)
	 */
	SpriteSheet.prototype.playNewAnimation = function(elemName, frames, fps, loop, endCallback) {

		//Save the information in the animations array
		this.animations["NewMurjmationTempAnimation"] = {
			"frames": frames,
			"fps": fps,
			"loop": loop,
			"endCallback": endCallback
		};

		this.playAnimation(elemName, "NewMurjmationTempAnimation")

	}
	
	/**
	 * Play a single frame from the spriteSheet
	 *
	 * @method playFrame
	 * @param {string} name = name of the animation
	 * @param {Array} frame = Frames of the sprite sheet to play
	 * @param {string} endCallback = Javascript callback to called each time the animation plays thru (optional)
	 */
	SpriteSheet.prototype.playFrame = function(elemName, frame, endCallback) {
		
		if(frame.constructor === Array)
		{
			frame = [frame];
		}
		
		//Save the information in the animations array
		this.animations["NewMurjmationTempAnimation"] = {
			"frames": frame,
			"fps": 1,
			"loop": false,
			"endCallback": endCallback
		};

		this.playAnimation(elemName, "NewMurjmationTempFrame")

	}
	
	/**
	 * Play an animation
	 *
	 * @method playAnimation
	 * @param {String} elemName = Element the sprite sheet lives in
	 * @param {String} animationToPlay = Name of the animation to play
	 */

	SpriteSheet.prototype.playAnimation = function(elemName, animationToPlay) {

		clearInterval(this.playingAnimationTimer);

		//Save the element the sprite sheet lives in
		this.elemName = elemName;

		//Save the name of the animation to play
		this.animationToPlay = animationToPlay;

		//Figure out the FPS for the timer
		var fps = (1000 / Number(this.animations[this.animationToPlay].fps));

		//Get the frames needed to play the animation
		this.frameArrayCount = this.animations[this.animationToPlay].frames;

		//Set the counter to 0
		this.count = 0;

		//Create a reference to this class for other classes
		var _this = this;

		//Find the DIV the sprite sheet lives in
		this.spriteSheetDiv = $(elemName).children(0).children(0);

		//Find the image of the sprite sheet being played
		this.spriteSheetImage = $(elemName).children(0).children(0).children(0);

		//Move the frame to the first frame
		this.moveFrame();

		//Check if there are more frames, if there are, play them
		if (this.frameArrayCount.length > 1) {

			//Create the timer to play the frames
			this.playingAnimationTimer = setInterval(function() {

				//Move the frame
				_this.moveFrame();

			}, fps);

		}

	};


	/**
	 * Move the frames in the animation 
	 *
	 * @method moveFrame
	 */

	SpriteSheet.prototype.moveFrame = function() {

		//hide the element while the sprite sheet DIV while making the changes 
		$(this.spriteSheetDiv).css("visibility", "hidden");

		//Change container size
		$(this.spriteSheetDiv).css("width", this.sheet.frames[this.frameArrayCount[this.count]].frame.w);
		$(this.spriteSheetDiv).css("height", this.sheet.frames[this.frameArrayCount[this.count]].frame.h);

		//Move Image
		$(this.spriteSheetImage).css("top", (0 - this.sheet.frames[this.frameArrayCount[this.count]].frame.y));
		$(this.spriteSheetImage).css("left", (0 - this.sheet.frames[this.frameArrayCount[this.count]].frame.x));

		//Show the sprite sheet DIV after changes have been made
		$(this.spriteSheetDiv).css("visibility", "visible");

		//Add one to the counter
		this.count++;

		//Check to see if all the frames in the animation have been played
		if (this.count == this.frameArrayCount.length) {
			//Check to see if the animation should loop
			if (!this.animations[this.animationToPlay].loop) {

				//If there is no loop, then end the animation
				clearInterval(this.playingAnimationTimer);
				$(this.spriteSheetDiv).css("visibility", "visible");

			} else {

				//If ther eis a loop, then reset the count and begin the animation again
				this.count = 0;

			}

			//If there is a endCallback, then call it
			if (typeof window[this.animations[this.animationToPlay].endCallback] == 'function') {
				window[this.animations[this.animationToPlay].endCallback]();
			}

		}

	};

})(window);
