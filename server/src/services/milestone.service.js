const MilestoneModel = require("../models/milestone.model");

const milestones = require('../../db/seeds/milestons.json')

class MilestoneService {

	static retrieve() {
		return milestons;
	}

	static get(id) {
		const milestone = milestons.find(milestone => milestone.id == id)

		if (milestone != null) {
			return milestone;
		}
		else {
			throw new Error('Unable to retrieve a milestone by (id:' + id + ')');
		}
	}

	static create(data) {

		let { name, status, priority, country } = data;

		let milestone = new IncidentModel(name, status, priority, country);

		milestons.push(milestone);

		return milestone;
	}

	static update(id, data) {
		const milestone = milestons.find(milestone => milestone.id == id);

		if (milestone.audits === undefined) {
			milestone.audits = [];
		}

		if (data['status'] != milestone['status']) {
			milestone.audits.push({
				title: `milestone ${data['status']}`,
				message: 'milestone status from {1} to {2}',
				property: 'status',
				from: milestone['status'],
				to: data['status'],
				updated: new Date()
			});

			milestone['status'] = data['status'];
		}

		if (data['name'] != milestone['name']) {
			milestone.audits.push({
				title: `milestone ${data['name']}`,
				message: 'milestone name from {1} to {2}',
				property: 'name',
				from: milestone['name'],
				to: data['name'],
				updated: new Date()
			});
			milestone['name'] = data['name'];
		}

		if (data['priority'] != milestone['priority']) {
			milestone.audits.push({
				title: `milestone ${data['priority']}`,
				message: 'milestone priority from {1} to {2}',
				property: 'priority',
				from: milestone['priority'],
				to: data['priority'],
				updated: new Date()
			});
			milestone['priority'] = data['priority'];
		}

		if (data['country'] != milestone['country']) {
			milestone.audits.push({
				title: `milestone ${data['country']}`,
				message: 'milestone country from {1} to {2}',
				property: 'country',
				from: milestone['country'],
				to: data['country'],
				updated: new Date()
			});
			milestone['country'] = data['country'];
		}

		return milestone;
	}

	static delete(id) {
		const idx = milestons.findIndex(milestone => milestone.id == id);
		delete milestons[idx];
	}
}

module.exports = MilestoneService;