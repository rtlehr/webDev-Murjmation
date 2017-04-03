/**
 * @author       Ross Lehr <itsme@rosslehr.com>
 * @copyright    2014 Ross Lehr
 */

/**
 * Holds differnt utilities needed for the course
 *
 * @class Utils
 */

(function(window) {

	Utils = function(Murjmation) {

		/**
		 * Reference to the main Murjmation class
		 * 
		 * @property Murjmation
		 * @type {Class}
		 */

		this.murjmation = Murjmation;


	};

	/**
	 * setup the course 
	 *
	 * @method init
	 */

	Utils.prototype.init = function() {};

	/**
	* This is used to get the #screen <DIV> to browser window ratio 
	*
	* @method getScreenRatio
	8 @return screenRatio
	*/

	Utils.prototype.getScreenRatio = function() {
		//get the base width of the screen
		screenSize_width = $(this.murjmation.screen).width();

		//Set the base height of the screen
		screenSize_height = $(this.murjmation.screen).height();

		//get the browser window height
		browser_height = $(this.murjmation.screenParent).height();

		//get the browser window width
		browser_width = $(this.murjmation.screenParent).width();

		//get the ratio of the screen to the browser window
		//screenRatio = Math.min((browser_width/screenSize_width),(browser_height/screenSize_height));
		screenRatio = Math.min((browser_width / screenSize_width), (browser_height / screenSize_height));

		//if the browser window is larger than the #screen <DIV> size, then return 1
		if (screenRatio > 1) {
			screenRatio = 1;
		}

		return screenRatio;

	};

	/**
	 * Show status and error messages in the log 
	 *
	 * @method showMessage
	 */

	Utils.prototype.showMessage = function(msg, level) {
		if (this.murjmation.showMessage === true && level <= this.murjmation.levelMessage) {
			console.info(msg);
		}
	};

	/**
	 * description 
	 *
	 * @method meathodName
	 */

	Utils.prototype.convertToTweenObject = function(tween) {

		var tweenObject = jQuery.parseJSON(tween);

		//If there is a "onComplete" call back change the onComplete string to a reference to the function
		if (tweenObject.hasOwnProperty("onComplete")) {
			tweenObject.onComplete = window[tweenObject.onComplete];
		}

		return tweenObject;

	};

	/**
	 * This gets the position of the elemName in the DOC tree 
	 *
	 * @method getDomPosition
	 * @param elemName - must pass the jQuery element ex. getDomPosition($(ELEMENT))
	 */

	Utils.prototype.getDomPosition = function(elemName) {

		var dom = [];

		var d = $(elemName);

		dom.push(" > #" + $(d).attr("id"));

		while (!$(d).hasClass("page")) {
			d = $(d).parent();

			dom.push(" > #" + d.attr("id"));
		}

		var path = "#" + $(this.murjmation.getScreen()).attr("id") + " > #" + $(this.murjmation.screenBenchmark).attr("id") + "" + dom.reverse().toString().replace(/,/g, "");

		return String(path);

	};

	/**
	 * Used to call a callback function from the page or element 
	 * the function automaticaly returns the calling items class in the first param
	 * all other items are returned in the second param in an array
	 *
	 * @method callFunction
	 * @param elem - elem calling the function
	 * @param callBack - name of the callback function to be called
	 */

	Utils.prototype.callFunction = function(elem, callBack) {

		var params = null;

		//If there are Params seperate the them from the function name
		if (callBack.indexOf("(") != -1) {
			//seperate the params from the function name to be called
			params = callBack.substring(callBack.indexOf("(") + 1, (callBack.length - 1)).split(",");

			//loop thru params to see what type they are
			for (count = 0; count < params.length; count++) {
				//Check to see if they are a String
				if (params[count].substr(0, 1) == "'" || params[count].substr(0, 1) == '"') {
					params[count] = params[count].substr(1, (params[count].length - 2));
				}
				//Check if they are a function call
				else if (params[count].substr((params[count].length - 1), 1) == ")") {
					params[count] = window[params[count].substr(0, params[count].indexOf("("))];
				}
				//Check if they are a verible
				else {
					params[count] = window[params[count]];
				}

			}

			//Get the function to call
			callBack = callBack.substr(0, (callBack.indexOf("(")));

		}



		//Call the function
		window[callBack](elem, params);

	};

	/**
	 * This gets the position of the elemName in the DOM tree 
	 * Must send the elements name (the elements ID)
	 * the page name is optional, if no page name is sent, it will get the element DOM
	 * for the current page
	 *
	 * @method getElement
	 * @param elemName - Name of the element to finc in the DOM tree
	 * @param pageName - Name of the page to find the element on (optional)
	 * @return The DOM tree path to the element
	 */

	Utils.prototype.getElement = function(elemName, pageName) {


		console.log("--- YOU JUST USED getElement FUNCTION.  YOU NEED TO CHANGE IT TOO getDomPosition ---");
		//Checks to see if there was a specific page name sent
		if (pageName === null || pageName === undefined) {

			//If not, use the current page to find the element
			pageName = this.murjmation.currentGroup.pages[(this.murjmation.currentPageNum - 1)].getName();

		}
		/*
        else
        {
        	//If there is, find the correct page to get the element from
        	for(var count = 0;count<this.murjmation.coursePages.length;count++)
        	{
        		if(pageName == this.murjmation.coursePages[count].getName())
        		{
        			page = this.murjmation.coursePages[count];
        			break;
        		}
        	}
        	
        }
        		
        //Get the elements from the page
        var pageElements = page.getElements();
		
        //Loop thru the elements to get the correct one
        for(var count=0;count<pageElements.length;count++)
        {
        	if(elemName == pageElements[count].getName())
        	{
        		elemDom = pageElements[count].getDom();
        		break;
        	}
        }
        */

		//return the DOM tree position
		//return elemDom;

		return "#" + pageName + " #" + elemName


	};

})(window);
