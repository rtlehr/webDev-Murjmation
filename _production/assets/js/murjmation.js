/**
 * @author       Ross Lehr <itsme@rosslehr.com>
 * @copyright    2014 Ross Lehr
 */

/**
 * Controls all animations for the pages and elements
 *
 * @class Animation
 */

(function(window) {

	Animation = function(murjmation) {

		/**
		 * Reference to the main murjmation class
		 * 
		 * @property murjmation
		 * @type {Class}
		 */

		this.murjmation = murjmation;

		/**
		 * Holds the number of the current page the user is viewing
		 * THe first page of the course is 1 
		 *
		 * @property currentPage
		 * @type {Number}
		 */

		this.currentPage = null;

		this.pageNum = 0;

		/**
		 * This increments by 1 everytime an element is completly animated in
		 * 
		 * @property countElementsIn
		 * @type {Number}
		 */

		this.countElementsIn = 0;

		/**
		 * This increments by 1 everytime an element is completly animated out
		 * 
		 * @property countElementsOut
		 * @type {Number}
		 */

		this.countElementsOut = 0;

		/**
		 * DESCRIPTION
		 * 
		 * @property nextPagePos
		 * @type {type}
		 */

		this.nextPagePos = null;

		/**
		 * DESCRIPTION
		 * 
		 * @property prevPage
		 * @type {type}
		 */

		this.prevPage = null;

		/**
		 * DESCRIPTION
		 * 
		 * @property moveToNextPage
		 * @type {type}
		 */

		this.moveToNextPage = false;

		/**
		 * DESCRIPTION
		 * 
		 * @property nextPageDuration
		 * @type {type}
		 */

		this.nextPageDuration = null;

		/**
		 * DESCRIPTION
		 * 
		 * @property currentElement
		 * @type {type}
		 */

		this.currentElement = null;

	};

	/**
	 * setup the course 
	 *
	 * @method init
	 */

	Animation.prototype.init = function() {};

	/**
	 * description 
	 *
	 * @method meathodName
	 */

	Animation.prototype.gotoFirst = function() {

		this.currentPage = this.murjmation.currentGroup.pages[this.murjmation.currentPageNum - 1];

		$("#" + this.currentPage.getName()).removeClass("mm-hide");

		this.moveToNextPage = true;

		this.animateToPage();

	};

	/**
	 * description 
	 *
	 * @method meathodName
	 */

	Animation.prototype.gotoPage = function() {

		this.prevPage = this.currentPage;

		this.currentPage = this.murjmation.currentGroup.pages[(this.murjmation.currentPageNum - 1)];

		this.moveToNextPage = true;

		this.exitingCurrentPage();

	};

	/**
	 * description 
	 *
	 * @method meathodName
	 */

	Animation.prototype.exitingCurrentPage = function() {

		if (this.prevPage.getOutElementsCount() > 0) {
			//Animate elements out
			var e = this.prevPage.getElements();

			for (var count = 0; count < e.length; count++) {
				if (e[count].getAnimateOnPageOut()) {
					this.animateElementOut(e[count]);
				}

			}
		} else {

			this.animateToPage();

		}

	};


	/**
	 * Startes the elements OUT transition 
	 *
	 * @method animateElementOut
	 */

	Animation.prototype.animateElementOut = function(elem) {

		//Get the elements out duration
		var dur = elem.getOutDuration();

		//Get the posistion where the element is transitioning to
		var pos = elem.getOutStopPosition();

		//Set the Element is in flag to "false" which means the element is in it's OUT state
		elem.setIsIn(false);

		//Get the DOM tree path to the element
		var elemDom = elem.getDom();

		this.murjmation.utils.showMessage("Animating " + elem.getName() + " on " + elem.page.getName() + " to " + JSON.stringify(pos), 2);

		//Set up greensock animation
		pos.onComplete = this.elementFinishedOut;
		pos.onCompleteScope = this;
		pos.onCompleteParams = [elem];

		//If there is sound assocatied wit hthe start of the elements trasition, play it
		if (elem.getOutStartSound() !== null) {
			this.murjmation.playSound(elem.getOutStartSound(), elem.getOutStartSoundCallback());
		}

		//Start the greensock transition
		var outParent = new TweenMax.to($(elemDom), dur, pos);
		outParent.timeScale(elem.getOutTimeScale());

		//Start the transition of the murjmation child <div>
		if (elem.getOutStopMurjmationDiv() !== null) {
			var childPos = elem.getOutStopMurjmationDiv();
			var outChild = new TweenMax.to($(elemDom).children().eq(0), dur, childPos);
			outChild.timeScale(elem.getOutTimeScale());

			this.murjmation.utils.showMessage("Animating child of " + elem.getName() + " on " + elem.page.getName() + " to " + JSON.stringify(childPos), 2);
		}
	};

	/**
	 * Called when an element has finished it's OUT transition 
	 *
	 * @method elementFinishedOut
	 */

	Animation.prototype.elementFinishedOut = function(elem) {

		//If there are elements that transition when this one is finished, strat them.
		if (elem.getAnimateOnOutComplete() !== null) {
			this.murjmation.animateElement(elem.getAnimateOnOutComplete());
		}

		//If there is a sound that should play when this element finishes transitioning, play it.
		if (elem.getOutFinishedSound() !== null) {
			this.murjmation.playSound(elem.getOutFinishedSound(), elem.getOutFinishedSoundCallback());
		}

		//If there is a function that should be called when the element is finished transitioning out, call it.
		if (elem.getOutCallback() !== null) {

			var elemPath = this.murjmation.utils.getDomPosition("#" + elem.getName());

			window.murjmation.utils.callFunction(elemPath, elem.getOutCallback());

		}

		//If the function "murjmationElementOut" exisits, call it
		if (typeof murjmationElementOut == 'function') {
			murjmationElementOut(elem);
		}

		//If it was a navigation button that was exacuted and the final element has moved OUT, then go to the next page.
		if (this.moveToNextPage) {
			//Count the elements moving out
			this.countElementsOut++;

			//
			if ((this.countElementsOut === this.prevPage.getOutElementsCount())) {

				this.animateToPage();

			}

		}

	};

	/**
	 * Start the animation to the next page 
	 *
	 * @method animateToPage
	 */

	Animation.prototype.animateToPage = function() {


		//Check that there is a page to go to.
		//if(this.currentPage <= this.murjmation.coursePages.length)
		// {
		//Check that there is a previous page to check.  This is will be NULL if the user is on page 1
		if (this.prevPage !== null) {

			//If there is an OUT sound for the prevPage, play it.
			if (this.prevPage.getOutSound() !== null) {
				this.murjmation.playSound(this.prevPage.getOutSound(), this.prevPage.getOutSoundCallback());
			}

		}

		this.murjmation.utils.showMessage(" ", 1);
		this.murjmation.utils.showMessage("Starting to animate to a page " + this.currentPage.getName(), 1);

		// }  

		//If there is an OUT callback, call it.
		if (this.prevPage !== null) {
			var pageOutCallback = this.prevPage.getPageOutCallback();

			if (pageOutCallback !== null) {
				this.murjmation.utils.showMessage("     calling pageOutCallback for " + this.prevPage.getPageOutCallback(), 3);

				var elemPath = this.murjmation.utils.getDomPosition("#" + this.prevPage.getName());

				window.murjmation.utils.callFunction(elemPath, pageOutCallback);

			}
		}

		//if the "murjmationPageOut" function exists, call it.
		if (typeof murjmationPageOut == 'function' && this.murjmation.currentPageNum != 1) {

			this.murjmation.utils.showMessage("     calling murjmationPageOut()", 3);
			murjmationPageOut(this.murjmation.currentGroup.pages[(this.murjmation.currentPageNum - 2)]);

		}

		//If the current page is NOT the last page of the course
		//if((this.currentPage) <= this.murjmation.coursePages.length)
		//{

		//Reset the IN and OUT count
		this.countElementsIn = 0;
		this.countElementsOut = 0;

		//Remove the .hide class from the page.
		$("#" + this.currentPage.getName()).removeClass("mm-hide");

		//Get the top and left position of the page
		this.nextPagePos = this.currentPage.getVisibleLocation();

		//Set up the Greensock transition
		this.nextPagePos.onComplete = this.atNextPage;
		this.nextPagePos.onCompleteScope = this;

		//Get the duration it takes to move the page into the visible area
		this.nextPageDuration = this.currentPage.getDuration();

		//Transition the page into the visible area.
		TweenMax.to($(this.murjmation.screenBenchmark), this.nextPageDuration, this.nextPagePos);

		//}

	};

	/**
	 * Called when the page is finished moving into location 
	 *
	 * @method atNextPage
	 */

	Animation.prototype.atNextPage = function() {

		//Already at the next page, so set this back to false
		this.moveToNextPage = false;

		//Reset elements on last page viewed
		if ((this.murjmation.currentPageNum) !== 0 && this.prevPage !== null) {

			if (this.prevPage.getOutSound() !== null) {
				this.murjmation.playSound(this.prevPage.getInSound(), this.prevPage.getInSoundCallback());
			}

			var e = this.prevPage.getElements();

			for (var count = 0; count < e.length; count++) {

				this.setElementToStartLocation(e[count]);
			}

		}

		//Hide the previous page
		if (this.prevPage !== null) {
			$("#" + this.prevPage.getName()).addClass("mm-hide");
		}

		//if the function "murjmationPageIn" exists, call it
		if (typeof murjmationPageIn == 'function') {
			murjmationPageIn(this.currentPage);
		}

		//IF this page has a inCallback then call it
		var pageInCallback = this.currentPage.getPageInCallback();

		if (pageInCallback !== null) {

			var elemPath = this.murjmation.utils.getDomPosition("#" + this.currentPage.getName());

			window.murjmation.utils.callFunction(elemPath, pageInCallback);

		}

		//Animate elements in
		var e = this.currentPage.getElements();

		if (e.length > 0) {
			for (var count = 0; count < e.length; count++) {

				if (e[count].getAnimateOnPageIn()) {
					this.animateElementIn(e[count]);
				}

			}
		} else {
			//Check to see if this page is meant to continue on, if so, check the direction of the mmovement, and go to that page.
			if (this.currentPage.getContinueOn()) {
				if (this.murjmation.navigationDirection === "forward") {
					this.gotoNextPage();
				} else {
					this.gotoPrevPage();
				}
			}

		}

	};

	/**
	 * Called when an element is moved in 
	 *
	 * @method animateElementIn
	 */

	Animation.prototype.animateElementIn = function(elem) {
		//Get the elements transition duration
		var dur = elem.getInDuration();

		//Get the top and left position of the element when the element has finished transitioning
		var pos = elem.getInStopPosition();

		//set the is in flag of the element to TRUE
		elem.setIsIn(true);

		//Get the DOM tree path to the element
		var elemDom = elem.getDom();

		this.murjmation.utils.showMessage("Animating " + elem.getName() + " on " + elem.page.getName() + " to " + JSON.stringify(pos), 2);

		//set up Greensock for the transition
		pos.onComplete = this.elementFinishedIn;
		pos.onCompleteScope = this;
		pos.onCompleteParams = [elem];

		if (elem.getInStartSound() !== null) {
			this.murjmation.playSound(elem.getInStartSound(), elem.getInStartSoundCallback());
		}

		var inParent = new TweenMax.to($(elemDom), dur, pos);
		inParent.timeScale(elem.getInTimeScale());

		if (elem.inStopMurjmationDiv !== null) {
			var childPos = elem.getInStopMurjmationDiv();
			childPos.ease = pos.ease;

			var inChild = new TweenMax.to($(elemDom).children().eq(0), dur, childPos);
			inChild.timeScale(elem.getInTimeScale());

			this.murjmation.utils.showMessage("Animating child of " + elem.getName() + " on " + elem.page.getName() + " to " + JSON.stringify(childPos), 2);
		}

	};

	/**
	 * Called when the element is finished moving in 
	 *
	 * @method elementFinishedIn
	 */

	Animation.prototype.elementFinishedIn = function(elem) {

		//If there is a callback when the element finshed moving in, call it.
		if (elem.getAnimateOnInComplete() !== null) {
			this.murjmation.animateElement(elem.getAnimateOnInComplete());
		}

		//If there is a sound when the element is finished moving in, play it
		if (elem.getInFinishedSound() !== null) {
			this.murjmation.playSound(elem.getInFinishedSound(), elem.getInFinishedSoundCallback());
		}

		//Add one to the total count of elements moving in
		this.countElementsIn++;

		//IF the "murjmationElementIn" function exists, call it
		if (typeof murjmationElementIn == 'function') {
			murjmationElementIn(elem);
		}

		//If there is a function to be called when the element is finished moving in, call it
		if (elem.getInCallback() !== null) {

			var elemPath = this.murjmation.utils.getDomPosition("#" + elem.getName());

			window.murjmation.utils.callFunction(elemPath, elem.getInCallback());

		}

		//Moves to the next page if the mm-continueOn tag is preset on the page
		if (this.countElementsIn == this.currentPage.getInElementsCount()) {

			if (this.currentPage.getContinueOn()) {

				if (this.murjmation.navigationDirection === "forward") {
					this.gotoNextPage();
				} else {
					this.gotoPrevPage();
				}
			}

		}

	};

	/**
	 * Sets the element to the position it needs to be to play the IN animation 
	 *
	 * @method setElementToStartLocation
	 * @param elem - the element to used in this function
	 */

	Animation.prototype.setElementToStartLocation = function(elem) {

		var elemDom = elem.getDom();

		if (elem.inStartPosition !== null) {

			elem.setIsIn(false);

			//INsure the element's alpha is set to 1 before reseting it
			TweenMax.to($(elemDom), 0, {
				autoAlpha: 1
			});

			TweenMax.to($(elemDom), 0, elem.getInStartPosition());

			this.murjmation.utils.showMessage(" ", 2);
			this.murjmation.utils.showMessage("Set " + elem.getName() + " on " + elem.page.getName() + " to " + JSON.stringify(elem.getInStartPosition()), 2);

			if (elem.inStopMurjmationDiv !== null) {

				TweenMax.to($(elemDom).children().eq(0), 0, elem.getInStartMurjmationDiv());

				this.murjmation.utils.showMessage("Set child of " + elem.getName() + " on " + elem.page.getName() + " to " + JSON.stringify(elem.getInStartMurjmationDiv()), 2);
			}
		}

	};

	/**
	 * Sets the element to the position it needs to be to play the OUT animation 
	 *
	 * @method setElementToStartLocation
	 * @param elem - the element to used in this function
	 */

	Animation.prototype.setElementToEndLocation = function(elem) {

		var elemDom = elem.getDom();

		if (elem.outStartPosition !== null) {

			elem.setIsIn(true);

			//INsure the element's alpha is set to 1 before reseting it
			TweenMax.to($(elemDom), 0, {
				autoAlpha: 1
			});

			TweenMax.to($(elemDom), 0, elem.getOutStartPosition());

			this.murjmation.utils.showMessage(" ", 2);
			this.murjmation.utils.showMessage("Set " + elem.getName() + " on " + elem.page.getName() + " to " + JSON.stringify(elem.getOutStartPosition()), 2);

			if (elem.outStopMurjmationDiv !== null) {

				TweenMax.to($(elemDom).children().eq(0), 0, elem.getOutStartMurjmationDiv());

				this.murjmation.utils.showMessage("Set child of " + elem.getName() + " on " + elem.page.getName() + " to " + JSON.stringify(elem.getOutStopMurjmationDiv()), 2);
			}
		}

	};

})(window);

