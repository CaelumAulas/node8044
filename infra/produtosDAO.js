const connectionFactory = require('./connectionFactory')

function pegaTodos() {
    const connection = connectionFactory()
    return new Promise(function(resolve, reject) {
        connection.query('SELECT * FROM livros', function(err, results) {
            connection.end();
            if(err) {
                reject(err)
                return;
            }
            resolve(results)
        })
    })
}

function pegaUmPorId(idDoProduto) {
    const connection = connectionFactory()
    return new Promise(function(resolve, reject) {
        connection.query(`SELECT * FROM livros WHERE id = ${idDoProduto}`, function(err, results) {
            connection.end();
            resolve(results)  
        })
    })
}

module.exports = {
    pegaTodos,
    pegaUmPorId
}

