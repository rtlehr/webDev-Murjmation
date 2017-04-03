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
        $("#progressBar").hide();
    };

    /**
     * Hide the progress bar 
     *
     * @method hide
     */

    ProgressBar.prototype.show = function() {

        $("#progressBar").show();
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