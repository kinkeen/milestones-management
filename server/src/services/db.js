const Pool = require("pg").Pool;


const pool = new Pool({
    user: "mahsan",
    password: "1234",
    host: "localhost",
    port: 5432,
    database: "milestones_management"

})

module.exports = pool;