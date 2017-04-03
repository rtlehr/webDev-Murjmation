/*********************
 * 
 * Create Murjmation
 *
 **********************/

var murjmation;

murjmation = new Murjmation();

/*********************
 * 
 * Preload assets for the site
 *
 * http://www.createjs.com/preloadjs
 *
 **********************/

/*
mmpl.loadFile("assets/images/buttonReplay.png", false);
mmpl.loadFile("assets/images/buttonPrev.png", false);
mmpl.loadFile("assets/images/buttonNext.png", false);
mmpl.loadFile("assets/images/background.png", false);
*/

/*********************
 * 
 * Defining Sounds that will be played
 *
 **********************/

/*
murjmation.addSound("navClick", "assets/sounds/navigationClick");
murjmation.addSound("10sec", "assets/sounds/10sec");
*/

/*********************
 * 
 * Defining Sprite Sheets that will be played
 *
 **********************/

/*
murjmation.addSpriteSheet("dude", "assets/images/dudeSpriteSheet.json");
murjmation.addSpriteSheetAnimation("dude", "runRight", [4, 5], 10, true, "runRightPlayed");
murjmation.addSpriteSheetAnimation("dude", "runLeft", [2, 3], 10, true);
murjmation.addSpriteSheetAnimation("dude", "idle", [8], 1, false);
*/

/*********************
 * 
 * Groups, Pages and to load
 *
 * Pages loaded after a Group will be loaded into that group
 *
 **********************/

murjmation.addGroup("Welcome");

murjmation.addPage("index.1.html");
/*
murjmation.addGroup("addItems");

murjmation.addPage("addMouseOutSound.html");
murjmation.addPage("addMouseOverSound.html");
murjmation.addPage("addOnClickSound.html");
murjmation.addPage("addOnClickAnimateElement.html");
murjmation.addPage("addOnClickCallback.html");

murjmation.addGroup("animateElements");

murjmation.addPage("animateElement.html");
murjmation.addPage("animateElementIn.html");
murjmation.addPage("animateElementOut.html");
murjmation.addGroup("groupInformation");
murjmation.addPage("getGroupInfo.html");

murjmation.addGroup("Sounds");

murjmation.addPage("playSound.html");
murjmation.addPage("stopSound.html");
murjmation.addPage("togglePlayPauseSound.html");

murjmation.addGroup("removeItems");

murjmation.addPage("removeAllSounds.html");
murjmation.addPage("removeMouseSound.html");
murjmation.addPage("removeOnClick.html");
murjmation.addPage("removeOnClickAnimation.html");
murjmation.addPage("removeOnClickCallback.html");
murjmation.addPage("removeOnClickSound.html");
*/

/*********************
 * 
 * Kick off function
 *
 **********************/

function initInteractions() {

    console.log("initInteractions called");
    //allows for tool tips - can be removed if you are not using tooltips
    $(document).tooltip();

    /*
        $(".mm-next").click(function() {

            murjmation.nextPage();
        });

        $(".mm-prev").click(function() {
            murjmation.prevPage();
        });
    */

}

/*********************
 * 
 * Begin the course
 *
 **********************/

$(document).ready(function() {

    console.log("murjmation-setup ready");
    /*********************
     * 
     * Murjmation preferences
     *
     **********************/

    //Sets the default duration of the elements
    murjmation.setDefaultDuration(1.5);

    //The div where the content is loaded
    murjmation.setScreen($("#screen"));

    //Messages turned on to show internal webmation information
    murjmation.messagesOn(0);

    //Begin loading the assets
    mmpl.load();

    //Show the progress bar
    // $("#progressBar").progressbar({});
    murjmation.progressbar.show();
    murjmation.progressbar.setLable("Loading assets");

});