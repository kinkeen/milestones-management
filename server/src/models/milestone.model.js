class MilestoneModel {

	constructor(name, status, priority, country) {
		
		this.name = name;
		this.status = status;
		this.priority = priority;
		this.country = country;

		this.id = Math.random(10000);
	}
}

module.exports = MilestoneModel;