/**
 * @author       Ross Lehr <itsme@rosslehr.com>
 * @copyright    2014 Ross Lehr
 */

/**
 * Formats the course pages and elements
 *
 * @class FormatCourse
 * @param Murjmation - reference to the MurjMation class
 */

(function(window) {

	FormatCourse = function(murjmation) {

		/**
		 * Reference to the main webmation class
		 * 
		 * @property webmation
		 * @type {Class}
		 */

		this.murjmation = murjmation;

		/**
		 * Holds the current page being configured
		 * 
		 * @property currentPage
		 * @type {Number}
		 */

		this.currentPage = null;

		/**
		 * Holds the reference to the current element on the page being configured
		 * 
		 * @property currentElement
		 * @type {Number}
		 */

		this.currentElement = null;

		/**
		 * Holds the reference to the current element on the page being configured
		 * 
		 * @property currentElement
		 * @type {Number}
		 */

		this.pageContent = null;

		/**
		 * Holds the total number of elements on the page
		 * 
		 * @property totalElements
		 * @type {Number}
		 */

		this.transitions;

		this.totalElements = null;

		this.courseScripts = null;

		this.courseCSS = null;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.pageTop = null;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.pageLeft = null;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.pageHeight = null;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.pageWidth = null;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.animIn = [];

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.animOut = [];

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.elemTop = null;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.elemLeft = null;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.elemWidth = null;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.elemHeight = null;


		this.inTop = null;

		this.inLeft = null;

		this.inWidth = null;

		this.inHeight = null;

		this.inAlpha = null;

		this.inScale = null;


		this.outTop = null;

		this.outLeft = null;

		this.outWidth = null;

		this.outHeight = null;

		this.outAlpha = null;

		this.outScale = null;

		this.elemCount = 0;

	};

	/**
	 * Initializes the class 
	 *
	 * @method init
	 */

	FormatCourse.prototype.init = function() {};

	/**
	 * Starts the formating of the course 
	 * called from Load.addContent() class.function
	 *
	 * @method startFormat
	 */

	FormatCourse.prototype.formatPage = function(page) {


		this.currentPage = page;

		//get the current position of the #benchmark <div>
		var benPos = $(this.murjmation.screenBenchmark).position();

		var animPos = "";

		var pagePos = $("#" + this.currentPage.getName()).position();

		animPos += "\"top\":" + (benPos.top - pagePos.top);

		animPos += ",\"left\":" + (benPos.left - pagePos.left);

		//If there is a custom ease set it
		var attrin = $("#" + this.currentPage.getName()).attr("mm-ease");

		if (typeof attrin !== typeof undefined && attrin !== false) {

			animPos += ",\"ease\":\"" + $("#" + this.currentPage.getName()).attr("mm-ease") + "\"";

		}

		this.currentPage.setVisibleLocation("{" + animPos + "}");

		//configure the element
		//this.murjmation.configurePageAnimations.configurePage(p[key].pages[count]);


		this.pageContent = $("#" + page.getName());

		//Sets the Bool if the page plays it's transitions, then moves to the next page
		//This sets the continueOn bool in the Page class to "true"
		if ($(this.pageContent).hasClass("mm-continueOn")) {

			this.currentPage.setContinueOn();

		}


		//If there is one, sets the sound to be played when the page enters the visable area of the "screen"
		//Sound plays when the "in" transition of the page stops
		var inSound = $(this.pageContent).attr("mm-inSound");

		if (typeof inSound !== typeof undefined && inSound !== false) {

			this.currentPage.setInSound(inSound);

		}

		//If there is one, sets the callback when the inSound is complete playing 
		var inSoundCallback = $(this.pageContent).attr("mm-inSoundCallback");

		if (typeof inSoundCallback !== typeof undefined && inSoundCallback !== false) {

			this.currentPage.setInSoundCallback(inSoundCallback);

		}

		//If there is one, sets the sound to be played when the page enters the visable area of the "screen"
		//Sound plays when the "in" transition of the page stops
		var outSound = $(this.pageContent).attr("mm-outSound");

		if (typeof outSound !== typeof undefined && outSound !== false) {

			this.currentPage.setOutSound(outSound);

		}



		//If there is one, sets the sound to be played when the page leaves the visable area of the "screen"
		//Sound plays before the "out" transition of the page begins
		var outSoundCallback = $(this.pageContent).attr("mm-outSoundCallback");

		if (typeof outSoundCallback !== typeof undefined && outSoundCallback !== false) {

			this.currentPage.setOutSoundCallback(outSoundCallback);

		}


		//If there is one, change the duration it takes to get to this page
		var dur = $(this.pageContent).attr("mm-duration");

		if (typeof dur !== typeof undefined && dur !== false) {

			this.currentPage.setDuration(dur);

		} else {

			this.currentPage.setDuration(1);

		}

		//if there is a callback add it to the object
		var inCallback = $(this.pageContent).attr("mm-pageincallback");

		if (typeof inCallback !== typeof undefined && inCallback !== false) {
			this.currentPage.setPageInCallback(inCallback);
		}

		//if there is an out callback add it to the object
		var outCallback = $(this.pageContent).attr("mm-pageoutcallback");

		if (typeof outCallback !== typeof undefined && outCallback !== false) {

			this.currentPage.setPageOutCallback(outCallback);

		}

		this.murjmation.utils.showMessage("   Name: " + this.currentPage.getName(), 3);

		var elemContent = [];
		
		var elemts = [];

		//Add the "MurjmationInternalAnimatedElementDiv" <div> to all the "mm-element" <div>
		$(this.pageContent).find(".mm-element").each(function(e) {
			
			elemts.push($(this));
			
			//copy the html from the <div>
			var h = $(this).html();
									
			elemContent.push($.parseHTML("<div style='position: absolute;' id='MurjmationInternalAnimatedElementDiv'>" + h + "</div>"));

						
		});
		
		for(var count=0;count<elemContent.length;count++)
		{
			
			$("#" + $(this.pageContent).attr("id")).find("#" + $(elemts[count]).attr("id")).empty();
			
			$("#" + $(this.pageContent).attr("id")).find("#" + $(elemts[count]).attr("id")).append(elemContent[count]);
			
		}
		
		$(this.pageContent).addClass("mm-hide");

		this.formatElements();

	};

	/**
	 * Starts the formating of the course 
	 * called from Load.addContent() class.function
	 *
	 * @method startFormat
	 */

	FormatCourse.prototype.formatElements = function() {
		//this.currentPage - page class
		//this.pageContent - page content

		this.transitions = new Transitions(this);

		var _this = this;

		$(this.pageContent).find(".mm-element").each(function(e) {


			_this.currentElement = $(this);

			//get the top pos of the page
			_this.pageTop = Number($(_this.pageContent).css("top").replace(/\D/g, ''));

			//get the left pos of the page
			_this.pageLeft = Number($(_this.pageContent).css("left").replace(/\D/g, ''));

			//get the height pos of the page
			_this.pageHeight = Number($(_this.pageContent).css("height").replace(/\D/g, ''));

			//get the width pos of the page
			_this.pageWidth = Number($(_this.pageContent).css("width").replace(/\D/g, ''));

			var elemClass = $(this).attr("class");

			var classArray = elemClass.split(" ");

			//Get the animations of the page intro
			for (var count = 0; count < classArray.length; count++) {

				if (classArray[count].indexOf("animin-") != -1) {

					var a = classArray[count].split("-");

					_this.animIn = a[1].split(":");

				}

				if (classArray[count].indexOf("animout-") != -1) {

					var a = classArray[count].split("-");

					_this.animOut = a[1].split(":");

				}

			}

			_this.elemTop = $(_this.murjmation.utils.getDomPosition(_this.currentElement)).position().top;
			_this.elemLeft = $(_this.murjmation.utils.getDomPosition(_this.currentElement)).position().left;
			_this.elemWidth = $(_this.murjmation.utils.getDomPosition(_this.currentElement)).width();
			_this.elemHeight = $(_this.murjmation.utils.getDomPosition(_this.currentElement)).height();

			_this.inTop = _this.elemTop;
			_this.inLeft = _this.elemLeft;
			_this.inWidth = _this.elemWidth;
			_this.inHeight = _this.elemHeight;
			_this.inAlpha = 1;
			_this.inScale = 1;

			_this.outTop = _this.elemTop;
			_this.outLeft = _this.elemLeft;
			_this.outWidth = _this.elemWidth;

			_this.outHeight = _this.elemHeight;
			_this.outAlpha = 1;
			_this.outScale = 1;

			//Create a new element object in the page object
			_this.currentPage.createElement();

			_this.currentPage.elements[_this.currentPage.elements.length - 1].setCount(_this.elemCount);

			if ($(this).hasClass("mm-animateIn")) {

				_this.currentPage.elements[_this.currentPage.elements.length - 1].setAnimateOnPageIn();

				_this.currentPage.addInElementsCount();

			}

			if ($(this).hasClass("mm-animateOut")) {

				_this.currentPage.elements[_this.currentPage.elements.length - 1].setAnimateOnPageOut();

				_this.currentPage.addOutElementsCount();

			}

			_this.currentPage.elements[_this.currentPage.elements.length - 1].setDom(_this.murjmation.utils.getDomPosition($(this)));

			//Set the elements name (comes from the <DIV> id)
			_this.currentPage.elements[_this.currentPage.elements.length - 1].setName($(this).attr("id"));

			//Set the original position of the element

			_this.currentPage.elements[_this.currentPage.elements.length - 1].setOrgPosition(_this.setOrgPos());

			if (_this.animIn.length > 0) {
				_this.createInAnimation(_this.animIn);
			}

			if (_this.animOut.length > 0) {
				_this.createOutAnimation(_this.animOut);
			}

			//Add a javascript function callback to an element
			_this.onClickCallback();

			//Add click to navagate to a differnt page
			_this.onClickNavigateTo();

			//Add click animate element
			_this.onClickAnimateElement();

			//add Pop Up functionality
			_this.onClickShowPopUp();

			//add mouse click sound
			_this.onClickPlaySound();

			//add mouse click sound
			_this.onMouseOverPlay();

			//add element rollout sound
			_this.onMouseOutPlay();

			//add element rollout sound
			_this.addSpriteSheet();

			//add one to the elemCount
			_this.elemCount++

		});

		this.elementsComplete();

	}

	FormatCourse.prototype.setOrgPos = function() {

		var animoriginal = "{";

		animoriginal += "\"top\":" + this.elemTop;

		animoriginal += ",\"left\":" + this.elemLeft;

		animoriginal += ",\"width\":" + this.elemWidth;

		animoriginal += ",\"height\":" + this.elemHeight;

		animoriginal += "}";

		return animoriginal;

	};

	/**
	 * description 
	 *
	 * @method createInAnimation
	 */

	FormatCourse.prototype.createInAnimation = function() {

		var _this = this;

		this.inMurjnationTop = 0;

		this.inMurjnationLeft = 0;

		this.inMurjnationWidth = this.inWidth;

		this.inMurjnationHeight = this.inHeight;

		this.outMurjnationTop = 0;

		this.outMurjnationLeft = 0;

		this.outMurjnationWidth = this.inWidth;

		this.outMurjnationHeight = this.inHeight;

		//reset elem demensions

		this.inTop = this.elemTop;

		this.inLeft = this.elemLeft;

		this.inWidth = this.elemWidth;

		this.inHeight = this.elemHeight;

		this.outTop = this.elemTop;

		this.outLeft = this.elemLeft;

		this.outWidth = this.elemWidth;

		this.outHeight = this.elemHeight;


		this.buildAnimation(this.animIn);

		this.startText = "";

		this.startText += "\"top\":" + this.inTop;

		this.startText += ",\"left\":" + this.inLeft;

		this.startText += ",\"width\":" + this.inWidth;

		this.startText += ",\"height\":" + this.inHeight;

		this.startText += ",\"autoAlpha\":" + this.inAlpha;

		this.startText += ",\"scale\":" + this.inScale;



		this.startMurjnationDiv = "";

		this.startMurjnationDiv += "\"top\":" + this.inMurjnationTop;

		this.startMurjnationDiv += ",\"left\":" + this.inMurjnationLeft;

		this.startMurjnationDiv += ",\"width\":" + this.inMurjnationWidth;

		this.startMurjnationDiv += ",\"height\":" + this.inMurjnationHeight;



		this.stopText = "";

		this.stopText += "\"top\":" + this.outTop;

		this.stopText += ",\"left\":" + this.outLeft;

		this.stopText += ",\"width\":" + this.outWidth;

		this.stopText += ",\"height\":" + this.outHeight;

		this.stopText += ",\"autoAlpha\":" + this.outAlpha;

		this.stopText += ",\"scale\":" + this.outScale;



		this.stopMurjnationDiv = "";

		this.stopMurjnationDiv += "\"top\":" + this.outMurjnationTop;

		this.stopMurjnationDiv += ",\"left\":" + this.outMurjnationLeft;

		this.stopMurjnationDiv += ",\"width\":" + this.outMurjnationWidth;

		this.stopMurjnationDiv += ",\"height\":" + this.outMurjnationHeight;



		this.addEase("mm-inease");

		this.addDelay("mm-indelay");

		this.addTimeScale("mm-intimescale");

		this.addElemStartTransitionSound("mm-inStartSound");

		this.addElemFinishTransitionSound("mm-inFinishedSound");

		//If the element has an IN animation call this function

		this.inCallback();


		//add navigation to an element

		this.animationOnInComplete();

		//add navigation to an element

		this.animationOnOutComplete();

		//Set the original position of the element
		this.currentPage.elements[this.currentPage.elements.length - 1].setInStartPosition("{" + this.startText + "}");

		this.currentPage.elements[this.currentPage.elements.length - 1].setInStartMurjmationDiv("{" + this.startMurjnationDiv + "}");

		//Set the original position of the element
		this.currentPage.elements[this.currentPage.elements.length - 1].setInStopPosition("{" + this.stopText + "}");

		var d = this.stopMurjnationDiv + ",\"delay\":" + this.currentPage.elements[this.currentPage.elements.length - 1].getInStopPosition().delay;

		d = d + ",\"ease\":\"" + this.currentPage.elements[this.currentPage.elements.length - 1].getInStopPosition().ease + "\"";

		this.currentPage.elements[this.currentPage.elements.length - 1].setInStopMurjmationDiv("{" + d + "}");

		this.addDuration("mm-induration");

		this.animIn = [];

	};

	/**
	 * description 
	 *
	 * @method meathodName
	 */

	FormatCourse.prototype.createOutAnimation = function() {
		this.inMurjnationTop = 0;

		this.inMurjnationLeft = 0;

		this.inMurjnationWidth = this.inWidth;

		this.inMurjnationHeight = this.inHeight;

		this.outMurjnationTop = 0;

		this.outMurjnationLeft = 0;

		this.outMurjnationWidth = this.inWidth;

		this.outMurjnationHeight = this.inHeight;

		//reset elem demensions

		this.inTop = this.elemTop;

		this.inLeft = this.elemLeft;

		this.inWidth = this.elemWidth;

		this.inHeight = this.elemHeight;

		this.outTop = this.elemTop;

		this.outLeft = this.elemLeft;

		this.outWidth = this.elemWidth;

		this.outHeight = this.elemHeight;

		this.buildAnimation(this.animOut);

		this.startText = "";

		this.startText += "\"top\":" + this.inTop;

		this.startText += ",\"left\":" + this.inLeft;

		this.startText += ",\"width\":" + this.inWidth;

		this.startText += ",\"height\":" + this.inHeight;

		this.startText += ",\"autoAlpha\":" + this.inAlpha;


		this.startMurjnationDiv = "";

		this.startMurjnationDiv += "\"top\":" + this.inMurjnationTop;

		this.startMurjnationDiv += ",\"left\":" + this.inMurjnationLeft;

		this.startMurjnationDiv += ",\"width\":" + this.inMurjnationWidth;

		this.startMurjnationDiv += ",\"height\":" + this.inMurjnationHeight;


		this.stopText = "";

		this.stopText += "\"top\":" + this.outTop;

		this.stopText += ",\"left\":" + this.outLeft;

		this.stopText += ",\"width\":" + this.outWidth;

		this.stopText += ",\"height\":" + this.outHeight;

		this.stopText += ",\"autoAlpha\":" + this.outAlpha;


		this.stopMurjnationDiv = "";

		this.stopMurjnationDiv += "\"top\":" + this.outMurjnationTop;

		this.stopMurjnationDiv += ",\"left\":" + this.outMurjnationLeft;

		this.stopMurjnationDiv += ",\"width\":" + this.outMurjnationWidth;

		this.stopMurjnationDiv += ",\"height\":" + this.outMurjnationHeight;

		this.addEase("mm-outease");

		this.addDelay("mm-outdelay");

		this.addTimeScale("mm-outtimescale");

		this.addElemStartTransitionSound("mm-outStartSound");

		this.addElemFinishTransitionSound("mm-outFinishedSound");

		this.outCallback();

		//Set the original position of the element
		this.currentPage.elements[this.currentPage.elements.length - 1].setOutStartPosition("{" + this.startText + "}");
		this.currentPage.elements[this.currentPage.elements.length - 1].setOutStartMurjmationDiv("{" + this.startMurjnationDiv + "}");

		//Set the original position of the element
		this.currentPage.elements[this.currentPage.elements.length - 1].setOutStopPosition("{" + this.stopText + "}");
		var d = this.stopMurjnationDiv + ",\"delay\":" + this.currentPage.elements[this.currentPage.elements.length - 1].getOutStopPosition().delay;
		d = d + ",\"ease\":\"" + this.currentPage.elements[this.currentPage.elements.length - 1].getOutStopPosition().ease + "\"";

		this.currentPage.elements[this.currentPage.elements.length - 1].setOutStopMurjmationDiv("{" + d + "}");

		this.addDuration("mm-outduration");

		this.animOut = [];

	};

	/**
	 * description 
	 *
	 * @method meathodName
	 */

	FormatCourse.prototype.buildAnimation = function(a) {


		this.anim = {};

		this.anim.startAnim = "";

		this.anim.stopAnim = "";

		this.anim.startMurjmationDiv = null;

		this.anim.stopMurjmationDiv = null;

		this.addComma = false;

		this.topAllowed = true;

		this.leftAllowed = true;

		this.heightAllowed = true;

		this.widthAllowed = true;

		for (var count = 0; count < a.length; count++) {

			if (this.transitions[a[count]] !== null) {

				this.transitions[a[count]]();

			} else {
				console.warn("WARNING: " + a[count] + " is not a transition.");
			}

		}

		return this.anim;

	};

	/**
	 * description 
	 *
	 * @method meathodName
	 */

	FormatCourse.prototype.addDuration = function(t) {

		var normalize = $("#" + this.currentPage.getName()).hasClass("mm-normalizeDuration");

		if (t === "mm-induration") {
			var duration = null;

			//if there is a callback add it to the object
			var attrin = $(this.currentElement).attr("mm-induration");



			if (typeof attrin !== typeof undefined && attrin !== false) {

				duration = $(this.currentElement).attr("mm-induration");

			} else {

				duration = this.murjmation.getDefaultDuration();

				if (normalize) {
					var nL = this.murjmation.normalLength;

					var length = null;
					var start = null;
					var stop = null;

					var startX = this.currentPage.elements[this.currentPage.elements.length - 1].getInStartPosition().left;
					var startY = this.currentPage.elements[this.currentPage.elements.length - 1].getInStartPosition().top;

					var stopX = this.currentPage.elements[this.currentPage.elements.length - 1].getInStopPosition().left;
					var stopY = this.currentPage.elements[this.currentPage.elements.length - 1].getInStopPosition().top;

					var disX = Math.max(startX, stopX) - Math.min(startX, stopX);

					var disY = Math.max(startY, stopY) - Math.min(startY, stopY);

					length = Math.sqrt((disX * disX) + (disY * disY));

					duration = (length / nL) * duration;

				}

			}

			this.currentPage.elements[this.currentPage.elements.length - 1].setInDuration(duration);

		}

		if (t === "mm-outduration") {
			var duration = null;

			//if there is a callback add it to the object
			var attrin = $(this.currentElement).attr("mm-outduration");

			if (typeof attrin !== typeof undefined && attrin !== false) {

				duration = $(this.currentElement).attr("mm-outduration");

			} else {

				duration = this.murjmation.getDefaultDuration();

				if (normalize) {

					var nL = this.murjmation.normalLength;
					var length = null;
					var start = null;
					var stop = null;

					if (this.currentPage.elements[this.currentPage.elements.length - 1].getOutStartPosition().hasOwnProperty('left')) {

						start = this.currentPage.elements[this.currentPage.elements.length - 1].getOutStartPosition().left;
						stop = this.currentPage.elements[this.currentPage.elements.length - 1].getOutStopPosition().left;

					}

					if (this.currentPage.elements[this.currentPage.elements.length - 1].getOutStartPosition().hasOwnProperty('top')) {

						start = this.currentPage.elements[this.currentPage.elements.length - 1].getOutStartPosition().top;
						stop = this.currentPage.elements[this.currentPage.elements.length - 1].getOutStopPosition().top;

					}

					if (stop < 0)
						stop = 0;

					length = Math.abs(start - stop);

					duration = (length / nL) * duration;

				}
			}

			this.currentPage.elements[this.currentPage.elements.length - 1].setOutDuration(duration);
		}

	};

	FormatCourse.prototype.elementsComplete = function() {

		var e = this.currentPage.getElements();

		for (var count = 0; count < e.length; count++) {
			this.murjmation.animation.setElementToStartLocation(e[count]);

		}

		//this.murjmation.formatCourse.configureNextPageAnimation();

	};

})(window);

