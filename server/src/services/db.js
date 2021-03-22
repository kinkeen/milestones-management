const fs = require("fs");
const path = require("path");
const { Pool, Client } = require('pg');
const { exit } = require("process");

const db = new Client({
    user: 'development',
    host: 'localhost',
    database: 'milestones_management',
    password: 'development',
    port: 5432,
});

db.connect();

const pool = new Pool({
    user: 'development',
    host: 'localhost',
    database: 'milestones_management',
    password: 'development',
    port: 5432,
})

module.exports = pool;

function read(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(
            file,
            {
                encoding: "utf-8"
            },
            (error, data) => {
                if (error) return reject(error);
                resolve(data);
            }
        );
    });
}

// Promise.all([
//     read(path.resolve(__dirname, `../../db/schema/ddl.sql`)),
//     read(path.resolve(__dirname, `../../db/schema/dml.sql`))
// ])
//     .then(([create, seed]) => {
//         db.query(create)
//           .then(() => {
//               // console.log('INSERT DATA', seed)
//               db.query(seed)
//           })
//           .then(() => {
//             console.log("Database Reset");
//             exit(0)
//           });
//     })
//     .catch(error => {
//         console.log(`Error setting up the reset route: ${error}`);
//     });