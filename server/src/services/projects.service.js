const ProjectModel = require("../models/project.model");

const projects = require('../../data/seeds/projects.json')

/* static project service class */
class ProjectService {

	static retrieve() {
		return projects.data;
	}

	static get(id) {
		const project = projects.data.find(project => project.id == id)

		if (project != null) {
			return project;
		}
		else {
			throw new Error('Unable to retrieve a project by (id:' + id + ')');
		}
	}

	static create(data) {

		let { name, status, priority, country } = data;

		let project = new IncidentModel(name, status, priority, country);

		projects.data.push(project);

		return project;
	}

	static update(id, data) {
		const project = projects.data.find(project => project.id == id);

		if (project.audits === undefined) {
			project.audits = [];
		}

		if (data['status'] != project['status']) {
			project.audits.push({
				title: `project ${data['status']}`,
				message: 'project status from {1} to {2}',
				property: 'status',
				from: project['status'],
				to: data['status'],
				updated: new Date()
			});

			project['status'] = data['status'];
		}

		if (data['name'] != project['name']) {
			project.audits.push({
				title: `project ${data['name']}`,
				message: 'project name from {1} to {2}',
				property: 'name',
				from: project['name'],
				to: data['name'],
				updated: new Date()
			});
			project['name'] = data['name'];
		}

		if (data['priority'] != project['priority']) {
			project.audits.push({
				title: `project ${data['priority']}`,
				message: 'project priority from {1} to {2}',
				property: 'priority',
				from: project['priority'],
				to: data['priority'],
				updated: new Date()
			});
			project['priority'] = data['priority'];
		}

		if (data['country'] != project['country']) {
			project.audits.push({
				title: `project ${data['country']}`,
				message: 'project country from {1} to {2}',
				property: 'country',
				from: project['country'],
				to: data['country'],
				updated: new Date()
			});
			project['country'] = data['country'];
		}

		return project;
	}

	static delete(id) {
		const idx = projects.data.findIndex(project => project.id == id);
		delete projects.data[idx];
	}
}

module.exports = ProjectService;