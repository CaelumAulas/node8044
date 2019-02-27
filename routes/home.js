module.exports = function(app) {
    app.get('/', function (request, response) {
        response.send('Título da Home')
    })
}