/**
 * @author       Ross Lehr <itsme@rosslehr.com>
 * @copyright    2014 Ross Lehr
 */

/**
 * Controls all loading of the pages
 *
 * @class Group
 */

(function(window) {

	Group = function(murjmation, parentGroup) {
		/**
		 * Reference to the main webmation class
		 * 
		 * @property webmation
		 * @type {Class}
		 */

		this.murjmation = murjmation;

		/**
		 * Reference to this groups parent
		 * 
		 * @property parentGroup
		 * @type {Class}
		 */

		this.parentGroup = parentGroup;

		/**
		 * Holds any subgroups in this group
		 * 
		 * @property groups
		 * @type {Array}
		 */

		this.groups = [];

		/**
		 * Number of the current group
		 * 
		 * @property currentGroupNum
		 * @type {Num}
		 */

		this.currentGroupNum = 0;

		/**
		 * Reference to the current subgroup being viewed
		 * 
		 * @property currentGroup
		 * @type {Class}
		 */

		this.currentGroup = null;

		/**
		 * Reference to the pages loaded into this group
		 * 
		 * @property pages
		 * @type {Class}
		 */

		this.pages = [];

		/**
		 * The name of this group
		 * 
		 * @property name
		 * @type {String}
		 */

		this.name = parentGroup;

		/**
		 * Counts the number of pages that have been loaded
		 * 
		 * @property pageLoadCount
		 * @type {String}
		 */

		this.pageLoadCount = 0;


	};

	/**
	 * setup the course 
	 *
	 * @method init
	 */

	Group.prototype.init = function() {};

	/**
	 * Add a page to this group 
	 *
	 * @method addPage
	 * @param page - the path to the file of the page loaded into this group
	 */

	Group.prototype.addPage = function(page) {

		this.pages.push(new Page(page, this));

	};

	/**
	 * Add a page to this group 
	 *
	 * @method addPage
	 * @param page - the path to the file of the page loaded into this group
	 */

	Group.prototype.loadAllPages = function() {

		this.murjmation.progressbar.show();
		this.murjmation.progressbar.setLable("Loading " + this.getName());
		this.murjmation.progressbar.setValue(0);

		if (this.pageLoadCount < this.totalPages()) {

			this.pages[this.pageLoadCount].loadPage();

			this.pageLoadCount++;

			console.log("page% " + (this.pageLoadCount / this.totalPages()) * 100)
			this.murjmation.progressbar.setValue((this.pageLoadCount / this.totalPages()) * 100);

		} else {

			this.murjmation.loadAllGroupsPages();

		}

	};

	/**
	 * Adds a sub group to this group
	 *
	 * @method addGroup
	 * @param group - The name of the group
	 */

	Group.prototype.addGroup = function(group) {

		this.groups[group] = new Group(this.murjmation, this);

	};

	/**
	 * Go to a subgroup in this group
	 *
	 * @method gotoGroupName
	 * @param groupName - Name of the sub group to go to
	 * @return - returns the class of the group
	 */

	Group.prototype.gotoGroupName = function(groupName) {

		this.currentGroup = this.groups[groupName];

		return this.currentGroup;

	};

	/**
	 * Gets a sub group by it's number.  A groups number is order it was created
	 * The first sub-group created is 1 and so on.
	 *
	 * @method gotoGroupNum
	 * @param num - Number of the group to go to
	 * @return - returns the class of the group
	 */

	Group.prototype.gotoGroupNum = function(num) {
		var count = 0;

		for (var y in this.groups) {
			count++;

			if (count === num) {
				this.currentGroup = this.groups[y];
				this.currentGroupNum = count;
				break;
			}



		}

		return this.currentGroup;
	};

	/**
	 * Returns the current sub group number being viewed
	 *
	 * @method getGroupNum
	 * @retrun the current sub group number being viewed
	 */

	Group.prototype.getGroupNum = function() {

		return this.currentGroupNum;

	};

	/**
	 * Adds a group to the course
	 *
	 * @method getCurrentGroup
	 * @returns The class of the 
	 */

	Group.prototype.getCurrentGroup = function() {

		return this.currentGroup;

	};

	/**
	 * Adds a group to the course
	 *
	 * @method getGroupParent
	 * @param group - The name of the group
	 */

	Group.prototype.getGroupParent = function() {

		return this.parentGroup;

	};

	/**
	 * List groups in the tree
	 *
	 * @method getGroupTree
	 * @param group - The name of the group
	 */

	Group.prototype.getGroupTree = function() {

		var tree = [];

		var cG = this.getGroupParent();

		tree.push(this.getName());

		while (cG != null) {
			tree.push(cG.getName());

			cG = cG.getGroupParent();
		}

		return tree.reverse().join(".");

	};

	/**
	 * Set the name of the group 
	 *
	 * @method setName
	 * @param name - the name of the group
	 */

	Group.prototype.setName = function(name) {

		this.name = name;

	};

	/**
	 * Gets the name of the group 
	 *
	 * @method getName
	 * @return The name of the course
	 */

	Group.prototype.getName = function() {

		return this.name;

	};

	/**
	 * retruns the number of sub-groups in this group 
	 *
	 * @method getGroupLength
	 * @return the number of sub-groups in this group
	 */

	Group.prototype.getGroupLength = function() {

		return Object.keys(this.groups).length;

	};

	/**
	 * Get the number of pages in this group 
	 *
	 * @method totalPages
	 * @retrun the number of pages in this group
	 */

	Group.prototype.totalPages = function() {

		return this.pages.length;

	};

})(window);

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

