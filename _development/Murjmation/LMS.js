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

	LMS = function(webmation) {

		/**
		 * Reference to the main webmation class
		 * 
		 * @property webmation
		 * @type {Class}
		 */

		this.webmation = webmation;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.connected = false;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.progress = null;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.commit = null;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.details = null;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.completionStatus = null;

	};

	/**
	 * setup the course 
	 *
	 * @method init
	 */

	LMS.prototype.init = function() {};

})(window);
