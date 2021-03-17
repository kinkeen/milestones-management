const {
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');

class MilestoneModel {
	constructor(obj) {
		this.id = uuidv4();
		this.projectId = uuidv4();
		this.description = obj.description;
		this.dateStart = obj.dateStart;
		this.dateEnd = obj.dateEnd;
		this.estimateDateEnd = obj.estimateDateEnd;
		this.estimatePrice = obj.estimatePrice;
		this.actuallPrice = obj.actuallPrice;
		this.assets = [];
		this.digitalSignatures = [];
	}
}

module.exports = MilestoneModel;