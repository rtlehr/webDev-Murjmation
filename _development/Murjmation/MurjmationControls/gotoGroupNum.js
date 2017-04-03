	/**
	 * Go to a new group by it's number (1 = the first group that was created) 
	 * after calling this you MUST then tell murjmation which page to go to by
	 * calling gotoPageNumber, or gotoPageName
	 *
	 * @method gotoGroupNum
	 * @param {string} groupNum - the number of the group you want to go to
	 */

	Murjmation.prototype.gotoGroupNum = function(groupNum) {
		//Go to the group number
		this.groups[Number(groupNum) - 1];

	};
