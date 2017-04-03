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