const { expect } = require('chai')
const request = require('supertest');
const app = require('../app')

describe('/produtos', () => {
    it('Deve retornar uma lista de produtos', (done) => {
        request(app)
            .get('/produtos')
            .set('Accept', 'application/json')
            .end((err, response) => {
                expect(response.body.livros).to.be.an('array')
                expect(response.body.livros[0]).have.own.property('id');
                expect(response.body.livros[0].id).to.be.an('number');

                done()
            })
    })
    it('Deve retornar uma lista de produtos', (done) => {
        // .post('/produtos')
        // .send({ objetinho do livro })    
    })
})













function soma(numero1, numero2) {
    return numero1 + numero2
}