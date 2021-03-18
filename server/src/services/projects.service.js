const ProjectModel = require("../models/project.model");

const projects = require('../../db/seeds/projects.json')

/* static project service class */
class ProjectService {

	static retrieve() {
		return projects.data;
	}

	static get(id) {
		const project = projects.data.find(project => project.id == id)

		project.milestones = [
			{
			  status: "Ordered",
			  date: "15/10/2020 10:30",
			  icon: "pi pi-shopping-cart",
			  color: "#9C27B0",
			  image: "game-controller.jpg",
			  number: 1
			},
			{
			  status: "Processing",
			  date: "15/10/2020 14:00",
			  icon: "pi pi-cog",
			  color: "#673AB7",
			  number: 2
			},
			{
			  status: "Shipped",
			  date: "15/10/2020 16:15",
			  icon: "pi pi-shopping-cart",
			  color: "#FF9800",
			  number: 3
			},
			{
			  status: "Delivered",
			  date: "16/10/2020 10:00",
			  icon: "pi pi-check",
			  color: "#607D8B",
			  number: 4
			},
		  ];

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