/**
 * @author       Ross Lehr <itsme@rosslehr.com>
 * @copyright    2014 Ross Lehr
 */

/**
 * Base class for Murjmation
 *
 * @class Murjmation
 */

(function(window) {

    Murjmation = function() {
        /**
         * Holds reference to the Utils class
         * 
         * @property utils
         * @type {Class}
         */

        this.utils = null;

        /**
         * Holds reference to the Preload class
         * 
         * @property preload
         * @type {Class}
         */

        this.preload = null;

        /**
         * Holds reference to the ProgressBar class
         * 
         * @property progressbar
         * @type {Class}
         */

        this.progressbar = null;

        /**
         * Holds reference to the Animation class
         * 
         * @property animation
         * @type {Class}
         */

        this.animation = null;

        /**
         * Holds reference to the History class
         * 
         * @property history
         * @type {Class}
         */

        this.history = null;

        /**
         * Holds the Groups
         * 
         * @property groups
         * @type {Array}
         */

        this.groups = [];

        /**
         * Holds reference to the Animation class
         * 
         * @property lms
         * @type {Class}
         */

        this.formatCourse = null;

        /**
         * Holds reference to the ConfigurePageAnimations class
         * 
         * @property configurePageAnimations
         * @type {Class}
         */

        this.configurePageAnimations = null;

        /**
         * Counts all of the children <DIVS> in the #benchmark <DIV>
         * 
         * @property totalPages
         * @type {Number}
         */

        this.currentPageNum = 0;

        /**
         * Counts all of the children <DIVS> in the #benchmark <DIV>
         * 
         * @property totalPages
         * @type {Number}
         */

        this.totalPages = 0;

        /**
         * Holds reference to the pages to load
         * 
         * @property pagesToLoad
         * @type {Array}
         */

        this.pagesToLoad = [];

        /**
         * Holds Page objects
         * 
         * @property coursePages
         * @type {Array}
         */

        //this.coursePages = [];

        /**
         * Holds the Bool to show the messages in the browser console
         * 
         * @property showMessage
         * @type {Bool}
         */

        this.showMessage = false;

        /**
         * The level of messages to show
         * 
         * @property levelMessage
         * @type {Number}
         */

        this.levelMessage = null;

        /**
         * The total elements of a page
         * 
         * @property totalElements
         * @type {Number}
         */

        this.totalElements = null;

        /**
         * reference to the current page
         * 
         * @property currentElement
         * @type {Number}
         */

        //this.currentElement = 0;

        /**
         * Used to reference the current page when going thru them all
         * 
         * @property currentGroup
         * @type {Number}
         */

        this.currentGroup = null;

        /**
         * Used to reference the current page when going thru them all
         * 
         * @property currentGroup
         * @type {Number}
         */

        this.currentGroupNum = 0;

        /**
         * Used to reference the current page when going thru them all
         * 
         * @property groupLoadCount
         * @type {Number}
         */

        this.groupLoadCount = 0;

        /**
         * Used to reference the current page when going thru them all
         * 
         * @property currentPage
         * @type {Number}
         */

        this.currentPage = 0;

        /**
         * Hodls the #screen to browser window ratio
         * 
         * @property screenRatio
         * @type {Number}
         */

        this.screenRatio = null;

        /**
         * Timer to control the time between element resize
         * this is used so the the pregress bar has a chance to update
         * 
         * @property resizeTimer
         * @type {Number}
         */

        this.resizeTimer = null;

        /**
         * Holds the default in/out duration of the elemts
         * default is 1 second
         * 
         * @property defaultDuration
         * @type {Number}
         */

        this.defaultDuration = 1;

        /**
         * Holds the default ease for the elements
         * the default is "Linear.easeNone"
         * 
         * @property defaultEase
         * @type {String}
         */

        this.defaultEase = "Linear.easeNone";

        /**
         * DESCRIPTION
         * 
         * @property normalLength
         * @type {type}
         */

        this.normalLength = null;

        /**
         * Holds reference to the course "screen"
         * The screen is the window inwhich the course is viewed
         * 
         * @property screen
         * @type {String}
         */

        this.screen = null;

        /**
         * Holds reference to the content benchmark
         * default is "screen"
         * 
         * @property screenBenchmark
         * @type {String}
         */

        this.screenBenchmark = null;

        /**
         * holds reference to the screen parent
         * the default is the browser window
         * 
         * @property screenParent
         * @type {String}
         */

        this.screenParent = null;

        /**
         * Holds the name of the current sound being played
         * 
         * @property currentSound
         * @type {String}
         */

        this.currentSound = null;

        /**
         * holds the direction of the last clicked navigation button
         * default is "forward"
         * 
         * @property navigationDirection
         * @type {string}
         */

        this.navigationDirection = "forward";

        /**
         * Holds the references to the sounds
         * 
         * @property sounds
         * @type {Array}
         */

        this.sounds = [];

        /**
         * Holds the Object that was ckicked to do SOMETHING
         * 
         * @property clickedBy
         * @type {Object}
         */

        this.clickedBy = null;

        /**
         * Holds all the SpriteSheet Classes
         * 
         * @property spriteSheets
         * @type {Array}
         */

        this.spriteSheets = [null];

        //Initialize the course
        this.init();
    };

    /**
     * setup the course 
     *
     * @method init
     */

    Murjmation.prototype.init = function() {

        console.log("murjmation init called!!");
        //create the Utils class
        this.utils = new Utils(this);

        //create the Load class
        //this.load = new Load(this);

        //create the Load class
        //this.preload = new Preload(this);

        //Create the loading bar class
        this.progressbar = new ProgressBar(this);

        //Create the Animaiton class
        this.animation = new Animation(this);

        //Create the LMS class
        this.formatCourse = new FormatCourse(this);

        //Create the history class
        this.history = new History(this);

        //create the configurePageAnimations class
        //this.configurePageAnimations = new ConfigurePageAnimations(this);

        //Set the the screen.  If none is given, then the "sceen" is chosen
        if (this.screen === null) {
            this.screen = $("#screen");
            this.screenBenchmark = $("#screen").children().eq(0);
            this.screenParent = $("#screen").parent();
        }

        //Set the timer action
        var _this = this;

        this.resizeTimer = $.timer(function() {
            _this.checkPageFormatFinished();
        });
        this.resizeTimer.set({
            time: 100,
            autostart: false
        });

        this.normalLength = Math.max($(this.screen).width(), $(this.screen).height());

    };

    /**
     * Adds a group to the course
     *
     * @method addGroup
     * @param groupName - The name of the group
     */

    Murjmation.prototype.addGroup = function(groupName) {

        this.groupName = groupName;

        this.groups.push(new Group(this, groupName));

        this.currentGroup = this.groups[this.groups.length - 1];

    };

    /**
     * Create an array of the pages to load 
     *
     * @method addPage
     * @param pageToLoad - file path to the HTML of the page to load (relative path from the index)
     */

    Murjmation.prototype.addPage = function(pageToLoad) {

        this.currentGroup.addPage(pageToLoad);

    };

    /**
     * Create an array of the pages to load 
     *
     * @method addPage
     * @param pageToLoad - file path to the HTML of the page to load (relative path from the index)
     */

    Murjmation.prototype.addSpriteSheet = function(spriteSheetName, spriteSheetFile) {

        this.spriteSheets[spriteSheetName] = new SpriteSheet(this, spriteSheetFile, spriteSheetName);

    };

    /**
     * Create an array of the pages to load 
     *
     * @method addPage
     * @param pageToLoad - file path to the HTML of the page to load (relative path from the index)
     */

    Murjmation.prototype.addSpriteSheetAnimation = function(spriteSheetName, animationName, spriteSheetFrames, spriteSheetFPS, spriteSheetLoop, spriteSheetEndCallback) {

        this.spriteSheets[spriteSheetName].addAnimation(animationName, spriteSheetFrames, spriteSheetFPS, spriteSheetLoop, spriteSheetEndCallback);

    };

    /**
     * Create an array of the pages to load 
     *
     * @method addPage
     * @param pageToLoad - file path to the HTML of the page to load (relative path from the index)
     */

    Murjmation.prototype.playSpriteSheet = function(elemName, animationName) {

        //Get the DOM path to the element to add the sound too.
        var a = this.getElementOnPage(elemName);

        var sSN = $(a).attr("mm-spriteSheet").split(",");

        this.spriteSheets[sSN[0]].playAnimation(a, animationName);

    };

    /**
     * Create an array of the pages to load 
     *
     * @method countCompletedLoad
     */

    Murjmation.prototype.countCompletedLoad = function() {

        this.currentPage++;

        if (this.currentPage >= this.pagesToLoad.length) {

            this.startCourse();

        }

    };


    /**
     * Begins the loading of the course 
     *
     * @method startCourse
     */

    Murjmation.prototype.startCourse = function() {

        this.utils.showMessage("Starting the course");

        if ($("#benchmark").children().length === 0) {

            this.loadAllGroupsPages();

        } else {

            this.groups = [];

            this.addGroup("singlePageGroup");

            this.currentGroup.addPage("SINGLEPAGE");

            this.formatCoursePages();

        }

    };

    Murjmation.prototype.loadAllGroupsPages = function() {

        if (this.groupLoadCount < this.groups.length) {

            this.groups[this.groupLoadCount].loadAllPages();

            this.groupLoadCount++;

        } else {

            this.progressbar.hide();
            this.formatCoursePages();

        }

    }

    Murjmation.prototype.formatCoursePages = function() {

        this.progressbar.show();

        for (var count = 0; count < this.groups.length; count++) {

            this.progressbar.setValue(0);
            this.progressbar.setLable("Formating: " + this.groups[count].getName());

            for (var countPages = 0; countPages < this.groups[count].totalPages(); countPages++) {

                this.progressbar.setValue(((count + 1) / this.groups.length) * 100);
                this.formatCourse.formatPage(this.groups[count].pages[countPages]);

            }

        }

        this.progressbar.hide();

        $(this.screen).removeClass("mm-hide");

        this.currentGroup = this.groups[0];

        initInteractions();

        this.gotoFirstPage();


    }

    /**
     * Adds the sounds to be used for this course
     *
     * @method listPages
     * @param name - Must be a unique name for the sound
     * @param path - Path to the sound files
     */

    Murjmation.prototype.listPages = function(group) {

        for (var key in group) {

            for (var count = 0; count < p[key].pages.length; count++) {
                console.log("   Pages: " + group[key].pages[count].getName());
            }

            if (p[key].getGroupLength() > 0) {
                var g = p[key].groups;

                for (var subKey in g) {

                    this.listPages(p[key].groups);

                }

            }

        }

    };

    /**
     * Adds the sounds to be used for this course
     *
     * @method addSound
     * @param name - Must be a unique name for the sound
     * @param path - Path to the sound files
     */

    Murjmation.prototype.addSound = function(name, path) {

        this.sounds[name] = new Sound(name, path, this);

    };

    /**
     * Gets the group tree for a group
     * returns the dot (.) format to get to the group ie "Group.subGroup.subGroup"
     *
     * @method getCurrentGroupTree
     */

    Murjmation.prototype.getCurrentGroupTree = function() {

        return this.currentGroup.getGroupTree();

    };

    /**
     * Returns the current groups parent
     *
     * @method getCurrentGroupParent
     */

    Murjmation.prototype.getCurrentGroupParent = function() {

        return this.currentGroup.getGroupParent();

    };

    /**
     * Go to the next page in the course 
     *
     * @method nextPage
     */

    Murjmation.prototype.nextPage = function() {

        var g = (this.currentGroupNum < (this.groups.length - 1));
        var p = ((this.currentPageNum) < this.currentGroup.pages.length);

        if (g || p) {

            this.navigationDirection = "forward";
            this.currentPageNum++;

            //If the current page is the last in a group, then go to the first in the next group
            if (this.currentPageNum > this.currentGroup.pages.length) {

                if (typeof murjmationGroupOut == 'function') {
                    murjmationGroupOut(this.currentGroup);
                }

                this.currentGroup = this.groups[++this.currentGroupNum];
                this.currentPageNum = 1;

                if (typeof murjmationGroupIn == 'function') {
                    murjmationGroupIn(this.currentGroup);
                }

            }

            this.animation.gotoPage();

        }

    };

    /**
     * Go to the previous page in the course 
     *
     * @method prevPage
     */

    Murjmation.prototype.prevPage = function() {

        this.navigationDirection = "backward";



        var g = (this.currentGroupNum != 0);
        var p = ((this.currentPageNum - 1) != 0);

        if (g || p) {

            this.currentPageNum--;

            //If the page is the first in the current group, then go to the last of the previous group
            if (this.currentPageNum === 0) {

                if (typeof murjmationGroupOut == 'function') {
                    murjmationGroupOut(this.currentGroup);
                }

                this.currentGroup = this.groups[--this.currentGroupNum];
                this.currentPageNum = this.currentGroup.totalPages();

                if (typeof murjmationGroupIn == 'function') {
                    murjmationGroupIn(this.currentGroup);
                }

            }

            this.animation.gotoPage();

        }

    };

    /**
     * Got to a perticular page in the course, by it's page number (1 = the first page) 
     *
     * @method gotoPageNumber
     * @param page - page number to go to
     */

    Murjmation.prototype.gotoPageNumber = function(page) {

        if ((count + 1) > this.getCurrentPage()) {

            this.navigationDirection = "forward";

        } else {

            this.navigationDirection = "backward";

        }

        this.currentPageNum = page;

        this.animation.gotoPage();

    };

    /**
     * Get the current page number 
     *
     * @method getCurrentPage
     */

    Murjmation.prototype.getCurrentPage = function() {

        return this.animation.currentPage;

    };

    /**
     * Used to change the defualt duration of the element transitions
     * The default is 1 second
     *
     * @method setDefaultDuration
     * @param duration - The time, in seconds, to make the default duration
     */

    Murjmation.prototype.setDefaultDuration = function(duration) {

        this.defaultDuration = duration;

    };


    /**
     * Get the default transition duration for the elements
     *
     * @method getDefaultDuration
     */

    Murjmation.prototype.getDefaultDuration = function() {

        return this.defaultDuration;

    };

    /**
     * Used to Change the default ease of the transition. 
     * the default is "Linear.easeNone"
     *
     * @method setDefaultEase
     * @param ease The Greensock name of the ease to change the default to
     */

    Murjmation.prototype.setDefaultEase = function(ease) {
        this.defaultEase = ease;
    };


    /**
     * Get the default ease 
     *
     * @method getDefaultEase
     */

    Murjmation.prototype.getDefaultEase = function() {

        return this.defaultEase;

    };

    /**
     * Used to set the screen DIV 
     *
     * @method setScreen
     */

    Murjmation.prototype.setScreen = function(screen) {

        this.screen = screen;

        //Set the benchmark DIV
        this.screenBenchmark = $(this.screen).children().eq(0);

        //Set the screen parent
        this.screenParent = $(this.screen).parent();

    };


    /**
     * Get the name of the screen DIV 
     *
     * @method getScreen
     */

    Murjmation.prototype.getScreen = function() {

        return this.screen;

    };

    /**
     * Get the name of the screen DIV 
     *
     * @method getScreen
     */

    Murjmation.prototype.messagesOn = function(level) {

        this.showMessage = true;

        this.levelMessage = level;

    };



})(window);
/**
 * @author       Ross Lehr <itsme@rosslehr.com>
 * @copyright    2014 Ross Lehr
 */

