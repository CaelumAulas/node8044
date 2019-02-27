
const produtosDAO = require('../infra/produtosDAO')

module.exports = function (app) {
    app.get('/produtos', function (req, res) {
        produtosDAO.pegaTodos()
            .then(function(results) {
                const livros = results
                res.render('produtos/lista.ejs', { // View Model
                    livros: livros
                })                
            })
    })

    app.get('/produtos/:id', function(req,res) {
        const idDoProduto = req.params.id
        produtosDAO.pegaUmPorId(idDoProduto)
            .then(function(results) {
                res.render('produtos/lista.ejs', { // View Model
                    livros: results
                })
            })
    })
}

        // const livros = [
        //     { titulo: 'Guia de Bolso do Front End', preco: 20 },
        //     { titulo: 'Livro de Node', preco: 10 }
        // ]