import { expect } from 'chai'
import supertest from "supertest"
import dotenv from 'dotenv'
dotenv.config()

const url = `${process.env.URL}:${process.env.PORT}`

const requester = supertest(url)

describe('--------------------------> Test Products',()=>{
    let cookie = ''
    let productTestId = ''
        before(async () => {
            const userTester = {
                email: 'testeruser@email.com',
                password: '123456'
            }
            const resLogin = await requester.post('/api/sessions/login').send(userTester)
    
            cookie = resLogin.headers['set-cookie'][0]
            expect(cookie).to.be.ok
        })
    describe('GET',()=>{
        it('El endpoint GET /products/productsAdminPanel devuelve todos los productos en la vista de "ADMIN PRODUCTS', async () => {
            const res = await requester.get(`/products/productsPanel`)
            expect(res.status).to.equal(200)
            expect(res.text).to.include('<h1>ADMIN PRODUCTS</h1>')
        })
    })
    describe('POST',()=>{
        it('El endpoint POST /api/product deberia crear un producto', async () => {
            const productTester = {
                title: "Tester Product",
                description: "Tester",
                price: 999, 
                code: "Tester",
                stock: 999,
                category: "Tester",
                thumbnail: "Tester",
                status: true,
                email: 'testeruser@email.com'
            }
            const res = await requester.post('/api/products').set('Cookie', cookie).send(productTester)
            expect(res.status).to.equal(200)
            expect(res.body).to.be.an('object')
            productTestId = res._body.payload._id
        })
    })
    describe('DELETE',()=>{
        it('El endpoint DELETE /api/products/:pid deberia eliminar un producto', async () => {
            const resDelete = await requester.delete(`/api/products/${productTestId}`).set('Cookie', cookie)
            expect(resDelete.status).to.equal(200)
        })
    })

})