/**
 * Holds all information for a page
 *
 * @class Page
 */

(function(window) {

	Page = function(pageToLoad, group) {

		/**
		 * Reference to the main Murjmation class
		 * 
		 * @property Murjmation
		 * @type {Class}
		 */

		this.murjmation = group.murjmation;

		/**
		 * Reference to the main Murjmation class
		 * 
		 * @property Murjmation
		 * @type {Class}
		 */

		this.pageToLoad = pageToLoad;

		/**
		 * Holds the content of the page
		 * 
		 * @property orgContent
		 * @type {string}
		 */

		this.orgContent = null;

		/**
		 * Holds the content as it should be at the start of the page
		 * 
		 * @property startContent
		 * @type {string}
		 */

		this.startContent = null;

		/**
		 * Holds the javascript code of the page
		 * 
		 * @property code
		 * @type {string}
		 */

		this.code = null;

		/**
		 * Holds the css of the page
		 * 
		 * @property css
		 * @type {string}
		 */

		this.css = null;

		/**
		 * name of the page
		 * this comes from the <div> ID with the class of "page"
		 * 
		 * @property name
		 * @type {string}
		 */

		this.name = null;

		/**
		 * Reference to the element in the DOM
		 * this is the page ID with a "#" appended to it (I may not need this)
		 * 
		 * @property dom
		 * @type {DOM element}
		 */

		this.dom = null;

		/**
		 * The amount of time it takes to get to this page
		 * 
		 * @property duration
		 * @type {Array}
		 */

		this.duration = null;

		/**
		 * DESCRIPTION
		 * 
		 * @property visibleLocation
		 * @type {type}
		 */

		this.visibleLocation = null;

		/**
		 * Holds the reference to the callback that get's called when the page is finished entering the #screen area 
		 * 
		 * @property pageInCall
		 * @type {String}
		 */

		this.pageInCall = null;

		/**
		 * Holds the reference to the callback that get's called when the page is finished entering the #screen area 
		 * 
		 * @property pageOutcall
		 * @type {String}
		 */

		this.pageOutcall = null;

		/**
		 * Holds the reference to the callback that get's called before the page leaves the #screen area 
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.elements = [];

		/**
		 * The total number of elements that get animated IN on the page
		 * 
		 * @property inElementsCount
		 * @type {Number}
		 */

		this.inElementsCount = 0;

		/**
		 * The total number of elements that get animated OUT on the page
		 * 
		 * @property outElementsCount
		 * @type {Number}
		 */

		this.outElementsCount = 0;

		/**
		 * Should the pages elements get reset after the page leaves the #screen area
		 * 
		 * @default true
		 * @property elementReset
		 * @type {bool}
		 */

		this.elementReset = true;

		/**
		 * Sets the Bool to tell if the page moves on to the next one after ALL elements have run there IN and OUT transitions
		 * 
		 * @property continueOn
		 * @type {Bool}
		 */

		this.continueOn = false;

		/**
		 * Holds the reference to the sound that gets played when the page enters the #screen area
		 * 
		 * @property inSound
		 * @type {String}
		 */

		this.inSound = null;

		/**
		 * Holds the reference to the sound that gets played when the page leaves the #screen area
		 * 
		 * @property outSound
		 * @type {type}
		 */

		this.outSound = null;

		/**
		 * The JS function that gets called when the inSound is finished playing
		 * 
		 * @property inSoundCallback
		 * @type {String}
		 */

		this.inSoundCallback = null;

		/**
		 * The JS function that gets called when the outSound is finished playing
		 * 
		 * @property outSoundCallback
		 * @type {String}
		 */

		this.outSoundCallback = null;

		/**
		 * The physical path to the file that holds this page
		 * 
		 * @property pagePath
		 * @type {String}
		 */

		this.pagePath = null;

		/**
		 * This pages number as it falls in the course structure (First page = 1... ... 10th page = 10)
		 * 
		 * @property pageNumber
		 * @type {Number}
		 */

		this.pageNumber = null;

		/**
		 * This group this page is apart of
		 * 
		 * @property group
		 * @type {Class}
		 */

		this.group = group;

		this.murjmation.utils.showMessage(" ", 1);
		this.murjmation.utils.showMessage("  ", 1);
		this.murjmation.utils.showMessage("New Page was created", 1);

		if (this.pageToLoad === "SINGLEPAGE") {

			this.loadSinglePage();

		}

		//this.init();

	};

	/**
	 * Called to initialize this class 
	 *
	 * @method init
	 */

	Page.prototype.init = function() {};

	/**
	 * Load this page into the main course
	 *
	 * @method loadPage
	 */

	Page.prototype.loadPage = function() {

		var _this = this;

		$.get(this.pageToLoad, function(data) {

				var posts = $(data).filter('DIV').find("#" + $(_this.murjmation.screenBenchmark).attr("id")).html();

			console.log("pageName from Page.js: " + $(data).filter('.page').attr("id"));
			
				_this.setName($(data).filter('DIV').find("#" + $(_this.murjmation.screenBenchmark).attr("id")).children().attr("id"));

				$("#benchmark").append(posts);

			}).done(function() {

				_this.group.loadAllPages();

			})
			.fail(function() {

				console.log("error loading " + _this.pageToLoad);

			});

	}

	/**
	 * get the content from the content var
	 *
	 * @method getContent
	 * @return The content of the page
	 */

	Page.prototype.loadSinglePage = function() {

		var singlePage = $("#benchmark").children();

		console.log("singlePage name: " + $(singlePage).attr("id"));
		this.setName($(singlePage).attr("id"));

	}

	/**
	 * Add the content to the content var
	 *
	 * @method setContent
	 * @param content - holds the content of the page
	 */
	/*
  Page.prototype.setOrgContent =  function (content) 
  {

    this.orgContent = content;

  };
	*/

	/**
	 * get the content from the content var
	 *
	 * @method getContent
	 * @return The content of the page
	 */

	Page.prototype.getOrgContent = function() {

		return this.orgContent;

	};

	/**
	 * Add the code to the code var
	 *
	 * @method setCode
	 * @param code - the javascript code for the page
	 */

	Page.prototype.setCode = function(code) {
		this.code = code;
	};

	/**
	 * get the code from the code var
	 *
	 * @method getCode
	 * @return the javascript for the page
	 */

	Page.prototype.getCode = function() {
		return this.code;
	};

	/**
	 * Add the css to the css var
	 *
	 * @method setCss
	 * @param css - the CSS style tags for the page
	 */

	Page.prototype.setCss = function(css) {
		this.css = css;
	};

	/**
	 * get the css from the css var
	 *
	 * @method getCss
	 * @return the css for the page
	 */

	Page.prototype.getCss = function() {
		return this.css;
	};

	/**
	 * Set the name of the page
	 *
	 * @method setName
	 * @param name - the ID of the <div> with the class name "Page"
	 */

	Page.prototype.setName = function(name) {
		this.name = name;
	};

	/**
	 * get the name of the page
	 *
	 * @method getName
	 * @return the name of the page
	 */

	Page.prototype.getName = function() {
		return this.name;
	};

	/**
	 * Set the count of this page
	 *
	 * @method setCount
	 * @param - the count of the page
	 */

	Page.prototype.setCount = function(count) {
		this.count = count;

		this.murjmation.utils.showMessage("   The count of this page is set to " + this.getCount(), 2);

	};

	/**
	 * get the page number
	 *
	 * @method getCount
	 * @return the number of the page
	 */

	Page.prototype.getCount = function() {

		return this.count;

	};

	//MIGHT BE ABLE TO REMOVE setDom and getDom
	/**
	 * The page name plus "#" ("#pageName")
	 *
	 * @method setDom
	 * @param dom - dom ID of the page
	 */

	Page.prototype.setDom = function(dom) {
		this.dom = "#" + this.getName();
	};

	/**
	 * get the dom ID of the page
	 *
	 * @method getDom
	 * @return the DOM id of the page
	 */

	Page.prototype.getDom = function() {
		return "#" + this.getName();;
	};

	/**
	 * Set the information needed for tweenmax to move this page into it's visable location
	 *
	 * @method setVisibleLocation
	 * @param visibleLocation - the "top" and "left" posistions of the page
	 */

	Page.prototype.setVisibleLocation = function(visibleLocation) {

		this.visibleLocation = visibleLocation;

		this.murjmation.utils.showMessage("     Visible location: " + JSON.stringify(this.getVisibleLocation()), 2);
	};

	/**
	 * return the information needed to tween this page to it's visible location
	 *
	 * @method getVisibleLocation
	 * @return the visible location of the page
	 */

	Page.prototype.getVisibleLocation = function() {

		return this.murjmation.utils.convertToTweenObject(this.visibleLocation);

	};

	/**
	 * Set the duration of the time it takes for this page to enter the visible area of the @screen 
	 *
	 * @method setDuration
	 * @param duration - the duration (in seconds) 
	 */

	Page.prototype.setDuration = function(duration) {

		this.duration = duration;

		this.murjmation.utils.showMessage("     Duration: " + this.getDuration(), 2);
	};

	/**
	 * Retruns the suration it takes the page to get to it's visible location 
	 *
	 * @method getDuration
	 * @return the duration
	 */

	Page.prototype.getDuration = function() {
		return this.duration;
	};

	/**
	 * The javascript function that get's called when the page finishes entering the screen 
	 *
	 * @method setPageInCallback
	 * @param pageincall - the function to call
	 */

	Page.prototype.setPageInCallback = function(pageincall) {
		this.pageInCall = pageincall;

		this.murjmation.utils.showMessage("     Page in Callback: " + this.getPageInCallback(), 2);
	};

	/**
	 * Returns the javascript function that gets called when the page finishes entering the screen area 
	 *
	 * @method getPageInCallback
	 * @return the function name
	 */

	Page.prototype.getPageInCallback = function() {
		return this.pageInCall;
	};

	/**
	 * The javascript function that get's called before the page leaves the screen 
	 *
	 * @method setPageOutCallback
	 * @param pageOutcall - the function to call
	 */

	Page.prototype.setPageOutCallback = function(pageOutcall) {
		this.pageOutcall = pageOutcall;

		this.murjmation.utils.showMessage("     Page in Callback: " + this.getPageInCallback(), 2);
	};

	/**
	 * Returns the javascript function that gets called before the page leaves the screen area 
	 *
	 * @method getPageOutCallback
	 * @return the function name
	 */

	Page.prototype.getPageOutCallback = function() {
		return this.pageOutcall;
	};

	/**
	 * Creates a new element object for this page
	 *
	 * @method createElement
	 */

	Page.prototype.createElement = function() {
		this.elements.push(new PageElement(this));
	};

	/**
	 * Gets the elements for this page 
	 *
	 * @method getElements
	 * @return the array of elements for this page
	 */

	Page.prototype.getElements = function() {
		return this.elements;
	};

	/**
	 * Add one to the number of elements to be transitioned IN 
	 *
	 * @method addInElementsCount
	 */

	Page.prototype.addInElementsCount = function() {
		this.inElementsCount++;
	};

	/**
	 * Get the total number of elements to be transitioned IN 
	 *
	 * @method getInElementsCount
	 * @return Total number of IN elements
	 */

	Page.prototype.getInElementsCount = function() {
		return this.inElementsCount;
	};

	/**
	 * Add one to the number of elements to be transitioned OUT 
	 *
	 * @method addOutElementsCount
	 */

	Page.prototype.addOutElementsCount = function() {
		this.outElementsCount++;
	};

	/**
	 * Get the total number of elements to be transitioned OUT 
	 *
	 * @method getOutElementsCount
	 * @return Total number of OUT elements
	 */

	Page.prototype.getOutElementsCount = function() {
		return this.outElementsCount;
	};

	/**
	 * Set the bool to false 
	 *
	 * @method setElementReset
	 */

	Page.prototype.setElementReset = function() {
		this.elementReset = false;
	};

	/**
	 * get weather or not the elements on the page should be reset when it leaves the screen area 
	 *
	 * @method getElementReset
	 * @return the bool
	 */

	Page.prototype.getElementReset = function() {
		return this.elementReset;
	};

	/**
	 * Set the bool to true if the page should continue on after all IN and OUT transition play 
	 *
	 * @method setContinueOn
	 */

	Page.prototype.setContinueOn = function() {
		this.continueOn = true;
	};

	/**
	 * Return the continueOn bool 
	 *
	 * @method getContinueOn
	 * @return The bool
	 */

	Page.prototype.getContinueOn = function() {
		return this.continueOn;
	};

	/**
	 * Set the name of the sound to be played when the sound enter the screen 
	 *
	 * @method setInSound
	 * @param inSound - the name of the sound 
	 */

	Page.prototype.setInSound = function(inSound) {
		this.inSound = inSound;
	};

	/**
	 * Gets the name of the sound to play 
	 *
	 * @method getInSound
	 * @return the name of the sound
	 */

	Page.prototype.getInSound = function() {
		return this.inSound;
	};

	/**
	 * Set the javascript function to be called when the inSound is finished playing 
	 *
	 * @method setInSoundCallback
	 * @param inSoundCallback - the name of the sound 
	 */

	Page.prototype.setInSoundCallback = function(inSoundCallback) {
		this.inSoundCallback = inSoundCallback;
	};

	/**
	 * Gets the javascript function to be called when the inSound is finished playing 
	 *
	 * @method getInSoundCallback
	 * @return the name of the callback
	 */

	Page.prototype.getInSoundCallback = function() {
		return this.inSoundCallback;
	};

	/**
	 * Set the outsound to be played before the page leaves the screen area 
	 *
	 * @method setOutSound
	 * @param outSound - the name of the sound 
	 */

	Page.prototype.setOutSound = function(outSound) {
		this.outSound = outSound;
	};

	/**
	 * Get the name of the sound to be played before the page leaves the screen area 
	 *
	 * @method getOutSound
	 * @return the name of the sound
	 */

	Page.prototype.getOutSound = function() {
		return this.outSound;
	};

	/**
	 * Set the javascript function to be called when the outSound is finished playing 
	 *
	 * @method setOutSoundCallback
	 * @param outSoundCallback - the name of the sound 
	 */

	Page.prototype.setOutSoundCallback = function(outSoundCallback) {
		this.outSoundCallback = outSoundCallback;
	};

	/**
	 * Get the name of the sound to be played before the page leaves the screen area 
	 *
	 * @method getOutSoundCallback
	 * @return the name of the sound
	 */

	Page.prototype.getOutSoundCallback = function() {
		return this.outSoundCallback;
	};

	/**
	 * Sets the physical path to the file contaning this pages content 
	 *
	 * @method setPagePath
	 * @param pagePath - the path to the file
	 */

	Page.prototype.setPagePath = function(pagePath) {
		this.pagePath = pagePath;
	};

	/**
	 * gets the path to the physical file for the content to this page 
	 *
	 * @method getPagePath
	 * @return the physical path to the page
	 */

	Page.prototype.getPagePath = function() {
		return this.pagePath;
	};

	/**
	 * gets the group this page belongs to 
	 *
	 * @method getPagePath
	 * @return the group this page belongs to
	 */

	Page.prototype.getGroup = function() {
		return this.group;
	};

})(window);

