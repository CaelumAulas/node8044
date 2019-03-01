const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const consign = require('consign')
const cors = require('cors')

// Adiciona o cors, e testa com isso:
// fetch('http://localhost:3000/produtos', {
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Content-type': 'application/json'
//     }
// })
// https://github.com/caelum/cmail-back

app.use(cors())
app.use(express.static('./public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

consign()
    .include('./infra')
    .then('./routes')
    .into(app)

app.use(function (request, response, next) {
    const msg = `Recurso não encontrado ${request.originalUrl}`
    response.status(404).render('erros/404.ejs', { msg })
    console.warn(msg);
})

app.use(function (error, request, response, next) {
    response.status(500).render('erros/500.ejs', { error })
    console.error(error);
})

module.exports = app






// return `<li>${livro.titulo} ${livro.preco} </li>`
    // let html = '<ul>'
    // livros.forEach(function(livro) {
    //     html += `<li>${livro.titulo} e custa ${livro.preco}</li>`
    // })
    // html += '</ul>'

    // Template Engines
    // response.send(`
    //     <ul>
    //         ${livros.map(function(livro) {
    //             return `<li>${livro.titulo} ${livro.preco} </li>`
    //         }).join('')}
    //     </ul>
    // `)