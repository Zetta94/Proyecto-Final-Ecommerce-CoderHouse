import ProductManager from "../dao/classes/product.dao.js"
import productModel from "../dao/models/product.model.js"

const manager = new ProductManager()

export const allProducts = async (req, res) => {
    req.logger.http('Route GET products/productsAdminPanel');
    try {
        const products = await manager.getAllProducts();
        res.render('superEditProducts', { user: req.session.user, products });
    } catch (error) {
        req.logger.error("Productos no encontrados");
        res.status(404).json({ 'error': 'Products not found' });
    }
};

export const createProduct = async (req, res) => {
    req.logger.http('Route POST: /api/products');
    try { 
        const { title, description, price, code, stock, category, thumbnail, email } = req.body;

        if (!title || !description || !price || !code || !stock || !category || !thumbnail || !email) {
            return res.status(400).json({ status: "error", message: "Todos los campos son obligatorios" });
        }

        const response = await manager.newProduct({ title, description, price, code, stock, category, thumbnail }, email);
        
        req.logger.info("Producto creado con éxito: ", response);
        res.status(200).json({ status: "success" });
    } catch (error) {
        req.logger.error("Error al crear el producto: ", error.message);
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const getAProduct = async (req,res)=>{
    try{
        const {pid}= req.params
        const product = await manager.getProduct(pid)
        res.render('addProduct',{product, user: req.session.user})
    }
    catch(error) {
        console.error("Error fetching products:", error)
        res.status(500).json({ status: "error", message: "Internal server error" })
    }
}

export const deleteProduct = async (req,res)=>{
    req.logger.http('Route DELETE: /api/products/:pid')
    try{
        const {pid} = req.params
        const response = await manager.deleteAProduct(pid)
        res.status(200).json({ status: "success" });
    }catch(error){
        req.logger.error("Producto no encontrado")
        res.status(500).json({ status: "error", message: error.message })
    }
}

export const getProducts = async (req, res) => {
    let { limit = 4, page = 1, sort, query } = req.query
    limit = parseInt(limit)
    page = parseInt(page)

    try {
        // Construir filtro de búsqueda
        let filter = {}
        if (query) {
            // Buscar por categoría o disponibilidad
            filter = {
                $or: [
                    { category: query },
                    { available: query.toLowerCase() === 'true' } // Comparar como booleano
                ]
            }
        }

        // Opciones de sorteo
        let sortOptions = {}
        if (sort) {
            sortOptions.price = sort === 'asc' ? 1 : -1
        }

        // Obtener el total de productos que coinciden con el filtro
        const totalProducts = await productModel.countDocuments(filter)

        // Calcular la paginación
        const totalPages = Math.ceil(totalProducts / limit)
        const offset = (page - 1) * limit

        // Obtener productos paginados
        const products = await productModel.find(filter).lean()
            .sort(sortOptions)
            .skip(offset)
            .limit(limit)

        //Obtengo las categorias
        const categories = await productModel.distinct('category')
        // Construir la respuesta
        const response = {
            status: "success",
            payload: products,
            totalPages,
            prevPage: page > 1 ? page - 1 : null,
            nextPage: page < totalPages ? page + 1 : null,
            page,
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
            prevLink: page > 1 ? `?limit=${limit}&page=${page - 1}&sort=${sort || ''}&query=${query || ''}` : null,
            nextLink: page < totalPages ? `?limit=${limit}&page=${page + 1}&sort=${sort || ''}&query=${query || ''}` : null
        }
        res.render('products',{response, categories, user: req.session.user })
    } catch (error) {
        console.error("Error fetching products:", error)
        res.status(500).json({ status: "error", message: "Internal server error" })
    }
}