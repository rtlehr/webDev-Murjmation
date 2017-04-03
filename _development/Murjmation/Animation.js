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