/**
 * @author       Ross Lehr <itsme@rosslehr.com>
 * @copyright    2014 Ross Lehr
 */

/**
 * Controls the elements on the page
 *
 * @class PageElement
 */

(function(window) {

	PageElement = function(page) {

		/**
		 * Reference to this elements page class
		 * 
		 * @property page
		 * @type {Class}
		 */

		this.page = page;

		/**
		 * This elements original position
		 * 
		 * @property orgPosition
		 * @type {String}
		 */

		this.orgPosition = null;

		/**
		 * This is the animation information needed for positioning the element in it's start location
		 * 
		 * @property inStartPosition
		 * @type {String}
		 */

		this.inStartPosition = null;

		/**
		 * This is the animation information needed to move the element INTO the visible part of the  page
		 * 
		 * @property inStopPosition
		 * @type {String}
		 */

		this.inStopPosition = null;

		/**
		 * This is the animation information needed to move the element OUT of the visible part of the  page
		 * 
		 * @property outStartPosition
		 * @type {String}
		 */

		this.outStartPosition = null;

		/**
		 * This is the animation information needed to move the element OUT of the visible part of the  page
		 * 
		 * @property outStopPosition
		 * @type {String}
		 */

		this.outStopPosition = null;

		/**
		 * This is the element div ID
		 * 
		 * @property name
		 * @type {String}
		 */

		this.name = name;

		/**
		 * DESCRIPTION
		 * 
		 * @property count
		 * @type {Number}
		 */

		this.count = null;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.inStartMurjmationDiv = null;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.inStopMurjmationDiv = null;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.outStartMurjmationDiv = null;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.outStopMurjmationDiv = null;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.inDuration = null;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.outDuration = null;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.animateOnPageIn = false;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.animateOnPageOut = false;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.inCallback = null;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.outCallback = null;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.durationConfig = false;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.inTimeScale = 1;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.outTimeScale = 1;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.isIn = true;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.animateOnInComplete = null;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.animateOnOutComplete = null;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.inFinishedSound = null;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.inFinishedSoundCallback = null;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.inFinishedSoundAnimate = null;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.inStartSound = null;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.inStartSoundCallback = null;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.inStartSoundAnimate = null;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.outFinishedSound = null;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.outFinishedSoundCallback = null;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.outFinishedSoundAnimate = null;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.outStartSound = null;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.outStartSoundCallback = null;

		/**
		 * DESCRIPTION
		 * 
		 * @property propName
		 * @type {type}
		 */

		this.outStartSoundAnimate = null;
	};

	/**
	 * setup the course 
	 *
	 * @method init
	 */

	PageElement.prototype.init = function() {};

	/**
	 * Set the name of the page
	 *
	 * @method setOrgPosition
	 */

	PageElement.prototype.setOrgPosition = function(orgPosition) {

		this.orgPosition = orgPosition;

		this.page.murjmation.utils.showMessage("     Original Pos: " + JSON.stringify(this.getOrgPosition()), 2);

	};

	/**
	 * get the name of the page
	 *
	 * @method getOrgPosition
	 */

	PageElement.prototype.getOrgPosition = function() {

		return this.page.murjmation.utils.convertToTweenObject(this.orgPosition);

	};

	/**
	 * Set the name of the page
	 *
	 * @method setOutStopPosition
	 */

	PageElement.prototype.setOutStopPosition = function(outStopPosition) {
		this.outStopPosition = outStopPosition;

		this.page.murjmation.utils.showMessage("     Out stop Pos: " + JSON.stringify(this.getOutStopPosition()), 2);

	};

	/**
	 * get the name of the page
	 *
	 * @method getOutStopPosition
	 */

	PageElement.prototype.getOutStopPosition = function() {

		return this.page.murjmation.utils.convertToTweenObject(this.outStopPosition);

	};

	/**
	 * Set the name of the page
	 *
	 * @method setOutStart
	 */

	PageElement.prototype.setOutStartPosition = function(outStartPosition) {

		this.outStartPosition = outStartPosition;

		this.page.murjmation.utils.showMessage("     Out start Pos: " + JSON.stringify(this.getOutStartPosition()), 2);

	};

	/**
	 * get the name of the page
	 *
	 * @method getOutStart
	 */

	PageElement.prototype.getOutStartPosition = function() {

		return this.page.murjmation.utils.convertToTweenObject(this.outStartPosition);

	};

	/**
	 * Set the name of the page
	 *
	 * @method setInStopPosition
	 */

	PageElement.prototype.setInStopPosition = function(inStopPosition) {
		this.inStopPosition = inStopPosition;

		this.page.murjmation.utils.showMessage("     In stop Pos: " + JSON.stringify(this.getInStopPosition()), 2);

	};

	/**
	 * get the name of the page
	 *
	 * @method getInStopPosition
	 */

	PageElement.prototype.getInStopPosition = function() {

		return this.page.murjmation.utils.convertToTweenObject(this.inStopPosition);

	};

	/**
	 * Set the name of the page
	 *
	 * @method setInStartPosition
	 */

	PageElement.prototype.setInStartPosition = function(inStartPosition) {
		this.inStartPosition = inStartPosition;

		this.page.murjmation.utils.showMessage("     In start Pos: " + JSON.stringify(this.getInStartPosition()), 2);

	};

	/**
	 * get the name of the page
	 *
	 * @method getInStartPosition
	 */

	PageElement.prototype.getInStartPosition = function() {

		return this.page.murjmation.utils.convertToTweenObject(this.inStartPosition);

	};

	/**
	 * Set the name of the page
	 *
	 * @method setInStartPosition
	 */

	PageElement.prototype.setInStartMurjmationDiv = function(inStartMurjmationDiv) {
		this.inStartMurjmationDiv = inStartMurjmationDiv;

		this.page.murjmation.utils.showMessage("     InStartMurjmationDiv: " + JSON.stringify(this.getInStartMurjmationDiv()), 2);

	};

	/**
	 * get the name of the page
	 *
	 * @method getInStartPosition
	 */

	PageElement.prototype.getInStartMurjmationDiv = function() {

		return this.page.murjmation.utils.convertToTweenObject(this.inStartMurjmationDiv);

	};

	/**
	 * Set the name of the page
	 *
	 * @method setInStartPosition
	 */

	PageElement.prototype.setInStopMurjmationDiv = function(inStopMurjmationDiv) {
		this.inStopMurjmationDiv = inStopMurjmationDiv;

		this.page.murjmation.utils.showMessage("     inStopMurjmationDiv: " + JSON.stringify(this.getInStopMurjmationDiv()), 2);

	};

	/**
	 * get the name of the page
	 *
	 * @method getInStartPosition
	 */

	PageElement.prototype.getInStopMurjmationDiv = function() {

		return this.page.murjmation.utils.convertToTweenObject(this.inStopMurjmationDiv);

	};

	/**
	 * Set the name of the page
	 *
	 * @method setInStartPosition
	 */

	PageElement.prototype.setOutStartMurjmationDiv = function(outStartMurjmationDiv) {

		this.outStartMurjmationDiv = outStartMurjmationDiv;

		this.page.murjmation.utils.showMessage("     outStartMurjmationDiv: " + JSON.stringify(this.getOutStartMurjmationDiv()), 2);

	};

	/**
	 * get the name of the page
	 *
	 * @method getInStartPosition
	 */

	PageElement.prototype.getOutStartMurjmationDiv = function() {

		return this.page.murjmation.utils.convertToTweenObject(this.outStartMurjmationDiv);

	};

	/**
	 * Set the name of the page
	 *
	 * @method setInStartPosition
	 */

	PageElement.prototype.setOutStopMurjmationDiv = function(outStopMurjmationDiv) {

		this.outStopMurjmationDiv = outStopMurjmationDiv;

		this.page.murjmation.utils.showMessage("     outStopMurjmationDiv: " + JSON.stringify(this.getOutStopMurjmationDiv()), 2);

	};

	/**
	 * get the name of the page
	 *
	 * @method getInStartPosition
	 */

	PageElement.prototype.getOutStopMurjmationDiv = function() {

		return this.page.murjmation.utils.convertToTweenObject(this.outStopMurjmationDiv);

	};

	/**
	 * Set the name of the page
	 *
	 * @method setName
	 */

	PageElement.prototype.setName = function(inStartPosition) {
		this.name = inStartPosition;

		this.page.murjmation.utils.showMessage("   The name of this element is set to " + this.getName(), 2);

	};

	/**
	 * get the name of the page
	 *
	 * @method getName
	 */

	PageElement.prototype.getName = function() {

		return this.name;

	};

	/**
	 * Set the name of the page
	 *
	 * @method setName
	 */

	PageElement.prototype.setCount = function(count) {
		this.count = count;

		this.page.murjmation.utils.showMessage(" ", 2);
		this.page.murjmation.utils.showMessage("   The count of this element is set to " + this.getCount(), 2);

	};

	/**
	 * get the name of the page
	 *
	 * @method getName
	 */

	PageElement.prototype.getCount = function() {

		return this.count;

	};

	/**
	 * Set the name of the page
	 *
	 * @method setName
	 */

	PageElement.prototype.setDom = function(dom) {

		this.dom = dom;

		this.page.murjmation.utils.showMessage("     THe element path is: " + this.getDom(), 2);

	};

	/**
	 * get the name of the page
	 *
	 * @method getName
	 */

	PageElement.prototype.getDom = function() {

		return this.dom;

	};

	/**
	 * Set the name of the page
	 *
	 * @method setName
	 */

	PageElement.prototype.setInDuration = function(duration) {

		this.inDuration = duration;

		this.page.murjmation.utils.showMessage("     In duration: " + this.getInDuration(), 2);

	};

	/**
	 * get the name of the page
	 *
	 * @method getName
	 */

	PageElement.prototype.getInDuration = function() {

		return this.inDuration;

	};

	/**
	 * Set the name of the page
	 *
	 * @method setName
	 */

	PageElement.prototype.setOutDuration = function(duration) {

		this.outDuration = duration;

		this.page.murjmation.utils.showMessage("     Out duration: " + this.getOutDuration(), 2);

	};

	/**
	 * get the name of the page
	 *
	 * @method getName
	 */

	PageElement.prototype.getOutDuration = function() {

		return this.outDuration;

	};

	/**
	 * Set the name of the page
	 *
	 * @method setName
	 */

	PageElement.prototype.setAnimateOnPageIn = function() {

		this.animateOnPageIn = true;

	};

	/**
	 * get the name of the page
	 *
	 * @method getName
	 */

	PageElement.prototype.getAnimateOnPageIn = function() {

		return this.animateOnPageIn;

	};

	/**
	 * Set the name of the page
	 *
	 * @method setName
	 */

	PageElement.prototype.setAnimateOnPageOut = function() {

		this.animateOnPageOut = true;

	};

	/**
	 * get the name of the page
	 *
	 * @method getName
	 */

	PageElement.prototype.getAnimateOnPageOut = function() {

		return this.animateOnPageOut;

	};

	/**
	 * Set the name of the page
	 *
	 * @method setName
	 */

	PageElement.prototype.setInCallback = function(callback) {

		this.inCallback = callback;

	};

	/**
	 * get the name of the page
	 *
	 * @method getName
	 */

	PageElement.prototype.getInCallback = function() {

		return this.inCallback;

	};

	/**
	 * Set the name of the page
	 *
	 * @method setName
	 */

	PageElement.prototype.setOutCallback = function(callback) {

		this.outCallback = callback;

	};

	/**
	 * get the name of the page
	 *
	 * @method getName
	 */

	PageElement.prototype.getOutCallback = function() {

		return this.outCallback;

	};

	/**
	 * Set the name of the page
	 *
	 * @method setName
	 */

	PageElement.prototype.setInTimeScale = function(timeScale) {

		this.inTimeScale = timeScale;

	};

	/**
	 * get the name of the page
	 *
	 * @method getName
	 */

	PageElement.prototype.getInTimeScale = function() {

		return this.inTimeScale;

	};

	/**
	 * Set the name of the page
	 *
	 * @method setName
	 */

	PageElement.prototype.setOutTimeScale = function(timeScale) {

		this.outTimeScale = timeScale;

	};

	/**
	 * get the name of the page
	 *
	 * @method getName
	 */

	PageElement.prototype.getOutTimeScale = function() {

		return this.outTimeScale;

	};

	/**
	 * Set the name of the page
	 *
	 * @method setIsIn
	 */

	PageElement.prototype.setIsIn = function(isIn) {

		this.isIn = isIn;

	};

	/**
	 * get the name of the page
	 *
	 * @method getIsIn
	 */

	PageElement.prototype.getIsIn = function() {

		return this.isIn;

	};


	/**
	 * Set the name of the page
	 *
	 * @method setAnimateOnInComplete
	 */

	PageElement.prototype.setAnimateOnInComplete = function(animateOnInComplete) {

		this.animateOnInComplete = animateOnInComplete;

	};

	/**
	 * get the name of the page
	 *
	 * @method getAnimateOnInComplete
	 */

	PageElement.prototype.getAnimateOnInComplete = function() {

		return this.animateOnInComplete;

	};

	/**
	 * Set the name of the page
	 *
	 * @method setAnimateOnOutComplete
	 */

	PageElement.prototype.setAnimateOnOutComplete = function(animateOnOutComplete) {

		this.animateOnOutComplete = animateOnOutComplete;

	};

	/**
	 * get the name of the page
	 *
	 * @method getAnimateOnOutComplete
	 */

	PageElement.prototype.getAnimateOnOutComplete = function() {

		return this.animateOnOutComplete;

	};

	/**
	 * Set the name of the page
	 *
	 * @method setInFinishedSound
	 */

	PageElement.prototype.setInFinishedSound = function(inFinishedSound) {

		this.inFinishedSound = inFinishedSound;

		this.page.murjmation.utils.showMessage("     In Finished Sound: " + this.getInFinishedSound(), 2);

	};

	/**
	 * get the name of the page
	 *
	 * @method getInFinishedSound
	 */

	PageElement.prototype.getInFinishedSound = function() {

		return this.inFinishedSound;

	};

	/**
	 * Set the name of the page
	 *
	 * @method setInFinishedSoundCallback
	 */

	PageElement.prototype.setInFinishedSoundCallback = function(inFinishedSoundCallback) {

		this.inFinishedSoundCallback = inFinishedSoundCallback;

		this.page.murjmation.utils.showMessage("     In Finished Sound Callback: " + this.getInFinishedSoundCallback(), 2);

	};

	/**
	 * Set the name of the page
	 *
	 * @method getInFinishedSoundCallback
	 */

	PageElement.prototype.getInFinishedSoundCallback = function() {

		return this.inFinishedSoundCallback;

	};

	/**
	 * Set the name of the page
	 *
	 * @method setInStartSound
	 */

	PageElement.prototype.setInStartSound = function(inStartSound) {

		this.inStartSound = inStartSound;

		this.page.murjmation.utils.showMessage("     In Start Sound: " + this.getInStartSound(), 2);

	};

	/**
	 * get the name of the page
	 *
	 * @method getInStartSound
	 */

	PageElement.prototype.getInStartSound = function() {

		return this.inStartSound;

	};

	/**
	 * Set the name of the page
	 *
	 * @method setInStartSoundCallback
	 */

	PageElement.prototype.setInStartSoundCallback = function(inStartSoundCallback) {

		this.inStartSoundCallback = inStartSoundCallback;

		this.page.murjmation.utils.showMessage("     In Start Sound Callback: " + this.getInStartSoundCallback(), 2);

	};

	/**
	 * Set the name of the page
	 *
	 * @method getInStartSoundCallback
	 */

	PageElement.prototype.getInStartSoundCallback = function() {

		return this.inStartSoundCallback;

	};

	/**
	 * Set the name of the page
	 *
	 * @method setOutFinishedSound
	 */

	PageElement.prototype.setOutFinishedSound = function(outFinishedSound) {

		this.outFinishedSound = outFinishedSound;

		this.page.murjmation.utils.showMessage("     Out Finished Sound: " + this.getOutFinishedSound(), 2);

	};

	/**
	 * get the name of the page
	 *
	 * @method getOutFinishedSound
	 */

	PageElement.prototype.getOutFinishedSound = function() {

		return this.outFinishedSound;

	};

	/**
	 * Set the name of the page
	 *
	 * @method setOutFinishedSoundCallback
	 */

	PageElement.prototype.setOutFinishedSoundCallback = function(outFinishedSoundCallback) {

		this.outFinishedSoundCallback = outFinishedSoundCallback;

		this.page.murjmation.utils.showMessage("     Out Finished Sound Callback: " + this.getOutFinishedSoundCallback(), 2);

	};

	/**
	 * Set the name of the page
	 *
	 * @method getOutFinishedSoundCallback
	 */

	PageElement.prototype.getOutFinishedSoundCallback = function() {

		return this.outFinishedSoundCallback;

	};

	/**
	 * Set the name of the page
	 *
	 * @method setOutStartSound
	 */

	PageElement.prototype.setOutStartSound = function(outStartSound) {

		this.outStartSound = outStartSound;

		this.page.murjmation.utils.showMessage("     Out Start Sound: " + this.getOutStartSound(), 2);

	};

	/**
	 * get the name of the page
	 *
	 * @method getOutStartSound
	 */

	PageElement.prototype.getOutStartSound = function() {

		return this.outStartSound;

	};

	/**
	 * Set the name of the page
	 *
	 * @method setOutStartSoundCallback
	 */

	PageElement.prototype.setOutStartSoundCallback = function(outStartSoundCallback) {

		this.outStartSoundCallback = outStartSoundCallback;

		this.page.murjmation.utils.showMessage("     Out Sound Callback: " + this.getOutStartSoundCallback(), 2);

	};

	/**
	 * Set the name of the page
	 *
	 * @method getOutStartSoundCallback
	 */

	PageElement.prototype.getOutStartSoundCallback = function() {

		return this.outStartSoundCallback;

	};

})(window);

