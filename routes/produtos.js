const Joi = require('joi');

module.exports = function (app) {
    
    const produtosDAO = app.infra.produtosDAO

    app.get('/produtos', function (req, res, next) {
        produtosDAO.pegaTodos()
            .then(function(results) {
                const livros = results
                // Usar o Postman pra mandar o Accept: application/json
                res.format({
                    html: () => {
                        res.render('produtos/lista.ejs', { // View Model
                            livros: livros
                        })                
                    },
                    json: () => {
                        res.send({ // View Model
                            livros: livros
                        })
                    }
                })
            })
            .catch(erro => next(erro))
    })

    app.post('/produtos', (req, res, next) => {
        const insereLivroSchema = Joi.object().keys({
            titulo: Joi.string().required(),
            preco: Joi.number().min(0).required(),
            descricao: Joi.string()
        })
        
        const result = Joi.validate(req.body, insereLivroSchema, { abortEarly: false });
        if(result.error) {
            // res.send(result.error) // Criar um conversor desse result.error
            // Reponse default quando houverem erros do JOI

            res.status(400)
            res.format({
                html: () => {
                    res.render('produtos/form.ejs', {
                        errors: result.error.details
                    }) // passar os erros
                },
                json: () => {
                    res.send({
                        errors: result.error.details
                    })
                }
            })
            return
        }
        
        const livroDTO = {
            titulo: req.body.titulo,
            preco: req.body.preco,
            descricao: req.body.descricao
        }        

        produtosDAO
            .insereLivro(livroDTO)
            .then(resultados => {
                res.status(201)
                res.format({
                    html: () => res.redirect('/produtos'),
                    json: () => {
                        res.append('Access-Control-Allow-Origin', ['*']);
                        // retornar o objeto inteiro
                        res.send(resultados)
                    }
                })

            })
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