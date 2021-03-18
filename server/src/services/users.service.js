const UserModel = require("../models/user.model");

const users = require('../../db/seeds/users.json')
const db =  require("./db");

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
 const getUserWithEmail = function(email) {
	const values = [email];
  
	const query = `SELECT * FROM users WHERE email = $1`;
	return db.query(query,values)
	.then(res=>res.row ? res.rows[0]: null)
	.catch(err => console.error('query error', err.stack))
	
  }
  exports.getUserWithEmail = getUserWithEmail;
  
  /**
   * Get a single user from the database given their id.
   * @param {string} id The id of the user.
   * @return {Promise<{}>} A promise to the user.
   */
  const getUserWithId = function(id) {
	const values = [id];
  
	const query = `SELECT * FROM users WHERE id = $1`;
	return db.query(query,values)
	.then(res=>res.row ? res.rows[0]: null)
	
	.catch(err => console.error('query error', err.stack))
	
  }
  exports.getUserWithId = getUserWithId;
  
  
  /**
   * Add a new user to the database.
   * @param {{name: string, password: string, email: string}} user
   * @return {Promise<{}>} A promise to the user.
   */
  const addUser =  function(user) {
	console.log(user.name)
	const values = [user.user_type, user.first_name,user.last_name,
		 user.phone, user.email, user.password, user.country, 
		 user.street, user.city, user.province, user.post_code]
	const query = `INSERT INTO users (user_type, first_name,last_name, phone, email, password, country, street, city, province, post_code ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`
	return db.query(query, values)
	.then(res=>res.rows[0])
	.catch(err=> console.error('query error', err.stack));
  }
  exports.addUser = addUser;
  
