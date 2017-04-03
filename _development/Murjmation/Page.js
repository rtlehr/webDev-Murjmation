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