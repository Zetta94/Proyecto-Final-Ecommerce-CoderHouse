import { expect } from 'chai'
import supertest from "supertest"
import dotenv from 'dotenv'
dotenv.config()

const url = `${process.env.URL}:${process.env.PORT}`

const requester = supertest(url)

describe('--------------------------> Test Sessions',()=>{
    let cookie = ''
    describe('GET',()=>{
        it('El endpoint GET /api/sessions/current deberia devolver los datos del usuario correctamente', async () => {
            const userTester = {
                email: 'testeruser@email.com',
                password: '123456'
            }
            const resLogin = await requester.post('/api/sessions/login').send(userTester)
            cookie = resLogin.headers['set-cookie'][0]
            expect(cookie).to.be.ok
            const resCurrent = await requester.get('/api/sessions/current').set('Cookie', cookie)
            expect(resCurrent.body).to.be.an('object')
            expect(resCurrent.body).to.have.property('payload').that.is.an('object')
            expect(resCurrent._body.payload).to.have.property('first_name').to.equal("Tester")
            expect(resCurrent._body.payload).to.have.property('last_name').to.equal("User")
            expect(resCurrent._body.payload).to.have.property('email').to.equal("testeruser@email.com")
            expect(resCurrent._body.payload).to.have.property('cart').that.is.a('array')
        })
    })
    describe('POST',()=>{
        it('El endpoint POST /api/sessions/login deberia iniciar session correctamente', async () => {
            const userTester = {
                email: 'testeruser@email.com',
                password: '123456'
            }
            const resLogin = await requester.post('/api/sessions/login').send(userTester)
            cookie = resLogin.headers['set-cookie'][0]
            expect(cookie).to.be.ok
        })
        it('El endpoint POST /api/sessions/logout should deberia retornar error si no esta loggeado', async () => {
            const res = await requester.post('/api/sessions/logout') .unset('Cookie')
            expect(res.status).to.equal(400)
            expect(res.body.status).to.equal('error')
            expect(res.body.error).to.equal('Incomplete data')
        });
    })
})