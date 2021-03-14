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
		let project = new ProjectModel(data);

		projects.data.push(project);

		return project;
	}

	static update(id, data) {
		const project = projects.data.find( item => item.id == id);

		for (let key in data){
			if(key in project ) {
				project[key] = data[key];
			}
		}

		return project;
	}

	static delete(id) {
		const idx = projects.data.findIndex(project => project.id == id);

		projects.data.splice(idx, 1);
	}
}

module.exports = ProjectService;