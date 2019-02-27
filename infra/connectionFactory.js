const mysql = require('mysql');

module.exports = function connectionFactory() {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'casadocodego'
    })
    
    return connection
}