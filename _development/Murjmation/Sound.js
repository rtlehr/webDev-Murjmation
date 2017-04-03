/**
 * @author       Ross Lehr <itsme@rosslehr.com>
 * @copyright    2014 Ross Lehr
 */

/**
 * Controls all loading of the pages
 *
 * @class Load
 */

(function(window) {

	Sound = function(name, path, murjmation) {

		/**
		 * Reference to the main webmation class
		 * 
		 * @property murjmation
		 * @type {Class}
		 */

		this.murjmation = murjmation;

		this.name = name;

		this.path = path;

		this.sound = null;

		this.callback = null;

		this.animate = null;

		this.init();

	};

	/**
	 * setup the course 
	 *
	 * @method init
	 */

	Sound.prototype.init = function() {
		this.sound = new buzz.sound(this.path, {
			formats: ["ogg", "mp3", "wav"],
			preload: true,
			autoplay: false,
			loop: false
		});

		var _this = this;

		this.sound.bind("ended", function(e) {
			_this.soundEnded();
		});

		this.sound.bind("loadstart", function(e) {
			_this.murjmation.utils.showMessage("Starting to load: " + _this.getName(), 2);
		});

		this.sound.bind("canplaythrough", function(e) {
			_this.murjmation.utils.showMessage("     " + _this.getName() + " is ready to be played.", 2);
		});

		this.sound.bind("timeupdate", function(e) {
			_this.callbackFunction();
			//
		});
		/*
        this.sound.bind("volumechange", function(e) {
        	console.log(this.getVolume());
        });
		
        */

	};

	/**
	 * setup the course 
	 *
	 * @method init
	 */

	Sound.prototype.play = function(callback) {

		this.sound.play();

		this.callback = callback;

	};

	/**
	 * setup the course 
	 *
	 * @method init
	 */

	Sound.prototype.callbackFunction = function() {

		if (this.callback != null || this.callback != undefined) {
			window[this.callback](this.getTime());
		}

	};

	/**
	 * setup the course 
	 *
	 * @method init
	 */

	Sound.prototype.soundEnded = function() {

		this.callback = null;

	};

	/**
	 * setup the course 
	 *
	 * @method init
	 */

	Sound.prototype.togglePlay = function() {

		this.sound.togglePlay();

	};

	/**
	 * setup the course 
	 *
	 * @method init
	 */

	Sound.prototype.stop = function() {

		this.sound.stop();

	};

	/**
	 * setup the course 
	 *
	 * @method init
	 */

	Sound.prototype.setVolume = function(volume) {

		if (volume < 0) {
			volume = 0;
		}

		if (volume > 100) {
			volume = 100;
		}

		this.sound.setVolume(volume);

	};

	/**
	 * setup the course 
	 *
	 * @method init
	 */

	Sound.prototype.getTime = function() {

		return this.sound.getTime();

	};

	/**
	 * setup the course 
	 *
	 * @method init
	 */

	Sound.prototype.getPercent = function() {

		return this.sound.getPercent();

	};

	/**
	 * setup the course 
	 *
	 * @method init
	 */

	Sound.prototype.getDuration = function() {

		return this.sound.getDuration();

	};

	/**
	 * setup the course 
	 *
	 * @method init
	 */

	Sound.prototype.getName = function() {

		return this.name;

	};

})(window);
