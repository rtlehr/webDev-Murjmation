/**
 * Got to a perticular page in the course, by it's page name (name is the DIV id of the page) 
 *
 * @method gotoPageName
 * @param {string} name - DIV id of the page
 */

Murjmation.prototype.gotoPageName = function(name) {

	//Loop thru the pages
	for (var count = 0; count < this.currentGroup.getPageLength(); count++) {
		//Compare the name of the current page to the name given 
		if (name == this.currentGroup.pages[count].getName()) {
			//Go to the page
			this.gotoPageNumber(count + 1);

			//If the new page number is greater than the current page set the navigation direction to forward
			if ((count + 1) >= this.getCurrentPage()) {
				this.navigationDirection = "forward";
			}
			//else set it to backwards
			else {
				this.navigationDirection = "backward";
			}

			break;
		}
	}
};
