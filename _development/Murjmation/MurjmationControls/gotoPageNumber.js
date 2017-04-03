/**
 * Got to a perticular page in the course, by it's page number (1 = the first page) 
 *
 * @method gotoPageNumber
 * @param {Number} page - page number to go to
 */

Murjmation.prototype.gotoPageNumber = function(page) {

	//Check to see which direction the new page moves the course
	if ((page + 1) > this.getCurrentPage()) {

		this.navigationDirection = "forward";

	} else {

		this.navigationDirection = "backward";

	}

	//Set the currentPageNum to page
	this.currentPageNum = Number(page);

	//Go to the new page
	this.animation.gotoPage();

};
