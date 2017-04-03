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

        console.log("benPos.top: " + benPos.top);
        console.log(this.currentPage.getName() + ".top: " + pagePos.top);

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

        for (var count = 0; count < elemContent.length; count++) {

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