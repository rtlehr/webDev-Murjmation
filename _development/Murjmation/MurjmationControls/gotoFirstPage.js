	/**
	 * Go to the first page of the course 
	 *
	 * @method gotoFirstPage
	 */

	Murjmation.prototype.gotoFirstPage = function() {

		//Set to the first group (groups are 0 index)
		this.currentGroupNum = 0;

		//Set the the first page (page numbers are 1 index)
		this.currentPageNum = 1;

		//If there is a murjmationGroupIn function, call it.
		if (typeof murjmationGroupIn == 'function') {
			murjmationGroupIn(this.currentGroup);
		}

		//Set the direction to move forward
		this.navigationDirection = "forward";

		//Animate to the first page
		this.animation.gotoFirst();

	};
