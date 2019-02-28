const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(express.static('./public'))
app.use(bodyParser.urlencoded({extended: true}))

require('./routes/home')(app)
require('./routes/produtos')(app)



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