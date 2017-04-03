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