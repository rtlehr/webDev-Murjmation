/**
 * Got to a perticular group in the course, by it's page name (name is the name you used in the addGroup function)
 *
 * @method gotoGroupName
 * @param {string} name - Name of the group
 */

Murjmation.prototype.gotoGroupName = function(name) {

	//Loop thru the pages
	for (var count = 0; count < this.groups.length; count++) {
		//Compare the name of the current page to the name given 
		if (name == this.groups[count].getName()) {

			//Go to the group
			this.currentGroup = this.groups[count];

			break;

		}

	}

};
