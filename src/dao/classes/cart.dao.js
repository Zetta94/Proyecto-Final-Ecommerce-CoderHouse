import cartModel from "../models/cart.model.js"
import mongoose from 'mongoose'

export default class CartManager{
    //Funcion que crea un nuevo carrito
    async addCart(userId) {
        try {
            const newCart = {
                user: userId,
                products: []
            }
            const result = await cartModel.create(newCart)
            console.log("Result: ",result)
            return result
        } catch (error) {
            console.log("error al crear el carrito")
            console.log(error)
        }
    }
    //Funcion que calcula el monto total del carrito
    async totalAmount(cid){
        try {
            const cart = await cartModel.findById(cid).populate('products.product')
            if (!cart) {
                throw new Error('Carrito no encontrado')
            }
            let total = 0
            cart.products.forEach(item => {
                total += item.product.price * item.quantity
            })
            return total
        } catch (error) {
            console.log(error)
        }
    }
    //Funcion que busca los carritos existentes
    async getCarts() {
        try {
            const carts = await cartModel.find()
            return carts.map(cart => cart.toObject())
        } catch (error) {
            console.log(error)
        }
    }

    //Funcion que trae un carrito por id
    async getProductsOfCartById(id) {
        try {
            if (!id) {
                console.log('No Cart ID provided')
                return { status: 400, message: 'No Cart ID provided' }
            }
            
            const cart = await cartModel.findById(id).populate('products.product')

            if (!cart) {
                console.log('Cart not found with ID:', id)
                return { status: 404, message: 'Cart not found' }
            }
    
            return cart.products 
    
        } catch (error) {
            console.error('Error fetching cart products:', error)
            return { status: 500, message: 'Internal Server Error' }  
        }
    }
    
    

    //Funcion que agrega un nuevo producto a un carrito
    async addProductToCart(cid, pid) {
        try {
            const cart = await cartModel.findById(cid)
            if (!cart) {
                return { code: 404, status: 'Cart not found' }
            }
            const productExist = cart.products.find(e => e.product.toString() === pid)
            if (productExist) {
                productExist.quantity += 1
            } else {
                cart.products.push({ product: pid, quantity: 1 })
            }
            await cart.save()
            return { code: 200, status: 'Product added' }
        } catch (error) {
            console.log(error)
        }
    }
    //Funcion que elimina todos los productos de un tipo en un carrito
    async removeProductFromCart(cid, pid) {
        try {
            const result = await cartModel.updateOne(
                { _id: cid },
                { $pull: { products: { product: pid } } }
            )
            if (result.acknowledged === true) {
                return { code: 200, status: 'Cart updated - Product deleted' }
            }
            return { code: 404, status: 'Product not found' }
        } catch (error) {
            console.log(error)
        }
    }
    //Funcion que actualiza los productos de un determinado carrito
    async updateCart(cid, products) {
        try {
            const result = await cartModel.updateOne(
                { _id: cid },
                { products: products }
            )
            if (result.acknowledged === true) {
                return { code: 200, status: 'Cart updated' }
            }
            return { code: 404, status: 'Cart not found' }
        } catch (error) {
            console.log(error)
        }
    }
    //Funcion que actualiza la cantidad de productos en un carrito determinado
    async updateProductQuantity(cid, pid, quantity) {
        try {
            const result = await cartModel.updateOne(
                { _id: cid, 'products.product': pid },
                { $set: { 'products.$.quantity': quantity } }
            )
            if (result.acknowledged === true) {
                return { code: 200, status: 'Quantity updated' }
            }
            return { code: 404, status: 'Product not found' }
        } catch (error) {
            console.log(error)
        }
    }
    //Funcion que elimina todos los productos de un carrito
    async removeAllProductsFromCart(cid) {
        try {
            const result = await cartModel.updateOne(
                { _id: cid },
                { products: [] }
            )
            if (result.acknowledged === true) {
                return { code: 200, status: 'All products have been removed from the cart' }
            }
            return { code: 404, status: 'Cart not found' }
        } catch (error) {
            console.log(error)
        }
    }

    async createCart (){
        try{
            const newCart = {
                user: "66b0233f22776e892fd8e8cc",
                products: []
            }
            const carts = await cartModel.create(newCart)
            return carts
        }catch(error){
            console.log("Error en createCart", error)
            throw error
        }
    }

    async getCartByUser(userId) {
        try {
          const carts = await cartModel.find({ user: userId }).populate('user')
          return carts
        } catch (error) {
          console.log("Error en getCartsByUser", error)
          throw error 
        }
      }

    async deleteACart(cid){
        try{
            const result = await cartModel.deleteOne({ _id: cid })
            return { code: 200, status: 'Cart deleted' }
        }catch(error){
            console.log("Error en deleteACart", error)
            throw error 
        }
    }
}