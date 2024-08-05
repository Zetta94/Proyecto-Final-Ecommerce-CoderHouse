import productModel from "../models/product.model.js"

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


}
