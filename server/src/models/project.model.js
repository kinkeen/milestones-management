const {
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');

class ProjectModel {
	constructor(obj) {
		this.id = uuidv4();
		this.ownerId = uuidv4();
		this.name = obj.name;
		this.description = obj.description;
		this.dateStart = obj.dateStart;
		this.dateEnd = obj.dateEnd;
		this.estimateDateEnd = obj.estimateDateEnd;
		this.estimatePrice = obj.estimatePrice;
		this.actuallPrice = obj.actuallPrice;
		this.milestones = [];
		this.users = [];
	}
}

module.exports = ProjectModel;

