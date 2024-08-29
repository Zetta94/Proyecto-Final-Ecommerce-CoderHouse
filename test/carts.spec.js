import { expect } from 'chai'
import supertest from "supertest"
import dotenv from 'dotenv'
dotenv.config()

const url = `${process.env.URL}:${process.env.PORT}`

const requester = supertest(url)

describe('--------------------------> Test Carts',()=>{
    describe('GET',()=>{
        it('El endpoint GET api/carts/:cid devuelve todos los productos de un carrito', async () => {
            const idTesterCart = '66d0c5ad7c41c90cab4c4788' 
            const res = await requester.get(`/api/carts/${idTesterCart}`)
            expect(res.status).to.equal(200)
            expect(res.body).to.be.an('object')     
            expect(res.body).to.have.property('status').that.is.a('string')
            expect(res.body).to.have.property('payload').that.is.an('array')
            res.body.payload.forEach(item => {
                expect(item).to.have.property('product').that.is.an('object')
                expect(item).to.have.property('quantity').that.is.a('number')
                expect(item.product).to.have.property('_id').that.is.a('string')
                expect(item.product).to.have.property('title').that.is.a('string')
                expect(item.product).to.have.property('description').that.is.a('string')
                expect(item.product).to.have.property('price').that.is.a('number')
                expect(item.product).to.have.property('status').that.is.a('boolean')
                expect(item.product).to.have.property('code').that.is.a('string')
                expect(item.product).to.have.property('stock').that.is.a('number')
                expect(item.product).to.have.property('category').that.is.a('string')
                expect(item.product).to.have.property('thumbnail').that.is.a('string')
            })     
        })
        it('El endpoint GET /carts/:cid devuelve un error 404 si el carrito no existe', async () => {
            const fakeCid = '64f14769c335f480f705d7c4' 
            const res = await requester.get(`/carts/${fakeCid}`)
            expect(res.status).to.equal(404)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('error').that.equals('Cart not found')
        })
    })
    describe('DELETE',()=>{
        it('El endpoint DELETE /api/carts/delete/:cid elimina un carrito',async()=>{
            const idToDelete = await requester.post('/api/carts')
            expect(idToDelete.status).to.equal(200)
            const response = await requester.delete(`/api/carts/delete/${idToDelete._body.payload}`)
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('status').that.equals('Cart deleted')
        })
    })

})