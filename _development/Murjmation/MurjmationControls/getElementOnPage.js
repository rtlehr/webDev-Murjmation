/**
 * Used to get the element path for javascript calls 
 *
 * @method getElementOnPage
 * @param elemName {string} ID of the element
 * @param pageName {string} optional, ID of page to search in
 * @param groupName {string} optional, ID of group to search in
 */

Murjmation.prototype.getElementOnPage = function(elemName, pageName, groupName) {

	if (groupName === null || groupName === undefined) {

		groupName = this.getCurrentGroupName();

	}

	//Checks to see if there was a specific page name sent
	if (pageName === null || pageName === undefined) {

		//If not, use the current page to find the element
		pageName = this.currentGroup.pages[(this.currentPageNum - 1)].getName();

	}

	//get the group object
	var groupObject;

	for (var count = 0; count < this.groups.length; count++) {

		if (this.groups[count].getName() == groupName) {
			
			groupObject = this.groups[count];
			
			break;
		}
	}
	
		
	//Get the page object
	var pageObject = "";

	for (var pageCount = 0; pageCount < groupObject.pages.length; pageCount++) {
				
		if (groupObject.pages[pageCount].getName() == pageName) {
	
			pageObject = groupObject.pages[pageCount];
			
			break;
		}
		
	}
		
	//Get the DOM of the element
	var elemDom;

	for (var elemCount = 0; elemCount < pageObject.elements.length; elemCount++) {
		
		if (pageObject.elements[elemCount].getName() == elemName) {
			
			elemDom = pageObject.elements[elemCount].getDom();
			
			break;
			
		}
		
	}

	return elemDom;

};
