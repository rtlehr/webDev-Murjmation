/**
 * @author       Ross Lehr <itsme@rosslehr.com>
 * @copyright    2014 Ross Lehr
 */

/**
 * Controls all loading of the pages
 *
 * @class History
 */

(function(window) {

	Module = function(murjmation) {

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
		 * @property webmation
		 * @type {Class}
		 */

		this.pages = [];

		/**
		 * Reference to the main webmation class
		 * 
		 * @property webmation
		 * @type {Class}
		 */

		this.name = null;


	};

	/**
	 * setup the course 
	 *
	 * @method init
	 */

	Module.prototype.init = function() {};

	/**
	 * setup the course 
	 *
	 * @method init
	 */

	Module.prototype.addPage = function(page) {
		this.pages.push(page);
	};

	/**
	 * setup the course 
	 *
	 * @method init
	 */

	Module.prototype.setName = function(name) {

		this.name = name;

	};

	/**
	 * setup the course 
	 *
	 * @method init
	 */

	Module.prototype.getName = function() {

		return this.name;

	};

	/**
	 * setup the course 
	 *
	 * @method init
	 */

	Module.prototype.getPageLength = function() {

		return this.pages.length;

	};

})(window);
