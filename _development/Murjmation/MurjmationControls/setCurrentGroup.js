/**
 * Sets the current group to be seen
 * uses the dot (.) format to get to the group ie "Group.subGroup.subGroup"
 *
 * @method setCurrentGroup
 * @param {string} groupName - Path to the group to be set to the current group
 */

Murjmation.prototype.setCurrentGroup = function(groupName) {

	//Split the goups into an array
	var gs = groupName.split(".");

	this.currentGroup = this.groups;

	var temp = this.groups[gs[0]];

	//loop thru the remaining groups until we find the one to put the group in
	for (var count = 1; count < gs.length; count++) {

		temp = temp.getGroup(gs[count]);

	}

	this.currentGroup = temp;

};
