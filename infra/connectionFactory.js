const mysql = require('mysql');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 15
})
module.exports = function connectionFactory() {
    return new Promise((resolve,reject) => {
        pool.getConnection((err, connection) => {
            if(err) {
                reject(err); return;
            }
            resolve(connection)
        })
    })
}