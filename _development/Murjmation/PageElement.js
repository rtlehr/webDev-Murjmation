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
