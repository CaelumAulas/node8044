
module.exports = function (app) {
    
    const produtosDAO = app.infra.produtosDAO

    app.get('/produtos', function (req, res, next) {
        produtosDAO.pegaTodos()
            .then(function(results) {
                const livros = results
                res.render('produtos/lista.ejs', { // View Model
                    livros: livros
                })                
            })
            .catch(erro => next(erro))
    })

    app.post('/produtos', (req,res, next) => {
        produtosDAO
            .insereLivro(req.body)
            .then(resultados => res.redirect('/produtos'))
            .catch(erro => next(erro))
            
    })

    app.get('/produtos/form', function(req, res){
        res.render('produtos/form.ejs')
    })

    app.get('/produtos/:id', function(req,res) {
        const idDoProduto = req.params.id
        produtosDAO.pegaUmPorId(idDoProduto)
            .then(function(results) {
                res.render('produtos/lista.ejs', { // View Model
                    livros: results
                })
            })
            .catch(erro => next(erro))
    })

    
}

        // const livros = [
        //     { titulo: 'Guia de Bolso do Front End', preco: 20 },
        //     { titulo: 'Livro de Node', preco: 10 }
        // ]