/*********************
 * 
 * Preload assets for the site
 *
 **********************/

//Create the queue
var mmpl = new createjs.LoadQueue(true);

var assetCount = 0;

//Set up queue handelers
mmpl.on("fileload", fileCompletlyLoaded, this);
mmpl.on("complete", queueComplete, this);
mmpl.on("progress", queueProgress, this);
mmpl.on("fileprogress", fileProgress, this);

//This is called after a preloaded item is finished loading
//This menipulates the loading bar

function fileProgress(x) {

	//console.log("handleFileProgress loaded: " + x.loaded);
	//console.log("handleFileProgress progress: " + x.progress);
	//console.log("handleFileProgress total: " + x.total);

}

function fileCompletlyLoaded(x) {

	//console.log("fileCompletlyLoaded");

}

function queueProgress(x) {

	//console.log("---handleQueueProgress loaded: " + (x.loaded*100));
	murjmation.progressbar.setValue((x.loaded * 100));

}

function queueComplete(x) {

	//console.log("Preload completed");
	murjmation.progressbar.hide();
	murjmation.startCourse();

}

/**
 * @author       Ross Lehr <itsme@rosslehr.com>
 * @copyright    2014 Ross Lehr
 */

/**
 * Preload all assets
 *
 * @class ProgressBar
 */

(function(window) {

	ProgressBar = function(murjmation) {
		/**
		 * Reference to the main Murjmation class
		 * 
		 * @property Murjmation
		 * @type {Class}
		 */

		this.murjmation = murjmation;

		/**
		 * The lable for the progress bar
		 * 
		 * @property loadLable
		 * @type {Class}
		 */

		this.loadLable = null;

		this.init();

	};

	/**
	 * setup the course 
	 *
	 * @method init
	 */

	ProgressBar.prototype.init = function() {

		var _this = this;

		$("#progressBar").progressbar({
			value: false,
			change: function() {
				_this.setLable($("#progressBar").progressbar("value") + "% " + _this.loadLable);
			},
			complete: function() {
				_this.setLable("Complete!");
			}
		});

	};

	/**
	 * Hide the progress bar 
	 *
	 * @method hide
	 */

	ProgressBar.prototype.hide = function() {
		$("#progressBar").addClass("mm-hide");
	};

	/**
	 * Hide the progress bar 
	 *
	 * @method hide
	 */

	ProgressBar.prototype.show = function() {
		$("#progressBar").removeClass("mm-hide");
	};

	/**
	 * Set the bar lable
	 *
	 * @method setLable
	 */

	ProgressBar.prototype.setLable = function(label) {
		$("#progressLabel").text(label);
	};

	/**
	 * Set the bar lable
	 *
	 * @method setValue
	 */

	ProgressBar.prototype.setValue = function(value, lL) {

		this.loadLable = lL;

		$("#progressBar").progressbar("value", value);

	};

})(window);

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

