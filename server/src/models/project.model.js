class ProjectModel {

	constructor(id, name, description, ownerId, startDay, estimateDateEnd, actuallDateEnd, estimatePrice, actuallPrice) {
		this.id = Math.random(10000);
		this.ownerId = ownerId;
		this.name = name;
		this.description = description;
		this.dateStart = dateStart;
		this.dateEnd = dateEnd;
		this.estimateDateEnd = estimateDateEnd;
		this.estimatePrice = estimatePrice;
		this.milestones = milestones;
		this.users = users;
	}
}

module.exports = ProjectModel;

