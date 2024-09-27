import productModel from "../models/product.model.js"
import sendMailTo from "../../configs/notifications/nodemailer.config.js"
import cartModel from "../models/cart.model.js"

export default class ProductManager{
    async getProduct(pid) {
        try {
            const productFind = await productModel.findById(pid)
            return productFind
        } catch (error) {
            console.log(error)
        }
    }

    async getAllProducts() {
        try {
            const products = await productModel.find({});
            return products;
        } catch (error) {
            throw new Error('Error retrieving products: ' + error.message);
        }
    }


    async newProduct(product, email) {
        try { 
            
            const isAdmin = email.startsWith('admin');
            const newProduct = {
                title: product.title,
                description: product.description,
                price: product.price, 
                status: true,
                code: product.code,
                stock: product.stock,
                category: product.category,
                thumbnail: product.thumbnail,
                owner: isAdmin ? "admin" : email
            };

            const result = await productModel.create(newProduct);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    
    }

    async deleteAProduct(pid){
        try{
            const id = pid
            const product = await productModel.findById(pid);
            if(!product) {return { status: 404, message: 'Product not found' }}
            const productTitle = product.title
            let existsCreator = false
            if(product.owner){
                existsCreator = true
            }

            await cartModel.updateMany(
                { products: { $elemMatch: { product: pid } } }, 
                { $pull: { products: { product: pid } } } 
            );

            const result = await productModel.deleteOne({ _id: id })
            if (result.deletedCount === 1) {
                if(existsCreator && product.owner !== "admin"){
                    const purchaser = product.owner
                    const mailSubject = `Product deleted`
                    const mailText = `Your product ${productTitle} was deleted for the Admin`
                    await sendMailTo(purchaser, mailSubject, mailText)
                }
                return { status: 200, message: 'Product deleted' }
            }
        }catch(error){
            throw error
        }
    }

}
