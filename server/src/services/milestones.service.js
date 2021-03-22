const MilestoneModel = require("../models/milestone.model");

//const milestones = require('../../db/seeds/milestons.json')
const db = require("./db");

class MilestonesService {

	static async get(id) {
		const query = `SELECT * FROM milestones WHERE id = ${id} ORDER BY creation_date ASC`
		return await db.query(query)
			.then((result) => {
				return result;
			})
			.catch(err => console.error('query error', err.stack));
	}

	static create(milestone) {
		const query = `INSERT INTO milestones (project_id, name, description,status,date_start,estimate_date_end ,date_end ,estimate_cost,actual_cost,creation_date)
			VALUES
				('${milestone.projectId}', '${milestone.description}', '${milestone.name}', 'init', '${milestone.dateStart}', '${milestone.estimateDateEnd}', '${milestone.dateEnd}', '${milestone.estimatePrice}', '${milestone.actualPrice}', '${(new Date()).toJSON()}')`;

		return db.query(query)
			.then((result) => {
				return true;
			})
			.catch(err => console.error('query error', err.stack));
	}

	static async update(id, data) {
		const milestone = await MilestonesService.get(id);

		console.log('update: ', data)

		const fields = [];

		if (milestone.name != data.name) {
			fields.push(`name = '${data.name}'`);
		}

		if (milestone.description != data.description) {
			fields.push(`description = '${data.description}'`);
		}

		if (milestone.date_start != data.dateStart) {
			fields.push(`date_start = '${data.dateStart}'`);
		}

		if (milestone.estimate_date_end != data.estimateDateEnd) {
			fields.push(`estimate_date_end = '${data.estimateDateEnd}'`);
		}

		if (milestone.date_end != data.dateEnd) {
			fields.push(`date_end = '${data.dateEnd}'`);
		}

		if (milestone.estimate_cost!= data.estimatePrice) {
			fields.push(`estimate_cost = '${data.estimatePrice}'`);
		}

		if (milestone.actual_cost!= data.actualPrice) {
			fields.push(`actual_cost = '${data.actualPrice}'`);
		}

		if (milestone.creation_date!= data.creationDate) {
			fields.push(`creation_date = '${data.creationDate}'`);
		}

		if (milestone.status!= data.status) {
			fields.push(`status = '${data.status}'`);
		}

		if (fields.length > 0) {
			const query = `UPDATE milestones SET ${fields.join(', ')} WHERE id=${id}`;

			return db.query(query)
				.then((result) => {
					return result;
				})
				.catch(err => console.error('query error', err.stack));
		}
		return {};
	}

	static delete(id) {

	}
}

module.exports = MilestonesService;