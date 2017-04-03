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
