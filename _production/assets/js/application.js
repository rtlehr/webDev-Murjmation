// THIS IS THE JAVASCRIPT TEMPLATE

(function(window) {

    application = function(caller) {

        /**
         * Holds the instance of the class that called this 
         * 
         * @property currentSection
         * @type {class}
         */
        this.caller = caller;

        /**
         * Initialize the class 
         *
         * @private
         * @method init
         */

        this.init();

    }

    application.prototype.init = function() {

        //Get the hright of the window
        console.log("Class has been created: " + this.caller);

    };

})(window);
function murjmationElementOut() {
    console.log("--- murjmationElementOut");
}

function murjmationElementIn() {
    console.log("--- murjmationElementIn");
}

function murjmationPageOut() {
    console.log("--- murjmationPageOut");
}

function murjmationPageIn() {
    console.log("--- murjmationPageIn");
}