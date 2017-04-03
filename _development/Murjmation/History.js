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

	History = function(murjmation) {

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

	};

	/**
	 * setup the course 
	 *
	 * @method init
	 */

	History.prototype.init = function() {};

	/**
	 * setup the course 
	 *
	 * @method init
	 */

	History.prototype.addPage = function(page) {
		this.pages.push(page);
	};

	/**
	 * setup the course 
	 *
	 * @method init
	 */

	History.prototype.getPageByNumber = function(page) {

		return this.pages[page];

	};

})(window);
