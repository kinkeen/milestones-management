const ProjectModel = require("../models/project.model");

//const projects = require('../../db/seeds/projects.json')
const db = require("./db");

/* static project service class */
class ProjectService {

	static async retrieve() {
		const query = `SELECT * FROM projects`;
		return await db.query(query)
			.then((result) => {
				return result.rows.map(item => ({
					id: item.id,
					ownerId: item.owner_id,
					name: item.name,
					description: item.description,
					dateStart: item.date_start,
					dateEnd: item.date_end,
					estimateDateEnd: item.estimate_date_end,
					estimatePrice: item.estimate_cost,
					actualPrice: item.actual_cost,
					milestones: [],
					users: []
				})) || [];
			})
			.catch(err => console.error('query error', err.stack))
	}

	static async get(id) {

		const query = `
			SELECT 
				T1.*, 
				T2.id AS m_id, 
				T2.status AS m_status, 
				T2.date_start AS m_date_start, 
				T2.estimate_date_end AS m_ede, 
				T2.date_end AS m_date_end, 
				T2.estimate_cost AS m_estimate_cost, 
				T2.actual_cost AS m_actual_cost, 
				T2.creation_date AS m_creation_date, 
				T2.name AS m_name, 
				T2.description AS m_description 
					FROM projects AS T1 LEFT JOIN milestones AS T2 ON T1.id=T2.project_id
			WHERE T1.id = ${id}
		`;

		return await db.query(query)
			.then((result) => {
				let milestones = []
				const row = result && result.rows && result.rows[0] || {};
				
				if (row.m_id) {
					milestones = result.rows.map(item => ({
						id: item.m_id,
						projectId: item.id,
						name: item.m_name,
						description: item.m_description,
						status: item.m_status,
						dateStart: item.m_date_start,
						dateEnd: item.m_date_end,
						estimateDateEnd: item.m_ede,
						estimatePrice: item.m_estimate_cost,
						actualPrice: item.m_actual_cost,
						creationDate: item.m_creation_date
					})).sort((a, b) => a.id - b.id);
				}

				return result.rows.map(item => ({
					id: item.id,
					ownerId: item.owner_id,
					name: item.name,
					description: item.description,
					dateStart: item.date_start,
					dateEnd: item.date_end,
					estimateDateEnd: item.estimate_date_end,
					estimatePrice: item.estimate_cost,
					actualPrice: item.actual_cost,
					milestones: milestones,
					users: []
				}))[0] || {};
			})
			.catch(err => console.error('query error', err.stack));
	}

	static create(project) {
		const query = `INSERT INTO projects (name , description , owner_id , date_start , estimate_date_end , date_end , estimate_cost , actual_cost)
			VALUES
				('${project.name}', '${project.description}', 1, '${(new Date()).toJSON()}', '${(new Date()).toJSON()}', '${(new Date()).toJSON()}', '${project.estimatePrice}', '${project.actualPrice}')`;

		return db.query(query)
			.then((result) => {
				return true;
			})
			.catch(err => console.error('query error', err.stack));
	}

	static async update(id, data) {
		const project = await ProjectService.get(id);

		const fields = [];

		if (project.name != data.name) {
			fields.push(`name = '${data.name}'`);
		}

		if (project.description != data.description) {
			fields.push(`description = '${data.description}'`);
		}

		if (project.owner_id != data.ownerId) {
			fields.push(`owner_id = '${data.ownerId}'`);
		}

		if (project.date_start != data.dateStart) {
			fields.push(`date_start = '${data.dateStart}'`);
		}

		if (project.date_end != data.dateEnd) {
			fields.push(`date_end = '${data.dateEnd}'`);
		}

		if (project.estimate_date_end != data.estimateDateEnd) {
			fields.push(`estimate_date_end = '${data.estimateDateEnd}'`);
		}

		if (project.estimate_cost != data.estimatePrice) {
			fields.push(`estimate_cost = '${data.estimatePrice}'`);
		}

		if (project.actual_cost != data.actualPrice) {
			fields.push(`actual_cost = '${data.actualPrice}'`);
		}

		const query = `UPDATE projects SET ${fields.join(', ')} WHERE id=${id}`;

		return project;
	}

	static delete(id) {
		const idx = projects.data.findIndex(project => project.id == id);

		projects.data.splice(idx, 1);
	}
}

module.exports = ProjectService;