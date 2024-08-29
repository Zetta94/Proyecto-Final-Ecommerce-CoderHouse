import { Router } from "express";
import {
    getAProduct,
    getProducts,
    allProducts
} from "../../controllers/products.controller.js"
import { isAuthenticated}  from "../../middlewares/auth.js"

const router = Router();

// [GET] 🌐/products/productsPanel
router.get('/productsPanel', allProducts)

// [GET] 🌐/products/:pid
router.get("/:pid", getAProduct)

// [GET] 🌐/products
router.get('/',isAuthenticated, getProducts)



export default router