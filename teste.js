const http = require('http') // ES6: var, let e const

const metodos = []
metodos['GET'] = []



function get(url, funcao) {
    metodos['GET'][url] = funcao
}

get('/', function(request, response) {
    response.end('Home!')
})


get('/', '<h1>Produtos</h1>')
// rotas['/'] = { url: '/', valor: '<h1>Home</h1>' }
// rotas['/produtos'] = { url: '/', valor: '<h1>Produtos</h1>' }


const app = http.createServer(function funcaoQueLidaComRequests(request, response) {
    
    // # Desafio
    // Fazer a lógica de roteamento com um if só
    // Como trabalhar com: Arrays e Objetos

    if(metodos[request.method][request.url] !== undefined) {
        // new Map()
        metodos[request.method][request.url](request,response)
        return 
    }

    response.end('<h1>Você acessou uma página meio errada, nao existe</h1>')

    // // Rota da home
    // if(request.url === '/') {
    //     response.end('<h1>Home</h1>')
    //     return 
    // }

    // // Rota de produtos
    // if(request.url === '/produtos') {
    //     response.end('<h1>Produtos</h1>')
    //     return 
    // }
    // // Façam a página 404
    // response.end('<h1>Você acessou uma página meio errada, nao existe</h1>')
})


const port = 3000
app.listen(port, function () {
    console.log(`
        O servidor subiu em:
        http://localhost:${port}
    `)
})



// /cadastro
// /listagem dos livros
// /edição
// /login 