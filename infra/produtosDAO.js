const connectionFactory = require('./connectionFactory')

async function pegaTodos() {
    const connection = await connectionFactory()
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM livros', function(err, results) {
            connection.release();
            if(err) return reject(err);
            resolve(results);
        })
    })
}

async function pegaUmPorId(idDoProduto) {
    const connection = await connectionFactory()
    return new Promise(function(resolve, reject) {
        connection.query(`SELECT * FROM livros WHERE id = ${idDoProduto}`, function(err, results) {
            connection.end();
            if(err) return reject(err);
            resolve(results);
        })
    })
}

async function insereLivro (livro) {
    const connection = await connectionFactory()
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
