const connectionFactory = require('./connectionFactory')

function pegaTodos() {
    const connection = connectionFactory()
    return new Promise(function(resolve, reject) {
        connection.query('SELECT * FROM livros', function(err, results) {
            connection.end();
            if(err) return reject(err);
            resolve(results);
        })
    })
}

function pegaUmPorId(idDoProduto) {
    const connection = connectionFactory()
    return new Promise(function(resolve, reject) {
        connection.query(`SELECT * FROM livros WHERE id = ${idDoProduto}`, function(err, results) {
            connection.end();
            if(err) return reject(err);
            resolve(results);
        })
    })
}

const insereLivro = (livro) => {
    const connection = connectionFactory()

    return new Promise((resolve, reject) => {

        connection.query('INSERT INTO livros SET ?', livro, (err, resultado) => {
            connection.end();
            if(err) return reject(err);
            return resolve(resultado);
        })

    })
}

module.exports = () => ({ 
    pegaTodos,
    pegaUmPorId,
    insereLivro
})