/**
 * Add a javascript callback when a sound starts to play
 *
 * Sample page: XXXXX.html
 *
 * @method MM_addDelay
 */

FormatCourse.prototype.addDelay = function(t) {

	//if there is a callback add it to the object
	var attrout = $(this.currentElement).attr(t);

	if (typeof attrout !== typeof undefined && attrout !== false) {

		this.stopText += ",\"delay\":\"" + $(this.currentElement).attr(t) + "\"";

	} else {
		this.stopText += ",\"delay\":0";
	}

}

/**
 * Add a javascript callback when a sound starts to play
 *
 * Sample page: XXXXX.html
 *
 * @method MM_addEase
 */

FormatCourse.prototype.addEase = function(t) {

	// console.log("addEase");

	var attrin = $(this.currentElement).attr(t);

	if (typeof attrin !== typeof undefined && attrin !== false) {
		this.stopText += ",\"ease\":\"" + $(this.currentElement).attr(t) + "\"";
	} else {
		this.stopText += ",\"ease\":\"" + this.murjmation.getDefaultEase() + "\"";
	}

}

/**
 * Add a sound and callback (optional) when an element finishes transitioning IN or OUT
 * 
 * format: mm-inFinishedSound="SOUND NAME,SOUND CALLBACK"
 * SOUND CALLBACK is optional
 *
 * Sample page: XXXXX.html
 *
 * @method addFinishSound
 * @param inOut {string} which Attribute to use options "mm-inFinishedSound" or "mm-outFinishedSound"
 */

FormatCourse.prototype.addElemFinishTransitionSound = function(inOut) {

	//define the array that holds the attribite values
	var s = [];

	//Check if an attribute exists on the element
	var attrin = $(this.currentElement).attr(inOut);

	//If the attribute vaule is for the IN sound
	if (inOut === "mm-inFinishedSound") {

		//Check the vaule of attrin
		if (typeof attrin !== typeof undefined && attrin !== false) {

			//Split the attribute value to get the sound name and the sound callback
			s = attrin.split(",");

			//Add the sound name into the element class
			this.currentPage.elements[this.currentPage.elements.length - 1].setInFinishedSound(s[0]);

			//check if there is a callback
			if (s.length === 2) {

				//If there is a callback put it into the element class
				this.currentPage.elements[this.currentPage.elements.length - 1].setInFinishedSoundCallback(s[1]);

			}

		}

	} else {

		//Check the vaule of attrin
		if (typeof attrin !== typeof undefined && attrin !== false) {

			s = attrin.split(",");

			//Add the sound name into the element class
			this.currentPage.elements[this.currentPage.elements.length - 1].setOutFinishedSound(s[0]);

			//check if there is a callback
			if (s.length === 2) {

				//If there is a callback put it into the element class
				this.currentPage.elements[this.currentPage.elements.length - 1].setOutFinishedSoundCallback(s[1]);

			}

		}

	}

}

/**
 * Add a sound and callback (optional) when an element starts to transition IN or OUT
 * 
 * format: mm-inStartSound="SOUND NAME,SOUND CALLBACK"
 * SOUND CALLBACK is optional
 *
 * Sample page: XXXXX.html
 *
 * @method MM_addStartSound
 * @param {string} inOut which Attribute to use options "mm-inStartSound" or "mm-outStartSound"
 */

FormatCourse.prototype.addElemStartTransitionSound = function(inOut) {

	//define the array that holds the attribite values
	var s = [];

	//Check if an attribute exists on the element
	var attrin = $(this.currentElement).attr(inOut);

	//If the attribute vaule is for the IN sound
	if (inOut === "mm-inStartSound") {

		//Check the vaule of attrin
		if (typeof attrin !== typeof undefined && attrin !== false) {

			//Split the attribute value to get the sound name and the sound callback
			s = attrin.split(",");

			//Add the sound name into the element class
			this.currentPage.elements[this.currentPage.elements.length - 1].setInStartSound(s[0]);

			//check if there is a callback
			if (s.length === 2) {

				//If there is a callback put it into the element class
				this.currentPage.elements[this.currentPage.elements.length - 1].setInStartSoundCallback(s[1]);

			}

		}

	} else {

		//Check the vaule of attrin
		if (typeof attrin !== typeof undefined && attrin !== false) {

			//Split the attribute value to get the sound name and the sound callback
			s = attrin.split(",");

			//Add the sound name into the element class
			this.currentPage.elements[this.currentPage.elements.length - 1].setOutStartSound(s[0]);

			//check if there is a callback
			if (s.length === 2) {

				//If there is a callback put it into the element class
				this.currentPage.elements[this.currentPage.elements.length - 1].setOutStartSoundCallback(s[1]);

			}

		}

	}

}

/**
 * Add a javascript callback when a sound starts to play
 *
 * Sample page: XXXXX.html
 *
 * @method MM_addDelay
 */

FormatCourse.prototype.addSpriteSheet = function() {

	var spriteSheet = $(this.currentElement).attr("mm-spriteSheet");

	if (typeof spriteSheet !== typeof undefined && spriteSheet !== false) {

		var sS = spriteSheet.split(",");

		//copy the html from the <div>
		var h = $(this.currentElement).children(0).html();

		//Add the new <div>
		$(this.currentElement).children(0).html("<div style='position: absolute; overflow:hidden;' id='MurjmationInternalAnimatedSpriteSheetDiv'>" + h + "</div>");

		$(this.currentElement).children(0).children(0).children(0).css("position", "absolute");
		
		murjmation.spriteSheets[sS[0]].playAnimation(murjmation.getElementOnPage($(this.currentElement).attr("id"), this.currentPage.getName()), sS[1]);

	}


}

/**
 * Add a javascript callback when a sound starts to play
 *
 * Sample page: XXXXX.html
 *
 * @method MM_addStartSound
 */

FormatCourse.prototype.addTimeScale = function(t) {

	//console.log("addTimeScale");

	var attrin = $(this.currentElement).attr(t);

	if (t === "mm-intimescale") {
		if (typeof attrin !== typeof undefined && attrin !== false) {

			this.currentPage.elements[this.currentPage.elements.length - 1].setInTimeScale($(this.currentElement).attr(t));

		}
	} else {
		if (typeof attrin !== typeof undefined && attrin !== false) {

			this.currentPage.elements[this.currentPage.elements.length - 1].setOutTimeScale($(this.currentElement).attr(t));

		}
	}

}

/**
 * Transition an element(s) when the element this attribute is on completes it's IN transition
 * Multiple elements can be transitioned with a comma seperated list (i.e. ID,ID2,ID3...)
 * 
 * format: mm-animationOnInComplete="ID,ID2,ID3..."
 *
 * Sample page: XXXXX.html
 *
 * @method animationOnInComplete
 */

FormatCourse.prototype.animationOnInComplete = function() {

	//Check to see if the attribute lives on the element
	var onInComp = $(this.currentElement).attr("mm-animationOnInComplete");

	//If the attribute does live on the element
	if (typeof onInComp !== typeof undefined && onInComp !== false) {

		//Save the element list in the current element object
		this.currentPage.elements[this.currentPage.elements.length - 1].setAnimateOnInComplete(onInComp);

		this.murjmation.utils.showMessage("   Animation on in complete set to: " + this.currentPage.elements[this.currentPage.elements.length - 1].getAnimateOnInComplete(), 2);

	}


}

/**
 * Transition an element(s) when the element this attribute is on completes it's OUT transition
 * Multiple elements can be transitioned with a comma seperated list (i.e. ID,ID2,ID3...)
 * 
 * format: mm-animationOnOutComplete="ID,ID2,ID3..."
 *
 * Sample page: XXXXX.html
 *
 * @method animationOnOutComplete
 */

FormatCourse.prototype.animationOnOutComplete = function(t) {

	//Check to see if the attribute lives on the element
	var onOutComp = $(this.currentElement).attr("mm-animationOnOutComplete");

	//If the attribute does live on the element
	if (typeof onOutComp !== typeof undefined && onOutComp !== false) {

		//Save the element list in the current element object
		this.currentPage.elements[this.currentPage.elements.length - 1].setAnimateOnOutComplete(onOutComp);

		this.murjmation.utils.showMessage("   Animation on out complete set to: " + this.currentPage.elements[this.currentPage.elements.length - 1].getAnimateOnOutComplete(), 2);

	}

}

/**
 * Add a javascript callback when a sound starts to play
 *
 * Sample page: XXXXX.html
 *
 * @method MM_inCallback
 */

FormatCourse.prototype.inCallback = function() {

	var attrin = $(this.currentElement).attr("mm-inCallback");

	if (typeof attrin !== typeof undefined && attrin !== false) {

		this.currentPage.elements[this.currentPage.elements.length - 1].setInCallback($(this.currentElement).attr("mm-inCallback"));

	}


}

/**
 * Add a mouse sound when the cursor clicks on an element
 *
 * Sample page: XXXXX.html
 *
 * @method MM_onClickAnimateElement
 */

FormatCourse.prototype.onClickAnimateElement = function() {

	//console.log("onClickAnimateElement");

	var animEle = $(this.currentElement).attr("mm-onClickAnimateElement");

	if (typeof animEle !== typeof undefined && animEle !== false) {

		var elemPath = this.murjmation.utils.getDomPosition(this.currentElement);

		$(elemPath).addClass("handCursor");

		$(elemPath).bind("click.animate", function() {

			window.murjmation.animateElement(animEle);

		});

	}

}

/**
 * Add a mouse sound when the cursor clicks on an element
 *
 * Sample page: XXXXX.html
 *
 * @method MM_onClickCallback
 */

FormatCourse.prototype.onClickCallback = function() {

	//console.log("onClickCallback");

	//add javascript callback function to an element
	var callBack = $(this.currentElement).attr("mm-onClickCallback");

	if (typeof callBack !== typeof undefined && callBack !== false) {

		var elemPath = this.murjmation.utils.getDomPosition(this.currentElement);

		$(elemPath).addClass("handCursor");

		$(elemPath).bind("click.callback", function() {

			window.murjmation.utils.callFunction(elemPath, callBack);

		});

	}

}

/**
 * Add a mouse sound when the cursor clicks on an element
 *
 * Sample page: XXXXX.html
 *
 * @method MM_onClickNavigateTo
 */

FormatCourse.prototype.onClickNavigateTo = function() {

	//console.log("onClickNavigateTo");

	//add navigation to an element
	var navTo = $(this.currentElement).attr("mm-onClickNavigateTo");

	if (typeof navTo !== typeof undefined && navTo !== false) {

		var elemPath = this.murjmation.utils.getDomPosition(this.currentElement);
		$(elemPath).addClass("handCursor");

		$(elemPath).click(function() {
			window.murjmation.gotoPageName(navTo);
		});

	}

}

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

/**
 * Add popUp functionality to an element
 *
 * Sample page: XXXXX.html
 *
 * @method MM_onClickShowPopUp
 */

FormatCourse.prototype.onClickShowPopUp = function() {

	// console.log("onClickShowPopUp");

	var showPopUp = $(this.currentElement).attr("mm-onClickShowPopUp");

	if (typeof showPopUp !== typeof undefined && showPopUp !== false) {

		var elemPath = this.murjmation.utils.getDomPosition(this.currentElement);

		$(elemPath).addClass("handCursor");

		$(elemPath).bind("click.popup", function() {

			window.murjmation.showPopUp(showPopUp);

		});

	}

}

/**
 * Add a mouse sound when the cursor moves on, then off an element
 *
 * Sample page: XXXXX.html
 *
 * @method MM_onMouseOutPlay
 */

FormatCourse.prototype.onMouseOutPlay = function() {

	//console.log("onMouseOutPlay");

	//add javascript function to an element
	var onMouseoutPlay = $(this.currentElement).attr("mm-onMouseOutPlay");

	if (typeof onMouseoutPlay !== typeof undefined && onMouseoutPlay !== false) {

		var elemPath = this.murjmation.utils.getDomPosition(this.currentElement);

		$(elemPath).bind("mouseout.sound", function() {

			window.murjmation.playSound(onMouseoutPlay);

		});

	}

}

/**
 * Add a mouse sound when the cursor moves over an element
 *
 * Sample page: XXXXX.html
 *
 * @method MM_onMouseOverPlay
 */

FormatCourse.prototype.onMouseOverPlay = function() {

	//console.log("onMouseOverPlay");

	var onMouseoverPlay = $(this.currentElement).attr("mm-onMouseOverPlay");

	if (typeof onMouseoverPlay !== typeof undefined && onMouseoverPlay !== false) {

		var elemPath = this.murjmation.utils.getDomPosition(this.currentElement);

		$(elemPath).bind("mouseover.sound", function() {
			window.murjmation.playSound(onMouseoverPlay);
		});

	}

}

/**
 * Add a mouse sound when the cursor moves over an element
 *
 * Sample page: XXXXX.html
 *
 * @method MM_outCallback
 */

FormatCourse.prototype.outCallback = function() {

	//console.log("outCallback");

	var attrin = $(this.currentElement).attr("mm-outCallback");

	if (typeof attrin !== typeof undefined && attrin !== false) {

		this.currentPage.elements[this.currentPage.elements.length - 1].setOutCallback($(this.currentElement).attr("mm-outCallback"));

	}

}
