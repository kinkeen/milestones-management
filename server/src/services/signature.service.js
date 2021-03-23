// milestone_id  | integer | 
//  user_id       | integer | 
//  signature     | bytea   | not null
//  creation_date 

const db = require("./db");

class SignatureService {

	static async getByMilestone(id) {
		const query = `SELECT * FROM digital_signatures WHERE milestone_id = ${id}`
		return await db.query(query)
			.then((result) => {
				return result && result.rows;
			})
			.catch(err => console.error('query error', err.stack));
	}

	static create(signature) {
		console.log(signature.data);

		const query = `INSERT INTO digital_signatures (milestone_id, user_id, signature, creation_date)
			VALUES
				(${signature.milestoneId}, ${signature.userId}, '${signature.data}', '${(new Date()).toJSON()}') RETURNING *`;

		return db.query(query)
			.then((result) => {
				return result && result.rows && result.rows[0] || {};
			})
			.catch(err => console.error('query error', err.stack));
	}

	static delete(id) {

	}
}

module.exports = SignatureService;